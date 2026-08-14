"use client";

import { useEffect, useMemo, useState } from "react";
import type { AgendaEvent } from "../data";
import { sitePath } from "../site-path";

type HomeNextEventProps = {
  events: AgendaEvent[];
  initialEvent: AgendaEvent;
};

export function HomeNextEvent({ events, initialEvent }: HomeNextEventProps) {
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(Date.now());

    updateCurrentTime();
    const timer = window.setInterval(updateCurrentTime, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const nextEvent = useMemo(() => {
    if (currentTime === null) return initialEvent;

    return events.find(
      (event) => new Date(event.dateTime).getTime() >= currentTime,
    ) ?? initialEvent;
  }, [currentTime, events, initialEvent]);

  return (
    <section className="simpleNextEvent" aria-live="polite">
      <div className="simpleNextHeading">
        <p>Pròxima actuació</p>
        <a href={sitePath("/agenda")}>Tota l’agenda <span aria-hidden="true">→</span></a>
      </div>
      <time dateTime={nextEvent.dateTime}>
        <strong>{nextEvent.day}</strong>
        <span>{nextEvent.month}</span>
      </time>
      <div className="simpleNextDetails">
        <p>{nextEvent.type} · {nextEvent.time}</p>
        <h2>{nextEvent.title}</h2>
        <span>{nextEvent.town} — {nextEvent.place}</span>
      </div>
      <a
        className="simpleNextArrow"
        href={nextEvent.source}
        target="_blank"
        rel="noreferrer"
        aria-label="Veure aquesta actuació al calendari"
      >
        ↗
      </a>
    </section>
  );
}
