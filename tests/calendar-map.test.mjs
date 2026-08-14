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
