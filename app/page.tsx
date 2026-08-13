import Image from "next/image";
import Link from "next/link";
import { upcomingEvents } from "./data";
import { sitePath } from "./site-path";

export default function Home() {
  const nextEvent = upcomingEvents[0];

  return (
    <main id="contingut" className="simpleHome">
      <section className="simpleHero">
        <div className="simpleHeroCopy">
          <p className="simpleKicker">Cobla · Des de 1929</p>
          <h1>La Principal<br /><em>del Llobregat</em></h1>
          <p className="simpleLead">Sardanes, concerts i música catalana amb un so propi.</p>
          <div className="simpleHeroActions">
            <Link className="simpleLightButton" href={sitePath("/agenda")}>
              Consulta l’agenda <span aria-hidden="true">↗</span>
            </Link>
            <Link className="simpleTextLink" href={sitePath("/actuacions")}>
              Veure actuacions <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <Link
          className="simpleHeroVisual"
          href={sitePath("/musics")}
          aria-label="Coneix els músics de La Principal del Llobregat"
        >
          <Image
            src="/cobla-formacio-actual.jpg"
            alt="La Principal del Llobregat amb els instruments de la cobla"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span className="simpleHeroPhotoCta">
            Coneix els músics <i aria-hidden="true">→</i>
          </span>
        </Link>
      </section>

      <section className="homeGroupPhoto" aria-label="Membres de La Principal del Llobregat">
        <div className="homeGroupPhotoFrame">
          <Image
            src="/interprets-2022.avif"
            alt="Els intèrprets de La Principal del Llobregat amb els seus instruments"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="homeGroupPhotoCaption">
          <span>La Principal del Llobregat</span>
          <span>Formació 2022</span>
        </div>
      </section>

      <section className="simpleIntro sectionPad">
        <div>
          <p className="eyebrow">La nostra música</p>
          <h2>Tradició viva.<br /><em>So de futur.</em></h2>
        </div>
        <div className="simpleIntroCopy">
          <p>
            Una formació amb gairebé un segle de trajectòria, compromesa amb la
            sardana i amb totes les possibilitats expressives de la cobla.
          </p>
          <Link className="textLink redLink" href={sitePath("/historia")}>
            Coneix la nostra història <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="simpleStats">
          <div><strong>1929</strong><span>Any de fundació</span></div>
          <div><strong>11</strong><span>Músics</span></div>
          <div><strong>1</strong><span>So inconfusible</span></div>
        </div>
      </section>

      <section className="simpleNextEvent">
        <div className="simpleNextHeading">
          <p>Pròxima actuació</p>
          <Link href={sitePath("/agenda")}>Tota l’agenda <span aria-hidden="true">→</span></Link>
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
        <Link className="simpleNextArrow" href={sitePath("/agenda")} aria-label="Veure tota l’agenda">↗</Link>
      </section>

      <section className="simpleExplore sectionPad">
        <p className="eyebrow">Descobreix la cobla</p>
        <div className="simpleExploreGrid">
          <Link href={sitePath("/agenda")}>
            <span>01</span><h2>Agenda</h2><i aria-hidden="true">↗</i>
            <p>Consulta on sonarem pròximament.</p>
          </Link>
          <Link href={sitePath("/actuacions")}>
            <span>02</span><h2>Actuacions</h2><i aria-hidden="true">↗</i>
            <p>Concerts, projectes, vídeos i fotografies.</p>
          </Link>
          <Link href={sitePath("/historia")}>
            <span>03</span><h2>Història</h2><i aria-hidden="true">↗</i>
            <p>Una trajectòria que continua sonant.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
