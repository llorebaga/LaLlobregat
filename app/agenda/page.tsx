import type { Metadata } from "next";
import { upcomingEvents } from "../data";

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
            <iframe
              title="Mapa de Catalunya"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.5%2C40.45%2C3.5%2C42.95&layer=mapnik"
              loading="lazy"
            />
            <div className="agendaMapTint" />
            {upcomingEvents.map((event, index) => (
              <a
                className="agendaMapMarker"
                href={`#${event.id}`}
                key={event.id}
                style={event.mapPosition}
                aria-label={`${event.day} ${event.month}, ${event.title}, ${event.town}`}
              >
                <span>{index + 1}</span>
                <strong>{event.town}</strong>
                <small>{event.day} {event.month}</small>
              </a>
            ))}
            <div className="agendaMapLabel">Catalunya</div>
            <a className="agendaMapCredit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a>
          </div>

          <div className="agendaEventCards" aria-label="Properes actuacions">
            <div className="agendaEventCardsHeader">
              <span>Properament</span>
              <strong>{upcomingEvents.length} dates</strong>
            </div>
            {upcomingEvents.map((event, index) => (
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
          <span>Zona horària · Europa/Madrid</span>
        </div>
      </section>
    </main>
  );
}
