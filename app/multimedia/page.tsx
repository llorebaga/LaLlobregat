import type { Metadata } from "next";
import Image from "next/image";
import { sitePath } from "../site-path";

export const metadata: Metadata = {
  title: "Multimèdia",
  description:
    "Fotografies oficials de La Principal del Llobregat per descarregar.",
};

export const dynamic = "force-static";

const documents = [
  {
    kicker: "Biografia",
    title: "La Principal del Llobregat",
    text: "Recorregut per la trajectòria de la cobla, de la fundació el 1929 fins als projectes d’avui.",
    file: "/multimedia/biografia-la-principal-del-llobregat.pdf",
  },
  {
    kicker: "Col·laboració Quartet Mèlt",
    title: "La Llobregat i els Mèlt",
    text: "Dossier de l’espectacle que uneix el so de la cobla amb les quatre veus del Quartet Mèlt, amb arranjaments de Jordi Molina.",
    file: "/multimedia/dossier-la-llobregat-i-els-melt.pdf",
  },
  {
    kicker: "Col·laboració Guillem Batllori",
    title: "Veu lírica i cobla",
    text: "Sinopsi del programa que travessa la gran òpera, la cançó catalana i les melodies mediterrànies.",
    file: "/multimedia/sinopsi-guillem-batllori-i-la-principal-del-llobregat.pdf",
  },
];

export default function MultimediaPage() {
  return (
    <main id="contingut" className="multimediaPage">
      <header className="multimediaHero sectionPad">
        <p className="eyebrow light">Recursos de la cobla</p>
        <h1>Multi<br /><em>mèdia.</em></h1>
        <p>Fotografies oficials preparades per consultar, compartir i descarregar.</p>
      </header>

      <section className="mediaPhotos sectionPad" aria-labelledby="fotografies-title">
        <div className="mediaSectionHeading">
          <p className="eyebrow">Imatges oficials</p>
          <h2 id="fotografies-title">Fotografies<br /><em>per descarregar.</em></h2>
        </div>

        <div className="mediaPhotoGrid">
          <article className="mediaPhotoCard">
            <div className="mediaPhoto mediaPhotoWhite">
              <Image
                src="/la-principal-del-llobregat-2025.jpg"
                alt="Fotografia oficial en color de La Principal del Llobregat"
                fill
                sizes="(max-width: 760px) 100vw, 58vw"
              />
            </div>
            <div className="mediaPhotoMeta">
              <div><span>Fotografia oficial</span><strong>La Principal del Llobregat</strong></div>
              <a href={sitePath("/multimedia/la-principal-del-llobregat-2025.png")} download>PNG <span aria-hidden="true">↓</span></a>
            </div>
          </article>

          <article className="mediaPhotoCard">
            <div className="mediaPhoto mediaPhotoBlack">
              <Image
                src="/multimedia/la-principal-del-llobregat-negre.png"
                alt="Retrats en blanc i negre dels músics de La Principal del Llobregat"
                fill
                sizes="(max-width: 760px) 100vw, 42vw"
              />
            </div>
            <div className="mediaPhotoMeta">
              <div><span>Retrats de la formació</span><strong>La cobla en blanc i negre</strong></div>
              <a href={sitePath("/multimedia/la-principal-del-llobregat-negre.png")} download>PNG <span aria-hidden="true">↓</span></a>
            </div>
          </article>
        </div>
      </section>

      <section className="mediaDocuments sectionPad" aria-labelledby="documents-title">
        <div className="proposalHeading lightHeading">
          <p className="eyebrow light">Dossiers i biografia</p>
          <h2 id="documents-title">Documents<br /><em>per descarregar.</em></h2>
        </div>

        <div className="documentList">
          {documents.map((doc, index) => (
            <a href={sitePath(doc.file)} download key={doc.file}>
              <span>0{index + 1}</span>
              <div>
                <h3>{doc.title}</h3>
                <p>{doc.kicker} · {doc.text}</p>
              </div>
              <strong>PDF <span aria-hidden="true">↓</span></strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
