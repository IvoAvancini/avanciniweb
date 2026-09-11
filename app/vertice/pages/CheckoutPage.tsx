"use client";

import { useState } from "react";
import Image from "next/image";
import { useVertice } from "../store/useVerticeStore";
import { Order } from "../types";

interface CheckoutPageProps {
  onOrderCompleted: (order: Order) => void;
  onBackToCart: () => void;
}

export function CheckoutPage({ onOrderCompleted, onBackToCart }: CheckoutPageProps) {
  const { cart, cartCount, cartSubtotal, cartDiscount, cartShipping, cartTotal, createOrder } = useVertice();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [formData, setFormData] = useState({
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    zipCode: "01310-200",
    street: "Av. Paulista",
    number: "1842",
    complement: "Apto 104",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    paymentMethod: "pix" as "pix" | "credit_card" | "boleto",
    cardNumber: "**** **** **** 4892",
    cardName: "JOAO SILVA",
    cardExpiry: "12/29",
    cardCvv: "821",
  });

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleFinishOrder = () => {
    const order = createOrder(cart, formData.paymentMethod, {
      street: formData.street,
      number: formData.number,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    });
    setCreatedOrder(order);
    setStep(4);
    onOrderCompleted(order);
  };

  // SUCCESS STEP (ORDER CONFIRMED)
  if (step === 4 && createdOrder) {
    return (
      <div style={{ padding: "90px 6vw", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#ffffff", color: "#000000", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 900, margin: "0 auto 24px" }}>
          ✓
        </div>
        <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.18em", color: "#8e8e93", textTransform: "uppercase" }}>
          PEDIDO CONFIRMADO
        </span>
        <h1 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 900, color: "#ffffff", margin: "10px 0 16px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
          OBRIGADO PELA SUA COMPRA.
        </h1>
        <p style={{ color: "#a1a1aa", fontSize: 14.5, lineHeight: 1.6, marginBottom: 36 }}>
          Enviamos a confirmação detalhada para <strong>{formData.email}</strong>. Seu pedido já está sendo preparado pela nossa equipe de logística.
        </p>

        <div style={{ background: "#0c0c10", padding: 28, borderRadius: 2, border: "1px solid var(--v-border-medium)", textAlign: "left", display: "grid", gap: 14, marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8e8e93" }}>
            <span>Número do Pedido:</span>
            <strong style={{ color: "#ffffff" }}>#{createdOrder.id}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8e8e93" }}>
            <span>Código de Rastreio:</span>
            <strong style={{ color: "#ffffff" }}>{createdOrder.trackingCode}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8e8e93" }}>
            <span>Status:</span>
            <span style={{ color: "#34d399", fontWeight: 800 }}>EM PREPARAÇÃO</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8e8e93", borderTop: "1px solid var(--v-border-subtle)", paddingTop: 12 }}>
            <span>Total Pago:</span>
            <strong style={{ color: "#ffffff", fontSize: 16 }}>{formatMoney(createdOrder.total)}</strong>
          </div>
        </div>

        <button
          type="button"
          className="v-btn v-btn-primary"
          onClick={onBackToCart}
        >
          VOLTAR À LOJA
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "50px 6vw 100px", maxWidth: 1100, margin: "0 auto" }}>
      {/* CHECKOUT STEPPER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40, borderBottom: "1px solid var(--v-border-subtle)", paddingBottom: 24 }}>
        {[
          { num: 1, title: "Identificação" },
          { num: 2, title: "Entrega" },
          { num: 3, title: "Pagamento" },
        ].map((s) => (
          <div
            key={s.num}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: step === s.num ? "#ffffff" : step > s.num ? "#ffffff" : "#52525b",
              fontWeight: 800,
              fontSize: 11.5,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: step === s.num ? "#ffffff" : step > s.num ? "#27272a" : "rgba(255,255,255,0.06)",
                color: step === s.num ? "#000000" : "#ffffff",
                display: "grid",
                placeItems: "center",
                fontSize: 11,
              }}
            >
              {step > s.num ? "✓" : s.num}
            </span>
            <span>{s.title}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 50, alignItems: "start" }}>
        {/* STEP FORM */}
        <div style={{ background: "#0c0c10", padding: 32, borderRadius: 2, border: "1px solid var(--v-border-subtle)" }}>
          {/* STEP 1: IDENTIFICAÇÃO */}
          {step === 1 && (
            <div style={{ display: "grid", gap: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 900, color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>1. DADOS DE IDENTIFICAÇÃO</h2>

              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="vertice-name" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>NOME COMPLETO</label>
                <input
                  id="vertice-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="vertice-email" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>E-MAIL</label>
                  <input
                    id="vertice-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="vertice-cpf" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>CPF</label>
                  <input
                    id="vertice-cpf"
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="vertice-phone" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>CELULAR / WHATSAPP</label>
                <input
                  id="vertice-phone"
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                />
              </div>

              <button
                type="button"
                className="v-btn v-btn-primary"
                style={{ marginTop: 10 }}
                onClick={() => setStep(2)}
              >
                AVANÇAR PARA ENTREGA ➔
              </button>
            </div>
          )}

          {/* STEP 2: ENTREGA */}
          {step === 2 && (
            <div style={{ display: "grid", gap: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 900, color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>2. ENDEREÇO DE ENTREGA</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="vertice-cep" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>CEP</label>
                  <input
                    id="vertice-cep"
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="vertice-street" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>RUA / AVENIDA</label>
                  <input
                    id="vertice-street"
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="vertice-number" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>NÚMERO</label>
                  <input
                    id="vertice-number"
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="vertice-neighborhood" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>BAIRRO</label>
                  <input
                    id="vertice-neighborhood"
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="vertice-city" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>CIDADE</label>
                  <input
                    id="vertice-city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="vertice-state" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>ESTADO (UF)</label>
                  <input
                    id="vertice-state"
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                <button type="button" className="v-btn v-btn-secondary" onClick={() => setStep(1)}>
                  VOLTAR
                </button>
                <button type="button" className="v-btn v-btn-primary" style={{ flex: 1 }} onClick={() => setStep(3)}>
                  AVANÇAR PARA PAGAMENTO ➔
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAGAMENTO */}
          {step === 3 && (
            <div style={{ display: "grid", gap: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 900, color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>3. FORMA DE PAGAMENTO</h2>

              {/* PAYMENT TABS */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
{[
                    { id: "pix" as const, label: "PIX (5% OFF)" },
                    { id: "credit_card" as const, label: "Cartão de Crédito" },
                    { id: "boleto" as const, label: "Boleto Bancário" },
                  ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                    style={{
                      padding: 12,
                      borderRadius: 2,
                      background: formData.paymentMethod === p.id ? "#ffffff" : "rgba(255,255,255,0.04)",
                      border: formData.paymentMethod === p.id ? "1px solid #ffffff" : "1px solid var(--v-border-medium)",
                      color: formData.paymentMethod === p.id ? "#000000" : "#ffffff",
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: "pointer",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* PIX DETAILS */}
              {formData.paymentMethod === "pix" && (
                <div style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 2, padding: 20, textAlign: "center", display: "grid", gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#34d399" }}>
                    Aprovação Instantânea & 5% de Desconto
                  </span>
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
                    O QR Code oficial Pix será gerado na próxima tela para pagamento imediato pelo aplicativo do seu banco.
                  </p>
                </div>
              )}

              {/* CREDIT CARD DETAILS */}
              {formData.paymentMethod === "credit_card" && (
                <div style={{ display: "grid", gap: 14 }}>
                  <div style={{ display: "grid", gap: 6 }}>
                    <label htmlFor="vertice-card-number" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>NÚMERO DO CARTÃO</label>
                    <input
                      id="vertice-card-number"
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={{ display: "grid", gap: 6 }}>
                      <label htmlFor="vertice-card-expiry" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>VALIDADE</label>
                      <input
                        id="vertice-card-expiry"
                        type="text"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                      />
                    </div>
                    <div style={{ display: "grid", gap: 6 }}>
                      <label htmlFor="vertice-card-cvv" style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>CVV</label>
                      <input
                        id="vertice-card-cvv"
                        type="text"
                        value={formData.cardCvv}
                        onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--v-border-medium)", borderRadius: 2, padding: "11px 14px", color: "#fff", outline: "none", fontSize: 13 }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                <button type="button" className="v-btn v-btn-secondary" onClick={() => setStep(2)}>
                  VOLTAR
                </button>
                <button
                  type="button"
                  className="v-btn v-btn-primary"
                  style={{ flex: 1 }}
                  onClick={handleFinishOrder}
                >
                  FINALIZAR PEDIDO · {formatMoney(cartTotal)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ORDER SUMMARY SIDEBAR */}
        <div style={{ background: "#0c0c10", padding: 24, borderRadius: 2, border: "1px solid var(--v-border-medium)", display: "grid", gap: 16 }}>
          <h3 style={{ fontSize: 13.5, fontWeight: 900, color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            ITENS NO PEDIDO ({cartCount})
          </h3>

          <div style={{ display: "grid", gap: 12, maxHeight: 260, overflowY: "auto", paddingRight: 6 }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Image src={item.product.images[0]} alt={item.product.name} width={44} height={48} style={{ width: 44, height: 48, objectFit: "cover", borderRadius: 2, background: "#18181b" }} />
                <div style={{ flex: 1, fontSize: 11.5 }}>
                  <strong style={{ color: "#ffffff", display: "block" }}>{item.product.name}</strong>
                  <span style={{ color: "#8e8e93" }}>Tam: {item.selectedSize} · Qtd: {item.quantity}</span>
                </div>
                <span style={{ fontSize: 12, color: "#ffffff", fontWeight: 700 }}>
                  {formatMoney(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--v-border-subtle)", paddingTop: 14, display: "grid", gap: 8 }}>
            <div className="v-drawer-summary-row">
              <span>Subtotal</span>
              <span>{formatMoney(cartSubtotal)}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="v-drawer-summary-row" style={{ color: "#34d399" }}>
                <span>Desconto</span>
                <span>-{formatMoney(cartDiscount)}</span>
              </div>
            )}
            <div className="v-drawer-summary-row">
              <span>Frete</span>
              <span>{cartShipping === 0 ? "GRÁTIS" : formatMoney(cartShipping)}</span>
            </div>
            <div className="v-drawer-summary-row is-total">
              <span>Total</span>
              <span>{formatMoney(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
