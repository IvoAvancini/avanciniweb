"use client";

import { useState } from "react";
import { useVertice } from "../store/useVerticeStore";

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { addToast } = useVertice();
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("E-mail inválido", "Por favor, digite um e-mail válido.", "error");
      return;
    }
    addToast("Inscrição Confirmada!", "Você receberá lançamentos exclusivos VÉRTICE.", "success");
    setEmail("");
  };

  return (
    <footer className="v-footer">
      <div className="v-footer-grid">
        {/* BRAND COLUMN */}
        <div className="v-footer-brand">
          <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: "0.14em", color: "#ffffff" }}>
            VÉRTICE
          </span>
          <p>
            Engenharia têxtil de alta performance e design minimalista contemporâneo para atletas, criadores e exploradores urbanos.
          </p>

          <form onSubmit={handleNewsletter} style={{ marginTop: 24, display: "flex", gap: 8, maxWidth: 360 }}>
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 4,
                padding: "10px 14px",
                color: "#ffffff",
                fontSize: 12,
                outline: "none",
              }}
            />
            <button type="submit" className="v-btn v-btn-primary v-btn-sm">
              CADASTRAR
            </button>
          </form>
        </div>

        {/* COL 1: PRODUTOS */}
        <div className="v-footer-col">
          <h4>COMPRAR</h4>
          <ul>
            <li><a href="#new" onClick={(e) => { e.preventDefault(); onNavigate("catalog", "new"); }}>Lançamentos</a></li>
            <li><a href="#tenis" onClick={(e) => { e.preventDefault(); onNavigate("catalog", "tenis"); }}>Calçados & Running</a></li>
            <li><a href="#masculino" onClick={(e) => { e.preventDefault(); onNavigate("catalog", "masculino"); }}>Masculino</a></li>
            <li><a href="#feminino" onClick={(e) => { e.preventDefault(); onNavigate("catalog", "feminino"); }}>Feminino</a></li>
            <li><a href="#streetwear" onClick={(e) => { e.preventDefault(); onNavigate("catalog", "streetwear"); }}>Street Series</a></li>
            <li><a href="#offers" onClick={(e) => { e.preventDefault(); onNavigate("catalog", "offers"); }}>Ofertas Especiais</a></li>
          </ul>
        </div>

        {/* COL 2: ATENDIMENTO */}
        <div className="v-footer-col">
          <h4>ATENDIMENTO</h4>
          <ul>
            <li><a href="#duvidas" onClick={(e) => { e.preventDefault(); addToast("Central de Ajuda", "Suporte disponível 24/7 via WhatsApp e e-mail.", "info"); }}>Central de Ajuda</a></li>
            <li><a href="#rastreio" onClick={(e) => { e.preventDefault(); onNavigate("account"); }}>Rastrear Pedido</a></li>
            <li><a href="#trocas" onClick={(e) => { e.preventDefault(); addToast("Trocas e Devoluções", "30 dias grátis para trocas sem burocracia.", "info"); }}>Trocas e Devoluções</a></li>
            <li><a href="#pagamentos" onClick={(e) => { e.preventDefault(); addToast("Formas de Pagamento", "Pix 5% OFF, Cartão até 10x ou Boleto.", "info"); }}>Pagamentos & Frete</a></li>
            <li><a href="#guia" onClick={(e) => { e.preventDefault(); addToast("Guia de Medidas", "Consulte no detalhe de qualquer produto.", "info"); }}>Guia de Medidas</a></li>
          </ul>
        </div>

        {/* COL 3: SOBRE */}
        <div className="v-footer-col">
          <h4>A MARCA</h4>
          <ul>
            <li><a href="#manifesto" onClick={(e) => { e.preventDefault(); addToast("Manifesto Vértice", "Alta tecnologia, tecidos sustentáveis e acabamento refinado.", "info"); }}>Manifesto</a></li>
            <li><a href="#sustentabilidade" onClick={(e) => { e.preventDefault(); addToast("Sustentabilidade", "Linha AeroKnit produzida com 70% materiais reciclados.", "info"); }}>Sustentabilidade</a></li>
            <li><a href="#tecnologia" onClick={(e) => { e.preventDefault(); addToast("Tecnologias", "Placa de carbono V-Plate e amortecimento V-Pulse.", "info"); }}>Tecnologias</a></li>
            <li><a href="#imprensa" onClick={(e) => { e.preventDefault(); addToast("Carreiras", "Vagas abertas para nosso Design Studio.", "info"); }}>Carreiras</a></li>
          </ul>
        </div>

        {/* COL 4: REDES */}
        <div className="v-footer-col">
          <h4>CONECTE-SE</h4>
          <ul>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube Lab</a></li>
            <li><a href="https://spotify.com" target="_blank" rel="noreferrer">Running Playlist</a></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="v-footer-bottom">
        <div>© 2026 VÉRTICE LAB INC. TODOS OS DIREITOS RESERVADOS. PROJETO FLAGSHIP PREMIUM.</div>
        <div style={{ display: "flex", gap: 20 }}>
          <span>PIX · CARTÃO DE CRÉDITO 10X · BOLETO</span>
          <span>SSL 256-BIT ENCRYPTION</span>
        </div>
      </div>
    </footer>
  );
}
