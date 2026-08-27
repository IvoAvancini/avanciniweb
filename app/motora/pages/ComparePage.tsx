"use client";

import { useMotora } from "../store/useMotoraStore";
import { Vehicle } from "../types";

interface ComparePageProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
  onExploreStock: () => void;
}

export function ComparePage({ onSelectVehicle, onExploreStock }: ComparePageProps) {
  const { compareList, removeFromCompare, clearCompare, vehicles, openLeadModal } = useMotora();

  const comparedVehicles = vehicles.filter((v) => compareList.includes(v.id));

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);

  if (comparedVehicles.length === 0) {
    return (
      <div style={{ padding: "clamp(80px, 12vw, 140px) var(--m-gutter)", textAlign: "center", minHeight: "65vh", background: "var(--m-light-bg)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#64748b", textTransform: "uppercase" }}>
            COMPARADOR TÉCNICO
          </span>
          <h1 style={{ fontSize: "clamp(24px, 3.2vw, 38px)", fontWeight: 900, color: "#0f172a", margin: "10px 0 14px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            NENHUM VEÍCULO SELECIONADO.
          </h1>
          <p style={{ color: "#64748b", maxWidth: 460, margin: "0 auto 28px", fontSize: 14.5, lineHeight: 1.6 }}>
            Navegue pelo estoque e clique no ícone ⇄ de até 3 veículos para comparar lado a lado motor, equipamentos e preço.
          </p>
          <button
            type="button"
            className="m-btn m-btn-primary"
            onClick={onExploreStock}
          >
            EXPLORAR ESTOQUE MOTORA ➔
          </button>
        </div>
      </div>
    );
  }

  const specRows = [
    { label: "Preço à Vista", key: "price", format: (v: Vehicle) => formatMoney(v.price) },
    { label: "Ano / Modelo", key: "year", format: (v: Vehicle) => v.year },
    { label: "Quilometragem", key: "mileage", format: (v: Vehicle) => v.isNew ? "0 km (Novo)" : `${v.mileage.toLocaleString("pt-BR")} km` },
    { label: "Motorização", key: "engine", format: (v: Vehicle) => v.engine },
    { label: "Potência", key: "power", format: (v: Vehicle) => v.power },
    { label: "Transmissão", key: "transmission", format: (v: Vehicle) => v.transmission },
    { label: "Combustível", key: "fuel", format: (v: Vehicle) => v.fuel },
    { label: "Carroceria", key: "bodyTypeLabel", format: (v: Vehicle) => v.bodyTypeLabel },
    { label: "Cor Externa", key: "color", format: (v: Vehicle) => v.color },
    { label: "Final de Placa", key: "plateEnd", format: (v: Vehicle) => v.plateEnd },
    { label: "Localização", key: "location", format: (v: Vehicle) => v.location },
  ];

  return (
    <div style={{ padding: "clamp(32px, 4vw, 50px) var(--m-gutter) 100px", background: "var(--m-light-bg)" }}>
      <div className="motora-container" style={{ padding: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 28, borderBottom: "1px solid var(--m-light-border)", paddingBottom: 18 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#d97706", textTransform: "uppercase" }}>
              COMPARAÇÃO TÉCNICA
            </span>
            <h1 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "4px 0 0", letterSpacing: "-0.03em" }}>
              COMPARADOR MOTORA ({comparedVehicles.length}/3)
            </h1>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" className="m-btn m-btn-secondary m-btn-sm" onClick={clearCompare}>
              LIMPAR
            </button>
            <button type="button" className="m-btn m-btn-primary m-btn-sm" onClick={onExploreStock}>
              ADICIONAR VEÍCULO
            </button>
          </div>
        </div>

        {/* RESPONSIVE COMPARISON TABLE CONTAINER */}
        <div style={{ background: "#ffffff", borderRadius: 10, border: "1px solid var(--m-light-border)", overflowX: "auto", WebkitOverflowScrolling: "touch", boxShadow: "var(--m-shadow-subtle)" }}>
          <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr>
                <th style={{ padding: "20px", width: "180px", color: "#64748b", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", background: "#f8fafc" }}>
                  ESPECIFICAÇÕES
                </th>
                {comparedVehicles.map((v) => (
                  <th key={v.id} style={{ padding: "20px", minWidth: "240px", verticalAlign: "top", borderLeft: "1px solid var(--m-light-border)" }}>
                    <div style={{ display: "grid", gap: 10 }}>
                      <div style={{ position: "relative", borderRadius: 6, overflow: "hidden" }}>
                        <img src={v.images[0]} alt={v.model} style={{ width: "100%", height: 140, objectFit: "cover" }} />
                        <button
                          type="button"
                          onClick={() => removeFromCompare(v.id)}
                          style={{ position: "absolute", top: 8, right: 8, background: "rgba(15,23,42,0.8)", color: "#fff", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer" }}
                          title="Remover"
                        >
                          ✕
                        </button>
                      </div>

                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 900, color: "#0f172a", margin: 0 }}>{v.brand} {v.model}</h3>
                        <span style={{ fontSize: 12, color: "#64748b" }}>{v.version}</span>
                        <div style={{ fontSize: 18, fontWeight: 900, color: "#d97706", marginTop: 4 }}>
                          {formatMoney(v.price)}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="m-btn m-btn-primary m-btn-sm m-btn-full"
                        onClick={() => openLeadModal(v)}
                      >
                        TENHO INTERESSE ➔
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {specRows.map((row, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? "#f8fafc" : "#ffffff", borderTop: "1px solid var(--m-light-border)" }}>
                  <td style={{ padding: "14px 20px", fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>
                    {row.label}
                  </td>
                  {comparedVehicles.map((v) => (
                    <td key={v.id} style={{ padding: "14px 20px", fontSize: 13, color: "#0f172a", fontWeight: 600, borderLeft: "1px solid var(--m-light-border)" }}>
                      {row.format(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
