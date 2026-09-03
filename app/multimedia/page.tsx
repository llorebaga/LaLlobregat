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
    text: "Dossier del programa que travessa la gran òpera, la cançó catalana i les melodies mediterrànies.",
    file: "/multimedia/dossier-guillem-batllori-i-la-principal-del-llobregat.pdf",
  },
  {
    kicker: "Col·laboració Emma Stratton",
    title: "Emma Stratton i la cobla",
    text: "Dossier del projecte compartit amb la pianista Emma Stratton.",
    file: "/multimedia/dossier-emma-stratton-i-la-principal-del-llobregat.pdf",
  },
];

const channels = [
  {
    name: "YouTube",
    title: "Vídeos de la cobla",
    text: "Enregistraments d’actuacions, concerts i projectes al nostre canal.",
    href: "https://www.youtube.com/@laprincipaldelllobregat238",
    action: "Obre el canal",
  },
  {
    name: "Spotify",
    title: "Els nostres discs",
    text: "La discografia de La Principal del Llobregat, disponible per escoltar.",
    href: "https://open.spotify.com/artist/08GhB4MUhKdbiF47AlrCcd",
    action: "Escolta’ns",
  },
];

export default function MultimediaPage() {
  return (
    <main id="contingut" className="multimediaPage">
      <header className="multimediaHero sectionPad">
        <p className="eyebrow light">Recursos de la cobla</p>
        <h1>Multi<br /><em>mèdia.</em></h1>
        <p>Fotografies, dossiers, vídeos i discs de la cobla, a punt per consultar i descarregar.</p>
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

          <article className="mediaPhotoCard">
            <div className="mediaPhoto mediaPhotoLirica">
              <Image
                src="/cobla-lirica.jpg"
                alt="Imatge del projecte Cobla Lírica"
                fill
                sizes="(max-width: 760px) 100vw, 58vw"
              />
            </div>
            <div className="mediaPhotoMeta">
              <div><span>Imatge de projecte</span><strong>Cobla Lírica</strong></div>
              <a href={sitePath("/cobla-lirica.jpg")} download>JPG <span aria-hidden="true">↓</span></a>
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
            <a
              href={sitePath(doc.file)}
              target="_blank"
              rel="noreferrer"
              key={doc.file}
              className="documentCard"
            >
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

      <section className="mediaChannels sectionPad" aria-labelledby="canals-title">
        <div className="mediaSectionHeading">
          <p className="eyebrow">Escolta i mira</p>
          <h2 id="canals-title">Vídeos<br /><em>i discs.</em></h2>
        </div>

        <div className="mediaChannelGrid">
          {channels.map((channel) => (
            <a href={channel.href} target="_blank" rel="noreferrer" key={channel.name}>
              <span>{channel.name}</span>
              <i aria-hidden="true">↗</i>
              <h3>{channel.title}</h3>
              <p>{channel.text}</p>
              <strong>{channel.action}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
