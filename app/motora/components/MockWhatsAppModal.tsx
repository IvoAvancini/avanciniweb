"use client";

import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";

interface MockWhatsAppModalProps {
  onSelectOption: (view: string, param?: string) => void;
}

export function MockWhatsAppModal({ onSelectOption }: MockWhatsAppModalProps) {
  const { isWhatsAppModalOpen, closeWhatsAppModal, addToast } = useMotora();
  const [userMsg, setUserMsg] = useState("");
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([
    {
      sender: "bot",
      text: "Olá! Seja bem-vindo à central de atendimento exclusivo MOTORA. Como podemos acelerar sua jornada hoje?",
    },
  ]);

  if (!isWhatsAppModalOpen) return null;

  const handleOptionClick = (optLabel: string, view: string, param?: string) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: optLabel },
      { sender: "bot", text: `Perfeito! Redirecionando você para ${optLabel.toLowerCase()}...` },
    ]);
    setTimeout(() => {
      closeWhatsAppModal();
      onSelectOption(view, param);
    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMsg.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg },
      { sender: "bot", text: "Mensagem recebida! Um de nossos consultores executivos responderá em instantes." },
    ]);
    setUserMsg("");
    addToast("Mensagem enviada", "Consultor MOTORA notificado com sucesso.", "success");
  };

  return (
    <div className="m-whatsapp-modal-overlay" onClick={closeWhatsAppModal}>
      <div className="m-whatsapp-card" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="m-whatsapp-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#25d366" }} />
            <div>
              <strong style={{ fontSize: 13, color: "#ffffff", display: "block" }}>Consultor MOTORA</strong>
              <span style={{ fontSize: 10.5, color: "#94a3b8" }}>Atendimento Oficial Online</span>
            </div>
          </div>
          <button
            type="button"
            className="v-icon-btn"
            onClick={closeWhatsAppModal}
            aria-label="Fechar WhatsApp"
            style={{ color: "#ffffff" }}
          >
            ✕
          </button>
        </div>

        {/* CHAT MESSAGES */}
        <div className="m-whatsapp-chat-body">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className="m-chat-bubble"
              style={{
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                background: m.sender === "user" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
                border: m.sender === "user" ? "1px solid rgba(255,255,255,0.3)" : "1px solid var(--m-border-subtle)",
              }}
            >
              {m.text}
            </div>
          ))}

          {/* QUICK OPTIONS */}
          <div className="m-chat-options">
            <button
              type="button"
              className="m-chat-opt-btn"
              onClick={() => handleOptionClick("Quero Comprar um Carro", "vehicles")}
            >
              🚗 1. Quero Comprar um Veículo
            </button>
            <button
              type="button"
              className="m-chat-opt-btn"
              onClick={() => handleOptionClick("Quero Vender / Troca", "tradein")}
            >
              🔄 2. Quero Dar meu Usado na Troca
            </button>
            <button
              type="button"
              className="m-chat-opt-btn"
              onClick={() => handleOptionClick("Simular Financiamento", "financing")}
            >
              💳 3. Quero Simular Financiamento
            </button>
            <button
              type="button"
              className="m-chat-opt-btn"
              onClick={() => handleOptionClick("Agendar Test-Drive", "testdrive")}
            >
              🏁 4. Quero Agendar um Test-Drive
            </button>
            <button
              type="button"
              className="m-chat-opt-btn"
              onClick={() => handleOptionClick("Ver Nossas Lojas", "stores")}
            >
              📍 5. Falar com uma Loja Específica
            </button>
          </div>

          {/* CHAT INPUT */}
          <form onSubmit={handleSendMessage} style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input
              type="text"
              placeholder="Digite sua dúvida..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--m-border-medium)",
                borderRadius: 4,
                padding: "8px 12px",
                color: "#ffffff",
                fontSize: 12,
                outline: "none",
              }}
            />
            <button type="submit" className="m-btn m-btn-primary m-btn-sm" style={{ padding: "8px 14px" }}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
