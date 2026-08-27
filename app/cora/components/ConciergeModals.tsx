import React, { useState } from "react";
import { useCora } from "../store/useCoraStore";

export function MockWhatsAppModal({ onNavigate }: { onNavigate?: (view: string, param?: string) => void }) {
  const { isWhatsAppOpen, closeWhatsAppModal, openVisitModal, addToast } = useCora();
  const [activeStep, setActiveStep] = useState<"menu" | "chat">("menu");
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([
    {
      sender: "bot",
      text: "Olá! Seja bem-vindo à Cora Imóveis. Como podemos ajudar você hoje?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  if (!isWhatsAppOpen) return null;

  const handleSelectOption = (optionText: string, actionType?: string) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: optionText },
    ]);
    setActiveStep("chat");

    setTimeout(() => {
      let botReply = "Com certeza! Um de nossos consultores especializados entrará em contato para te acompanhar.";
      if (actionType === "agendar") {
        botReply = "Excelente! Vamos abrir o formulário de agendamento de visita para você escolher dia e horário.";
        setTimeout(() => {
          closeWhatsAppModal();
          openVisitModal();
        }, 1200);
      } else if (actionType === "comprar" && onNavigate) {
        botReply = "Perfeito! Estamos te redirecionando para a nossa curadoria completa de imóveis à venda.";
        setTimeout(() => {
          closeWhatsAppModal();
          onNavigate("properties", "venda");
        }, 1200);
      } else if (actionType === "alugar" && onNavigate) {
        botReply = "Ótimo! Veja nossas opções de imóveis prontos para locação de alto padrão.";
        setTimeout(() => {
          closeWhatsAppModal();
          onNavigate("properties", "locacao");
        }, 1200);
      } else if (actionType === "anunciar" && onNavigate) {
        botReply = "Excelente! Abrindo a página exclusiva para proprietários anunciarem com a Cora.";
        setTimeout(() => {
          closeWhatsAppModal();
          onNavigate("submit-property");
        }, 1200);
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botReply },
      ]);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const text = inputVal;
    setInputVal("");

    setMessages((prev) => [...prev, { sender: "user", text }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Entendido! Registramos sua mensagem: "${text}". Um consultor da Cora entrará em contato em breve via WhatsApp.`,
        },
      ]);
      addToast("Mensagem enviada", "Nossa equipe entrará em contato em instantes.");
    }, 800);
  };

  return (
    <div className="cora-modal-overlay" onClick={closeWhatsAppModal}>
      <div
        className="cora-modal-card"
        style={{
          maxWidth: "420px",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: "none",
          boxShadow: "0 25px 80px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER WHATSAPP */}
        <div
          style={{
            background: "#075e54",
            color: "#fff",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "var(--cora-accent)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: "16px",
                fontFamily: "var(--cora-font-display)",
              }}
            >
              C
            </div>
            <div>
              <strong style={{ fontSize: "14.5px", display: "block" }}>Cora Imóveis</strong>
              <small style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)" }}>
                ● Online · Atendimento humanizado
              </small>
            </div>
          </div>
          <button
            type="button"
            onClick={closeWhatsAppModal}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* CHAT BODY */}
        <div
          style={{
            background: "#efeae2",
            padding: "20px",
            height: "360px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                background: m.sender === "user" ? "#d9fdd3" : "#fff",
                color: "#111b21",
                padding: "10px 14px",
                borderRadius: "10px",
                maxWidth: "85%",
                fontSize: "13.5px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                lineHeight: "1.45",
              }}
            >
              {m.text}
            </div>
          ))}

          {activeStep === "menu" && (
            <div style={{ display: "grid", gap: "8px", marginTop: "10px" }}>
              {[
                { text: "🔑 Comprar um imóvel", action: "comprar" },
                { text: "🏠 Alugar um imóvel", action: "alugar" },
                { text: "📅 Agendar visita exclusiva", action: "agendar" },
                { text: "📢 Anunciar meu imóvel", action: "anunciar" },
                { text: "💬 Falar com consultor agora", action: "consultor" },
              ].map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt.text, opt.action)}
                  style={{
                    background: "#fff",
                    border: "1px solid #d1d7db",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#111b21",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f2f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CHAT INPUT */}
        <form
          onSubmit={handleSendMessage}
          style={{
            background: "#f0f2f5",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Digite uma mensagem..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            style={{
              flex: 1,
              height: "40px",
              padding: "0 14px",
              borderRadius: "20px",
              border: "none",
              background: "#fff",
              fontSize: "13.5px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#075e54",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
            }}
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}

export function LeadConsultantModal() {
  const { isLeadConsultantOpen, closeLeadConsultantModal, selectedConsultant, addToast } = useCora();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (!isLeadConsultantOpen || !selectedConsultant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Por favor, preencha nome e telefone.");
      return;
    }
    setSent(true);
    addToast("Mensagem enviada", `${selectedConsultant.name} entrará em contato em breve.`);
  };

  const handleClose = () => {
    closeLeadConsultantModal();
    setSent(false);
  };

  return (
    <div className="cora-modal-overlay" onClick={handleClose}>
      <div
        className="cora-modal-card"
        style={{ maxWidth: "520px", padding: "32px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="cora-modal-close-btn"
        >
          ✕
        </button>

        {!sent ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <img
                src={selectedConsultant.photo}
                alt={selectedConsultant.name}
                style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <span className="cora-eyebrow" style={{ margin: 0 }}>Consultor Cora</span>
                <h3 style={{ fontSize: "19px", margin: "2px 0" }}>{selectedConsultant.name}</h3>
                <small style={{ color: "var(--cora-muted)", fontSize: "11px" }}>{selectedConsultant.creci}</small>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
              <label style={{ display: "grid", gap: "4px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                Seu nome *
                <input
                  type="text"
                  placeholder="Nome completo"
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
                Mensagem
                <textarea
                  rows={3}
                  placeholder={`Olá, ${selectedConsultant.name}! Gostaria de mais informações sobre este imóvel.`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)", fontFamily: "inherit" }}
                />
              </label>

              <button type="submit" className="cora-btn cora-btn-primary" style={{ marginTop: "8px" }}>
                Enviar Mensagem para {selectedConsultant.name.split(" ")[0]}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>✉️</div>
            <h3 style={{ fontSize: "22px", margin: "8px 0" }}>Mensagem Enviada!</h3>
            <p style={{ color: "var(--cora-muted)", fontSize: "14px", marginBottom: "20px" }}>
              {selectedConsultant.name} recebeu sua mensagem e entrará em contato em breve através do WhatsApp informado.
            </p>
            <button type="button" onClick={handleClose} className="cora-btn cora-btn-primary">
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
