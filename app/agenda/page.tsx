import type { Metadata } from "next";
import { upcomingEvents } from "../data";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Properes actuacions de La Principal del Llobregat arreu de Catalunya.",
};
export const dynamic = "force-static";

function createCalendarUrl(calendarId?: string) {
  if (!calendarId?.trim()) return null;

  const parameters = new URLSearchParams({
    src: calendarId.trim(),
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
    bgcolor: "#fbf7ef",
  });

  return `https://calendar.google.com/calendar/embed?${parameters.toString()}`;
}

export default function AgendaPage() {
  const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
  const calendarSrc = createCalendarUrl(calendarId);

  return (
    <main id="contingut">
      <header className="pageHero agendaHero">
        <p className="eyebrow light">On sonarem</p>
        <h1>Agenda</h1>
        <p>Troba’ns a places, auditoris i escenaris d’arreu del país.</p>
      </header>

      <section className="mapSection sectionPad">
        <div className="sectionHeading mapIntro">
          <p className="eyebrow">Pròximes parades</p>
          <h2>La Llobregat,<br />sobre el mapa.</h2>
        </div>
        <div className="cataloniaMap" aria-label="Mapa de Catalunya amb les pròximes actuacions">
          <iframe title="Mapa base de Catalunya" src="https://www.openstreetmap.org/export/embed.html?bbox=-0.5%2C40.45%2C3.5%2C42.95&layer=mapnik" loading="lazy" tabIndex={-1} />
          <div className="mapTint" />
          {upcomingEvents.map((event, index) => (
            <a className="mapPin" href={`#${event.id}`} key={event.id} style={event.mapPosition} aria-label={`${event.title}, ${event.town}`}>
              <span>{index + 1}</span>
            </a>
          ))}
          <div className="mapLegend">Catalunya · Properes actuacions</div>
          <a className="mapCredit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a>
        </div>
      </section>

      <section className="eventsSection sectionPad">
        <div className="eventsHeader">
          <p className="eyebrow">Properament</p>
          <p>{upcomingEvents.length} actuacions confirmades</p>
        </div>
        <div className="eventList">
          {upcomingEvents.map((event, index) => (
            <article className="eventRow" id={event.id} key={event.id}>
              <div className="eventIndex">0{index + 1}</div>
              <time dateTime={event.dateTime} className="eventDate"><strong>{event.day}</strong><span>{event.month}</span></time>
              <div className="eventMain"><span className="eventType">{event.type}</span><h2>{event.title}</h2></div>
              <div className="eventPlace"><strong>{event.town}</strong><span>{event.place}</span></div>
              <div className="eventTime">{event.time}</div>
              <a className="eventLink" href={event.source} target="_blank" rel="noreferrer" aria-label={`Més informació sobre ${event.title}`}>↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="calendarSection monthlyCalendar sectionPad">
        <div className="calendarCopy">
          <p className="eyebrow light">Calendari complet</p>
          <h2>Tot el mes,<br />d’un cop d’ull.</h2>
          <p>Consulta totes les actuacions, navega entre mesos i obre qualsevol esdeveniment per veure’n els detalls.</p>
        </div>

        <div className="calendarFrame monthlyCalendarFrame">
          {calendarSrc ? (
            <iframe
              title="Calendari mensual de La Principal del Llobregat"
              src={calendarSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="calendarFallback">
              <div className="calendarTop"><span>Setembre</span><strong>2026</strong></div>
              <div className="weekdays"><span>Dl</span><span>Dt</span><span>Dc</span><span>Dj</span><span>Dv</span><span>Ds</span><span>Dg</span></div>
              <div className="monthGrid">
                {Array.from({ length: 35 }, (_, index) => {
                  const day = index - 1;
                  const active = [6, 10, 27].includes(day);
                  return <span className={active ? "activeDay" : ""} key={index}>{day > 0 && day <= 30 ? day : ""}</span>;
                })}
              </div>
              <p>Calendari Google preparat per connectar</p>
            </div>
          )}
        </div>

        {calendarId && (
          <a className="calendarExternalLink" href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarId)}`} target="_blank" rel="noreferrer">
            Obre’l a Google Calendar <span aria-hidden="true">↗</span>
          </a>
        )}
      </section>
    </main>
  );
}
