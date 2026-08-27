import React from "react";
import { useCora } from "../store/useCoraStore";
import { PropertyType, PropertyPurpose } from "../types";

export function PropertyFiltersSidebar() {
  const { filters, setFilters, resetFilters, neighborhoods } = useCora();

  const handlePurposeChange = (purpose: PropertyPurpose | "todos") => {
    setFilters((p) => ({ ...p, purpose }));
  };

  const handleTypeChange = (type: PropertyType | "todos") => {
    setFilters((p) => ({ ...p, type }));
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    setFilters((p) => ({ ...p, neighborhood }));
  };

  const handleFeatureToggle = (feat: string) => {
    setFilters((p) => {
      const exists = p.features.includes(feat);
      return {
        ...p,
        features: exists
          ? p.features.filter((f) => f !== feat)
          : [...p.features, feat],
      };
    });
  };

  return (
    <aside
      className="cora-filters-sidebar"
      style={{
        background: "var(--cora-white)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--cora-border)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        height: "fit-content",
        position: "sticky",
        top: "100px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
          Filtros de Busca
        </h3>
        <button
          type="button"
          onClick={resetFilters}
          style={{
            background: "none",
            border: "none",
            color: "var(--cora-accent)",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Limpar
        </button>
      </div>

      {/* FINALIDADE */}
      <div>
        <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)", display: "block", marginBottom: "8px" }}>
          Finalidade
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
          {[
            { id: "todos", label: "Todos" },
            { id: "venda", label: "Comprar" },
            { id: "locacao", label: "Alugar" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handlePurposeChange(item.id as any)}
              style={{
                padding: "8px 0",
                fontSize: "12px",
                fontWeight: 700,
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${filters.purpose === item.id ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: filters.purpose === item.id ? "var(--cora-accent-soft)" : "var(--cora-surface)",
                color: filters.purpose === item.id ? "var(--cora-accent)" : "var(--cora-ink)",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* TIPO DE IMÓVEL */}
      <div>
        <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)", display: "block", marginBottom: "8px" }}>
          Tipo de Imóvel
        </span>
        <select
          value={filters.type}
          onChange={(e) => handleTypeChange(e.target.value as any)}
          style={{
            width: "100%",
            height: "42px",
            padding: "0 12px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--cora-border)",
            fontSize: "13px",
            background: "var(--cora-surface)",
            color: "var(--cora-ink)",
          }}
        >
          <option value="todos">Todos os Tipos</option>
          <option value="apartamento">Apartamento</option>
          <option value="cobertura">Cobertura / Penthouse</option>
          <option value="casa">Casa de Vila / Condomínio</option>
          <option value="studio">Studio Design</option>
        </select>
      </div>

      {/* BAIRRO */}
      <div>
        <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)", display: "block", marginBottom: "8px" }}>
          Localização
        </span>
        <select
          value={filters.neighborhood}
          onChange={(e) => handleNeighborhoodChange(e.target.value)}
          style={{
            width: "100%",
            height: "42px",
            padding: "0 12px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--cora-border)",
            fontSize: "13px",
            background: "var(--cora-surface)",
            color: "var(--cora-ink)",
          }}
        >
          <option value="todos">Todos os Bairros</option>
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.name}>
              {n.name}
            </option>
          ))}
        </select>
      </div>

      {/* QUARTOS */}
      <div>
        <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)", display: "block", marginBottom: "8px" }}>
          Dormitórios
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {["todos", "1", "2", "3", "4"].map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setFilters((p) => ({ ...p, bedrooms: q === "todos" ? "todos" : Number(q) }))}
              style={{
                flex: 1,
                padding: "8px 0",
                fontSize: "12px",
                fontWeight: 700,
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${filters.bedrooms === (q === "todos" ? "todos" : Number(q)) ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: filters.bedrooms === (q === "todos" ? "todos" : Number(q)) ? "var(--cora-accent-soft)" : "var(--cora-surface)",
                color: filters.bedrooms === (q === "todos" ? "todos" : Number(q)) ? "var(--cora-accent)" : "var(--cora-ink)",
                cursor: "pointer",
              }}
            >
              {q === "todos" ? "Todos" : `${q}+`}
            </button>
          ))}
        </div>
      </div>

      {/* SUÍTES */}
      <div>
        <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)", display: "block", marginBottom: "8px" }}>
          Suítes Mínimas
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {["todos", "1", "2", "3", "4"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilters((p) => ({ ...p, suites: s === "todos" ? "todos" : Number(s) }))}
              style={{
                flex: 1,
                padding: "8px 0",
                fontSize: "12px",
                fontWeight: 700,
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${filters.suites === (s === "todos" ? "todos" : Number(s)) ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: filters.suites === (s === "todos" ? "todos" : Number(s)) ? "var(--cora-accent-soft)" : "var(--cora-surface)",
                color: filters.suites === (s === "todos" ? "todos" : Number(s)) ? "var(--cora-accent)" : "var(--cora-ink)",
                cursor: "pointer",
              }}
            >
              {s === "todos" ? "Todos" : `${s}+`}
            </button>
          ))}
        </div>
      </div>

      {/* VAGAS */}
      <div>
        <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)", display: "block", marginBottom: "8px" }}>
          Vagas de Garagem
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {["todos", "1", "2", "3", "4"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setFilters((p) => ({ ...p, parkingSpaces: v === "todos" ? "todos" : Number(v) }))}
              style={{
                flex: 1,
                padding: "8px 0",
                fontSize: "12px",
                fontWeight: 700,
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${filters.parkingSpaces === (v === "todos" ? "todos" : Number(v)) ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: filters.parkingSpaces === (v === "todos" ? "todos" : Number(v)) ? "var(--cora-accent-soft)" : "var(--cora-surface)",
                color: filters.parkingSpaces === (v === "todos" ? "todos" : Number(v)) ? "var(--cora-accent)" : "var(--cora-ink)",
                cursor: "pointer",
              }}
            >
              {v === "todos" ? "Todos" : `${v}+`}
            </button>
          ))}
        </div>
      </div>

      {/* CARACTERÍSTICAS */}
      <div>
        <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)", display: "block", marginBottom: "10px" }}>
          Diferenciais & Comodidades
        </span>
        <div style={{ display: "grid", gap: "8px" }}>
          {[
            "Varanda",
            "Piscina",
            "Ar-condicionado",
            "Elevador",
            "Mobiliado",
            "Academia",
            "Adega",
          ].map((feat) => {
            const checked = filters.features.includes(feat);
            return (
              <label
                key={feat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  color: "var(--cora-ink)",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleFeatureToggle(feat)}
                  style={{ accentColor: "var(--cora-accent)", width: "16px", height: "16px" }}
                />
                <span>{feat}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export function FilterDrawer() {
  const { isFilterDrawerOpen, setIsFilterDrawerOpen } = useCora();

  if (!isFilterDrawerOpen) return null;

  return (
    <div className="cora-modal-overlay" onClick={() => setIsFilterDrawerOpen(false)}>
      <div
        className="cora-modal-card"
        style={{ maxWidth: "480px", padding: "24px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 800 }}>Filtros</h3>
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(false)}
            style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        <PropertyFiltersSidebar />

        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--cora-border)" }}>
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(false)}
            className="cora-btn cora-btn-primary"
            style={{ width: "100%" }}
          >
            Ver Resultados
          </button>
        </div>
      </div>
    </div>
  );
}
