"use client";

import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";

export function ContactPage() {
  const { openWhatsAppModal, addToast } = useMotora();

  const [name, setName] = useState("João Silva");
  const [phone, setPhone] = useState("(11) 98765-4321");
  const [email, setEmail] = useState("joao.silva@exemplo.com");
  const [subject, setSubject] = useState("Quero Comprar um Veículo");
  const [message, setMessage] = useState("Gostaria de saber mais sobre as condições de financiamento e modelos disponíveis.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Mensagem Enviada!", "Nossa equipe executiva entrará em contato em instantes.", "success");
    setMessage("");
  };

  return (
    <div style={{ paddingBottom: 100, background: "var(--m-light-bg)" }}>
      {/* HERO INSTITUCIONAL ESCURO */}
      <div style={{ padding: "clamp(48px, 6vw, 72px) var(--m-gutter) clamp(32px, 4vw, 48px)", background: "#090a0f", color: "#ffffff", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "var(--m-brand-amber-light)", textTransform: "uppercase" }}>
            CENTRAL DE RELACIONAMENTO · ATENDIMENTO EXCLUSIVO
          </span>
          <h1 style={{ fontSize: "clamp(26px, 3.8vw, 48px)", fontWeight: 900, color: "#ffffff", margin: "8px 0 12px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            FALE COM A MOTORA.
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: 640, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Estamos prontos para atender você com exclusividade. Escolha o canal de sua preferência ou envie uma mensagem direta para nossa equipe de consultores.
          </p>
        </div>
      </div>

      <div className="motora-container" style={{ padding: "clamp(36px, 5vw, 60px) var(--m-gutter)", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
        {/* CHANNELS */}
        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ background: "#ffffff", padding: 24, borderRadius: 10, border: "1px solid var(--m-light-border)", display: "grid", gap: 6, boxShadow: "var(--m-shadow-subtle)" }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: "#d97706", textTransform: "uppercase" }}>CANAL DIRETO</span>
            <strong style={{ fontSize: 18, color: "#0f172a" }}>WhatsApp Concessionária</strong>
            <p style={{ fontSize: 13.5, color: "#64748b", margin: 0 }}>Atendimento em tempo real com consultor dedicado.</p>
            <button type="button" className="m-btn m-btn-primary m-btn-sm" style={{ marginTop: 8 }} onClick={openWhatsAppModal}>
              INICIAR CHAT WHATSAPP ➔
            </button>
          </div>

          <div style={{ background: "#ffffff", padding: 24, borderRadius: 10, border: "1px solid var(--m-light-border)", display: "grid", gap: 6, boxShadow: "var(--m-shadow-subtle)" }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: "#64748b", textTransform: "uppercase" }}>TELEFONE MATRIZ</span>
            <strong style={{ fontSize: 18, color: "#0f172a" }}>0800 700 8090</strong>
            <p style={{ fontSize: 13.5, color: "#64748b", margin: 0 }}>Segunda a Sábado, das 08h às 20h.</p>
          </div>

          <div style={{ background: "#ffffff", padding: 24, borderRadius: 10, border: "1px solid var(--m-light-border)", display: "grid", gap: 6, boxShadow: "var(--m-shadow-subtle)" }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: "#64748b", textTransform: "uppercase" }}>E-MAIL EXECUTIVO</span>
            <strong style={{ fontSize: 16, color: "#0f172a" }}>atendimento@motora.com.br</strong>
            <p style={{ fontSize: 13.5, color: "#64748b", margin: 0 }}>Retorno em até 2 horas úteis.</p>
          </div>
        </div>

        {/* FORM */}
        <div style={{ background: "#ffffff", padding: "clamp(24px, 4vw, 36px)", borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", marginBottom: 18 }}>
            ENVIE UMA MENSAGEM
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>NOME COMPLETO</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "10px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              <div style={{ display: "grid", gap: 5 }}>
                <label style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>TELEFONE / WHATSAPP</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "10px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                />
              </div>
              <div style={{ display: "grid", gap: 5 }}>
                <label style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>E-MAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "10px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>ASSUNTO</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "10px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
              >
                <option value="Quero Comprar um Veículo">Quero Comprar um Veículo</option>
                <option value="Avaliação de Usado na Troca">Avaliação de Usado na Troca</option>
                <option value="Dúvidas sobre Financiamento">Dúvidas sobre Financiamento</option>
                <option value="Agendamento de Test-Drive">Agendamento de Test-Drive</option>
                <option value="Pós-Venda e Oficina">Pós-Venda e Oficina</option>
              </select>
            </div>

            <div style={{ display: "grid", gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>MENSAGEM</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "10px 14px", color: "#0f172a", fontSize: 13.5, resize: "vertical", outline: "none" }}
              />
            </div>

            <button type="submit" className="m-btn m-btn-primary m-btn-full" style={{ marginTop: 6 }}>
              ENVIAR MENSAGEM ➔
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
