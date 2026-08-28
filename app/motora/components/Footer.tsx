"use client";

import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { addToast } = useMotora();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      addToast("E-mail inválido", "Por favor, digite um e-mail válido.", "error");
      return;
    }
    addToast("Inscrição Confirmada", "Você receberá os drops de lançamentos e ofertas exclusivas.", "success");
    setNewsletterEmail("");
  };

  return (
    <footer className="m-footer">
      <div className="m-footer-grid">
        {/* BRAND COLUMN */}
        <div className="m-footer-brand">
          <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: "0.2em", color: "#ffffff", display: "block" }}>
            MOTORA
          </span>
          <p>
            Concessionária premium de novos e seminovos certificados. Excelência em procedência, transparência técnica e condições sob medida.
          </p>

          {/* NEWSLETTER */}
          <div style={{ marginTop: 24 }}>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>
              FIQUE POR DENTRO DE OFERTAS & DROPS
            </span>
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                placeholder="Seu melhor e-mail..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--m-border-medium)",
                  borderRadius: 2,
                  padding: "9px 12px",
                  color: "#ffffff",
                  fontSize: 11.5,
                  outline: "none",
                }}
              />
              <button type="submit" className="m-btn m-btn-primary m-btn-sm">
                CADASTRAR
              </button>
            </form>
          </div>
        </div>

        {/* 1. COMPRA */}
        <div className="m-footer-col">
          <h4>COMPRA</h4>
          <ul>
            <li><a href="#veiculos" onClick={(e) => { e.preventDefault(); onNavigate("vehicles"); }}>Estoque Completo</a></li>
            <li><a href="#novos" onClick={(e) => { e.preventDefault(); onNavigate("vehicles", "new"); }}>0km Novos</a></li>
            <li><a href="#seminovos" onClick={(e) => { e.preventDefault(); onNavigate("vehicles", "used"); }}>Seminovos Certificados</a></li>
            <li><a href="#ofertas" onClick={(e) => { e.preventDefault(); onNavigate("offers"); }}>Ofertas do Mês</a></li>
            <li><a href="#financiamento" onClick={(e) => { e.preventDefault(); onNavigate("financing"); }}>Simulador de Crédito</a></li>
          </ul>
        </div>

        {/* 2. VENDA SEU CARRO */}
        <div className="m-footer-col">
          <h4>VENDA SEU CARRO</h4>
          <ul>
            <li><a href="#troca" onClick={(e) => { e.preventDefault(); onNavigate("tradein"); }}>Avalie seu Usado</a></li>
            <li><a href="#troca" onClick={(e) => { e.preventDefault(); onNavigate("tradein"); }}>Troca com FIPE</a></li>
            <li><a href="#consignacao" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}>Venda Consignada</a></li>
            <li><a href="#blindagem" onClick={(e) => { e.preventDefault(); onNavigate("services"); }}>Avaliação de Blindados</a></li>
          </ul>
        </div>

        {/* 3. SERVIÇOS & PÓS-VENDA */}
        <div className="m-footer-col">
          <h4>PÓS-VENDA</h4>
          <ul>
            <li><a href="#servicos" onClick={(e) => { e.preventDefault(); onNavigate("services"); }}>Revisão Periódica</a></li>
            <li><a href="#servicos" onClick={(e) => { e.preventDefault(); onNavigate("services"); }}>Troca de Óleo e Filtros</a></li>
            <li><a href="#servicos" onClick={(e) => { e.preventDefault(); onNavigate("services"); }}>Funilaria e Pintura Express</a></li>
            <li><a href="#servicos" onClick={(e) => { e.preventDefault(); onNavigate("services"); }}>Higienização e Estética</a></li>
            <li><a href="#servicos" onClick={(e) => { e.preventDefault(); onNavigate("services"); }}>Peças e Acessórios Originais</a></li>
          </ul>
        </div>

        {/* 4. INSTITUCIONAL */}
        <div className="m-footer-col">
          <h4>MOTORA</h4>
          <ul>
            <li><a href="#sobre" onClick={(e) => { e.preventDefault(); onNavigate("about"); }}>Nossa História</a></li>
            <li><a href="#lojas" onClick={(e) => { e.preventDefault(); onNavigate("stores"); }}>Concessionárias & Lojas</a></li>
            <li><a href="#contato" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}>Central de Atendimento</a></li>
            <li><a href="#garantia" onClick={(e) => { e.preventDefault(); onNavigate("about"); }}>Garantia Certificada</a></li>
          </ul>
        </div>
      </div>

      <div className="m-footer-bottom">
        <span suppressHydrationWarning>© {new Date().getFullYear()} MOTORA Veículos Premium S.A. Todos os direitos reservados.</span>
        <span>Tecnologia & Experiência por Avancini OS · Demonstração Técnica Front-End</span>
      </div>
    </footer>
  );
}
