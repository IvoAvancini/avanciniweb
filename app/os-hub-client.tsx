"use client";

import Link from "next/link";
import { AvanciniMark } from "./avancini-mark";
import "./os-hub.css";

const WHATSAPP_NUMBER = "5573981019782";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Vim pela Avancini OS e gostaria de conversar sobre as soluções.")}`;

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function OSHubClient() {
  return (
    <main className="oshub-viewport">
      {/* Dynamic Ambient Background with Dual Aurora Glow */}
      <div className="portal-ambient" aria-hidden="true">
        <span className="ambient-beam beam-left" />
        <span className="ambient-beam beam-right" />
        <span className="ambient-center-flare" />
        <div className="ambient-circles">
          <i /><i /><i />
        </div>
      </div>

      {/* Top Header Bar */}
      <header className="portal-header">
        <Link className="portal-brand" href="/" aria-label="Avancini OS">
          <AvanciniMark variant="os" className="portal-brand-mark" />
          <span>
            <b>AVANCINI <em>OS</em></b>
            <small>ECOSSISTEMA DE TECNOLOGIA</small>
          </span>
        </Link>

        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="portal-contact-link">
          <span>Falar com especialista</span>
          <Arrow />
        </a>
      </header>

      {/* Central Interactive Split Portals (Fills 100vh without scroll) */}
      <section className="portal-stage">
        {/* Left Portal: DASH */}
        <Link href="/dash" className="portal-panel panel-dash" aria-label="Entrar na Avancini Dash">
          <div className="panel-bg" aria-hidden="true" />
          <div className="panel-glow" aria-hidden="true" />
          
          <div className="panel-header">
            <span className="panel-tag tag-dash">
              <i className="status-dot dot-dash" /> PRESENÇA &amp; PERFORMANCE
            </span>
            <span className="panel-index">01</span>
          </div>

          <div className="panel-content">
            <h2 className="panel-title">
              Avancini <em>Dash</em>
            </h2>
            <p className="panel-desc">
              Websites de altíssimo padrão visual e técnico. Projetados sob medida para posicionar sua marca com autoridade imediata e gerar novos clientes.
            </p>
          </div>

          <div className="panel-footer">
            <span className="panel-btn btn-dash">
              <span>Acessar Dash</span>
              <Arrow />
            </span>
            <span className="panel-hint">Sites exclusivos · Sem templates</span>
          </div>
        </Link>

        {/* Center Split Divider */}
        <div className="portal-divider" aria-hidden="true">
          <span className="divider-line" />
          <span className="divider-core">
            <AvanciniMark variant="os" className="divider-mark" />
          </span>
          <span className="divider-line" />
        </div>

        {/* Right Portal: SYNC */}
        <Link href="/sync" className="portal-panel panel-sync" aria-label="Entrar no Avancini Sync">
          <div className="panel-bg" aria-hidden="true" />
          <div className="panel-glow" aria-hidden="true" />

          <div className="panel-header">
            <span className="panel-tag tag-sync">
              <i className="status-dot dot-sync" /> INTELIGÊNCIA ARTIFICIAL
            </span>
            <span className="panel-index">02</span>
          </div>

          <div className="panel-content">
            <h2 className="panel-title">
              Avancini <em>Sync</em>
            </h2>
            <p className="panel-desc">
              Agentes de IA autônomos que operam 24/7 no WhatsApp. Ouvem áudios, entendem o contexto da sua empresa, qualificam leads e agendam reuniões.
            </p>
          </div>

          <div className="panel-footer">
            <span className="panel-btn btn-sync">
              <span>Acessar Sync</span>
              <Arrow />
            </span>
            <span className="panel-hint">Atendimento autônomo · Responde em 2s</span>
          </div>
        </Link>
      </section>

      {/* Discreet Bottom Bar */}
      <footer className="portal-footer">
        <p>© 2026 AVANCINI OS · Tecnologia com Identidade</p>
        <div className="portal-footer-nav">
          <Link href="/dash">Dash</Link>
          <span className="footer-sep">/</span>
          <Link href="/sync">Sync</Link>
          <span className="footer-sep">/</span>
          <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram</a>
          <span className="footer-sep">/</span>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </footer>
    </main>
  );
}
