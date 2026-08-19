import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site profissional por assinatura",
  description:
    "Landing pages por R$ 97/mês e sites institucionais por R$ 247/mês, sem entrada, com hospedagem, suporte e experiência mobile.",
  alternates: { canonical: "/site-por-assinatura" },
  openGraph: {
    title: "Site profissional por assinatura | Avancini Web",
    description:
      "Seu site profissional sem entrada: escolha uma landing page, um site institucional ou solicite um projeto personalizado.",
    url: "https://avanciniweb.vercel.app/site-por-assinatura",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Site profissional por assinatura | Avancini Web",
    description:
      "Landing pages por R$ 97/mês, sites institucionais por R$ 247/mês e projetos personalizados sob orçamento.",
    images: [],
  },
};

export default function SubscriptionLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
