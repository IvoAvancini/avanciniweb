import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Avancini Sync | Chatbots, IA e automações" },
  description: "Chatbots, atendentes com IA e automações para responder, organizar e acompanhar oportunidades sem deixar clientes esperando.",
  alternates: { canonical: "/sync" },
  openGraph: {
    title: "Avancini Sync | Atendimento e automação com IA",
    description: "Responda mais rápido, organize oportunidades e automatize o próximo passo.",
    url: "/sync",
    images: [{ url: "/og-os.png", width: 1200, height: 630, alt: "Avancini Sync — atendimento e automação com IA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avancini Sync | Atendimento e automação com IA",
    description: "Responda mais rápido, organize oportunidades e automatize o próximo passo.",
    images: ["/og-os.png"],
  },
};

export default function SyncLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
