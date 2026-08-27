import React, { useState, useEffect } from "react";
import { useCora } from "../store/useCoraStore";

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string, param?: string) => void;
  isSolid?: boolean;
}

export function Header({ activeView, onNavigate, isSolid = false }: HeaderProps) {
  const { favorites, compareList, setIsSearchOpen } = useCora();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (view: string, param?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, param);
  };

  const isHeaderSolid = isSolid || scrolled || activeView !== "home";

  return (
    <>
      <header className={`cora-header ${isHeaderSolid ? "is-scrolled" : ""}`}>
        <div className="cora-container cora-header-inner">
          {/* BRAND */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="cora-brand-link"
            aria-label="Cora Imóveis — Início"
          >
            <div>
              <span className="cora-brand-logo">CORA</span>
              <span className="cora-brand-tagline">IMÓVEIS</span>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="cora-nav-desktop" aria-label="Navegação Principal">
            <a
              href="#comprar"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("properties", "venda");
              }}
              className={`cora-nav-link ${activeView === "properties" ? "is-active" : ""}`}
            >
              Comprar
            </a>
            <a
              href="#alugar"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("properties", "locacao");
              }}
              className="cora-nav-link"
            >
              Alugar
            </a>
            <a
              href="#lancamentos"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("launches");
              }}
              className={`cora-nav-link ${activeView === "launches" ? "is-active" : ""}`}
            >
              Lançamentos
            </a>
            <a
              href="#bairros"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("neighborhoods");
              }}
              className={`cora-nav-link ${activeView === "neighborhoods" ? "is-active" : ""}`}
            >
              Bairros
            </a>
            <a
              href="#anuncie"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("submit-property");
              }}
              className={`cora-nav-link ${activeView === "submit-property" ? "is-active" : ""}`}
            >
              Anuncie seu imóvel
            </a>
            <a
              href="#simulador"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("simulator");
              }}
              className={`cora-nav-link ${activeView === "simulator" ? "is-active" : ""}`}
            >
              Simulador
            </a>
          </nav>

          {/* ACTIONS */}
          <div className="cora-header-actions">
            {/* BUSCA (CMD+K) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="cora-action-icon-btn"
              title="Buscar (Ctrl+K / ⌘K)"
              aria-label="Abrir busca global"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* FAVORITOS */}
            <button
              type="button"
              onClick={() => handleNavClick("favorites")}
              className="cora-action-icon-btn"
              title="Favoritos"
              aria-label="Ver imóveis favoritos"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={favorites.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {favorites.length > 0 && (
                <span className="cora-badge-count">{favorites.length}</span>
              )}
            </button>

            {/* MINHA CORA */}
            <button
              type="button"
              onClick={() => handleNavClick("my-cora")}
              className="cora-btn cora-btn-secondary"
              style={{
                minHeight: "42px",
                padding: "0 18px",
                fontSize: "12.5px",
                borderRadius: "var(--radius-full)",
                display: "none",
              }}
            >
              <span>Minha Cora</span>
              {compareList.length > 0 && (
                <span
                  style={{
                    background: "var(--cora-accent)",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 800,
                    borderRadius: "999px",
                    padding: "1px 6px",
                  }}
                >
                  {compareList.length}
                </span>
              )}
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cora-menu-toggle-btn"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? (
                <span style={{ fontSize: "22px" }}>✕</span>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(12, 12, 12, 0.98)",
            color: "var(--cora-white)",
            padding: "90px 6vw 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            animation: "coraFadeIn 0.3s ease-out",
          }}
        >
          <div style={{ display: "grid", gap: "16px" }}>
            {[
              { label: "Comprar Imóvel", view: "properties", param: "venda" },
              { label: "Alugar Imóvel", view: "properties", param: "locacao" },
              { label: "Lançamentos Arquitetônicos", view: "launches" },
              { label: "Guia de Bairros Nobres", view: "neighborhoods" },
              { label: "Anuncie seu Imóvel", view: "submit-property" },
              { label: "Simulador Financeiro", view: "simulator" },
              { label: "Consultores Especializados", view: "consultants" },
              { label: "Favoritos Salvos", view: "favorites" },
              { label: "Minha Cora (Painel Pessoal)", view: "my-cora" },
              { label: "Manifesto & Sobre", view: "about" },
              { label: "Contato & Unidades", view: "contact" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={`#${item.view}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.view, item.param);
                }}
                style={{
                  color: "var(--cora-stone-light)",
                  fontSize: "18px",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.label}</span>
                <span style={{ opacity: 0.4 }}>→</span>
              </a>
            ))}
          </div>

          <div style={{ paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--cora-muted-light)" }}>
              Atendimento: (11) 98765-4321
            </span>
            <span style={{ fontSize: "12px", color: "var(--cora-accent)" }}>
              São Paulo · SP
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer({ onNavigate }: { onNavigate: (view: string, param?: string) => void }) {
  return (
    <footer className="cora-footer">
      <div className="cora-container">
        <div className="cora-footer-grid">
          {/* COL 1: BRAND */}
          <div className="cora-footer-column" style={{ maxWidth: "380px" }}>
            <span className="cora-brand-logo" style={{ color: "var(--cora-white)", fontSize: "26px" }}>
              CORA
            </span>
            <span className="cora-brand-tagline" style={{ color: "var(--cora-accent)", marginTop: "4px" }}>
              IMÓVEIS QUE COMBINAM COM O SEU MOMENTO
            </span>
            <p style={{ marginTop: "18px", color: "var(--cora-muted-light)", fontSize: "13.5px", lineHeight: "1.65" }}>
              Curadoria imobiliária de alto padrão em São Paulo. Compra, venda, locação e lançamentos exclusivos com atendimento humano e inteligência de mercado.
            </p>
            <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "var(--cora-stone-light)", fontWeight: 700 }}>
                CRECI Jurídico: 041.892-J (Demonstrativo)
              </span>
            </div>
          </div>

          {/* COL 2: IMÓVEIS */}
          <div className="cora-footer-column">
            <h4>Imóveis</h4>
            <ul className="cora-footer-links">
              <li><a href="#comprar" onClick={(e) => { e.preventDefault(); onNavigate("properties", "venda"); }}>Comprar</a></li>
              <li><a href="#alugar" onClick={(e) => { e.preventDefault(); onNavigate("properties", "locacao"); }}>Alugar</a></li>
              <li><a href="#lancamentos" onClick={(e) => { e.preventDefault(); onNavigate("launches"); }}>Lançamentos</a></li>
              <li><a href="#anuncie" onClick={(e) => { e.preventDefault(); onNavigate("submit-property"); }}>Anuncie seu imóvel</a></li>
              <li><a href="#simulador" onClick={(e) => { e.preventDefault(); onNavigate("simulator"); }}>Simulador de Compra</a></li>
            </ul>
          </div>

          {/* COL 3: BAIRROS & INSTITUCIONAL */}
          <div className="cora-footer-column">
            <h4>Bairros & Sobre</h4>
            <ul className="cora-footer-links">
              <li><a href="#jardins" onClick={(e) => { e.preventDefault(); onNavigate("neighborhood-detail", "jardins"); }}>Jardins</a></li>
              <li><a href="#itaim" onClick={(e) => { e.preventDefault(); onNavigate("neighborhood-detail", "itaim-bibi"); }}>Itaim Bibi</a></li>
              <li><a href="#moema" onClick={(e) => { e.preventDefault(); onNavigate("neighborhood-detail", "moema"); }}>Moema</a></li>
              <li><a href="#vila-nova" onClick={(e) => { e.preventDefault(); onNavigate("neighborhood-detail", "vila-nova-conceicao"); }}>Vila Nova Conceição</a></li>
              <li><a href="#consultores" onClick={(e) => { e.preventDefault(); onNavigate("consultants"); }}>Nossos Consultores</a></li>
              <li><a href="#sobre" onClick={(e) => { e.preventDefault(); onNavigate("about"); }}>Manifesto Cora</a></li>
              <li><a href="#contato" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}>Fale Conosco</a></li>
            </ul>
          </div>

          {/* COL 4: NEWSLETTER */}
          <div className="cora-footer-column">
            <h4>Novos Endereços</h4>
            <p style={{ color: "var(--cora-muted-light)", fontSize: "13px", lineHeight: "1.5" }}>
              Receba quinzenalmente nossa seleção editorial com as propriedades mais desejadas da capital.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Obrigado pelo cadastro! Você receberá nossa curadoria de lançamentos.");
              }}
              style={{ marginTop: "16px", display: "grid", gap: "10px" }}
            >
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                required
                style={{
                  height: "44px",
                  padding: "0 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                className="cora-btn cora-btn-primary"
                style={{ minHeight: "42px", fontSize: "12.5px" }}
              >
                Quero Receber
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="cora-footer-bottom">
          <span suppressHydrationWarning>© {new Date().getFullYear()} Cora Imóveis. Todos os direitos reservados.</span>
          <span style={{ color: "var(--cora-muted)" }}>
            ✦ Projeto conceitual desenvolvido para demonstração de portfólio de alto nível.
          </span>
        </div>
      </div>
    </footer>
  );
}
