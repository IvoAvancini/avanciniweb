"use client";

import { useMotora } from "../store/useMotoraStore";
import { Vehicle } from "../types";
import { VehicleCard } from "../components/VehicleCard";

interface OffersPageProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export function OffersPage({ onSelectVehicle }: OffersPageProps) {
  const { vehicles } = useMotora();

  const offerVehicles = vehicles.filter((v) => v.isOffer || (v.oldPrice && v.oldPrice > v.price));

  return (
    <div style={{ padding: "clamp(32px, 4vw, 50px) var(--m-gutter) 100px", background: "var(--m-light-bg)" }}>
      <div className="motora-container" style={{ padding: 0 }}>
        <div style={{ marginBottom: 32, paddingBottom: 18, borderBottom: "1px solid var(--m-light-border)" }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#d97706", textTransform: "uppercase" }}>
            OPORTUNIDADES DO MÊS
          </span>
          <h1 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: "#0f172a", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            OFERTAS ESPECIAIS ({offerVehicles.length})
          </h1>
          <span style={{ fontSize: 13, color: "#64748b", marginTop: 4, display: "block" }}>
            Veículos com bônus de concessionária, descontos à vista e condições promocionais de financiamento.
          </span>
        </div>

        <div className="m-vehicle-grid">
          {offerVehicles.map((vehicle) => (
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
