import React, { useEffect } from "react";
import { useCora } from "../store/useCoraStore";
import { Property } from "../types";
import { Breadcrumbs } from "../components/CommonComponents";
import { PropertyCard } from "../components/PropertyCard";
import { StickyMobileCTA } from "../components/GalleryAndStickyModals";

interface PropertyDetailPageProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
}

export function PropertyDetailPage({
  property,
  onSelectProperty,
  onNavigateHome,
  onNavigateProperties,
}: PropertyDetailPageProps) {
  const {
    properties,
    toggleFavorite,
    isFavorite,
    toggleCompare,
    isInCompare,
    openVisitModal,
    openLeadConsultantModal,
    openGallery,
    openFloorPlan,
    recordViewed,
    addToast,
  } = useCora();

  useEffect(() => {
    recordViewed(property.slug);
  }, [property.slug, recordViewed]);

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

  const similarProperties = properties
    .filter((p) => p.id !== property.id && p.neighborhood === property.neighborhood)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast("Link copiado", "Link do imóvel copiado para a área de transferência.");
    }
  };

  return (
    <div className="cora-pdp-view" style={{ paddingTop: "90px", paddingBottom: "120px" }}>
      <div className="cora-container">
        {/* BREADCRUMBS */}
        <Breadcrumbs
          items={[
            { label: "Início", onClick: onNavigateHome },
            { label: "Imóveis", onClick: onNavigateProperties },
            { label: property.neighborhood },
            { label: property.title },
          ]}
        />

        {/* 1. GALERIA DE FOTOS (3 FOTOS DESKTOP + LIGHTBOX TRIGGER) */}
        <div className="cora-pdp-gallery-grid">
          <div className="cora-gallery-main" onClick={() => openGallery(property.images, 0)}>
            <img
              src={property.images[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"}
              alt={property.title}
            />
          </div>

          <div className="cora-gallery-side">
            <div className="cora-gallery-side-item" onClick={() => openGallery(property.images, 1)}>
              <img
                src={property.images[1] || property.images[0]}
                alt={`${property.title} foto 2`}
              />
            </div>
            <div className="cora-gallery-side-item" onClick={() => openGallery(property.images, 2)}>
              <img
                src={property.images[2] || property.images[0]}
                alt={`${property.title} foto 3`}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => openGallery(property.images, 0)}
            className="cora-gallery-trigger-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Ver todas as {property.images.length} fotos</span>
          </button>
        </div>

        {/* 2. LAYOUT PRINCIPAL: DETALHES + SIDEBAR FIXA */}
        <div className="cora-pdp-layout">
          {/* MAIN COLUMN */}
          <div style={{ display: "grid", gap: "48px" }}>
            {/* CABEÇALHO DO IMÓVEL */}
            <div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                {property.badges.map((b, idx) => (
                  <span key={idx} className="cora-badge cora-badge-accent">
                    {b}
                  </span>
                ))}
                <span className="cora-badge">Código: {property.code}</span>
              </div>

              <h1 style={{ fontSize: "clamp(28px, 3.6vw, 46px)", lineHeight: "1.1", margin: "0 0 12px" }}>
                {property.title}
              </h1>

              <p style={{ fontSize: "16px", color: "var(--cora-muted)", margin: "0 0 24px" }}>
                📍 {property.address} · {property.neighborhood}, {property.city} - {property.state}
              </p>

              {/* SPECS GRID SUMMARY */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "16px",
                  padding: "20px 24px",
                  background: "var(--cora-white)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--cora-border)",
                }}
              >
                <div>
                  <small style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>Área Útil</small>
                  <strong style={{ fontSize: "20px", display: "block", color: "var(--cora-ink)" }}>{property.area} m²</strong>
                </div>
                <div>
                  <small style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>Suítes</small>
                  <strong style={{ fontSize: "20px", display: "block", color: "var(--cora-ink)" }}>{property.suites}</strong>
                </div>
                <div>
                  <small style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>Quartos</small>
                  <strong style={{ fontSize: "20px", display: "block", color: "var(--cora-ink)" }}>{property.bedrooms}</strong>
                </div>
                <div>
                  <small style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>Vagas</small>
                  <strong style={{ fontSize: "20px", display: "block", color: "var(--cora-ink)" }}>{property.parkingSpaces}</strong>
                </div>
                <div>
                  <small style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>Banheiros</small>
                  <strong style={{ fontSize: "20px", display: "block", color: "var(--cora-ink)" }}>{property.bathrooms}</strong>
                </div>
              </div>
            </div>

            {/* DESCRIÇÃO EDITORIAL */}
            <div>
              <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Sobre o Imóvel</h2>
              <blockquote
                style={{
                  fontSize: "17px",
                  fontStyle: "italic",
                  color: "var(--cora-accent-dark)",
                  lineHeight: "1.6",
                  borderLeft: "3px solid var(--cora-accent)",
                  paddingLeft: "20px",
                  margin: "0 0 20px",
                }}
              >
                “{property.headline}”
              </blockquote>
              <p style={{ fontSize: "15px", lineHeight: "1.75", color: "var(--cora-muted-dark)" }}>
                {property.description}
              </p>
            </div>

            {/* CARACTERÍSTICAS PRIVATIVAS */}
            <div>
              <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Características Privativas</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "12px",
                }}
              >
                {property.features.map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 16px",
                      background: "var(--cora-white)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--cora-border)",
                      fontSize: "13.5px",
                    }}
                  >
                    <span style={{ color: "var(--cora-accent)", fontWeight: 800 }}>✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COMODIDADES DO CONDOMÍNIO */}
            {property.condoAmenities && property.condoAmenities.length > 0 && (
              <div>
                <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>O Condomínio & Lazer</h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {property.condoAmenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 16px",
                        background: "var(--cora-white)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--cora-border)",
                        fontSize: "13.5px",
                      }}
                    >
                      <span style={{ color: "var(--cora-accent)", fontSize: "16px" }}>✦</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PLANTA HUMANIZADA */}
            {property.floorPlans && property.floorPlans.length > 0 && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{ fontSize: "24px", margin: 0 }}>Planta do Imóvel</h2>
                  <button
                    type="button"
                    onClick={() => openFloorPlan(property.floorPlans![0])}
                    className="cora-btn cora-btn-secondary"
                    style={{ minHeight: "38px", padding: "0 14px", fontSize: "12px" }}
                  >
                    🔍 Ampliar Planta
                  </button>
                </div>

                <div
                  onClick={() => openFloorPlan(property.floorPlans![0])}
                  style={{
                    background: "var(--cora-white)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--cora-border)",
                    padding: "24px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={property.floorPlans[0].image}
                    alt={property.floorPlans[0].name}
                    style={{ width: "100%", maxHeight: "320px", objectFit: "contain", borderRadius: "8px" }}
                  />
                  <span style={{ display: "block", marginTop: "12px", color: "var(--cora-muted)", fontSize: "13px" }}>
                    {property.floorPlans[0].name} — Clique para zoom em tela cheia
                  </span>
                </div>
              </div>
            )}

            {/* LOCALIZAÇÃO & PONTOS DE INTERESSE */}
            {property.nearbyPoints && property.nearbyPoints.length > 0 && (
              <div>
                <h2 style={{ fontSize: "24px", marginBottom: "12px" }}>Viver Bem Também é Estar Perto</h2>
                <p style={{ color: "var(--cora-muted)", fontSize: "14.5px", marginBottom: "20px" }}>
                  Comodidades e pontos de interesse em {property.neighborhood}:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                  {property.nearbyPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "16px",
                        background: "var(--cora-white)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--cora-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: "13.5px", display: "block", color: "var(--cora-ink)" }}>
                          {pt.name}
                        </strong>
                        <small style={{ color: "var(--cora-muted)", textTransform: "capitalize", fontSize: "11px" }}>
                          {pt.category}
                        </small>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--cora-accent)" }}>
                        {pt.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONSULTOR RESPONSÁVEL */}
            <div
              style={{
                background: "var(--cora-stone-light)",
                borderRadius: "var(--radius-md)",
                padding: "32px",
                display: "grid",
                gridTemplateColumns: "100px 1fr auto",
                gap: "24px",
                alignItems: "center",
              }}
            >
              <img
                src={property.consultant.photo}
                alt={property.consultant.name}
                style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <span className="cora-eyebrow" style={{ margin: 0 }}>Consultor Responsável</span>
                <h3 style={{ fontSize: "20px", margin: "2px 0" }}>{property.consultant.name}</h3>
                <small style={{ color: "var(--cora-muted)", display: "block", fontSize: "12px", marginBottom: "8px" }}>
                  {property.consultant.creci} · {property.consultant.role}
                </small>
                <p style={{ margin: 0, fontSize: "13.5px", color: "var(--cora-muted-dark)" }}>
                  {property.consultant.featuredQuote || property.consultant.bio}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openLeadConsultantModal(property.consultant)}
                className="cora-btn cora-btn-primary"
                style={{ minHeight: "44px", padding: "0 20px" }}
              >
                Falar com {property.consultant.name.split(" ")[0]}
              </button>
            </div>
          </div>

          {/* SIDEBAR FIXA (DESKTOP) */}
          <aside className="cora-pdp-sidebar-card">
            <div>
              <span className="cora-property-price-label">
                {property.purpose === "venda" ? "Valor de Venda" : "Locação Mensal"}
              </span>
              <strong style={{ fontSize: "32px", fontWeight: 800, color: "var(--cora-ink)", display: "block", marginTop: "2px" }}>
                {formattedPrice}
              </strong>
            </div>

            <div style={{ display: "grid", gap: "6px", padding: "14px 0", borderTop: "1px solid var(--cora-border)", borderBottom: "1px solid var(--cora-border)", fontSize: "13px", color: "var(--cora-muted)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Condomínio estimado:</span>
                <b>R$ {property.condominium.toLocaleString("pt-BR")}/mês</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>IPTU estimado:</span>
                <b>R$ {property.iptu.toLocaleString("pt-BR")}/mês</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Valor médio por m²:</span>
                <b>R$ {Math.round(property.price / property.area).toLocaleString("pt-BR")}/m²</b>
              </div>
              <small style={{ display: "block", fontSize: "10px", color: "var(--cora-muted-light)", marginTop: "4px", lineHeight: "1.4" }}>
                * Valores e taxas para fins demonstrativos em portfólio conceitual.
              </small>
            </div>

            {/* CTAS PRINCIPAIS */}
            <div style={{ display: "grid", gap: "10px" }}>
              <button
                type="button"
                onClick={() => openVisitModal(property)}
                className="cora-btn cora-btn-primary"
                style={{ width: "100%", minHeight: "52px", fontSize: "14px" }}
              >
                Agendar Visita Exclusiva
              </button>

              <button
                type="button"
                onClick={() => openLeadConsultantModal(property.consultant)}
                className="cora-btn cora-btn-secondary"
                style={{ width: "100%", minHeight: "48px" }}
              >
                Falar com Consultor
              </button>
            </div>

            {/* AÇÕES SECUNDÁRIAS (FAVORITAR, COMPARAR, COMPARTILHAR) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", paddingTop: "8px" }}>
              <button
                type="button"
                onClick={() => toggleFavorite(property.id)}
                className="cora-btn cora-btn-secondary"
                style={{
                  minHeight: "40px",
                  padding: "0 6px",
                  fontSize: "11.5px",
                  color: favorite ? "#dc2626" : "var(--cora-muted)",
                }}
              >
                {favorite ? "♥ Salvo" : "♡ Salvar"}
              </button>

              <button
                type="button"
                onClick={() => toggleCompare(property.id)}
                className="cora-btn cora-btn-secondary"
                style={{
                  minHeight: "40px",
                  padding: "0 6px",
                  fontSize: "11.5px",
                  color: inCompare ? "var(--cora-accent)" : "var(--cora-muted)",
                }}
              >
                {inCompare ? "✓ Comparar" : "＋ Comparar"}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="cora-btn cora-btn-secondary"
                style={{ minHeight: "40px", padding: "0 6px", fontSize: "11.5px", color: "var(--cora-muted)" }}
              >
                🔗 Compartilhar
              </button>
            </div>
          </aside>
        </div>

        {/* 3. VOCÊ TAMBÉM PODE GOSTAR */}
        {similarProperties.length > 0 && (
          <div style={{ marginTop: "100px", paddingTop: "60px", borderTop: "1px solid var(--cora-border)" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "32px" }}>Você Também Pode Gostar</h2>
            <div className="cora-property-grid">
              {similarProperties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onSelect={onSelectProperty}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* STICKY CTA MOBILE */}
      <StickyMobileCTA
        price={property.price}
        purpose={property.purpose}
        onScheduleVisit={() => openVisitModal(property)}
      />
    </div>
  );
}
