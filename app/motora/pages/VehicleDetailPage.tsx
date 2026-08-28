"use client";

import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";
import { Vehicle } from "../types";
import { FinancingCalculator } from "../components/FinancingCalculator";
import { VehicleCard } from "../components/VehicleCard";

interface VehicleDetailPageProps {
  vehicle: Vehicle;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onNavigateHome: () => void;
  onNavigateStock: () => void;
}

export function VehicleDetailPage({
  vehicle,
  onSelectVehicle,
  onNavigateHome,
  onNavigateStock,
}: VehicleDetailPageProps) {
  const {
    vehicles,
    toggleFavorite,
    isFavorite,
    toggleCompare,
    isComparing,
    openLeadModal,
    openTestDriveModal,
    openWhatsAppModal,
  } = useMotora();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const favored = isFavorite(vehicle.id);
  const comparing = isComparing(vehicle.id);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);

  const estimatedMonthly = Math.round(((vehicle.price * 0.7) / 48) * 1.38);

  const similarVehicles = vehicles
    .filter((v) => v.id !== vehicle.id && (v.bodyType === vehicle.bodyType || v.brand === vehicle.brand))
    .slice(0, 3);

  return (
    <div style={{ paddingBottom: 120, background: "var(--m-light-bg)" }}>
      <div className="motora-container" style={{ padding: 0 }}>
        {/* BREADCRUMB */}
        <div style={{ padding: "clamp(20px, 3vw, 32px) var(--m-gutter) 0", display: "flex", gap: 8, fontSize: 11.5, color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
          <button
            type="button"
            onClick={onNavigateHome}
            style={{ background: "transparent", border: "none", color: "#334155", cursor: "pointer", padding: 0 }}
          >
            Início
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={onNavigateStock}
            style={{ background: "transparent", border: "none", color: "#334155", cursor: "pointer", padding: 0 }}
          >
            Estoque
          </button>
          <span>/</span>
          <span style={{ color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{vehicle.brand} {vehicle.model}</span>
        </div>

        {/* 2-COLUMN MAIN VDP LAYOUT */}
        <div className="m-vdp-layout">
          {/* LEFT: GALLERY & STORY */}
          <div style={{ display: "grid", gap: 28, width: "100%" }}>
            {/* GALLERY CONTAINER */}
            <div className="m-vdp-gallery">
              <div style={{ position: "relative" }}>
                <img
                  src={vehicle.images[activeImageIndex] || vehicle.images[0]}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="m-vdp-main-img"
                  style={{ borderRadius: 10, border: "1px solid var(--m-light-border)", background: "#ffffff" }}
                />
                <span style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(15, 23, 42, 0.85)", color: "#fff", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 800 }}>
                  {activeImageIndex + 1} / {vehicle.images.length} FOTOS
                </span>
              </div>

              {/* THUMBNAILS */}
              <div className="m-vdp-thumbs-row">
                {vehicle.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    className={`m-vdp-thumb ${activeImageIndex === idx ? "is-active" : ""}`}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{ borderRadius: 6, border: activeImageIndex === idx ? "2px solid #0f172a" : "1px solid var(--m-light-border)" }}
                  />
                ))}
              </div>
            </div>

            {/* 1. FICHA TÉCNICA E DETALHES */}
            <div style={{ background: "#ffffff", padding: "clamp(20px, 3.5vw, 32px)", borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 16px 0" }}>
                ESPECIFICAÇÕES TÉCNICAS
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
                {[
                  { label: "Ano / Modelo", val: vehicle.year },
                  { label: "Quilometragem", val: vehicle.isNew ? "0 km (Novo)" : `${vehicle.mileage.toLocaleString("pt-BR")} km` },
                  { label: "Motor", val: vehicle.engine },
                  { label: "Potência", val: vehicle.power },
                  { label: "Câmbio", val: vehicle.transmission },
                  { label: "Combustível", val: vehicle.fuel },
                  { label: "Cor Externa", val: vehicle.color },
                  { label: "Portas", val: `${vehicle.doors} Portas` },
                  { label: "Final de Placa", val: vehicle.plateEnd },
                  { label: "Localização", val: vehicle.location },
                ].map((item, idx) => (
                  <div key={idx} style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: 8 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: "#64748b", textTransform: "uppercase", display: "block" }}>{item.label}</span>
                    <strong style={{ fontSize: 13.5, color: "#0f172a", marginTop: 2, display: "block" }}>{item.val}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. EQUIPAMENTOS & ITENS DE SÉRIE */}
            <div style={{ background: "#ffffff", padding: "clamp(20px, 3.5vw, 32px)", borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 16px 0" }}>
                PRINCIPAIS EQUIPAMENTOS DE SÉRIE
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {vehicle.features.map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#334155" }}>
                    <span style={{ color: "#059669", fontWeight: 900 }}>✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. HISTÓRICO & INSPEÇÃO MOTORA */}
            <div style={{ background: "#f0fdf4", padding: "clamp(20px, 3.5vw, 32px)", borderRadius: 10, border: "1px solid #bbf7d0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>🛡️</span>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: "#065f46", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
                  INSPEÇÃO & HISTÓRICO MOTORA
                </h3>
              </div>
              <p style={{ fontSize: 13.5, color: "#166534", lineHeight: 1.6, margin: "0 0 14px 0" }}>
                {vehicle.description}
              </p>

              {vehicle.inspectionHighlights && (
                <div style={{ display: "grid", gap: 8, borderTop: "1px solid #bbf7d0", paddingTop: 12 }}>
                  {vehicle.inspectionHighlights.map((hl, idx) => (
                    <div key={idx} style={{ fontSize: 12.5, color: "#15803d", display: "flex", alignItems: "center", gap: 6 }}>
                      <span>✦</span>
                      <strong>{hl}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. SIMULADOR DE FINANCIAMENTO INLINE */}
            <FinancingCalculator vehiclePrice={vehicle.price} />
          </div>

          {/* RIGHT: STICKY PURCHASE PANEL (WHITE LIGHT CARD) */}
          <div>
            <div className="m-vdp-sticky-panel" style={{ background: "#ffffff", border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-card)", borderRadius: 10, color: "#0f172a" }}>
              {/* BADGE & HEADLINE */}
              <div>
                <span className={`m-badge-pill ${vehicle.isOffer ? "m-badge-pill-oferta" : vehicle.isNew ? "m-badge-pill-novo" : "m-badge-pill-cert"}`} style={{ display: "inline-block", marginBottom: 10 }}>
                  {vehicle.isOffer ? "OFERTA EXCLUSIVA" : vehicle.isNew ? "0KM PRONTA-ENTREGA" : "MOTORA CERTIFIED"}
                </span>

                <h1 style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 900, color: "#0f172a", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
                  {vehicle.brand} {vehicle.model}
                </h1>
                <span style={{ fontSize: 13, color: "#64748b", display: "block", marginTop: 4, fontWeight: 500 }}>
                  {vehicle.version} · {vehicle.year}
                </span>
              </div>

              {/* PRICES */}
              <div style={{ borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "16px 0" }}>
                {vehicle.oldPrice && (
                  <span style={{ fontSize: 13, color: "#94a3b8", textDecoration: "line-through", display: "block" }}>
                    {formatMoney(vehicle.oldPrice)}
                  </span>
                )}
                <div style={{ fontSize: "clamp(28px, 3.2vw, 36px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em" }}>
                  {formatMoney(vehicle.price)}
                </div>
                <span style={{ fontSize: 12.5, color: "#d97706", fontWeight: 700, display: "block", marginTop: 3 }}>
                  ou 48x de {formatMoney(estimatedMonthly)} no financiamento*
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: "grid", gap: 10 }}>
                <button
                  type="button"
                  className="m-btn m-btn-primary m-btn-full"
                  onClick={() => openLeadModal(vehicle)}
                >
                  TENHO INTERESSE ➔
                </button>

                <button
                  type="button"
                  className="m-btn m-btn-secondary m-btn-full"
                  onClick={() => openTestDriveModal(vehicle)}
                >
                  🏁 AGENDAR TEST-DRIVE
                </button>

                <button
                  type="button"
                  className="m-btn m-btn-full"
                  onClick={openWhatsAppModal}
                  style={{ background: "#25d366", color: "#ffffff", fontWeight: 800 }}
                >
                  💬 FALAR NO WHATSAPP
                </button>
              </div>

              {/* FAST FAVORITE / COMPARE TOGGLES */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
                <button
                  type="button"
                  onClick={() => toggleFavorite(vehicle.id)}
                  style={{
                    background: favored ? "#0f172a" : "#f8fafc",
                    color: favored ? "#ffffff" : "#475569",
                    border: "1px solid var(--m-light-border)",
                    borderRadius: 4,
                    padding: "10px 8px",
                    fontSize: 11.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    minHeight: 44,
                  }}
                >
                  {favored ? "♥ SALVO" : "♡ FAVORITAR"}
                </button>

                <button
                  type="button"
                  onClick={() => toggleCompare(vehicle.id)}
                  style={{
                    background: comparing ? "#0f172a" : "#f8fafc",
                    color: comparing ? "#ffffff" : "#475569",
                    border: "1px solid var(--m-light-border)",
                    borderRadius: 4,
                    padding: "10px 8px",
                    fontSize: 11.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    minHeight: 44,
                  }}
                >
                  {comparing ? "⇄ COMPARANDO" : "⇄ COMPARAR"}
                </button>
              </div>

              {/* LOCATION BADGE */}
              <div style={{ fontSize: 11.5, color: "#64748b", display: "flex", alignItems: "center", gap: 6 }}>
                <span>📍</span>
                <span>Disponível para visitação: <strong style={{ color: "#0f172a" }}>{vehicle.location}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* SIMILAR VEHICLES */}
        {similarVehicles.length > 0 && (
          <div style={{ padding: "40px var(--m-gutter) 0", borderTop: "1px solid var(--m-light-border)" }}>
            <h2 style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", marginBottom: 20, letterSpacing: "-0.02em" }}>
              VEÍCULOS SIMILARES QUE VOCÊ PODE GOSTAR
            </h2>
            <div className="m-vehicle-grid m-vehicle-grid-3">
              {similarVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} onSelect={onSelectVehicle} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE FIXED STICKY CTA BAR (< 768px) */}
      <div className="m-mobile-sticky-cta" style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0", color: "#0f172a" }}>
        <div>
          <span style={{ fontSize: 10, color: "#64748b", display: "block", textTransform: "uppercase", fontWeight: 700 }}>Valor à vista</span>
          <strong style={{ fontSize: 17, color: "#0f172a" }}>{formatMoney(vehicle.price)}</strong>
        </div>
        <button
          type="button"
          className="m-btn m-btn-primary m-btn-sm"
          onClick={() => openLeadModal(vehicle)}
          style={{ flex: 1, maxWidth: 180 }}
        >
          TENHO INTERESSE ➔
        </button>
      </div>
    </div>
  );
}
