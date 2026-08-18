import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avancini OS | Sites, IA e sistemas sob medida",
  description: "Sites de conversão, inteligências artificiais e sistemas de gestão para transformar sua empresa em uma operação digital conectada.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
