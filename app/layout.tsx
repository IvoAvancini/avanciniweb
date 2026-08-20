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
  title: "Avancini OS — A tecnologia certa para o próximo passo",
  description:
    "Descubra se sua empresa precisa de presença digital, sistemas e CRM ou automação com IA. A Avancini OS direciona você para a frente certa.",
  openGraph: {
    title: "Avancini OS — A tecnologia certa para o próximo passo",
    description: "Web, Sync ou Brain: comece pela frente que sua empresa realmente precisa agora.",
    images: ["/og-v2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avancini OS — A tecnologia certa para o próximo passo",
    description: "Web, Sync ou Brain: comece pela frente que sua empresa realmente precisa agora.",
    images: ["/og-v2.png"],
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
