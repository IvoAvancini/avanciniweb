import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MarketingScripts } from "./marketing-scripts";
import "./globals.css";

// Trocar para https://web.avancini.me quando o subdomínio estiver conectado na Vercel.
const siteUrl = "https://avanciniweb.vercel.app";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Avancini OS | Tecnologia com identidade",
    template: "%s | Avancini OS",
  },
  description:
    "Avancini Dash e Avancini Sync: presença digital, atendimento com IA e automações contratadas de forma independente.",
  keywords: [
    "Avancini OS",
    "criação de sites",
    "landing page profissional",
    "site institucional",
    "chatbot para WhatsApp",
    "atendimento com inteligência artificial",
    "automação de atendimento",
    "Avancini Dash",
    "Avancini Sync",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Avancini OS",
    title: "Avancini OS | Tecnologia com identidade",
    description:
      "Encontre o gargalo que custa oportunidades e entre direto na solução certa: Avancini Dash ou Avancini Sync.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Avancini OS — tecnologia com identidade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avancini OS | Tecnologia com identidade",
    description:
      "Avancini Dash e Avancini Sync: soluções independentes para presença digital, atendimento e automação.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Avancini OS",
    url: siteUrl,
    description:
      "Empresa de tecnologia responsável pelas soluções independentes Avancini Dash e Avancini Sync.",
    areaServed: "Brasil",
    telephone: "+55 73 98101-9782",
    email: "ivoavancini@hotmail.com",
    sameAs: ["https://www.instagram.com/avancinios/"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Soluções Avancini",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Avancini Dash", description: "Criação de landings, sites institucionais e projetos digitais." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Avancini Sync", description: "Chatbots, atendentes com IA e automações." } },
      ],
    },
  };

  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
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
