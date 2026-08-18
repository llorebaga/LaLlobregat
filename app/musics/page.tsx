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
  { name: "Josep Llauradó Cardona", instrument: "Flabiol", photo: "/retrats/LL_Pep.jpg" },
  { name: "Jordi Campos Temporal", instrument: "Tible", photo: "/retrats/LL_Campos.jpg" },
  { name: "Oriol Oller Torró", instrument: "Tible", photo: "/retrats/LL_Oriol.jpg" },
  { name: "Jordi Guixé Torres", instrument: "Tenora", photo: "/retrats/LL_Guixe.jpg" },
  { name: "Jordi Molina Membrives", instrument: "Tenora", photo: "/retrats/LL_Molina.jpg" },
  { name: "Roger Santiago Casasses", instrument: "Trompeta", photo: "/retrats/LL_Roger.jpg" },
  { name: "Jordi Serrano Quevedo", instrument: "Trompeta", photo: "/retrats/LL_Serrano.jpg" },
  { name: "Toni Balada Aguilà", instrument: "Trombó", photo: "/retrats/LL_Toni.jpg" },
  { name: "Ivan Babiloni Porqueras", instrument: "Fiscorn", photo: "/retrats/LL_Ivan.jpg" },
  { name: "Joan Ballart Pedret", instrument: "Fiscorn", photo: "/retrats/LL_Joan.jpg" },
  { name: "Eduard Arribas Montagut", instrument: "Contrabaix", photo: "/retrats/LL_Eduard.jpg" },
  { name: "Marcel Sabaté Reixach", instrument: "Director", photo: "/retrats/LL_Marcel.jpg" },
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

      <section className="musicianRoster sectionPad" aria-labelledby="membres-2026">
        <div className="musicianRosterHeading">
          <p className="eyebrow">Membres 2026</p>
          <h2 id="membres-2026">Noms propis.<br /><em>Un sol so.</em></h2>
        </div>

        <div className="musicianCardGrid">
          {members.map((member) => (
            <article className="musicianCard" key={member.name}>
              <div className="musicianCardInner">
                <div className="musicianCardFace musicianCardFront">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.instrument.toLowerCase()} de La Principal del Llobregat`}
                    fill
                    sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw"
                  />
                </div>
                <div className="musicianCardFace musicianCardBack">
                  <p>{member.instrument}</p>
                  <h3>{member.name}</h3>
                </div>
              </div>
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
