"use client";

import { useVertice } from "../store/useVerticeStore";

interface AccountPageProps {
  onGoToLogin: () => void;
}

export function AccountPage({ onGoToLogin }: AccountPageProps) {
  const { user, isLoggedIn, logout, orders } = useVertice();

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  if (!isLoggedIn || !user) {
    return (
      <div style={{ padding: "140px 6vw", textAlign: "center", minHeight: "65vh" }}>
        <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.2em", color: "#8e8e93", textTransform: "uppercase" }}>
          PAINEL DE ACESSO
        </span>
        <h1 style={{ fontSize: "clamp(26px, 3.2vw, 42px)", fontWeight: 900, color: "#ffffff", margin: "12px 0 16px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
          ACESSO À SUA CONTA
        </h1>
        <p style={{ color: "#a1a1aa", maxWidth: 440, margin: "0 auto 32px", fontSize: 14.5, lineHeight: 1.6 }}>
          Acesse para acompanhar seus pedidos em tempo real, gerenciar endereços e visualizar seu histórico.
        </p>
        <button
          type="button"
          className="v-btn v-btn-primary"
          onClick={onGoToLogin}
        >
          FAZER LOGIN
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "50px 6vw 100px", maxWidth: 1100, margin: "0 auto" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, borderBottom: "1px solid var(--v-border-subtle)", paddingBottom: 24 }}>
        <div>
          <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.18em", color: "#8e8e93", textTransform: "uppercase" }}>
            PAINEL DO CLIENTE
          </span>
          <h1 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: "#ffffff", textTransform: "uppercase", margin: "6px 0 0", letterSpacing: "-0.03em" }}>
            OLÁ, {user.name}
          </h1>
          <span style={{ fontSize: 12, color: "#8e8e93", marginTop: 4, display: "block" }}>
            {user.email} · {user.phone}
          </span>
        </div>

        <button
          type="button"
          className="v-btn v-btn-secondary v-btn-sm"
          onClick={logout}
        >
          ENCERRAR SESSÃO
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 48, alignItems: "start" }}>
        {/* ORDERS LIST */}
        <div>
          <h2 style={{ fontSize: 14.5, fontWeight: 900, color: "#ffffff", textTransform: "uppercase", marginBottom: 20, letterSpacing: "0.08em" }}>
            MEUS PEDIDOS ({orders.length})
          </h2>

          <div style={{ display: "grid", gap: 16 }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: "#0c0c10",
                  padding: 24,
                  borderRadius: 2,
                  border: "1px solid var(--v-border-subtle)",
                  display: "grid",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--v-border-subtle)", paddingBottom: 12 }}>
                  <div>
                    <strong style={{ color: "#ffffff", fontSize: 14 }}>Pedido #{order.id}</strong>
                    <span style={{ color: "#71717a", fontSize: 11, display: "block" }}>{order.date}</span>
                  </div>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 2,
                      fontSize: 9.5,
                      fontWeight: 900,
                      letterSpacing: "0.1em",
                      background: order.status === "ENTREGUE" ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.08)",
                      color: order.status === "ENTREGUE" ? "#34d399" : "#ffffff",
                      border: "1px solid currentColor",
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div style={{ display: "grid", gap: 10 }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <img src={item.image} alt={item.productName} style={{ width: 44, height: 48, objectFit: "cover", borderRadius: 2, background: "#18181b" }} />
                      <div style={{ flex: 1, fontSize: 12 }}>
                        <strong style={{ color: "#ffffff" }}>{item.productName}</strong>
                        <span style={{ color: "#8e8e93", display: "block", fontSize: 11 }}>
                          Tam: {item.size} · Cor: {item.color} · Qtd: {item.quantity}
                        </span>
                      </div>
                      <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 12 }}>
                        {formatMoney(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--v-border-subtle)", paddingTop: 12, fontSize: 12 }}>
                  <span style={{ color: "#8e8e93" }}>
                    Rastreio: <strong style={{ color: "#ffffff" }}>{order.trackingCode}</strong>
                  </span>
                  <strong style={{ color: "#ffffff", fontSize: 15 }}>{formatMoney(order.total)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADDRESSES & PROFILE */}
        <div style={{ display: "grid", gap: 24 }}>
          <div style={{ background: "#0c0c10", padding: 24, borderRadius: 2, border: "1px solid var(--v-border-subtle)", display: "grid", gap: 12 }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 900, color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ENDEREÇO DE ENTREGA
            </h3>
            {user.addresses.map((addr) => (
              <div key={addr.id} style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.6 }}>
                <strong style={{ color: "#ffffff", display: "block" }}>{addr.name}</strong>
                {addr.street}, {addr.number} {addr.complement && `· ${addr.complement}`}
                <br />
                {addr.neighborhood} · {addr.city} - {addr.state}
                <br />
                CEP: {addr.zipCode}
              </div>
            ))}
          </div>

          <div style={{ background: "#0c0c10", padding: 24, borderRadius: 2, border: "1px solid var(--v-border-subtle)", display: "grid", gap: 12 }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 900, color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              PREFERÊNCIAS
            </h3>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#cbd5e1", cursor: "pointer" }}>
              <input type="checkbox" defaultChecked />
              Receber novidades e drops exclusivos por e-mail
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#cbd5e1", cursor: "pointer" }}>
              <input type="checkbox" defaultChecked />
              Notificações de rastreamento via WhatsApp
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
