import React, { useState } from "react";
import { useCora } from "../store/useCoraStore";
import { PropertyType } from "../types";

interface SearchBoxProps {
  onSearchSubmit?: () => void;
  className?: string;
}

export function SearchBox({ onSearchSubmit, className = "" }: SearchBoxProps) {
  const { filters, setFilters, neighborhoods } = useCora();
  const [activeTab, setActiveTab] = useState<"venda" | "locacao">(
    filters.purpose === "locacao" ? "locacao" : "venda"
  );

  const handleTabChange = (purpose: "venda" | "locacao") => {
    setActiveTab(purpose);
    setFilters((prev) => ({ ...prev, purpose }));
  };

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFilters((prev) => ({ ...prev, neighborhood: val }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as PropertyType | "todos";
    setFilters((prev) => ({ ...prev, type: val }));
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : "";
    setFilters((prev) => ({ ...prev, priceMax: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <div className={`cora-search-box-card ${className}`}>
      {/* TABS COMPRAR / ALUGAR */}
      <div className="cora-search-tabs">
        <button
          type="button"
          onClick={() => handleTabChange("venda")}
          className={`cora-search-tab-btn ${activeTab === "venda" ? "is-active" : ""}`}
        >
          Comprar Imóvel
        </button>
        <button
          type="button"
          onClick={() => handleTabChange("locacao")}
          className={`cora-search-tab-btn ${activeTab === "locacao" ? "is-active" : ""}`}
        >
          Alugar Imóvel
        </button>
      </div>

      {/* SEARCH FORM */}
      <form onSubmit={handleSubmit} className="cora-search-fields-grid">
        {/* LOCALIZAÇÃO / BAIRRO */}
        <div className="cora-search-field">
          <label htmlFor="search-neighborhood" className="cora-search-label">
            Onde você quer morar?
          </label>
          <select
            id="search-neighborhood"
            value={filters.neighborhood}
            onChange={handleNeighborhoodChange}
            className="cora-search-select"
          >
            <option value="todos">Todos os Bairros Nobres</option>
            {neighborhoods.map((n) => (
              <option key={n.id} value={n.name}>
                {n.name} — {n.city}
              </option>
            ))}
          </select>
        </div>

        {/* TIPO DE IMÓVEL */}
        <div className="cora-search-field">
          <label htmlFor="search-type" className="cora-search-label">
            Tipo de Imóvel
          </label>
          <select
            id="search-type"
            value={filters.type}
            onChange={handleTypeChange}
            className="cora-search-select"
          >
            <option value="todos">Todos os Tipos</option>
            <option value="apartamento">Apartamento</option>
            <option value="cobertura">Cobertura / Penthouse</option>
            <option value="casa">Casa de Vila / Condomínio</option>
            <option value="studio">Studio Design</option>
          </select>
        </div>

        {/* FAIXA DE PREÇO */}
        <div className="cora-search-field">
          <label htmlFor="search-price" className="cora-search-label">
            Preço Máximo
          </label>
          <select
            id="search-price"
            value={filters.priceMax}
            onChange={handlePriceMaxChange}
            className="cora-search-select"
          >
            <option value="">Sem limite</option>
            {activeTab === "venda" ? (
              <>
                <option value="3000000">Até R$ 3.000.000</option>
                <option value="5000000">Até R$ 5.000.000</option>
                <option value="8000000">Até R$ 8.000.000</option>
                <option value="15000000">Até R$ 15.000.000</option>
              </>
            ) : (
              <>
                <option value="6000">Até R$ 6.000/mês</option>
                <option value="10000">Até R$ 10.000/mês</option>
                <option value="20000">Até R$ 20.000/mês</option>
              </>
            )}
          </select>
        </div>

        {/* BOTÃO BUSCAR */}
        <button
          type="submit"
          className="cora-btn cora-btn-primary"
          style={{ height: "48px", alignSelf: "flex-end" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Buscar Imóveis</span>
        </button>
      </form>
    </div>
  );
}

export function SearchOverlay({
  onSelectProperty,
  onNavigate,
}: {
  onSelectProperty: (property: any) => void;
  onNavigate: (view: string, param?: string) => void;
}) {
  const { isSearchOpen, setIsSearchOpen, properties, neighborhoods } = useCora();
  const [query, setQuery] = useState("");

  if (!isSearchOpen) return null;

  const filteredProps = query.trim()
    ? properties.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.neighborhood.toLowerCase().includes(query.toLowerCase()) ||
          p.code.toLowerCase().includes(query.toLowerCase()) ||
          p.address.toLowerCase().includes(query.toLowerCase())
      )
    : properties.slice(0, 5);

  const matchedNeighborhoods = query.trim()
    ? neighborhoods.filter((n) =>
        n.name.toLowerCase().includes(query.toLowerCase())
      )
    : neighborhoods.slice(0, 3);

  return (
    <div className="cora-modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div
        className="cora-modal-card"
        style={{ maxWidth: "680px", padding: "24px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <span className="cora-eyebrow" style={{ margin: 0 }}>
            Busca Global · Pressione ESC para fechar
          </span>
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "var(--cora-muted)" }}
          >
            ✕
          </button>
        </div>

        {/* SEARCH INPUT */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Buscar por bairro, condomínio, rua ou código #CORA..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: "100%",
              height: "54px",
              padding: "0 18px 0 46px",
              fontSize: "15px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--cora-border)",
              background: "var(--cora-surface)",
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
            style={{ position: "absolute", left: "16px", top: "18px", color: "var(--cora-muted)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* BAIRROS SUGERIDOS */}
        {matchedNeighborhoods.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <small style={{ fontSize: "10px", fontWeight: 800, color: "var(--cora-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Bairros
            </small>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
              {matchedNeighborhoods.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    onNavigate("neighborhood-detail", n.slug);
                  }}
                  className="cora-btn cora-btn-secondary"
                  style={{ minHeight: "36px", padding: "0 14px", fontSize: "12px" }}
                >
                  📍 {n.name} ({n.totalProperties} imóveis)
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTADOS DE IMÓVEIS */}
        <div>
          <small style={{ fontSize: "10px", fontWeight: 800, color: "var(--cora-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {query.trim() ? `Imóveis Encontrados (${filteredProps.length})` : "Sugestões de Destaque"}
          </small>

          <div style={{ display: "grid", gap: "10px", marginTop: "8px", maxHeight: "340px", overflowY: "auto" }}>
            {filteredProps.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  onSelectProperty(p);
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "70px 1fr auto",
                  gap: "14px",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--cora-border)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--cora-surface)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <img
                  src={p.images[0]}
                  alt={p.title}
                  style={{ width: "70px", height: "54px", objectFit: "cover", borderRadius: "6px" }}
                />
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ fontSize: "13.5px", fontWeight: 700, margin: 0, color: "var(--cora-ink)" }}>
                    {p.title}
                  </h4>
                  <span style={{ fontSize: "11.5px", color: "var(--cora-muted)" }}>
                    {p.neighborhood} · {p.area} m² · {p.suites} suítes
                  </span>
                </div>
                <strong style={{ fontSize: "13px", color: "var(--cora-accent)" }}>
                  {p.purpose === "venda"
                    ? `R$ ${(p.price / 1000000).toFixed(1)}M`
                    : `R$ ${(p.price / 1000).toFixed(1)}k/mês`}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
