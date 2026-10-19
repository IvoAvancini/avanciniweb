import type { Metadata } from "next";
import { OSHubClient } from "./os-hub-client";

export const metadata: Metadata = {
  title: { absolute: "Avancini OS | Tecnologia com identidade" },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    shortcut: "/icon",
    apple: "/icon",
  },
  description:
    "Sites sob medida e agentes de inteligência artificial para o atendimento da sua empresa no WhatsApp.",
  openGraph: {
    title: "Avancini OS | Tecnologia com identidade",
    description: "Avancini Dash para presença digital e Avancini Sync para atendimento com inteligência artificial.",
    images: [{ url: "/social/avancini-os-perfil-v2.png", width: 1254, height: 1254, alt: "Símbolo oficial Avancini OS" }],
  },
  twitter: {
    card: "summary",
    title: "Avancini OS | Tecnologia com identidade",
    description: "Avancini Dash para presença digital e Avancini Sync para atendimento com inteligência artificial.",
    images: ["/social/avancini-os-perfil-v2.png"],
  },
};

export default function AvanciniOS() {
  return <OSHubClient />;
}
