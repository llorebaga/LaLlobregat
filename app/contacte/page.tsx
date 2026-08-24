import type { Metadata } from "next";
import { CopyContactButton } from "./CopyContactButton";

export const metadata: Metadata = {
  title: "Contacte i contractació",
  description:
    "Dades de contacte i contractació de La Principal del Llobregat.",
};

export const dynamic = "force-static";

export default function ContactePage() {
  return (
    <main id="contingut" className="contactPage">
      <header className="contactHero sectionPad">
        <p className="eyebrow light">Contacte i contractació</p>
        <h1>Parlem<br /><em>de música.</em></h1>
        <p>
          Per consultar disponibilitat, demanar una proposta o portar La
          Principal del Llobregat al teu municipi, contacta amb el nostre
          representant.
        </p>
      </header>

      <section className="contactDetails sectionPad" aria-labelledby="contacte-title">
        <div className="contactDetailsHeading">
          <p className="eyebrow">Dades de contacte</p>
          <h2 id="contacte-title">Ivan<br /><em>Babiloni Porqueras.</em></h2>
          <p>Representant de La Principal del Llobregat</p>
        </div>

        <div className="contactCards">
          <article className="contactCard">
            <span>Correu electrònic</span>
            <strong>representacio@lallobregat.cat</strong>
            <CopyContactButton value="representacio@lallobregat.cat" label="Copia el correu" />
          </article>

          <article className="contactCard">
            <span>Telèfon</span>
            <strong>629 417 377</strong>
            <CopyContactButton value="629 417 377" label="Copia el telèfon" />
          </article>

        </div>
      </section>
    </main>
  );
}
