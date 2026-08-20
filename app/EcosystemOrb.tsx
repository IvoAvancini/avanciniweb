"use client";

import { useState, type CSSProperties } from "react";

const whatsappBase = "https://wa.me/5573981019782?text=";

const units = {
  web: {
    key: "W",
    name: "AVANCINI WEB",
    label: "Quero vender e transmitir mais confiança",
    area: "PRESENÇA DIGITAL",
    headline: "Sua empresa precisa ser percebida antes de ser escolhida.",
    description:
      "Sites e páginas comerciais que transformam a primeira impressão em confiança, autoridade e novas oportunidades.",
    signs: ["O site atual não representa sua empresa", "As visitas não viram contatos", "Sua marca depende apenas das redes sociais"],
    tags: ["Sites", "Landing pages", "Conversão"],
    accent: "#ef3340",
    href: process.env.NEXT_PUBLIC_AVANCINI_WEB_URL || "https://avanciniweb.vercel.app",
    cta: "Visitar Avancini Web",
  },
  sync: {
    key: "S",
    name: "AVANCINI SYNC",
    label: "Quero organizar clientes, atendimento e processos",
    area: "SISTEMAS & OPERAÇÃO",
    headline: "Sua operação precisa conversar em um só lugar.",
    description:
      "Sistemas, CRM e chatbots para conectar informações, clientes, equipe e rotinas sem depender de controles espalhados.",
    signs: ["Clientes e mensagens ficam espalhados", "A equipe perde tempo procurando informações", "O atendimento não segue um fluxo claro"],
    tags: ["Sistemas", "CRM", "Chatbots"],
    accent: "#ff7a00",
    href:
      process.env.NEXT_PUBLIC_AVANCINI_SYNC_URL ||
      `${whatsappBase}${encodeURIComponent("Olá, Ivo! Vim pelo Radar WSB e quero conversar sobre a Avancini Sync para organizar a operação da minha empresa.")}`,
    cta: process.env.NEXT_PUBLIC_AVANCINI_SYNC_URL ? "Visitar Avancini Sync" : "Conversar sobre Sync",
  },
  brain: {
    key: "B",
    name: "AVANCINI BRAIN",
    label: "Quero automatizar tarefas e ganhar escala",
    area: "AUTOMAÇÃO & IA",
    headline: "Sua equipe não deveria repetir o que a tecnologia pode executar.",
    description:
      "Automação e inteligência artificial para Instagram, WhatsApp, e-mail e rotinas que precisam continuar funcionando sem esforço manual constante.",
    signs: ["Tarefas repetitivas consomem a equipe", "Contatos ficam sem acompanhamento", "Os canais não trabalham de forma coordenada"],
    tags: ["Automação", "IA aplicada", "Multicanal"],
    accent: "#f4f4f0",
    href:
      process.env.NEXT_PUBLIC_AVANCINI_BRAIN_URL ||
      `${whatsappBase}${encodeURIComponent("Olá, Ivo! Vim pelo Radar WSB e quero conversar sobre a Avancini Brain para automatizar processos da minha empresa.")}`,
    cta: process.env.NEXT_PUBLIC_AVANCINI_BRAIN_URL ? "Visitar Avancini Brain" : "Conversar sobre Brain",
  },
} as const;

type UnitId = keyof typeof units;

export function EcosystemOrb() {
  const [activeId, setActiveId] = useState<UnitId>("web");
  const active = units[activeId];
  const style = { "--unit-accent": active.accent } as CSSProperties;

  return (
    <div className={`radar-panel radar-${activeId}`} style={style}>
      <div className="radar-choices" role="tablist" aria-label="Escolha o desafio atual da sua empresa">
        <div className="radar-question">
          <span>RADAR WSB</span>
          <h3>Onde sua empresa precisa avançar agora?</h3>
          <p>Escolha o desafio que mais pesa hoje. Você pode mudar a qualquer momento.</p>
        </div>

        {(Object.keys(units) as UnitId[]).map((id) => {
          const unit = units[id];
          const isActive = id === activeId;

          return (
            <button
              className={`radar-choice choice-${id} ${isActive ? "is-active" : ""}`}
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="radar-result"
              onClick={() => setActiveId(id)}
            >
              <span className="choice-key">{unit.key}</span>
              <span className="choice-copy">
                <small>{unit.area}</small>
                <b>{unit.label}</b>
              </span>
              <span className="choice-arrow">{isActive ? "→" : "+"}</span>
            </button>
          );
        })}

        <a className="multi-challenge" href="#contato">
          Tenho mais de um desafio <span>↗</span>
        </a>
      </div>

      <article className="radar-result" id="radar-result" role="tabpanel" aria-live="polite" key={activeId}>
        <div className="result-signal" aria-hidden="true">
          <span>{active.key}</span>
          <i />
          <i />
          <i />
        </div>

        <div className="result-topline">
          <span>CAMINHO INDICADO</span>
          <span><i /> FRENTE INDEPENDENTE</span>
        </div>
        <p className="result-name">{active.name}</p>
        <h3>{active.headline}</h3>
        <p className="result-description">{active.description}</p>

        <div className="result-signs">
          <small>FAZ SENTIDO QUANDO</small>
          <ul>
            {active.signs.map((sign) => <li key={sign}>{sign}</li>)}
          </ul>
        </div>

        <div className="result-footer">
          <div className="result-tags">
            {active.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <a href={active.href} target="_blank" rel="noreferrer">
            {active.cta} <span>↗</span>
          </a>
        </div>
      </article>
    </div>
  );
}
