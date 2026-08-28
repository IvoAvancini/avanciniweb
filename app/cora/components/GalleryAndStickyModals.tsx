import React, { useEffect, useCallback } from "react";
import { useCora } from "../store/useCoraStore";

export function GalleryModal() {
  const { isGalleryOpen, closeGallery, galleryImages, activeGalleryIndex, openGallery } = useCora();

  const handlePrev = useCallback(() => {
    const nextIdx = activeGalleryIndex > 0 ? activeGalleryIndex - 1 : galleryImages.length - 1;
    openGallery(galleryImages, nextIdx);
  }, [activeGalleryIndex, galleryImages, openGallery]);

  const handleNext = useCallback(() => {
    const nextIdx = activeGalleryIndex < galleryImages.length - 1 ? activeGalleryIndex + 1 : 0;
    openGallery(galleryImages, nextIdx);
  }, [activeGalleryIndex, galleryImages, openGallery]);

  useEffect(() => {
    if (!isGalleryOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isGalleryOpen, handlePrev, handleNext]);

  if (!isGalleryOpen || galleryImages.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8, 8, 8, 0.96)",
        zIndex: 1100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#fff",
          padding: "10px 20px",
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em" }}>
          Foto {activeGalleryIndex + 1} de {galleryImages.length}
        </span>
        <button
          type="button"
          onClick={closeGallery}
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            border: "none",
            color: "#fff",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "18px",
            display: "grid",
            placeItems: "center",
          }}
          aria-label="Fechar galeria"
        >
          ✕
        </button>
      </div>

      {/* MAIN IMAGE STAGE */}
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: "20px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            color: "#fff",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Foto anterior"
        >
          ‹
        </button>

        <img
          src={galleryImages[activeGalleryIndex]}
          alt={`Foto ${activeGalleryIndex + 1}`}
          style={{
            maxHeight: "75vh",
            maxWidth: "90vw",
            objectFit: "contain",
            borderRadius: "var(--radius-sm)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        />

        <button
          type="button"
          onClick={handleNext}
          style={{
            position: "absolute",
            right: "20px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            color: "#fff",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Próxima foto"
        >
          ›
        </button>
      </div>

      {/* THUMBNAILS STRIP */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          overflowX: "auto",
          padding: "10px",
          zIndex: 10,
        }}
      >
        {galleryImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Miniatura ${idx + 1}`}
            onClick={() => openGallery(galleryImages, idx)}
            style={{
              width: "70px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: activeGalleryIndex === idx ? 1 : 0.4,
              border: activeGalleryIndex === idx ? "2px solid var(--cora-accent)" : "2px solid transparent",
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function FloorPlanModal() {
  const { isFloorPlanOpen, closeFloorPlan, activeFloorPlan } = useCora();

  if (!isFloorPlanOpen || !activeFloorPlan) return null;

  return (
    <div className="cora-modal-overlay" onClick={closeFloorPlan}>
      <div
        className="cora-modal-card"
        style={{ maxWidth: "840px", padding: "32px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeFloorPlan}
          className="cora-modal-close-btn"
          aria-label="Fechar planta"
        >
          ✕
        </button>

        <span className="cora-eyebrow">Planta Humanizada</span>
        <h3 style={{ fontSize: "22px", margin: "4px 0 8px" }}>{activeFloorPlan.name}</h3>
        <p style={{ color: "var(--cora-muted)", fontSize: "14px", marginBottom: "20px" }}>
          {activeFloorPlan.description || `${activeFloorPlan.area} m² · ${activeFloorPlan.bedrooms} dormitórios · ${activeFloorPlan.suites} suítes`}
        </p>

        <div style={{ background: "#fff", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--cora-border)", textAlign: "center" }}>
          <img
            src={activeFloorPlan.image}
            alt={activeFloorPlan.name}
            style={{ width: "100%", maxHeight: "60vh", objectFit: "contain", borderRadius: "8px" }}
          />
        </div>
      </div>
    </div>
  );
}

export function StickyMobileCTA({
  price,
  purpose,
  onScheduleVisit,
}: {
  price: number;
  purpose: "venda" | "locacao";
  onScheduleVisit: () => void;
}) {
  const formattedPrice =
    purpose === "venda"
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        }).format(price)
      : `${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        }).format(price)}/mês`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(251, 250, 248, 0.96)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid var(--cora-border)",
        padding: "12px 20px calc(12px + env(safe-area-inset-bottom, 0px))",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 85,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
      }}
      className="cora-sticky-mobile-cta"
    >
      <div style={{ display: "grid", gap: "2px" }}>
        <small style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>
          {purpose === "venda" ? "Valor de Venda" : "Locação"}
        </small>
        <strong style={{ fontSize: "18px", fontWeight: 800, color: "var(--cora-ink)" }}>
          {formattedPrice}
        </strong>
      </div>

      <button
        type="button"
        onClick={onScheduleVisit}
        className="cora-btn cora-btn-primary"
        style={{ minHeight: "44px", padding: "0 20px", fontSize: "13px" }}
      >
        Agendar Visita
      </button>
    </div>
  );
}
