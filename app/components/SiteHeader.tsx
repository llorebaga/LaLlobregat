import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/", label: "Inici" },
  { href: "/agenda", label: "Agenda" },
  { href: "/actuacions", label: "Actuacions" },
  { href: "/historia", label: "Història" },
];

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="headerInner">
        <Link className="brand" href="/" aria-label="La Principal del Llobregat, inici">
          <Image className="brandLogo" src="/logo-lallobregat.png" alt="" width={46} height={46} priority />
          <span className="brandText"><strong>La Principal</strong><span>del Llobregat</span></span>
        </Link>
        <nav className="desktopNav" aria-label="Navegació principal">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <a className="headerCta" href="mailto:representacio@lallobregat.cat">Contractació</a>
        <details className="mobileNav">
          <summary aria-label="Obre el menú"><span /><span /></summary>
          <nav aria-label="Navegació mòbil">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <a href="mailto:representacio@lallobregat.cat">Contractació</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
