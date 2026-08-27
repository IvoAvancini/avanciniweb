"use client";

import { useMotora } from "../store/useMotoraStore";
import { Vehicle } from "../types";
import { VehicleCard } from "../components/VehicleCard";

interface GaragePageProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
  onExploreStock: () => void;
  onGoToCompare: () => void;
}

export function GaragePage({ onSelectVehicle, onExploreStock, onGoToCompare }: GaragePageProps) {
  const {
    favorites,
    compareList,
    vehicles,
    testDrives,
    valuations,
    leads,
    openWhatsAppModal,
  } = useMotora();

  const favoriteVehicles = vehicles.filter((v) => favorites.includes(v.id));
  const comparedVehicles = vehicles.filter((v) => compareList.includes(v.id));

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);

  const totalGarageItems =
    favoriteVehicles.length + comparedVehicles.length + testDrives.length + valuations.length + leads.length;

  return (
    <div style={{ padding: "clamp(32px, 4vw, 50px) var(--m-gutter) 100px", background: "var(--m-light-bg)" }}>
      <div className="motora-container" style={{ padding: 0 }}>
        {/* HEADER */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 36, borderBottom: "1px solid var(--m-light-border)", paddingBottom: 20 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#d97706", textTransform: "uppercase" }}>
              PAINEL DO CLIENTE & HISTÓRICO LOCAL
            </span>
            <h1 style={{ fontSize: "clamp(24px, 3.2vw, 38px)", fontWeight: 900, color: "#0f172a", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
              MINHA GARAGEM MOTORA
            </h1>
            <span style={{ fontSize: 13, color: "#64748b", marginTop: 4, display: "block" }}>
              Seus carros favoritos, comparações ativas, agendamentos de test-drive e avaliações de usados.
            </span>
          </div>

          <button
            type="button"
            className="m-btn m-btn-secondary m-btn-sm"
            onClick={openWhatsAppModal}
          >
            FALAR COM MEU CONSULTOR ➔
          </button>
        </div>

        {totalGarageItems === 0 ? (
          <div style={{ padding: "80px 20px", textAlign: "center", background: "#ffffff", borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
            <span style={{ fontSize: 36, display: "block", marginBottom: 12 }}>🏎️</span>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", textTransform: "uppercase", margin: "0 0 8px 0" }}>
              SUA GARAGEM ESTÁ VAZIA NO MOMENTO.
            </h2>
            <p style={{ color: "#64748b", maxWidth: 440, margin: "0 auto 24px", fontSize: 14, lineHeight: 1.5 }}>
              Navegue pelo estoque da MOTORA, salve seus modelos favoritos ou simule uma avaliação para acompanhar tudo por aqui.
            </p>
            <button type="button" className="m-btn m-btn-primary" onClick={onExploreStock}>
              EXPLORAR ESTOQUE MOTORA ➔
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 48 }}>
            {/* 1. TEST-DRIVES AGENDADOS */}
            {testDrives.length > 0 && (
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
                  🏁 TEST-DRIVES AGENDADOS ({testDrives.length})
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                  {testDrives.map((td) => (
                    <div
                      key={td.id}
                      style={{
                        background: "#ffffff",
                        padding: 22,
                        borderRadius: 8,
                        border: "1px solid var(--m-light-border)",
                        boxShadow: "var(--m-shadow-subtle)",
                        display: "grid",
                        gap: 8,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ fontSize: 15, color: "#0f172a" }}>{td.vehicleName}</strong>
                        <span style={{ fontSize: 10, fontWeight: 900, color: "#059669", background: "#d1fae5", padding: "3px 8px", borderRadius: 4 }}>
                          {td.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
                        <span>📅 {td.date} às {td.time}</span>
                        <br />
                        <span>📍 {td.storeName}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: "#94a3b8", borderTop: "1px solid #f1f5f9", paddingTop: 8 }}>
                        Protocolo: <strong style={{ color: "#0f172a" }}>{td.id}</strong> · Titular: {td.userName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. PROPOSTAS DE TROCA / AVALIAÇÕES */}
            {valuations.length > 0 && (
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
                  🔄 AVALIAÇÕES DE USADOS NA TROCA ({valuations.length})
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                  {valuations.map((v) => (
                    <div
                      key={v.id}
                      style={{
                        background: "#ffffff",
                        padding: 22,
                        borderRadius: 8,
                        border: "1px solid var(--m-light-border)",
                        boxShadow: "var(--m-shadow-subtle)",
                        display: "grid",
                        gap: 8,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ fontSize: 15, color: "#0f172a" }}>{v.brand} {v.model} ({v.year})</strong>
                        <span style={{ fontSize: 10, fontWeight: 900, color: "#d97706", background: "#fef3c7", padding: "3px 8px", borderRadius: 4 }}>
                          PRÉ-AVALIAÇÃO
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: "#475569" }}>
                        Versão: {v.version} · {v.mileage.toLocaleString("pt-BR")} km · {v.color}
                      </div>
                      <div style={{ background: "#f8fafc", padding: 12, borderRadius: 6, border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: 11, color: "#64748b", display: "block" }}>Faixa Estimada de Cotação:</span>
                        <strong style={{ fontSize: 16, color: "#059669" }}>
                          {formatMoney(v.estimatedValueRange[0])} a {formatMoney(v.estimatedValueRange[1])}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. VEÍCULOS FAVORITOS */}
            {favoriteVehicles.length > 0 && (
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
                  ♥ VEÍCULOS SALVOS NOS FAVORITOS ({favoriteVehicles.length})
                </h2>
                <div className="m-vehicle-grid">
                  {favoriteVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onSelect={onSelectVehicle}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 4. COMPARAÇÕES RECENTES */}
            {comparedVehicles.length > 0 && (
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <h2 style={{ fontSize: 15, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
                    ⇄ COMPARAÇÕES ATIVAS ({comparedVehicles.length}/3)
                  </h2>
                  <button type="button" className="m-btn m-btn-secondary m-btn-sm" onClick={onGoToCompare}>
                    ABRIR TABELA COMPARATIVA ➔
                  </button>
                </div>
                <div className="m-vehicle-grid">
                  {comparedVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onSelect={onSelectVehicle}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
