import type { Metadata } from "next";
import { archiveEvents } from "../data";
import { ActuacionsGrid } from "./ActuacionsGrid";

export const metadata: Metadata = { title: "Actuacions", description: "Arxiu de concerts, ballades i projectes de La Principal del Llobregat." };
export const dynamic = "force-static";

export default function ActuacionsPage() {
  return (
    <main id="contingut">
      <header className="pageHero archiveHero"><p className="eyebrow light">Arxiu viu</p><h1>Actuacions</h1><p>Moments, projectes i places que formen part de la nostra memòria.</p></header>
      <section className="archiveSection sectionPad">
        <div className="archiveIntro"><h2>Una cobla es recorda<br />per com va sonar.</h2><p>Recollim concerts, ballades i col·laboracions amb enllaços a cròniques, fotografies i vídeos. Un arxiu que continuarà creixent actuació rere actuació.</p></div>
        <ActuacionsGrid events={archiveEvents} />
      </section>
    </main>
  );
}
