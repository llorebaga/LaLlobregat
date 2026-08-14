import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const calendarId = "lallobregat@gmail.com";
const calendarFeed = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
const outputPath = path.resolve("app/calendar-events.generated.json");
const cachePath = path.resolve("scripts/calendar-geocode-cache.json");
const maximumEvents = 180;
const geocodeDelay = Number(process.env.GEOCODE_DELAY_MS ?? 1200);
// Exact equirectangular bounds of the fixed Catalonia location map.
const cataloniaBounds = { west: -0.5481, south: 40.4079, east: 4.0243, north: 42.9978 };
const monthNames = ["GEN.", "FEBR.", "MARÇ", "ABR.", "MAIG", "JUNY", "JUL.", "AG.", "SET.", "OCT.", "NOV.", "DES."];
const monthNamesLong = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];
const knownPlaces = {
  "bufraganya": { lat: 41.48455, lon: 1.44838, town: "Sant Magí de Brufaganya" },
};

function unfoldIcs(source) {
  return source.replace(/\r?\n[ \t]/g, "");
}

function readProperty(block, name) {
  return block.match(new RegExp(`^${name}(?:;[^:]*)?:(.*)$`, "m"))?.[1]?.trim() ?? "";
}

function decodeIcsText(value) {
  return value
    .replace(/\\n/gi, " ")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

function parseCalendarDate(rawValue) {
  const match = rawValue.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/);
  if (!match) return null;

  const [, year, month, day, hour, minute, second = "00", utc] = match;
  const allDay = !hour;
  const isoDate = `${year}-${month}-${day}`;
  const date = allDay
    ? new Date(`${isoDate}T12:00:00Z`)
    : utc
      ? new Date(`${isoDate}T${hour}:${minute}:${second}Z`)
      : new Date(`${isoDate}T${hour}:${minute}:${second}`);

  if (Number.isNaN(date.getTime())) return null;

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("ca-ES", {
      timeZone: "Europe/Madrid",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: allDay ? undefined : "2-digit",
      minute: allDay ? undefined : "2-digit",
      hourCycle: "h23",
    }).formatToParts(date).filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );

  return {
    date,
    dateTime: allDay ? isoDate : date.toISOString(),
    year: parts.year,
    monthNumber: parts.month,
    monthKey: `${parts.year}-${parts.month}`,
    monthLabel: `${monthNamesLong[Number(parts.month) - 1]} ${parts.year}`,
    day: parts.day,
    month: monthNames[Number(parts.month) - 1],
    time: allDay ? "Tot el dia" : `${parts.hour}.${parts.minute} h`,
  };
}

function eventUrl(uid) {
  const eventId = uid.replace(/@google\.com$/i, "");
  const encoded = Buffer.from(`${eventId} ${calendarId}`, "utf8")
    .toString("base64")
    .replace(/=+$/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `https://calendar.google.com/calendar/event?eid=${encoded}`;
}

function eventType(summary) {
  if (/concert/i.test(summary)) return "Concert";
  if (/mèlt|projecte/i.test(summary)) return "Projecte";
  return "Sardanes";
}

function eventTown(summary, location) {
  const cleaned = summary.replace(/^(concertàs|concert|mèlt|coco)\s+/i, "").trim();
  return cleaned || location.split(",")[0].trim();
}

function normalizeText(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function eventQueries(town, location) {
  const normalizedTown = normalizeText(town);
  const knownPlace = knownPlaces[normalizedTown];
  if (knownPlace) return { knownPlace, queries: [] };

  const queries = [];
  if (location) {
    const includesTown = normalizeText(location).includes(normalizedTown);
    queries.push(includesTown ? location : `${location}, ${town}, Catalunya, Espanya`);
  }
  queries.push(`${town}, Catalunya, Espanya`);
  return { knownPlace: null, queries: [...new Set(queries)] };
}

function mapPosition(latitude, longitude) {
  const left = ((longitude - cataloniaBounds.west) / (cataloniaBounds.east - cataloniaBounds.west)) * 100;
  const top = ((cataloniaBounds.north - latitude) / (cataloniaBounds.north - cataloniaBounds.south)) * 100;
  return {
    left: `${Math.min(96, Math.max(4, left)).toFixed(2)}%`,
    top: `${Math.min(96, Math.max(4, top)).toFixed(2)}%`,
  };
}

async function readCache() {
  try {
    return JSON.parse(await readFile(cachePath, "utf8"));
  } catch {
    return {};
  }
}

async function geocode(query, cache, lastRequest) {
  if (Object.prototype.hasOwnProperty.call(cache, query)) {
    return { coordinates: cache[query], lastRequest };
  }

  const elapsed = Date.now() - lastRequest;
  if (lastRequest && elapsed < geocodeDelay) {
    await new Promise((resolve) => setTimeout(resolve, geocodeDelay - elapsed));
  }

  const parameters = new URLSearchParams({
    q: query,
    format: "jsonv2",
    limit: "1",
    countrycodes: "es",
    viewbox: `${cataloniaBounds.west},${cataloniaBounds.north},${cataloniaBounds.east},${cataloniaBounds.south}`,
    bounded: "1",
  });
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${parameters}`, {
    headers: {
      "Accept-Language": "ca",
      "User-Agent": "LaPrincipalDelLlobregatCalendarSync/1.0 (https://github.com/llorebaga/la-principal-del-llobregat)",
    },
  });
  if (!response.ok) throw new Error(`La geocodificació ha respost ${response.status}`);

  const [result] = await response.json();
  const candidate = result ? { lat: Number(result.lat), lon: Number(result.lon) } : null;
  const coordinates = candidate
    && candidate.lat >= cataloniaBounds.south
    && candidate.lat <= cataloniaBounds.north
    && candidate.lon >= cataloniaBounds.west
    && candidate.lon <= cataloniaBounds.east
      ? candidate
      : null;
  cache[query] = coordinates;
  console.log(coordinates ? `Ubicació trobada: ${query}` : `Ubicació no trobada: ${query}`);
  return { coordinates, lastRequest: Date.now() };
}

const response = await fetch(calendarFeed);
if (!response.ok) throw new Error(`El calendari públic ha respost ${response.status}`);

const source = unfoldIcs(await response.text());
const startOfPeriod = new Date();
startOfPeriod.setDate(1);
startOfPeriod.setHours(0, 0, 0, 0);
const endOfPeriod = new Date(startOfPeriod);
endOfPeriod.setMonth(endOfPeriod.getMonth() + 12);

const parsedEvents = source
  .split("BEGIN:VEVENT")
  .slice(1)
  .map((block) => {
    const summary = decodeIcsText(readProperty(block, "SUMMARY"));
    const location = decodeIcsText(readProperty(block, "LOCATION"));
    const uid = readProperty(block, "UID");
    const calendarDate = parseCalendarDate(readProperty(block, "DTSTART"));
    if (!summary || !uid || !calendarDate || calendarDate.date < startOfPeriod || calendarDate.date >= endOfPeriod) return null;
    return { summary, location, uid, ...calendarDate };
  })
  .filter(Boolean)
  .sort((first, second) => first.date - second.date)
  .slice(0, maximumEvents);

const cache = await readCache();
let lastRequest = 0;
const synchronizedEvents = [];

for (const event of parsedEvents) {
  const originalTown = eventTown(event.summary, event.location);
  const { knownPlace, queries } = eventQueries(originalTown, event.location);
  let coordinates = knownPlace ? { lat: knownPlace.lat, lon: knownPlace.lon } : null;

  for (const query of queries) {
    if (coordinates) break;
    const geocoded = await geocode(query, cache, lastRequest);
    lastRequest = geocoded.lastRequest;
    coordinates = geocoded.coordinates;
  }

  if (!coordinates) {
    console.warn(`Sense coordenades: ${event.summary}`);
    continue;
  }

  const town = knownPlace?.town ?? originalTown;

  synchronizedEvents.push({
    id: `calendar-${event.uid.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}`,
    day: event.day,
    month: event.month,
    dateTime: event.dateTime,
    title: event.summary,
    place: event.location ? event.location.split(",")[0].trim() : "Ubicació no indicada al calendari",
    town,
    time: event.time,
    type: eventType(event.summary),
    source: eventUrl(event.uid),
    monthKey: event.monthKey,
    monthLabel: event.monthLabel,
    mapPosition: mapPosition(coordinates.lat, coordinates.lon),
  });
}

await writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
await writeFile(outputPath, `${JSON.stringify(synchronizedEvents, null, 2)}\n`, "utf8");
console.log(`${synchronizedEvents.length} actuacions sincronitzades.`);
