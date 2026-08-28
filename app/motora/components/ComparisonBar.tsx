"use client";

import { useMotora } from "../store/useMotoraStore";

interface ComparisonBarProps {
  onGoToCompare: () => void;
}

export function ComparisonBar({ onGoToCompare }: ComparisonBarProps) {
  const { compareList, removeFromCompare, clearCompare, vehicles } = useMotora();

  if (compareList.length === 0) return null;

  return (
    <div className="m-floating-compare-bar">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f59e0b" }}>
          COMPARADOR ({compareList.length}/3)
        </span>
        <div className="m-compare-slots">
          {compareList.map((id) => {
            const veh = vehicles.find((v) => v.id === id);
            return (
              <span key={id} className="m-compare-pill">
                {veh ? `${veh.brand} ${veh.model}` : "Veículo"}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCompare(id);
                  }}
                  style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 11 }}
                  title="Remover"
                >
                  ✕
                </button>
              </span>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          type="button"
          className="m-btn m-btn-primary m-btn-sm"
          onClick={onGoToCompare}
        >
          COMPARAR VEÍCULOS ➔
        </button>
        <button
          type="button"
          onClick={clearCompare}
          style={{ background: "transparent", border: "none", color: "#8e8e98", fontSize: 10.5, textDecoration: "underline", cursor: "pointer" }}
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
