import type { Metadata } from "next";
import Image from "next/image";
import historyEvents from "../calendar-history.generated.json";
import { sitePath } from "../site-path";
import { HistoryMap } from "./HistoryMap";

export const metadata: Metadata = { title: "Història", description: "Gairebé cent anys de música, places i projectes de La Principal del Llobregat, des de la fundació a Cornellà el 1929." };
export const dynamic = "force-static";

const milestones = [
  { year: "1914", title: "L’arrel", text: "A Cornellà de Llobregat es forma l’Orquestra L’Artística Llobregatana, que durant un any porta el nom de Cobla-orquestra Llobregat. D’aquell planter en sortirà la cobla." },
  { year: "1929", title: "Els primers compassos", text: "Dídac Vilà i Moragues funda La Principal del Llobregat a Cornellà amb músics de L’Artística Llobregatana. És l’any que la cobla pren el nom que encara porta." },
  { year: "Anys 30", title: "Javimel al primer tible", text: "El fill del fundador, Jaume Vilà i Mèlich —Javimel—, consolida la formació des del primer tible. Compositor de sardanes com «Records de Can Ribot» i «Com dansen, les Violetes!», toca a la plaça d’Espanya de Barcelona i a la Festa de Germanor de la Font de Can Ribot, a la Colònia Güell." },
  { year: "1968", title: "Josep Vilà pren el relleu", text: "Gran intèrpret de flabiol, Josep Vilà i Figueras assumeix la direcció i la representació durant la segona meitat del segle XX, i situa la cobla entre les formacions més prestigioses del país." },
  { year: "Anys 70", title: "De la plaça al teatre", text: "La cobla és presència fixa al Portal de l’Àngel per la Mercè, a la plaça de la Catedral i fins al camp del FC Barcelona. El 1977 concursa al Premi Agustí Borguñó, al Teatre Municipal La Faràndula de Sabadell." },
  { year: "1978", title: "Fora de casa", text: "El retrat de Berlín obre una etapa de gires: Alemanya, Bèlgica, els Països Baixos i Gal·les, on la cobla dona el concert inaugural del Festival Internacional de Música de Llangollen." },
  { year: "1991", title: "Més enllà de les fronteres", text: "Representa Catalunya als Dies Catalans de Tunísia, i el seu so arriba fins a Nova York i l’Argentina. També esdevé capdavantera en l’acompanyament dels grans esbarts dansaires." },
  { year: "2004", title: "75 anys i Creu de Sant Jordi", text: "El 75è aniversari es celebra al Parc de Can Mercader de Cornellà, amb Josep Vilà i Antoni Ros-Marbà com a convidats d’excepció, i la Generalitat li atorga la Creu de Sant Jordi." },
  { year: "50+", title: "Una discografia extensa", text: "Més de cinquanta enregistraments documenten la seva evolució: el disc dirigit per Salvador Brotons (2004), les sardanes de Joan Jordi Beumala (2013), el treball del 90è aniversari (2019) i «Directe», enregistrat en viu al Pla de la Catedral de Barcelona. També hi consta l’adopció de la tenora barítona dins la cobla." },
  { year: "2025—26", title: "Nous diàlegs", text: "La Principal del Llobregat estrena un espectacle amb el Quartet Mèlt i obre el so de la cobla a noves complicitats, amb la veu lírica de Guillem Batllori i el piano d’Emma Stratton." },
  { year: "Avui", title: "Arrel i moviment", text: "Sota la direcció de Marcel Sabaté, la formació continua present en aplecs, cicles de concerts i festivals, mantenint viva una trajectòria que s’acosta al centenari." },
];

const archivePhotos = [
  { file: "1930-cornella.jpg", width: 480, height: 384, year: "Anys 30", text: "La cobla als seus primers anys, amb Javimel al primer tible.", credit: "Arxiu personal de Josep Vilà" },
  { file: "1948-patronat-cornella.jpg", width: 985, height: 597, year: "1948", text: "Al pati del Patronat Cultural Recreatiu de Cornellà.", credit: "Arxiu personal de Josep Vilà" },
  { file: "1971-auditori-sabadell.jpg", width: 1040, height: 648, year: "1971", text: "Concert a l’Auditori de la Caixa de Sabadell, el 26 de desembre.", credit: "Arxiu Jaume Nonell · Fons Sabadell Sardanista" },
  { file: "1972-portal-de-langel.jpg", width: 1400, height: 965, year: "1972", text: "A l’abril, tocant davant dels magatzems Jorba, al Portal de l’Àngel de Barcelona.", credit: "Arxiu Jaume Nonell" },
  { file: "1973-camp-de-cornella.jpg", width: 1400, height: 1026, year: "1973", text: "Actuació al camp de futbol de Cornellà.", credit: "Arxiu Anna Mª Pont i Soler" },
  { file: "1974-la-font-del-gat.jpg", width: 1400, height: 998, year: "1974", text: "Al restaurant La Font del Gat de Barcelona, el 16 de novembre, en l’homenatge a Sebastià Alba i Bertolín pels seus 25 anys de capdanser de la Colla Sardanista Violetes del Bosc.", credit: "Arxiu Toni Balada" },
  { file: "1978-berlin.jpg", width: 1400, height: 896, year: "1978", text: "Retratats a Berlín, amb Jordi León al primer tible i Josep Vilà al flabiol.", credit: "Arxiu Jaume Nonell" },
  { file: "1981-parc-de-les-aigues.jpg", width: 1400, height: 928, year: "1981", text: "Al Parc de les Aigües de Cornellà de Llobregat.", credit: "Arxiu Toni Balada" },
  { file: "1994-can-mercader.jpg", width: 1400, height: 972, year: "1994", text: "Al Parc de Can Mercader de Cornellà de Llobregat.", credit: "Arxiu Toni Balada" },
  { file: "2004-ros-marba.jpg", width: 497, height: 315, year: "2004", text: "El 75è aniversari, amb Josep Vilà i Figueras i Antoni Ros-Marbà com a convidats d’excepció.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "2017-aplec-dencamp.jpg", width: 1400, height: 1050, year: "2017", text: "30è Aplec d’Encamp, a Andorra, el 3 de setembre.", credit: "Jaume Nonell" },
];

const blogUrl = "https://fotosformacionsmusicalsdecatalunya.blogspot.com/";
const blogPostUrl = "https://fotosformacionsmusicalsdecatalunya.blogspot.com/2012/11/la-principal-del-llobregat_10.html";

export default function HistoriaPage() {
  return (
    <main id="contingut">
      <header className="historyHero"><div><p className="eyebrow light">Des de 1929</p><h1>Una història<br /><em>que encara sona.</em></h1></div><p className="historyLead">La nostra és una història de músics, famílies, places i públic. Una història feta de continuïtat —i de la voluntat de tornar a començar cada vegada que el flabiol fa la primera nota.</p></header>

      <section className="historyOpening sectionPad"><div className="bigYear" aria-hidden="true">1929</div><div className="openingText"><p className="eyebrow">El començament</p><h2>D’una iniciativa familiar a una cobla amb horitzó de país.</h2><p>La Principal del Llobregat va néixer a Cornellà de Llobregat de la mà de Dídac Vilà i Moragues, amb músics sortits de l’Orquestra L’Artística Llobregatana. El seu fill, Jaume Vilà i Mèlich —Javimel—, va consolidar la formació des del primer tible; a partir de 1968, el nét Josep Vilà i Figueras en va prendre el relleu com a director i representant.</p><p>Gairebé cent anys després, la cobla continua fent créixer aquell llegat amb repertori, enregistraments, viatges i projectes compartits.</p></div></section>

      <section className="timeline sectionPad" aria-label="Cronologia de La Principal del Llobregat">
        {milestones.map((item, index) => <article className="timelineItem" key={item.year}><span className="timelineIndex">{String(index + 1).padStart(2, "0")}</span><time>{item.year}</time><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}
      </section>

      <section className="historyArchive sectionPad" aria-labelledby="arxiu-title">
        <div className="historyArchiveHeading">
          <div>
            <p className="eyebrow">Àlbum del fons documental</p>
            <h2 id="arxiu-title">Gairebé un segle<br /><em>en imatges.</em></h2>
          </div>
          <p>
            Onze fotografies que van dels anys trenta a l’últim aplec d’Encamp,
            recollides al fons documental <em>Cobles, orquestres i músics de
            Catalunya</em>. Cada imatge conserva el crèdit de l’arxiu d’origen.
          </p>
        </div>

        <div className="historyArchiveGrid">
          {archivePhotos.map((photo) => (
            <figure className="historyArchivePhoto" key={photo.file}>
              <Image
                src={`/historia/${photo.file}`}
                alt={`La Principal del Llobregat, ${photo.year}: ${photo.text}`}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 760px) 100vw, 46vw"
              />
              <figcaption>
                <span>{photo.year}</span>
                <p>{photo.text}</p>
                <small>Foto: {photo.credit}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="historyPortrait sectionPad" aria-labelledby="formacio-avui">
        <div className="historyPortraitHeading">
          <p className="eyebrow">La formació d’avui</p>
          <h2 id="formacio-avui">Gairebé cent anys<br /><em>en un retrat.</em></h2>
        </div>
        <div className="historyPortraitFrame">
          <Image
            src="/interprets-2022.avif"
            alt="Els intèrprets de La Principal del Llobregat amb els seus instruments"
            fill
            sizes="(max-width: 760px) 100vw, 88vw"
          />
        </div>
        <div className="historyPortraitCaption">
          <span>Cobla La Principal del Llobregat</span>
          <span>Una formació · Un sol so</span>
        </div>
      </section>

      <section className="historyMapSection sectionPad" aria-labelledby="history-map-title">
        <div className="historyMapHeading">
          <div>
            <p className="eyebrow">La memòria del calendari</p>
            <h2 id="history-map-title">Una història<br /><em>sobre el territori.</em></h2>
          </div>
          <p>
            Explora les actuacions conservades al calendari de La Llobregat.
            Tria un any i clica qualsevol punt per descobrir on hem tocat.
          </p>
        </div>
        <HistoryMap events={historyEvents} mapSrc={sitePath("/catalunya-mapa-complet.png")} />
      </section>

      <section className="namesSection sectionPad">
        <p className="eyebrow light">Direccions i complicitats</p><h2>Una trajectòria feta<br />de moltes mirades.</h2>
        <p>La cobla ha treballat sota la batuta de mestres com Antoni Ros-Marbà, Salvador Brotons, Alfred Cañamero, Joan Lluís Moraleda, Jordi León, Francesc Benítez, Daniel Antolí i Marcel Sabaté. També ha compartit escenari amb formacions corals i instrumentals, i ha acompanyat els grans esbarts dansaires del país.</p>
        <div className="nameCloud" aria-label="Col·laboradors destacats"><span>Companyia Elèctrica Dharma</span><span>Miguel Poveda</span><span>Emma Stratton</span><span>Quartet Mèlt</span><span>Guillem Batllori</span><span>Orfeó Català</span><span>Cor Lieder Càmera</span><span>Cobla Sant Jordi — Ciutat de Barcelona</span><span>Esbart Dansaire de Rubí</span></div>
      </section>

      <section className="sourcesSection sectionPad">
        <div><p className="eyebrow">Per saber-ne més</p><h2>Fonts i memòria.</h2></div>
        <div className="sourceLinks"><a href={sitePath("/multimedia/biografia-la-principal-del-llobregat.pdf")} download>Biografia de la cobla <span>↓</span></a><a href={blogPostUrl} target="_blank" rel="noreferrer">Fons documental · La Principal del Llobregat <span>↗</span></a><a href="https://ca.wikipedia.org/wiki/La_Principal_del_Llobregat" target="_blank" rel="noreferrer">Viquipèdia <span>↗</span></a><a href="https://www.palaumusica.cat/1096647" target="_blank" rel="noreferrer">Palau de la Música Catalana <span>↗</span></a><a href="https://www.enciclopedia.cat/ec-gec-0019925.xml" target="_blank" rel="noreferrer">Enciclopèdia Catalana <span>↗</span></a></div>
        <p className="sourcesCredit">
          Les fotografies històriques i bona part de les dades d’aquesta pàgina
          provenen del fons documental <em>Cobles, orquestres i músics de
          Catalunya</em>, publicades amb permís del seu autor.{" "}
          <a href={blogUrl} target="_blank" rel="noreferrer">
            Vols saber més de la història de les diferents cobles? <span aria-hidden="true">↗</span>
          </a>
        </p>
      </section>

      <section className="historyCta"><p>La història continua a la pròxima plaça.</p><a className="button lightButton" href={sitePath("/agenda")}>Veure l’agenda <span>↗</span></a></section>
    </main>
  );
}
