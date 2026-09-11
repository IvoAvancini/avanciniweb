"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useVertice } from "../store/useVerticeStore";
import { Product } from "../types";

interface SearchOverlayProps {
  onSelectProduct: (product: Product) => void;
}

const POPULAR_SEARCHES = [
  "Tênis de Corrida",
  "Tech Fleece",
  "Corta-Vento Shield",
  "Moletom Oversized",
  "Mochila Tática 30L",
  "Biker Shorts",
];

export function SearchOverlay({ onSelectProduct }: SearchOverlayProps) {
  const { isSearchOpen, closeSearch, products } = useVertice();
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.sport.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="v-search-overlay" role="dialog" aria-modal="true">
      <div className="v-search-top">
        <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.18em", color: "#8e8e93", textTransform: "uppercase" }}>
          BUSCA DIRETA VÉRTICE
        </span>
        <button
          type="button"
          className="v-icon-btn"
          onClick={closeSearch}
          aria-label="Fechar busca"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div className="v-search-input-wrap">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busque por tênis, tech fleece, jaquetas ou corrida..."
          className="v-search-input"
          ref={(el) => {
            if (el) el.focus();
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              color: "#8e8e93",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {query.trim().length === 0 ? (
        <div className="v-search-suggestions">
          <div>
            <h4 style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.16em", color: "#71717a", textTransform: "uppercase", marginBottom: 14 }}>
              TERMOS MAIS BUSCADOS
            </h4>
            <div className="v-search-tags-row">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="v-search-tag-chip"
                  onClick={() => setQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="v-search-suggestions" style={{ marginTop: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: "#cbd5e1", letterSpacing: "0.08em" }}>
              {searchResults.length} {searchResults.length === 1 ? "RESULTADO ENCONTRADO" : "RESULTADOS ENCONTRADOS"}
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#8e8e93" }}>
              <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.18em", color: "#71717a", textTransform: "uppercase" }}>
                SEM CORRESPONDÊNCIA
              </span>
              <p style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", margin: "10px 0 8px", textTransform: "uppercase" }}>
                NÃO ENCONTRAMOS RESULTADOS PARA ESTA BUSCA.
              </p>
              <small>Tente buscar por termos mais genéricos como &quot;tênis&quot;, &quot;moletom&quot;, &quot;jaqueta&quot; ou &quot;corrida&quot;.</small>
            </div>
          ) : (
            <div className="v-product-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
              {searchResults.slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="v-product-card"
                  onClick={() => {
                    closeSearch();
                    onSelectProduct(product);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      closeSearch();
                      onSelectProduct(product);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="v-card-media">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="v-card-details">
                    <span className="v-card-cat">{product.categoryLabel}</span>
                    <h3 className="v-card-title">{product.name}</h3>
                    <div className="v-card-prices">
                      <strong className="v-card-price-now">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
