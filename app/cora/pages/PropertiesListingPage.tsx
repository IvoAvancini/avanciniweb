import { useCora } from "../store/useCoraStore";
import { Property, FilterState } from "../types";
import { PropertyGrid } from "../components/PropertyCard";
import { PropertyFiltersSidebar, FilterDrawer } from "../components/PropertyFilters";
import { Breadcrumbs } from "../components/CommonComponents";

interface PropertiesListingPageProps {
  onSelectProperty: (property: Property) => void;
  onNavigateHome: () => void;
}

export function PropertiesListingPage({
  onSelectProperty,
  onNavigateHome,
}: PropertiesListingPageProps) {
  const {
    filteredProperties,
    filters,
    setFilters,
    resetFilters,
    setIsFilterDrawerOpen,
  } = useCora();

  const handleChipClick = <K extends keyof FilterState>(type: K, value: FilterState[K]) => {
    setFilters((p) => ({ ...p, [type]: value }));
  };

  return (
    <div className="cora-plp-view" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="cora-container">
        {/* BREADCRUMBS */}
        <Breadcrumbs
          items={[
            { label: "Início", onClick: onNavigateHome },
            {
              label:
                filters.purpose === "venda"
                  ? "Comprar Imóvel"
                  : filters.purpose === "locacao"
                  ? "Alugar Imóvel"
                  : "Todos os Imóveis",
            },
          ]}
        />

        {/* HEADER DA PLP */}
        <div style={{ margin: "20px 0 32px" }}>
          <span className="cora-eyebrow">Catálogo Imobiliário</span>
          <h1 style={{ fontSize: "clamp(32px, 4.2vw, 56px)", margin: "4px 0 12px" }}>
            Encontre um lugar para chamar de seu.
          </h1>
          <p style={{ color: "var(--cora-muted)", fontSize: "16px", margin: 0 }}>
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}{" "}
            com curadoria exclusiva em São Paulo.
          </p>
        </div>

        {/* BUSCA RÁPIDA & CHIPS */}
        <div
          style={{
            background: "var(--cora-white)",
            padding: "18px 24px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--cora-border)",
            marginBottom: "36px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* SEARCH INPUT */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Buscar bairro, condomínio, rua ou código #CORA..."
              value={filters.searchQuery}
              onChange={(e) => setFilters((p) => ({ ...p, searchQuery: e.target.value }))}
              style={{
                width: "100%",
                height: "48px",
                padding: "0 16px 0 44px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--cora-border)",
                background: "var(--cora-surface)",
                fontSize: "14px",
                fontFamily: "inherit",
                color: "var(--cora-ink)",
                outline: "none",
              }}
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: "absolute", left: "14px", top: "15px", color: "var(--cora-muted)" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* CHIPS RÁPIDOS */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>
              Filtros Rápidos:
            </span>

            <button
              type="button"
              onClick={() => handleChipClick("purpose", filters.purpose === "venda" ? "todos" : "venda")}
              style={{
                padding: "5px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                border: `1px solid ${filters.purpose === "venda" ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: filters.purpose === "venda" ? "var(--cora-accent-soft)" : "transparent",
                color: filters.purpose === "venda" ? "var(--cora-accent)" : "var(--cora-ink)",
                cursor: "pointer",
              }}
            >
              Comprar
            </button>

            <button
              type="button"
              onClick={() => handleChipClick("purpose", filters.purpose === "locacao" ? "todos" : "locacao")}
              style={{
                padding: "5px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                border: `1px solid ${filters.purpose === "locacao" ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: filters.purpose === "locacao" ? "var(--cora-accent-soft)" : "transparent",
                color: filters.purpose === "locacao" ? "var(--cora-accent)" : "var(--cora-ink)",
                cursor: "pointer",
              }}
            >
              Alugar
            </button>

            <button
              type="button"
              onClick={() => handleChipClick("type", filters.type === "apartamento" ? "todos" : "apartamento")}
              style={{
                padding: "5px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                border: `1px solid ${filters.type === "apartamento" ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: filters.type === "apartamento" ? "var(--cora-accent-soft)" : "transparent",
                color: filters.type === "apartamento" ? "var(--cora-accent)" : "var(--cora-ink)",
                cursor: "pointer",
              }}
            >
              Apartamento
            </button>

            <button
              type="button"
              onClick={() => handleChipClick("type", filters.type === "cobertura" ? "todos" : "cobertura")}
              style={{
                padding: "5px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                border: `1px solid ${filters.type === "cobertura" ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: filters.type === "cobertura" ? "var(--cora-accent-soft)" : "transparent",
                color: filters.type === "cobertura" ? "var(--cora-accent)" : "var(--cora-ink)",
                cursor: "pointer",
              }}
            >
              Cobertura
            </button>

            <button
              type="button"
              onClick={() => handleChipClick("bedrooms", filters.bedrooms === 3 ? "todos" : 3)}
              style={{
                padding: "5px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                border: `1px solid ${filters.bedrooms === 3 ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: filters.bedrooms === 3 ? "var(--cora-accent-soft)" : "transparent",
                color: filters.bedrooms === 3 ? "var(--cora-accent)" : "var(--cora-ink)",
                cursor: "pointer",
              }}
            >
              3+ Quartos
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT: SIDEBAR + RESULTS */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "40px", alignItems: "start" }} className="cora-plp-layout">
          {/* SIDEBAR (DESKTOP) */}
          <div className="cora-desktop-filters-wrapper">
            <PropertyFiltersSidebar />
          </div>

          {/* RESULTS AREA */}
          <div>
            {/* TOP BAR ORDENAÇÃO & MOBILE FILTER BUTTON */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
                paddingBottom: "16px",
                borderBottom: "1px solid var(--cora-border)",
              }}
            >
              {/* MOBILE FILTER TRIGGER */}
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(true)}
                className="cora-btn cora-btn-secondary cora-mobile-filter-btn"
                style={{ minHeight: "40px", padding: "0 16px", fontSize: "12.5px", display: "none" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <span>Filtros Avançados</span>
              </button>

              <span style={{ fontSize: "13.5px", color: "var(--cora-muted)", fontWeight: 600 }}>
                Mostrando <b>{filteredProperties.length}</b> imóveis
              </span>

              {/* ORDENAÇÃO */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label htmlFor="plp-sort" style={{ fontSize: "12px", color: "var(--cora-muted)", fontWeight: 700 }}>
                  Ordenar por:
                </label>
                <select
                  id="plp-sort"
                  value={filters.sortBy}
                  onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value as FilterState["sortBy"] }))}
                  style={{
                    height: "38px",
                    padding: "0 10px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--cora-border)",
                    fontSize: "12.5px",
                    background: "var(--cora-white)",
                    color: "var(--cora-ink)",
                    cursor: "pointer",
                  }}
                >
                  <option value="relevantes">Mais Relevantes</option>
                  <option value="menor-preco">Menor Preço</option>
                  <option value="maior-preco">Maior Preço</option>
                  <option value="maior-area">Maior Metragem</option>
                  <option value="recentes">Mais Recentes</option>
                </select>
              </div>
            </div>

            {/* PROPERTIES GRID */}
            <PropertyGrid
              properties={filteredProperties}
              onSelect={onSelectProperty}
              onResetFilters={resetFilters}
            />
          </div>
        </div>
      </div>

      {/* FILTER DRAWER (MOBILE) */}
      <FilterDrawer />
    </div>
  );
}
