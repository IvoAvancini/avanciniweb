"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AvanciniMark } from "./avancini-mark";
import { DirectionIcon } from "./direction-icon";
import { solutions, type SolutionSlug } from "./solutions-data";
import { InteractiveHeroField } from "./components/interactive-hero-field";

type SignalHeroProps = {
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuTriggerRef: React.RefObject<HTMLButtonElement | null>;
};

export function SignalHero({ menuOpen, onOpenMenu, menuTriggerRef }: SignalHeroProps) {
  const [activeSlug, setActiveSlug] = useState<SolutionSlug>("ecommerce");
  const userInteractedRef = useRef(false);
  const activeSolution = solutions.find((s) => s.slug === activeSlug) ?? solutions[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (userInteractedRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setActiveSlug((current) => {
        const index = solutions.findIndex((s) => s.slug === current);
        return solutions[(index + 1) % solutions.length].slug;
      });
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const handleSelectSolution = (slug: SolutionSlug) => {
    userInteractedRef.current = true;
    setActiveSlug(slug);
  };

  const whatsappHeroUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    "Olá! Acessei o site da Avancini OS e gostaria de solicitar um orçamento para minha empresa."
  )}`;

  return (
    <section className="signal-hero" id="inicio" aria-labelledby="signal-title">
      {/* Interactive Cursor Force-field Background */}
      <InteractiveHeroField />

      {/* Top Navbar Sticky */}
      <header className="signal-header">
        <Link href="/" className="signal-brand" aria-label="Avancini OS, início">
          <AvanciniMark variant="os" className="signal-brand-mark" />
          <div className="signal-brand-text">
            <strong>AVANCINI</strong>
            <span>OS</span>
          </div>
        </Link>

        {/* Links de navegação no centro */}
        <nav className="signal-nav" aria-label="Navegação do cabeçalho">
          <a href="#inicio">Início</a>
          <a href="#projetos">Projetos</a>
          <a href="#vertentes">Soluções</a>
          <a href="#sistema">Integração</a>
          <a href="#metodo">Método</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>

        {/* Ações da direita: Botão Solicitar Orçamento + Botão de Menu */}
        <div className="signal-header-actions">
          <a
            href={whatsappHeroUrl}
            target="_blank"
            rel="noreferrer"
            className="header-orcamento-btn"
            aria-label="Solicitar Orçamento no WhatsApp"
          >
            <span>SOLICITAR ORÇAMENTO</span>
            <span className="orcamento-arrow-badge" aria-hidden="true">↗</span>
          </a>

          {/* Botão de Menu visível para acesso rápido ao drawer completo */}
          <button
            ref={menuTriggerRef}
            className="signal-menu-trigger"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="atlas-menu"
            onClick={onOpenMenu}
            aria-label="Abrir menu de navegação"
          >
            <span className="menu-text">Menu</span>
            <div className="menu-bars-icon" aria-hidden="true">
              <span />
              <span />
            </div>
          </button>
        </div>
      </header>

      {/* Grid Principal do Hero: Tipografia de Alto Padrão + Showcase Visual */}
      <div className="signal-hero-grid">
        {/* Coluna da Esquerda: Narrativa Limpa e Vendedora */}
        <div className="signal-copy">
          <h1 id="signal-title" className="hero-main-headline">
            Engenharia digital e design de alto padrão para quem quer <em>vender mais</em>
          </h1>

          <p className="hero-main-subtext">
            Desenvolvemos e-commerces com checkout em 1 passo, sites institucionais ultra rápidos, agentes de IA no WhatsApp e sistemas web sob medida construídos em Next.js para maximizar os resultados da sua empresa.
          </p>

          {/* Ações do Hero Estilo Paulo Leme */}
          <div className="hero-buttons-row">
            <a
              href={whatsappHeroUrl}
              target="_blank"
              rel="noreferrer"
              className="hero-primary-pill-btn"
            >
              <span>SOLICITAR ORÇAMENTO</span>
              <span className="hero-arrow-badge" aria-hidden="true">↗</span>
            </a>

            <a href="#projetos" className="hero-secondary-btn">
              <span>Ver Trabalhos Selecionados</span>
            </a>
          </div>

          {/* Faixa de Credenciais e Tecnologias */}
          <div className="hero-trust-row">
            <div className="trust-pill">
              <span className="trust-dot" />
              <strong>Pronto em Produção</strong>
            </div>
            <div className="trust-pill">
              <span className="trust-dot" />
              <strong>Carregamento &lt; 1s</strong>
            </div>
            <div className="trust-pill">
              <span className="trust-dot" />
              <strong>100% Código Próprio</strong>
            </div>
          </div>
        </div>

        {/* Coluna da Direita: Vitrine Digital Interativa em Dispositivo Real */}
        <div className="signal-cockpit" aria-label="Vitrine de aplicações da Avancini OS">
          <div className="cockpit-header">
            <div className="cockpit-title-row">
              <span className="cockpit-label">VITRINE OPERACIONAL</span>
              <span className="cockpit-status">
                <i /> ONLINE EM PRODUÇÃO
              </span>
            </div>

            {/* Abas Superiores do Cockpit */}
            <div className="cockpit-tabs" role="tablist">
              {solutions.map((item) => {
                const isSelected = item.slug === activeSlug;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`cockpit-tab-pill ${isSelected ? "is-selected" : ""}`}
                    onClick={() => handleSelectSolution(item.slug)}
                  >
                    <span>0{item.number.slice(-1)}</span>
                    <b>{item.short}</b>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card Central com Preview em Dispositivo Real */}
          <div className="cockpit-stage-card" key={activeSolution.slug}>
            <div className="stage-browser-header">
              <div className="stage-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="stage-url">avancini-os.com.br / {activeSolution.slug}</span>
              <span className="stage-tag">{activeSolution.categoryTag.split("&")[0].trim()}</span>
            </div>

            <div className="stage-preview-media">
              <Image
                src={activeSolution.image}
                alt={`Preview da solução ${activeSolution.title}`}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className="stage-img"
              />
              <div className="stage-glass-overlay" aria-hidden="true" />

              <div className="stage-info-pill">
                <strong>{activeSolution.title}</strong>
                <p>{activeSolution.eyebrow}</p>
              </div>
            </div>

            <div className="stage-footer">
              <div className="stage-metrics-row">
                {activeSolution.metrics.slice(0, 3).map((metric) => (
                  <div key={metric.label} className="stage-metric-cell">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>

              <Link href={`/solucoes/${activeSolution.slug}`} className="stage-explore-link">
                <span>Conhecer detalhes</span>
                <DirectionIcon />
              </Link>
            </div>
          </div>

          <div className="cockpit-ambient-glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
