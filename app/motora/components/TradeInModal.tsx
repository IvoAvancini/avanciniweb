"use client";

import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";

export function TradeInModal() {
  const { isTradeInModalOpen, closeTradeInModal, submitTradeIn } = useMotora();

  const [brand, setBrand] = useState("Toyota");
  const [model, setModel] = useState("Corolla");
  const [year, setYear] = useState("2021");
  const [version, setVersion] = useState("2.0 XEi Flex");
  const [mileage, setMileage] = useState(48000);
  const [color, setColor] = useState("Prata");
  const [city, setCity] = useState("São Paulo - SP");
  const [userName, setUserName] = useState("João Silva");
  const [userPhone, setUserPhone] = useState("(11) 98765-4321");
  const [userEmail, setUserEmail] = useState("joao.silva@exemplo.com");

  if (!isTradeInModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTradeIn({
      brand,
      model,
      year,
      version,
      mileage,
      color,
      city,
      userName,
      userPhone,
      userEmail,
    });
  };

  return (
    <div className="m-modal-overlay" onClick={closeTradeInModal}>
      <div className="m-modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.18em", color: "#f59e0b", textTransform: "uppercase" }}>
              AVALIAÇÃO DE USADOS
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", margin: "6px 0 0", textTransform: "uppercase" }}>
              SEU CARRO ENTRA NA TROCA
            </h2>
            <span style={{ fontSize: 11.5, color: "#8e8e98", marginTop: 2, display: "block" }}>
              Pagamos até 100% da tabela FIPE na troca pelo seu próximo MOTORA.
            </span>
          </div>
          <button
            type="button"
            className="v-icon-btn"
            onClick={closeTradeInModal}
            aria-label="Fechar"
            style={{ color: "#ffffff" }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>MARCA</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
              />
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>MODELO</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>ANO</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
              />
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>KM ATUAL</label>
              <input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(Number(e.target.value))}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
              />
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>COR</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>SEU NOME</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
              />
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>WHATSAPP</label>
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="m-btn m-btn-primary m-btn-full"
            style={{ marginTop: 8 }}
          >
            SOLICITAR PROPOSTA DE AVALIAÇÃO ➔
          </button>
        </form>
      </div>
    </div>
  );
}
