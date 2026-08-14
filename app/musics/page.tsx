import type { Metadata } from "next";
import Image from "next/image";
import { sitePath } from "../site-path";

export const metadata: Metadata = {
  title: "Músics",
  description:
    "Coneix la formació i els instruments de La Principal del Llobregat.",
};

export const dynamic = "force-static";

const members = [
  { name: "Josep Llauradó Cardona", instrument: "Flabiol" },
  { name: "Jordi Campos Temporal", instrument: "Tible" },
  { name: "Oriol Oller Torró", instrument: "Tible" },
  { name: "Jordi Guixé Torres", instrument: "Tenora" },
  { name: "Jordi Molina Membrives", instrument: "Tenora" },
  { name: "Roger Santiago Casasses", instrument: "Trompeta" },
  { name: "Jordi Serrano Quevedo", instrument: "Trompeta" },
  { name: "Toni Balada Aguilà", instrument: "Trombó" },
  { name: "Ivan Babiloni Porqueras", instrument: "Fiscorn" },
  { name: "Joan Ballart Pedret", instrument: "Fiscorn" },
  { name: "Eduard Arribas Montagut", instrument: "Contrabaix" },
  { name: "Marcel Sabaté Reixach", instrument: "Director" },
];

export default function MusicsPage() {
  return (
    <main id="contingut" className="musiciansPage">
      <header className="musiciansHero">
        <div className="musiciansHeroCopy">
          <p className="simpleKicker">La formació</p>
          <h1>Els<br /><em>músics</em></h1>
          <p>
            Una mateixa respiració i un so que només existeix quan tots toquem
            junts.
          </p>
        </div>
      </header>

      <section className="musiciansPortrait sectionPad" aria-labelledby="formacio-actual">
        <div className="musiciansPortraitHeading">
          <p className="eyebrow">La Principal del Llobregat</p>
          <h2 id="formacio-actual">La formació<br /><em>actual</em></h2>
        </div>
        <div className="musiciansPortraitFrame">
          <Image
            src="/interprets-2022.avif"
            alt="Els intèrprets de La Principal del Llobregat amb els seus instruments"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 88vw"
          />
        </div>
        <div className="musiciansPortraitCaption">
          <span>Cobla La Principal del Llobregat</span>
          <span>Una formació · Un sol so</span>
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

      <section className="musicianRoster sectionPad" aria-labelledby="membres-2026">
        <div className="musicianRosterHeading">
          <p className="eyebrow">Membres 2026</p>
          <h2 id="membres-2026">Noms propis.<br /><em>Un sol so.</em></h2>
        </div>

        <div className="musicianMemberGrid">
          {members.map((member) => (
            <article className="musicianMember" key={member.name}>
              <div className="musicianMemberTop">
                <span>{member.instrument}</span>
              </div>
              <h3>{member.name}</h3>
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
