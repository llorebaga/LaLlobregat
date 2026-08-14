import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("el web es publica en català i sense el contingut temporal", async () => {
  const [page, nextEvent, layout, header, agenda, styledCalendar, archive, history, musicians, css, calendarWorkflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HomeNextEvent.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/agenda/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/agenda/AgendaCalendar.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/actuacions/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/historia/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/musics/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/sync-calendar.yml", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /lang="ca"/);
  assert.match(page, /La nostra música/);
  assert.match(agenda, /Mapa de Catalunya/);
  assert.match(agenda, /mapSrc=\{sitePath\("\/catalunya-mapa-complet\.png"\)\}/);
  assert.match(agenda, /<AgendaCalendar events=\{events\}/);
  assert.doesNotMatch(agenda, /<iframe|calendarSrc/);
  assert.match(styledCalendar, /Agenda mensual[\s\S]*Mes següent/);
  assert.match(history, /Una història/);
  assert.doesNotMatch(musicians, /Onze intèrprets|11<\/strong>|veus/);
  assert.match(musicians, /Josep Llauradó Cardona/);
  assert.match(musicians, /Jordi Serrano Quevedo/);
  assert.doesNotMatch(musicians, /Jorge Serrano Quevedo/);
  assert.match(musicians, /Marcel Sabaté Reixach/);
  assert.doesNotMatch(musicians, /className="musicianDirector"/);
  assert.doesNotMatch(musicians, /padStart|members\.map\(\(member, index\)/);
  assert.match(header, /label: "Inici"[\s\S]*label: "Agenda"[\s\S]*label: "Actuacions"[\s\S]*label: "Músics"[\s\S]*label: "Història"/);
  assert.match(page, /calendar-events\.generated\.json/);
  assert.match(page, /<HomeNextEvent events=\{calendarEvents\}/);
  assert.match(nextEvent, /setInterval\(updateCurrentTime, 60_000\)/);
  assert.match(nextEvent, /dateTime\)\.getTime\(\) >= currentTime/);
  assert.match(calendarWorkflow, /cron: "17 \* \* \* \*"/);
  assert.match(calendarWorkflow, /actions: write/);
  assert.match(calendarWorkflow, /gh workflow run deploy-pages\.yml --ref main/);
  assert.match(archive, /MÈLT[\s\S]*Concerts[\s\S]*Ballades/);
  assert.doesNotMatch(archive, /ActuacionsGrid|archiveEvents/);
  assert.doesNotMatch(page, /simpleStats|<strong>1929<\/strong>|<strong>11<\/strong>|<strong>1<\/strong>/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(page + layout, /SkeletonPreview|codex-preview|Your site is taking shape/);
});
