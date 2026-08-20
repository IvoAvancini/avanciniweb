"use client";

import { useState, type CSSProperties } from "react";

const units = {
  web: {
    id: "web",
    number: "01",
    name: "WEB",
    fullName: "AVANCINI WEB",
    statement: "Presença digital que posiciona e converte.",
    description: "Sites e experiências digitais construídos para transformar atenção em confiança, autoridade e novas oportunidades.",
    tags: ["Sites premium", "Landing pages", "Conversão"],
    accent: "#42e8ef",
  },
  sync: {
    id: "sync",
    number: "02",
    name: "SYNC",
    fullName: "AVANCINI SYNC",
    statement: "Sistemas que colocam a operação em sintonia.",
    description: "CRM, chatbots e plataformas que conectam clientes, equipe, conversas e processos em um único fluxo de trabalho.",
    tags: ["Sistemas", "CRM", "Chatbots"],
    accent: "#6b9cff",
  },
  brain: {
    id: "brain",
    number: "03",
    name: "BRAIN",
    fullName: "AVANCINI BRAIN",
    statement: "Inteligência que trabalha em todos os canais.",
    description: "Automação e IA para Instagram, WhatsApp, e-mail e jornadas que mantêm o relacionamento ativo sem aumentar o trabalho manual.",
    tags: ["IA aplicada", "Automações", "Multicanal"],
    accent: "#ff5269",
  },
} as const;

type UnitId = keyof typeof units;

export function EcosystemOrb() {
  const [activeId, setActiveId] = useState<UnitId>("web");
  const active = units[activeId];
  const style = { "--unit-accent": active.accent } as CSSProperties;

  return (
    <div className={`ecosystem-orb active-${activeId}`} style={style}>
      <div className="orbital-grid" aria-hidden="true" />
      <div className="orbital-ring ring-outer" aria-hidden="true" />
      <div className="orbital-ring ring-middle" aria-hidden="true" />
      <div className="orbital-ring ring-inner" aria-hidden="true" />
      <div className="orbital-scan" aria-hidden="true" />

      {(Object.keys(units) as UnitId[]).map((id) => {
        const unit = units[id];
        const isActive = id === activeId;
        return (
          <button
            className={`orb-node node-${id} ${isActive ? "is-active" : ""}`}
            key={id}
            type="button"
            aria-pressed={isActive}
            aria-label={`Exibir prévia da ${unit.fullName}`}
            onClick={() => setActiveId(id)}
          >
            <i aria-hidden="true" />
            <span>{unit.name}</span>
            <small>{isActive ? "EM FOCO" : unit.number}</small>
          </button>
        );
      })}

      <article className="orb-preview" key={activeId} aria-live="polite">
        <div className="preview-topline">
          <span>{active.number} / 03</span>
          <span className="preview-status"><i /> UNIDADE ATIVA</span>
        </div>

        <div className="preview-symbol" aria-hidden="true">
          <span>{active.name.charAt(0)}</span>
        </div>

        <p className="preview-name">{active.fullName}</p>
        <h2>{active.statement}</h2>
        <p className="preview-description">{active.description}</p>
        <div className="preview-tags">
          {active.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <a href={`#${active.id}`}>Explorar esta unidade <span>↗</span></a>
      </article>

      <div className="orb-core" aria-hidden="true">
        <span className="constructed-a">A</span>
        <i />
      </div>

      <p className="orb-hint"><span /> Selecione um ponto para explorar</p>
    </div>
  );
}
