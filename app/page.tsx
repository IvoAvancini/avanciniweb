import type { Metadata } from "next";
import { OSHubClient } from "./os-hub-client";

export const metadata: Metadata = {
  title: { absolute: "Avancini OS — Tecnologia com identidade" },
  description:
    "Tecnologia para sua empresa não perder clientes antes do clique nem depois da mensagem.",
  openGraph: {
    title: "Avancini OS — Tecnologia com identidade",
    description: "Avancini Dash e Avancini Sync: duas soluções independentes para não perder oportunidades.",
    images: [{ url: "/social/avancini-os-perfil-v2.png", width: 1254, height: 1254, alt: "Símbolo oficial Avancini OS" }],
  },
  twitter: {
    card: "summary",
    title: "Avancini OS — Tecnologia com identidade",
    description: "Avancini Dash e Avancini Sync: duas soluções independentes para não perder oportunidades.",
    images: ["/social/avancini-os-perfil-v2.png"],
  },
};

export default function AvanciniOS() {
  return <OSHubClient />;
}
