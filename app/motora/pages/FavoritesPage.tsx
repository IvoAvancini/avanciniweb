"use client";

import { useMotora } from "../store/useMotoraStore";
import { Vehicle } from "../types";
import { VehicleCard } from "../components/VehicleCard";

interface FavoritesPageProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
  onExploreStock: () => void;
}

export function FavoritesPage({ onSelectVehicle, onExploreStock }: FavoritesPageProps) {
  const { favorites, vehicles } = useMotora();

  const favoriteVehicles = vehicles.filter((v) => favorites.includes(v.id));

  if (favoriteVehicles.length === 0) {
    return (
      <div style={{ padding: "clamp(80px, 12vw, 140px) var(--m-gutter)", textAlign: "center", minHeight: "65vh", background: "var(--m-light-bg)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#64748b", textTransform: "uppercase" }}>
            GARAGEM SALVA
          </span>
          <h1 style={{ fontSize: "clamp(24px, 3.2vw, 38px)", fontWeight: 900, color: "#0f172a", margin: "10px 0 14px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            SEUS FAVORITOS COMEÇAM AQUI.
          </h1>
          <p style={{ color: "#64748b", maxWidth: 460, margin: "0 auto 28px", fontSize: 14.5, lineHeight: 1.6 }}>
            Salve os veículos que você mais gostou para comparar condições, acompanhar valores e agendar test-drive.
          </p>
          <button
            type="button"
            className="m-btn m-btn-primary"
            onClick={onExploreStock}
          >
            EXPLORAR ESTOQUE MOTORA ➔
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "clamp(32px, 4vw, 50px) var(--m-gutter) 100px", background: "var(--m-light-bg)" }}>
      <div className="motora-container" style={{ padding: 0 }}>
        <div style={{ marginBottom: 32, paddingBottom: 18, borderBottom: "1px solid var(--m-light-border)" }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#d97706", textTransform: "uppercase" }}>
            SUA SELEÇÃO PESSOAL
          </span>
          <h1 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "4px 0 0", letterSpacing: "-0.03em" }}>
            VEÍCULOS SALVOS ({favoriteVehicles.length})
          </h1>
        </div>

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
    </div>
  );
}
