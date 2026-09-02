"use client";

import Link from "next/link";
import { AvanciniMark } from "./avancini-mark";
import "./os-hub.css";

const WHATSAPP_NUMBER = "5573981019782";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Vim pela Avancini OS e gostaria de conversar.")}`;

function Arrow() {
  return (
    <span className="gateway-arrow" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </span>
  );
}

export function OSHubClient() {
  return (
    <main className="oshub-gateway">
      {/* Dynamic Symmetrical Ambient Glow (Emerald Green & Cyber Cyan) */}
      <div className="gateway-ambient" aria-hidden="true">
        <span className="glow-dash" />
        <span className="glow-sync" />
        <div className="gateway-radar">
          <i /><i /><i />
        </div>
      </div>

      {/* Header */}
      <header className="gateway-header">
        <Link className="gateway-brand" href="/" aria-label="Avancini OS">
          <AvanciniMark variant="os" className="gateway-brand-mark" />
          <span>
            <b>AVANCINI <em>OS</em></b>
            <small>ECOSSISTEMA DE TECNOLOGIA</small>
          </span>
        </Link>

        <nav className="gateway-nav">
          <Link href="/dash" className="gateway-nav-dash">
            <span className="dot dot-dash" /> Avancini Dash
          </Link>
          <Link href="/sync" className="gateway-nav-sync">
            <span className="dot dot-sync" /> Avancini Sync
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="gateway-nav-whatsapp">
            Falar conosco <Arrow />
          </a>
        </nav>
      </header>

      {/* Main Gateway Hub */}
      <div className="gateway-container">
        <div className="gateway-hero">
          <span className="gateway-badge">
            <i /> UMA EMPRESA · DUAS SOLUÇÕES
          </span>
          <h1>
            Onde sua empresa quer<br />
            <em>acelerar hoje?</em>
          </h1>
          <p>
            Presença digital que transmite autoridade e inteligência artificial que fecha vendas.
          </p>
        </div>

        {/* Dual Master Cards */}
        <div className="gateway-cards">
          {/* Card Dash */}
          <Link href="/dash" className="gateway-card card-dash" aria-label="Acessar Avancini Dash">
            <div className="card-top">
              <span className="card-tag tag-dash">01 · PRESENÇA DIGITAL</span>
              <span className="card-status-indicator">Sites de Alta Performance</span>
            </div>
            <div className="card-content">
              <h2>Avancini Dash</h2>
              <p>
                Sites e páginas sob medida, ultrarrápidas e desenhadas para posicionar sua marca com autoridade imediata.
              </p>
            </div>
            <div className="card-action">
              <span>Acessar Dash</span>
              <Arrow />
            </div>
          </Link>

          {/* Card Sync */}
          <Link href="/sync" className="gateway-card card-sync" aria-label="Acessar Avancini Sync">
            <div className="card-top">
              <span className="card-tag tag-sync">02 · INTELIGÊNCIA ARTIFICIAL</span>
              <span className="card-status-indicator">Atendimento 24/7 no WhatsApp</span>
            </div>
            <div className="card-content">
              <h2>Avancini Sync</h2>
              <p>
                Agentes de IA autônomos que ouvem áudio, entendem mensagens livres, qualificam leads e agendam reuniões.
              </p>
            </div>
            <div className="card-action">
              <span>Acessar Sync</span>
              <Arrow />
            </div>
          </Link>
        </div>

        {/* Minimal Footer */}
        <footer className="gateway-footer">
          <p>© 2026 AVANCINI OS · Todos os direitos reservados</p>
          <div className="gateway-footer-links">
            <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
