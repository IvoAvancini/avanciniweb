"use client";

import { useMotora } from "../store/useMotoraStore";

interface StoresPageProps {
  onExploreStock: () => void;
}

export function StoresPage({ onExploreStock }: StoresPageProps) {
  const { openWhatsAppModal } = useMotora();

  const stores = [
    {
      name: "Flagship Showroom Jardins",
      address: "Av. Europa, 850 · Jardins · São Paulo - SP",
      phone: "(11) 3080-9000",
      hours: "Seg a Sex: 09h às 19h · Sáb: 09h às 17h",
      features: ["Showroom Superesportivos", "Lounge VIP", "Atendimento Personalizado", "Boutique de Acessórios"],
      stockCount: 18,
    },
    {
      name: "Complexo Morumbi & Seminovos",
      address: "Av. Giovanni Gronchi, 4500 · Morumbi · São Paulo - SP",
      phone: "(11) 3740-8000",
      hours: "Seg a Sex: 08h30 às 19h · Sáb: 09h às 18h",
      features: ["Centro de Seminovos Selecionados", "Oficina Integrada", "Pista de Test-Drive", "Espaço VIP"],
      stockCount: 22,
    },
    {
      name: "Unidade Alphaville",
      address: "Al. Rio Negro, 1200 · Alphaville · Barueri - SP",
      phone: "(11) 4190-7000",
      hours: "Seg a Sex: 09h às 19h · Sáb: 09h às 16h",
      features: ["Showroom SUVs & Elétricos", "Estação de Recarga Rápida", "Consultoria de Financiamento"],
      stockCount: 14,
    },
    {
      name: "Unidade Campinas & Região",
      address: "Av. José de Souza Campos, 900 · Cambuí · Campinas - SP",
      phone: "(19) 3250-6000",
      hours: "Seg a Sex: 09h às 19h · Sáb: 09h às 16h",
      features: ["Showroom Completo", "Centro de Avaliação de Usados", "Consultoria Técnica"],
      stockCount: 12,
    },
  ];

  return (
    <div style={{ paddingBottom: 100, background: "var(--m-light-bg)" }}>
      {/* HERO INSTITUCIONAL ESCURO */}
      <div style={{ padding: "clamp(48px, 6vw, 72px) var(--m-gutter) clamp(32px, 4vw, 48px)", background: "#090a0f", color: "#ffffff", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "var(--m-brand-amber-light)", textTransform: "uppercase" }}>
            REDE DE CONCESSIONÁRIAS · DADOS DEMONSTRATIVOS
          </span>
          <h1 style={{ fontSize: "clamp(26px, 3.8vw, 48px)", fontWeight: 900, color: "#ffffff", margin: "8px 0 12px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            CONHEÇA NOSSAS LOJAS.
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: 640, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Showrooms com arquitetura contemporânea, consultoria exclusiva e estrutura completa para avaliação de veículos e test-drives.
          </p>
        </div>
      </div>

      {/* CARDS DAS LOJAS EM BASE CLARA */}
      <div className="motora-container" style={{ padding: "clamp(36px, 5vw, 60px) var(--m-gutter)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 32 }}>
          {stores.map((st, idx) => (
            <div
              key={idx}
              style={{
                background: "#ffffff",
                padding: "clamp(22px, 3vw, 32px)",
                borderRadius: 10,
                border: "1px solid var(--m-light-border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 20,
                boxShadow: "var(--m-shadow-subtle)",
              }}
            >
              <div>
                <span style={{ fontSize: 11, fontWeight: 900, color: "#d97706", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {st.stockCount} VEÍCULOS NESTA UNIDADE
                </span>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "6px 0 10px 0" }}>
                  {st.name}
                </h2>
                <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.6, margin: "0 0 14px 0" }}>
                  📍 {st.address}
                  <br />
                  📞 {st.phone}
                  <br />
                  🕒 {st.hours}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {st.features.map((f, i) => (
                    <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", background: "#f1f5f9", borderRadius: 4, color: "#334155" }}>
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  className="m-btn m-btn-primary m-btn-sm"
                  style={{ flex: 1 }}
                  onClick={openWhatsAppModal}
                >
                  FALAR COM ESTA LOJA ➔
                </button>
                <button
                  type="button"
                  className="m-btn m-btn-secondary m-btn-sm"
                  onClick={onExploreStock}
                >
                  VER ESTOQUE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", color: "#64748b", fontSize: 12 }}>
          *Unidades e endereços exibidos para fins de demonstração do portfólio de ecossistema automotivo.
        </div>
      </div>
    </div>
  );
}
