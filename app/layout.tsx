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
  metadataBase: new URL("http://localhost:3000"),
  title: "Avancini OS — Tecnologia com identidade",
  description:
    "Avancini Web e Avancini Sync: duas especializações independentes para fortalecer sua presença digital e automatizar seu atendimento com IA.",
  openGraph: {
    title: "Avancini OS — Tecnologia com identidade",
    description: "Sua empresa não pode parecer menor do que ela é. Conheça Avancini Web e Avancini Sync.",
    images: ["/og-ws.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avancini OS — Tecnologia com identidade",
    description: "Sua empresa não pode parecer menor do que ela é. Conheça Avancini Web e Avancini Sync.",
    images: ["/og-ws.png"],
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
