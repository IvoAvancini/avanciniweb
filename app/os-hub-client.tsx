"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { AvanciniMark } from "./avancini-mark";
import "./os-hub.css";

const countriesList = [
  { code: "BR", name: "Brasil", ddi: "+55", placeholder: "(11) 99999-9999" },
  { code: "US", name: "Estados Unidos", ddi: "+1", placeholder: "(555) 000-0000" },
  { code: "PT", name: "Portugal", ddi: "+351", placeholder: "912 345 678" },
  { code: "MX", name: "México", ddi: "+52", placeholder: "55 1234 5678" },
  { code: "AR", name: "Argentina", ddi: "+54", placeholder: "11 1234-5678" },
  { code: "GB", name: "Reino Unido", ddi: "+44", placeholder: "7911 123456" },
  { code: "ES", name: "Espanha", ddi: "+34", placeholder: "612 34 56 78" },
  { code: "FR", name: "França", ddi: "+33", placeholder: "06 12 34 56 78" },
  { code: "DE", name: "Alemanha", ddi: "+49", placeholder: "151 12345678" },
  { code: "IT", name: "Itália", ddi: "+39", placeholder: "312 345 6789" },
  { code: "CA", name: "Canadá", ddi: "+1", placeholder: "(555) 000-0000" },
  { code: "CL", name: "Chile", ddi: "+56", placeholder: "9 1234 5678" },
  { code: "CO", name: "Colômbia", ddi: "+57", placeholder: "300 123 4567" },
  { code: "UY", name: "Uruguai", ddi: "+598", placeholder: "99 123 456" },
  { code: "PY", name: "Paraguai", ddi: "+595", placeholder: "981 123456" },
  { code: "JP", name: "Japão", ddi: "+81", placeholder: "90 1234 5678" },
  { code: "CH", name: "Suíça", ddi: "+41", placeholder: "78 123 45 67" },
  { code: "AU", name: "Austrália", ddi: "+61", placeholder: "412 345 678" },
];

function CountryFlagIcon({ code }: { code: string }) {
  if (code === "BR") {
    return (
      <svg viewBox="0 0 32 32" width="18" height="18" className="country-flag-svg" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#009b3a" />
        <polygon points="16,5 28,16 16,27 4,16" fill="#fedf00" />
        <circle cx="16" cy="16" r="6" fill="#002776" />
        <path d="M10.8 17.2 C13 14.8 19 14.8 21.2 17.2" stroke="#ffffff" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }
  if (code === "US") {
    return (
      <svg viewBox="0 0 32 32" width="18" height="18" className="country-flag-svg" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#b22234" />
        <path d="M0 10h32M0 16h32M0 22h32" stroke="#ffffff" strokeWidth="3" />
        <path d="M0 0h16v16H0z" fill="#3c3b6e" />
        <circle cx="8" cy="8" r="3.5" fill="#ffffff" />
      </svg>
    );
  }
  if (code === "PT") {
    return (
      <svg viewBox="0 0 32 32" width="18" height="18" className="country-flag-svg" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#ff0000" />
        <path d="M0 0 A16 16 0 0 0 0 32 L13 32 L13 0 Z" fill="#006600" />
        <circle cx="13" cy="16" r="4.5" fill="#ffff00" stroke="#002776" strokeWidth="1" />
      </svg>
    );
  }
  if (code === "ES") {
    return (
      <svg viewBox="0 0 32 32" width="18" height="18" className="country-flag-svg" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#aa151b" />
        <rect x="0" y="8" width="32" height="16" fill="#f1bf00" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" width="18" height="18" className="country-flag-svg" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1e293b" />
      <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 2a12 12 0 1 1-12 12A12 12 0 0 1 16 4Z" fill="#38bdf8" />
    </svg>
  );
}

const WHATSAPP_NUMBER = "5573981019782";

const whatsappFor = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

function Arrow() {
  return (
    <span className="oshub-arrow" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </span>
  );
}

export function OSHubClient() {
  const [scrolled, setScrolled] = useState(false);
  const [leadContext, setLeadContext] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countriesList[0]);
  const [ddiDropdownOpen, setDdiDropdownOpen] = useState(false);
  const [ddiSearch, setDdiSearch] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");
  const leadInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!leadContext) return;
    const timer = window.setTimeout(() => leadInputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [leadContext]);

  const openLead = (context: string) => {
    setLeadContext(context);
    setLeadName("");
    setLeadPhone("");
    setLeadError("");
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = leadName.trim();
    if (name.length < 2) {
      setLeadError("Digite seu nome para continuar.");
      return;
    }
    const cleanPhone = leadPhone.trim();
    const fullPhone = cleanPhone ? `${selectedCountry.ddi} ${cleanPhone}` : "";
    setLeadError("");
    setLeadSubmitting(true);

    try {
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: fullPhone,
          intent: `Quero conversar sobre ${leadContext}`,
          source: "os_hub",
          page: "/",
        }),
      }).catch(() => {});
    } catch {}

    const phoneText = fullPhone ? ` Meu WhatsApp é ${fullPhone}.` : "";
    const message = `Olá! Meu nome é ${name}.${phoneText} Conheci a Avancini OS e quero entender qual solução faz mais sentido para minha empresa.`;
    window.open(whatsappFor(message), "_blank", "noopener,noreferrer");
    setLeadSubmitting(false);
    setLeadContext("");
    setLeadName("");
    setLeadPhone("");
    setDdiDropdownOpen(false);
  };

  const filteredCountries = countriesList.filter((c) => {
    const q = ddiSearch.toLowerCase().trim();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.ddi.includes(q) || c.code.toLowerCase().includes(q);
  });

  return (
    <main className="oshub-shell" id="inicio">
      {/* Dynamic Ambient Background with Dual Harmonized Glow (Emerald + Cyber Cyan) */}
      <div className="oshub-atmosphere" aria-hidden="true">
        <span className="oshub-aurora oshub-aurora-left" />
        <span className="oshub-aurora oshub-aurora-right" />
        <span className="oshub-center-horizon" />
        <div className="oshub-radar-circles">
          <i /><i /><i /><i />
        </div>
        <span className="oshub-grid-matrix" />
      </div>

      {/* Header */}
      <header className={`oshub-header ${scrolled ? "scrolled" : ""}`}>
        <a className="oshub-brand" href="#inicio" aria-label="Avancini OS — início">
          <AvanciniMark variant="os" className="oshub-brand-mark avancini-a-mark" />
          <span>
            <b>AVANCINI <em>OS</em></b>
            <small>ECOSSISTEMA DE TECNOLOGIA</small>
          </span>
        </a>

        <div className="oshub-header-right">
          <div className="oshub-ecosystem-pills">
            <Link className="oshub-pill oshub-pill-dash" href="/dash">
              <i /> Avancini Dash <Arrow />
            </Link>
            <Link className="oshub-pill oshub-pill-sync" href="/sync">
              <i /> Avancini Sync <Arrow />
            </Link>
          </div>
          <button
            type="button"
            className="oshub-header-contact-btn"
            onClick={() => openLead("entender qual solução faz mais sentido para minha empresa")}
          >
            <span>Falar com especialista</span>
            <Arrow />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="oshub-main">
        {/* Monumental Hero Section */}
        <section className="oshub-hero" aria-labelledby="oshub-title">
          <div className="oshub-hero-content">
            <span className="oshub-eyebrow">
              <i /> TECNOLOGIA COM IDENTIDADE · DUAS SOLUÇÕES INDEPENDENTES
            </span>
            <h1 id="oshub-title">
              Do primeiro clique<br />
              <em>ao fechamento autônomo.</em>
            </h1>
            <p className="oshub-hero-desc">
              Sua empresa precisa de presença para gerar autoridade e de inteligência para não perder contatos. Conheça as duas frentes do ecossistema Avancini desenvolvidas para transformar oportunidades em faturamento.
            </p>

            <div className="oshub-hero-actions">
              <a href="#solucoes" className="oshub-btn oshub-btn-primary">
                Explorar Soluções <Arrow />
              </a>
              <Link href="/dash" className="oshub-btn oshub-btn-dash">
                Presença Digital (Dash) <Arrow />
              </Link>
              <Link href="/sync" className="oshub-btn oshub-btn-sync">
                Agentes de IA (Sync) <Arrow />
              </Link>
            </div>

            <div className="oshub-hero-highlights">
              <div className="oshub-hl-item dash">
                <b>🟢 Avancini Dash</b>
                <span>Sites de alta conversão e autoridade</span>
              </div>
              <div className="oshub-hl-item sync">
                <b>🔵 Avancini Sync</b>
                <span>Agentes de IA que atendem e vendem 24/7</span>
              </div>
              <div className="oshub-hl-item launch">
                <b>⚡ Condição de Lançamento</b>
                <span>Sem taxas de criação ou setup</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Flagship Solutions Section */}
        <section className="oshub-solutions" id="solucoes" aria-labelledby="oshub-solutions-title">
          <header className="oshub-solutions-heading">
            <div>
              <span>01 / ARQUITETURA DO ECOSSISTEMA</span>
              <h2 id="oshub-solutions-title">Onde sua empresa está<br />perdendo clientes hoje?</h2>
            </div>
            <p>Entre exatamente pelo gargalo atual da sua operação. Ambas as soluções funcionam 100% completas por conta própria ou integradas.</p>
          </header>

          <div className="oshub-cards-grid">
            {/* CARD 01: AVANCINI DASH */}
            <article className="oshub-solution-card card-dash">
              <div className="card-top-badge">
                <span className="card-num">01</span>
                <span className="card-moment">ANTES DO CLIQUE · PRESENÇA DIGITAL</span>
              </div>

              <div className="card-body">
                <h3>Avancini Dash</h3>
                <strong className="card-subheadline">
                  Para quem precisa aparecer melhor, gerar confiança e atrair clientes qualificados.
                </strong>
                <p className="card-paragraph">
                  Desenvolvemos sites profissionais, páginas institucionais e landing pages de altíssimo padrão visual e técnico. Sem templates genéricos ou lentidão.
                </p>

                <ul className="card-feature-list">
                  <li><b>✓</b> Design exclusivo sob medida para seu nicho</li>
                  <li><b>✓</b> Velocidade extrema no carregamento (PageSpeed 95+)</li>
                  <li><b>✓</b> Arquitetura persuasiva focada em conversão</li>
                  <li><b>✓</b> Domínio, hospedagem rápida e manutenção inclusos</li>
                </ul>
              </div>

              <div className="card-visual-preview preview-dash" aria-hidden="true">
                <div className="preview-browser-bar">
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-address">suaempresa.com.br</span>
                </div>
                <div className="preview-browser-screen">
                  <small>PRESENÇA DIGITAL DE ALTA CONVERSÃO</small>
                  <h4>Sua marca no nível que ela realmente merece.</h4>
                  <span>Sites que transmitem autoridade imediata</span>
                </div>
              </div>

              <div className="card-footer">
                <Link className="card-action-btn btn-dash" href="/dash">
                  <span>Conhecer Avancini Dash</span>
                  <Arrow />
                </Link>
              </div>
            </article>

            {/* CARD 02: AVANCINI SYNC */}
            <article className="oshub-solution-card card-sync">
              <div className="card-top-badge">
                <span className="card-num">02</span>
                <span className="card-moment">DEPOIS DA MENSAGEM · ATENDIMENTO &amp; VENDAS</span>
              </div>

              <div className="card-body">
                <h3>Avancini Sync</h3>
                <strong className="card-subheadline">
                  Para quem recebe contatos no WhatsApp e perde vendas por demora no atendimento.
                </strong>
                <p className="card-paragraph">
                  Agentes de IA autônomos que compreendem áudios e textos livres, consultam seus dados, qualificam leads e agendam reuniões 24 horas por dia.
                </p>

                <ul className="card-feature-list">
                  <li><b>✓</b> Conversação natural em áudio e texto (sem menus chatos)</li>
                  <li><b>✓</b> Cérebro treinado estritamente nas regras da sua empresa</li>
                  <li><b>✓</b> Agendamento autônomo no Google Calendar / Calendly</li>
                  <li><b>✓</b> Integração direta com CRM (RD Station, HubSpot, Planilhas)</li>
                </ul>
              </div>

              <div className="card-visual-preview preview-sync" aria-hidden="true">
                <div className="preview-chat-head">
                  <span className="chat-avatar-mark">
                    <AvanciniMark variant="sync" className="preview-mark" />
                  </span>
                  <div>
                    <strong>Agente de IA Sync</strong>
                    <small>● Online · Responde em 1.2s</small>
                  </div>
                </div>
                <div className="preview-chat-bubbles">
                  <div className="preview-bubble client">
                    Preciso de um orçamento para minha empresa.
                  </div>
                  <div className="preview-bubble agent">
                    Olá! Posso te ajudar agora. Qual o volume de atendimento mensal da sua equipe?
                  </div>
                  <div className="preview-action-tag">
                    💡 Ação da IA: Lead qualificado · Agendando reunião no Google Calendar
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <Link className="card-action-btn btn-sync" href="/sync">
                  <span>Conhecer Avancini Sync</span>
                  <Arrow />
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Unified Journey Flow Section */}
        <section className="oshub-journey-section">
          <header className="oshub-solutions-heading">
            <div>
              <span>02 / FLUXO COMPLETO</span>
              <h2>Como o ecossistema opera<br />em harmonia perfeita.</h2>
            </div>
            <p>A combinação definitiva de atração de autoridade com conversão autônoma de alta velocidade.</p>
          </header>

          <div className="journey-steps-grid">
            <div className="journey-step-card">
              <span className="step-number">01</span>
              <h4>Atração &amp; Autoridade</h4>
              <p>O cliente encontra seu site moderno criado pela <b>Dash</b>, se impressiona com a rapidez e decide clicar para conversar.</p>
            </div>
            <div className="journey-step-divider">→</div>
            <div className="journey-step-card">
              <span className="step-number">02</span>
              <h4>Atendimento Instantâneo</h4>
              <p>O <b>Agente de IA do Sync</b> responde em menos de 3 segundos no WhatsApp, ouve áudios do cliente e esclarece dúvidas.</p>
            </div>
            <div className="journey-step-divider">→</div>
            <div className="journey-step-card">
              <span className="step-number">03</span>
              <h4>Fechamento &amp; CRM</h4>
              <p>A IA qualifica o perfil do lead, agenda a reunião no calendário e notifica seu consultor com o resumo pronto.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="oshub-footer">
          <div className="footer-top">
            <Link href="/" className="footer-brand">
              <AvanciniMark variant="os" className="footer-mark avancini-a-mark" />
              <span><b>AVANCINI <em>OS</em></b><small>Tecnologia com Identidade</small></span>
            </Link>
            <nav className="footer-nav" aria-label="Navegação do rodapé">
              <Link href="/dash">Avancini Dash</Link>
              <Link href="/sync">Avancini Sync</Link>
              <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram</a>
              <a href="mailto:ivoavancini@hotmail.com">Contato</a>
              <Link href="/privacidade">Privacidade</Link>
              <Link href="/termos">Termos</Link>
            </nav>
          </div>
          <div className="footer-bottom">
            <p>© 2026 AVANCINI OS · TODOS OS DIREITOS RESERVADOS</p>
            <small>Tecnologia para não perder oportunidades antes do clique nem depois da mensagem.</small>
          </div>
        </footer>
      </div>

      {/* Floating WhatsApp Lead Button */}
      <button
        className="whatsapp-float oshub-whatsapp-float"
        type="button"
        aria-label="Conversar com a Avancini OS no WhatsApp"
        onClick={() => openLead("uma solução da Avancini OS")}
      >
        <span className="whatsapp-icon" aria-hidden="true" />
        <i className="whatsapp-notification" aria-hidden="true">1</i>
      </button>

      {/* WhatsApp Lead Modal */}
      {leadContext && (
        <div className="web-lead-modal oshub-web-lead-modal" role="dialog" aria-modal="true" aria-label="Iniciar conversa pelo WhatsApp">
          <form onSubmit={submitLead}>
            <header className="lead-modal-header">
              <div className="lead-avatar-wrap">
                <div className="lead-avatar-img">
                  <AvanciniMark variant="os" className="lead-logo-mark" />
                </div>
                <span className="lead-status-dot" aria-label="Online" />
              </div>
              <div className="lead-header-info">
                <strong className="lead-title">José Avancini - Tecnologia &amp; IA</strong>
                <div className="lead-status-row">
                  <span className="lead-online-badge">online</span>
                  <span className="lead-response-time"> - responde em minutos</span>
                </div>
              </div>
              <button className="web-lead-close" type="button" onClick={() => setLeadContext("")} aria-label="Fechar">✕</button>
            </header>
            <div className="lead-fields-wrap">
              <div className="lead-input-row">
                <div className="lead-field-name">
                  <span className="field-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </span>
                  <input ref={leadInputRef} required minLength={2} maxLength={60} value={leadName} onChange={(event) => { setLeadName(event.target.value); if (leadError) setLeadError(""); }} placeholder="Seu nome" autoComplete="name" aria-label="Seu nome" aria-invalid={Boolean(leadError)} aria-describedby={leadError ? "os-lead-name-error" : undefined} />
                </div>
              </div>
              <div className="lead-input-row lead-phone-row">
                <div className="lead-ddi-container">
                  <button
                    type="button"
                    className="lead-country-badge"
                    onClick={() => setDdiDropdownOpen(!ddiDropdownOpen)}
                    aria-expanded={ddiDropdownOpen}
                    aria-label={`País selecionado: ${selectedCountry.name}, código ${selectedCountry.ddi}`}
                  >
                    <CountryFlagIcon code={selectedCountry.code} />
                    <span className="country-code">{selectedCountry.ddi}</span>
                    <span className="country-caret">⌵</span>
                  </button>
                  {ddiDropdownOpen && (
                    <div className="lead-ddi-dropdown" role="listbox">
                      <div className="lead-ddi-search">
                        <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Buscar país..."
                          value={ddiSearch}
                          onChange={(e) => setDdiSearch(e.target.value)}
                          autoFocus
                          aria-label="Buscar país"
                        />
                      </div>
                      <div className="lead-ddi-list">
                        {filteredCountries.map((c) => (
                          <button
                            type="button"
                            key={c.code}
                            className={`lead-ddi-option ${selectedCountry.code === c.code ? "active" : ""}`}
                            onClick={() => {
                              setSelectedCountry(c);
                              setDdiDropdownOpen(false);
                              setDdiSearch("");
                            }}
                          >
                            <CountryFlagIcon code={c.code} />
                            <span className="country-name">{c.name}</span>
                            <span className="country-ddi-code">{c.ddi}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="lead-field-phone">
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={(event) => {
                      let v = event.target.value.replace(/\D/g, "");
                      if (selectedCountry.code === "BR") {
                        if (v.length > 11) v = v.slice(0, 11);
                        if (v.length > 10) {
                          v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
                        } else if (v.length > 6) {
                          v = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
                        } else if (v.length > 2) {
                          v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
                        }
                      }
                      setLeadPhone(v);
                    }}
                    placeholder={selectedCountry.placeholder}
                    autoComplete="tel"
                    aria-label="Seu WhatsApp"
                  />
                </div>
              </div>
            </div>
            {leadError && <p className="lead-error" id="os-lead-name-error" role="alert">{leadError}</p>}
            <button className="lead-submit" type="submit" disabled={leadSubmitting}>
              {leadSubmitting ? "CONECTANDO..." : "INICIAR CONVERSA"}
            </button>
            <p className="lead-footer-note">
              Você será direcionado pro WhatsApp com a mensagem pronta.
            </p>
          </form>
        </div>
      )}
    </main>
  );
}
