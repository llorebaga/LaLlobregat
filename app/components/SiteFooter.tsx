import { sitePath } from "../site-path";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerTop">
        <div><p className="eyebrow light">Parlem-ne</p><h2>Fem sonar la teva plaça.</h2></div>
        <a className="roundLink" href="mailto:representacio@lallobregat.cat">Escriu-nos <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footerBottom">
        <a className="footerBrand" href={sitePath("/")}>La Principal del Llobregat</a>
        <div className="footerContact">
          <a href="mailto:representacio@lallobregat.cat">representacio@lallobregat.cat</a>
          <a href="tel:+34629417377">629 417 377</a>
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
