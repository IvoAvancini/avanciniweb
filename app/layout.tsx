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
  title: "Avancini OS — Web para atrair. Sync para atender.",
  description:
    "Avancini Web cria a presença que atrai. Avancini Sync usa IA para atender, qualificar e acompanhar. Comece por uma ou conecte as duas.",
  openGraph: {
    title: "Avancini OS — Web para atrair. Sync para atender.",
    description: "Duas especializações: presença digital e atendimento com inteligência artificial.",
    images: ["/og-ws.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avancini OS — Web para atrair. Sync para atender.",
    description: "Duas especializações: presença digital e atendimento com inteligência artificial.",
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
