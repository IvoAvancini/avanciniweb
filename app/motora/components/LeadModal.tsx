"use client";

import Image from "next/image";
import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";

export function LeadModal() {
  const { isLeadModalOpen, closeLeadModal, leadVehicle, submitLead } = useMotora();

  const [name, setName] = useState("João Silva");
  const [phone, setPhone] = useState("(11) 98765-4321");
  const [email, setEmail] = useState("joao.silva@exemplo.com");
  const [contactPreference, setContactPreference] = useState<"whatsapp" | "phone" | "email">("whatsapp");
  const [message] = useState("Olá! Gostaria de mais informações sobre este veículo e condições de compra.");

  if (!isLeadModalOpen || !leadVehicle) return null;

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      vehicleId: leadVehicle.id,
      vehicleName: `${leadVehicle.brand} ${leadVehicle.model} ${leadVehicle.version}`,
      vehiclePrice: leadVehicle.price,
      userName: name,
      userPhone: phone,
      userEmail: email,
      contactPreference,
      message,
    });
  };

  return (
    <div className="m-modal-overlay" role="presentation" onClick={closeLeadModal}>
      <div className="m-modal-card" role="presentation" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.18em", color: "#f59e0b", textTransform: "uppercase" }}>
              DEMOSTRAÇÃO DE INTERESSE
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", margin: "6px 0 0", textTransform: "uppercase" }}>
              ESTE CARRO PODE SER SEU
            </h2>
          </div>
          <button
            type="button"
            className="v-icon-btn"
            onClick={closeLeadModal}
            aria-label="Fechar"
            style={{ color: "#ffffff" }}
          >
            ✕
          </button>
        </div>

        {/* VEHICLE SUMMARY */}
        <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 16, background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 2, border: "1px solid var(--m-border-subtle)", marginBottom: 24 }}>
          <Image
            src={leadVehicle.images[0]}
            alt={leadVehicle.model}
            width={110}
            height={75}
            style={{ objectFit: "cover", borderRadius: 2 }}
          />
          <div>
            <strong style={{ fontSize: 14, color: "#ffffff", display: "block" }}>
              {leadVehicle.brand} {leadVehicle.model}
            </strong>
            <span style={{ fontSize: 11, color: "#8e8e98" }}>{leadVehicle.version} · {leadVehicle.year}</span>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#ffffff", marginTop: 4 }}>
              {formatMoney(leadVehicle.price)}
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="lead-name" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>SEU NOME COMPLETO</label>
            <input
              id="lead-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", outline: "none", fontSize: 13 }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label htmlFor="lead-phone" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>WHATSAPP / CELULAR</label>
              <input
                id="lead-phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", outline: "none", fontSize: 13 }}
              />
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <label htmlFor="lead-email" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>E-MAIL</label>
              <input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", outline: "none", fontSize: 13 }}
              />
            </div>
          </div>

          {/* PREFERÊNCIA DE CONTATO */}
          <div>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              PREFERÊNCIA DE CONTATO:
            </span>
            <div role="radiogroup" aria-label="Preferência de contato" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {[
                { id: "whatsapp", label: "WhatsApp" },
                { id: "phone", label: "Ligação" },
                { id: "email", label: "E-mail" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setContactPreference(p.id as "whatsapp" | "phone" | "email")}
                  style={{
                    padding: 8,
                    borderRadius: 2,
                    background: contactPreference === p.id ? "#ffffff" : "rgba(255,255,255,0.04)",
                    border: contactPreference === p.id ? "1px solid #ffffff" : "1px solid var(--m-border-medium)",
                    color: contactPreference === p.id ? "#000000" : "#ffffff",
                    fontSize: 11,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="m-btn m-btn-primary m-btn-full"
            style={{ marginTop: 8 }}
          >
            QUERO SER CONTATADO AGORA ➔
          </button>
        </form>
      </div>
    </div>
  );
}
