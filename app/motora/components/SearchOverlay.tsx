"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useMotora } from "../store/useMotoraStore";
import { Vehicle } from "../types";

interface SearchOverlayProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

const POPULAR_MODELS = [
  "SUV Híbrido",
  "Corolla",
  "Commander",
  "Superesportivo",
  "Picape 4x4",
  "100% Elétrico",
];

export function SearchOverlay({ onSelectVehicle }: SearchOverlayProps) {
  const { isSearchOpen, closeSearch, vehicles } = useMotora();
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return vehicles.filter(
      (v) =>
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.version.toLowerCase().includes(q) ||
        v.bodyTypeLabel.toLowerCase().includes(q) ||
        v.fuel.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
    );
  }, [query, vehicles]);

  if (!isSearchOpen) return null;

  return (
    <div className="v-search-overlay" role="dialog" aria-modal="true">
      <div className="v-search-top">
        <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.18em", color: "#f59e0b", textTransform: "uppercase" }}>
          BUSCA INTELIGENTE DE VEÍCULOS MOTORA
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
          placeholder="Busque por marca, modelo, motor (ex: SUV, Corolla, Turbo, Híbrido)..."
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
              color: "#8e8e98",
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
              BUSCAS MAIS FREQUENTES
            </h4>
            <div className="v-search-tags-row">
              {POPULAR_MODELS.map((tag) => (
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
              {searchResults.length} {searchResults.length === 1 ? "VEÍCULO ENCONTRADO" : "VEÍCULOS ENCONTRADOS"}
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#8e8e98" }}>
              <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.18em", color: "#71717a", textTransform: "uppercase" }}>
                SEM CORRESPONDÊNCIA
              </span>
              <p style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", margin: "10px 0 8px", textTransform: "uppercase" }}>
                NÃO ENCONTRAMOS VEÍCULOS PARA ESTA BUSCA.
              </p>
              <small>Tente buscar por marcas como Vortex, Kavalo, Apex ou por tipo: SUV, Sedan, Picape.</small>
            </div>
          ) : (
            <div className="m-vehicle-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
              {searchResults.slice(0, 8).map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="m-vehicle-card"
                  onClick={() => {
                    closeSearch();
                    onSelectVehicle(vehicle);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver detalhes de ${vehicle.brand} ${vehicle.model}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      closeSearch();
                      onSelectVehicle(vehicle);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="m-card-media">
                    <Image src={vehicle.images[0]} alt={vehicle.model} width={1376} height={768} />
                  </div>
                  <div className="m-card-body">
                    <div className="m-card-header">
                      <h3>{vehicle.brand} {vehicle.model}</h3>
                      <span className="m-card-version">{vehicle.version}</span>
                    </div>
                    <div className="m-card-footer">
                      <strong className="m-card-price-current">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(vehicle.price)}
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
