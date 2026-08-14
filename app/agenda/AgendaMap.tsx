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
  mapPosition: { left: string; top: string };
};

type EventGroup = {
  key: string;
  mapPosition: AgendaEvent["mapPosition"];
  events: AgendaEvent[];
};

export function AgendaMap({ events }: { events: AgendaEvent[] }) {
  const groups = useMemo(() => {
    const groupedEvents = new Map<string, EventGroup>();

    for (const event of events) {
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
  }, [events]);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selectedGroup = groups.find((group) => group.key === selectedKey);

  return (
    <div className="agendaCataloniaMap" aria-label="Mapa de Catalunya amb les pròximes actuacions">
      <Image
        className="agendaFixedMapImage"
        src="/catalunya-mapa-fix.png"
        alt="Mapa fix de Catalunya dividit per comarques"
        width={1920}
        height={1724}
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
        <a href="https://commons.wikimedia.org/wiki/File:Catalonia_location_map_2023_counties.svg" target="_blank" rel="noreferrer">Mapa · Wikimedia Commons</a>
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">Coordenades · OpenStreetMap</a>
      </div>
    </div>
  );
}
