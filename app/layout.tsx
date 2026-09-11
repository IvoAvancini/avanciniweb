import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { MarketingScripts } from "./marketing-scripts";
import "./globals.css";

const siteUrl = "https://www.avancini.me";

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
    "Tecnologia para sua empresa ser encontrada e não perder oportunidades enquanto o cliente espera.",
  keywords: [
    "Avancini OS",
    "criação de sites",
    "landing page profissional",
    "site institucional",
    "chatbot para WhatsApp",
    "atendimento com inteligência artificial",
    "atendimento digital",
    "Avancini Dash",
    "Avancini Sync",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Avancini OS",
    title: "Avancini OS | Tecnologia com identidade",
    description:
      "Duas soluções independentes: Avancini Dash para presença digital e Avancini Sync para atendimento com IA.",
    images: [
      {
        url: "/social/avancini-os-perfil-v2.png",
        width: 1254,
        height: 1254,
        alt: "Avancini OS — tecnologia com identidade",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Avancini OS | Tecnologia com identidade",
    description:
      "Avancini Dash e Avancini Sync: duas soluções independentes para presença digital e atendimento com IA.",
    images: ["/social/avancini-os-perfil-v2.png"],
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
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Avancini Dash", description: "Criação de landing pages, sites institucionais, catálogos e lojas virtuais." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Avancini Sync", description: "Chatbots e atendentes com inteligência artificial." } },
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
      </body>
    </html>
  );
}
