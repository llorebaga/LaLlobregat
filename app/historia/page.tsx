import type { Metadata } from "next";
import historyEvents from "../calendar-history.generated.json";
import { sitePath } from "../site-path";
import { HistoryMap } from "./HistoryMap";

export const metadata: Metadata = { title: "Història", description: "Gairebé cent anys de música, places i projectes de La Principal del Llobregat." };
export const dynamic = "force-static";

const milestones = [
  { year: "1929", title: "Els primers compassos", text: "Dídac Vilà i Moragas funda La Principal del Llobregat. El seu fill, Jaume Vilà i Mèlich —Javimel—, consolida la formació i n’impulsa la continuïtat." },
  { year: "1968", title: "Josep Vilà pren el relleu", text: "Gran intèrpret de flabiol, Josep Vilà assumeix la direcció i la representació durant la segona meitat del segle XX, i situa la cobla entre les formacions més prestigioses del país." },
  { year: "Món", title: "Més enllà de les fronteres", text: "La cobla actua en ciutats d’arreu d’Espanya i Europa, i porta el seu so fins a Nova York, l’Argentina i Tunísia. També esdevé capdavantera en l’acompanyament dels grans esbarts dansaires." },
  { year: "50+", title: "Una discografia extensa", text: "Més de cinquanta enregistraments documenten la seva evolució. Entre els projectes destacats hi ha «Directe», enregistrat en viu al Pla de la Catedral de Barcelona, i l’adopció de la tenora barítona dins la cobla." },
  { year: "2025—26", title: "Nous diàlegs", text: "La Principal del Llobregat estrena un espectacle amb el Quartet Mèlt i continua obrint el so de la cobla a noves complicitats artístiques i nous públics." },
  { year: "Avui", title: "Arrel i moviment", text: "Sota la direcció de Marcel Sabaté, la formació continua present en aplecs, cicles de concerts i festivals, mantenint viva una trajectòria que s’acosta al centenari." },
];

export default function HistoriaPage() {
  return (
    <main id="contingut">
      <header className="historyHero"><div><p className="eyebrow light">Des de 1929</p><h1>Una història<br /><em>que encara sona.</em></h1></div><p className="historyLead">La nostra és una història de músics, famílies, places i públic. Una història feta de continuïtat —i de la voluntat de tornar a començar cada vegada que el flabiol fa la primera nota.</p></header>

      <section className="historyOpening sectionPad"><div className="bigYear" aria-hidden="true">1929</div><div className="openingText"><p className="eyebrow">El començament</p><h2>D’una iniciativa familiar a una cobla amb horitzó de país.</h2><p>La Principal del Llobregat va ser fundada per Dídac Vilà i Moragas. El seu fill, Jaume Vilà i Mèlich —Javimel—, va consolidar la formació; a partir de 1968, Josep Vilà en va prendre el relleu com a director i representant.</p><p>Gairebé cent anys després, la cobla continua fent créixer aquell llegat amb repertori, enregistraments, viatges i projectes compartits.</p></div></section>

      <section className="timeline sectionPad" aria-label="Cronologia de La Principal del Llobregat">
        {milestones.map((item, index) => <article className="timelineItem" key={item.year}><span className="timelineIndex">0{index + 1}</span><time>{item.year}</time><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}
      </section>

      <section className="historyMapSection sectionPad" aria-labelledby="history-map-title">
        <div className="historyMapHeading">
          <div>
            <p className="eyebrow">La memòria del calendari</p>
            <h2 id="history-map-title">Una història<br /><em>sobre el territori.</em></h2>
          </div>
          <p>
            Explora les actuacions conservades al calendari de La Llobregat.
            Tria un any i clica qualsevol punt per descobrir on hem sonat.
          </p>
        </div>
        <HistoryMap events={historyEvents} mapSrc={sitePath("/catalunya-mapa-complet.png")} />
      </section>

      <section className="namesSection sectionPad">
        <p className="eyebrow light">Direccions i complicitats</p><h2>Una trajectòria feta<br />de moltes mirades.</h2>
        <p>La cobla ha treballat sota la batuta de mestres com Antoni Ros-Marbà, Salvador Brotons, Alfred Cañamero, Joan Lluís Moraleda, Jordi León, Francesc Benítez i Marcel Sabaté. La seva història també s’explica a través de projectes compartits amb veus, solistes i creadors d’altres llenguatges.</p>
        <div className="nameCloud" aria-label="Col·laboradors destacats"><span>Companyia Elèctrica Dharma</span><span>Miguel Poveda</span><span>Emma Stratton</span><span>Quartet Mèlt</span><span>Guillem Batllori</span></div>
      </section>

      <section className="sourcesSection sectionPad">
        <div><p className="eyebrow">Per saber-ne més</p><h2>Fonts i memòria.</h2></div>
        <div className="sourceLinks"><a href={sitePath("/multimedia/biografia-la-principal-del-llobregat.pdf")} download>Biografia de la cobla <span>↓</span></a><a href="https://www.palaumusica.cat/1096647" target="_blank" rel="noreferrer">Palau de la Música Catalana <span>↗</span></a><a href="https://www.enciclopedia.cat/ec-gec-0019925.xml" target="_blank" rel="noreferrer">Enciclopèdia Catalana <span>↗</span></a></div>
      </section>

      <section className="historyCta"><p>La història continua a la pròxima plaça.</p><a className="button lightButton" href={sitePath("/agenda")}>Veure l’agenda <span>↗</span></a></section>
    </main>
  );
}
