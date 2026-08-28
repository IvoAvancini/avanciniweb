"use client";

import { useMotora } from "../store/useMotoraStore";
import { Vehicle, VehicleBodyType } from "../types";
import { HeroSearch } from "../components/HeroSearch";
import { VehicleCard } from "../components/VehicleCard";
import { FinancingCalculator } from "../components/FinancingCalculator";

interface HomePageProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
  onNavigate: (view: string, param?: string) => void;
}

export function HomePage({ onSelectVehicle, onNavigate }: HomePageProps) {
  const { vehicles, setFilters, openTradeInModal, openWhatsAppModal } = useMotora();

  const featuredVehicles = vehicles.filter((v) => v.isFeatured).slice(0, 3);
  const offerVehicles = vehicles.filter((v) => v.isOffer).slice(0, 3);

  const categories: { id: VehicleBodyType; label: string; count: number; image: string }[] = [
    { id: "suv", label: "SUVs & Crossovers", count: vehicles.filter((v) => v.bodyType === "suv").length, image: "/concepts/apex-cars.jpg" },
    { id: "sedan", label: "Sedans Executivos", count: vehicles.filter((v) => v.bodyType === "sedan").length, image: "/concepts/cora-penthouse.jpg" },
    { id: "picape", label: "Picapes & 4x4", count: vehicles.filter((v) => v.bodyType === "picape").length, image: "/concepts/torque-mechanic.webp" },
    { id: "eletrico", label: "100% Elétricos", count: vehicles.filter((v) => v.bodyType === "eletrico").length, image: "/concepts/apex-cars.jpg" },
    { id: "esportivo", label: "Superesportivos", count: vehicles.filter((v) => v.bodyType === "esportivo").length, image: "/concepts/apex-cars.jpg" },
  ];

  const handleSelectCategory = (catId: VehicleBodyType) => {
    setFilters((prev) => ({ ...prev, bodyType: catId }));
    onNavigate("vehicles");
  };

  return (
    <div>
      {/* 1. HERO CINEMATOGRÁFICO (DARK LUXURY) */}
      <section className="m-hero">
        <div className="m-hero-bg">
          <img src="/concepts/apex-cars.jpg" alt="Veículo MOTORA em ambiente urbano" />
        </div>
        <div className="m-hero-shade" />

        <div className="m-hero-content">
          <div className="m-hero-tag">
            <span>✦ CONCESSIONÁRIA MOTORA 2026</span>
          </div>
          <h1>SEU PRÓXIMO CARRO COMEÇA AQUI.</h1>
          <p>
            Veículos zero km, seminovos certificados e as melhores condições de financiamento para você acelerar com total segurança.
          </p>

          <div className="m-hero-actions">
            <button
              type="button"
              className="m-btn m-btn-amber"
              onClick={() => onNavigate("vehicles")}
            >
              EXPLORAR ESTOQUE ➔
            </button>
            <button
              type="button"
              className="m-btn m-btn-secondary"
              onClick={() => onNavigate("offers")}
            >
              VER OFERTAS ESPECIAIS
            </button>
          </div>
        </div>

        {/* HERO QUICK SEARCH OVERLAY (CLEAN WHITE CARD) */}
        <HeroSearch onSearch={() => onNavigate("vehicles")} />
      </section>

      {/* 2. DESTAQUES DO ESTOQUE (LIGHT COMMERCIAL) */}
      <section style={{ padding: "var(--m-section-pad) var(--m-gutter)", background: "var(--m-light-bg)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 28, borderBottom: "1px solid var(--m-light-border)", paddingBottom: 16 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#d97706", textTransform: "uppercase" }}>
                CURADORIA EXCLUSIVA
              </span>
              <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "4px 0 0", letterSpacing: "-0.03em" }}>
                DESTAQUES MOTORA
              </h2>
            </div>
            <button
              type="button"
              className="m-btn m-btn-secondary m-btn-sm"
              onClick={() => onNavigate("vehicles")}
            >
              VER TODO O ESTOQUE ({vehicles.length}) ➔
            </button>
          </div>

          <div className="m-vehicle-grid">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIAS DE CARROCERIA */}
      <section style={{ padding: "var(--m-section-pad) var(--m-gutter)", background: "#ffffff", borderTop: "1px solid var(--m-light-border)", borderBottom: "1px solid var(--m-light-border)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#64748b", textTransform: "uppercase" }}>
              NAVEGAÇÃO POR CATEGORIA
            </span>
            <h2 style={{ fontSize: "clamp(20px, 2.2vw, 30px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "4px 0 0", letterSpacing: "-0.02em" }}>
              ENCONTRE POR CARROCERIA
            </h2>
          </div>

          <div className="m-categories-wrapper">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="m-category-card"
                onClick={() => handleSelectCategory(cat.id)}
                style={{
                  position: "relative",
                  height: 170,
                  borderRadius: 8,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid var(--m-light-border)",
                  boxShadow: "var(--m-shadow-subtle)",
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) contrast(1.1)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(15, 23, 42, 0.85) 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 16 }}>
                  <strong style={{ fontSize: 14.5, fontWeight: 900, color: "#ffffff", textTransform: "uppercase" }}>
                    {cat.label}
                  </strong>
                  <span style={{ fontSize: 11.5, color: "#cbd5e1" }}>{cat.count} disponíveis</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OFERTAS DA SEMANA */}
      <section style={{ padding: "var(--m-section-pad) var(--m-gutter)", background: "var(--m-light-bg)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 28, borderBottom: "1px solid var(--m-light-border)", paddingBottom: 16 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#d97706", textTransform: "uppercase" }}>
                OPORTUNIDADES DO MÊS
              </span>
              <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "4px 0 0", letterSpacing: "-0.03em" }}>
                OFERTAS DA SEMANA
              </h2>
            </div>
            <button
              type="button"
              className="m-btn m-btn-secondary m-btn-sm"
              onClick={() => onNavigate("offers")}
            >
              VER TODAS AS OFERTAS ➔
            </button>
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
      </section>

      {/* 5. POR QUE COMPRAR NA MOTORA (INSTITUCIONAL ELEGANTE) */}
      <section style={{ padding: "var(--m-section-pad) var(--m-gutter)", background: "#090a0f", color: "#ffffff" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.16em", color: "var(--m-brand-amber-light)", textTransform: "uppercase" }}>
              CONFIANÇA & PROCEDÊNCIA
            </span>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: "#ffffff", textTransform: "uppercase", margin: "8px 0 10px", letterSpacing: "-0.03em" }}>
              POR QUE COMPRAR NA MOTORA?
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>
              Rigidez técnica na seleção de cada veículo, documentação auditada e suporte pós-venda completo.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              {
                icon: "🔍",
                title: "Inspeção Veicular 120 Itens",
                desc: "Checklist detalhado de mecânica, estrutura, pintura e eletrônica embarcada antes do anúncio.",
              },
              {
                icon: "🛡️",
                title: "Garantia MOTORA",
                desc: "Cobertura de motor e câmbio para seminovos selecionados e rede credenciada de suporte.",
              },
              {
                icon: "🔄",
                title: "Avaliação Justa na Troca",
                desc: "Seu carro atual entra como parte do pagamento com cotação baseada em valores reais de mercado.",
              },
              {
                icon: "⚡",
                title: "Financiamento Descomplicado",
                desc: "Parcerias com as principais instituições financeiras para aprovação ágil e condições transparentes.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "#12131c",
                  padding: 24,
                  borderRadius: 8,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "grid",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 26 }}>{item.icon}</span>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#ffffff", margin: 0 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TROCA & FINANCIAMENTO (LIGHT CARDS) */}
      <section style={{ padding: "var(--m-section-pad) var(--m-gutter)", background: "var(--m-light-bg)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
            {/* BANNER AVALIE SEU CARRO */}
            <div style={{ background: "#ffffff", padding: "clamp(24px, 4vw, 40px)", borderRadius: 10, border: "1px solid var(--m-light-border)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 20, boxShadow: "var(--m-shadow-subtle)" }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#d97706", textTransform: "uppercase" }}>
                  SEU CARRO VALE DINHEIRO
                </span>
                <h3 style={{ fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "8px 0 10px", letterSpacing: "-0.02em" }}>
                  AVALIE SEU USADO NA TROCA
                </h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  Receba uma cotação preliminar imediata do seu veículo e use o valor como entrada para seu próximo carro.
                </p>
              </div>
              <button
                type="button"
                className="m-btn m-btn-primary"
                onClick={openTradeInModal}
              >
                AVALIAR MEU CARRO NA TROCA ➔
              </button>
            </div>

            {/* CALCULADORA INLINE */}
            <FinancingCalculator
              vehiclePrice={190000}
              onApplyForFinancing={() => onNavigate("garage")}
            />
          </div>
        </div>
      </section>

      {/* 7. LOJAS & ATENDIMENTO VIP */}
      <section style={{ padding: "clamp(48px, 6vw, 72px) var(--m-gutter)", textAlign: "center", background: "#ffffff", borderTop: "1px solid var(--m-light-border)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#64748b", textTransform: "uppercase" }}>
            ATENDIMENTO CONCESSIONÁRIA
          </span>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "8px 0 12px", letterSpacing: "-0.03em" }}>
            CONHEÇA NOSSOS SHOWROOMS
          </h2>
          <p style={{ color: "#64748b", maxWidth: 520, margin: "0 auto 28px", fontSize: 14.5, lineHeight: 1.6 }}>
            Visite nossas lojas em Jardins, Morumbi, Alphaville ou Campinas e faça um test-drive com consultoria exclusiva.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              type="button"
              className="m-btn m-btn-amber"
              onClick={openWhatsAppModal}
            >
              FALAR NO WHATSAPP ➔
            </button>
            <button
              type="button"
              className="m-btn m-btn-secondary"
              onClick={() => onNavigate("stores")}
            >
              VER TODAS AS LOJAS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
