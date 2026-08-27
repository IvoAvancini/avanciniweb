"use client";

import { useState } from "react";
import { useVertice } from "../store/useVerticeStore";

interface CartPageProps {
  onGoToCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartPage({ onGoToCheckout, onContinueShopping }: CartPageProps) {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    freeShippingRemaining,
    freeShippingProgress,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateCartQuantity,
    removeFromCart,
  } = useVertice();

  const [couponInput, setCouponInput] = useState("");
  const [zipInput, setZipInput] = useState("");
  const [calculatedZip, setCalculatedZip] = useState(false);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    if (applyCoupon(couponInput)) {
      setCouponInput("");
    }
  };

  const handleCalculateZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim().length >= 8) {
      setCalculatedZip(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: "140px 6vw", textAlign: "center", minHeight: "65vh" }}>
        <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.2em", color: "#8e8e93", textTransform: "uppercase" }}>
          SACOLA DE COMPRAS
        </span>
        <h1 style={{ fontSize: "clamp(26px, 3.2vw, 42px)", fontWeight: 900, color: "#ffffff", margin: "12px 0 16px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
          SUA SACOLA ESTÁ ESPERANDO.
        </h1>
        <p style={{ color: "#a1a1aa", maxWidth: 440, margin: "0 auto 32px", fontSize: 14.5, lineHeight: 1.6 }}>
          Explore as coleções de alta performance e adicione itens para concluir seu pedido.
        </p>
        <button
          type="button"
          className="v-btn v-btn-primary"
          onClick={onContinueShopping}
        >
          EXPLORAR PRODUTOS
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "50px 6vw 100px" }}>
      <h1 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: "#ffffff", textTransform: "uppercase", marginBottom: 32, letterSpacing: "-0.03em" }}>
        SACOLA DE COMPRAS ({cartCount})
      </h1>

      {/* FREE SHIPPING PROGRESS BAR */}
      <div style={{ background: "#0c0c10", padding: "18px 24px", borderRadius: 4, border: "1px solid var(--v-border-subtle)", marginBottom: 36 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#cbd5e1", marginBottom: 10 }}>
          {freeShippingRemaining > 0 ? (
            <span>Faltam <strong>{formatMoney(freeShippingRemaining)}</strong> para você desbloquear <strong>FRETE GRÁTIS</strong></span>
          ) : (
            <span style={{ color: "#34d399" }}>✦ PARABÉNS! VOCÊ ATINGIU O VALOR PARA <strong>FRETE GRÁTIS</strong></span>
          )}
        </div>
        <div className="v-free-shipping-track">
          <div className="v-free-shipping-fill" style={{ width: `${freeShippingProgress}%` }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 50, alignItems: "start" }}>
        {/* ITEMS LIST */}
        <div style={{ display: "grid", gap: 16 }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr auto",
                gap: 20,
                padding: 20,
                background: "#0c0c10",
                borderRadius: 4,
                border: "1px solid var(--v-border-subtle)",
                alignItems: "center",
              }}
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                style={{ width: 100, height: 110, objectFit: "cover", borderRadius: 2, background: "#18181b" }}
              />

              <div>
                <span className="v-card-cat">{item.product.categoryLabel}</span>
                <h3 style={{ fontSize: 15.5, fontWeight: 800, color: "#ffffff", margin: "4px 0 6px" }}>
                  {item.product.name}
                </h3>
                <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>
                  Cor: <strong>{item.selectedColor}</strong> · Tamanho: <strong>{item.selectedSize}</strong>
                </div>

                <div className="v-qty-box">
                  <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>

              <div style={{ textAlign: "right", display: "grid", gap: 12 }}>
                <strong style={{ fontSize: 16, color: "#ffffff" }}>
                  {formatMoney(item.price * item.quantity)}
                </strong>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#71717a",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY & ORDER ACTIONS */}
        <div style={{ background: "#0c0c10", padding: 28, borderRadius: 4, border: "1px solid var(--v-border-medium)", display: "grid", gap: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 900, color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            RESUMO DO PEDIDO
          </h3>

          {/* CUPOM */}
          <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Código de cupom (ex: VERTICE10)"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--v-border-medium)",
                borderRadius: 2,
                padding: "10px 12px",
                color: "#ffffff",
                fontSize: 12,
                outline: "none",
              }}
            />
            <button type="submit" className="v-btn v-btn-secondary v-btn-sm">
              APLICAR
            </button>
          </form>

          {appliedCoupon && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(52,211,153,0.08)", borderRadius: 2, border: "1px solid rgba(52,211,153,0.3)", fontSize: 12, color: "#34d399" }}>
              <span>Cupom <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)</span>
              <button
                type="button"
                onClick={removeCoupon}
                style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 11 }}
              >
                ✕ Remover
              </button>
            </div>
          )}

          {/* SIMULADOR DE CEP */}
          <form onSubmit={handleCalculateZip} style={{ display: "grid", gap: 8 }}>
            <label style={{ fontSize: 10.5, fontWeight: 800, color: "#8e8e93", textTransform: "uppercase" }}>
              CALCULAR FRETE E PRAZO:
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder="00000-000"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                maxLength={9}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--v-border-medium)",
                  borderRadius: 2,
                  padding: "10px 12px",
                  color: "#ffffff",
                  fontSize: 12,
                  outline: "none",
                }}
              />
              <button type="submit" className="v-btn v-btn-secondary v-btn-sm">
                CALCULAR
              </button>
            </div>
            {calculatedZip && (
              <div style={{ fontSize: 11, color: "#34d399", marginTop: 4 }}>
                ✓ Express Track: 2 a 4 dias úteis · {cartShipping === 0 ? "GRÁTIS" : formatMoney(cartShipping)}
              </div>
            )}
          </form>

          {/* FINANCIAL VALUES */}
          <div style={{ display: "grid", gap: 10, borderTop: "1px solid var(--v-border-subtle)", paddingTop: 16 }}>
            <div className="v-drawer-summary-row">
              <span>Subtotal ({cartCount} itens)</span>
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

          <button
            type="button"
            className="v-btn v-btn-primary v-btn-full"
            onClick={onGoToCheckout}
          >
            CONTINUAR PARA O CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
