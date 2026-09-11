"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AvanciniMark } from "./avancini-mark";
import "./os-hub.css";
import "./os-hub-animations.css";
import "./os-hub-card.css";
import AnimatedCounter from "./components/AnimatedCounter";

const WHATSAPP_NUMBER = "5573981019782";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Estive no Avancini OS e gostaria de conversar sobre a solução ideal para minha empresa."
)}`;

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
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

const DASH_FEATURES = [
  { emoji: "⚡", label: "0.2s LCP", desc: "Carregamento ultrarrápido no celular" },
  { emoji: "🎯", label: "Copywriting", desc: "Texto que converte visitante em cliente" },
  { emoji: "💎", label: "Design Autoral", desc: "Identidade visual de alto padrão" },
  { emoji: "🔍", label: "SEO Técnico", desc: "Nota 100 no Google PageSpeed" },
  { emoji: "🛡️", label: "Hospedagem SSL", desc: "Cloud segura com 99.9% uptime" },
  { emoji: "📱", label: "100% Responsivo", desc: "Perfeito em qualquer dispositivo" },
];

const SYNC_FEATURES = [
  { emoji: "🤖", label: "IA 24h/dia", desc: "Atendimento ativo sem pausas ou feriados" },
  { emoji: "🎙️", label: "Áudios & Textos", desc: "Ouve, entende e responde com empatia" },
  { emoji: "📅", label: "Google Calendar", desc: "Marcação de horários em tempo real" },
  { emoji: "🔁", label: "Follow-Up Auto", desc: "Recupera leads frios automaticamente" },
  { emoji: "👥", label: "Multi-Atendentes", desc: "Equipe + IA com histórico completo" },
  { emoji: "🔒", label: "Zero Alucinação", desc: "Responde só o que você configurou" },
];

export function OSHubClient() {
  const [hoveredCard, setHoveredCard] = useState<"dash" | "sync" | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas background de partículas leve
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

    const isMobile = width <= 768;
    const count = isMobile ? 18 : Math.min(48, Math.max(22, Math.floor(width / 35)));

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.35),
      vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.35),
      radius: Math.random() * 1.6 + 0.6,
      color: Math.random() < 0.5 ? "34, 197, 94" : "56, 189, 248",
      alpha: Math.random() * 0.35 + 0.12,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      });

      // Linhas de conexão só no desktop para economia de CPU
      if (!isMobile) {
        particles.forEach((a, i) => {
          particles.slice(i + 1).forEach((b) => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${a.color}, ${(1 - dist / 90) * 0.1})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
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
    <div className={`os-hub-root os-v2 ${hoveredCard ? `hover-${hoveredCard}` : ""}`}>
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="hub-atmosphere" aria-hidden="true">
        <canvas ref={canvasRef} className="hub-animated-canvas" />
        <div className="ambient-glow glow-dash-left" />
        <div className="ambient-glow glow-sync-right" />
        <div className="hub-tech-grid" />
        <div className="hub-center-divider-glow" />
        <div className="hub-vignette" />
        <div className="orb orb-green" />
        <div className="orb orb-blue" />
        <div className="orb orb-magenta" />
        <div className="orb orb-cyan" />
      </div>

      {/* NAVBAR LIMPA & ELEGANTE */}
      <header className="hub-navbar hub-navbar-v2">
        <Link href="/" className="hub-brand" aria-label="Avancini OS - Início">
          <AvanciniMark variant="os" className="hub-brand-mark" />
          <div className="hub-brand-text">
            <span className="brand-name">AVANCINI <em>OS</em></span>
            <span className="brand-tagline">ECOSSISTEMA DE TECNOLOGIA</span>
          </div>
        </Link>

        {/* BOTÃO ESPECIALISTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="hub-specialist-btn"
          aria-label="Falar com especialista via WhatsApp"
        >
          <span className="hub-status-radar">
            <span className="radar-ping" />
            <span className="radar-core" />
          </span>
          <span className="btn-label-desktop">Falar com especialista</span>
          <span className="btn-label-mobile">Contato</span>
          <Arrow />
        </a>
      </header>

      {/* HERO EDITORIAL COMPACTO & ELEGANTE */}
      <section className="hub-hero-header">
        <h1 className="hub-hero-title">
          Sua empresa <span className="text-dash">mais forte na internet</span>{" "}
          <span className="text-blend">e</span>{" "}
          <span className="text-sync">mais inteligente no WhatsApp.</span>
        </h1>
        <p className="hub-hero-sub">
          Dois motores complementares de crescimento. Escolha por onde você quer começar:
        </p>
      </section>

      {/* STAGE DOS DOIS PORTAIS */}
      <main className="hub-twin-stage" id="ecossistema">

        {/* CARD DASH */}
        <Link
          href="/dash"
          id="portal-dash"
          className={`hub-portal-card portal-dash ${hoveredCard === "dash" ? "is-active" : ""} ${
            hoveredCard === "sync" ? "is-faded" : ""
          }`}
          onMouseEnter={() => setHoveredCard("dash")}
          onMouseLeave={() => setHoveredCard(null)}
          aria-label="Entrar no Avancini Dash"
        >
          {/* Efeitos decorativos */}
          <div className="portal-aura aura-dash" aria-hidden="true" />
          <div className="portal-top-laser laser-dash" aria-hidden="true" />

          {/* Cabeçalho do Card */}
          {/* Cabeçalho do Card */}
          <div className="portal-header">
            {/* Barra superior de metadados */}
            <div className="portal-meta-bar">
              <span className="portal-kicker kicker-dash">
                <span className="kicker-dot dot-dash">
                  <span className="kicker-dot-ping" />
                  <span className="kicker-dot-core" />
                </span>
                01 · PRESENÇA DIGITAL
              </span>
              <span className="portal-tech-pill">0.2s LCP · NOTA 100</span>
            </div>

            {/* Métrica âncora realista com legenda clara */}
            <div className="portal-metric-hero">
              <AnimatedCounter target={14820} prefix="+" />
              <span className="portal-metric-sub">visitas geradas</span>
            </div>

            <h2 className="portal-product-name">
              Avancini <span className="name-dash">Dash</span>
            </h2>

            <p className="portal-tagline">
              Sites autorais, landing pages de alta conversão e lojas virtuais que
              transformam visitantes em clientes — com velocidade máxima, SEO dominante e
              design de padrão internacional.
            </p>

            {/* Divisor */}
            <div className="portal-divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-label">O que você recebe</span>
              <span className="divider-line" />
            </div>

            {/* Lista de Recursos (Bento Grid) */}
            <div className="portal-features-grid">
              {DASH_FEATURES.map((f) => (
                <div className="portal-feat feat-dash" key={f.label}>
                  <span className="feat-emoji">{f.emoji}</span>
                  <div className="feat-text">
                    <strong>{f.label}</strong>
                    <span>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linha discreta de garantia e compromisso */}
          <div className="portal-trust-line" aria-label="Garantia e transparência">
            <span>Garantia de Satisfação · Contrato de Serviços · Sem fidelidade</span>
          </div>

          {/* CTA */}
          <div className="portal-enter-cta cta-dash">
            <span className="cta-shimmer" aria-hidden="true" />
            <span className="cta-label">Explorar Avancini Dash</span>
            <Arrow />
          </div>

          <div className="portal-corner-accent accent-dash" aria-hidden="true" />
        </Link>

        {/* SEPARADOR CENTRAL INTELIGENTE "OS" */}
        <div
          className={`hub-vertical-sep ${
            hoveredCard === "dash"
              ? "focus-dash"
              : hoveredCard === "sync"
              ? "focus-sync"
              : ""
          }`}
          aria-hidden="true"
        >
          <span className="sep-line" />
          <div className="sep-node">
            <span className="sep-glow" />
            <span className="sep-symbol">OS</span>
          </div>
          <span className="sep-line" />
        </div>

        {/* CARD SYNC */}
        <Link
          href="/sync"
          id="portal-sync"
          className={`hub-portal-card portal-sync ${hoveredCard === "sync" ? "is-active" : ""} ${
            hoveredCard === "dash" ? "is-faded" : ""
          }`}
          onMouseEnter={() => setHoveredCard("sync")}
          onMouseLeave={() => setHoveredCard(null)}
          aria-label="Entrar no Avancini Sync"
        >
          {/* Efeitos decorativos */}
          <div className="portal-aura aura-sync" aria-hidden="true" />
          <div className="portal-top-laser laser-sync" aria-hidden="true" />

          {/* Cabeçalho do Card */}
          <div className="portal-header">
            {/* Barra superior de metadados */}
            <div className="portal-meta-bar">
              <span className="portal-kicker kicker-sync">
                <span className="kicker-dot dot-sync">
                  <span className="kicker-dot-ping" />
                  <span className="kicker-dot-core" />
                </span>
                02 · INTELIGÊNCIA ARTIFICIAL
              </span>
              <span className="portal-tech-pill">24/7 · &lt;2s RESPOSTA</span>
            </div>

            {/* Métrica âncora realista com legenda clara */}
            <div className="portal-metric-hero">
              <AnimatedCounter target={23840} prefix="+" />
              <span className="portal-metric-sub">mensagens respondidas</span>
            </div>

            <h2 className="portal-product-name">
              Avancini <span className="name-sync">Sync</span>
            </h2>

            <p className="portal-tagline">
              Agentes inteligentes operando 24h no seu WhatsApp comercial — acolhem,
              qualificam, agendam reuniões e realizam follow-up sem fila de espera, sem
              erros e sem pausas.
            </p>

            {/* Divisor */}
            <div className="portal-divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-label">O que você recebe</span>
              <span className="divider-line" />
            </div>

            {/* Lista de Recursos (Bento Grid) */}
            <div className="portal-features-grid">
              {SYNC_FEATURES.map((f) => (
                <div className="portal-feat feat-sync" key={f.label}>
                  <span className="feat-emoji">{f.emoji}</span>
                  <div className="feat-text">
                    <strong>{f.label}</strong>
                    <span>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linha discreta de garantia e compromisso */}
          <div className="portal-trust-line" aria-label="Garantia e transparência">
            <span>Garantia de Satisfação · Contrato de Serviços · Sem fidelidade</span>
          </div>

          {/* CTA */}
          <div className="portal-enter-cta cta-sync">
            <span className="cta-shimmer" aria-hidden="true" />
            <span className="cta-label">Explorar Avancini Sync</span>
            <Arrow />
          </div>

          <div className="portal-corner-accent accent-sync" aria-hidden="true" />
        </Link>

      </main>
    </div>
  );
}
