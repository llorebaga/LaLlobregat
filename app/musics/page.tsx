import type { Metadata } from "next";
import Image from "next/image";
import { sitePath } from "../site-path";

export const metadata: Metadata = {
  title: "Músics",
  description:
    "Coneix la formació i els instruments de La Principal del Llobregat.",
};

export const dynamic = "force-static";

const instruments = [
  {
    number: "01",
    name: "Flabiol i tamborí",
    musicians: "1 músic",
    text: "El gest que obre la rotllana i dona l’entrada a tota la cobla.",
  },
  {
    number: "02",
    name: "Tibles",
    musicians: "2 músics",
    text: "Una veu brillant, incisiva i plena de caràcter.",
  },
  {
    number: "03",
    name: "Tenores",
    musicians: "2 músics",
    text: "El timbre més emblemàtic de la cobla: càlid, ampli i expressiu.",
  },
  {
    number: "04",
    name: "Trompetes",
    musicians: "2 músics",
    text: "Claredat, energia i impuls per fer créixer cada frase.",
  },
  {
    number: "05",
    name: "Trombó",
    musicians: "1 músic",
    text: "El pont entre les veus de metall, amb força i flexibilitat.",
  },
  {
    number: "06",
    name: "Fiscorns",
    musicians: "2 músics",
    text: "Profunditat i calidesa per sostenir el cos sonor del conjunt.",
  },
  {
    number: "07",
    name: "Contrabaix",
    musicians: "1 músic",
    text: "L’arrel rítmica i harmònica sobre la qual descansa la formació.",
  },
];

export default function MusicsPage() {
  return (
    <main id="contingut" className="musiciansPage">
      <header className="musiciansHero">
        <div className="musiciansHeroCopy">
          <p className="simpleKicker">La formació</p>
          <h1>Els<br /><em>músics</em></h1>
          <p>
            Onze intèrprets, una mateixa respiració i un so que només existeix
            quan tots toquem junts.
          </p>
        </div>
        <div className="musiciansHeroNumber" aria-hidden="true">
          <strong>11</strong>
          <span>veus</span>
        </div>
      </header>

      <section className="musiciansPortrait sectionPad" aria-labelledby="formacio-actual">
        <div className="musiciansPortraitHeading">
          <p className="eyebrow">La Principal del Llobregat</p>
          <h2 id="formacio-actual">La formació<br /><em>actual</em></h2>
        </div>
        <div className="musiciansPortraitFrame">
          <Image
            src="/cobla-formacio-actual.jpg"
            alt="Els onze músics de La Principal del Llobregat amb els seus instruments"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 88vw"
          />
        </div>
        <div className="musiciansPortraitCaption">
          <span>Cobla La Principal del Llobregat</span>
          <span>Onze músics · Una cobla</span>
        </div>
      </section>

      <section className="musiciansIntro sectionPad">
        <p className="eyebrow">El so de la cobla</p>
        <h2>Una formació petita.<br /><em>Un univers sonor.</em></h2>
        <p className="musiciansIntroText">
          La cobla reuneix instruments de fusta, metall, corda i percussió en
          una combinació única. Cada músic hi aporta una veu pròpia; plegats,
          donem forma a sardanes, concerts i nous projectes.
        </p>
      </section>

      <section className="musicianSeats sectionPad" aria-label="Instruments de la cobla">
        <div className="musicianSeatGrid">
          {instruments.map((instrument) => (
            <article className="musicianSeat" key={instrument.name}>
              <div className="musicianSeatTop">
                <span>{instrument.number}</span>
                <span>{instrument.musicians}</span>
              </div>
              <h3>{instrument.name}</h3>
              <p>{instrument.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="musiciansCta">
        <div>
          <p className="eyebrow">Escolta’ns en directe</p>
          <h2>La cobla pren vida<br />damunt l’escenari.</h2>
        </div>
        <a href={sitePath("/agenda")}>Consulta l’agenda <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
