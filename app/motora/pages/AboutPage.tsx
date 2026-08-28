"use client";

interface AboutPageProps {
  onExploreStock: () => void;
}

export function AboutPage({ onExploreStock }: AboutPageProps) {
  return (
    <div style={{ paddingBottom: 100, background: "var(--m-light-bg)" }}>
      {/* HERO INSTITUCIONAL ESCURO */}
      <div style={{ padding: "clamp(48px, 6vw, 72px) var(--m-gutter) clamp(32px, 4vw, 48px)", background: "#090a0f", color: "#ffffff", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "var(--m-brand-amber-light)", textTransform: "uppercase" }}>
            INSTITUCIONAL · QUEM SOMOS
          </span>
          <h1 style={{ fontSize: "clamp(26px, 3.8vw, 48px)", fontWeight: 900, color: "#ffffff", margin: "8px 0 12px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            CONHEÇA A MOTORA.
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: 640, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Construímos um ecossistema automotivo fundamentado em transparência pericial, acabamento de classe mundial e respeito absoluto ao cliente.
          </p>
        </div>
      </div>

      <div className="motora-container" style={{ padding: "clamp(36px, 5vw, 60px) var(--m-gutter)", maxWidth: 960, margin: "0 auto", display: "grid", gap: 36 }}>
        {/* STORY */}
        <div style={{ background: "#ffffff", padding: "clamp(24px, 4vw, 40px)", borderRadius: 10, border: "1px solid var(--m-light-border)", display: "grid", gap: 14, boxShadow: "var(--m-shadow-subtle)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: 0 }}>
            NOSSA TRAJETÓRIA
          </h2>
          <p style={{ color: "#475569", fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
            Fundada com o propósito de elevar o padrão na compra e venda de veículos no Brasil, a <strong>MOTORA</strong> consolidou-se como referência em curadoria automotiva. Cada veículo que ingressa em nosso showroom passa por um processo minucioso de 120 itens de checagem mecânica, estrutural e documental.
          </p>
          <p style={{ color: "#475569", fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
            Acreditamos que comprar um carro de alto padrão deve ser uma experiência prazerosa, transparente e livre de qualquer incerteza.
          </p>
        </div>

        {/* PILLARS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          <div style={{ background: "#ffffff", padding: 24, borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
            <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>🔍</span>
            <strong style={{ fontSize: 16, color: "#0f172a", display: "block", marginBottom: 6 }}>Perícia Sem Concessões</strong>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: 0 }}>
              100% dos veículos possuem laudo cautelar e histórico veicular checado antes do anúncio.
            </p>
          </div>
          <div style={{ background: "#ffffff", padding: 24, borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
            <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>🛡️</span>
            <strong style={{ fontSize: 16, color: "#0f172a", display: "block", marginBottom: 6 }}>Garantia MOTORA</strong>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: 0 }}>
              Garantia para motor e câmbio em todo o catálogo de seminovos selecionados.
            </p>
          </div>
          <div style={{ background: "#ffffff", padding: 24, borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
            <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>⚡</span>
            <strong style={{ fontSize: 16, color: "#0f172a", display: "block", marginBottom: 6 }}>Atendimento Exclusivo</strong>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: 0 }}>
              Consultoria técnica dedicada e negociação transparente com entrega VIP.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", background: "#ffffff", padding: "clamp(32px, 5vw, 44px) 24px", borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
          <h3 style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "0 0 8px 0" }}>
            CONVIDAMOS VOCÊ A CONHECER NOSSOS VEÍCULOS
          </h3>
          <p style={{ color: "#64748b", maxWidth: 460, margin: "0 auto 22px", fontSize: 14, lineHeight: 1.55 }}>
            Explore nosso acervo completo e agende uma visita ao nosso showroom.
          </p>
          <button type="button" className="m-btn m-btn-primary" onClick={onExploreStock}>
            VER ESTOQUE MOTORA ➔
          </button>
        </div>
      </div>
    </div>
  );
}
