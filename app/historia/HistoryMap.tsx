"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type HistoryEvent = {
  id: string;
  dateTime: string;
  day: string;
  month: string;
  time: string;
  title: string;
  town: string;
  place: string;
  source: string;
  mapPosition: { left: string; top: string };
};

type HistoryGroup = {
  key: string;
  town: string;
  mapPosition: HistoryEvent["mapPosition"];
  events: HistoryEvent[];
};

export function HistoryMap({ events, mapSrc }: { events: HistoryEvent[]; mapSrc: string }) {
  const years = useMemo(
    () => [...new Set(events.map((event) => event.dateTime.slice(0, 4)))].sort((a, b) => b.localeCompare(a)),
    [events],
  );
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const visibleEvents = useMemo(
    () => selectedYear === "all"
      ? events
      : events.filter((event) => event.dateTime.startsWith(selectedYear)),
    [events, selectedYear],
  );

  const groups = useMemo(() => {
    const grouped = new Map<string, HistoryGroup>();

    for (const event of visibleEvents) {
      const key = `${event.mapPosition.left}-${event.mapPosition.top}`;
      const group = grouped.get(key);
      if (group) group.events.push(event);
      else grouped.set(key, { key, town: event.town, mapPosition: event.mapPosition, events: [event] });
    }

    return [...grouped.values()].map((group) => ({
      ...group,
      events: group.events.sort((a, b) => b.dateTime.localeCompare(a.dateTime)),
    }));
  }, [visibleEvents]);

  const selectedGroup = groups.find((group) => group.key === selectedKey);
  const firstYear = years.at(-1);
  const lastYear = years[0];

  return (
    <div className="historyMapExperience">
      <div className="historyMapToolbar">
        <div>
          <strong>{visibleEvents.length.toLocaleString("ca-ES")}</strong>
          <span>{visibleEvents.length === 1 ? "actuació recuperada" : "actuacions recuperades"}</span>
        </div>
        <div>
          <strong>{groups.length.toLocaleString("ca-ES")}</strong>
          <span>{groups.length === 1 ? "lloc al mapa" : "llocs al mapa"}</span>
        </div>
        <label>
          <span>Filtra per any</span>
          <select
            value={selectedYear}
            onChange={(event) => {
              setSelectedYear(event.target.value);
              setSelectedKey(null);
            }}
          >
            <option value="all">Tots els anys</option>
            {years.map((year) => <option value={year} key={year}>{year}</option>)}
          </select>
        </label>
      </div>

      <div className="agendaCataloniaMap historyCataloniaMap" aria-label={`Mapa històric de La Principal del Llobregat · ${selectedYear === "all" ? "tots els anys" : selectedYear}`}>
        <Image
          className="agendaFixedMapImage"
          src={mapSrc}
          alt="Mapa fix de Catalunya i la Catalunya Nord dividit per comarques"
          width={1280}
          height={1280}
          sizes="(max-width: 900px) 100vw, 86vw"
        />
        <div className="agendaMapTint" />

        {groups.map((group) => {
          const isSelected = group.key === selectedKey;
          return (
            <button
              className={`historyMapPoint${isSelected ? " isSelected" : ""}`}
              type="button"
              key={group.key}
              style={group.mapPosition}
              aria-label={`${group.town}: ${group.events.length} ${group.events.length === 1 ? "actuació" : "actuacions"}`}
              aria-expanded={isSelected}
              onClick={() => setSelectedKey(isSelected ? null : group.key)}
            />
          );
        })}

        {selectedGroup ? (
          <aside className="agendaMapInfo historyMapInfo" aria-live="polite">
            <button className="agendaMapInfoClose" type="button" aria-label="Tanca la informació" onClick={() => setSelectedKey(null)}>×</button>
            <p>{selectedGroup.town}</p>
            <h3>{selectedGroup.events.length} {selectedGroup.events.length === 1 ? "actuació" : "actuacions"}</h3>
            <div className="historyMapEventList">
              {selectedGroup.events.slice(0, 6).map((event) => (
                <div key={event.id}>
                  <time dateTime={event.dateTime}>{event.day} {event.month} {event.dateTime.slice(0, 4)}</time>
                  <strong>{event.title}</strong>
                  <span>{event.place}</span>
                </div>
              ))}
            </div>
            {selectedGroup.events.length > 6 ? <small>Mostrant les 6 actuacions més recents.</small> : null}
          </aside>
        ) : null}

        <div className="agendaMapLabel">Memòria · {firstYear}—{lastYear}</div>
        <div className="agendaMapCredits">
          <a href="https://commons.wikimedia.org/wiki/File:Mapa_de_localitzaci%C3%B3_a_les_comarques_catalanes.svg" target="_blank" rel="noreferrer">Mapa · Wikimedia Commons</a>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">Coordenades · OpenStreetMap</a>
        </div>
      </div>
    </div>
  );
}
