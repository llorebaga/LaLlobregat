import Image from "next/image";
import Link from "next/link";
import { upcomingEvents } from "./data";

export default function Home() {
  const nextEvent = upcomingEvents[0];

  return (
    <main id="contingut" className="homePage">
      <section className="homeHero">
        <Image
          className="homeHeroImage"
          src="/cobla-2022.jpg"
          alt="Els músics de La Principal del Llobregat amb els seus instruments"
          fill
          priority
          sizes="100vw"
        />
        <div className="homeHeroWash" aria-hidden="true" />

        <div className="homeHeroTopline">
          <span>Cornellà de Llobregat</span>
          <span className="homeHeroLine" aria-hidden="true" />
          <span>Cobla des de 1929</span>
        </div>

        <div className="homeHeroContent">
          <p className="homeHeroKicker">La Principal del Llobregat</p>
          <h1>
            Fem sonar
            <span>Catalunya.</span>
          </h1>
          <p className="homeHeroLead">
            Gairebé un segle portant la força de la sardana a places,
            auditoris i escenaris d’arreu del país.
          </p>
          <div className="homeHeroActions">
            <Link className="button heroPrimary" href="/agenda">
              Consulta l’agenda <span aria-hidden="true">↗</span>
            </Link>
            <Link className="heroSecondary" href="/historia">
              Descobreix la cobla <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="homeHeroSeal" aria-label="La Principal del Llobregat, des de 1929">
          <span>Des de</span>
          <strong>1929</strong>
          <i aria-hidden="true">◆</i>
          <span>Cornellà</span>
        </div>

        <div className="homeHeroScroll" aria-hidden="true">
          <span>Baixa per descobrir</span>
          <i />
        </div>
      </section>

      <div className="homeMarquee" aria-label="Sardanes, concerts i cultura catalana">
        <div>
          <span>Sardanes</span><i>✦</i><span>Concerts</span><i>✦</i><span>Cultura catalana</span><i>✦</i>
          <span>Sardanes</span><i>✦</i><span>Concerts</span><i>✦</i><span>Cultura catalana</span>
        </div>
      </div>

      <section className="homeManifest sectionPad">
        <div className="homeManifestTitle">
          <p className="eyebrow">La nostra manera de fer</p>
          <h2>Arrel fonda.<br /><em>Mirada endavant.</em></h2>
        </div>
        <div className="homeManifestCopy">
          <p className="manifestLead">Una cobla és molt més que onze músics.</p>
          <p>
            És el so que convoca una plaça, la memòria que passa de generació
            en generació i una música viva que no deixa d’evolucionar. Des de
            Cornellà, La Principal del Llobregat fa país amb cada nota.
          </p>
          <Link className="textLink redLink" href="/historia">
            Coneix la nostra història <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="homeNumbers">
          <div><strong>97</strong><span>Anys fent història</span></div>
          <div><strong>11</strong><span>Músics, un sol batec</span></div>
          <div><strong>1</strong><span>So inconfusible</span></div>
        </div>
      </section>

      <section className="homeNextEvent">
        <div className="homeNextLabel">
          <span>01</span>
          <p>Pròxima actuació</p>
        </div>
        <time className="homeNextDate" dateTime={nextEvent.dateTime}>
          <strong>{nextEvent.day}</strong>
          <span>{nextEvent.month}</span>
        </time>
        <div className="homeNextInfo">
          <p>{nextEvent.type} · {nextEvent.time}</p>
          <h2>{nextEvent.title}</h2>
          <span>{nextEvent.town} — {nextEvent.place}</span>
        </div>
        <Link className="homeNextArrow" href="/agenda" aria-label="Veure tota l’agenda">
          ↗
        </Link>
      </section>

      <section className="homeSound sectionPad">
        <div className="homeSoundHeading">
          <p className="eyebrow">El so de la cobla</p>
          <h2>Onze veus.<br /><em>Una emoció.</em></h2>
          <p>Fusta, metall i corda en un equilibri únic que només existeix aquí.</p>
        </div>
        <div className="homeInstrumentList" aria-label="Famílies instrumentals de la cobla">
          <article><span>01</span><h3>Flabiol<br />i tamborí</h3><p>L’espurna que obre la rotllana.</p></article>
          <article><span>02</span><h3>Tibles<br />i tenores</h3><p>La veu de fusta, lluminosa i humana.</p></article>
          <article><span>03</span><h3>Metalls</h3><p>La força que omple cada plaça.</p></article>
          <article><span>04</span><h3>Contrabaix</h3><p>L’arrel profunda que ho sosté tot.</p></article>
        </div>
      </section>

      <section className="homeQuote">
        <span className="quoteMark" aria-hidden="true">“</span>
        <blockquote>La música és memòria,<br />però també és <em>futur.</em></blockquote>
        <p>La Principal del Llobregat</p>
      </section>

      <section className="homeDiscover sectionPad">
        <div className="homeDiscoverHeading">
          <p className="eyebrow">Continua explorant</p>
          <h2>Descobreix<br />La Llobregat.</h2>
        </div>
        <div className="homeDiscoverLinks">
          <Link href="/actuacions">
            <span>01</span>
            <div><p>Memòria audiovisual</p><h3>Actuacions</h3></div>
            <i aria-hidden="true">↗</i>
          </Link>
          <Link href="/historia">
            <span>02</span>
            <div><p>Des de Cornellà, 1929</p><h3>Història</h3></div>
            <i aria-hidden="true">↗</i>
          </Link>
          <Link href="/agenda">
            <span>03</span>
            <div><p>Ens veiem a plaça</p><h3>Agenda</h3></div>
            <i aria-hidden="true">↗</i>
          </Link>
        </div>
      </section>
    </main>
  );
}
