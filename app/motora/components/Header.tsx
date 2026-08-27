"use client";

import { useState, useEffect } from "react";
import { useMotora } from "../store/useMotoraStore";

const ANNOUNCEMENTS = [
  "CONDIÇÕES ESPECIAIS · SIMULAÇÕES DE FINANCIAMENTO COM TAXAS PROMOCIONAIS",
  "AVALIAÇÃO DO SEU USADO NA TROCA COM ANÁLISE TRANSPARENTE",
  "GARANTIA MOTORA EM TODO O ESTOQUE DE SEMINOVOS SELECIONADOS",
];

interface HeaderProps {
  onNavigate: (view: string, param?: string) => void;
  activeView: string;
}

export function Header({ onNavigate, activeView }: HeaderProps) {
  const { favoritesCount, compareCount, testDrives, valuations, openSearch, openWhatsAppModal } = useMotora();
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalGarageCount = favoritesCount + compareCount + testDrives.length + valuations.length;

  const desktopNavLinks = [
    { id: "vehicles", label: "Comprar", view: "vehicles" },
    { id: "new", label: "0km Novos", view: "vehicles", param: "new" },
    { id: "used", label: "Seminovos", view: "vehicles", param: "used" },
    { id: "offers", label: "Ofertas", view: "offers", isHighlight: true },
    { id: "tradein", label: "Vender / Troca", view: "tradein" },
    { id: "financing", label: "Financiar", view: "financing" },
    { id: "services", label: "Serviços", view: "services" },
    { id: "stores", label: "Lojas", view: "stores" },
  ];

  const tabletNavLinks = [
    { id: "vehicles", label: "Comprar", view: "vehicles" },
    { id: "offers", label: "Ofertas", view: "offers", isHighlight: true },
    { id: "tradein", label: "Vender", view: "tradein" },
    { id: "stores", label: "Lojas", view: "stores" },
  ];

  const handleMobileNav = (view: string, param?: string) => {
    setIsMobileDrawerOpen(false);
    onNavigate(view, param);
  };

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="m-announcement-bar">
        <span>
          <span className="m-announcement-dot" />
          {ANNOUNCEMENTS[announcementIndex]}
        </span>
      </div>

      {/* MAIN HEADER (BLACK LUXURY) */}
      <header className={`m-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="m-header-inner">
          {/* MOBILE HAMBURGER BUTTON (< 768px) */}
          <button
            type="button"
            className="m-icon-btn m-mobile-only-btn"
            onClick={() => setIsMobileDrawerOpen(true)}
            aria-label="Abrir menu de navegação"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* BRAND LOGO */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="m-brand-logo"
          >
            MOTORA<span>.</span>
          </button>

          {/* DESKTOP NAV (>= 1200px) */}
          <nav className="m-nav-desktop">
            {desktopNavLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`m-nav-item ${activeView === link.id ? "is-active" : ""} ${
                  link.isHighlight ? "m-nav-item-highlight" : ""
                }`}
                onClick={() => onNavigate(link.view, link.param)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* TABLET NAV (768px - 1199px) */}
          <nav className="m-nav-tablet">
            {tabletNavLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`m-nav-item ${activeView === link.id ? "is-active" : ""} ${
                  link.isHighlight ? "m-nav-item-highlight" : ""
                }`}
                onClick={() => onNavigate(link.view, link.param)}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              className="m-nav-item"
              onClick={() => setIsMobileDrawerOpen(true)}
            >
              MAIS ▾
            </button>
          </nav>

          {/* ACTIONS */}
          <div className="m-header-actions">
            {/* SEARCH */}
            <button
              type="button"
              className="m-icon-btn"
              onClick={openSearch}
              aria-label="Buscar veículos"
              title="Buscar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* GARAGEM / MEUS CARROS */}
            <button
              type="button"
              className="m-btn m-btn-secondary m-btn-sm"
              onClick={() => onNavigate("garage")}
              style={{ display: "inline-flex", gap: 6, position: "relative" }}
              title="Garagem Pessoal"
            >
              <span>GARAGEM</span>
              {totalGarageCount > 0 && (
                <span
                  style={{
                    background: "var(--m-brand-amber-light)",
                    color: "#000",
                    fontSize: 9,
                    fontWeight: 900,
                    padding: "1px 5px",
                    borderRadius: 10,
                  }}
                >
                  {totalGarageCount}
                </span>
              )}
            </button>

            {/* DESKTOP WHATSAPP CTA */}
            <button
              type="button"
              className="m-btn m-btn-amber m-btn-sm m-desktop-wh-btn"
              onClick={openWhatsAppModal}
              style={{ display: "inline-flex", gap: 6 }}
            >
              <span>💬 WHATSAPP</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE / TABLET DRAWER */}
      {isMobileDrawerOpen && (
        <div className="m-mobile-drawer-overlay" onClick={() => setIsMobileDrawerOpen(false)}>
          <div className="m-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="m-mobile-drawer-head">
                <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: "0.16em", color: "#ffffff" }}>
                  MOTORA<span style={{ color: "var(--m-brand-amber-light)" }}>.</span>
                </span>
                <button
                  type="button"
                  className="m-icon-btn"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  aria-label="Fechar menu"
                >
                  ✕
                </button>
              </div>

              <div className="m-mobile-drawer-links">
                {desktopNavLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    className={`m-mobile-nav-btn ${activeView === link.id ? "is-active" : ""} ${
                      link.isHighlight ? "m-nav-item-highlight" : ""
                    }`}
                    onClick={() => handleMobileNav(link.view, link.param)}
                  >
                    <span>{link.label}</span>
                    <span style={{ fontSize: 12, color: "#64748b" }}>➔</span>
                  </button>
                ))}
                <button
                  type="button"
                  className="m-mobile-nav-btn"
                  onClick={() => handleMobileNav("garage")}
                >
                  <span>Minha Garagem ({totalGarageCount})</span>
                  <span style={{ fontSize: 12, color: "#64748b" }}>➔</span>
                </button>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: 16, display: "grid", gap: 10 }}>
              <button
                type="button"
                className="m-btn m-btn-amber m-btn-full"
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  openWhatsAppModal();
                }}
              >
                💬 FALAR COM CONSULTOR
              </button>
              <span style={{ fontSize: 11, color: "#64748b", textAlign: "center" }}>
                Atendimento VIP Concessionária
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
