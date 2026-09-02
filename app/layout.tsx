import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const [githubOwner, githubRepository] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const customDomain = process.env.CUSTOM_DOMAIN;
const siteUrl = customDomain
  ? `https://${customDomain}`
  : githubOwner && githubRepository
    ? `https://${githubOwner}.github.io/${githubRepository}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "La Principal del Llobregat · Cobla des de 1929",
    template: "%s · La Principal del Llobregat",
  },
  description:
    "La Principal del Llobregat: sardanes, concerts i música catalana des de 1929. Consulta l’agenda, què fem i la nostra història.",
  icons: {
    icon: [{ url: "/logo-lallobregat-circle.png?v=1", type: "image/png" }],
    shortcut: "/logo-lallobregat-circle.png?v=1",
    apple: [{ url: "/logo-lallobregat-circle.png?v=1", type: "image/png" }],
  },
  openGraph: {
    locale: "ca_ES",
    type: "website",
    siteName: "La Principal del Llobregat",
    title: "La Principal del Llobregat · Cobla des de 1929",
    description:
      "Arrel, música i futur. Descobreix l’agenda i la trajectòria de La Llobregat.",
    images: [{ url: `${siteUrl}/og.png`, width: 1733, height: 907, alt: "La Principal del Llobregat · Cobla des de 1929" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Principal del Llobregat · Cobla des de 1929",
    description: "Arrel, música i futur. Descobreix l’agenda i la trajectòria de La Llobregat.",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ca">
      <body>
        <a className="skipLink" href="#contingut">Salta al contingut</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
