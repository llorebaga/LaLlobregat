import { sitePath } from "../site-path";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerTop">
        <div><p className="eyebrow light">Parlem-ne</p><h2>Fem sonar la teva plaça.</h2></div>
        <a className="roundLink" href={sitePath("/contacte")}>Escriu-nos <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footerBottom">
        <a className="footerBrand" href={sitePath("/")}>La Principal del Llobregat</a>
        <div className="footerContact">
          <a href={sitePath("/contacte")}>representacio@lallobregat.cat</a>
          <span>629 417 377</span>
          <span>Representant · Ivan Babiloni</span>
        </div>
        <div className="footerSocial">
          <a href="https://www.instagram.com/lallobregat/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="https://ca-es.facebook.com/cobla.lallobregat" target="_blank" rel="noreferrer">Facebook ↗</a>
          <a href="https://www.youtube.com/@laprincipaldelllobregat238" target="_blank" rel="noreferrer">YouTube ↗</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} · Des de 1929</p>
      </div>
    </footer>
  );
}
