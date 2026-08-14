import type { Metadata } from "next";

export const metadata: Metadata = { title: "Actuacions", description: "Arxiu de concerts, ballades i projectes de La Principal del Llobregat." };
export const dynamic = "force-static";

export default function ActuacionsPage() {
  return (
    <main id="contingut" className="emptyArchivePage">
      <section className="emptyArchive sectionPad">
        <p className="eyebrow">Arxiu en preparació</p>
        <h1>Actuacions</h1>
        <p className="emptyArchiveLead">
          Properament hi publicarem la documentació dels projectes, concerts i ballades de la cobla.
        </p>
        <div className="emptyArchiveCategories" aria-label="Tipus d’actuacions que s’hi publicaran">
          <span>MÈLT</span>
          <span>Concerts</span>
          <span>Ballades</span>
        </div>
      </section>
    </main>
  );
}
