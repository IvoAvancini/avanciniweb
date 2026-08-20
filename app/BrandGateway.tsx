"use client";

import { useState } from "react";

type ActiveBrand = "web" | "sync";

const whatsappSync =
  "https://wa.me/5573981019782?text=Ol%C3%A1%2C%20Ivo!%20Quero%20conhecer%20a%20Avancini%20Sync%20e%20entender%20como%20a%20IA%20pode%20melhorar%20meu%20atendimento.";

export function BrandGateway() {
  const [active, setActive] = useState<ActiveBrand>("web");

  return (
    <div className={`brand-gateway active-${active}`} data-reveal data-delay="1">
      <article className={`gateway-card gateway-web ${active === "web" ? "is-active" : ""}`} onPointerEnter={() => setActive("web")} onFocusCapture={() => setActive("web")}>
        <button type="button" onClick={() => setActive("web")} aria-pressed={active === "web"}>
          <span>01 / WEB</span><i>{active === "web" ? "—" : "+"}</i>
        </button>
        <div className="gateway-card-copy">
          <p>SITES & PRESENÇA DIGITAL</p>
          <h3>Sua empresa não pode parecer menor do que ela é.</h3>
          <div className="gateway-reveal">
            <strong>Para quem ainda não tem site ou sente que o atual ficou para trás.</strong>
            <span>Seja encontrado. Passe confiança. Seja escolhido.</span>
            <a href="https://avanciniweb.vercel.app" target="_blank" rel="noreferrer">Conhecer Avancini Web <b>↗</b></a>
          </div>
        </div>
        <div className="gateway-demo web-demo" aria-hidden="true">
          <div className="demo-browser"><span /><span /><span /><b>MARCA / PRESENÇA DIGITAL</b></div>
          <div className="demo-site-copy"><small>EXPERIÊNCIA AUTORAL</small><strong>Impossível<br />de ignorar.</strong><i>CONHECER A EMPRESA ↗</i></div>
          <div className="demo-site-card"><span>VALOR PERCEBIDO</span><b>+</b><small>Autoridade desde o primeiro clique.</small></div>
        </div>
        <div className="gateway-letter" aria-hidden="true">W</div>
      </article>

      <article className={`gateway-card gateway-sync ${active === "sync" ? "is-active" : ""}`} onPointerEnter={() => setActive("sync")} onFocusCapture={() => setActive("sync")}>
        <button type="button" onClick={() => setActive("sync")} aria-pressed={active === "sync"}>
          <span>02 / SYNC</span><i>{active === "sync" ? "—" : "+"}</i>
        </button>
        <div className="gateway-card-copy">
          <p>CHATBOTS & AUTOMAÇÃO COM IA</p>
          <h3>O interesse chegou. A resposta não pode ficar para depois.</h3>
          <div className="gateway-reveal">
            <strong>Para quem recebe mensagens, perde tempo ou deixa oportunidades esfriarem.</strong>
            <span>Atenda melhor. Automatize o repetitivo. Continue próximo.</span>
            <a href={whatsappSync} target="_blank" rel="noreferrer">Conhecer Avancini Sync <b>↗</b></a>
          </div>
        </div>
        <div className="gateway-demo sync-demo" aria-hidden="true">
          <div className="sync-status"><i /> IA EM ATENDIMENTO</div>
          <div className="chat-bubble chat-one"><small>CLIENTE · AGORA</small><span>Olá! Gostaria de conhecer os serviços.</span></div>
          <div className="chat-bubble chat-two"><small>AVANCINI SYNC · 1S</small><span>Claro. Vou ajudar você a encontrar a melhor opção.</span></div>
          <div className="sync-flow"><b>01</b><span>RESPONDER</span><i>→</i><b>02</b><span>QUALIFICAR</span><i>→</i><b>03</b><span>ACOMPANHAR</span></div>
        </div>
        <div className="gateway-letter" aria-hidden="true">S</div>
      </article>
    </div>
  );
}
