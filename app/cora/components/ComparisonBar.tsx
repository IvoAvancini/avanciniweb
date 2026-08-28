import React from "react";
import { useCora } from "../store/useCoraStore";

interface ComparisonBarProps {
  onGoToCompare: () => void;
}

export function ComparisonBar({ onGoToCompare }: ComparisonBarProps) {
  const { compareList, properties, removeFromCompare, clearCompare } = useCora();

  if (compareList.length === 0) return null;

  const comparedProperties = properties.filter((p) => compareList.includes(p.id));

  return (
    <div className="cora-comparison-dock" role="region" aria-label="Barra de comparação de imóveis">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--cora-stone)" }}>
          Comparador ({compareList.length}/3)
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {comparedProperties.map((p) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 8px",
                background: "rgba(255, 255, 255, 0.12)",
                borderRadius: "var(--radius-sm)",
                fontSize: "12px",
              }}
            >
              <img
                src={p.images[0]}
                alt={p.title}
                style={{ width: "24px", height: "24px", borderRadius: "4px", objectFit: "cover" }}
              />
              <span style={{ maxWidth: "110px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {p.title}
              </span>
              <button
                type="button"
                onClick={() => removeFromCompare(p.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  cursor: "pointer",
                  padding: "0 2px",
                  fontSize: "12px",
                }}
                aria-label={`Remover ${p.title} da comparação`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          type="button"
          onClick={clearCompare}
          style={{
            background: "none",
            border: "none",
            color: "var(--cora-muted-light)",
            fontSize: "11.5px",
            cursor: "pointer",
            padding: "4px 8px",
          }}
        >
          Limpar
        </button>

        <button
          type="button"
          onClick={onGoToCompare}
          className="cora-btn cora-btn-primary"
          style={{ minHeight: "36px", padding: "0 16px", fontSize: "12px" }}
        >
          Comparar Imóveis ({compareList.length})
        </button>
      </div>
    </div>
  );
}
