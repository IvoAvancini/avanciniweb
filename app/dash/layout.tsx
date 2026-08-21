import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Avancini Dash | Sites que geram oportunidades" },
  description: "Landings, sites institucionais e projetos digitais com estratégia, design e foco em transformar presença em oportunidade.",
  alternates: { canonical: "/dash" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/dash",
    siteName: "Avancini Dash",
    title: "Avancini Dash | Sites impossíveis de ignorar",
    description: "Estratégia, design e conversão para sua empresa ser encontrada, transmitir confiança e gerar novos contatos.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Avancini Dash — presença que trabalha" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avancini Dash | Sites impossíveis de ignorar",
    description: "Landings e sites profissionais com estratégia, design e foco em oportunidades.",
    images: ["/og.png"],
  },
};

export default function DashLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
