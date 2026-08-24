import { sitePath } from "../site-path";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/lallobregat/",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "Facebook",
    href: "https://ca-es.facebook.com/cobla.lallobregat",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@laprincipaldelllobregat238",
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10.6 9.3 15.6 12l-5 2.7z" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/artist/08GhB4MUhKdbiF47AlrCcd",
    icon: (
      <>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M7.3 9.5c3-.8 6.3-.4 8.9 1" />
        <path d="M8 12.7c2.4-.6 5.1-.3 7.2.9" />
        <path d="M8.7 15.7c1.9-.5 4-.2 5.6.7" />
      </>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerTop">
        <div><p className="eyebrow light">Parlem-ne</p><h2>Toquem a la teva plaça.</h2></div>
        <a className="roundLink" href={sitePath("/contacte")}>Escriu-nos <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footerBottom">
        <a className="footerBrand" href={sitePath("/")}>La Principal del Llobregat</a>
        <div className="footerContact">
          <a href={sitePath("/contacte")}>representacio@lallobregat.cat</a>
          <span>629 417 377</span>
          <span>Representant · Ivan Babiloni Porqueras</span>
        </div>
        <ul className="footerSocial">
          {socialLinks.map((social) => (
            <li key={social.name}>
              <a href={social.href} target="_blank" rel="noreferrer" title={social.name}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  {social.icon}
                </svg>
                <span className="visuallyHidden">{social.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="copyright">© {new Date().getFullYear()} · Des de 1929</p>
      </div>
    </footer>
  );
}
