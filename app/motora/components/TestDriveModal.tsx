"use client";

import { useState } from "react";
import { useMotora } from "../store/useMotoraStore";

export function TestDriveModal() {
  const { isTestDriveModalOpen, closeTestDriveModal, testDriveVehicle, submitTestDrive } = useMotora();

  const [storeName, setStoreName] = useState("Unidade Jardins · Av. Europa, 850");
  const [date, setDate] = useState("2026-08-28");
  const [time, setTime] = useState("14:30");
  const [name, setName] = useState("João Silva");
  const [phone, setPhone] = useState("(11) 98765-4321");
  const [email] = useState("joao.silva@exemplo.com");

  if (!isTestDriveModalOpen || !testDriveVehicle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTestDrive({
      vehicleId: testDriveVehicle.id,
      vehicleName: `${testDriveVehicle.brand} ${testDriveVehicle.model}`,
      storeName,
      date,
      time,
      userName: name,
      userPhone: phone,
      userEmail: email,
    });
  };

  return (
    <div className="m-modal-overlay" role="presentation" onClick={closeTestDriveModal}>
      <div className="m-modal-card" role="presentation" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.18em", color: "#f59e0b", textTransform: "uppercase" }}>
              EXPERIÊNCIA AO VOLANTE
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", margin: "6px 0 0", textTransform: "uppercase" }}>
              VIVA O CARRO ANTES DE DECIDIR
            </h2>
          </div>
          <button
            type="button"
            className="v-icon-btn"
            onClick={closeTestDriveModal}
            aria-label="Fechar"
            style={{ color: "#ffffff" }}
          >
            ✕
          </button>
        </div>

        {/* VEHICLE SELECTED */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 2, border: "1px solid var(--m-border-subtle)", marginBottom: 20 }}>
          <strong style={{ fontSize: 14, color: "#ffffff" }}>
            {testDriveVehicle.brand} {testDriveVehicle.model} {testDriveVehicle.version}
          </strong>
          <span style={{ fontSize: 11, color: "#8e8e98", display: "block" }}>
            Motor {testDriveVehicle.engine} · {testDriveVehicle.power}
          </span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="tdm-store" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>ESCOLHA A CONCESSIONÁRIA</label>
            <select
              id="tdm-store"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              style={{ background: "#111116", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
            >
              <option value="Unidade Jardins · Av. Europa, 850">Unidade Jardins · Av. Europa, 850</option>
              <option value="Unidade Morumbi · Av. Giovanni Gronchi, 4500">Unidade Morumbi · Av. Giovanni Gronchi, 4500</option>
              <option value="Unidade Alphaville · Al. Rio Negro, 1200">Unidade Alphaville · Al. Rio Negro, 1200</option>
              <option value="Unidade Campinas · Av. José de Souza Campos, 900">Unidade Campinas · Av. José de Souza Campos, 900</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label htmlFor="tdm-date" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>DATA PREFERENCIAL</label>
              <input
                id="tdm-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
              />
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <label htmlFor="tdm-time" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>HORÁRIO</label>
              <select
                id="tdm-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ background: "#111116", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
              >
                <option value="09:00">09:00</option>
                <option value="11:00">11:00</option>
                <option value="14:30">14:30</option>
                <option value="16:00">16:00</option>
                <option value="18:00">18:00</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label htmlFor="tdm-name" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>NOME COMPLETO</label>
              <input
                id="tdm-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--m-border-medium)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontSize: 13 }}
              />
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <label htmlFor="tdm-phone" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e98", textTransform: "uppercase" }}>WHATSAPP</label>
              <input
                id="tdm-phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            CONFIRMAR AGENDAMENTO DE TEST-DRIVE ➔
          </button>
        </form>
      </div>
    </div>
  );
}
