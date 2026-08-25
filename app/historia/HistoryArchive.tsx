"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ArchivePhoto = {
  file: string;
  width: number;
  height: number;
  label: string;
  part?: string;
  context: string;
  names?: string;
  credit: string;
};

function decadeOf(label: string) {
  const four = label.match(/\b(\d{4})\b/);
  if (four) return Math.floor(Number(four[1]) / 10) * 10;
  const two = label.match(/\b(\d{2})\b/);
  if (two) return 1900 + Math.floor(Number(two[1]) / 10) * 10;
  return 0;
}

export function HistoryArchive({ photos, thumbBase, fullBase }: {
  photos: ArchivePhoto[];
  thumbBase: string;
  fullBase: string;
}) {
  const decades = useMemo(() => {
    const found = new Map<number, number>();
    for (const photo of photos) {
      const decade = decadeOf(photo.label);
      found.set(decade, (found.get(decade) ?? 0) + 1);
    }
    return [...found.entries()].sort((first, second) => first[0] - second[0]);
  }, [photos]);

  const [decade, setDecade] = useState<number | null>(null);
  const visible = useMemo(
    () => (decade === null ? photos : photos.filter((photo) => decadeOf(photo.label) === decade)),
    [decade, photos],
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const open = openIndex !== null ? visible[openIndex] : null;

  const close = useCallback(() => {
    setOpenIndex(null);
    lastTrigger.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((index) => {
        if (index === null) return index;
        return (index + delta + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [close, openIndex, step]);

  return (
    <div className="albumViewer">
      <nav className="albumFilter" aria-label="Filtra l’àlbum per dècades">
        <button
          type="button"
          className={decade === null ? "isActive" : ""}
          aria-pressed={decade === null}
          onClick={() => { setDecade(null); setOpenIndex(null); }}
        >
          Totes <small>{photos.length}</small>
        </button>
        {decades.map(([value, count]) => (
          <button
            key={value}
            type="button"
            className={decade === value ? "isActive" : ""}
            aria-pressed={decade === value}
            onClick={() => { setDecade(value); setOpenIndex(null); }}
          >
            {value >= 2000 ? `Anys ${value}` : `Anys ${String(value).slice(2)}`} <small>{count}</small>
          </button>
        ))}
      </nav>

      <ul className="albumGrid">
        {visible.map((photo, index) => (
          <li key={photo.file}>
            <button
              type="button"
              onClick={(event) => { lastTrigger.current = event.currentTarget; setOpenIndex(index); }}
            >
              <Image
                src={`${thumbBase}${photo.file}`}
                alt=""
                width={400}
                height={300}
                sizes="(max-width: 620px) 45vw, (max-width: 1100px) 30vw, 22vw"
              />
              <span className="albumYear">{photo.label}{photo.part ? ` · ${photo.part}` : ""}</span>
              <span className="visuallyHidden">{photo.context}</span>
            </button>
          </li>
        ))}
      </ul>

      {open ? (
        <div className="albumLightbox">
          <button className="albumBackdrop" type="button" tabIndex={-1} aria-hidden="true" onClick={close} />
          <div
            className="albumLightboxInner"
            role="dialog"
            aria-modal="true"
            aria-label={`${open.label}: ${open.context}`}
            tabIndex={-1}
            ref={dialogRef}
          >
            <button className="albumClose" type="button" onClick={close} aria-label="Tanca la imatge">×</button>

            <div className="albumStage">
              <button className="albumNav albumNavPrev" type="button" onClick={() => step(-1)} aria-label="Imatge anterior">‹</button>
              <Image
                key={open.file}
                src={`${fullBase}${open.file}`}
                alt={`La Principal del Llobregat, ${open.label}: ${open.context}`}
                width={open.width}
                height={open.height}
                sizes="(max-width: 900px) 96vw, 68vw"
              />
              <button className="albumNav albumNavNext" type="button" onClick={() => step(1)} aria-label="Imatge següent">›</button>
            </div>

            <div className="albumInfo">
              <p className="albumInfoYear">
                {open.label}{open.part ? <i> · {open.part}</i> : null}
                <b>{(openIndex ?? 0) + 1} / {visible.length}</b>
              </p>
              <p className="albumInfoText">{open.context}</p>
              {open.names ? <p className="albumInfoNames">{open.names}</p> : null}
              <small>Foto: {open.credit}</small>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
