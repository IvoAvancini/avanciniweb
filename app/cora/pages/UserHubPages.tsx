import React from "react";
import { useCora } from "../store/useCoraStore";
import { Property } from "../types";
import { Breadcrumbs, EmptyState } from "../components/CommonComponents";
import { PropertyCard } from "../components/PropertyCard";

export function ComparePage({
  onSelectProperty,
  onNavigateHome,
  onNavigateProperties,
}: {
  onSelectProperty: (property: Property) => void;
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
}) {
  const { compareList, properties, removeFromCompare, clearCompare, openVisitModal } = useCora();

  const comparedProperties = properties.filter((p) => compareList.includes(p.id));

  if (comparedProperties.length === 0) {
    return (
      <div className="cora-container" style={{ paddingTop: "110px", paddingBottom: "100px" }}>
        <Breadcrumbs
          items={[
            { label: "Início", onClick: onNavigateHome },
            { label: "Comparador" },
          ]}
        />
        <EmptyState
          title="Escolha imóveis para comparar"
          subtitle="Navegue pelo nosso catálogo e clique no botão '+ Comparar' em até 3 propriedades para analisar metragens, valores e diferenciais lado a lado."
          actionText="Explorar Catálogo de Imóveis"
          onAction={onNavigateProperties}
        />
      </div>
    );
  }

  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Imóveis", onClick: onNavigateProperties },
          { label: "Comparador" },
        ]}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", margin: "20px 0 32px" }}>
        <div>
          <span className="cora-eyebrow">Análise Técnica Lado a Lado</span>
          <h1 style={{ fontSize: "clamp(28px, 3.8vw, 48px)", margin: "4px 0 8px" }}>
            Comparação de Imóveis ({comparedProperties.length}/3)
          </h1>
          <p style={{ color: "var(--cora-muted)", fontSize: "15px", margin: 0 }}>
            Compare especificações, custos fixos e diferenciais de cada endereço.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCompare}
          className="cora-btn cora-btn-secondary"
          style={{ minHeight: "40px", fontSize: "12.5px" }}
        >
          Limpar Comparador
        </button>
      </div>

      {/* COMPARISON TABLE */}
      <div style={{ overflowX: "auto", background: "var(--cora-white)", borderRadius: "var(--radius-md)", border: "1px solid var(--cora-border)", padding: "24px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr>
              <th style={{ padding: "16px", width: "20%", borderBottom: "2px solid var(--cora-border)", color: "var(--cora-muted)", fontSize: "12px", textTransform: "uppercase" }}>
                Propriedade
              </th>
              {comparedProperties.map((p) => (
                <th key={p.id} style={{ padding: "16px", width: `${80 / comparedProperties.length}%`, borderBottom: "2px solid var(--cora-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                    <div onClick={() => onSelectProperty(p)} style={{ cursor: "pointer" }}>
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
                      />
                      <strong style={{ fontSize: "15px", display: "block", color: "var(--cora-ink)" }}>{p.title}</strong>
                      <small style={{ color: "var(--cora-muted)", fontSize: "12px" }}>{p.neighborhood}</small>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCompare(p.id)}
                      style={{ background: "none", border: "none", color: "var(--cora-muted)", cursor: "pointer", fontSize: "16px" }}
                      title="Remover"
                    >
                      ✕
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ fontSize: "14px" }}>
            <tr>
              <td style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)", fontWeight: 700, color: "var(--cora-muted)" }}>Valor</td>
              {comparedProperties.map((p) => (
                <td key={p.id} style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)", fontWeight: 800, color: "var(--cora-ink)", fontSize: "16px" }}>
                  R$ {p.price.toLocaleString("pt-BR")}
                </td>
              ))}
            </tr>
            <tr>
              <td style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)", fontWeight: 700, color: "var(--cora-muted)" }}>Área Útil</td>
              {comparedProperties.map((p) => (
                <td key={p.id} style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)" }}>{p.area} m²</td>
              ))}
            </tr>
            <tr>
              <td style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)", fontWeight: 700, color: "var(--cora-muted)" }}>Preço / m²</td>
              {comparedProperties.map((p) => (
                <td key={p.id} style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)" }}>
                  R$ {Math.round(p.price / p.area).toLocaleString("pt-BR")}/m²
                </td>
              ))}
            </tr>
            <tr>
              <td style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)", fontWeight: 700, color: "var(--cora-muted)" }}>Suítes / Quartos</td>
              {comparedProperties.map((p) => (
                <td key={p.id} style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)" }}>
                  {p.suites} suítes ({p.bedrooms} quartos)
                </td>
              ))}
            </tr>
            <tr>
              <td style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)", fontWeight: 700, color: "var(--cora-muted)" }}>Vagas de Garagem</td>
              {comparedProperties.map((p) => (
                <td key={p.id} style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)" }}>{p.parkingSpaces} vagas</td>
              ))}
            </tr>
            <tr>
              <td style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)", fontWeight: 700, color: "var(--cora-muted)" }}>Condomínio / IPTU</td>
              {comparedProperties.map((p) => (
                <td key={p.id} style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)" }}>
                  Cond: R$ {p.condominium.toLocaleString("pt-BR")} · IPTU: R$ {p.iptu.toLocaleString("pt-BR")}
                </td>
              ))}
            </tr>
            <tr>
              <td style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)", fontWeight: 700, color: "var(--cora-muted)" }}>Ações</td>
              {comparedProperties.map((p) => (
                <td key={p.id} style={{ padding: "16px", borderBottom: "1px solid var(--cora-border)" }}>
                  <button
                    type="button"
                    onClick={() => openVisitModal(p)}
                    className="cora-btn cora-btn-primary"
                    style={{ width: "100%", minHeight: "40px", fontSize: "12.5px" }}
                  >
                    Agendar Visita
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function FavoritesPage({
  onSelectProperty,
  onNavigateHome,
  onNavigateProperties,
}: {
  onSelectProperty: (property: Property) => void;
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
}) {
  const { favorites, properties, clearFavorites } = useCora();

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Favoritos" },
        ]}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", margin: "20px 0 32px" }}>
        <div>
          <span className="cora-eyebrow">Minha Seleção Pessoal</span>
          <h1 style={{ fontSize: "clamp(28px, 3.8vw, 48px)", margin: "4px 0 8px" }}>
            Imóveis Salvos ({favoriteProperties.length})
          </h1>
          <p style={{ color: "var(--cora-muted)", fontSize: "15px", margin: 0 }}>
            Propriedades marcadas com carinho para o seu próximo passo.
          </p>
        </div>

        {favoriteProperties.length > 0 && (
          <button
            type="button"
            onClick={clearFavorites}
            className="cora-btn cora-btn-secondary"
            style={{ minHeight: "40px", fontSize: "12.5px" }}
          >
            Limpar Favoritos
          </button>
        )}
      </div>

      {favoriteProperties.length === 0 ? (
        <EmptyState
          title="Seu próximo endereço pode começar aqui"
          subtitle="Você ainda não salvou nenhum imóvel. Explore nosso catálogo e clique no coração para acompanhar suas propriedades favoritas."
          actionText="Explorar Imóveis"
          onAction={onNavigateProperties}
        />
      ) : (
        <div className="cora-property-grid">
          {favoriteProperties.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MyCoraPage({
  onSelectProperty,
  onNavigateHome,
  onNavigateProperties,
  onNavigateSchedule,
  onNavigateSubmit,
}: {
  onSelectProperty: (property: Property) => void;
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
  onNavigateSchedule: () => void;
  onNavigateSubmit: () => void;
}) {
  const {
    favorites,
    compareList,
    scheduledVisits,
    simulations,
    propertySubmissions,
    recentlyViewedSlugs,
    properties,
  } = useCora();

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));
  const recentlyViewedProperties = properties.filter((p) => recentlyViewedSlugs.includes(p.slug));

  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Minha Cora" },
        ]}
      />

      <div style={{ margin: "20px 0 36px" }}>
        <span className="cora-eyebrow">Área do Cliente (Demonstrativo)</span>
        <h1 style={{ fontSize: "clamp(28px, 3.8vw, 48px)", margin: "4px 0 8px" }}>
          Sua Jornada com a Cora
        </h1>
        <p style={{ color: "var(--cora-muted)", fontSize: "15px", margin: 0 }}>
          Acompanhe suas visitas agendadas, imóveis salvos, simulações salvas e histórico de navegação em um só lugar.
        </p>
      </div>

      {/* DASHBOARD STATS OVERVIEW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <div style={{ padding: "20px", background: "var(--cora-white)", borderRadius: "var(--radius-md)", border: "1px solid var(--cora-border)" }}>
          <small style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>Visitas Solicitadas</small>
          <strong style={{ fontSize: "28px", display: "block", color: "var(--cora-accent)", marginTop: "4px" }}>
            {scheduledVisits.length}
          </strong>
        </div>

        <div style={{ padding: "20px", background: "var(--cora-white)", borderRadius: "var(--radius-md)", border: "1px solid var(--cora-border)" }}>
          <small style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>Favoritos Salvos</small>
          <strong style={{ fontSize: "28px", display: "block", color: "var(--cora-ink)", marginTop: "4px" }}>
            {favoriteProperties.length}
          </strong>
        </div>

        <div style={{ padding: "20px", background: "var(--cora-white)", borderRadius: "var(--radius-md)", border: "1px solid var(--cora-border)" }}>
          <small style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>Em Comparação</small>
          <strong style={{ fontSize: "28px", display: "block", color: "var(--cora-ink)", marginTop: "4px" }}>
            {compareList.length}/3
          </strong>
        </div>

        <div style={{ padding: "20px", background: "var(--cora-white)", borderRadius: "var(--radius-md)", border: "1px solid var(--cora-border)" }}>
          <small style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-muted)" }}>Simulações Salvas</small>
          <strong style={{ fontSize: "28px", display: "block", color: "var(--cora-ink)", marginTop: "4px" }}>
            {simulations.length}
          </strong>
        </div>
      </div>

      {/* SECTION 1: VISITAS SOLICITADAS */}
      <div style={{ marginBottom: "56px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px", margin: 0 }}>Visitas Agendadas ({scheduledVisits.length})</h2>
          <button
            type="button"
            onClick={onNavigateSchedule}
            className="cora-btn cora-btn-secondary"
            style={{ minHeight: "38px", padding: "0 14px", fontSize: "12px" }}
          >
            ＋ Agendar Nova Visita
          </button>
        </div>

        {scheduledVisits.length === 0 ? (
          <div style={{ padding: "32px", background: "var(--cora-white)", borderRadius: "var(--radius-md)", border: "1px solid var(--cora-border)", textAlign: "center", color: "var(--cora-muted)", fontSize: "14px" }}>
            Nenhuma visita solicitada ainda. Escolha um imóvel e agende uma visita presencial ou tour virtual por vídeo.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "14px" }}>
            {scheduledVisits.map((v) => (
              <div
                key={v.id}
                style={{
                  padding: "20px 24px",
                  background: "var(--cora-white)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--cora-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <img
                    src={v.propertyImage}
                    alt={v.propertyTitle}
                    style={{ width: "64px", height: "50px", borderRadius: "6px", objectFit: "cover" }}
                  />
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--cora-accent)", letterSpacing: "0.08em" }}>
                      PROTOCOLO {v.protocol} · {v.visitType === "presencial" ? "VISITA PRESENCIAL" : "TOUR VIRTUAL"}
                    </span>
                    <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "2px 0", color: "var(--cora-ink)" }}>
                      {v.propertyTitle}
                    </h4>
                    <small style={{ color: "var(--cora-muted)", fontSize: "12px" }}>
                      Data: <b>{v.date}</b> às <b>{v.time}</b> · Contato: {v.clientName} ({v.clientPhone})
                    </small>
                  </div>
                </div>

                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "999px",
                    background: "rgba(37, 211, 102, 0.12)",
                    color: "#166534",
                    fontSize: "11.5px",
                    fontWeight: 800,
                  }}
                >
                  ✓ Confirmada
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: IMÓVEIS ANUNCIADOS PELO PROPRIETÁRIO */}
      {propertySubmissions.length > 0 && (
        <div style={{ marginBottom: "56px" }}>
          <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>Seus Imóveis Cadastrados ({propertySubmissions.length})</h2>
          <div style={{ display: "grid", gap: "14px" }}>
            {propertySubmissions.map((sub) => (
              <div
                key={sub.id}
                style={{
                  padding: "20px 24px",
                  background: "var(--cora-white)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--cora-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--cora-accent)" }}>
                    PROTOCOLO {sub.protocol} · {sub.purpose === "venda" ? "VENDA" : "LOCAÇÃO"}
                  </span>
                  <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "2px 0" }}>
                    {sub.propertyType.toUpperCase()} em {sub.neighborhood}, {sub.city}
                  </h4>
                  <small style={{ color: "var(--cora-muted)", fontSize: "12px" }}>
                    {sub.area} m² · {sub.suites} suítes · Valor pretendido: R$ {sub.expectedPrice.toLocaleString("pt-BR")}
                  </small>
                </div>
                <span style={{ padding: "4px 12px", borderRadius: "999px", background: "var(--cora-stone-light)", fontSize: "11px", fontWeight: 700 }}>
                  Em análise pela curadoria
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: VISTOS RECENTEMENTE */}
      {recentlyViewedProperties.length > 0 && (
        <div>
          <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>Vistos Recentemente</h2>
          <div className="cora-property-grid">
            {recentlyViewedProperties.slice(0, 3).map((p) => (
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
  );
}
