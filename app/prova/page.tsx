import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prova",
};

export const dynamic = "force-static";

export default function ProvaPage() {
  return (
    <main id="contingut">
      <header className="pageHero archiveHero">
        <p className="eyebrow light">Pàgina de prova</p>
        <h1>Prova</h1>
      </header>
    </main>
  );
}
