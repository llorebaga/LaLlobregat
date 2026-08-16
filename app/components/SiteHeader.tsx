import Image from "next/image";
import { sitePath } from "../site-path";

const navigation = [
  { href: sitePath("/"), label: "Inici" },
  { href: sitePath("/agenda"), label: "Agenda" },
  { href: sitePath("/actuacions"), label: "Què fem?" },
  { href: sitePath("/musics"), label: "Músics" },
  { href: sitePath("/historia"), label: "Història" },
  { href: sitePath("/multimedia"), label: "Multimèdia" },
];

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="headerInner">
        <a className="brand" href={sitePath("/")} aria-label="La Principal del Llobregat, inici">
          <Image className="brandLogo" src="/logo-lallobregat.png" alt="" width={46} height={46} priority />
          <span className="brandText"><strong>La Principal</strong><span>del Llobregat</span></span>
        </a>
        <nav className="desktopNav" aria-label="Navegació principal">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="headerCta" href={sitePath("/contacte")}>Contractació</a>
        <details className="mobileNav">
          <summary aria-label="Obre el menú"><span /><span /></summary>
          <nav aria-label="Navegació mòbil">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href={sitePath("/contacte")}>Contractació</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
