import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { MarketingScripts } from "./marketing-scripts";
import "./globals.css";

// Trocar para https://web.avancini.me quando o subdomínio estiver conectado na Vercel.
const siteUrl = "https://avanciniweb.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Avancini Web | Criação de sites que vendem",
    template: "%s | Avancini Web",
  },
  description:
    "Criação de landing pages, sites institucionais e e-commerces com estratégia, design exclusivo e foco em conversão. Atendimento em Eunápolis e para todo o Brasil.",
  keywords: [
    "criação de sites",
    "criação de sites em Eunápolis",
    "landing page profissional",
    "site institucional",
    "loja virtual",
    "web design Bahia",
    "Avancini Web",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Avancini Web",
    title: "Avancini Web | Sites impossíveis de ignorar",
    description:
      "Estratégia, design e conversão para transformar sua presença digital em uma ferramenta comercial.",
    images: [
      {
        url: "/og-v2.png",
        width: 1200,
        height: 630,
        alt: "Avancini Web — sites impossíveis de ignorar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avancini Web | Sites impossíveis de ignorar",
    description:
      "Landing pages, sites institucionais e e-commerces com estratégia e design exclusivo.",
    images: ["/og-v2.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Avancini Web",
    url: siteUrl,
    description:
      "Criação de landing pages, sites institucionais e e-commerces com estratégia e foco em conversão.",
    areaServed: ["Eunápolis", "Bahia", "Brasil"],
    telephone: "+55 73 98101-9782",
    email: "ivoavancini@hotmail.com",
    parentOrganization: { "@type": "Organization", name: "Avancini OS" },
    sameAs: ["https://avanciniweb.vercel.app"],
  };

  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <MarketingScripts />
        <Analytics />
      </body>
    </html>
  );
}
