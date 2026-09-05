"use client";

import { useEffect, useMemo, useState } from "react";

type CalendarEvent = {
  id: string;
  day: string;
  dateTime: string;
  title: string;
  place: string;
  town: string;
  time: string;
  source: string;
  monthKey?: string;
  monthLabel?: string;
};

const weekdays = ["Dl.", "Dt.", "Dc.", "Dj.", "Dv.", "Ds.", "Dg."];

function getTodayKey() {
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = (type: Intl.DateTimeFormatPartTypes) => dateParts.find((part) => part.type === type)?.value;

  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function AgendaCalendar({ events }: { events: CalendarEvent[] }) {
  // IMPORTANT: no calculis "avui" directament al cos del component.
  // Si aquesta pàgina es genera de forma estàtica (SSG/ISR) o queda
  // cachejada (CDN, Vercel, etc.), aquest valor es "congelaria" amb la
  // data del moment en què es va generar/desplegar la pàgina, i seguiria
  // marcant per exemple el dia 4 encara que ja fos dia 5.
  // Calculant-ho dins d'un useEffect, garantim que sempre s'obté amb el
  // rellotge real del navegador del visitant, un cop muntat el component.
  const [todayKey, setTodayKey] = useState<string | null>(null);

  useEffect(() => {
    const updateToday = () => setTodayKey(getTodayKey());
    updateToday();

    // Recalcula automàticament a mitjanit per si l'usuari deixa la pestanya oberta
    const interval = setInterval(updateToday, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const months = useMemo(() => {
    const monthMap = new Map<string, { key: string; label: string }>();

    for (const event of events) {
      const key = event.monthKey ?? event.dateTime.slice(0, 7);
      if (!monthMap.has(key)) {
        const [year, month] = key.split("-").map(Number);
        const label = event.monthLabel ?? new Intl.DateTimeFormat("ca-ES", {
          month: "long",
          year: "numeric",
          timeZone: "Europe/Madrid",
        }).format(new Date(Date.UTC(year, month - 1, 1)));
        monthMap.set(key, { key, label });
      }
    }

    return [...monthMap.values()].sort((first, second) => first.key.localeCompare(second.key));
  }, [events]);

  const [monthIndex, setMonthIndex] = useState(0);

  // Un cop sabem quin és el "avui" real (client-side), saltem al mes corresponent
  useEffect(() => {
    if (!todayKey) return;
    const todayMonthIndex = months.findIndex((month) => month.key === todayKey.slice(0, 7));
    if (todayMonthIndex !== -1) setMonthIndex(todayMonthIndex);
  }, [todayKey, months]);

  const activeMonth = months[monthIndex];
  const monthEvents = useMemo(
    () => events.filter((event) => (event.monthKey ?? event.dateTime.slice(0, 7)) === activeMonth?.key),
    [activeMonth?.key, events],
  );

  const calendarDays = useMemo(() => {
    if (!activeMonth) return [];
    const [year, month] = activeMonth.key.split("-").map(Number);
    const firstWeekday = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
    const numberOfDays = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const cells: Array<number | null> = Array.from({ length: firstWeekday }, () => null);

    for (let day = 1; day <= numberOfDays; day += 1) cells.push(day);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [activeMonth]);

  if (!activeMonth) return null;

  return (
    <div className="agendaStyledCalendar" aria-label={`Calendari de ${activeMonth.label}`}>
      <div className="agendaCalendarToolbar">
        <button
          type="button"
          aria-label="Mes anterior"
          disabled={monthIndex === 0}
          onClick={() => setMonthIndex((index) => Math.max(0, index - 1))}
        >
          ←
        </button>
        <div>
          <p>Agenda mensual</p>
          <h3>{activeMonth.label}</h3>
        </div>
        <button
          type="button"
          aria-label="Mes següent"
          disabled={monthIndex === months.length - 1}
          onClick={() => setMonthIndex((index) => Math.min(months.length - 1, index + 1))}
        >
          →
        </button>
      </div>

      <div className="agendaCalendarViewport">
        <div className="agendaCalendarInner">
          <div className="agendaCalendarWeekdays" aria-hidden="true">
            {weekdays.map((weekday) => <span key={weekday}>{weekday}</span>)}
          </div>
          <div className="agendaCalendarGrid">
            {calendarDays.map((day, index) => {
              const dayEvents = day
                ? monthEvents.filter((event) => Number(event.day) === day)
                : [];
              const isToday = day && todayKey
                ? `${activeMonth.key}-${String(day).padStart(2, "0")}` === todayKey
                : false;

              return (
                <div
                  className={`agendaCalendarDay${day ? "" : " isEmpty"}${dayEvents.length ? " hasEvents" : ""}${isToday ? " isToday" : ""}`}
                  key={`${activeMonth.key}-${index}`}
                >
                  {day ? <span className="agendaCalendarDayNumber">{day}</span> : null}
                  <div className="agendaCalendarEvents">
                    {dayEvents.map((event) => (
                      <div
                        className="agendaCalendarEvent"
                        key={event.id}
                        title={`${event.time} · ${event.title} · ${event.town} · ${event.place}`}
                      >
                        <time dateTime={event.dateTime}>{event.time}</time>
                        <strong>{event.title}</strong>
                        <span>{event.town} · {event.place}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
