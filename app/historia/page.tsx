import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Història", description: "La història de La Principal del Llobregat, des de Cornellà l’any 1929 fins avui." };
export const dynamic = "force-static";

const milestones = [
  { year: "1929", title: "Neix una cobla a Cornellà", text: "Músics de l’Orquestra Artística Llobregatana, dirigida per Dídac Vilà, formen la nova cobla. Un diumenge de març sona per primera vegada a la Unió Social de Cornellà." },
  { year: "1930—70", title: "Consolidar una veu pròpia", text: "Jaume Vilà —Javimel— consolida la formació i, amb la continuïtat del seu fill Josep Vilà, la porta cap a un alt nivell musical i un prestigi reconegut arreu del país." },
  { year: "2004", title: "Setanta-cinc anys", text: "La cobla celebra tres quarts de segle de trajectòria i rep la Creu de Sant Jordi, un reconeixement a la seva contribució continuada a la cultura catalana." },
  { year: "2017", title: "Directe, una gravació pionera", text: "La formació publica un projecte enregistrat en viu al Pla de la Seu, una manera honesta i immediata de capturar el so de la cobla davant del públic." },
  { year: "2019", title: "Imparables", text: "Un espectacle teatral amb cançons populars que repassa cent anys d’història de Catalunya i amplia, una vegada més, els territoris expressius de la cobla." },
  { year: "Avui", title: "Arrel i moviment", text: "La Principal del Llobregat continua present en ballades, concursos, festivals i auditoris, treballant amb directors, cors, solistes i creadors de disciplines diverses." },
];

export default function HistoriaPage() {
  return (
    <main id="contingut">
      <header className="historyHero"><div><p className="eyebrow light">Cornellà de Llobregat · 1929</p><h1>Una història<br /><em>que encara sona.</em></h1></div><p className="historyLead">La nostra és una història de músics, famílies, places i públic. Una història feta de continuïtat —i de la voluntat de tornar a començar cada vegada que el flabiol fa la primera nota.</p></header>

      <section className="historyOpening sectionPad"><div className="bigYear" aria-hidden="true">1929</div><div className="openingText"><p className="eyebrow">El començament</p><h2>D’una orquestra local a una cobla amb horitzó de país.</h2><p>La Principal del Llobregat va néixer amb músics de l’Orquestra Artística Llobregatana de Cornellà. Sota l’impuls de Dídac Vilà i, més endavant, de Jaume Vilà —Javimel— i Josep Vilà, aquella nova formació es convertiria en una de les veus més sòlides de la música per a cobla.</p></div></section>

      <section className="timeline sectionPad" aria-label="Cronologia de La Principal del Llobregat">
        {milestones.map((item, index) => <article className="timelineItem" key={item.year}><span className="timelineIndex">0{index + 1}</span><time>{item.year}</time><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}
      </section>

      <section className="namesSection sectionPad">
        <p className="eyebrow light">Direccions i complicitats</p><h2>Una trajectòria feta<br />de moltes mirades.</h2>
        <p>La cobla ha treballat sota la batuta de mestres com Antoni Ros-Marbà, Salvador Brotons, Alfred Cañamero, Joan Lluís Moraleda, Jordi León, Francesc Benítez i Marcel Sabaté. També ha compartit projectes amb formacions corals, instrumentals, rítmiques i altres cobles.</p>
        <div className="nameCloud" aria-label="Col·laboradors destacats"><span>Orfeó Català</span><span>Cor Lieder Càmera</span><span>Manel Camp</span><span>Tactequeté</span><span>Esteve Molero</span><span>Quartet Mèlt</span></div>
      </section>

      <section className="sourcesSection sectionPad">
        <div><p className="eyebrow">Per saber-ne més</p><h2>Fonts i memòria.</h2></div>
        <div className="sourceLinks"><a href="https://www.palaumusica.cat/1096647" target="_blank" rel="noreferrer">Palau de la Música Catalana <span>↗</span></a><a href="https://www.enciclopedia.cat/ec-gec-0019925.xml" target="_blank" rel="noreferrer">Enciclopèdia Catalana <span>↗</span></a><a href="https://brufaganya.cat/cobla-la-principal-del-llobregat-i-el-quartet-melt/" target="_blank" rel="noreferrer">Nits Musicals de la Brufaganya <span>↗</span></a></div>
      </section>

      <section className="historyCta"><p>La història continua a la pròxima plaça.</p><Link className="button lightButton" href="/agenda">Veure l’agenda <span>↗</span></Link></section>
    </main>
  );
}
