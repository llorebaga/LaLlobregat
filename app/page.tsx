import Image from "next/image";
import { AgendaCalendar } from "./agenda/AgendaCalendar";
import calendarEvents from "./calendar-events.generated.json";
import { HomeIntro } from "./components/HomeIntro";
import { HomeNextEvent } from "./components/HomeNextEvent";
import { upcomingEvents } from "./data";
import { sitePath } from "./site-path";

const buildTime = Date.now();
// Canvia-ho a false per recuperar immediatament la portada sense introducció.
const SHOW_HOME_INTRO = false;

export default function Home() {
  const nextEvent = calendarEvents.find(
    (event) => new Date(event.dateTime).getTime() >= buildTime,
  ) ?? upcomingEvents[0];
  const events = calendarEvents.length ? calendarEvents : upcomingEvents;

  return (
    <main id="contingut" className="simpleHome">
      {SHOW_HOME_INTRO ? <HomeIntro events={calendarEvents} initialEvent={nextEvent} /> : null}
      <section className="simpleHero">
        <div className="simpleHeroCopy">
          <p className="simpleKicker">Cobla · Des de 1929</p>
          <h1>La Principal<br /><em>del Llobregat</em></h1>
          <p className="simpleLead">Sardanes, concerts i música catalana amb un so propi.</p>
          <div className="simpleHeroActions">
            <a className="simpleLightButton" href={sitePath("/agenda")}>
              Consulta l’agenda <span aria-hidden="true">↗</span>
            </a>
            <a className="simpleTextLink" href={sitePath("/actuacions")}>
              Descobreix què fem <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <a
          className="simpleHeroVisual"
          href={sitePath("/musics")}
          aria-label="Coneix els músics de La Principal del Llobregat"
        >
          <Image
            src="/la-principal-del-llobregat-2025.jpg"
            alt="Fotografia oficial de La Principal del Llobregat, 2025"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span className="simpleHeroPhotoCta">
            Coneix els músics <i aria-hidden="true">→</i>
          </span>
        </a>
      </section>

      <HomeNextEvent events={calendarEvents} initialEvent={nextEvent} />

      <section className="homeCalendarSection sectionPad" id="calendari" aria-labelledby="home-calendar-title">
        <div className="homeCalendarHeading">
          <div>
            <p className="eyebrow light">Calendari</p>
            <h2 id="home-calendar-title">On sonarem, <em>mes a mes.</em></h2>
          </div>
          <a href={sitePath("/agenda")}>
            Tota l’agenda <span aria-hidden="true">→</span>
          </a>
        </div>

        <AgendaCalendar events={events} />
      </section>

      <section className="simpleExplore sectionPad">
        <p className="eyebrow">Descobreix la cobla</p>
        <div className="simpleExploreGrid">
          <a href={sitePath("/agenda")}>
            <span>01</span><h2>Agenda</h2><i aria-hidden="true">↗</i>
            <p>Consulta on sonarem pròximament.</p>
          </a>
          <a href={sitePath("/actuacions")}>
            <span>02</span><h2>Què fem?</h2><i aria-hidden="true">↗</i>
            <p>Ballades, concerts i col·laboracions.</p>
          </a>
          <a href={sitePath("/historia")}>
            <span>03</span><h2>Història</h2><i aria-hidden="true">↗</i>
            <p>Una trajectòria que continua sonant.</p>
          </a>
        </div>
      </section>
    </main>
  );
}
