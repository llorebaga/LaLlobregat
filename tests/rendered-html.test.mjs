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
  assert.match(page, /Sardanes, concerts i música catalana/);
  assert.match(page, /const SHOW_HOME_INTRO = false/);
  assert.match(page, /<HomeIntro events=\{calendarEvents\}/);
  assert.match(homeIntro, /Tot comença[\s\S]*primera nota/);
  assert.match(homeIntro, /Porta la cobla a la teva plaça/);
  assert.match(homeIntro, /sessionStorage/);
  assert.match(agenda, /Mapa de Catalunya/);
  assert.match(agenda, /mapSrc=\{sitePath\("\/catalunya-mapa-complet\.png"\)\}/);
  assert.match(agenda, /<AgendaCalendar events=\{events\}/);
  assert.match(agenda, /<AgendaTownSearch events=\{events\}/);
  assert.match(townSearch, /Busca el teu poble|Hi toquem/);
  assert.match(townSearch, /normalize\(event\.town\)\.includes/);
  // El calendari encapçala l'agenda, per damunt del mapa i del cercador de pobles.
  assert.ok(agenda.indexOf("agendaCalendarSection") < agenda.indexOf("agendaMapSection"));
  assert.ok(agenda.indexOf("agendaMapSection") < agenda.indexOf("<AgendaTownSearch"));
  // A la portada el calendari va després de la pròxima actuació.
  assert.match(page, /<AgendaCalendar events=\{events\}/);
  // Ordre de la portada: hero → pròxima actuació → calendari → descobreix la cobla.
  assert.ok(page.indexOf("simpleHero") < page.indexOf("<HomeNextEvent"));
  assert.ok(page.indexOf("<HomeNextEvent") < page.indexOf("homeCalendarSection"));
  assert.ok(page.indexOf("homeCalendarSection") < page.indexOf("simpleExplore"));
  assert.doesNotMatch(page, /simpleIntro|Tradició viva/);
  assert.doesNotMatch(agenda, /<iframe|calendarSrc/);
  assert.match(styledCalendar, /Agenda mensual[\s\S]*Mes següent/);
  assert.match(styledCalendar, /agendaCalendarDay[\s\S]*hasEvents/);
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
  // Cada músic té el seu retrat i la targeta que gira ensenya nom i instrument.
  assert.equal(musicians.match(/photo: "\/retrats\/LL_[A-Za-z]+\.jpg"/g)?.length, 12);
  assert.match(musicians, /musicianCardFront[\s\S]*musicianCardBack/);
  assert.match(css, /\.musicianCard:hover \.musicianCardInner \{ transform: rotateY\(180deg\); \}/);
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
  // La foto en blanc va sense any al peu.
  assert.match(multimedia, /<strong>La Principal del Llobregat<\/strong>/);
  assert.doesNotMatch(multimedia, /La Principal del Llobregat · 2025/);
  // I hi ha l'apartat de documents amb els tres PDF, després del de fotos.
  assert.ok(multimedia.indexOf("mediaPhotoGrid") < multimedia.indexOf("mediaDocuments"));
  assert.match(multimedia, /biografia-la-principal-del-llobregat\.pdf/);
  assert.match(multimedia, /dossier-la-llobregat-i-els-melt\.pdf/);
  assert.match(multimedia, /dossier-guillem-batllori-i-la-principal-del-llobregat.pdf/);
  assert.match(css, /\.mediaDocuments \{ display: grid;/);
  // Comentaris del repàs: cap "sonar" com a sinònim d'actuar, i el nom de la
  // portada sense la cursiva partida.
  assert.doesNotMatch(page + agenda + townSearch + footer + homeIntro, /sonarem|sonem|Fem sonar|Fes sonar/);
  assert.match(page, /<h1>La Principal<br \/>del Llobregat<\/h1>/);
  assert.match(footer, /Toquem a la teva plaça/);
  assert.match(musicians, /només existeix quan toquem/);
  assert.doesNotMatch(musicians, /quan tots toquem/);
  // Res no enllaça a Google Calendar des dels esdeveniments: la seva pàgina
  // sortia en castellà. Només queda el botó explícit de l'agenda.
  assert.doesNotMatch(styledCalendar + historyMap + townSearch, /event\.source/);
  assert.doesNotMatch(agenda, /Veure al calendari/);
  assert.match(agenda, /Obre’l a Google Calendar/);
  // Els dossiers viuen només a Multimèdia.
  assert.doesNotMatch(archive, /\.pdf/);
  assert.match(archive, /Descarrega els dossiers/);
  assert.match(archive, /Col·laboració Emma Stratton/);
  assert.equal(multimedia.match(/file: "\/multimedia\/[a-z-]+\.pdf"/g)?.length, 4);
  // Vídeos i discs, i la imatge de Cobla Lírica.
  assert.match(multimedia, /youtube\.com\/@laprincipaldelllobregat238/);
  assert.match(multimedia, /open\.spotify\.com\/artist\/08GhB4MUhKdbiF47AlrCcd/);
  assert.match(multimedia, /cobla-lirica\.jpg/);
  assert.match(header, /sitePath\("\/contacte"\)/);
  assert.match(footer, /sitePath\("\/contacte"\)/);
  assert.match(footer, /Escriu-nos/);
  // Les xarxes són icones, no noms, i hi ha Spotify.
  assert.match(footer, /open\.spotify\.com\/artist\/08GhB4MUhKdbiF47AlrCcd/);
  assert.equal(footer.match(/href: "https:\/\//g)?.length, 4);
  assert.doesNotMatch(footer, /Instagram ↗|Facebook ↗|YouTube ↗/);
  assert.match(footer, /<svg[\s\S]*aria-hidden="true"/);
  assert.match(footer, /className="visuallyHidden">\{social\.name\}/);
  assert.match(css, /\.visuallyHidden \{ position: absolute;/);
  // El retrat de grup viu a Història; a Músics cada músic ja té el seu.
  assert.match(history, /historyPortraitFrame[\s\S]*interprets-2022\.avif/);
  assert.doesNotMatch(musicians, /interprets-2022\.avif|musiciansPortrait/);
  assert.doesNotMatch(archive, /Parlem-ne|whatWeDoCta/);
  assert.doesNotMatch(header + footer + archive, /mailto:/);
  assert.match(contact, /representacio@lallobregat\.cat/);
  assert.match(contact, /629 417 377/);
  assert.doesNotMatch(contact, /Com contactar|contactNote/);
  assert.match(copyContact, /navigator\.clipboard\.writeText/);
  assert.match(css, /\.contactPage \+ \.siteFooter \.footerTop \{ display: none; \}/);
  assert.doesNotMatch(page, /simpleStats|<strong>1929<\/strong>|<strong>11<\/strong>|<strong>1<\/strong>/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /agendaCalendarDay:not\(\.hasEvents\)/);
  assert.match(css, /\.mobileNav nav \{ position: fixed;/);
  assert.doesNotMatch(page + layout, /SkeletonPreview|codex-preview|Your site is taking shape/);
});
