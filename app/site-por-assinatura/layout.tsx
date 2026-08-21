import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site profissional por assinatura",
  description:
    "Landing profissional com implantação a partir de R$ 399,90 ou opção sem entrada por R$ 89,90/mês. Sites institucionais a partir de R$ 599,90.",
  alternates: { canonical: "/site-por-assinatura" },
  openGraph: {
    title: "Site profissional por assinatura | Avancini Dash",
    description:
      "Seu site profissional sem entrada: escolha uma landing de conversão, um site institucional ou solicite um projeto exclusivo.",
    url: "https://avanciniweb.vercel.app/site-por-assinatura",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Planos Avancini Dash" }],
  },
  twitter: {
    card: "summary",
    title: "Site profissional por assinatura | Avancini Dash",
    description:
      "Landing Pro, Landing Start, Site Institucional e projetos sob medida com contratação clara.",
    images: ["/og.png"],
  },
};

export default function SubscriptionLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
