import type { Metadata } from "next";
import Image from "next/image";
import { sitePath } from "../site-path";

export const metadata: Metadata = {
  title: "Què fem?",
  description:
    "Ballades de sardanes, concerts i col·laboracions de La Principal del Llobregat.",
};
export const dynamic = "force-static";

const proposals = [
  {
    kicker: "Sardanes",
    title: "Ballades",
    text: "La plaça és l’escenari natural de la cobla. Oferim ballades i audicions de sardanes per a festes majors, aplecs i programacions culturals, amb un repertori que combina els grans clàssics amb la creació actual.",
  },
  {
    kicker: "Cobla a l’escenari",
    title: "Concerts",
    text: "En format de concert, la cobla mostra tota la seva riquesa tímbrica i expressiva. Preparem programes per a teatres, auditoris, festivals i cicles culturals, adaptats a cada ocasió i pensats per escoltar la cobla amb tots els seus matisos.",
    detail:
      "Del repertori clàssic als compositors contemporanis, cada concert és una oportunitat per descobrir una formació arrelada a la tradició i plenament oberta a noves sonoritats.",
  },
  {
    kicker: "Veu i cobla",
    title: "Col·laboració Quartet Mèlt",
    text: "La Llobregat i els Mèlt uneix el so de la cobla amb les quatre veus del Quartet Mèlt. Un espectacle d’uns noranta minuts que travessa gèneres poc habituals en aquesta formació, amb repertori propi del quartet i arranjaments de Jordi Molina.",
    detail:
      "Una proposta propera i sorprenent, amb cançons com «Que tinguem sort», «Bon dia», «Qualsevol nit pot sortir el sol» o «L’himne dels pirates», transformades pel diàleg entre la veu i la cobla.",
    videos: [
      {
        title: "Teaser 01",
        file: "/multimedia/melt-teaser-01.mp4",
      },
      {
        title: "Teaser 02",
        file: "/multimedia/melt-teaser-02.mp4",
      },
    ],
    dossier: {
      title: "Dossier de l'espectacle",
      file: "/multimedia/dossier-la-llobregat-i-els-melt.pdf",
    },
  },
  {
    kicker: "Veu lírica i cobla",
    title: "Col·laboració Guillem Batllori",
    text: "Una trobada singular entre la veu lírica de Guillem Batllori i el so inconfusible de La Principal del Llobregat. El programa combina moments brillants de la gran òpera amb cançó catalana i melodies arrelades a la nostra cultura.",
    detail:
      "La proposta crea un pont natural entre l’univers operístic i la tradició musical catalana, amb peces de compositors com Eduard Toldrà i Xavier Montsalvatge, caràcter teatral i una clara inspiració mediterrània.",
    videos: [
      {
        title: "Vídeo del projecte",
        file: "/multimedia/guillem-batllori-teaser.mp4",
      },
    ],
    dossier: {
      title: "Dossier del programa",
      file: "/multimedia/dossier-guillem-batllori-i-la-principal-del-llobregat.pdf",
    },
  },
  {
    kicker: "Piano i cobla",
    title: "Col·laboració Emma Stratton",
    text: "Un projecte compartit amb la pianista Emma Stratton, que suma el piano al so de la cobla.",
    detail:
      "Consulta’n el dossier a l’apartat de multimèdia per conèixer el programa i les condicions tècniques.",
    videos: [
      {
        title: "Vídeo del projecte",
        file: "/multimedia/emma-stratton-teaser.mp4",
      },
    ],
    dossier: {
      title: "Dossier del projecte",
      file: "/multimedia/dossier-emma-stratton-i-la-principal-del-llobregat.pdf",
    },
  },
];

const buttonStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#b81424",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "0.85rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  textDecoration: "none",
  padding: "0.75rem 1.5rem",
  border: "none",
  borderRadius: 0,
  cursor: "pointer",
};

export default function ActuacionsPage() {
  return (
    <main id="contingut" className="whatWeDoPage">
      <header className="whatWeDoHero">
        <div className="whatWeDoHeroCopy">
          <p className="eyebrow light">Projectes i formats</p>
          <h1>Què<br /><em>fem?</em></h1>
          <p>
            De la plaça a l’escenari: sardanes, concerts i trobades amb altres
            veus de la música catalana.
          </p>
        </div>
        <div className="whatWeDoHeroImage">
          <Image
            src="/multimedia/la-principal-del-llobregat-negre.png"
            alt="Retrats en blanc i negre dels músics de La Principal del Llobregat"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
          />
        </div>
      </header>

      <section className="proposalSection sectionPad" aria-labelledby="propostes-title">
        <div className="proposalHeading">
          <p className="eyebrow">La cobla en directe</p>
          <h2 id="propostes-title">Diferents maneres<br /><em>de trobar-nos.</em></h2>
          <p>Clica cada proposta per descobrir-ne tots els detalls.</p>
          <a className="textLink redLink" href={sitePath("/multimedia")}>
            Descarrega els dossiers <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="proposalList">
          {proposals.map((proposal, index) => (
            <details className="proposalItem" key={proposal.title}>
              <summary>
                <span className="proposalNumber">0{index + 1}</span>
                <span className="proposalTitle">
                  <small>{proposal.kicker}</small>
                  <strong>{proposal.title}</strong>
                </span>
                <span className="proposalToggle" aria-hidden="true">+</span>
              </summary>
              <div className="proposalBody">
                <p>{proposal.text}</p>
                {proposal.detail ? <p>{proposal.detail}</p> : null}

                {proposal.videos && proposal.videos.length > 0 ? (
                  <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {proposal.videos.map((vid) => (
                      <div key={vid.file} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {vid.title ? <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{vid.title}:</span> : null}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                          <a
                            href={sitePath(vid.file)}
                            target="_blank"
                            rel="noreferrer"
                            style={buttonStyle}
                          >
                            VEURE VÍDEO
                          </a>
                          <a
                            href={sitePath(vid.file)}
                            download
                            style={buttonStyle}
                          >
                            DESCARREGAR VÍDEO
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {proposal.dossier ? (
                  <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{proposal.dossier.title}:</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                      <a
                        href={sitePath(proposal.dossier.file)}
                        target="_blank"
                        rel="noreferrer"
                        style={buttonStyle}
                      >
                        VEURE DOCUMENT
                      </a>
                      <a
                        href={sitePath(proposal.dossier.file)}
                        download
                        style={buttonStyle}
                      >
                        DESCARREGAR DOCUMENT
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
