import Image from "next/image";
import Link from "next/link";
import { upcomingEvents } from "./data";

export default function Home() {
  const nextEvent = upcomingEvents[0];
  return (
    <main id="contingut">
      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">Cobla · Cornellà de Llobregat · 1929</p>
          <h1>La música<br /><em>que ens arrela.</em></h1>
          <p className="heroLead">Gairebé un segle fent sonar la sardana amb rigor, emoció i una mirada sempre oberta al futur.</p>
          <div className="heroActions">
            <Link className="button primary" href="/agenda">Consulta l’agenda <span aria-hidden="true">↗</span></Link>
            <Link className="textLink" href="/historia">Coneix la nostra història <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="heroVisual">
          <div className="heroImageFrame">
            <Image src="/cobla-2022.jpg" alt="Músics de La Principal del Llobregat amb els seus instruments" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <p className="verticalNote">La Principal del Llobregat</p>
          <div className="heroStamp"><span>Des de</span><strong>1929</strong></div>
        </div>
      </section>

      <section className="intro sectionPad">
        <div className="introStatement"><p className="eyebrow">La Llobregat</p><h2>Tradició no vol dir quedar-se quiet.</h2></div>
        <div className="introBody">
          <p>Nascuda a Cornellà de Llobregat, la cobla ha crescut al costat del país: a places, teatres i auditoris, des de les ballades més estimades fins als projectes que fan dialogar la cobla amb noves veus.</p>
          <Link className="textLink" href="/historia">Una trajectòria viva <span aria-hidden="true">→</span></Link>
        </div>
        <div className="statGrid">
          <div><strong>97</strong><span>anys d’història</span></div>
          <div><strong>11</strong><span>músics, un sol so</span></div>
          <div><strong>∞</strong><span>ganes de fer plaça</span></div>
        </div>
      </section>

      <section className="nextEventBand">
        <p className="eyebrow light">Pròxima actuació</p>
        <div className="nextEventDate"><strong>{nextEvent.day}</strong><span>{nextEvent.month}</span></div>
        <div className="nextEventInfo"><h2>{nextEvent.title}</h2><p>{nextEvent.town} · {nextEvent.place} · {nextEvent.time}</p></div>
        <Link className="roundLink compact" href="/agenda">Tota l’agenda <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="soundSection sectionPad">
        <div className="sectionHeading"><p className="eyebrow">El nostre so</p><h2>Onze veus.<br />Una identitat.</h2></div>
        <div className="instrumentList" aria-label="Famílies instrumentals de la cobla">
          <div><span>01</span><h3>Flabiol i tamborí</h3><p>L’espurna que obre la rotllana.</p></div>
          <div><span>02</span><h3>Tibles i tenores</h3><p>La veu de fusta, lluminosa i humana.</p></div>
          <div><span>03</span><h3>Metalls</h3><p>Força, color i una energia que omple la plaça.</p></div>
          <div><span>04</span><h3>Contrabaix</h3><p>L’arrel profunda que ho sosté tot.</p></div>
        </div>
      </section>

      <section className="quoteSection"><blockquote>“La sardana és plaça, escolta i comunitat. Cada actuació torna a començar.”</blockquote><p>La Principal del Llobregat</p></section>

      <section className="discoverGrid sectionPad">
        <Link className="discoverCard terracotta" href="/actuacions"><span className="cardNumber">01</span><div><p>Memòria audiovisual</p><h2>Actuacions</h2></div><span className="cardArrow" aria-hidden="true">↗</span></Link>
        <Link className="discoverCard blue" href="/historia"><span className="cardNumber">02</span><div><p>Des de Cornellà, 1929</p><h2>Història</h2></div><span className="cardArrow" aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
