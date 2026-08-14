"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type AgendaEvent = {
  id: string;
  day: string;
  month: string;
  dateTime: string;
  title: string;
  place: string;
  town: string;
  time: string;
  type: string;
  source: string;
  monthKey?: string;
  monthLabel?: string;
  mapPosition: { left: string; top: string };
};

type EventGroup = {
  key: string;
  mapPosition: AgendaEvent["mapPosition"];
  events: AgendaEvent[];
};

export function AgendaMap({ events, mapSrc }: { events: AgendaEvent[]; mapSrc: string }) {
  const monthOptions = useMemo(() => {
    const months = new Map<string, { key: string; label: string; count: number }>();

    for (const event of events) {
      const key = event.monthKey ?? event.dateTime.slice(0, 7);
      const label = event.monthLabel ?? new Intl.DateTimeFormat("ca-ES", {
        month: "long",
        year: "numeric",
        timeZone: "Europe/Madrid",
      }).format(new Date(event.dateTime));
      const month = months.get(key);

      if (month) month.count += 1;
      else months.set(key, { key, label, count: 1 });
    }

    return [...months.values()].sort((first, second) => first.key.localeCompare(second.key));
  }, [events]);

  const [selectedMonthKey, setSelectedMonthKey] = useState(monthOptions[0]?.key ?? "");
  const visibleEvents = useMemo(
    () => events.filter((event) => (event.monthKey ?? event.dateTime.slice(0, 7)) === selectedMonthKey),
    [events, selectedMonthKey],
  );

  const groups = useMemo(() => {
    const groupedEvents = new Map<string, EventGroup>();

    for (const event of visibleEvents) {
      const key = `${event.mapPosition.left}-${event.mapPosition.top}`;
      const group = groupedEvents.get(key);

      if (group) {
        group.events.push(event);
      } else {
        groupedEvents.set(key, {
          key,
          mapPosition: event.mapPosition,
          events: [event],
        });
      }
    }

    return [...groupedEvents.values()];
  }, [visibleEvents]);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selectedGroup = groups.find((group) => group.key === selectedKey);

  return (
    <div className="agendaMonthlyMap">
      <nav className="agendaMonthSelector" aria-label="Selecciona el mes del mapa">
        {monthOptions.map((month) => {
          const isActive = month.key === selectedMonthKey;
          return (
            <button
              key={month.key}
              type="button"
              className={isActive ? "isActive" : ""}
              aria-pressed={isActive}
              onClick={() => {
                setSelectedMonthKey(month.key);
                setSelectedKey(null);
              }}
            >
              <span>{month.label}</span>
              <small>{month.count} {month.count === 1 ? "actuació" : "actuacions"}</small>
            </button>
          );
        })}
      </nav>

      <div className="agendaCataloniaMap" aria-label={`Mapa de Catalunya · ${monthOptions.find((month) => month.key === selectedMonthKey)?.label ?? "Agenda"}`}>
        <Image
          className="agendaFixedMapImage"
          src={mapSrc}
          alt="Mapa fix de Catalunya i la Catalunya Nord dividit per comarques"
          width={1280}
          height={1280}
          sizes="(max-width: 900px) 100vw, 86vw"
          priority
        />
        <div className="agendaMapTint" />

        {groups.map((group) => {
          const firstEvent = group.events[0];
          const isSelected = group.key === selectedKey;
          const label = group.events.length > 1
            ? `${group.events.length} actuacions a ${firstEvent.town}`
            : `${firstEvent.day} ${firstEvent.month}, ${firstEvent.title}, ${firstEvent.town}`;

          return (
            <button
              className={`agendaMapPoint${isSelected ? " isSelected" : ""}`}
              key={group.key}
              type="button"
              style={group.mapPosition}
              aria-label={label}
              aria-expanded={isSelected}
              onClick={() => setSelectedKey(isSelected ? null : group.key)}
            />
          );
        })}

        {selectedGroup ? (
          <aside className="agendaMapInfo" aria-live="polite">
            <button
              className="agendaMapInfoClose"
              type="button"
              aria-label="Tanca la informació"
              onClick={() => setSelectedKey(null)}
            >
              ×
            </button>
            <p>{selectedGroup.events[0].town}</p>
            {selectedGroup.events.map((event) => (
              <article key={event.id}>
                <time dateTime={event.dateTime}>{event.day} {event.month} · {event.time}</time>
                <h3>{event.title}</h3>
                <span>{event.place}</span>
                <a href={event.source} target="_blank" rel="noreferrer">
                  Veure al calendari <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </aside>
        ) : null}

        <div className="agendaMapLabel">Catalunya</div>
        <div className="agendaMapCredits">
          <a href="https://commons.wikimedia.org/wiki/File:Mapa_de_localitzaci%C3%B3_a_les_comarques_catalanes.svg" target="_blank" rel="noreferrer">Mapa · Wikimedia Commons</a>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">Coordenades · OpenStreetMap</a>
        </div>
      </div>
    </div>
  );
}
