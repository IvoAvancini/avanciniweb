import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avancini Web | Sites impossíveis de ignorar",
  description: "Sites institucionais, landing pages e lojas virtuais criados para posicionar sua empresa, despertar desejo e transformar visitas em clientes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
