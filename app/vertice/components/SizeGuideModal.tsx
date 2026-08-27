"use client";

import { useState } from "react";
import { useVertice } from "../store/useVerticeStore";

export function SizeGuideModal() {
  const { isSizeGuideOpen, closeSizeGuide } = useVertice();
  const [activeTab, setActiveTab] = useState<"calcados" | "camisetas" | "calcas">("calcados");

  if (!isSizeGuideOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(12px)",
        zIndex: 140,
        display: "grid",
        placeItems: "center",
        padding: "20px",
      }}
      onClick={closeSizeGuide}
    >
      <div
        style={{
          background: "#0d0d12",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8,
          maxWidth: 680,
          width: "100%",
          padding: 32,
          boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "var(--v-accent-red)" }}>
              GUIA DE MEDIDAS OFICIAL
            </span>
            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", margin: "4px 0 0 0" }}>
              TABELA DE TAMANHOS VÉRTICE
            </h3>
          </div>
          <button
            type="button"
            className="v-icon-btn"
            onClick={closeSizeGuide}
            aria-label="Fechar guia"
          >
            ✕
          </button>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
          <button
            type="button"
            className={`v-btn v-btn-sm ${activeTab === "calcados" ? "v-btn-primary" : "v-btn-secondary"}`}
            onClick={() => setActiveTab("calcados")}
          >
            Calçados
          </button>
          <button
            type="button"
            className={`v-btn v-btn-sm ${activeTab === "camisetas" ? "v-btn-primary" : "v-btn-secondary"}`}
            onClick={() => setActiveTab("camisetas")}
          >
            Camisetas & Tops
          </button>
          <button
            type="button"
            className={`v-btn v-btn-sm ${activeTab === "calcas" ? "v-btn-primary" : "v-btn-secondary"}`}
            onClick={() => setActiveTab("calcas")}
          >
            Calças & Shorts
          </button>
        </div>

        {/* TABLES */}
        {activeTab === "calcados" && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", color: "#94a3b8" }}>
                <th style={{ padding: "10px 8px" }}>BR</th>
                <th style={{ padding: "10px 8px" }}>US</th>
                <th style={{ padding: "10px 8px" }}>EUR</th>
                <th style={{ padding: "10px 8px" }}>Comprimento (cm)</th>
              </tr>
            </thead>
            <tbody style={{ color: "#e2e8f0" }}>
              {[
                ["38", "7.0", "39.5", "25.0 cm"],
                ["39", "7.5", "40.5", "25.5 cm"],
                ["40", "8.5", "41.5", "26.5 cm"],
                ["41", "9.5", "42.5", "27.5 cm"],
                ["42", "10.0", "43.5", "28.0 cm"],
                ["43", "11.0", "44.5", "29.0 cm"],
                ["44", "12.0", "45.5", "30.0 cm"],
              ].map(([br, us, eur, cm]) => (
                <tr key={br} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "10px 8px", fontWeight: 800 }}>{br}</td>
                  <td style={{ padding: "10px 8px" }}>{us}</td>
                  <td style={{ padding: "10px 8px" }}>{eur}</td>
                  <td style={{ padding: "10px 8px" }}>{cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "camisetas" && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", color: "#94a3b8" }}>
                <th style={{ padding: "10px 8px" }}>Tamanho</th>
                <th style={{ padding: "10px 8px" }}>Tórax (cm)</th>
                <th style={{ padding: "10px 8px" }}>Cintura (cm)</th>
                <th style={{ padding: "10px 8px" }}>Comprimento (cm)</th>
              </tr>
            </thead>
            <tbody style={{ color: "#e2e8f0" }}>
              {[
                ["P", "88 - 94", "76 - 82", "70 cm"],
                ["M", "95 - 102", "83 - 90", "72 cm"],
                ["G", "103 - 110", "91 - 98", "74 cm"],
                ["GG", "111 - 118", "99 - 106", "76 cm"],
              ].map(([tam, torax, cintura, comp]) => (
                <tr key={tam} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "10px 8px", fontWeight: 800 }}>{tam}</td>
                  <td style={{ padding: "10px 8px" }}>{torax}</td>
                  <td style={{ padding: "10px 8px" }}>{cintura}</td>
                  <td style={{ padding: "10px 8px" }}>{comp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "calcas" && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", color: "#94a3b8" }}>
                <th style={{ padding: "10px 8px" }}>Tamanho</th>
                <th style={{ padding: "10px 8px" }}>Cintura (cm)</th>
                <th style={{ padding: "10px 8px" }}>Quadril (cm)</th>
                <th style={{ padding: "10px 8px" }}>Gancho (cm)</th>
              </tr>
            </thead>
            <tbody style={{ color: "#e2e8f0" }}>
              {[
                ["P (38-40)", "76 - 82", "92 - 98", "98 cm"],
                ["M (42)", "83 - 90", "99 - 105", "100 cm"],
                ["G (44)", "91 - 98", "106 - 112", "102 cm"],
                ["GG (46)", "99 - 106", "113 - 120", "104 cm"],
              ].map(([tam, cintura, quad, gancho]) => (
                <tr key={tam} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "10px 8px", fontWeight: 800 }}>{tam}</td>
                  <td style={{ padding: "10px 8px" }}>{cintura}</td>
                  <td style={{ padding: "10px 8px" }}>{quad}</td>
                  <td style={{ padding: "10px 8px" }}>{gancho}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: 24, padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: 4, fontSize: 11, color: "#94a3b8" }}>
          💡 <strong>Dica de caimento:</strong> Nossas modelagens Streetwear possuem caimento propositalmente oversized (mais solto). Caso prefira ajuste tradicional ao corpo, selecione um tamanho menor.
        </div>
      </div>
    </div>
  );
}
