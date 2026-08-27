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
    images: [{ url: "/social/avancini-os-perfil-v2.png", width: 1254, height: 1254, alt: "Símbolo oficial Avancini OS" }],
  },
  twitter: {
    card: "summary",
    title: "Avancini Dash | Sites impossíveis de ignorar",
    description: "Landings e sites profissionais com estratégia, design e foco em oportunidades.",
    images: ["/social/avancini-os-perfil-v2.png"],
  },
};

export default function DashLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
