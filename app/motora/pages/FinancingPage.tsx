"use client";

import { useMotora } from "../store/useMotoraStore";
import { FinancingCalculator } from "../components/FinancingCalculator";

interface FinancingPageProps {
  onExploreStock: () => void;
}

export function FinancingPage({ onExploreStock }: FinancingPageProps) {
  const { openWhatsAppModal } = useMotora();

  return (
    <div style={{ paddingBottom: 100, background: "var(--m-light-bg)" }}>
      {/* HERO INSTITUCIONAL ESCURO */}
      <div style={{ padding: "clamp(48px, 6vw, 72px) var(--m-gutter) clamp(32px, 4vw, 48px)", background: "#090a0f", color: "#ffffff", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "var(--m-brand-amber-light)", textTransform: "uppercase" }}>
            CRÉDITO & PARCELAMENTO INTELIGENTE
          </span>
          <h1 style={{ fontSize: "clamp(26px, 3.8vw, 48px)", fontWeight: 900, color: "#ffffff", margin: "8px 0 12px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            SEU CARRO. SUAS CONDIÇÕES.
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: 640, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Financie seu novo ou seminovo com taxas negociadas diretamente com os principais bancos do país. Simulação transparente e aprovação ágil.
          </p>
        </div>
      </div>

      <div className="motora-container" style={{ padding: "clamp(36px, 5vw, 60px) var(--m-gutter)", maxWidth: 1000, margin: "0 auto", display: "grid", gap: 50 }}>
        {/* CALCULATOR */}
        <FinancingCalculator vehiclePrice={220000} />

        {/* STEP BY STEP */}
        <div>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#64748b", textTransform: "uppercase" }}>
              FLUXO TRANSPARENTE
            </span>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "6px 0 0" }}>
              COMO FUNCIONA O FINANCIAMENTO NA MOTORA
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
            {[
              { num: "01", title: "Escolha o Veículo", desc: "Selecione qualquer modelo novo ou seminovo do nosso estoque auditado." },
              { num: "02", title: "Simule a Parcela", desc: "Ajuste o valor de entrada e escolha o prazo ideal de 12 a 60 meses." },
              { num: "03", title: "Envie seus Dados", desc: "Preencha seus dados de forma segura para análise das financeiras." },
              { num: "04", title: "Acelere seu Carro", desc: "Aprovação rápida e retirada com tanque cheio e documentação checada." },
            ].map((step, idx) => (
              <div key={idx} style={{ background: "#ffffff", padding: 22, borderRadius: 8, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: "#d97706", display: "block", marginBottom: 6 }}>{step.num}</span>
                <strong style={{ fontSize: 15, color: "#0f172a", display: "block", marginBottom: 6 }}>{step.title}</strong>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA ACTIONS */}
        <div style={{ textAlign: "center", background: "#ffffff", padding: "clamp(32px, 5vw, 44px) 24px", borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
          <h3 style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "0 0 10px 0" }}>
            PRECISA DE AUXÍLIO PARA APROVAÇÃO?
          </h3>
          <p style={{ color: "#64748b", maxWidth: 480, margin: "0 auto 24px", fontSize: 14, lineHeight: 1.55 }}>
            Fale com nossos especialistas em crédito e encontre a melhor composição de taxas para o seu perfil.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button type="button" className="m-btn m-btn-amber" onClick={openWhatsAppModal}>
              FALAR COM CONSULTOR FINANCEIRO ➔
            </button>
            <button type="button" className="m-btn m-btn-secondary" onClick={onExploreStock}>
              VER VEÍCULOS DISPONÍVEIS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
