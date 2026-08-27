import React, { useState } from "react";
import { useCora } from "../store/useCoraStore";
import { Breadcrumbs } from "../components/CommonComponents";
import { PropertyCard } from "../components/PropertyCard";
import { Property } from "../types";

export function LaunchesPage({
  onNavigateHome,
  onSelectLaunch,
}: {
  onNavigateHome: () => void;
  onSelectLaunch: (slug: string) => void;
}) {
  const { launches } = useCora();

  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Lançamentos" },
        ]}
      />

      <div style={{ margin: "20px 0 40px" }}>
        <span className="cora-eyebrow">Novos Endereços</span>
        <h1 style={{ fontSize: "clamp(32px, 4.2vw, 54px)", margin: "4px 0 12px" }}>
          Lançamentos & Obras em Andamento
        </h1>
        <p style={{ color: "var(--cora-muted)", fontSize: "16px", margin: 0, maxWidth: "680px" }}>
          Empreendimentos de vanguarda com projetos assinados pelas principais incorporadoras e escritórios de arquitetura de São Paulo.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "32px" }}>
        {launches.map((l) => (
          <article
            key={l.id}
            onClick={() => onSelectLaunch(l.slug)}
            style={{
              background: "var(--cora-white)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--cora-border)",
              overflow: "hidden",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              boxShadow: "var(--cora-shadow-card)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
                  {l.stage === "em-obras" ? "Em Obras" : l.stage === "pronto" ? "Pronto para Morar" : "Breve Lançamento"}
                </span>
              </div>
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--cora-muted)", textTransform: "uppercase" }}>
                {l.neighborhood} · {l.developer}
              </span>
              <h3 style={{ fontSize: "22px", fontWeight: 700, margin: 0, color: "var(--cora-ink)" }}>
                {l.title}
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--cora-muted)", margin: 0, lineHeight: "1.6" }}>
                {l.description}
              </p>

              <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1px solid var(--cora-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <small style={{ fontSize: "11px", color: "var(--cora-muted)", display: "block" }}>Previsão de Entrega</small>
                  <span style={{ fontSize: "13px", fontWeight: 700 }}>{l.deliveryForecast}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <small style={{ fontSize: "11px", color: "var(--cora-muted)", display: "block" }}>A partir de</small>
                  <strong style={{ fontSize: "18px", color: "var(--cora-ink)" }}>
                    R$ {(l.minPrice / 1000000).toFixed(1)}M
                  </strong>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function NeighborhoodsPage({
  onNavigateHome,
  onSelectNeighborhood,
}: {
  onNavigateHome: () => void;
  onSelectNeighborhood: (slug: string) => void;
}) {
  const { neighborhoods } = useCora();

  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Bairros" },
        ]}
      />

      <div style={{ margin: "20px 0 40px" }}>
        <span className="cora-eyebrow">Guia Urbano</span>
        <h1 style={{ fontSize: "clamp(32px, 4.2vw, 54px)", margin: "4px 0 12px" }}>
          Bairros & Regiões Nobres
        </h1>
        <p style={{ color: "var(--cora-muted)", fontSize: "16px", margin: 0, maxWidth: "680px" }}>
          Explore as características, gastronomia, áreas verdes e dados de valor por metro quadrado das regiões mais cobiçadas da capital paulista.
        </p>
      </div>

      <div className="cora-neighborhood-grid">
        {neighborhoods.map((n) => (
          <div
            key={n.id}
            onClick={() => onSelectNeighborhood(n.slug)}
            className="cora-neighborhood-card"
            role="button"
            tabIndex={0}
          >
            <img
              src={n.image}
              alt={n.name}
              className="cora-neighborhood-card-img"
            />
            <div className="cora-neighborhood-card-overlay" />
            <div className="cora-neighborhood-card-content">
              <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--cora-accent-light)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {n.city} · {n.totalProperties} Imóveis Disponíveis
              </span>
              <h3 style={{ fontSize: "28px", color: "#fff", margin: "2px 0" }}>{n.name}</h3>
              <p style={{ fontSize: "13.5px", color: "var(--cora-stone-light)", margin: 0 }}>
                Valor Médio: R$ {n.averagePricePerM2.toLocaleString("pt-BR")}/m²
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NeighborhoodDetailPage({
  slug,
  onNavigateHome,
  onNavigateNeighborhoods,
  onSelectProperty,
}: {
  slug: string;
  onNavigateHome: () => void;
  onNavigateNeighborhoods: () => void;
  onSelectProperty: (p: Property) => void;
}) {
  const { neighborhoods, properties } = useCora();

  const neighborhood = neighborhoods.find((n) => n.slug === slug) || neighborhoods[0];
  const neighborhoodProperties = properties.filter(
    (p) => p.neighborhood.toLowerCase() === neighborhood.name.toLowerCase()
  );

  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Bairros", onClick: onNavigateNeighborhoods },
          { label: neighborhood.name },
        ]}
      />

      <div style={{ position: "relative", height: "380px", borderRadius: "var(--radius-lg)", overflow: "hidden", margin: "24px 0 48px" }}>
        <img
          src={neighborhood.image}
          alt={neighborhood.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)" }}
        />
        <div style={{ position: "absolute", bottom: "36px", left: "36px", right: "36px", color: "#fff" }}>
          <span className="cora-eyebrow" style={{ color: "var(--cora-accent-light)" }}>Guia de Bairro</span>
          <h1 style={{ fontSize: "clamp(34px, 4.5vw, 64px)", color: "#fff", margin: "4px 0" }}>{neighborhood.name}</h1>
          <p style={{ color: "var(--cora-stone-light)", fontSize: "16px", maxWidth: "680px", margin: 0 }}>
            {neighborhood.headline}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "48px", marginBottom: "60px" }}>
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Viver em {neighborhood.name}</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.75", color: "var(--cora-muted-dark)" }}>
            {neighborhood.description}
          </p>

          <h3 style={{ fontSize: "18px", marginTop: "28px", marginBottom: "14px" }}>Destaques do Estilo de Vida</h3>
          <ul style={{ paddingLeft: "20px", display: "grid", gap: "8px", color: "var(--cora-ink)" }}>
            {neighborhood.lifestyleHighlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: "var(--cora-white)", padding: "32px", borderRadius: "var(--radius-md)", border: "1px solid var(--cora-border)" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>Pontos de Interesse & Comodidades</h3>
          <div style={{ display: "grid", gap: "16px" }}>
            {neighborhood.pointsOfInterest.map((cat, idx) => (
              <div key={idx}>
                <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--cora-accent)" }}>
                  {cat.category}
                </span>
                <p style={{ margin: "4px 0 0", fontSize: "13.5px", color: "var(--cora-muted-dark)" }}>
                  {cat.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IMÓVEIS NO BAIRRO */}
      <div>
        <h2 style={{ fontSize: "26px", marginBottom: "28px" }}>
          Imóveis Disponíveis em {neighborhood.name} ({neighborhoodProperties.length})
        </h2>
        {neighborhoodProperties.length === 0 ? (
          <p style={{ color: "var(--cora-muted)" }}>Nenhum imóvel disponível neste bairro no momento.</p>
        ) : (
          <div className="cora-property-grid">
            {neighborhoodProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ConsultantsPage({
  onNavigateHome,
  onSelectConsultant,
}: {
  onNavigateHome: () => void;
  onSelectConsultant: (consultant: any) => void;
}) {
  const { consultants, openLeadConsultantModal } = useCora();

  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Consultores" },
        ]}
      />

      <div style={{ margin: "20px 0 40px" }}>
        <span className="cora-eyebrow">Equipe Especializada</span>
        <h1 style={{ fontSize: "clamp(32px, 4.2vw, 54px)", margin: "4px 0 12px" }}>
          Consultores Especialistas Cora
        </h1>
        <p style={{ color: "var(--cora-muted)", fontSize: "16px", margin: 0, maxWidth: "680px" }}>
          Profissionais experientes, dedicados a cada microrregião de São Paulo para conduzir sua negociação com discrição e ética.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "28px" }}>
        {consultants.map((c) => (
          <div
            key={c.id}
            style={{
              background: "var(--cora-white)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--cora-border)",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "var(--cora-shadow-card)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <img
                src={c.photo}
                alt={c.name}
                style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 2px" }}>{c.name}</h3>
                <span style={{ fontSize: "12px", color: "var(--cora-accent)", fontWeight: 700 }}>{c.role}</span>
                <small style={{ display: "block", color: "var(--cora-muted)", fontSize: "11px" }}>{c.creci}</small>
              </div>
            </div>

            <p style={{ color: "var(--cora-muted-dark)", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
              {c.bio}
            </p>

            <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1px solid var(--cora-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "var(--cora-muted)" }}>
                📍 {c.regions.join(", ")}
              </span>
              <button
                type="button"
                onClick={() => openLeadConsultantModal(c)}
                className="cora-btn cora-btn-primary"
                style={{ minHeight: "36px", padding: "0 14px", fontSize: "12px" }}
              >
                Falar Conosco
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutPage({ onNavigateHome, onNavigateProperties }: { onNavigateHome: () => void; onNavigateProperties: () => void }) {
  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Manifesto & Sobre" },
        ]}
      />

      <div style={{ maxWidth: "840px", margin: "30px auto 0" }}>
        <span className="cora-eyebrow">Manifesto Cora Imóveis</span>
        <h1 style={{ fontSize: "clamp(34px, 4.8vw, 62px)", lineHeight: "1.06", margin: "12px 0 32px" }}>
          Imóveis são sobre metros quadrados. Morar é sobre muito mais.
        </h1>

        <div style={{ display: "grid", gap: "24px", fontSize: "16px", lineHeight: "1.8", color: "var(--cora-muted-dark)" }}>
          <p>
            Acreditamos que a escolha de um imóvel não é apenas uma transação patrimonial; é o desenho do cenário onde os próximos capítulos da sua vida serão vividos. O café da manhã na varanda, o silêncio após um dia intenso, o espaço para receber quem se ama.
          </p>
          <p>
            A <b>Cora Imóveis</b> nasceu para desmistificar o mercado de alto padrão, eliminando a burocracia desnecessária, os termos vagos e a pressão comercial insistente. Construímos uma plataforma onde o protagonista é o imóvel e a sua experiência de busca.
          </p>
          <blockquote
            style={{
              fontSize: "20px",
              fontStyle: "italic",
              color: "var(--cora-accent-dark)",
              borderLeft: "3px solid var(--cora-accent)",
              paddingLeft: "24px",
              margin: "16px 0",
            }}
          >
            “Nosso compromisso é com a verdade das informações, a curadoria de arquitetura autoral e o respeito ao tempo de cada cliente.”
          </blockquote>
          <p>
            Seja para encontrar a primeira residência própria, expandir o espaço da família ou investir com inteligência em lançamentos de vanguarda, estamos prontos para acompanhar seu próximo passo.
          </p>
        </div>

        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <button
            type="button"
            onClick={onNavigateProperties}
            className="cora-btn cora-btn-primary"
            style={{ padding: "0 32px", minHeight: "52px" }}
          >
            Conheça Nosso Catálogo de Imóveis
          </button>
        </div>
      </div>
    </div>
  );
}

export function ContactPage({ onNavigateHome }: { onNavigateHome: () => void }) {
  const { addToast } = useCora();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Por favor, preencha nome e telefone.");
      return;
    }
    addToast("Mensagem registrada", "Nossa equipe entrará em contato em breve.");
    setName("");
    setPhone("");
    setEmail("");
    setMsg("");
  };

  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Contato" },
        ]}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", marginTop: "24px" }}>
        <div>
          <span className="cora-eyebrow">Atendimento Exclusivo</span>
          <h1 style={{ fontSize: "clamp(30px, 3.8vw, 48px)", margin: "4px 0 16px" }}>
            Estamos Prontos para Ouvir Seu Momento
          </h1>
          <p style={{ color: "var(--cora-muted)", fontSize: "15px", lineHeight: "1.7", marginBottom: "32px" }}>
            Entre em contato diretamente com nossos consultores para agendar visitas, tirar dúvidas de avaliação ou solicitar assessoria imobiliária personalizada.
          </p>

          <div style={{ display: "grid", gap: "16px", fontSize: "14px" }}>
            <div style={{ padding: "16px", background: "var(--cora-white)", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}>
              <strong style={{ display: "block", color: "var(--cora-ink)" }}>📍 Escritório Jardins (Conceitual)</strong>
              <span style={{ color: "var(--cora-muted)" }}>Alameda Franca, Jardins — São Paulo, SP</span>
            </div>

            <div style={{ padding: "16px", background: "var(--cora-white)", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}>
              <strong style={{ display: "block", color: "var(--cora-ink)" }}>📱 WhatsApp & Telefone</strong>
              <span style={{ color: "var(--cora-muted)" }}>(11) 98765-4321 · Atendimento das 08h às 20h</span>
            </div>

            <div style={{ padding: "16px", background: "var(--cora-white)", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}>
              <strong style={{ display: "block", color: "var(--cora-ink)" }}>✉️ E-mail</strong>
              <span style={{ color: "var(--cora-muted)" }}>contato@coraimoveis.com.br</span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div
          style={{
            background: "var(--cora-white)",
            padding: "36px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--cora-border)",
            boxShadow: "var(--cora-shadow-soft)",
          }}
        >
          <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>Envie uma Mensagem</h3>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            <label style={{ display: "grid", gap: "4px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
              Nome completo *
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
              />
            </label>

            <label style={{ display: "grid", gap: "4px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
              Telefone / WhatsApp *
              <input
                type="tel"
                placeholder="(11) 98765-4321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
              />
            </label>

            <label style={{ display: "grid", gap: "4px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
              E-mail
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
              />
            </label>

            <label style={{ display: "grid", gap: "4px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
              Como podemos te ajudar?
              <textarea
                rows={3}
                placeholder="Diga o que procura ou qual imóvel deseja conhecer..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)", fontFamily: "inherit" }}
              />
            </label>

            <button type="submit" className="cora-btn cora-btn-primary" style={{ marginTop: "8px" }}>
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
