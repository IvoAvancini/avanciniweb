"use client";

import { useMemo, useState } from "react";
import { useMotora } from "../store/useMotoraStore";
import { Vehicle, VehicleBodyType, VehicleCondition, VehicleFuel, VehicleTransmission, SortVehicleOption } from "../types";
import { VehicleGrid } from "../components/VehicleGrid";

interface VehiclesListingPageProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
  onNavigateHome: () => void;
}

export function VehiclesListingPage({ onSelectVehicle, onNavigateHome }: VehiclesListingPageProps) {
  const { vehicles, filters, setFilters, sortOption, setSortOption, resetFilters } = useMotora();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.searchQuery || "");

  const brands = ["all", ...Array.from(new Set(vehicles.map((v) => v.brand)))];

  const bodyTypes: { id: VehicleBodyType | "all"; label: string }[] = [
    { id: "all", label: "Todas as Carrocerias" },
    { id: "suv", label: "SUVs & Crossovers" },
    { id: "sedan", label: "Sedans Executivos" },
    { id: "hatch", label: "Hatches" },
    { id: "picape", label: "Picapes & 4x4" },
    { id: "eletrico", label: "100% Elétricos" },
    { id: "esportivo", label: "Superesportivos" },
  ];

  const conditions: { id: VehicleCondition | "all"; label: string }[] = [
    { id: "all", label: "Todos os Estados" },
    { id: "novo", label: "0km Novos" },
    { id: "seminovo", label: "Seminovos Certificados" },
  ];

  const transmissions: { id: VehicleTransmission | "all"; label: string }[] = [
    { id: "all", label: "Todos os Câmbios" },
    { id: "Automático", label: "Automático" },
    { id: "CVT", label: "CVT" },
    { id: "Dupla Embreagem", label: "Dupla Embreagem" },
    { id: "Manual", label: "Manual" },
  ];

  const fuels: { id: VehicleFuel | "all"; label: string }[] = [
    { id: "all", label: "Todos os Combustíveis" },
    { id: "Flex", label: "Flex" },
    { id: "Gasolina", label: "Gasolina" },
    { id: "Diesel", label: "Diesel" },
    { id: "Híbrido", label: "Híbrido" },
    { id: "Elétrico", label: "Elétrico" },
  ];

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        if (filters.brand !== "all" && v.brand !== filters.brand) return false;
        if (filters.bodyType !== "all" && v.bodyType !== filters.bodyType) return false;
        if (filters.condition !== "all") {
          if (filters.condition === "novo" && !v.isNew) return false;
          if (filters.condition === "seminovo" && v.isNew) return false;
        }
        if (filters.transmission !== "all" && v.transmission !== filters.transmission) return false;
        if (filters.fuel !== "all" && v.fuel !== filters.fuel) return false;
        if (filters.onlyOffers && !v.isOffer) return false;
        if (v.price < filters.priceRange[0] || v.price > filters.priceRange[1]) return false;
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          const matches =
            v.brand.toLowerCase().includes(q) ||
            v.model.toLowerCase().includes(q) ||
            v.version.toLowerCase().includes(q) ||
            v.bodyTypeLabel.toLowerCase().includes(q);
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "price_asc") return a.price - b.price;
        if (sortOption === "price_desc") return b.price - a.price;
        if (sortOption === "mileage_asc") return a.mileage - b.mileage;
        if (sortOption === "year_desc") return b.year.localeCompare(a.year);
        return 0;
      });
  }, [vehicles, filters, sortOption]);

  const activeChipsCount =
    (filters.brand !== "all" ? 1 : 0) +
    (filters.bodyType !== "all" ? 1 : 0) +
    (filters.condition !== "all" ? 1 : 0) +
    (filters.transmission !== "all" ? 1 : 0) +
    (filters.fuel !== "all" ? 1 : 0) +
    (filters.onlyOffers ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((p) => ({ ...p, searchQuery: localSearch }));
  };

  const renderFiltersContent = () => (
    <div style={{ display: "grid", gap: 20 }}>
      {/* 1. MARCA */}
      <div>
        <h4 style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.08em", color: "#475569", textTransform: "uppercase", marginBottom: 10 }}>
          Marca do Veículo
        </h4>
        <div style={{ display: "grid", gap: 6, maxHeight: 180, overflowY: "auto", paddingRight: 4 }}>
          {brands.map((b) => (
            <label
              key={b}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: filters.brand === b ? "#0f172a" : "#64748b",
                fontWeight: filters.brand === b ? 700 : 500,
                cursor: "pointer",
                padding: "2px 0",
              }}
            >
              <input
                type="radio"
                name="brand-filter"
                checked={filters.brand === b}
                onChange={() => setFilters((p) => ({ ...p, brand: b }))}
              />
              <span>{b === "all" ? "Todas as Marcas" : b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. CARROCERIA */}
      <div style={{ borderTop: "1px solid var(--m-light-border)", paddingTop: 16 }}>
        <h4 style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.08em", color: "#475569", textTransform: "uppercase", marginBottom: 10 }}>
          Carroceria
        </h4>
        <div style={{ display: "grid", gap: 6 }}>
          {bodyTypes.map((c) => (
            <label
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: filters.bodyType === c.id ? "#0f172a" : "#64748b",
                fontWeight: filters.bodyType === c.id ? 700 : 500,
                cursor: "pointer",
                padding: "2px 0",
              }}
            >
              <input
                type="radio"
                name="body-filter"
                checked={filters.bodyType === c.id}
                onChange={() => setFilters((p) => ({ ...p, bodyType: c.id }))}
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. ESTADO (0KM / SEMINOVO) */}
      <div style={{ borderTop: "1px solid var(--m-light-border)", paddingTop: 16 }}>
        <h4 style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.08em", color: "#475569", textTransform: "uppercase", marginBottom: 10 }}>
          Condição
        </h4>
        <div style={{ display: "grid", gap: 6 }}>
          {conditions.map((c) => (
            <label
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: filters.condition === c.id ? "#0f172a" : "#64748b",
                fontWeight: filters.condition === c.id ? 700 : 500,
                cursor: "pointer",
                padding: "2px 0",
              }}
            >
              <input
                type="radio"
                name="cond-filter"
                checked={filters.condition === c.id}
                onChange={() => setFilters((p) => ({ ...p, condition: c.id }))}
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. CÂMBIO */}
      <div style={{ borderTop: "1px solid var(--m-light-border)", paddingTop: 16 }}>
        <h4 style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.08em", color: "#475569", textTransform: "uppercase", marginBottom: 10 }}>
          Câmbio
        </h4>
        <div style={{ display: "grid", gap: 6 }}>
          {transmissions.map((t) => (
            <label
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: filters.transmission === t.id ? "#0f172a" : "#64748b",
                fontWeight: filters.transmission === t.id ? 700 : 500,
                cursor: "pointer",
                padding: "2px 0",
              }}
            >
              <input
                type="radio"
                name="trans-filter"
                checked={filters.transmission === t.id}
                onChange={() => setFilters((p) => ({ ...p, transmission: t.id }))}
              />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 5. COMBUSTÍVEL */}
      <div style={{ borderTop: "1px solid var(--m-light-border)", paddingTop: 16 }}>
        <h4 style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.08em", color: "#475569", textTransform: "uppercase", marginBottom: 10 }}>
          Combustível
        </h4>
        <div style={{ display: "grid", gap: 6 }}>
          {fuels.map((f) => (
            <label
              key={f.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: filters.fuel === f.id ? "#0f172a" : "#64748b",
                fontWeight: filters.fuel === f.id ? 700 : 500,
                cursor: "pointer",
                padding: "2px 0",
              }}
            >
              <input
                type="radio"
                name="fuel-filter"
                checked={filters.fuel === f.id}
                onChange={() => setFilters((p) => ({ ...p, fuel: f.id }))}
              />
              <span>{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 6. APENAS OFERTAS */}
      <div style={{ borderTop: "1px solid var(--m-light-border)", paddingTop: 16 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#0f172a", fontWeight: 700, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={filters.onlyOffers}
            onChange={(e) => setFilters((p) => ({ ...p, onlyOffers: e.target.checked }))}
          />
          <span>Apenas Ofertas do Mês</span>
        </label>
      </div>

      {/* RESET */}
      {activeChipsCount > 0 && (
        <button
          type="button"
          className="m-btn m-btn-secondary m-btn-sm m-btn-full"
          onClick={resetFilters}
          style={{ marginTop: 8 }}
        >
          LIMPAR TODOS OS FILTROS
        </button>
      )}
    </div>
  );

  return (
    <div style={{ padding: "clamp(24px, 3.5vw, 40px) var(--m-gutter) 100px", background: "var(--m-light-bg)" }}>
      <div className="motora-container" style={{ padding: 0 }}>
        {/* BREADCRUMB */}
        <div style={{ display: "flex", gap: 8, fontSize: 11.5, color: "#64748b", marginBottom: 16, textTransform: "uppercase", fontWeight: 700 }}>
          <button
            type="button"
            onClick={onNavigateHome}
            style={{ background: "transparent", border: "none", color: "#334155", cursor: "pointer", padding: 0 }}
          >
            Início
          </button>
          <span>/</span>
          <span style={{ color: "#0f172a" }}>Comprar Veículos</span>
        </div>

        {/* HEADER & COMMERCIAL SEARCH OVERLAY */}
        <div style={{ background: "#ffffff", padding: "24px 28px", borderRadius: "var(--m-radius-md)", border: "1px solid var(--m-light-border)", marginBottom: 28, boxShadow: "var(--m-shadow-subtle)" }}>
          {/* TITLE & COUNT */}
          <div style={{ marginBottom: 16 }}>
            <h1 style={{ fontSize: "clamp(24px, 2.8vw, 34px)", fontWeight: 900, color: "#0f172a", margin: 0, textTransform: "uppercase", letterSpacing: "-0.03em" }}>
              ESTOQUE MOTORA
            </h1>
            <span style={{ fontSize: 13.5, color: "#64748b", fontWeight: 600, marginTop: 3, display: "block" }}>
              Encontre o veículo ideal para você · {filteredVehicles.length} {filteredVehicles.length === 1 ? "veículo disponível" : "veículos disponíveis"}
            </span>
          </div>

          {/* LARGE SEARCH BAR */}
          <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 10, width: "100%", marginBottom: 16 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "#94a3b8" }}>
                🔎
              </span>
              <input
                type="text"
                placeholder="Buscar marca, modelo ou versão..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{
                  width: "100%",
                  background: "#f8fafc",
                  border: "1px solid var(--m-light-border)",
                  borderRadius: "var(--m-radius-sm)",
                  padding: "12px 14px 12px 42px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#0f172a",
                  outline: "none",
                }}
              />
            </div>
            <button type="submit" className="m-btn m-btn-primary" style={{ minWidth: 120 }}>
              BUSCAR
            </button>
          </form>

          {/* CONTROLS & QUICK PILLS BAR */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
            {/* QUICK PILLS */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, overflowX: "auto", paddingBottom: 4, flex: 1, WebkitOverflowScrolling: "touch" }}>
              {/* FILTER TRIGGER (Always accessible) */}
              <button
                type="button"
                className="m-btn m-btn-secondary m-btn-sm"
                onClick={() => setIsFilterDrawerOpen(true)}
                style={{ display: "inline-flex", gap: 6 }}
              >
                <span>FILTROS</span>
                {activeChipsCount > 0 && <span>({activeChipsCount})</span>}
              </button>

              <button
                type="button"
                className={`m-quick-filter-pill ${filters.condition === "novo" ? "is-active" : ""}`}
                onClick={() => setFilters((p) => ({ ...p, condition: p.condition === "novo" ? "all" : "novo" }))}
              >
                0km Novos
              </button>

              <button
                type="button"
                className={`m-quick-filter-pill ${filters.condition === "seminovo" ? "is-active" : ""}`}
                onClick={() => setFilters((p) => ({ ...p, condition: p.condition === "seminovo" ? "all" : "seminovo" }))}
              >
                Seminovos
              </button>

              <button
                type="button"
                className={`m-quick-filter-pill ${filters.bodyType === "suv" ? "is-active" : ""}`}
                onClick={() => setFilters((p) => ({ ...p, bodyType: p.bodyType === "suv" ? "all" : "suv" }))}
              >
                SUVs
              </button>

              <button
                type="button"
                className={`m-quick-filter-pill ${filters.bodyType === "sedan" ? "is-active" : ""}`}
                onClick={() => setFilters((p) => ({ ...p, bodyType: p.bodyType === "sedan" ? "all" : "sedan" }))}
              >
                Sedans
              </button>

              <button
                type="button"
                className={`m-quick-filter-pill ${filters.onlyOffers ? "is-active" : ""}`}
                onClick={() => setFilters((p) => ({ ...p, onlyOffers: !p.onlyOffers }))}
              >
                Ofertas Especiais
              </button>

              {activeChipsCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{ background: "transparent", border: "none", color: "#d97706", fontSize: 11.5, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  Limpar Todos
                </button>
              )}
            </div>

            {/* SORT SELECTOR */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label htmlFor="stock-sort" style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>
                ORDENAR:
              </label>
              <select
                id="stock-sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortVehicleOption)}
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--m-light-border)",
                  color: "#0f172a",
                  padding: "8px 12px",
                  borderRadius: "var(--m-radius-sm)",
                  fontSize: 12,
                  fontWeight: 700,
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="relevance">Mais relevantes</option>
                <option value="price_asc">Menor preço</option>
                <option value="price_desc">Maior preço</option>
                <option value="year_desc">Mais novos</option>
                <option value="mileage_asc">Menor km</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN STOCK LAYOUT */}
        <div className="m-stock-layout">
          {/* SIDEBAR DOCKED IN WIDE DESKTOPS */}
          <aside className="m-stock-sidebar">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid var(--m-light-border)" }}>
              <strong style={{ fontSize: 13, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                FILTRAR VEÍCULOS
              </strong>
              {activeChipsCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{ background: "transparent", border: "none", color: "#d97706", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                >
                  Limpar
                </button>
              )}
            </div>
            {renderFiltersContent()}
          </aside>

          {/* GRID DE CARROS (MAX 3 CARDS DE 340-380px POR LINHA) */}
          <div style={{ width: "100%" }}>
            <VehicleGrid
              vehicles={filteredVehicles}
              onSelectVehicle={onSelectVehicle}
              columns={3}
            />
          </div>
        </div>
      </div>

      {/* FILTER DRAWER / MODAL FOR LAPTOP & MOBILE */}
      {isFilterDrawerOpen && (
        <div className="m-modal-overlay" role="presentation" onClick={() => setIsFilterDrawerOpen(false)}>
          <div className="m-modal-card" role="presentation" style={{ background: "#ffffff", color: "#0f172a" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, borderBottom: "1px solid #e2e8f0", paddingBottom: 12 }}>
              <strong style={{ fontSize: 16, color: "#0f172a", textTransform: "uppercase" }}>
                FILTRAR ESTOQUE
              </strong>
              <button
                type="button"
                className="m-icon-btn"
                onClick={() => setIsFilterDrawerOpen(false)}
                style={{ color: "#0f172a" }}
              >
                ✕
              </button>
            </div>

            {renderFiltersContent()}

            <div style={{ marginTop: 24, borderTop: "1px solid #e2e8f0", paddingTop: 16 }}>
              <button
                type="button"
                className="m-btn m-btn-primary m-btn-full"
                onClick={() => setIsFilterDrawerOpen(false)}
              >
                VER {filteredVehicles.length} VEÍCULOS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
