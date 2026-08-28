"use client";

import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";

interface FinancingCalculatorProps {
  vehiclePrice?: number;
  onApplyForFinancing?: (simulation: any) => void;
}

export function FinancingCalculator({
  vehiclePrice = 180000,
  onApplyForFinancing,
}: FinancingCalculatorProps) {
  const { calculateFinancing, addToast } = useMotora();

  const [price, setPrice] = useState(vehiclePrice);
  const [downPayment, setDownPayment] = useState(Math.round(vehiclePrice * 0.3));
  const [installments, setInstallments] = useState(48);

  const simulation = calculateFinancing(price, downPayment, installments);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);

  const handleApply = () => {
    addToast(
      "Simulação Salva!",
      `Parcela de ${formatMoney(simulation.monthlyPayment)} em ${installments}x registrada na sua Garagem MOTORA.`,
      "success"
    );
    if (onApplyForFinancing) onApplyForFinancing(simulation);
  };

  return (
    <div style={{ background: "#ffffff", padding: "clamp(20px, 3.5vw, 32px)", borderRadius: 10, border: "1px solid var(--m-light-border)", display: "grid", gap: 20, boxShadow: "var(--m-shadow-subtle)" }}>
      <div>
        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#d97706", textTransform: "uppercase" }}>
          CRÉDITO & PARCELAMENTO
        </span>
        <h3 style={{ fontSize: "clamp(18px, 2.2vw, 22px)", fontWeight: 900, color: "#0f172a", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
          SIMULADOR DE FINANCIAMENTO
        </h3>
        <span style={{ fontSize: 12.5, color: "#64748b", marginTop: 2, display: "block" }}>
          Ajuste o valor de entrada e o número de parcelas para estimar seu plano.
        </span>
      </div>

      {/* INPUTS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
        {/* VALOR DO VEÍCULO */}
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>VALOR DO VEÍCULO</label>
          <input
            type="number"
            value={price}
            onChange={(e) => {
              const val = Number(e.target.value);
              setPrice(val);
              setDownPayment(Math.round(val * 0.3));
            }}
            style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "10px 12px", color: "#0f172a", fontSize: 14, fontWeight: 700, outline: "none" }}
          />
        </div>

        {/* VALOR DA ENTRADA */}
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800, color: "#475569" }}>
            <span>ENTRADA ({Math.round((downPayment / price) * 100)}%)</span>
          </div>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "10px 12px", color: "#0f172a", fontSize: 14, fontWeight: 700, outline: "none" }}
          />
        </div>
      </div>

      {/* PRAZO EM PARCELAS */}
      <div>
        <label style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
          NÚMERO DE PARCELAS:
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
          {[12, 24, 36, 48, 60].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setInstallments(num)}
              style={{
                padding: "10px 4px",
                borderRadius: 4,
                background: installments === num ? "#0f172a" : "#f1f5f9",
                border: installments === num ? "1px solid #0f172a" : "1px solid var(--m-light-border)",
                color: installments === num ? "#ffffff" : "#334155",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {num}x
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS DISPLAY */}
      <div style={{ background: "#f8fafc", padding: 20, borderRadius: 6, border: "1px solid var(--m-light-border)", display: "grid", gap: 10 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
          <div>
            <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>PARCELA ESTIMADA:</span>
            <div style={{ fontSize: "clamp(24px, 2.5vw, 28px)", fontWeight: 900, color: "#0f172a" }}>
              {installments}x de <strong style={{ color: "#d97706" }}>{formatMoney(simulation.monthlyPayment)}</strong>
            </div>
          </div>
          <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>Taxa ilustrativa para simulação</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8, fontSize: 12, color: "#475569", borderTop: "1px solid #e2e8f0", paddingTop: 10 }}>
          <span>Entrada: <strong>{formatMoney(simulation.downPayment)}</strong></span>
          <span>Financiado: <strong>{formatMoney(simulation.vehiclePrice - simulation.downPayment)}</strong></span>
          <span>Total: <strong>{formatMoney(simulation.totalFinanced)}</strong></span>
        </div>
      </div>

      <button
        type="button"
        className="m-btn m-btn-primary m-btn-full"
        onClick={handleApply}
      >
        SALVAR SIMULAÇÃO NA MINHA GARAGEM ➔
      </button>

      <small style={{ fontSize: 11, color: "#64748b", textAlign: "center" }}>
        *Simulação demonstrativa para planejamento de compra. Condições finais sujeitas a aprovação bancária.
      </small>
    </div>
  );
}
