"use client";

import { useState } from "react";
import type { ArchiveEvent } from "../data";

const filters = ["Totes", "Concert", "Sardanes", "Projecte"] as const;

export function ActuacionsGrid({ events }: { events: ArchiveEvent[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Totes");
  const visible = filter === "Totes" ? events : events.filter((event) => event.category === filter);
  return (
    <>
      <div className="filterBar" aria-label="Filtra les actuacions">
        {filters.map((item) => <button className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)} type="button">{item}</button>)}
      </div>
      <div className="archiveGrid" aria-live="polite">
        {visible.map((event) => (
          <article className="archiveCard" key={`${event.year}-${event.title}`}>
            <div className="archiveMeta"><span>{event.year}</span><span>{event.category}</span></div>
            <div className="archiveVisual" aria-hidden="true"><span>{event.town.split("·")[0].trim()}</span><strong>{event.year.slice(-2)}</strong></div>
            <div className="archiveContent">
              <p className="archiveDate">{event.date}</p><h2>{event.title}</h2><p className="archiveTown">{event.town}</p><p>{event.description}</p>
              <a href={event.link} target="_blank" rel="noreferrer">{event.mediaLabel} <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
