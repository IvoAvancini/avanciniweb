import React from "react";
import { useCora } from "../store/useCoraStore";
import { Property } from "../types";
import { SearchBox } from "../components/SearchBox";
import { PropertyCard } from "../components/PropertyCard";
import { SectionHeader } from "../components/SectionHeader";

interface HomePageProps {
  onSelectProperty: (property: Property) => void;
  onNavigate: (view: string, param?: string) => void;
}

export function HomePage({ onSelectProperty, onNavigate }: HomePageProps) {
  const { properties, neighborhoods, launches, setFilters } = useCora();

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 3);

  const lifestyles = [
    {
      id: "perto-de-tudo",
      title: "Viver Perto de Tudo",
      subtitle: "Apartamentos nas regiões mais dinâmicas e conectadas.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "espaco-para-crescer",
      title: "Espaço para Crescer",
      subtitle: "Casas em condomínio e plantas generosas para a família.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "vista-que-transforma",
      title: "Vista que Transforma",
      subtitle: "Coberturas e horizontes abertos em São Paulo.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "primeiro-endereco",
      title: "Seu Primeiro Endereço",
      subtitle: "Studios design e apartamentos compactos assinados.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "arquitetura-extraordinaria",
      title: "Arquitetura Extraordinária",
      subtitle: "Mansões suspensas e residências autorais exclusivas.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleSelectLifestyle = (lifestyleId: string) => {
    setFilters((p) => ({ ...p, lifestyle: lifestyleId as any }));
    onNavigate("properties");
  };

  return (
    <div className="cora-home-view">
      {/* 1. HERO CINEMATOGRÁFICO */}
      <section className="cora-hero" id="inicio">
        <div className="cora-hero-bg-wrapper">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85"
            alt="Arquitetura de alto padrão Cora Imóveis"
            className="cora-hero-bg-image"
          />
          <div className="cora-hero-overlay" />
        </div>

        <div className="cora-container">
          <div className="cora-hero-content">
            <div className="cora-hero-badge">
              <span>✦ Curadoria Imobiliária de Alto Padrão</span>
            </div>

            <h1 className="cora-hero-title">
              Encontre um lugar que combine com a sua vida.
            </h1>

            <p className="cora-hero-subtitle">
              Compra, venda e locação com uma experiência imobiliária mais simples, humana e inteligente nos endereços mais nobres de São Paulo.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => onNavigate("properties")}
                className="cora-btn cora-btn-primary"
                style={{ padding: "0 28px", minHeight: "52px" }}
              >
                Explorar Imóveis
              </button>

              <button
                type="button"
                onClick={() => onNavigate("submit-property")}
                className="cora-btn cora-btn-outline-white"
                style={{ padding: "0 28px", minHeight: "52px" }}
              >
                Anuncie seu imóvel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUSCA PRINCIPAL SOBREPOSTA */}
      <div className="cora-container" style={{ position: "relative", zIndex: 20 }}>
        <SearchBox onSearchSubmit={() => onNavigate("properties")} />
      </div>

      {/* 3. ESCOLHAS CORA (DESTAQUES) */}
      <section className="cora-section" style={{ padding: "100px 0 60px" }}>
        <div className="cora-container">
          <SectionHeader
            eyebrow="Curadoria Exclusiva"
            title="Escolhas Cora"
            subtitle="Imóveis selecionados pelo endereço, arquitetura autoral e experiência singular de morar."
            actionText="Ver Todos os Imóveis"
            onAction={() => onNavigate("properties")}
          />

          <div className="cora-property-grid">
            {featuredProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPLORAR POR ESTILO DE VIDA */}
      <section className="cora-section" style={{ padding: "60px 0", background: "var(--cora-stone-light)" }}>
        <div className="cora-container">
          <SectionHeader
            eyebrow="Seu Momento"
            title="Explore por Estilo de Vida"
            subtitle="Mais do que características técnicas, encontre o espaço que traduz a sua próxima fase."
          />

          <div className="cora-lifestyle-grid">
            {lifestyles.map((l) => (
              <div
                key={l.id}
                onClick={() => handleSelectLifestyle(l.id)}
                className="cora-lifestyle-card"
                role="button"
                tabIndex={0}
              >
                <img
                  src={l.image}
                  alt={l.title}
                  className="cora-lifestyle-card-img"
                  loading="lazy"
                />
                <div className="cora-lifestyle-card-overlay" />
                <div className="cora-lifestyle-card-content">
                  <h3>{l.title}</h3>
                  <p>{l.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BAIRROS EM DESTAQUE */}
      <section className="cora-section" style={{ padding: "90px 0 60px" }}>
        <div className="cora-container">
          <SectionHeader
            eyebrow="Guia Urbano"
            title="Descubra a Cidade"
            subtitle="Conheça os bairros mais desejados de São Paulo, com média de valor por metro quadrado e pontos de interesse."
            actionText="Ver Todos os Bairros"
            onAction={() => onNavigate("neighborhoods")}
          />

          <div className="cora-neighborhood-grid">
            {neighborhoods.slice(0, 3).map((n) => (
              <div
                key={n.id}
                onClick={() => onNavigate("neighborhood-detail", n.slug)}
                className="cora-neighborhood-card"
                role="button"
                tabIndex={0}
              >
                <img
                  src={n.image}
                  alt={n.name}
                  className="cora-neighborhood-card-img"
                  loading="lazy"
                />
                <div className="cora-neighborhood-card-overlay" />
                <div className="cora-neighborhood-card-content">
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--cora-accent-light)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {n.city} · {n.totalProperties} Imóveis
                  </span>
                  <h3 style={{ fontSize: "26px", color: "#fff" }}>{n.name}</h3>
                  <p style={{ fontSize: "13px", color: "var(--cora-stone-light)", margin: 0 }}>
                    Média de R$ {n.averagePricePerM2.toLocaleString("pt-BR")}/m²
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LANÇAMENTOS ARQUITETÔNICOS */}
      <section className="cora-section" style={{ padding: "60px 0 90px", background: "var(--cora-white)" }}>
        <div className="cora-container">
          <SectionHeader
            eyebrow="Projetos na Planta"
            title="Novos Endereços"
            subtitle="Empreendimentos de vanguarda que redefinem o horizonte da arquitetura paulistana."
            actionText="Explorar Lançamentos"
            onAction={() => onNavigate("launches")}
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "28px" }}>
            {launches.slice(0, 3).map((l) => (
              <div
                key={l.id}
                onClick={() => onNavigate("launch-detail", l.slug)}
                style={{
                  background: "var(--cora-surface)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--cora-border)",
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease",
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10" }}>
                  <img
                    src={l.image}
                    alt={l.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                    <span className="cora-badge cora-badge-accent">
                      {l.stage === "em-obras" ? "Em Obras" : l.stage === "pronto" ? "Pronto" : "Breve Lançamento"}
                    </span>
                  </div>
                </div>

                <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--cora-muted)", textTransform: "uppercase" }}>
                    {l.neighborhood} · {l.developer}
                  </span>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "var(--cora-ink)" }}>
                    {l.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--cora-muted)", margin: 0, lineHeight: "1.5" }}>
                    Plantas de {l.minArea} a {l.maxArea} m² · Previsão: {l.deliveryForecast}
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid var(--cora-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: "var(--cora-muted)" }}>A partir de</span>
                    <strong style={{ fontSize: "16px", color: "var(--cora-ink)" }}>
                      R$ {(l.minPrice / 1000000).toFixed(1)}M
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VENDA SEU IMÓVEL (CALL TO ACTION CAPTAÇÃO) */}
      <section style={{ background: "var(--cora-ink)", color: "var(--cora-white)", padding: "100px 0" }}>
        <div className="cora-container">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "56px", alignItems: "center" }}>
            <div>
              <span className="cora-eyebrow" style={{ color: "var(--cora-accent-light)" }}>
                Para Proprietários
              </span>
              <h2 style={{ color: "var(--cora-white)", fontSize: "clamp(32px, 4vw, 54px)", lineHeight: "1.08", margin: "8px 0 20px" }}>
                Seu imóvel merece uma apresentação à altura.
              </h2>
              <p style={{ color: "var(--cora-stone-light)", fontSize: "16px", lineHeight: "1.7", maxWidth: "540px", margin: "0 0 32px" }}>
                A Cora cuida de cada detalhe: avaliação mercadológica criteriosa, produção audiovisual profissional, posicionamento digital refinado e conexão com compradores qualificados.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("submit-property")}
                className="cora-btn cora-btn-primary"
                style={{ padding: "0 28px", minHeight: "52px" }}
              >
                Quero Anunciar Meu Imóvel
              </button>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "var(--radius-lg)",
                padding: "36px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "grid",
                gap: "20px",
              }}
            >
              {[
                { title: "Fotografia & Vídeo Editorial", desc: "Produção com equipamento de cinema e iluminação adequada para valorizar cada ambiente." },
                { title: "Divulgação Direcionada", desc: "Campanhas exclusivas para compradores com perfil financeiro compatível." },
                { title: "Assessoria Jurídica Integral", desc: "Acompanhamento minucioso de certidões, contratos e escritura com total segurança." },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "16px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--cora-accent)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: "14px", flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ color: "var(--cora-white)", fontSize: "16px", margin: "0 0 4px" }}>{item.title}</h4>
                    <p style={{ color: "var(--cora-muted-light)", fontSize: "13px", margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. PILARES & CONFIANÇA */}
      <section className="cora-section" style={{ padding: "100px 0" }}>
        <div className="cora-container">
          <SectionHeader
            eyebrow="Nossos Pilares"
            title="Uma Nova Forma de Viver o Mercado Imobiliário"
            subtitle="Construímos relações de longo prazo baseadas na ética, na verdade das informações e na excelência de atendimento."
            centered
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "28px" }}>
            {[
              { icon: "💎", title: "Curadoria Rigorosa", desc: "Apenas imóveis com documentação regular e valorização arquitetônica entram em nossa seleção." },
              { icon: "🤝", title: "Atendimento Humano", desc: "Consultores especializados acompanham sua jornada de ponta a ponta sem pressão comercial." },
              { icon: "📈", title: "Inteligência de Mercado", desc: "Análises precisas de valor por metro quadrado e potencial de liquidez em cada bairro." },
              { icon: "⚡", title: "Experiência Digital", desc: "Busca inteligente, agendamento de visitas e comparação de plantas sem burocracia." },
            ].map((pilar, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--cora-white)",
                  padding: "32px 24px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--cora-border)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "36px" }}>{pilar.icon}</span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "4px 0" }}>{pilar.title}</h3>
                <p style={{ color: "var(--cora-muted)", fontSize: "13.5px", lineHeight: "1.55", margin: 0 }}>
                  {pilar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DEPOIMENTOS DEMONSTRATIVOS */}
      <section style={{ padding: "80px 0", background: "var(--cora-cream)", borderTop: "1px solid var(--cora-stone)" }}>
        <div className="cora-container">
          <SectionHeader
            eyebrow="Experiências de Clientes (Demonstrativo)"
            title="O Que Dizem Quem Já Encontrou Seu Lugar Conosco"
            subtitle="Depoimentos ilustrativos para demonstração de portfólio."
            centered
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "24px" }}>
            {[
              {
                text: "“A curadoria da Cora economizou meses da nossa procura. Cada visita tinha um propósito claro e a negociação foi impecavelmente transparente.”",
                author: "Luciana & Marcelo Costa",
                role: "Proprietários no Jardim Paulistano",
              },
              {
                text: "“Como investidor, valorizo a precisão dos dados e a velocidade de atendimento. A equipe conduziu a locação do meu apartamento em tempo recorde.”",
                author: "Guilherme Prado",
                role: "Investidor Imobiliário em Pinheiros",
              },
              {
                text: "“O atendimento da Marina nos Jardins foi excepcional. Encontramos nossa cobertura com a tranquilidade que uma decisão desse porte exige.”",
                author: "Ana Beatriz Fontoura",
                role: "Compradora nos Jardins",
              },
            ].map((dep, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--cora-white)",
                  padding: "32px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--cora-border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontStyle: "italic", fontSize: "14.5px", lineHeight: "1.65", color: "var(--cora-ink)", margin: "0 0 20px" }}>
                  {dep.text}
                </p>
                <div>
                  <strong style={{ fontSize: "14px", display: "block", color: "var(--cora-ink)" }}>
                    {dep.author}
                  </strong>
                  <small style={{ color: "var(--cora-muted)", fontSize: "12px" }}>{dep.role}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
