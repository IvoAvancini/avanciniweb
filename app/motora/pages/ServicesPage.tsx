"use client";

import { useMotora } from "../store/useMotoraStore";

export function ServicesPage() {
  const { openWhatsAppModal, addToast } = useMotora();

  const services = [
    { title: "Revisão Periódica", icon: "🔧", desc: "Checklist de 120 itens com scanner eletrônico de última geração e garantia de fábrica mantida." },
    { title: "Troca de Óleo e Fluidos", icon: "🛢️", desc: "Lubrificantes 100% sintéticos homologados pelas montadoras e filtros originais." },
    { title: "Freios e Suspensão", icon: "⚙️", desc: "Troca de pastilhas, discos, amortecedores e inspeção completa do sistema ABS/ESP." },
    { title: "Pneus & Alinhamento 3D", icon: "🏎️", desc: "Geometria a laser de alta precisão, balanceamento dinâmico e pneus das melhores marcas." },
    { title: "Funilaria & Pintura Express", icon: "🎨", desc: "Laboratório de tintometria computadorizada, cabine de secagem e reparo rápido de pequenos danos." },
    { title: "Estética & Detailing", icon: "✨", desc: "Vitrificação de pintura 9H, polimento técnico, higienização interna e hidratação de couro." },
    { title: "Blindagem e Revisão", icon: "🛡️", desc: "Manutenção de vidros delaminados, revisão de fechaduras, amortecedores reforçados e documentação." },
    { title: "Peças & Acessórios", icon: "📦", desc: "Estoque a pronta-entrega de peças genuínas, engates, películas solares térmicas e módulos eletrônicos." },
  ];

  const handleScheduleService = (serviceName: string) => {
    addToast("Agendamento Solicitado", `Consultor de pós-venda para ${serviceName} notificado.`, "success");
    openWhatsAppModal();
  };

  return (
    <div style={{ paddingBottom: 100, background: "var(--m-light-bg)" }}>
      {/* HERO INSTITUCIONAL ESCURO */}
      <div style={{ padding: "clamp(48px, 6vw, 72px) var(--m-gutter) clamp(32px, 4vw, 48px)", background: "#090a0f", color: "#ffffff", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "var(--m-brand-amber-light)", textTransform: "uppercase" }}>
            OFICINA & PÓS-VENDA ESPECIALIZADO
          </span>
          <h1 style={{ fontSize: "clamp(26px, 3.8vw, 48px)", fontWeight: 900, color: "#ffffff", margin: "8px 0 12px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            SEU CARRO CONTINUA SENDO NOSSA PRIORIDADE.
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: 640, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Infraestrutura completa de oficina mecânica com engenheiros certificados, tecnologia de diagnóstico digital e peças genuínas.
          </p>
        </div>
      </div>

      {/* CARDS DE SERVIÇOS EM BASE CLARA */}
      <div className="motora-container" style={{ padding: "clamp(36px, 5vw, 60px) var(--m-gutter)", display: "grid", gap: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {services.map((srv, idx) => (
            <div
              key={idx}
              style={{
                background: "#ffffff",
                padding: "clamp(20px, 3vw, 28px)",
                borderRadius: 10,
                border: "1px solid var(--m-light-border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 16,
                boxShadow: "var(--m-shadow-subtle)",
              }}
            >
              <div>
                <span style={{ fontSize: 28, display: "block", marginBottom: 10 }}>{srv.icon}</span>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>{srv.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.55, margin: 0 }}>{srv.desc}</p>
              </div>

              <button
                type="button"
                className="m-btn m-btn-secondary m-btn-sm m-btn-full"
                onClick={() => handleScheduleService(srv.title)}
              >
                AGENDAR SERVIÇO ➔
              </button>
            </div>
          ))}
        </div>

        {/* CTA BANNER */}
        <div style={{ textAlign: "center", background: "#ffffff", padding: "clamp(32px, 5vw, 48px) 24px", borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", margin: "0 0 8px 0" }}>
            CONSULTORIA TÉCNICA VIA WHATSAPP
          </h2>
          <p style={{ color: "#64748b", maxWidth: 500, margin: "0 auto 24px", fontSize: 14, lineHeight: 1.55 }}>
            Tire dúvidas mecânicas, consulte disponibilidade de peças ou orce sua revisão diretamente com nosso consultor de pós-venda.
          </p>
          <button type="button" className="m-btn m-btn-amber" onClick={openWhatsAppModal}>
            FALAR COM A OFICINA NO WHATSAPP ➔
          </button>
        </div>
      </div>
    </div>
  );
}
