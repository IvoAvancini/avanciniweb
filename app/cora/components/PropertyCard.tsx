import Image from "next/image";
import { Property } from "../types";
import { useCora } from "../store/useCoraStore";

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  showCompareButton?: boolean;
}

export function PropertyCard({
  property,
  onSelect,
  showCompareButton = true,
}: PropertyCardProps) {
  const { toggleFavorite, isFavorite, toggleCompare, isInCompare } = useCora();

  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const formattedPrice =
    property.purpose === "venda"
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        }).format(property.price)
      : `${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        }).format(property.price)}/mês`;

  return (
    <div
      className="cora-property-card"
      onClick={() => onSelect(property)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(property);
        }
      }}
      aria-label={`Ver detalhes de ${property.title} em ${property.neighborhood}`}
    >
      {/* MEDIA CONTAINER */}
      <div className="cora-property-card-media">
        <Image
          src={property.images[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"}
          alt={property.title}
          className="cora-property-card-img"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />

        {/* BADGES */}
        <div className="cora-card-badge-container">
          {property.badges.slice(0, 2).map((b, idx) => (
            <span
              key={idx}
              className={`cora-badge ${idx === 0 ? "cora-badge-accent" : ""}`}
            >
              {b}
            </span>
          ))}
        </div>

        {/* FAVORITE BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className={`cora-card-favorite-btn ${favorite ? "is-active" : ""}`}
          aria-label={favorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={favorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* BODY */}
      <div className="cora-property-card-body">
        <div className="cora-property-location">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{property.neighborhood} · {property.city}</span>
        </div>

        <h3 className="cora-property-title">{property.title}</h3>

        {/* SPECS STRIP */}
        <div className="cora-property-specs-strip">
          <span><b>{property.area}</b> m²</span>
          <span>•</span>
          <span><b>{property.suites}</b> {property.suites === 1 ? "suíte" : "suítes"}</span>
          <span>•</span>
          <span><b>{property.parkingSpaces}</b> {property.parkingSpaces === 1 ? "vaga" : "vagas"}</span>
        </div>

        {/* FOOTER */}
        <div className="cora-property-card-footer">
          <div className="cora-property-price-box">
            <span className="cora-property-price-label">
              {property.purpose === "venda" ? "Valor de Venda" : "Locação Mensal"}
            </span>
            <span className="cora-property-price-value">{formattedPrice}</span>
          </div>

          {showCompareButton && (
            <div
              className="cora-property-card-actions"
              onClick={(e) => e.stopPropagation()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => toggleCompare(property.id)}
                className={`cora-compare-toggle-btn ${inCompare ? "is-active" : ""}`}
                aria-label={inCompare ? "Remover da comparação" : "Comparar imóvel"}
              >
                {inCompare ? "✓ Comparando" : "＋ Comparar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PropertyGrid({
  properties,
  onSelect,
  emptyMessage,
  onResetFilters,
}: {
  properties: Property[];
  onSelect: (p: Property) => void;
  emptyMessage?: string;
  onResetFilters?: () => void;
}) {
  if (properties.length === 0) {
    return (
      <div
        style={{
          padding: "80px 24px",
          textAlign: "center",
          background: "var(--cora-white)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--cora-border)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "var(--cora-stone-light)",
            display: "grid",
            placeItems: "center",
            color: "var(--cora-muted)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <div style={{ maxWidth: "420px" }}>
          <h3 style={{ fontSize: "19px", fontWeight: 700, color: "var(--cora-ink)" }}>
            Nenhum imóvel encontrado
          </h3>
          <p style={{ marginTop: "6px", color: "var(--cora-muted)", fontSize: "14px", lineHeight: "1.5" }}>
            {emptyMessage || "Tente ajustar os filtros ou pesquisar por outro bairro para encontrar o endereço ideal."}
          </p>
        </div>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="cora-btn cora-btn-secondary"
            style={{ marginTop: "8px" }}
          >
            Limpar todos os filtros
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="cora-property-grid">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
