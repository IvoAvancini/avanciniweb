"use client";

import Link from "next/link";
import { useState } from "react";
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

  return (
    <div className={`os-hub-root ${activeHover ? `hover-${activeHover}` : ""}`}>
      {/* Background Atmosphere: Ambient Glows, Tech Grid & Radar Geometry */}
      <div className="hub-atmosphere" aria-hidden="true">
        <div className="ambient-glow glow-dash-left" />
        <div className="ambient-glow glow-sync-right" />
        <div className="hub-tech-grid" />
        <div className="hub-horizon-light" />
        <div className="hub-geometric-lines">
          <span className="geo-h-line line-top" />
          <span className="geo-h-line line-bottom" />
        </div>
      </div>

      {/* 1. NAVBAR (8-10% height) */}
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

        <div className="hub-badge-col">
          <div className="hub-sys-pill">
            <span className="sys-dot" />
            <span>DOIS PRODUTOS · UMA ESTRUTURA</span>
          </div>
        </div>

        <div className="hub-actions-col">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hub-specialist-btn"
          >
            <span>Falar com especialista</span>
            <Arrow />
          </a>
        </div>
      </header>

      {/* 2. IDENTITY / HEADLINE (15-20% height) */}
      <section className="hub-identity-section">
        <div className="hub-eyebrow">
          <span className="eyebrow-accent" />
          <span>ECOSSISTEMA AVANCINI OS</span>
        </div>
        <h1 className="hub-headline">Escolha sua experiência.</h1>
        <p className="hub-subheadline">
          Presença digital e inteligência artificial em um único ecossistema.
        </p>
      </section>

      {/* 3. DUAL PRODUCT PORTALS (60-65% height) */}
      <main className="hub-portals-stage">
        {/* ================= PRODUTO 01: AVANCINI DASH ================= */}
        <Link
          href="/dash"
          className={`portal-card card-dash ${activeHover === "dash" ? "is-focused" : ""} ${activeHover === "sync" ? "is-dimmed" : ""}`}
          onMouseEnter={() => setActiveHover("dash")}
          onMouseLeave={() => setActiveHover(null)}
          aria-label="Acessar Avancini Dash — Presença & Performance"
        >
          {/* Card Atmospheric Background Layers */}
          <div className="card-bg-gradient" />
          <div className="card-glow-reflection" />
          <div className="card-border-glow" />

          {/* Abstract Premium Website Architectural Canvas */}
          <div className="card-canvas-abstract dash-abstract" aria-hidden="true">
            {/* Minimalist Browser Frame Wireframe */}
            <div className="dash-browser-frame">
              <div className="browser-topbar">
                <span className="b-dot" />
                <span className="b-dot" />
                <span className="b-dot" />
                <span className="b-url">avancini.tech/dash</span>
              </div>
              <div className="browser-body">
                <div className="dash-hero-wireframe">
                  <div className="wire-badge" />
                  <div className="wire-title" />
                  <div className="wire-title short" />
                  <div className="wire-desc" />
                  <div className="wire-cta-group">
                    <span className="wire-btn" />
                    <span className="wire-btn ghost" />
                  </div>
                </div>
                <div className="dash-floating-metric">
                  <div className="metric-score">
                    <span className="score-val">100</span>
                    <span className="score-lbl">PERFORMANCE</span>
                  </div>
                  <div className="metric-stats">
                    <span>LCP 0.3s</span>
                    <span>SEO 100%</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Minimal UI Cursor */}
            <div className="dash-wire-cursor">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#22c55e">
                <path d="M3 3l7 18 3.5-6.5L20 11 3 3z" />
              </svg>
            </div>
          </div>

          {/* Card Foreground Content */}
          <div className="card-inner-content">
            <div className="card-top-header">
              <span className="card-cat-pill cat-dash">
                <i className="status-dot dot-dash" /> PRESENÇA &amp; PERFORMANCE
              </span>
              <span className="card-number-index">01</span>
            </div>

            <div className="card-body-block">
              <h2 className="portal-product-title">
                Avancini <em className="accent-dash">Dash</em>
              </h2>
              <p className="card-description">
                Websites de altíssimo padrão visual e técnico. Projetados sob medida
                para posicionar sua marca com autoridade e gerar novos clientes.
              </p>
            </div>

            <div className="card-bottom-footer">
              <span className="card-cta-btn cta-dash">
                <span>Acessar Dash</span>
                <Arrow />
              </span>
              <span className="card-microtext">SITES EXCLUSIVOS · SEM TEMPLATES</span>
            </div>
          </div>
        </Link>

        {/* Central Connecting Node between Dash & Sync */}
        <div className="hub-central-connector" aria-hidden="true">
          <div className="connector-laser laser-left" />
          <div className="connector-core-badge">
            <AvanciniMark variant="os" className="connector-mark-icon" />
          </div>
          <div className="connector-laser laser-right" />
        </div>

        {/* ================= PRODUTO 02: AVANCINI SYNC ================= */}
        <Link
          href="/sync"
          className={`portal-card card-sync ${activeHover === "sync" ? "is-focused" : ""} ${activeHover === "dash" ? "is-dimmed" : ""}`}
          onMouseEnter={() => setActiveHover("sync")}
          onMouseLeave={() => setActiveHover(null)}
          aria-label="Acessar Avancini Sync — Inteligência Artificial"
        >
          {/* Card Atmospheric Background Layers */}
          <div className="card-bg-gradient" />
          <div className="card-glow-reflection" />
          <div className="card-border-glow" />

          {/* Abstract AI Infrastructure & Neural Nodes Canvas */}
          <div className="card-canvas-abstract sync-abstract" aria-hidden="true">
            <div className="sync-neural-network">
              {/* Nodes and Connection Lines */}
              <svg className="neural-lines-svg" viewBox="0 0 340 180">
                <line x1="40" y1="40" x2="160" y2="80" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="130" x2="160" y2="80" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" />
                <line x1="160" y1="80" x2="280" y2="50" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
                <line x1="160" y1="80" x2="280" y2="120" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Floating Intelligence Process Chips */}
              <div className="neural-chip chip-inbound">
                <span className="chip-indicator" />
                <span>Lead recebido · WhatsApp</span>
              </div>

              <div className="neural-chip chip-processing">
                <span className="audio-wave">
                  <i /><i /><i /><i />
                </span>
                <span>IA analisando áudio [0:42]</span>
              </div>

              <div className="neural-chip chip-scheduled">
                <span className="chip-check">✓</span>
                <span>Qualificado · Reunião marcada</span>
              </div>
            </div>
          </div>

          {/* Card Foreground Content */}
          <div className="card-inner-content">
            <div className="card-top-header">
              <span className="card-cat-pill cat-sync">
                <i className="status-dot dot-sync" /> INTELIGÊNCIA ARTIFICIAL
              </span>
              <span className="card-number-index">02</span>
            </div>

            <div className="card-body-block">
              <h2 className="portal-product-title">
                Avancini <em className="accent-sync">Sync</em>
              </h2>
              <p className="card-description">
                Agentes de IA autônomos que operam 24/7 no WhatsApp. Ouvem áudios,
                entendem contexto, qualificam leads e agendam reuniões.
              </p>
            </div>

            <div className="card-bottom-footer">
              <span className="card-cta-btn cta-sync">
                <span>Acessar Sync</span>
                <Arrow />
              </span>
              <span className="card-microtext">ATENDIMENTO AUTÔNOMO · RESPOSTA EM 2S</span>
            </div>
          </div>
        </Link>
      </main>

      {/* 4. FOOTER (5-7% height) */}
      <footer className="hub-footer">
        <div className="footer-copyright">
          <p>© 2026 AVANCINI OS · Tecnologia com Identidade</p>
        </div>

        <nav className="footer-links-nav" aria-label="Links rápidos de navegação">
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
