"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

const whatsappBase = "https://wa.me/5573981019782?text=";

const paths = {
  web: {
    key: "W",
    name: "AVANCINI WEB",
    label: "Quero atrair mais clientes com uma presença forte",
    area: "SITES & PRESENÇA DIGITAL",
    headline: "O primeiro passo é fazer sua empresa parecer tão boa quanto ela realmente é.",
    description:
      "A Avancini Web transforma a primeira impressão em confiança com sites e páginas pensados para apresentar valor e gerar contatos.",
    signs: [
      "Seu site não representa a qualidade da empresa",
      "As pessoas visitam, mas não entram em contato",
      "Sua presença depende apenas das redes sociais",
    ],
    tags: ["Sites", "Landing pages", "Conversão"],
    accent: "#ef3340",
    href: process.env.NEXT_PUBLIC_AVANCINI_WEB_URL || "https://avanciniweb.vercel.app",
    cta: "Visitar Avancini Web",
  },
  sync: {
    key: "S",
    name: "AVANCINI SYNC",
    label: "Quero atender automaticamente e não perder contatos",
    area: "ATENDIMENTO & AUTOMAÇÃO COM IA",
    headline: "O próximo passo é responder enquanto o interesse ainda está quente.",
    description:
      "A Avancini Sync cria chatbots e automações com IA para atender, qualificar, acompanhar e manter conversas ativas nos seus canais.",
    signs: [
      "Mensagens demoram para receber resposta",
      "Contatos chegam e ficam sem acompanhamento",
      "Sua equipe repete as mesmas tarefas todos os dias",
    ],
    tags: ["Chatbots", "IA aplicada", "Automações"],
    accent: "#ff7a00",
    href:
      process.env.NEXT_PUBLIC_AVANCINI_SYNC_URL ||
      `${whatsappBase}${encodeURIComponent("Olá, Ivo! Vim pelo Fluxo WS e quero conhecer a Avancini Sync para automatizar o atendimento da minha empresa.")}`,
    cta: process.env.NEXT_PUBLIC_AVANCINI_SYNC_URL ? "Visitar Avancini Sync" : "Conversar sobre Sync",
  },
} as const;

type PathId = keyof typeof paths;

export function FlowWS() {
  const [activeId, setActiveId] = useState<PathId>("web");
  const panelRef = useRef<HTMLDivElement>(null);
  const active = paths[activeId];
  const style = {
    "--unit-accent": active.accent,
    "--flow-x": "50%",
    "--flow-y": "50%",
  } as CSSProperties;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty("--flow-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    panel.style.setProperty("--flow-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div
      className={`radar-panel radar-${activeId}`}
      ref={panelRef}
      style={style}
      onPointerMove={handlePointerMove}
      data-reveal
    >
      <div className="radar-choices" role="tablist" aria-label="Escolha onde sua empresa precisa avançar">
        <div className="radar-question">
          <span>FLUXO WS</span>
          <h3>Em qual momento você está perdendo oportunidades?</h3>
          <p>Escolha o cenário que mais se parece com sua empresa hoje.</p>
        </div>

        {(Object.keys(paths) as PathId[]).map((id) => {
          const path = paths[id];
          const isActive = id === activeId;

          return (
            <button
              className={`radar-choice choice-${id} ${isActive ? "is-active" : ""}`}
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="flow-result"
              onClick={() => setActiveId(id)}
            >
              <span className="choice-key">{path.key}</span>
              <span className="choice-copy">
                <small>{path.area}</small>
                <b>{path.label}</b>
              </span>
              <span className="choice-arrow">{isActive ? "→" : "+"}</span>
            </button>
          );
        })}

        <a className="multi-challenge" href="#contato">
          Preciso atrair e atender melhor <span>↗</span>
        </a>
      </div>

      <article className="radar-result" id="flow-result" role="tabpanel" aria-live="polite" key={activeId}>
        <div className="result-signal" aria-hidden="true">
          <span>{active.key}</span>
          <i />
          <i />
        </div>

        <div className="result-topline">
          <span>CAMINHO INDICADO</span>
          <span><i /> ESPECIALIZAÇÃO ATIVA</span>
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
