"use client";

import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";
import { TestDriveBooking } from "../types";

export function TestDrivePage() {
  const { vehicles, submitTestDrive } = useMotora();

  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || "");
  const [storeName, setStoreName] = useState("Unidade Jardins · Av. Europa, 850");
  const [date, setDate] = useState("2026-08-29");
  const [time, setTime] = useState("14:30");
  const [name, setName] = useState("João Silva");
  const [phone, setPhone] = useState("(11) 98765-4321");
  const [email] = useState("joao.silva@exemplo.com");

  const [lastBooking, setLastBooking] = useState<TestDriveBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const veh = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
    const res = submitTestDrive({
      vehicleId: veh.id,
      vehicleName: `${veh.brand} ${veh.model} ${veh.version}`,
      storeName,
      date,
      time,
      userName: name,
      userPhone: phone,
      userEmail: email,
    });
    setLastBooking(res);
  };

  return (
    <div style={{ paddingBottom: 100, background: "var(--m-light-bg)" }}>
      {/* HERO INSTITUCIONAL ESCURO */}
      <div style={{ padding: "clamp(48px, 6vw, 72px) var(--m-gutter) clamp(32px, 4vw, 48px)", background: "#090a0f", color: "#ffffff", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <div className="motora-container" style={{ padding: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "var(--m-brand-amber-light)", textTransform: "uppercase" }}>
            EXPERIÊNCIA EXCLUSIVA · AGENDAMENTO VIP
          </span>
          <h1 style={{ fontSize: "clamp(26px, 3.8vw, 48px)", fontWeight: 900, color: "#ffffff", margin: "8px 0 12px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            VIVA O CARRO ANTES DE DECIDIR.
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: 640, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Sinta a aceleração, a ergonomia e o conforto a bordo. Agende seu test-drive VIP com atendimento reservado e rota de pilotagem preparada.
          </p>
        </div>
      </div>

      {/* FORMULÁRIO EM CARD BRANCO */}
      <div className="motora-container" style={{ padding: "clamp(36px, 5vw, 60px) var(--m-gutter)", maxWidth: 860, margin: "0 auto" }}>
        {lastBooking ? (
          <div style={{ background: "#ffffff", padding: "clamp(24px, 4vw, 44px)", borderRadius: 10, border: "1px solid #bbf7d0", textAlign: "center", display: "grid", gap: 16, boxShadow: "var(--m-shadow-subtle)" }}>
            <span style={{ fontSize: 36 }}>🏁</span>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: 0, textTransform: "uppercase" }}>
              TEST-DRIVE AGENDADO COM SUCESSO!
            </h2>
            <p style={{ color: "#64748b", fontSize: 14.5 }}>
              Confirmamos seu agendamento para <strong>{lastBooking.vehicleName}</strong> na <strong>{lastBooking.storeName}</strong>.
            </p>
            <div style={{ background: "#f8fafc", padding: 20, borderRadius: 6, border: "1px solid #e2e8f0", display: "grid", gap: 8, textAlign: "left", maxWidth: 460, margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#475569" }}>
                <span>Data & Horário:</span>
                <strong style={{ color: "#0f172a" }}>{lastBooking.date} às {lastBooking.time}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#475569" }}>
                <span>Código da Reserva:</span>
                <strong style={{ color: "#d97706" }}>{lastBooking.id}</strong>
              </div>
            </div>
            <button type="button" className="m-btn m-btn-primary" style={{ margin: "14px auto 0" }} onClick={() => setLastBooking(null)}>
              AGENDAR OUTRO TEST-DRIVE
            </button>
          </div>
        ) : (
          <div style={{ background: "#ffffff", padding: "clamp(24px, 4vw, 40px)", borderRadius: 10, border: "1px solid var(--m-light-border)", boxShadow: "var(--m-shadow-subtle)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", marginBottom: 20 }}>
              SELECIONE O VEÍCULO & LOCAL DE PREFERÊNCIA
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="tdp-vehicle" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>VEÍCULO DE INTERESSE</label>
                <select
                  id="tdp-vehicle"
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.model} ({v.version} - {v.year})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="tdp-store" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>CONCESSIONÁRIA MOTORA</label>
                <select
                  id="tdp-store"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                >
                  <option value="Unidade Jardins · Av. Europa, 850">Unidade Jardins · Av. Europa, 850</option>
                  <option value="Unidade Morumbi · Av. Giovanni Gronchi, 4500">Unidade Morumbi · Av. Giovanni Gronchi, 4500</option>
                  <option value="Unidade Alphaville · Al. Rio Negro, 1200">Unidade Alphaville · Al. Rio Negro, 1200</option>
                  <option value="Unidade Campinas · Av. José de Souza Campos, 900">Unidade Campinas · Av. José de Souza Campos, 900</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tdp-date" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>DATA</label>
                  <input
                    id="tdp-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tdp-time" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>HORÁRIO</label>
                  <select
                    id="tdp-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  >
                    <option value="09:00">09:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:30">14:30</option>
                    <option value="16:00">16:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tdp-name" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>SEU NOME</label>
                  <input
                    id="tdp-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="tdp-phone" style={{ fontSize: 11, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>WHATSAPP</label>
                  <input
                    id="tdp-phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{ background: "#f8fafc", border: "1px solid var(--m-light-border)", borderRadius: 4, padding: "11px 14px", color: "#0f172a", fontSize: 13.5, outline: "none" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="m-btn m-btn-primary m-btn-full"
                style={{ marginTop: 8 }}
              >
                CONFIRMAR AGENDAMENTO VIP ➔
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
