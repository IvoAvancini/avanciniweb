"use client";

import { useState } from "react";
import Image from "next/image";
import { useVertice } from "../store/useVerticeStore";
import { Product } from "../types";

export function QuickShopDrawer() {
  const { isQuickShopOpen, closeQuickShop, quickShopProduct, addToCart, openSizeGuide } = useVertice();

  if (!isQuickShopOpen || !quickShopProduct) return null;

  return (
    <QuickShopContent
      key={quickShopProduct.id}
      product={quickShopProduct}
      closeQuickShop={closeQuickShop}
      addToCart={addToCart}
      openSizeGuide={openSizeGuide}
    />
  );
}

interface QuickShopContentProps {
  product: Product;
  closeQuickShop: () => void;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  openSizeGuide: () => void;
}

function QuickShopContent({
  product,
  closeQuickShop,
  addToCart,
  openSizeGuide,
}: QuickShopContentProps) {
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    closeQuickShop();
  };

  return (
    <div
      className="v-drawer-overlay"
      onClick={closeQuickShop}
      role="button"
      tabIndex={0}
      aria-label="Fechar compra rápida"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") closeQuickShop();
      }}
    >
      <div
        className="v-drawer-body"
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="v-drawer-head">
          <h3>COMPRA RÁPIDA</h3>
          <button
            type="button"
            className="v-icon-btn"
            onClick={closeQuickShop}
            aria-label="Fechar compra rápida"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div style={{ padding: "24px", overflowY: "auto", flex: 1, display: "grid", gap: 20 }}>
          {/* PRODUCT MAIN INFO */}
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16 }}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={100}
              height={120}
              style={{ width: 100, height: 120, objectFit: "cover", borderRadius: 4, background: "#111" }}
            />
            <div>
              <span className="v-card-cat">{product.categoryLabel}</span>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: "#ffffff", margin: "4px 0 8px 0" }}>
                {product.name}
              </h4>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <strong style={{ fontSize: 18, color: "#ffffff" }}>
                  {formatMoney(product.price)}
                </strong>
                {product.oldPrice && (
                  <span style={{ fontSize: 13, color: "#64748b", textDecoration: "line-through" }}>
                    {formatMoney(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* COLOR SELECTOR */}
          <div>
            <div className="v-pdp-selector-label">
              <span>COR: <strong>{selectedColor}</strong></span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    borderRadius: 4,
                    background: selectedColor === color.name ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)",
                    border: selectedColor === color.name ? "1px solid #ffffff" : "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: color.hex, border: "1px solid rgba(255,255,255,0.3)" }} />
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div>
            <div className="v-pdp-selector-label">
              <span>TAMANHO: <strong>{selectedSize || "Selecione"}</strong></span>
              <button type="button" onClick={openSizeGuide}>Guia de medidas</button>
            </div>
            <div className="v-pdp-sizes-grid">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`v-size-btn ${selectedSize === size ? "is-selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div>
            <div className="v-pdp-selector-label">
              <span>QUANTIDADE:</span>
            </div>
            <div className="v-qty-box" style={{ padding: "4px 8px" }}>
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span style={{ fontSize: 13, fontWeight: 800, padding: "0 12px" }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER ACTION */}
        <div className="v-drawer-foot">
          <button
            type="button"
            className="v-btn v-btn-primary v-btn-full"
            onClick={handleAddToCart}
          >
            ADICIONAR À SACOLA · {formatMoney(product.price * quantity)}
          </button>
        </div>
      </div>
    </div>
  );
}
