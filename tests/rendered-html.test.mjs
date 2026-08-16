import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("el web es publica en català i sense el contingut temporal", async () => {
  const [page, homeIntro, nextEvent, layout, header, footer, agenda, townSearch, styledCalendar, archive, history, historyMap, musicians, css, calendarWorkflow, calendarSync, multimedia, contact, copyContact] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HomeIntro.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HomeNextEvent.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/agenda/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/agenda/AgendaTownSearch.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/agenda/AgendaCalendar.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/actuacions/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/historia/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/historia/HistoryMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/musics/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/sync-calendar.yml", import.meta.url), "utf8"),
    readFile(new URL("../scripts/sync-calendar.mjs", import.meta.url), "utf8"),
    readFile(new URL("../app/multimedia/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/contacte/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/contacte/CopyContactButton.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /lang="ca"/);
  assert.match(page, /La nostra música/);
  assert.match(page, /const SHOW_HOME_INTRO = false/);
  assert.match(page, /<HomeIntro events=\{calendarEvents\}/);
  assert.match(homeIntro, /Tot comença[\s\S]*primera nota/);
  assert.match(homeIntro, /Fes sonar la cobla/);
  assert.match(homeIntro, /sessionStorage/);
  assert.match(agenda, /Mapa de Catalunya/);
  assert.match(agenda, /mapSrc=\{sitePath\("\/catalunya-mapa-complet\.png"\)\}/);
  assert.match(agenda, /<AgendaCalendar events=\{events\}/);
  assert.match(agenda, /<AgendaTownSearch events=\{events\}/);
  assert.match(townSearch, /Busca el teu poble|Hi sonarem/);
  assert.match(townSearch, /normalize\(event\.town\)\.includes/);
  assert.doesNotMatch(agenda, /<iframe|calendarSrc/);
  assert.match(styledCalendar, /Agenda mensual[\s\S]*Mes següent/);
  assert.match(history, /Una història/);
  assert.match(history, /calendar-history\.generated\.json/);
  assert.match(history, /<HistoryMap events=\{historyEvents\}/);
  assert.match(historyMap, /Tots els anys|actuacions recuperades/);
  assert.doesNotMatch(musicians, /Onze intèrprets|11<\/strong>|veus/);
  assert.match(musicians, /Josep Llauradó Cardona/);
  assert.match(musicians, /Jordi Serrano Quevedo/);
  assert.doesNotMatch(musicians, /Jorge Serrano Quevedo/);
  assert.match(musicians, /Marcel Sabaté Reixach/);
  assert.doesNotMatch(musicians, /className="musicianDirector"/);
  assert.doesNotMatch(musicians, /padStart|members\.map\(\(member, index\)/);
  assert.match(header, /label: "Inici"[\s\S]*label: "Agenda"[\s\S]*label: "Què fem\?"[\s\S]*label: "Músics"[\s\S]*label: "Història"[\s\S]*label: "Multimèdia"/);
  assert.match(page, /calendar-events\.generated\.json/);
  assert.match(page, /<HomeNextEvent events=\{calendarEvents\}/);
  assert.match(nextEvent, /setInterval\(updateCurrentTime, 60_000\)/);
  assert.match(nextEvent, /dateTime\)\.getTime\(\) >= currentTime/);
  assert.match(calendarWorkflow, /cron: "17 \* \* \* \*"/);
  assert.match(calendarWorkflow, /actions: write/);
  assert.match(calendarWorkflow, /gh workflow run deploy-pages\.yml --ref main/);
  assert.match(calendarWorkflow, /app\/calendar-history\.generated\.json/);
  assert.match(calendarSync, /historyOutputPath/);
  assert.match(archive, /Ballades[\s\S]*Concerts[\s\S]*Col·laboració Quartet Mèlt[\s\S]*Col·laboració Guillem Batllori/);
  assert.match(archive, /Diferents maneres[\s\S]*de trobar-nos/);
  assert.doesNotMatch(archive, /Tres maneres/);
  assert.match(archive, /<details className="proposalItem"/);
  assert.doesNotMatch(archive, /ActuacionsGrid|archiveEvents/);
  assert.match(multimedia, /Fotografies/);
  assert.match(multimedia, /la-principal-del-llobregat-2025\.png/);
  assert.match(multimedia, /la-principal-del-llobregat-negre\.png/);
  assert.doesNotMatch(multimedia, /Documents|\.pdf/);
  assert.match(header, /sitePath\("\/contacte"\)/);
  assert.match(footer, /sitePath\("\/contacte"\)/);
  assert.match(footer, /Escriu-nos/);
  assert.doesNotMatch(archive, /Parlem-ne|whatWeDoCta/);
  assert.doesNotMatch(header + footer + archive, /mailto:/);
  assert.match(contact, /representacio@lallobregat\.cat/);
  assert.match(contact, /629 417 377/);
  assert.doesNotMatch(contact, /Com contactar|contactNote/);
  assert.match(copyContact, /navigator\.clipboard\.writeText/);
  assert.match(css, /\.contactPage \+ \.siteFooter \.footerTop \{ display: none; \}/);
  assert.doesNotMatch(page, /simpleStats|<strong>1929<\/strong>|<strong>11<\/strong>|<strong>1<\/strong>/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(page + layout, /SkeletonPreview|codex-preview|Your site is taking shape/);
});
