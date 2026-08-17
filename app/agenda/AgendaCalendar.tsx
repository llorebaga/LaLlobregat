"use client";

import { useMemo, useState } from "react";

type CalendarEvent = {
  id: string;
  day: string;
  dateTime: string;
  title: string;
  town: string;
  time: string;
  source: string;
  monthKey?: string;
  monthLabel?: string;
};

const weekdays = ["Dl.", "Dt.", "Dc.", "Dj.", "Dv.", "Ds.", "Dg."];

export function AgendaCalendar({ events }: { events: CalendarEvent[] }) {
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

              return (
                <div
                  className={`agendaCalendarDay${day ? "" : " isEmpty"}${dayEvents.length ? " hasEvents" : ""}`}
                  key={`${activeMonth.key}-${index}`}
                >
                  {day ? <span className="agendaCalendarDayNumber">{day}</span> : null}
                  <div className="agendaCalendarEvents">
                    {dayEvents.map((event) => (
                      <a
                        className="agendaCalendarEvent"
                        href={event.source}
                        target="_blank"
                        rel="noreferrer"
                        key={event.id}
                        aria-label={`${event.time}, ${event.title}, ${event.town}`}
                      >
                        <time dateTime={event.dateTime}>{event.time}</time>
                        <strong>{event.title}</strong>
                      </a>
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
