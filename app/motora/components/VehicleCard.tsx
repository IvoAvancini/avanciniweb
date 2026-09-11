"use client";

import Image from "next/image";
import { useMotora } from "../store/useMotoraStore";
import { Vehicle } from "../types";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  const { toggleFavorite, isFavorite, toggleCompare, isComparing } = useMotora();

  const favored = isFavorite(vehicle.id);
  const comparing = isComparing(vehicle.id);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);

  const estimatedMonthly = Math.round(((vehicle.price * 0.7) / 48) * 1.38);

  return (
    <div
      className="m-vehicle-card"
      onClick={() => onSelect(vehicle)}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes de ${vehicle.brand} ${vehicle.model}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(vehicle);
      }}
    >
      {/* 1. FOTO GRANDE DO VEÍCULO */}
      <div className="m-vehicle-card__image">
        {/* BADGES */}
        <div className="m-vehicle-card__badges">
          {vehicle.isOffer ? (
            <span className="m-badge-pill m-badge-pill-oferta">OFERTA MOTORA</span>
          ) : vehicle.isNew ? (
            <span className="m-badge-pill m-badge-pill-novo">0KM NOVO</span>
          ) : (
            <span className="m-badge-pill m-badge-pill-cert">MOTORA CERTIFIED</span>
          )}
        </div>

        {/* ACTIONS (FAVORITE & COMPARE) */}
        <div className="m-vehicle-card__actions">
          {/* COMPARE */}
          <button
            type="button"
            className={`m-card-btn-round ${comparing ? "is-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(vehicle.id);
            }}
            title={comparing ? "Remover da comparação" : "Comparar veículo"}
            aria-label="Comparar"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>

          {/* FAVORITE */}
          <button
            type="button"
            className={`m-card-btn-round ${favored ? "is-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(vehicle.id);
            }}
            title={favored ? "Remover dos favoritos" : "Salvar veículo"}
            aria-label="Favoritar"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={favored ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* 2. CONTEÚDO DO CARD */}
      <div className="m-vehicle-card__content">
        {/* TÍTULO E VERSÃO */}
        <h3 className="m-vehicle-card__title">{vehicle.brand} {vehicle.model}</h3>
        <span className="m-vehicle-card__version">{vehicle.version}</span>

        {/* SPECS EM LINHA COM BULLETS */}
        <div className="m-vehicle-card__specs">
          <span>{vehicle.year}</span>
          <span className="m-vehicle-card__bullet">•</span>
          <span>{vehicle.isNew ? "0 km" : `${vehicle.mileage.toLocaleString("pt-BR")} km`}</span>
          <span className="m-vehicle-card__bullet">•</span>
          <span>{vehicle.transmission}</span>
          <span className="m-vehicle-card__bullet">•</span>
          <span>{vehicle.fuel}</span>
        </div>

        {/* PREÇO E PARCELA */}
        <div className="m-vehicle-card__price-box">
          {vehicle.oldPrice && (
            <span className="m-vehicle-card__price-old">{formatMoney(vehicle.oldPrice)}</span>
          )}
          <div className="m-vehicle-card__price">{formatMoney(vehicle.price)}</div>
          <span className="m-vehicle-card__installment">
            ou 48x de {formatMoney(estimatedMonthly)}*
          </span>
        </div>

        {/* BOTÃO VER DETALHES */}
        <button
          type="button"
          className="m-btn m-btn-primary m-vehicle-card__cta"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(vehicle);
          }}
        >
          VER DETALHES ➔
        </button>
      </div>
    </div>
  );
}
