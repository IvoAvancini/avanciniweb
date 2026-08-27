"use client";

import { useState, useEffect } from "react";
import { useVertice } from "../store/useVerticeStore";
import { MegaMenu } from "./MegaMenu";

const ANNOUNCEMENTS = [
  "FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 399",
  "PARCELAMENTO EM ATÉ 10X SEM JUROS",
  "NOVA COLEÇÃO FLOW PRO 2026 DISPONÍVEL",
];

interface HeaderProps {
  onNavigate: (view: string, param?: string) => void;
  activeView: string;
}

export function Header({ onNavigate, activeView }: HeaderProps) {
  const { cartCount, wishlistCount, openCart, openSearch, isLoggedIn } = useVertice();
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Rotate announcement messages
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Handle scroll shrink
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "new", label: "Novidades", category: "new" },
    { id: "masculino", label: "Masculino", category: "masculino", hasMega: true },
    { id: "feminino", label: "Feminino", category: "feminino", hasMega: true },
    { id: "tenis", label: "Calçados", category: "tenis" },
    { id: "streetwear", label: "Streetwear", category: "streetwear" },
    { id: "offers", label: "Ofertas", category: "offers", isSale: true },
  ];

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="v-announcement-bar">
        <span>
          <span className="v-announcement-dot" />
          {ANNOUNCEMENTS[announcementIndex]}
        </span>
      </div>

      {/* MAIN HEADER */}
      <header
        className={`v-header ${isScrolled ? "is-scrolled" : ""}`}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        {/* MOBILE MENU TOGGLE */}
        <button
          type="button"
          className="v-icon-btn md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir Menu"
          style={{ display: "none" }} // Desktop default
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        {/* LOGO */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="v-brand-logo"
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
        >
          VÉRTICE
        </button>

        {/* DESKTOP NAV */}
        <nav className="v-nav-desktop">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`v-nav-item ${activeView === link.id ? "is-active" : ""} ${
                link.isSale ? "v-nav-item-sale" : ""
              }`}
              onMouseEnter={() => (link.hasMega ? setActiveMegaMenu(link.category) : setActiveMegaMenu(null))}
              onClick={() => {
                setActiveMegaMenu(null);
                onNavigate("catalog", link.category);
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* ACTIONS: SEARCH, USER, WISHLIST, CART */}
        <div className="v-header-actions">
          {/* SEARCH */}
          <button
            type="button"
            className="v-icon-btn"
            onClick={openSearch}
            aria-label="Buscar produtos"
            title="Buscar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* USER / ACCOUNT */}
          <button
            type="button"
            className="v-icon-btn"
            onClick={() => onNavigate(isLoggedIn ? "account" : "login")}
            aria-label={isLoggedIn ? "Minha Conta" : "Fazer Login"}
            title={isLoggedIn ? "Minha Conta" : "Login"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* WISHLIST */}
          <button
            type="button"
            className="v-icon-btn"
            onClick={() => onNavigate("wishlist")}
            aria-label="Favoritos"
            title="Favoritos"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && <span className="v-badge-count">{wishlistCount}</span>}
          </button>

          {/* CART */}
          <button
            type="button"
            className="v-icon-btn"
            onClick={openCart}
            aria-label="Abrir Sacola"
            title="Sacola"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="v-badge-count">{cartCount}</span>}
          </button>
        </div>

        {/* MEGA MENU COMPONENT */}
        {activeMegaMenu && (
          <MegaMenu
            category={activeMegaMenu}
            onSelect={(cat) => {
              setActiveMegaMenu(null);
              onNavigate("catalog", cat);
            }}
          />
        )}
      </header>
    </>
  );
}
