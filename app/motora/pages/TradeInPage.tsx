"use client";

import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";
import { TradeInValuation } from "../types";

interface TradeInPageProps {
  onExploreStock: () => void;
}

export function TradeInPage({ onExploreStock }: TradeInPageProps) {
  const { submitTradeIn } = useMotora();

  const [brand, setBrand] = useState("Honda");
  const [model, setModel] = useState("Civic");
  const [year, setYear] = useState("2022");
  const [version, setVersion] = useState("2.0 EXL Flex");
  const [mileage, setMileage] = useState(36000);
  const [color, setColor] = useState("Preto Cristal");
  const [city, setCity] = useState("São Paulo - SP");
  const [userName, setUserName] = useState("João Silva");
  const [userPhone, setUserPhone] = useState("(11) 98765-4321");
  const [userEmail] = useState("joao.silva@exemplo.com");

  const [lastValuation, setLastValuation] = useState<TradeInValuation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = submitTradeIn({
      brand,
      model,
      year,
      version,
      mileage,
      color,
      city,
      userName,
      userPhone,
      userEmail,
    });
    setLastValuation(res);
  };

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);

  return (
    <div style={{ paddingBottom: 100, background: "var(--m-light-bg)" }}>
      {/* HERO INSTITUCIONAL ESCURO */}
      <div style={{ padding: "clamp(48px, 6vw, 72px) var(--m-gutter) clamp(32px, 4vw, 48px)", background: "#090a0f", color: "#ffffff", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "var(--m-brand-amber-light)", textTransform: "uppercase" }}>
            AVALIAÇÃO DE SEMINOVOS · VENDA OU TROCA
          </span>
          <h1 style={{ fontSize: "clamp(26px, 3.8vw, 48px)", fontWeight: 900, color: "#ffffff", margin: "8px 0 12px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            SEU CARRO VALE MAIS NA MOTORA.
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: 640, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Receba uma proposta justa e transparente com base nas cotações reais de mercado para abater na compra do seu próximo veículo.
          </p>
        </div>
      </div>

      {/* FORMULÁRIO EM CARD BRANCO */}
      <div className="motora-container" style={{ padding: "clamp(36px, 5vw, 60px) var(--m-gutter)", maxWidth: 860, margin: "0 auto" }}>
        {lastValuation ? (
          <div style={{ background: "#ffffff", padding: "clamp(24px, 4vw, 44px)", borderRadius: 10, border: "1px solid #bbf7d0", textAlign: "center", display: "grid", gap: 16, boxShadow: "var(--m-shadow-subtle)" }}>
            <span style={{ fontSize: 36 }}>✓</span>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: 0, textTransform: "uppercase" }}>
              PROPOSTA PRELIMINAR GERADA!
            </h2>
            <p style={{ color: "#64748b", fontSize: 14.5 }}>
              Estimativa de valor de troca para seu <strong>{lastValuation.brand} {lastValuation.model} ({lastValuation.year})</strong>:
            </p>
            <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "#059669" }}>
              {formatMoney(lastValuation.estimatedValueRange[0])} a {formatMoney(lastValuation.estimatedValueRange[1])}
            </div>
            <p style={{ color: "#64748b", fontSize: 13, maxWidth: 500, margin: "0 auto" }}>
              Nosso avaliador técnico entrará em contato pelo WhatsApp <strong>{lastValuation.userPhone}</strong> para agendar a inspeção física e fechar o negócio.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
              <button type="button" className="m-btn m-btn-primary" onClick={onExploreStock}>
                ESCOLHER MEU PRÓXIMO CARRO ➔
              </button>
              <button type="button" className="m-btn m-btn-secondary" onClick={() => setLastValuation(null)}>
                NOVA AVALIAÇÃO
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: "#ffffff", padding: "clamp(24px, 4vw, 40px)", borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", marginBottom: 20 }}>
              DADOS DO SEU VEÍCULO ATUAL
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tip-brand" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>MARCA</label>
                  <input
                    id="tip-brand"
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tip-model" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>MODELO</label>
                  <input
                    id="tip-model"
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tip-year" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>ANO</label>
                  <input
                    id="tip-year"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tip-mileage" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>KM ATUAL</label>
                  <input
                    id="tip-mileage"
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(Number(e.target.value))}
                    required
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tip-color" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>COR</label>
                  <input
                    id="tip-color"
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tip-version" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>VERSÃO DETALHADA</label>
                  <input
                    id="tip-version"
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    required
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tip-city" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>CIDADE / ESTADO</label>
                  <input
                    id="tip-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 18 }}>
                <h3 style={{ fontSize: 14.5, fontWeight: 800, color: "#0f172a", textTransform: "uppercase", marginBottom: 12 }}>
                  SEUS DADOS DE CONTATO
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                  <div style={{ display: "grid", gap: 6 }}>
                    <label htmlFor="tip-name" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>NOME COMPLETO</label>
                    <input
                      id="tip-name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                    />
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    <label htmlFor="tip-phone" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>WHATSAPP</label>
                    <input
                      id="tip-phone"
                      type="text"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      required
                      style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="m-btn m-btn-primary m-btn-full"
                style={{ marginTop: 8 }}
              >
                CALCULAR VALOR DE TROCA AGORA ➔
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
