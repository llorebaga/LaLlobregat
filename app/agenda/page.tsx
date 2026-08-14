import type { Metadata } from "next";
import Image from "next/image";
import { upcomingEvents } from "../data";
import calendarEvents from "../calendar-events.generated.json";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Properes actuacions de La Principal del Llobregat arreu de Catalunya.",
};

export const dynamic = "force-static";

const calendarId = "lallobregat@gmail.com";

function createCalendarUrl() {
  const parameters = new URLSearchParams({
    src: calendarId,
    ctz: "Europe/Madrid",
    hl: "ca",
    mode: "MONTH",
    wkst: "2",
    showTitle: "0",
    showNav: "1",
    showDate: "1",
    showPrint: "0",
    showTabs: "0",
    showCalendars: "0",
    showTz: "0",
    bgcolor: "#fffdf8",
  });

  return `https://calendar.google.com/calendar/embed?${parameters.toString()}`;
}

export default function AgendaPage() {
  const calendarSrc = createCalendarUrl();
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
            <p className="eyebrow">Pròximes parades</p>
            <h2 id="agenda-mapa-title">La cobla,<br /><em>sobre el mapa.</em></h2>
          </div>
          <p>
            Selecciona un punt per trobar l’actuació corresponent. Al costat del
            mapa tens la data, l’hora i el lloc de cada cita.
          </p>
        </div>

        <div className="agendaMapLayout">
          <div className="agendaCataloniaMap" aria-label="Mapa de Catalunya amb les pròximes actuacions">
            <Image
              className="agendaFixedMapImage"
              src="/catalunya-mapa-fix.png"
              alt="Mapa fix de Catalunya dividit per comarques"
              width={1920}
              height={1724}
              sizes="(max-width: 1100px) 100vw, 66vw"
            />
            <div className="agendaMapTint" />
            {events.map((event, index) => {
              const repeatedPosition = events
                .slice(0, index)
                .filter((previousEvent) => previousEvent.mapPosition.left === event.mapPosition.left
                  && previousEvent.mapPosition.top === event.mapPosition.top)
                .length;

              return (
                <a
                  className="agendaMapMarker"
                  href={event.source}
                  key={event.id}
                  style={{
                    ...event.mapPosition,
                    marginLeft: repeatedPosition ? `${repeatedPosition * 14}px` : undefined,
                    marginTop: repeatedPosition ? `${repeatedPosition % 2 ? -14 : 14}px` : undefined,
                  }}
                  aria-label={`${event.day} ${event.month}, ${event.title}, ${event.town}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{index + 1}</span>
                  <strong>{event.town}</strong>
                  <small>{event.day} {event.month}</small>
                </a>
              );
            })}
            <div className="agendaMapLabel">Catalunya</div>
            <div className="agendaMapCredits">
              <a href="https://commons.wikimedia.org/wiki/File:Catalonia_location_map_2023_counties.svg" target="_blank" rel="noreferrer">Mapa · Wikimedia Commons</a>
              <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">Coordenades · OpenStreetMap</a>
            </div>
          </div>

          <div className="agendaEventCards" aria-label="Properes actuacions">
            <div className="agendaEventCardsHeader">
              <span>Properament</span>
              <strong>{events.length} dates</strong>
            </div>
            {events.map((event, index) => (
              <article className="agendaEventCard" id={event.id} key={event.id}>
                <span className="agendaEventNumber">0{index + 1}</span>
                <time dateTime={event.dateTime}>
                  <strong>{event.day}</strong>
                  <span>{event.month}</span>
                </time>
                <div>
                  <span className="agendaEventType">{event.type} · {event.time}</span>
                  <h3>{event.title}</h3>
                  <p>{event.town} — {event.place}</p>
                </div>
                <a href={event.source} target="_blank" rel="noreferrer" aria-label={`Més informació sobre ${event.title}`}>↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

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

        <div className="agendaCalendarFrame">
          <iframe
            title="Calendari mensual de La Principal del Llobregat"
            src={calendarSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="agendaCalendarFooter">
          <span>Calendari públic</span>
          <span>lallobregat@gmail.com</span>
        </div>
      </section>
    </main>
  );
}
