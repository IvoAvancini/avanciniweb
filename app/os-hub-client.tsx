"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AvanciniMark } from "./avancini-mark";
import "./os-hub.css";

const WHATSAPP_NUMBER = "5573981019782";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Estou no hub da Avancini OS e gostaria de falar com um especialista sobre as soluções."
)}`;

function Arrow() {
  return (
    <svg
      width="13"
      height="13"
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

    const count = Math.min(50, Math.max(25, Math.floor(width / 32)));
    const particles = Array.from({ length: count }, () => {
      const isLeft = Math.random() < 0.5;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.8 + 1,
        color: isLeft ? "34, 197, 94" : "56, 189, 248",
        alpha: Math.random() * 0.45 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      };
    });

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        const currentAlpha = p1.alpha + Math.sin(frame * p1.pulseSpeed) * 0.15;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p1.color}, ${Math.max(0.1, currentAlpha)})`;
        ctx.shadowColor = `rgba(${p1.color}, 0.7)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * 0.24;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p1.color}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        const mdx = p1.x - mouseX;
        const mdy = p1.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const mAlpha = (1 - mdist / 140) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(${p1.color}, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const origHtmlOverflow = document.documentElement.style.overflow;
    const origBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = origHtmlOverflow;
      document.body.style.overflow = origBodyOverflow;
    };
  }, []);

  return (
    <div className={`os-hub-root ${activeHover ? `hover-${activeHover}` : ""}`}>
      {/* Background Atmosphere: Interactive Animated Canvas + Ambient Glows */}
      <div className="hub-atmosphere" aria-hidden="true">
        <canvas ref={canvasRef} className="hub-animated-canvas" />
        <div className="ambient-glow glow-dash-left" />
        <div className="ambient-glow glow-sync-right" />
        <div className="ambient-glow glow-os-matrix" />
        <div className="hub-tech-grid" />
        <div className="hub-energy-beam" />
        <div className="hub-horizon-light" />
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
            <span>Falar com especialista</span>
            <Arrow />
          </a>
        </div>
      </header>

      {/* 2. HERO EDITORIAL: DIRETO AO PONTO (Sem pill de ecossistema e compacto) */}
      <section className="hub-hero-section">
        <h1 className="hub-headline">
          Sua empresa <span className="highlight-dash">mais forte na internet.</span>{" "}
          <br className="hero-break" />
          E <span className="highlight-sync">mais inteligente no WhatsApp.</span>
        </h1>
        <p className="hub-subheadline">
          Websites de alta autoridade e agentes de IA para transformar presença digital em oportunidades reais.
        </p>
      </section>

      {/* 3. ÁREA VISUAL DO ECOSSISTEMA: HISTÓRIA COESA DE DOIS PRODUTOS */}
      <main className="hub-ecosystem-stage" id="ecossistema">
        {/* ================= PRODUTO 01: AVANCINI DASH ================= */}
        <div
          className={`ecosystem-card card-dash ${activeHover === "dash" ? "is-focused" : ""} ${activeHover === "sync" ? "is-dimmed" : ""}`}
          onMouseEnter={() => setActiveHover("dash")}
          onMouseLeave={() => setActiveHover(null)}
        >
          {/* Atmosfera e Borda com Efeito Suave */}
          <div className="card-bg-gradient" />
          <div className="card-ambient-tint" />
          <div className="card-border-glow" />

          {/* Cabeçalho do Card */}
          <div className="card-header">
            <div className="product-category-row">
              <span className="card-badge badge-dash">
                <i className="badge-dot dot-dash" /> 01 — PRESENÇA DIGITAL
              </span>
              <span className="card-status-pill pill-dash">PERFORMANCE 100/100</span>
            </div>

            <h2 className="product-title">
              Avancini <span className="text-dash">Dash</span>
            </h2>
            <p className="product-punchline">Websites exclusivos e engenharia de alta conversão para consolidar sua marca.</p>
          </div>

          {/* Métricas e Capacidades Técnicas */}
          <div className="product-spec-strip">
            <div className="spec-item">
              <span className="spec-icon">⚡</span>
              <div className="spec-texts">
                <strong>0.2s LCP</strong>
                <small>Velocidade extrema</small>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">🎯</span>
              <div className="spec-texts">
                <strong>Alta Conversão</strong>
                <small>Arquitetura sob medida</small>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">💎</span>
              <div className="spec-texts">
                <strong>Autoridade</strong>
                <small>Design de impacto</small>
              </div>
            </div>
          </div>

          {/* Mockup Realista de Interface de Website */}
          <div className="card-mockup-wrapper dash-mockup-wrapper" aria-hidden="true">
            <div className="realistic-browser-mockup">
              {/* Topbar do Navegador */}
              <div className="browser-topbar">
                <div className="browser-traffic-lights">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="browser-address-bar">
                  <span className="ssl-icon">🔒</span>
                  <span className="address-text">avancini.tech/dash</span>
                </div>
                <span className="browser-status-chip">ONLINE</span>
              </div>

              {/* Viewport da Página Web Enriquecido e Sem Espaço Vazio */}
              <div className="browser-viewport">
                <div className="browser-hero-layout">
                  {/* Coluna Esquerda: Conteúdo de Autoridade */}
                  <div className="viewport-content">
                    <span className="viewport-kicker">PRESENÇA &amp; AUTORIDADE DIGITAL</span>
                    <h3 className="viewport-title">
                      Websites que Convertem <span>Visitantes em Clientes</span>
                    </h3>
                    <p className="viewport-desc">
                      Arquitetura sob medida · 0.2s LCP · Design com identidade exclusiva
                    </p>
                    <div className="viewport-btn-row">
                      <span className="viewport-fake-btn">Ver Projetos Live →</span>
                      <span className="viewport-social-proof">⭐ 5.0 · Alta Performance</span>
                    </div>
                  </div>

                  {/* Coluna Direita: Dashboard de Métricas e Conversão */}
                  <div className="viewport-metrics-col">
                    {/* Badge Lighthouse 100 */}
                    <div className="viewport-badge badge-lighthouse">
                      <div className="lighthouse-ring">
                        <svg viewBox="0 0 36 36" className="score-ring-svg">
                          <path
                            className="ring-bg"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="ring-val"
                            strokeDasharray="100, 100"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="score-digit">100</span>
                      </div>
                      <div className="lighthouse-info">
                        <strong>Lighthouse 100/100</strong>
                        <small>0.28s LCP · Nota Máxima</small>
                      </div>
                    </div>

                    {/* Badge Gráfico de Conversão com Curva Visual */}
                    <div className="viewport-badge badge-conversion">
                      <div className="conversion-top-line">
                        <span className="badge-kicker">TAXA DE CONVERSÃO</span>
                        <strong className="badge-value">+340%</strong>
                      </div>
                      <svg className="growth-sparkline" viewBox="0 0 90 18" aria-hidden="true">
                        <defs>
                          <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,16 Q20,14 35,9 T65,5 T90,2 L90,18 L0,18 Z"
                          fill="url(#sparklineGrad)"
                        />
                        <path
                          d="M0,16 Q20,14 35,9 T65,5 T90,2"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <small className="badge-note">Estrutura orientada a vendas</small>
                    </div>
                  </div>
                </div>

                {/* Faixa Inferior de Tecnologias / Confiança no Viewport */}
                <div className="browser-bottom-strip">
                  <span className="strip-item">⚡ Next.js Ultra-Fast</span>
                  <span className="strip-item">💎 UI Design Exclusivo</span>
                  <span className="strip-item">📈 SEO Rank #1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ação Direta para o Produto */}
          <div className="card-action-footer">
            <Link href="/dash" className="card-explore-btn btn-dash">
              <span>Explorar Avancini Dash</span>
              <Arrow />
            </Link>
          </div>
        </div>

        {/* Conector Central Interativo (Muda de cor e aponta no hover) */}
        <div
          className={`ecosystem-connector-bridge ${activeHover ? `active-${activeHover}` : ""}`}
          aria-hidden="true"
        >
          <div className="bridge-laser-line line-top" />
          <div
            className="bridge-node-pill"
            title={
              activeHover === "dash"
                ? "Avancini Dash: Alta Autoridade Digital"
                : activeHover === "sync"
                ? "Avancini Sync: Conversão e IA 24/7"
                : "Sinergia Contínua: Dash atrai ⇄ Sync converte 24/7"
            }
          >
            <span className="bridge-connector-symbol">
              {activeHover === "dash" ? "←" : activeHover === "sync" ? "→" : "⇄"}
            </span>
          </div>
          <div className="bridge-laser-line line-bottom" />
        </div>

        {/* ================= PRODUTO 02: AVANCINI SYNC ================= */}
        <div
          className={`ecosystem-card card-sync ${activeHover === "sync" ? "is-focused" : ""} ${activeHover === "dash" ? "is-dimmed" : ""}`}
          onMouseEnter={() => setActiveHover("sync")}
          onMouseLeave={() => setActiveHover(null)}
        >
          {/* Atmosfera e Borda com Efeito Suave */}
          <div className="card-bg-gradient" />
          <div className="card-ambient-tint" />
          <div className="card-border-glow" />

          {/* Cabeçalho do Card */}
          <div className="card-header">
            <div className="product-category-row">
              <span className="card-badge badge-sync">
                <i className="badge-dot dot-sync" /> 02 — INTELIGÊNCIA ARTIFICIAL
              </span>
              <span className="card-status-pill pill-sync">SUPERVISOR ATIVO 24/7</span>
            </div>

            <h2 className="product-title">
              Avancini <span className="text-sync">Sync</span>
            </h2>
            <p className="product-punchline">Seu WhatsApp acolhendo, qualificando e fechando oportunidades 24 horas por dia.</p>
          </div>

          {/* Métricas e Capacidades Técnicas */}
          <div className="product-spec-strip">
            <div className="spec-item">
              <span className="spec-icon">🤖</span>
              <div className="spec-texts">
                <strong>Supervisor IA</strong>
                <small>Multiagentes treinados</small>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">⚡</span>
              <div className="spec-texts">
                <strong>&lt; 2s Resposta</strong>
                <small>Zero perda de contato</small>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">📅</span>
              <div className="spec-texts">
                <strong>Agendamento</strong>
                <small>Fechamento automático</small>
              </div>
            </div>
          </div>

          {/* Mockup Realista de Interface de WhatsApp */}
          <div className="card-mockup-wrapper sync-mockup-wrapper" aria-hidden="true">
            <div className="realistic-whatsapp-mockup">
              {/* Header do Chat WhatsApp */}
              <div className="whatsapp-topbar">
                <div className="whatsapp-avatar">
                  <span>A</span>
                  <span className="avatar-online-dot" />
                </div>
                <div className="whatsapp-agent-info">
                  <strong>
                    Avancini Sync <span className="verified-badge">✓</span>
                  </strong>
                  <small>Online agora · Resposta na hora</small>
                </div>
                <span className="whatsapp-badge-speed">Ativo 24/7</span>
              </div>

              {/* Corpo do Diálogo: Conversa Real e Convincente no WhatsApp */}
              <div className="whatsapp-chat-body">
                {/* Mensagem 1: Cliente pergunta à noite */}
                <div className="chat-bubble-row client-row">
                  <div className="chat-bubble client-bubble">
                    <p>Boa noite! Vocês têm horário disponível para atendimento essa semana? Gostaria de saber valores também.</p>
                    <time>21:14</time>
                  </div>
                </div>

                {/* Mensagem 2: IA acolhe, responde valores com clareza e já oferece os horários livres */}
                <div className="chat-bubble-row ai-row">
                  <div className="chat-bubble ai-bubble">
                    <p>
                      Olá! Tudo bem? 😊 O atendimento completo fica em <b>R$ 250</b> (com retorno incluso e parcelamento em até 3x).
                      <br /><br />
                      Para esta semana, temos vaga nesta <b>quinta às 15h</b> ou <b>sexta às 10h</b>. Qual fica melhor para você?
                    </p>
                    <div className="bubble-meta">
                      <span className="ai-tag">Atendente IA · Resposta em 3s</span>
                      <time>21:14 · Lido ✓✓</time>
                    </div>
                  </div>
                </div>

                {/* Mensagem 3: Cliente escolhe o horário */}
                <div className="chat-bubble-row client-row">
                  <div className="chat-bubble client-bubble">
                    <p>Quinta às 15h fica perfeito pra mim! Pode confirmar por favor?</p>
                    <time>21:15</time>
                  </div>
                </div>

                {/* Status Sutil de Sucesso */}
                <div className="chat-status-strip">
                  <span>⚡ Agendamento Confirmado às 21:15 · Equipe Notificada</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ação Direta para o Produto */}
          <div className="card-action-footer">
            <Link href="/sync" className="card-explore-btn btn-sync">
              <span>Explorar Avancini Sync</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </main>

      {/* 4. FOOTER MINIMALISTA */}
      <footer className="hub-footer">
        <div className="footer-copyright">
          <p>© 2026 AVANCINI OS · Tecnologia com Identidade</p>
        </div>

        <nav className="footer-links-nav" aria-label="Links de rodapé">
          <Link href="/dash" className="f-link">
            Dash
          </Link>
          <span className="f-sep">/</span>
          <Link href="/sync" className="f-link">
            Sync
          </Link>
          <span className="f-sep">/</span>
          <a
            href="https://www.instagram.com/avancinios/"
            target="_blank"
            rel="noreferrer"
            className="f-link"
          >
            Instagram
          </a>
          <span className="f-sep">/</span>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="f-link">
            WhatsApp
          </a>
        </nav>
      </footer>
    </div>
  );
}
