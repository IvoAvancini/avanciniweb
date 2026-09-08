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

function LightningIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function TargetIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function DiamondIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20" />
      <path d="m10 3 2 6-4 12" />
      <path d="m14 3-2 6 4 12" />
    </svg>
  );
}

function Clock24Icon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MicWaveIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function CalendarCheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="m9 16 2 2 4-4" />
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

      {/* 3. DOIS GRANDES CARDS DE DECISÃO (PREMIUM, BENTO TILES, ZERO SCROLL) */}
      <main className="hub-cards-container" id="ecossistema">
        {/* ================= CARD 1: AVANCINI DASH ================= */}
        <article
          className={`hub-choice-card card-dash ${activeHover === "dash" ? "is-focused" : ""} ${
            activeHover === "sync" ? "is-dimmed" : ""
          }`}
          onMouseEnter={() => setActiveHover("dash")}
          onMouseLeave={() => setActiveHover(null)}
        >
          {/* Inner Ambient Glow & Top Sheen */}
          <div className="card-ambient-aura aura-dash" aria-hidden="true" />
          <div className="card-top-glow" />
          
          <div className="choice-card-head">
            <div className="choice-badge-row">
              <span className="choice-kicker-badge kicker-dash">
                <span className="kicker-pulse-dot dot-dash">
                  <span className="kicker-dot-ping" />
                  <span className="kicker-dot-core" />
                </span>
                01 · PRESENÇA DIGITAL
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

          {/* Luxury Bento Feature Tiles */}
          <div className="choice-tiles-stack">
            <div className="choice-tile-item tile-dash">
              <div className="tile-icon-box">
                <LightningIcon />
              </div>
              <div className="tile-content">
                <div className="tile-title-row">
                  <strong>Carregamento Instantâneo</strong>
                  <span className="tile-metric-badge">0.2s LCP</span>
                </div>
                <p>Zero perda de cliques por lentidão no 4G ou celular.</p>
              </div>
            </div>

            <div className="choice-tile-item tile-dash">
              <div className="tile-icon-box">
                <TargetIcon />
              </div>
              <div className="tile-content">
                <div className="tile-title-row">
                  <strong>Copywriting de Alta Persuasão</strong>
                </div>
                <p>Arquitetura psicológica que conduz o visitante direto ao WhatsApp.</p>
              </div>
            </div>

            <div className="choice-tile-item tile-dash">
              <div className="tile-icon-box">
                <DiamondIcon />
              </div>
              <div className="tile-content">
                <div className="tile-title-row">
                  <strong>Posicionamento de Autoridade</strong>
                </div>
                <p>Estética autoral de luxo que eleva o valor percebido e honorários.</p>
              </div>
            </div>
          </div>

          <div className="choice-card-footer">
            <div className="choice-pills-row">
              <span className="choice-meta-pill">⚡ Rascunho em 48h</span>
              <span className="choice-meta-pill">🛡️ Hospedagem &amp; SSL</span>
              <span className="choice-meta-pill">📱 100% Responsivo</span>
            </div>

            <Link href="/dash" className="choice-action-btn btn-dash">
              <span className="btn-shimmer" />
              <span className="btn-text">Explorar Avancini Dash</span>
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
          {/* Inner Ambient Glow & Top Sheen */}
          <div className="card-ambient-aura aura-sync" aria-hidden="true" />
          <div className="card-top-glow" />

          <div className="choice-card-head">
            <div className="choice-badge-row">
              <span className="choice-kicker-badge kicker-sync">
                <span className="kicker-pulse-dot dot-sync">
                  <span className="kicker-dot-ping" />
                  <span className="kicker-dot-core" />
                </span>
                02 · INTELIGÊNCIA ARTIFICIAL
              </span>
              <span className="choice-spec-pill spec-sync">ATENDIMENTO 24/7 · &lt; 2s</span>
            </div>

            <h2 className="choice-product-title">
              Avancini <span className="text-sync">Sync</span>
            </h2>
            <p className="choice-product-desc">
              Agentes inteligentes e chatbots operando 24h no seu WhatsApp comercial para acolher clientes, qualificar e agendar sem filas de espera.
            </p>
          </div>

          {/* Luxury Bento Feature Tiles */}
          <div className="choice-tiles-stack">
            <div className="choice-tile-item tile-sync">
              <div className="tile-icon-box">
                <Clock24Icon />
              </div>
              <div className="tile-content">
                <div className="tile-title-row">
                  <strong>Atendimento Ativo 24h por Dia</strong>
                  <span className="tile-metric-badge">24/7</span>
                </div>
                <p>Respostas imediatas na madrugada e finais de semana sem faltas.</p>
              </div>
            </div>

            <div className="choice-tile-item tile-sync">
              <div className="tile-icon-box">
                <MicWaveIcon />
              </div>
              <div className="tile-content">
                <div className="tile-title-row">
                  <strong>Compreensão Real de Áudios</strong>
                </div>
                <p>Ouve mensagens de voz e responde com clareza e empatia humana.</p>
              </div>
            </div>

            <div className="choice-tile-item tile-sync">
              <div className="tile-icon-box">
                <CalendarCheckIcon />
              </div>
              <div className="tile-content">
                <div className="tile-title-row">
                  <strong>Google Calendar Sincronizado</strong>
                </div>
                <p>Marcação e qualificação de horários em tempo real na sua agenda.</p>
              </div>
            </div>
          </div>

          <div className="choice-card-footer">
            <div className="choice-pills-row">
              <span className="choice-meta-pill">📲 Conexão QR Code</span>
              <span className="choice-meta-pill">🔒 Zero Alucinação</span>
              <span className="choice-meta-pill">👥 Multi-Atendentes</span>
            </div>

            <Link href="/sync" className="choice-action-btn btn-sync">
              <span className="btn-shimmer" />
              <span className="btn-text">Explorar Avancini Sync</span>
              <Arrow />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
