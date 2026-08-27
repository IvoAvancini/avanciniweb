import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Avancini Sync | Chatbots e Atendente IA" },
  description: "Chatbots e atendentes com IA para responder, qualificar e acompanhar oportunidades sem deixar clientes esperando.",
  alternates: { canonical: "/sync" },
  openGraph: {
    title: "Avancini Sync | Chatbots e Atendente IA",
    description: "Responda mais rápido, qualifique oportunidades e encaminhe o próximo passo.",
    url: "/sync",
    images: [{ url: "/social/avancini-os-perfil-v2.png", width: 1254, height: 1254, alt: "Símbolo oficial Avancini OS" }],
  },
  twitter: {
    card: "summary",
    title: "Avancini Sync | Chatbots e Atendente IA",
    description: "Responda mais rápido, qualifique oportunidades e encaminhe o próximo passo.",
    images: ["/social/avancini-os-perfil-v2.png"],
  },
};

export default function SyncLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
