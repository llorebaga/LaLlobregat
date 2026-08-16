"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AgendaEvent } from "../data";

const SESSION_KEY = "la-llobregat-intro-seen";

type HomeIntroProps = {
  events: AgendaEvent[];
  initialEvent: AgendaEvent;
};

function playOpeningSound() {
  const AudioContextClass = window.AudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.025);
  master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.05);
  master.connect(context.destination);

  [783.99, 1046.5].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const noteGain = context.createGain();
    const startsAt = context.currentTime + index * 0.24;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, startsAt);
    noteGain.gain.setValueAtTime(0.0001, startsAt);
    noteGain.gain.exponentialRampToValueAtTime(0.75, startsAt + 0.035);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startsAt + 0.62);
    oscillator.connect(noteGain);
    noteGain.connect(master);
    oscillator.start(startsAt);
    oscillator.stop(startsAt + 0.68);
  });

  const drum = context.createOscillator();
  const drumGain = context.createGain();
  drum.type = "triangle";
  drum.frequency.setValueAtTime(150, context.currentTime + 0.55);
  drum.frequency.exponentialRampToValueAtTime(58, context.currentTime + 0.78);
  drumGain.gain.setValueAtTime(0.0001, context.currentTime + 0.55);
  drumGain.gain.exponentialRampToValueAtTime(0.8, context.currentTime + 0.57);
  drumGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.82);
  drum.connect(drumGain);
  drumGain.connect(master);
  drum.start(context.currentTime + 0.55);
  drum.stop(context.currentTime + 0.84);

  window.setTimeout(() => void context.close(), 1_300);
}

export function HomeIntro({ events, initialEvent }: HomeIntroProps) {
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const openingButton = useRef<HTMLButtonElement | null>(null);

  const nextEvent = useMemo(() => {
    if (currentTime === null) return initialEvent;
    return events.find((event) => new Date(event.dateTime).getTime() >= currentTime) ?? initialEvent;
  }, [currentTime, events, initialEvent]);

  const closeIntro = useCallback(() => {
    window.sessionStorage.setItem(SESSION_KEY, "true");
    setVisible(false);
  }, []);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      setCurrentTime(Date.now());
      if (window.sessionStorage.getItem(SESSION_KEY) !== "true") setVisible(true);
    }, 0);

    return () => {
      window.clearTimeout(initialTimer);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeIntro();
    };
    document.body.style.overflow = "hidden";
    openingButton.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeIntro, visible]);

  const openSite = () => {
    if (opening) return;
    setOpening(true);
    window.sessionStorage.setItem(SESSION_KEY, "true");
    playOpeningSound();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimer.current = window.setTimeout(() => setVisible(false), reducedMotion ? 650 : 2_450);
  };

  if (!visible) return null;

  return (
    <section
      className={`homeIntro${opening ? " homeIntroOpening" : ""}`}
      aria-label="Introducció a La Principal del Llobregat"
      aria-modal="true"
      role="dialog"
    >
      <Image
        className="homeIntroPhoto"
        src="/la-principal-del-llobregat-2025.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="homeIntroVeil" aria-hidden="true" />
      <div className="homeIntroCircle" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="homeIntroTopline">
        <Image src="/logo-lallobregat.png" alt="La Principal del Llobregat" width={58} height={58} />
        <span>La Principal del Llobregat</span>
        <i aria-hidden="true" />
        <span>El primer compàs</span>
      </div>

      <div className="homeIntroContent">
        <p className="homeIntroKicker">El so de la cobla</p>
        <h1>Tot comença<br />amb una <em>primera nota.</em></h1>
        <button ref={openingButton} className="homeIntroButton" type="button" onClick={openSite}>
          <span>Fes sonar la cobla</span>
          <span aria-hidden="true">♪</span>
        </button>
      </div>

      <div className="homeIntroEvent" aria-live="polite">
        <span>Pròximament sonem a</span>
        <strong>{nextEvent.town}</strong>
        <small>{nextEvent.day} {nextEvent.month} · {nextEvent.time}</small>
      </div>

      <button className="homeIntroSkip" type="button" onClick={closeIntro}>
        Entra directament <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}
