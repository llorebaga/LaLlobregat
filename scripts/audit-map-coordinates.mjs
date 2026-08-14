import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const historyPath = path.resolve("app/calendar-history.generated.json");
const upcomingPath = path.resolve("app/calendar-events.generated.json");
const registryPath = path.resolve("scripts/calendar-town-coordinates.json");
const requestDelay = Number(process.env.GEOCODE_DELAY_MS ?? 1100);
const refresh = process.argv.includes("--refresh");

const aliases = {
  "bcn sants": { query: "Sants, Barcelona", label: "Barcelona · Sants" },
  "castellar": { query: "Castellar del Vallès", label: "Castellar del Vallès" },
  "ceret": { query: "Céret", label: "Céret", region: "fr" },
  "comarruga": { query: "Coma-ruga", label: "Coma-ruga" },
  "cornella": { query: "Cornellà de Llobregat", label: "Cornellà de Llobregat" },
  "encamp": { query: "Encamp", label: "Encamp", region: "ad" },
  "esplugues": { query: "Esplugues de Llobregat", label: "Esplugues de Llobregat" },
  "hospitalet de llobregat": { query: "L'Hospitalet de Llobregat", label: "L'Hospitalet de Llobregat" },
  "la bisbal de l emporda": { query: "La Bisbal d'Empordà", label: "La Bisbal d'Empordà" },
  "llavaneres": { query: "Sant Andreu de Llavaneres", label: "Sant Andreu de Llavaneres" },
  "masnou": { query: "El Masnou", label: "El Masnou" },
  "mollet": { query: "Mollet del Vallès", label: "Mollet del Vallès" },
  "montserrat": { query: "Monestir de Montserrat", label: "Montserrat" },
  "osseja": { query: "Osséja", label: "Osséja", region: "fr" },
  "palau solita i plegamans": { query: "Palau-solità i Plegamans", label: "Palau-solità i Plegamans" },
  "pobla de claramunt": { query: "La Pobla de Claramunt", label: "La Pobla de Claramunt" },
  "prada de conflent": { query: "Prades", label: "Prada de Conflent", region: "fr" },
  "s perpetua de mogoda": { query: "Santa Perpètua de Mogoda", label: "Santa Perpètua de Mogoda" },
  "s vicenc dels horts": { query: "Sant Vicenç dels Horts", label: "Sant Vicenç dels Horts" },
  "sant boi": { query: "Sant Boi de Llobregat", label: "Sant Boi de Llobregat" },
  "sant cugat": { query: "Sant Cugat del Vallès", label: "Sant Cugat del Vallès" },
  "santa perpetua de la mogoda": { query: "Santa Perpètua de Mogoda", label: "Santa Perpètua de Mogoda" },
  "st cugat": { query: "Sant Cugat del Vallès", label: "Sant Cugat del Vallès" },
  "st joan despi": { query: "Sant Joan Despí", label: "Sant Joan Despí" },
  "st vicenc dels horts": { query: "Sant Vicenç dels Horts", label: "Sant Vicenç dels Horts" },
  "tossa": { query: "Tossa de Mar", label: "Tossa de Mar" },
};

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function regionFor(townKey) {
  return aliases[townKey]?.region ?? "es";
}

function requestedPlace(town) {
  const townKey = normalizeText(town);
  const alias = aliases[townKey];
  return {
    key: townKey,
    query: alias?.query ?? town,
    label: alias?.label ?? town,
    region: regionFor(townKey),
  };
}

function searchNames(result) {
  const fields = [
    result.name,
    result.display_name?.split(",")[0],
    ...Object.values(result.namedetails ?? {}),
    ...Object.values(result.address ?? {}),
  ];
  return new Set(fields.filter((value) => typeof value === "string").map(normalizeText));
}

function resultScore(result, requested) {
  const target = normalizeText(requested.query);
  const names = searchNames(result);
  let score = 0;

  if (names.has(target)) score += 120;
  else if ([...names].some((name) => name.includes(target) || target.includes(name))) score += 45;

  if (["city", "town", "village", "municipality", "borough", "suburb", "quarter", "neighbourhood", "hamlet", "administrative"].includes(result.type)) score += 35;
  if (result.category === "boundary" && result.type === "administrative") score += 20;
  if (["natural", "highway", "railway", "waterway"].includes(result.category)) score -= 100;
  if (["peak", "ridge", "river", "reservoir", "station", "halt", "stop"].includes(result.type)) score -= 80;

  const countryCode = result.address?.country_code;
  if (countryCode === requested.region) score += 30;
  else score -= 80;

  if (requested.region === "es" && normalizeText(result.display_name ?? "").includes("catalunya")) score += 20;
  if (requested.region === "fr" && normalizeText(result.display_name ?? "").includes("pyrenees orientales")) score += 20;
  if (requested.region === "ad" && countryCode === "ad") score += 20;

  return score;
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function geocode(requested) {
  const suffix = requested.region === "fr"
    ? "Pyrénées-Orientales, France"
    : requested.region === "ad"
      ? "Andorra"
      : "Catalunya, Espanya";
  const parameters = new URLSearchParams({
    q: `${requested.query}, ${suffix}`,
    format: "jsonv2",
    limit: "10",
    addressdetails: "1",
    namedetails: "1",
    countrycodes: requested.region,
  });
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${parameters}`, {
    headers: {
      "Accept-Language": "ca",
      "User-Agent": "LaPrincipalDelLlobregatMapAudit/1.0 (https://github.com/llorebaga/LaLlobregat)",
    },
  });
  if (!response.ok) throw new Error(`Nominatim ha respost ${response.status} per ${requested.query}`);

  const results = await response.json();
  const ranked = results
    .map((result) => ({ result, score: resultScore(result, requested) }))
    .sort((first, second) => second.score - first.score);
  const best = ranked[0];
  if (!best || best.score < 80) return null;

  return {
    town: requested.label,
    lat: Number(best.result.lat),
    lon: Number(best.result.lon),
    verifiedQuery: `${requested.query}, ${suffix}`,
    displayName: best.result.display_name,
    osmType: best.result.type,
    osmId: `${best.result.osm_type}/${best.result.osm_id}`,
  };
}

const [historyEvents, upcomingEvents, existingRegistry] = await Promise.all([
  readJson(historyPath, []),
  readJson(upcomingPath, []),
  readJson(registryPath, {}),
]);

const towns = [...new Set([...historyEvents, ...upcomingEvents].map((event) => event.town).filter(Boolean))]
  .sort((first, second) => first.localeCompare(second, "ca"));
const registry = refresh ? {} : existingRegistry;
const unresolved = [];
let lastRequest = 0;

for (const [index, town] of towns.entries()) {
  const requested = requestedPlace(town);
  if (registry[requested.key] && !refresh) continue;

  const elapsed = Date.now() - lastRequest;
  if (lastRequest && elapsed < requestDelay) {
    await new Promise((resolve) => setTimeout(resolve, requestDelay - elapsed));
  }

  const result = await geocode(requested);
  lastRequest = Date.now();
  if (result) {
    registry[requested.key] = result;
    registry[normalizeText(result.town)] ??= result;
    console.log(`[${index + 1}/${towns.length}] ✓ ${town} → ${result.town} (${result.lat.toFixed(5)}, ${result.lon.toFixed(5)})`);
  } else {
    unresolved.push(town);
    console.warn(`[${index + 1}/${towns.length}] ✗ ${town}`);
  }
}

for (const town of towns) {
  const requested = requestedPlace(town);
  const aliasTarget = normalizeText(requested.label);
  if (!registry[requested.key] && registry[aliasTarget]) registry[requested.key] = registry[aliasTarget];
}

for (const [aliasKey, alias] of Object.entries(aliases)) {
  if (registry[aliasKey]) registry[normalizeText(alias.label)] ??= registry[aliasKey];
}

const orderedRegistry = Object.fromEntries(Object.entries(registry).sort(([first], [second]) => first.localeCompare(second, "ca")));
await writeFile(registryPath, `${JSON.stringify(orderedRegistry, null, 2)}\n`, "utf8");

console.log(`\n${Object.keys(orderedRegistry).length} ubicacions verificades.`);
if (unresolved.length) {
  console.error(`Sense verificar: ${unresolved.join(", ")}`);
  process.exitCode = 1;
}
