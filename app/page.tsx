import type { Metadata } from "next";
import { OSBrandMark } from "./os-brand-mark";
import { OSExperienceCard } from "./os-experience-card";

const instagramUrl = "https://www.instagram.com/avancinios/";
const whatsappUrl =
  "https://wa.me/5573981019782?text=Ol%C3%A1%2C%20Ivo!%20Vim%20pela%20Avancini%20OS%20e%20quero%20entender%20qual%20solu%C3%A7%C3%A3o%20resolve%20o%20gargalo%20da%20minha%20empresa.";

export const metadata: Metadata = {
  title: { absolute: "Avancini OS — Tecnologia com identidade" },
  description:
    "Duas soluções independentes para sua empresa ser encontrada e não perder oportunidades enquanto o cliente espera.",
  openGraph: {
    title: "Avancini OS — Tecnologia com identidade",
    description: "Avancini Dash e Avancini Sync: soluções completas e independentes para presença digital e atendimento com IA.",
    images: [{ url: "/og-os.png", width: 1200, height: 630, alt: "Avancini OS — Dash e Sync" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avancini OS — Tecnologia com identidade",
    description: "Avancini Dash e Avancini Sync: soluções completas e independentes para presença digital e atendimento com IA.",
    images: ["/og-os.png"],
  },
};

export default function AvanciniOS() {
  return (
    <main className="oshub-shell">
      <header className="oshub-header">
        <a className="oshub-brand" href="#inicio" aria-label="Avancini OS — início">
          <OSBrandMark />
          <span><b>AVANCINI OS</b><small>TECNOLOGIA COM IDENTIDADE</small></span>
        </a>

        <nav aria-label="Contato">
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a className="oshub-contact" href={whatsappUrl} target="_blank" rel="noreferrer">Falar conosco</a>
        </nav>
      </header>

      <div className="oshub-main" id="inicio">
        <section className="oshub-hero">
          <div className="oshub-headline">
            <span><i /> AVANCINI OS / DUAS SOLUÇÕES INDEPENDENTES</span>
            <h1>A oportunidade escapa<br /><em>antes do clique.</em><br />Ou depois da mensagem.</h1>
            <p>
              A Avancini OS encontra o vazamento e leva você direto à solução. <strong>Se não encontram sua empresa, Dash.</strong>
              <strong> Se chamam e ficam esperando, Sync.</strong>
            </p>
          </div>

          <div className="oshub-symbol-stage" aria-hidden="true">
            <span className="oshub-core-label oshub-core-label-web">ANTES DO CLIQUE</span>
            <span className="oshub-core-label oshub-core-label-sync">DEPOIS DA MENSAGEM</span>
            <i className="oshub-orbit oshub-orbit-one" />
            <i className="oshub-orbit oshub-orbit-two" />
            <i className="oshub-core-pulse" />
            <OSBrandMark large />
            <small>UMA EMPRESA. DUAS ESCOLHAS.</small>
          </div>
        </section>

        <section className="oshub-directions" aria-labelledby="directions-title">
          <div className="oshub-directions-head">
            <div>
              <span>DIAGNÓSTICO RÁPIDO · ESCOLHA O GARGALO</span>
              <h2 id="directions-title">Onde sua empresa deixa a oportunidade escapar?</h2>
            </div>
            <p><strong>Você não precisa dos dois.</strong> Entre apenas no gargalo que custa clientes hoje.</p>
          </div>

          <div className="oshub-cards">
            <OSExperienceCard
              accent="web"
              cta="Resolver este gargalo"
              description="Para quem ainda não tem site ou sente que o atual não transmite confiança, autoridade e o verdadeiro nível do negócio."
              href="/dash"
              kicker="GARGALO 01 · ANTES DO CLIQUE"
              letter="D"
              number="01"
              promise="Sua empresa não é encontrada — ou não parece pronta para ser escolhida."
              services={["Ainda não tem site", "Site ficou para trás", "Poucos contatos"]}
              title="Avancini Dash"
            />
            <OSExperienceCard
              accent="sync"
              cta="Resolver este gargalo"
              description="Para quem perde contatos por demora, falta de acompanhamento ou tarefas manuais — venham eles do WhatsApp, Instagram, anúncios ou indicação."
              href="/sync"
              kicker="GARGALO 02 · DEPOIS DA MENSAGEM"
              letter="S"
              number="02"
              promise="O cliente chama, espera e segue para outra empresa."
              services={["Resposta demora", "Contato esfria", "Retorno é esquecido"]}
              title="Avancini Sync"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
