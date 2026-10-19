"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { solutions, type SolutionSlug } from "./solutions-data";
import { DirectionIcon } from "./direction-icon";

export function SignalCapabilities() {
  const [activeSlug, setActiveSlug] = useState<SolutionSlug>("ecommerce");
  const active = solutions.find((item) => item.slug === activeSlug) ?? solutions[0];
  const activeIndex = solutions.findIndex((item) => item.slug === activeSlug);

  const whatsappUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá! Vi a solução de ${active.title} no site da Avancini OS e gostaria de entender como aplicar na minha empresa.`
  )}`;

  return (
    <>
      {/* Manifesto Comercial & Posicionamento */}
      <section className="signal-manifesto" id="sobre" aria-labelledby="manifesto-title">
        <div className="signal-manifesto-meta" data-reveal>
          <span>02</span>
          <i />
          Ecossistema Integrado
        </div>
        <div className="signal-manifesto-grid">
          <h2 id="manifesto-title" data-reveal>
            Design de alto padrão, tecnologia robusta e <em>operação que fecha negócios</em>
          </h2>
          <div data-reveal>
            <p>
              Em vez de contratar uma agência para o design, um programador para o site e tentar juntar ferramentas que não conversam entre si, a Avancini OS integra presença visual, automação comercial e sistemas sob a mesma direção técnica.
            </p>
            <p>
              Você pode começar pela demanda mais urgente — como uma nova loja virtual ou uma landing page de alta conversão — com a tranquilidade de que toda a base já nasce pronta para integrar com CRM, WhatsApp e IA sem retrabalho.
            </p>
          </div>
        </div>
        <div className="signal-manifesto-band" aria-hidden="true">
          <span>ALTA CONVERSÃO · CHECKOUT TRANSPARENTE · AGENTES IA 24/7 · CRM & WHATSAPP · SISTEMAS SOB MEDIDA · DESIGN AUTORAL · </span>
          <span>ALTA CONVERSÃO · CHECKOUT TRANSPARENTE · AGENTES IA 24/7 · CRM & WHATSAPP · SISTEMAS SOB MEDIDA · DESIGN AUTORAL · </span>
        </div>
      </section>

      {/* Seção 03: Vitrine Interativa de Vertentes */}
      <section className="signal-capabilities" id="vertentes" aria-labelledby="capabilities-title">
        <header className="signal-capabilities-head">
          <div className="signal-capabilities-label" data-reveal>
            <span>03</span>
            <i />
            Vertentes de Atuação
          </div>
          <h2 id="capabilities-title" data-reveal>
            O que construímos<br />
            <em>para o seu negócio</em>
          </h2>
          <p data-reveal>
            Telas reais, alta velocidade e resultados mensuráveis. Selecione cada vertente para visualizar a entrega em dispositivos reais, recursos técnicos e diferenciais práticos.
          </p>
        </header>

        {/* Tab Selector Superior */}
        <div className="capabilities-tab-bar" role="tablist" aria-label="Selecione uma vertente de atuação">
          {solutions.map((item) => {
            const isSelected = item.slug === activeSlug;
            return (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="capabilities-showcase-panel"
                className={`capability-tab-btn ${isSelected ? "is-active" : ""}`}
                onClick={() => setActiveSlug(item.slug)}
              >
                <span className="tab-number">{item.number}</span>
                <span className="tab-title">{item.short}</span>
                {isSelected && <span className="tab-glow" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* Palco Principal da Vertente Selecionada */}
        <div className="capabilities-showcase-panel" id="capabilities-showcase-panel" role="tabpanel" key={active.slug}>
          {/* Coluna da Esquerda: Dados Comerciais & Recursos */}
          <div className="showcase-content-col">
            <div className="showcase-meta-row">
              <span className="showcase-badge">
                <i className="status-dot" />
                {active.categoryTag}
              </span>
              <span className="showcase-counter">FRENTE {String(activeIndex + 1).padStart(2, "0")} / 06</span>
            </div>

            <h3 className="showcase-title">{active.title}</h3>
            <p className="showcase-eyebrow">{active.eyebrow}</p>
            <p className="showcase-summary">{active.summary}</p>

            {/* Métricas e Resultados Reais */}
            <div className="showcase-metrics-grid">
              {active.metrics.map((metric) => (
                <div key={metric.label} className="showcase-metric-card">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            {/* Recursos Técnicos em Destaque */}
            <div className="showcase-features-list">
              <h4>Recursos em Destaque:</h4>
              <ul>
                {active.impact.map((point) => (
                  <li key={point}>
                    <i className="check-icon" aria-hidden="true">✓</i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Badges de Tecnologias */}
            <div className="showcase-tech-badges">
              {active.techStack.slice(0, 5).map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>

            {/* Ações / Links */}
            <div className="showcase-actions-row">
              <Link href={`/solucoes/${active.slug}`} className="showcase-primary-btn">
                <span>Ver detalhes completos da solução</span>
                <DirectionIcon />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="showcase-whatsapp-btn"
                aria-label={`Conversar sobre ${active.title} no WhatsApp`}
              >
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Coluna da Direita: Mockup Real em Alta Fidelidade */}
          <div className="showcase-visual-col">
            <Link
              href={`/solucoes/${active.slug}`}
              className="showcase-mockup-wrapper"
              aria-label={`Ver página completa de ${active.title}`}
            >
              <div className="mockup-frame">
                <div className="mockup-top-bar">
                  <div className="browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="browser-url">avancini-os.com.br / {active.slug}</span>
                  <span className="browser-status">PRODUÇÃO ATIVA</span>
                </div>
                <div className="mockup-image-container">
                  <Image
                    src={active.image}
                    alt={`Interface real de ${active.title}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    priority
                    className="mockup-image"
                  />
                  <div className="mockup-glass-reflection" aria-hidden="true" />
                  <div className="mockup-hover-overlay">
                    <span className="hover-badge">
                      <span>Explorar página dedicada</span>
                      <DirectionIcon />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mockup-ambient-glow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
