import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("el mapa inclou totes les actuacions i els mesos disponibles", async () => {
  const events = JSON.parse(await readFile("app/calendar-events.generated.json", "utf8"));
  const counts = Object.groupBy(events, (event) => event.monthKey);

  assert.equal(counts["2026-08"]?.length, 27);
  assert.equal(counts["2026-09"]?.length, 24);
  assert.deepEqual(
    [...new Set(events.map((event) => event.monthKey))],
    ["2026-08", "2026-09", "2026-10", "2026-11", "2026-12"],
  );
  assert.ok(events.every((event) => event.mapPosition?.left && event.mapPosition?.top));
});

test("el mapa històric recupera el registre geolocalitzable del calendari", async () => {
  const events = JSON.parse(await readFile("app/calendar-history.generated.json", "utf8"));

  assert.ok(events.length > 2100);
  assert.equal(new Set(events.map((event) => event.id)).size, events.length);
  assert.ok(events.some((event) => event.dateTime.startsWith("2008")));
  assert.ok(events.some((event) => event.dateTime.startsWith("2026")));
  assert.ok(events.every((event) => event.mapPosition?.left && event.mapPosition?.top));
});

test("les poblacions ambigües tenen coordenades municipals verificades", async () => {
  const places = JSON.parse(await readFile("scripts/calendar-town-coordinates.json", "utf8"));

  assert.deepEqual({ lat: places.ceret.lat, lon: places.ceret.lon }, { lat: 42.485804, lon: 2.7488069 });
  assert.deepEqual({ lat: places.camprodon.lat, lon: places.camprodon.lon }, { lat: 42.3127896, lon: 2.364926 });
  assert.deepEqual({ lat: places.encamp.lat, lon: places.encamp.lon }, { lat: 42.5360425, lon: 1.5836096 });
  assert.deepEqual({ lat: places.masnou.lat, lon: places.masnou.lon }, { lat: 41.4796899, lon: 2.3118347 });
  assert.deepEqual({ lat: places["prada de conflent"].lat, lon: places["prada de conflent"].lon }, { lat: 42.6181232, lon: 2.4230925 });
  assert.deepEqual({ lat: places.castellar.lat, lon: places.castellar.lon }, { lat: 41.6138122, lon: 2.0875963 });
});

test("Encamp i Céret estan calibrats amb el dibuix del mapa", async () => {
  const events = JSON.parse(await readFile("app/calendar-history.generated.json", "utf8"));
  const byTown = new Map(events.map((event) => [event.town, event]));

  assert.deepEqual(byTown.get("Encamp")?.mapPosition, { left: "40.10%", top: "20.55%" });
  assert.deepEqual(byTown.get("Céret")?.mapPosition, { left: "70.47%", top: "22.70%" });
});
