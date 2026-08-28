import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Vértice — demonstração Avancini Dash" },
  description: "Experiência demonstrativa de portfólio criada pela Avancini Dash.",
  robots: { index: false, follow: false },
};

export default function VerticeDemoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
