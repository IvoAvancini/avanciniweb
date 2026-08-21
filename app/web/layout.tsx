import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Avancini Dash | Sites que geram oportunidades" },
  description: "A antiga rota Avancini Web agora apresenta a experiência Avancini Dash.",
  alternates: { canonical: "/dash" },
  robots: { index: false, follow: true },
};

export default function LegacyWebLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
