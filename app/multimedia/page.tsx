import type { Metadata } from "next";
import Image from "next/image";
import { sitePath } from "../site-path";

export const metadata: Metadata = {
  title: "Multimèdia",
  description:
    "Fotografies, biografia i dossiers de La Principal del Llobregat per descarregar.",
};

export const dynamic = "force-static";

const documents = [
  {
    title: "Biografia de la cobla",
    description: "Una síntesi de la trajectòria de La Principal del Llobregat des de 1929 fins avui.",
    href: "/multimedia/biografia-la-principal-del-llobregat.pdf",
  },
  {
    title: "La Llobregat i els Mèlt",
    description: "Dossier complet de l’espectacle compartit amb el Quartet Mèlt.",
    href: "/multimedia/dossier-la-llobregat-i-els-melt.pdf",
  },
  {
    title: "Guillem Batllori i La Principal del Llobregat",
    description: "Sinopsi del concert que uneix veu lírica, òpera i cançó catalana.",
    href: "/multimedia/sinopsi-guillem-batllori-i-la-principal-del-llobregat.pdf",
  },
];

export default function MultimediaPage() {
  return (
    <main id="contingut" className="multimediaPage">
      <header className="multimediaHero sectionPad">
        <p className="eyebrow light">Recursos de la cobla</p>
        <h1>Multi<br /><em>mèdia.</em></h1>
        <p>Fotografies i documents preparats per consultar, compartir i descarregar.</p>
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
              <div><span>Fotografia oficial</span><strong>La Principal del Llobregat · 2025</strong></div>
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
        <div className="mediaSectionHeading lightHeading">
          <p className="eyebrow light">Dossiers</p>
          <h2 id="documents-title">Documents<br /><em>en PDF.</em></h2>
        </div>
        <div className="documentList">
          {documents.map((document, index) => (
            <a href={sitePath(document.href)} download key={document.title}>
              <span>0{index + 1}</span>
              <div><h3>{document.title}</h3><p>{document.description}</p></div>
              <strong>PDF ↓</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
