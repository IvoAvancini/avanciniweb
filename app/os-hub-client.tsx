"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AvanciniMark } from "./avancini-mark";
import "./os-hub.css";

const WHATSAPP_NUMBER = "5573981019782";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Estive no Avancini OS e gostaria de conversar sobre a solução ideal para minha empresa."
)}`;

function Arrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="hub-arrow-icon"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="hub-check-icon"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function OSHubClient() {
  const [activeHover, setActiveHover] = useState<"dash" | "sync" | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const count = Math.min(45, Math.max(20, Math.floor(width / 35)));
    const particles = Array.from({ length: count }, () => {
      const isLeft = Math.random() < 0.5;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.6 + 1,
        color: isLeft ? "34, 197, 94" : "56, 189, 248",
        alpha: Math.random() * 0.4 + 0.2,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p1.color}, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p1.color}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`os-hub-root ${activeHover ? `hover-${activeHover}` : ""}`}>
      {/* Background Atmosphere */}
      <div className="hub-atmosphere" aria-hidden="true">
        <canvas ref={canvasRef} className="hub-animated-canvas" />
        <div className="ambient-glow glow-dash-left" />
        <div className="ambient-glow glow-sync-right" />
        <div className="hub-tech-grid" />
        <div className="hub-vignette" />
      </div>

      {/* 1. NAVBAR */}
      <header className="hub-navbar">
        <div className="hub-brand-col">
          <Link href="/" className="hub-brand" aria-label="Avancini OS - Início">
            <AvanciniMark variant="os" className="hub-brand-mark" />
            <div className="hub-brand-text">
              <span className="brand-name">
                AVANCINI <em>OS</em>
              </span>
              <span className="brand-tagline">ECOSSISTEMA DE TECNOLOGIA</span>
            </div>
          </Link>
        </div>

        <div className="hub-ecosystem-switch" aria-label="Soluções Avancini">
          <Link className="hub-switch-pill pill-dash" href="/dash">
            <span className="pill-prefix">Avancini </span>Dash <Arrow />
          </Link>
          <Link className="hub-switch-pill pill-sync" href="/sync">
            <span className="pill-prefix">Avancini </span>Sync <Arrow />
          </Link>
        </div>

        <div className="hub-actions-col">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hub-specialist-btn"
          >
            <span className="hub-status-radar">
              <span className="radar-ping" />
              <span className="radar-core" />
            </span>
            <span className="btn-label-desktop">Falar com especialista</span>
            <span className="btn-label-mobile">Contato</span>
            <Arrow />
          </a>
        </div>
      </header>

      {/* 2. HERO EDITORIAL: DIRETO, IMPACTANTE E LIMPO */}
      <section className="hub-hero-section">
        <h1 className="hub-headline">
          Sua empresa <span className="highlight-dash">mais forte na internet.</span>{" "}
          <br className="hero-break" />
          E <span className="highlight-sync">mais inteligente no WhatsApp.</span>
        </h1>
        <p className="hub-subheadline">
          Dois caminhos complementares para acelerar o seu negócio. Escolha onde você quer começar:
        </p>
      </section>

      {/* 3. DOIS GRANDES CARDS DE DECISÃO (PREMIUM, DIRETOS E IMPORENTES) */}
      <main className="hub-cards-container" id="ecossistema">
        {/* ================= CARD 1: AVANCINI DASH ================= */}
        <article
          className={`hub-choice-card card-dash ${activeHover === "dash" ? "is-focused" : ""} ${
            activeHover === "sync" ? "is-dimmed" : ""
          }`}
          onMouseEnter={() => setActiveHover("dash")}
          onMouseLeave={() => setActiveHover(null)}
        >
          <div className="card-top-glow" />
          
          <div className="choice-card-head">
            <div className="choice-badge-row">
              <span className="choice-kicker-badge kicker-dash">
                <i className="badge-dot dot-dash" /> 01 · PRESENÇA DIGITAL
              </span>
              <span className="choice-spec-pill spec-dash">0.2s LCP · NOTA 100</span>
            </div>

            <h2 className="choice-product-title">
              Avancini <span className="text-dash">Dash</span>
            </h2>
            <p className="choice-product-desc">
              Websites autorais, landing pages de alta conversão e lojas virtuais desenvolvidas para transformar visitantes em contratos fechados.
            </p>
          </div>

          <div className="choice-features-list">
            <div className="choice-feature-row">
              <span className="feature-icon icon-dash"><CheckIcon /></span>
              <div className="feature-text">
                <strong>Carregamento Instantâneo (0.2s LCP)</strong>
                <p>Zero perda de cliques ou abandono por lentidão no 4G ou celular.</p>
              </div>
            </div>

            <div className="choice-feature-row">
              <span className="feature-icon icon-dash"><CheckIcon /></span>
              <div className="feature-text">
                <strong>Copywriting de Alta Persuasão</strong>
                <p>Estrutura psicológica que conduz o visitante direto ao seu WhatsApp.</p>
              </div>
            </div>

            <div className="choice-feature-row">
              <span className="feature-icon icon-dash"><CheckIcon /></span>
              <div className="feature-text">
                <strong>Posicionamento de Autoridade</strong>
                <p>Estética refinada e autoral que justifica honorários mais altos.</p>
              </div>
            </div>

            <div className="choice-feature-row">
              <span className="feature-icon icon-dash"><CheckIcon /></span>
              <div className="feature-text">
                <strong>SEO Local Técnico no Google</strong>
                <p>Otimização de código para ranquear nas pesquisas da sua cidade.</p>
              </div>
            </div>
          </div>

          <div className="choice-card-footer">
            <div className="choice-subnote">
              <span>⚡ Rascunho em 48h</span>
              <span>🛡️ Hospedagem &amp; SSL</span>
              <span>📱 100% Responsivo</span>
            </div>

            <Link href="/dash" className="choice-action-btn btn-dash">
              <span>Explorar Avancini Dash</span>
              <Arrow />
            </Link>
          </div>
        </article>

        {/* ================= CARD 2: AVANCINI SYNC ================= */}
        <article
          className={`hub-choice-card card-sync ${activeHover === "sync" ? "is-focused" : ""} ${
            activeHover === "dash" ? "is-dimmed" : ""
          }`}
          onMouseEnter={() => setActiveHover("sync")}
          onMouseLeave={() => setActiveHover(null)}
        >
          <div className="card-top-glow" />

          <div className="choice-card-head">
            <div className="choice-badge-row">
              <span className="choice-kicker-badge kicker-sync">
                <i className="badge-dot dot-sync" /> 02 · INTELIGÊNCIA ARTIFICIAL
              </span>
              <span className="choice-spec-pill spec-sync">ATENDIMENTO 24/7 · RESPOSTAS &lt; 2s</span>
            </div>

            <h2 className="choice-product-title">
              Avancini <span className="text-sync">Sync</span>
            </h2>
            <p className="choice-product-desc">
              Agentes inteligentes e chatbots operando 24h no seu WhatsApp comercial para acolher clientes, qualificar e agendar sem filas de espera.
            </p>
          </div>

          <div className="choice-features-list">
            <div className="choice-feature-row">
              <span className="feature-icon icon-sync"><CheckIcon /></span>
              <div className="feature-text">
                <strong>Atendimento Ativo 24h por Dia</strong>
                <p>Respostas imediatas na madrugada e finais de semana sem faltas.</p>
              </div>
            </div>

            <div className="choice-feature-row">
              <span className="feature-icon icon-sync"><CheckIcon /></span>
              <div className="feature-text">
                <strong>Compreensão e Leitura de Áudios</strong>
                <p>Ouve mensagens de voz e responde com clareza e empatia humana.</p>
              </div>
            </div>

            <div className="choice-feature-row">
              <span className="feature-icon icon-sync"><CheckIcon /></span>
              <div className="feature-text">
                <strong>Google Calendar Sincronizado</strong>
                <p>Marcação de horários em tempo real diretamente na sua agenda.</p>
              </div>
            </div>

            <div className="choice-feature-row">
              <span className="feature-icon icon-sync"><CheckIcon /></span>
              <div className="feature-text">
                <strong>Follow-Up Automático</strong>
                <p>Reengaja orçamentos pendentes e recupera contatos que sumiram.</p>
              </div>
            </div>
          </div>

          <div className="choice-card-footer">
            <div className="choice-subnote">
              <span>📲 Conexão QR Code</span>
              <span>🔒 Zero Risco de Alucinação</span>
              <span>👥 Multi-Atendentes</span>
            </div>

            <Link href="/sync" className="choice-action-btn btn-sync">
              <span>Explorar Avancini Sync</span>
              <Arrow />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
