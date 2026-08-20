import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avancini-os.fsddfsdfdsfdfsdffds.chatgpt.site"),
  title: "Avancini OS — Tecnologia que conecta negócios",
  description:
    "Conheça o ecossistema Avancini: Web para presença digital, Sync para sistemas e CRM, e Brain para automação e inteligência artificial.",
  openGraph: {
    title: "Avancini OS — Web. Sync. Brain.",
    description: "Presença digital, sistemas conectados e automação com inteligência artificial em um único ecossistema.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avancini OS — Web. Sync. Brain.",
    description: "Presença digital, sistemas conectados e automação com inteligência artificial em um único ecossistema.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
