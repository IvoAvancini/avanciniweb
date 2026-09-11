"use client";

import Image from "next/image";
import { useVertice } from "../store/useVerticeStore";

interface CartDrawerProps {
  onGoToCart: () => void;
  onGoToCheckout: () => void;
}

export function CartDrawer({ onGoToCart, onGoToCheckout }: CartDrawerProps) {
  const {
    isCartOpen,
    closeCart,
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    freeShippingRemaining,
    freeShippingProgress,
    updateCartQuantity,
    removeFromCart,
  } = useVertice();

  if (!isCartOpen) return null;

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  return (
    <div
      className="v-drawer-overlay"
      onClick={closeCart}
      role="button"
      tabIndex={0}
      aria-label="Fechar sacola"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") closeCart();
      }}
    >
      <div
        className="v-drawer-body"
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="v-drawer-head">
          <h3>SUA SACOLA ({cartCount})</h3>
          <button
            type="button"
            className="v-icon-btn"
            onClick={closeCart}
            aria-label="Fechar Sacola"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* FREE SHIPPING BAR */}
        <div className="v-free-shipping-bar">
          <div className="v-free-shipping-text">
            {freeShippingRemaining > 0 ? (
              <span>Faltam <strong>{formatMoney(freeShippingRemaining)}</strong> para <strong>FRETE GRÁTIS</strong></span>
            ) : (
              <span style={{ color: "#34d399" }}>✦ PARABÉNS! VOCÊ GANHOU <strong>FRETE GRÁTIS</strong></span>
            )}
          </div>
          <div className="v-free-shipping-track">
            <div className="v-free-shipping-fill" style={{ width: `${freeShippingProgress}%` }} />
          </div>
        </div>

        {/* ITEMS LIST */}
        <div className="v-drawer-items-list">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>Sua sacola está vazia</p>
              <small>Explore nossos lançamentos e adicione produtos exclusivos.</small>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="v-cart-item-card">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={84}
                  height={100}
                  className="v-cart-item-img"
                />
                <div className="v-cart-item-info">
                  <div>
                    <h4 className="v-cart-item-title">{item.product.name}</h4>
                    <div className="v-cart-item-meta">
                      Cor: {item.selectedColor} · Tam: {item.selectedSize}
                    </div>
                  </div>

                  <div className="v-cart-item-controls">
                    <div className="v-qty-box">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        aria-label="Diminuir quantidade"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <strong style={{ fontSize: 13, color: "#ffffff" }}>
                        {formatMoney(item.price * item.quantity)}
                      </strong>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#64748b",
                          cursor: "pointer",
                          fontSize: 11,
                        }}
                        title="Remover produto"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="v-drawer-foot">
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
              <span>Total Estimado</span>
              <span>{formatMoney(cartTotal)}</span>
            </div>

            <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
              <button
                type="button"
                className="v-btn v-btn-primary v-btn-full"
                onClick={() => {
                  closeCart();
                  onGoToCheckout();
                }}
              >
                FINALIZAR COMPRA
              </button>
              <button
                type="button"
                className="v-btn v-btn-secondary v-btn-full"
                onClick={() => {
                  closeCart();
                  onGoToCart();
                }}
              >
                VER SACOLA COMPLETA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
