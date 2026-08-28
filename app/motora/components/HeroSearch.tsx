"use client";

import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";
import { VehicleBodyType, VehicleCondition } from "../types";

interface HeroSearchProps {
  onSearch: () => void;
}

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const { filters, setFilters } = useMotora();

  const [term, setTerm] = useState(filters.searchQuery || "");
  const [bodyType, setBodyType] = useState<VehicleBodyType | "all">(filters.bodyType || "all");
  const [condition, setCondition] = useState<VehicleCondition | "all">(filters.condition || "all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      searchQuery: term,
      bodyType,
      condition,
    }));
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="m-hero-search-box">
      {/* 1. TERMO / MODELO */}
      <div className="m-search-field">
        <label>QUAL CARRO VOCÊ PROCURA?</label>
        <input
          type="text"
          placeholder="Ex: SUV, Corolla, Turbo, Híbrido..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>

      {/* 2. CARROCERIA */}
      <div className="m-search-field">
        <label>CARROCERIA</label>
        <select
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value as any)}
        >
          <option value="all">Todas as Carrocerias</option>
          <option value="suv">SUVs & Crossovers</option>
          <option value="sedan">Sedans</option>
          <option value="hatch">Hatches</option>
          <option value="picape">Picapes & 4x4</option>
          <option value="eletrico">100% Elétricos</option>
          <option value="esportivo">Esportivos</option>
        </select>
      </div>

      {/* 3. CONDIÇÃO */}
      <div className="m-search-field">
        <label>ESTADO DO VEÍCULO</label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value as any)}
        >
          <option value="all">Novos e Seminovos</option>
          <option value="novo">Apenas 0km Novos</option>
          <option value="seminovo">Seminovos Selecionados</option>
        </select>
      </div>

      {/* 4. SUBMIT ACTION */}
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <button type="submit" className="m-btn m-btn-primary m-btn-full" style={{ minHeight: 44 }}>
          BUSCAR VEÍCULOS ➔
        </button>
      </div>
    </form>
  );
}
