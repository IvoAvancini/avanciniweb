import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Cora Imóveis — demonstração Avancini Dash" },
  description: "Experiência demonstrativa de portfólio criada pela Avancini Dash.",
  robots: { index: false, follow: false },
};

export default function CoraDemoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
