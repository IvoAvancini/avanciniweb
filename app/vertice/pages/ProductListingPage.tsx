"use client";

import { useMemo } from "react";
import { useVertice } from "../store/useVerticeStore";
import { Product, ProductCategory, ProductGender, ProductSport, SortOption } from "../types";
import { ProductGrid } from "../components/ProductGrid";

interface ProductListingPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
}

export function ProductListingPage({ onSelectProduct, onNavigateHome }: ProductListingPageProps) {
  const { products, filters, setFilters, sortOption, setSortOption, resetFilters } = useVertice();

  const categories: { id: ProductCategory | "all"; label: string }[] = [
    { id: "all", label: "Todas as Categorias" },
    { id: "tenis", label: "Calçados & Running" },
    { id: "camisetas", label: "Camisetas & Tops" },
    { id: "moletons", label: "Moletons & Tech Fleece" },
    { id: "jaquetas", label: "Jaquetas & Corta-Vento" },
    { id: "calcas", label: "Calças & Joggers" },
    { id: "shorts", label: "Shorts & Bermudas" },
    { id: "acessorios", label: "Acessórios & Bags" },
  ];

  const genders: { id: ProductGender | "all"; label: string }[] = [
    { id: "all", label: "Todos os Gêneros" },
    { id: "masculino", label: "Masculino" },
    { id: "feminino", label: "Feminino" },
    { id: "unissex", label: "Unissex" },
    { id: "infantil", label: "Infantil" },
  ];

  const sports: { id: ProductSport | "all"; label: string }[] = [
    { id: "all", label: "Todos os Esportes" },
    { id: "corrida", label: "Corrida" },
    { id: "academia", label: "Academia & Treino" },
    { id: "streetwear", label: "Streetwear" },
    { id: "lifestyle", label: "Lifestyle" },
  ];

  const allSizes = ["PP", "P", "M", "G", "GG", "38", "39", "40", "41", "42", "43", "44", "Único"];

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (filters.category !== "all" && p.category !== filters.category) return false;
        if (filters.gender !== "all" && p.gender !== filters.gender && p.gender !== "unissex") return false;
        if (filters.sport !== "all" && p.sport !== filters.sport) return false;
        if (filters.collection !== "all" && p.collection !== filters.collection) return false;
        if (filters.sizes.length > 0 && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
        if (filters.onlyOffers && !p.discount && !p.oldPrice) return false;
        if (filters.onlyNew && !p.isNew && p.badge !== "NOVO") return false;
        if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
        if (filters.rating && p.rating < filters.rating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortOption === "price_asc") return a.price - b.price;
        if (sortOption === "price_desc") return b.price - a.price;
        if (sortOption === "rating") return b.rating - a.rating;
        if (sortOption === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortOption === "best_sellers") return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
        return 0;
      });
  }, [products, filters, sortOption]);

  const activeChipsCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.gender !== "all" ? 1 : 0) +
    (filters.sport !== "all" ? 1 : 0) +
    (filters.collection !== "all" ? 1 : 0) +
    filters.sizes.length +
    (filters.onlyOffers ? 1 : 0) +
    (filters.onlyNew ? 1 : 0);

  const toggleSize = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  return (
    <div style={{ padding: "40px 6vw 100px" }}>
      {/* BREADCRUMB */}
      <div style={{ display: "flex", gap: 8, fontSize: 11, color: "#71717a", marginBottom: 24, textTransform: "uppercase", fontWeight: 700 }}>
        <button
          type="button"
          onClick={onNavigateHome}
          style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}
        >
          Início
        </button>
        <span>/</span>
        <span style={{ color: "#ffffff" }}>Produtos & Coleções</span>
      </div>

      {/* HEADER: TITLE + SORT + COUNTS */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 36, paddingBottom: 24, borderBottom: "1px solid var(--v-border-subtle)" }}>
        <div>
          <h1 style={{ fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 900, color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            CATÁLOGO VÉRTICE
          </h1>
          <span style={{ fontSize: 12, color: "#8e8e93", fontWeight: 700, marginTop: 4, display: "block" }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto disponível" : "produtos disponíveis"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* SORT SELECTOR */}
          <label htmlFor="vertice-sort" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            ORDENAR POR:
          </label>
          <select
            id="vertice-sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            style={{
              background: "#0c0c10",
              border: "1px solid var(--v-border-medium)",
              color: "#ffffff",
              padding: "9px 14px",
              borderRadius: 2,
              fontSize: 11.5,
              fontWeight: 700,
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="relevance">Relevância</option>
            <option value="best_sellers">Mais Vendidos</option>
            <option value="newest">Lançamentos</option>
            <option value="price_asc">Menor Preço</option>
            <option value="price_desc">Maior Preço</option>
            <option value="rating">Melhor Avaliação</option>
          </select>
        </div>
      </div>

      {/* ACTIVE FILTER CHIPS */}
      {activeChipsCount > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 28 }}>
          <span style={{ fontSize: 10, fontWeight: 900, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            FILTROS ATIVOS:
          </span>
          {filters.category !== "all" && (
            <span
              className="v-search-tag-chip"
              onClick={() => setFilters((prev) => ({ ...prev, category: "all" }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setFilters((prev) => ({ ...prev, category: "all" }));
              }}
            >
              Categoria: {filters.category} ✕
            </span>
          )}
          {filters.gender !== "all" && (
            <span
              className="v-search-tag-chip"
              onClick={() => setFilters((prev) => ({ ...prev, gender: "all" }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setFilters((prev) => ({ ...prev, gender: "all" }));
              }}
            >
              Gênero: {filters.gender} ✕
            </span>
          )}
          {filters.sport !== "all" && (
            <span
              className="v-search-tag-chip"
              onClick={() => setFilters((prev) => ({ ...prev, sport: "all" }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setFilters((prev) => ({ ...prev, sport: "all" }));
              }}
            >
              Esporte: {filters.sport} ✕
            </span>
          )}
          {filters.sizes.map((size) => (
            <span
              key={size}
              className="v-search-tag-chip"
              onClick={() => toggleSize(size)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleSize(size);
              }}
            >
              Tam: {size} ✕
            </span>
          ))}
          {filters.onlyOffers && (
            <span
              className="v-search-tag-chip"
              onClick={() => setFilters((prev) => ({ ...prev, onlyOffers: false }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setFilters((prev) => ({ ...prev, onlyOffers: false }));
              }}
            >
              Apenas Ofertas ✕
            </span>
          )}
          {filters.onlyNew && (
            <span
              className="v-search-tag-chip"
              onClick={() => setFilters((prev) => ({ ...prev, onlyNew: false }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setFilters((prev) => ({ ...prev, onlyNew: false }));
              }}
            >
              Apenas Lançamentos ✕
            </span>
          )}
          <button
            type="button"
            onClick={resetFilters}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              marginLeft: 8,
              textDecoration: "underline",
            }}
          >
            LIMPAR TODOS
          </button>
        </div>
      )}

      {/* 2-COLUMN MAIN LAYOUT (SIDEBAR + GRID) */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 48, alignItems: "start" }}>
        {/* SIDEBAR FILTERS */}
        <aside style={{ display: "grid", gap: 28, background: "#0c0c10", padding: 24, borderRadius: 2, border: "1px solid var(--v-border-subtle)" }}>
          {/* 1. CATEGORIAS */}
          <div>
            <h4 style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.14em", color: "#71717a", textTransform: "uppercase", marginBottom: 14 }}>
              CATEGORIAS
            </h4>
            <div style={{ display: "grid", gap: 8 }}>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, category: c.id }))}
                  style={{
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    fontSize: 12.5,
                    fontWeight: filters.category === c.id ? 800 : 500,
                    color: filters.category === c.id ? "#ffffff" : "#94a3b8",
                    cursor: "pointer",
                    padding: "2px 0",
                    transition: "color 0.2s",
                  }}
                >
                  {filters.category === c.id ? "— " : ""}{c.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. GÊNERO */}
          <div style={{ borderTop: "1px solid var(--v-border-subtle)", paddingTop: 20 }}>
            <h4 style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.14em", color: "#71717a", textTransform: "uppercase", marginBottom: 14 }}>
              GÊNERO
            </h4>
            <div style={{ display: "grid", gap: 8 }}>
              {genders.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, gender: g.id }))}
                  style={{
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    fontSize: 12.5,
                    fontWeight: filters.gender === g.id ? 800 : 500,
                    color: filters.gender === g.id ? "#ffffff" : "#94a3b8",
                    cursor: "pointer",
                    padding: "2px 0",
                    transition: "color 0.2s",
                  }}
                >
                  {filters.gender === g.id ? "— " : ""}{g.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. ESPORTE */}
          <div style={{ borderTop: "1px solid var(--v-border-subtle)", paddingTop: 20 }}>
            <h4 style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.14em", color: "#71717a", textTransform: "uppercase", marginBottom: 14 }}>
              ESPORTE & USO
            </h4>
            <div style={{ display: "grid", gap: 8 }}>
              {sports.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, sport: s.id }))}
                  style={{
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    fontSize: 12.5,
                    fontWeight: filters.sport === s.id ? 800 : 500,
                    color: filters.sport === s.id ? "#ffffff" : "#94a3b8",
                    cursor: "pointer",
                    padding: "2px 0",
                    transition: "color 0.2s",
                  }}
                >
                  {filters.sport === s.id ? "— " : ""}{s.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. TAMANHOS */}
          <div style={{ borderTop: "1px solid var(--v-border-subtle)", paddingTop: 20 }}>
            <h4 style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.14em", color: "#71717a", textTransform: "uppercase", marginBottom: 14 }}>
              TAMANHOS
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {allSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  style={{
                    padding: "5px 9px",
                    borderRadius: 2,
                    background: filters.sizes.includes(size) ? "#ffffff" : "rgba(255,255,255,0.04)",
                    border: filters.sizes.includes(size) ? "1px solid #ffffff" : "1px solid var(--v-border-subtle)",
                    color: filters.sizes.includes(size) ? "#000000" : "#cbd5e1",
                    fontSize: 10.5,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 5. OFERTAS / NOVIDADES */}
          <div style={{ borderTop: "1px solid var(--v-border-subtle)", paddingTop: 20, display: "grid", gap: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#cbd5e1", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={filters.onlyOffers}
                onChange={(e) => setFilters((prev) => ({ ...prev, onlyOffers: e.target.checked }))}
              />
              Apenas Ofertas
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#cbd5e1", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={filters.onlyNew}
                onChange={(e) => setFilters((prev) => ({ ...prev, onlyNew: e.target.checked }))}
              />
              Apenas Lançamentos
            </label>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div>
          <ProductGrid
            products={filteredProducts}
            onSelectProduct={onSelectProduct}
            columns={3}
          />
        </div>
      </div>
    </div>
  );
}
