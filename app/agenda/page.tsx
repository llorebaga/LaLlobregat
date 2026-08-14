import type { Metadata } from "next";
import { upcomingEvents } from "../data";
import calendarEvents from "../calendar-events.generated.json";
import { sitePath } from "../site-path";
import { AgendaCalendar } from "./AgendaCalendar";
import { AgendaMap } from "./AgendaMap";
import { AgendaTownSearch } from "./AgendaTownSearch";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Properes actuacions de La Principal del Llobregat arreu de Catalunya.",
};

export const dynamic = "force-static";

const calendarId = "lallobregat@gmail.com";

export default function AgendaPage() {
  const events = calendarEvents.length ? calendarEvents : upcomingEvents;

  return (
    <main id="contingut" className="agendaPage">
      <header className="agendaPageHero">
        <div>
          <p className="simpleKicker">On sonarem</p>
          <h1>Agenda</h1>
        </div>
        <div className="agendaHeroCopy">
          <p>Places, auditoris i escenaris d’arreu de Catalunya.</p>
          <span>Calendari actualitzat · La Principal del Llobregat</span>
        </div>
      </header>

      <section className="agendaMapSection sectionPad" aria-labelledby="agenda-mapa-title">
        <div className="agendaSectionHeading">
          <div>
            <p className="eyebrow">Mes a mes</p>
            <h2 id="agenda-mapa-title">La cobla,<br /><em>sobre el mapa.</em></h2>
          </div>
          <p>
            Tria el mes i clica un punt vermell per consultar la data, l’hora
            i el lloc de l’actuació sense sortir del mapa.
          </p>
        </div>

        <div aria-label="Mapa de Catalunya">
          <AgendaMap events={events} mapSrc={sitePath("/catalunya-mapa-complet.png")} />
        </div>
      </section>

      <AgendaTownSearch events={events} />

      <section className="agendaCalendarSection sectionPad" id="calendari" aria-labelledby="agenda-calendar-title">
        <div className="agendaCalendarIntro">
          <div>
            <p className="eyebrow light">Calendari complet</p>
            <h2 id="agenda-calendar-title">Tot el mes,<br /><em>d’un cop d’ull.</em></h2>
          </div>
          <div>
            <p>
              Consulta totes les actuacions i navega entre mesos. Clica qualsevol
              esdeveniment per veure’n la informació completa.
            </p>
            <a href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarId)}`} target="_blank" rel="noreferrer">
              Obre’l a Google Calendar <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <AgendaCalendar events={events} />
        <div className="agendaCalendarFooter">
          <span>Calendari públic</span>
          <span>lallobregat@gmail.com</span>
        </div>
      </section>
    </main>
  );
}
