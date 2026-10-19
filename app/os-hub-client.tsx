"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AvanciniMark } from "./avancini-mark";
import "./os-hub-premium.css";

const WHATSAPP_NUMBER = "5573981019782";
const whatsappUrl =
  "https://wa.me/" +
  WHATSAPP_NUMBER +
  "?text=" +
  encodeURIComponent(
    "Olá! Quero entender se o melhor caminho para minha empresa é o Dash, o Sync ou os dois. Hoje, meu principal gargalo é:"
  );

const solutions = [
  {
    id: "dash",
    name: "Avancini Dash",
    category: "Sites e landing pages sob medida",
    title: "O site precisa explicar o negócio com clareza",
    description:
      "O Dash organiza mensagem, oferta e navegação para o visitante entender o que você faz, confiar no que vê e saber como avançar.",
    route: ["Mensagem", "Experiência", "Contato"],
    routeLabel: "O Dash organiza a mensagem, a experiência e o caminho de contato.",
    frictionLabel: "O que o site não resolve hoje",
    frictions: [
      "Quem entra no site ainda precisa perguntar o que a empresa faz",
      "A experiência no celular passa menos confiança que o serviço",
      "Orçamento, agendamento ou contato ficam difíceis de encontrar",
    ],
    deliveryLabel: "O que entra no projeto",
    capabilities: [
      "Estratégia, arquitetura e texto",
      "Design responsivo e desenvolvimento",
      "Estrutura técnica para busca e desempenho",
      "Publicação e caminhos de contato",
    ],
    result:
      "Você recebe um site claro, responsivo e preparado para levar o visitante até o contato.",
    href: "/dash",
    cta: "Ver detalhes do Avancini Dash",
  },
  {
    id: "sync",
    name: "Avancini Sync",
    category: "Atendimento com IA no WhatsApp",
    title: "O atendimento precisa acompanhar as mensagens",
    description:
      "O Sync usa informações e regras do negócio para responder, entender o interesse e preparar o próximo passo no WhatsApp.",
    route: ["Resposta", "Contexto", "Encaminhamento"],
    routeLabel: "O Sync organiza a resposta, preserva o contexto e prepara o encaminhamento.",
    frictionLabel: "O que pesa no atendimento",
    frictions: [
      "A equipe responde as mesmas perguntas todos os dias",
      "Mensagens ficam esperando ou se perdem entre outras conversas",
      "O atendimento muda de pessoa e o contexto se perde",
    ],
    deliveryLabel: "O que entra na operação",
    capabilities: [
      "Base de conhecimento e tom de voz",
      "Regras de triagem e qualificação",
      "Agendamento e acompanhamento, quando aplicável",
      "Resumo e transferência para a equipe",
    ],
    result:
      "Você recebe um atendimento configurado para responder com o contexto do negócio e preparar a conversa para a equipe.",
    href: "/sync",
    cta: "Ver detalhes do Avancini Sync",
  },
];

const diagnosis = [
  {
    id: "dash",
    category: "Presença digital",
    name: "Avancini Dash",
    pains: [
      "As pessoas chegam, mas ainda perguntam o que a empresa faz",
      "O site atual não organiza os serviços nem conduz ao contato",
    ],
    href: "/dash",
    cta: "Ver detalhes do Avancini Dash",
  },
  {
    id: "sync",
    category: "Atendimento no WhatsApp",
    name: "Avancini Sync",
    pains: [
      "As mensagens se acumulam antes de alguém responder",
      "A equipe repete respostas e retoma conversas sem contexto",
    ],
    href: "/sync",
    cta: "Ver detalhes do Avancini Sync",
  },
];

export function OSHubClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="os-premium-shell">
      <a href="#conteudo" className="os-skip-link">
        Ir para o conteúdo
      </a>

      <header className="ecosystem-header ecosystem-header--os os-header">
        <Link href="/" className="os-brand" aria-label="Avancini OS, início">
          <AvanciniMark className="os-brand-mark" />
          <span className="os-wordmark">
            <strong>AVANCINI</strong>
            <span>OS</span>
          </span>
        </Link>

        <nav className="os-nav" aria-label="Soluções Avancini">
          <Link href="/dash" className="os-nav-link-dash">
            Dash
          </Link>
          <Link href="/sync" className="os-nav-link-sync">
            Sync
          </Link>
          <a href="#diagnostico" className="os-nav-link-neutral">
            Escolher
          </a>
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="os-button os-button-header"
          aria-label="Conversar no WhatsApp sobre uma solução para sua empresa"
        >
          <span className="os-button-long">Conversar no WhatsApp</span>
          <span className="os-button-short">WhatsApp</span>
        </a>
      </header>

      <main id="conteudo">
        <section className="os-hero" aria-labelledby="os-hero-title">
          <div className="os-hero-copy">
            <h1 id="os-hero-title">
              <span>Sites que apresentam</span>
              <span>IA que atende clientes</span>
            </h1>
            <p className="os-hero-body">
              Sites sob medida para explicar sua empresa e atendimento com IA no
              WhatsApp para organizar as conversas que chegam.
            </p>
            <div className="os-hero-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="os-button os-button-primary"
              >
                Conversar no WhatsApp
              </a>
              <a href="#solucoes" className="os-text-link">
                Ver Dash e Sync
              </a>
            </div>
          </div>
        </section>

        <section className="os-solutions" id="solucoes" aria-labelledby="os-solutions-title">
          <div className="os-section-intro">
            <h2 id="os-solutions-title">Escolha pelo que precisa funcionar melhor</h2>
            <p>
              Use o Dash quando o problema está no site e o Sync quando está no
              atendimento. Eles funcionam separados e podem trabalhar juntos.
            </p>
          </div>

          <div className="os-solution-grid">
            {solutions.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className={`os-solution-card os-solution-${item.id}`}
              >
                <header className="os-solution-heading">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                </header>

                <p className="os-solution-title">{item.title}</p>
                <p className="os-solution-description">{item.description}</p>

                <div className="os-solution-route" aria-label={item.routeLabel}>
                  {item.route.map((step) => (
                    <span key={step} className="os-solution-route-step">
                      {step}
                    </span>
                  ))}
                </div>

                <div className="os-solution-details">
                  <section aria-labelledby={`${item.id}-friction`}>
                    <h4 id={`${item.id}-friction`}>{item.frictionLabel}</h4>
                    <ul>
                      {item.frictions.map((friction) => (
                        <li key={friction}>{friction}</li>
                      ))}
                    </ul>
                  </section>

                  <section aria-labelledby={`${item.id}-delivery`}>
                    <h4 id={`${item.id}-delivery`}>{item.deliveryLabel}</h4>
                    <ul>
                      {item.capabilities.map((capability) => (
                        <li key={capability}>{capability}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                <p className="os-solution-result">{item.result}</p>

                <Link href={item.href} className="os-solution-link">
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="os-diagnosis" id="diagnostico" aria-labelledby="os-diagnosis-title">
          <div className="os-diagnosis-heading">
            <h2 id="os-diagnosis-title">Qual destes problemas acontece hoje?</h2>
            <p>Abra o Dash ou o Sync pelo problema que você reconhece na sua rotina.</p>
          </div>

          <div className="os-diagnosis-grid">
            {diagnosis.map((item) => (
              <section
                key={item.id}
                className={`os-diagnosis-group os-diagnosis-${item.id}`}
                aria-labelledby={`diagnosis-${item.id}`}
              >
                <div className="os-diagnosis-group-heading">
                  <h3 id={`diagnosis-${item.id}`}>{item.category}</h3>
                  <span>{item.name}</span>
                </div>
                <ul>
                  {item.pains.map((pain) => (
                    <li key={pain}>{pain}</li>
                  ))}
                </ul>
                <Link href={item.href} className="os-diagnosis-link">
                  {item.cta}
                </Link>
              </section>
            ))}
          </div>

          <div className="os-diagnosis-combined">
            <strong>Os dois problemas aparecem juntos?</strong>
            <p>
              Comece pelo ponto que mais atrasa o cliente. Dash e Sync podem ser
              conectados depois.
            </p>
          </div>
        </section>

        <section className="os-final" aria-labelledby="os-final-title">
          <div className="os-final-copy">
            <h2 id="os-final-title">Quer entender por onde começar?</h2>
            <p>
              Conte como os clientes encontram sua empresa e o que acontece quando eles
              chamam no WhatsApp.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="os-button os-button-primary os-final-action"
          >
            Conversar sobre meu cenário
          </a>
        </section>
      </main>

      <footer className="os-footer">
        <div className="os-footer-brand">
          <AvanciniMark className="os-footer-mark" />
          <span>Avancini OS</span>
        </div>
        <p>Sites sob medida e atendimento com IA para empresas</p>
        <nav aria-label="Links institucionais">
          <Link href="/dash" className="os-nav-link-dash">
            Dash
          </Link>
          <Link href="/sync" className="os-nav-link-sync">
            Sync
          </Link>
          <a href="#diagnostico" className="os-nav-link-neutral">
            Escolher
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="os-nav-link-neutral"
          >
            Contato
          </a>
          <Link href="/termos" className="os-nav-link-neutral">
            Termos
          </Link>
          <Link href="/privacidade" className="os-nav-link-neutral">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}
