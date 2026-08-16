import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const calendarId = "lallobregat@gmail.com";
const calendarFeed = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
const outputPath = path.resolve("app/calendar-events.generated.json");
const historyOutputPath = path.resolve("app/calendar-history.generated.json");
const cachePath = path.resolve("scripts/calendar-geocode-cache.json");
const townCoordinatesPath = path.resolve("scripts/calendar-town-coordinates.json");
const maximumEvents = 180;
const geocodeDelay = Number(process.env.GEOCODE_DELAY_MS ?? 1200);
// El mapa fix està dibuixat amb una projecció equirectangular lleugerament girada,
// així que la latitud també desplaça l'eix horitzontal i la longitud el vertical.
// Coeficients calibrats contra el contorn dibuixat de Catalunya (error ≈ 3 px sobre
// els 1280 px de l'original).
const mapProjection = {
  size: 1280,
  x: { lon: 320.27127, lat: -23.02574, offset: 987.69792 },
  y: { lon: -20.09757, lat: -429.77257, offset: 18581.47614 },
};
// Finestra geogràfica que cobreix el dibuix, per acotar el geocodificador.
const cataloniaBounds = { west: -0.19, south: 40.08, east: 4.01, north: 43.24 };
const monthNames = ["GEN.", "FEBR.", "MARÇ", "ABR.", "MAIG", "JUNY", "JUL.", "AG.", "SET.", "OCT.", "NOV.", "DES."];
const monthNamesLong = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];
const knownPlaces = {
  "bufraganya": { lat: 41.48455, lon: 1.44838, town: "Sant Magí de Brufaganya" },
};
const ignoredTownNames = new Set([
  "coco", "catedral", "enregistrament cd", "festa privada", "gravacio", "grabacio",
  "mati", "ocupat", "palau de la musica", "palau de la musica catalana", "petit palau",
  "sants", "sgae", "tarda", "madrid",
]);

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
  const cleaned = summary
    .replace(/^(concertàs|concert|mèlt|coco|sardanes?|ballada|audició)\s*[-:·]?\s+/i, "")
    .replace(/\s*\([^)]*\)\s*$/g, "")
    .trim();
  return cleaned || location.split(",")[0].trim();
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function eventQueries(town, location) {
  const normalizedTown = normalizeText(town);
  const knownPlace = knownPlaces[normalizedTown];
  if (knownPlace) return { knownPlace, queries: [] };

  const queries = [];
  if (location) {
    const includesTown = normalizeText(location).includes(normalizedTown);
    queries.push(includesTown ? location : `${location}, ${town}`);
  }
  queries.push(`${town}, Catalunya`);
  queries.push(town);
  return { knownPlace: null, queries: [...new Set(queries)] };
}

function mapPosition(latitude, longitude) {
  const { size, x, y } = mapProjection;
  const left = ((x.lon * longitude + x.lat * latitude + x.offset) / size) * 100;
  const top = ((y.lon * longitude + y.lat * latitude + y.offset) / size) * 100;
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

async function readTownCoordinates() {
  try {
    return JSON.parse(await readFile(townCoordinatesPath, "utf8"));
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
    limit: "5",
    countrycodes: "es,fr,ad",
    addressdetails: "1",
    viewbox: `${cataloniaBounds.west},${cataloniaBounds.north},${cataloniaBounds.east},${cataloniaBounds.south}`,
    bounded: "1",
  });
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${parameters}`, {
    headers: {
      "Accept-Language": "ca",
      "User-Agent": "LaPrincipalDelLlobregatCalendarSync/1.0 (https://github.com/llorebaga/LaLlobregat)",
    },
  });
  if (!response.ok) throw new Error(`La geocodificació ha respost ${response.status}`);

  const results = await response.json();
  const result = results.find((candidate) => {
    if (["natural", "highway", "railway", "waterway"].includes(candidate.category)) return false;
    if (["peak", "ridge", "river", "reservoir", "station", "halt", "stop"].includes(candidate.type)) return false;
    return true;
  }) ?? results[0];
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
const now = new Date();
const startOfPeriod = new Date();
startOfPeriod.setDate(1);
startOfPeriod.setHours(0, 0, 0, 0);
const endOfPeriod = new Date(startOfPeriod);
endOfPeriod.setMonth(endOfPeriod.getMonth() + 12);

const allParsedEvents = source
  .split("BEGIN:VEVENT")
  .slice(1)
  .map((block) => {
    const summary = decodeIcsText(readProperty(block, "SUMMARY"));
    const location = decodeIcsText(readProperty(block, "LOCATION"));
    const uid = readProperty(block, "UID");
    const calendarDate = parseCalendarDate(readProperty(block, "DTSTART"));
    if (!summary || !uid || !calendarDate) return null;
    return { summary, location, uid, ...calendarDate };
  })
  .filter(Boolean)
  .sort((first, second) => first.date - second.date);

const parsedEvents = allParsedEvents
  .filter((event) => event.date >= startOfPeriod && event.date < endOfPeriod)
  .slice(0, maximumEvents);

const parsedHistoryEvents = allParsedEvents
  .filter((event) => event.date < now)
  .sort((first, second) => second.date - first.date);

const [cache, townCoordinates] = await Promise.all([readCache(), readTownCoordinates()]);
let lastRequest = 0;
const synchronizedEvents = [];
const synchronizedHistoryEvents = [];
const resolvedTowns = new Map();

function findTownInsideTitle(townKey) {
  const searchableTitle = ` ${townKey.replace(/[^a-z0-9]+/g, " ").trim()} `;
  const matches = [...resolvedTowns.entries()].filter(([key]) => {
    if (ignoredTownNames.has(key) || key.length < 4) return false;
    const searchableKey = ` ${key.replace(/[^a-z0-9]+/g, " ").trim()} `;
    return searchableTitle.includes(searchableKey);
  });

  return matches.sort(([first], [second]) => second.length - first.length)[0]?.[1] ?? null;
}

async function synchronizeEvent(event, includeLocation) {
  const originalTown = eventTown(event.summary, event.location);
  if (!originalTown) return null;
  const townKey = normalizeText(originalTown);
  if (ignoredTownNames.has(townKey)) return null;
  let resolvedTown = resolvedTowns.get(townKey) ?? findTownInsideTitle(townKey);

  if (!resolvedTown) {
    const { knownPlace, queries } = eventQueries(originalTown, includeLocation ? event.location : "");
    const verifiedPlace = townCoordinates[townKey];
    let coordinates = verifiedPlace
      ? { lat: verifiedPlace.lat, lon: verifiedPlace.lon }
      : knownPlace
        ? { lat: knownPlace.lat, lon: knownPlace.lon }
        : null;

    for (const query of queries) {
      if (coordinates) break;
      const geocoded = await geocode(query, cache, lastRequest);
      lastRequest = geocoded.lastRequest;
      coordinates = geocoded.coordinates;
    }

    if (!coordinates) {
      console.warn(`Sense coordenades: ${event.summary}`);
      return null;
    }

    resolvedTown = {
      town: verifiedPlace?.town ?? knownPlace?.town ?? originalTown,
      coordinates,
      mapPosition: mapPosition(coordinates.lat, coordinates.lon),
    };
    resolvedTowns.set(townKey, resolvedTown);
  }

  return {
    id: `calendar-${event.uid.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}-${event.dateTime.replace(/[^0-9]+/g, "-")}`,
    day: event.day,
    month: event.month,
    dateTime: event.dateTime,
    title: event.summary,
    place: event.location ? event.location.split(",")[0].trim() : "Ubicació no indicada al calendari",
    town: resolvedTown.town,
    time: event.time,
    type: eventType(event.summary),
    source: eventUrl(event.uid),
    monthKey: event.monthKey,
    monthLabel: event.monthLabel,
    mapPosition: resolvedTown.mapPosition,
  };
}

for (const event of parsedEvents) {
  const synchronizedEvent = await synchronizeEvent(event, true);
  if (synchronizedEvent) synchronizedEvents.push(synchronizedEvent);
}

for (const event of parsedHistoryEvents) {
  const synchronizedEvent = await synchronizeEvent(event, false);
  if (synchronizedEvent) synchronizedHistoryEvents.push(synchronizedEvent);
}

const synchronizedHistoryIds = new Set(synchronizedHistoryEvents.map((event) => event.id));
for (const event of parsedHistoryEvents) {
  const eventId = `calendar-${event.uid.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}-${event.dateTime.replace(/[^0-9]+/g, "-")}`;
  if (synchronizedHistoryIds.has(eventId)) continue;
  const synchronizedEvent = await synchronizeEvent(event, false);
  if (synchronizedEvent) {
    synchronizedHistoryEvents.push(synchronizedEvent);
    synchronizedHistoryIds.add(synchronizedEvent.id);
  }
}
synchronizedHistoryEvents.sort((first, second) => second.dateTime.localeCompare(first.dateTime));

await writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
await writeFile(outputPath, `${JSON.stringify(synchronizedEvents, null, 2)}\n`, "utf8");
await writeFile(historyOutputPath, `${JSON.stringify(synchronizedHistoryEvents, null, 2)}\n`, "utf8");
console.log(`${synchronizedEvents.length} actuacions sincronitzades.`);
console.log(`${synchronizedHistoryEvents.length} actuacions incorporades al mapa històric.`);
