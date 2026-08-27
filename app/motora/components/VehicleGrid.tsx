"use client";

import { Vehicle } from "../types";
import { VehicleCard } from "./VehicleCard";

interface VehicleGridProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  columns?: 3 | 4;
}

export function VehicleGrid({ vehicles, onSelectVehicle, columns = 4 }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#8e8e98" }}>
        <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.18em", color: "#f59e0b", textTransform: "uppercase" }}>
          ESTOQUE
        </span>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", margin: "10px 0 8px", textTransform: "uppercase" }}>
          Nenhum veículo encontrado com os filtros atuais.
        </h3>
        <small>Tente ajustar a faixa de preço, carroceria ou ano para encontrar o modelo ideal.</small>
      </div>
    );
  }

  return (
    <div className={columns === 3 ? "m-vehicle-grid m-vehicle-grid-3" : "m-vehicle-grid"}>
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onSelect={onSelectVehicle}
        />
      ))}
    </div>
  );
}
