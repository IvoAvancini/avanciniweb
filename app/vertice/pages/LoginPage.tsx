"use client";

import { useState } from "react";
import { useVertice } from "../store/useVerticeStore";

interface LoginPageProps {
  onSuccess: () => void;
}

export function LoginPage({ onSuccess }: LoginPageProps) {
  const { login, addToast } = useVertice();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("joao.silva@exemplo.com");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("João Silva");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("E-mail inválido", "Por favor, digite um e-mail válido.", "error");
      return;
    }
    login(email, isRegister ? name : "João Silva");
    onSuccess();
  };

  return (
    <div style={{ padding: "90px 6vw", maxWidth: 440, margin: "0 auto", minHeight: "72vh", display: "grid", placeItems: "center" }}>
      <div style={{ width: "100%", background: "#0c0c10", padding: "40px 36px", borderRadius: 2, border: "1px solid var(--v-border-medium)", boxShadow: "0 25px 60px rgba(0,0,0,0.8)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.22em", color: "#ffffff", display: "block" }}>
            VÉRTICE
          </span>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: "10px 0 4px", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
            {isRegister ? "CRIAR SUA CONTA" : "ACESSE SUA CONTA"}
          </h1>
          <span style={{ fontSize: 11.5, color: "#8e8e93" }}>
            {isRegister ? "Tenha acesso a lançamentos e rastreio rápido." : "Digite suas credenciais para continuar."}
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
          {isRegister && (
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>SEU NOME COMPLETO</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
              />
            </div>
          )}

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>E-MAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <label style={{ fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>SENHA</label>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => addToast("Recuperação de Senha", "Link de redefinição enviado para seu e-mail.", "info")}
                  style={{ background: "transparent", border: "none", color: "#8e8e93", textDecoration: "underline", cursor: "pointer", fontSize: 11 }}
                >
                  Esqueci minha senha
                </button>
              )}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
            />
          </div>

          <button
            type="submit"
            className="v-btn v-btn-primary v-btn-full"
            style={{ marginTop: 8 }}
          >
            {isRegister ? "CRIAR CONTA" : "ENTRAR NO VÉRTICE"}
          </button>
        </form>

        <div style={{ marginTop: 28, textAlign: "center", borderTop: "1px solid var(--v-border-subtle)", paddingTop: 18, fontSize: 12, color: "#8e8e93" }}>
          {isRegister ? (
            <span>
              Já possui cadastro?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                style={{ background: "transparent", border: "none", color: "#ffffff", fontWeight: 800, cursor: "pointer", textDecoration: "underline" }}
              >
                Faça login
              </button>
            </span>
          ) : (
            <span>
              Novo por aqui?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                style={{ background: "transparent", border: "none", color: "#ffffff", fontWeight: 800, cursor: "pointer", textDecoration: "underline" }}
              >
                Cadastre-se gratuitamente
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
