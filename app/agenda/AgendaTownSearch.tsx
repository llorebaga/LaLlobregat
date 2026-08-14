"use client";

import { useEffect, useMemo, useState } from "react";

type SearchEvent = {
  id: string;
  dateTime: string;
  day: string;
  month: string;
  time: string;
  title: string;
  town: string;
  place: string;
  source: string;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("ca")
    .trim();
}

export function AgendaTownSearch({ events }: { events: SearchEvent[] }) {
  const [query, setQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(Date.now());
    updateCurrentTime();
    const timer = window.setInterval(updateCurrentTime, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const futureEvents = useMemo(
    () => events.filter((event) => !currentTime || new Date(event.dateTime).getTime() >= currentTime),
    [currentTime, events],
  );

  const towns = useMemo(
    () => [...new Set(futureEvents.map((event) => event.town))].sort((a, b) => a.localeCompare(b, "ca")),
    [futureEvents],
  );

  const normalizedQuery = normalize(query);
  const matches = useMemo(() => {
    if (normalizedQuery.length < 2) return [];

    return futureEvents.filter((event) =>
      normalize(event.town).includes(normalizedQuery)
      || normalize(event.title).includes(normalizedQuery),
    );
  }, [futureEvents, normalizedQuery]);

  return (
    <section className="agendaTownSearch sectionPad" aria-labelledby="town-search-title">
      <div className="agendaTownSearchIntro">
        <p className="eyebrow">Busca el teu poble</p>
        <h2 id="town-search-title">Hi sonarem<br /><em>aviat?</em></h2>
        <p>
          Escriu un municipi i comprova si La Llobregat hi té alguna actuació
          programada pròximament.
        </p>
      </div>

      <div className="agendaTownSearchPanel">
        <label htmlFor="agenda-town-query">Municipi</label>
        <div className="agendaTownSearchField">
          <input
            id="agenda-town-query"
            type="search"
            list="agenda-town-options"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex. Calella, Rubí, Barcelona…"
            autoComplete="off"
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} aria-label="Esborra la cerca">×</button>
          ) : null}
        </div>
        <datalist id="agenda-town-options">
          {towns.map((town) => <option value={town} key={town} />)}
        </datalist>

        <div className="agendaTownSearchResults" aria-live="polite">
          {normalizedQuery.length < 2 ? (
            <p className="agendaTownSearchHint">Comença a escriure per consultar les pròximes actuacions.</p>
          ) : matches.length ? (
            <>
              <p className="agendaTownSearchStatus isFound">
                Sí — hem trobat {matches.length} {matches.length === 1 ? "actuació" : "actuacions"}.
              </p>
              <div className="agendaTownMatchList">
                {matches.map((event) => (
                  <a href={event.source} target="_blank" rel="noreferrer" key={event.id}>
                    <time dateTime={event.dateTime}>{event.day} {event.month} · {event.time}</time>
                    <strong>{event.title}</strong>
                    <span>{event.town} · {event.place}</span>
                    <i aria-hidden="true">↗</i>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <p className="agendaTownSearchStatus">
              Encara no hi ha cap actuació programada que coincideixi amb «{query.trim()}».
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
