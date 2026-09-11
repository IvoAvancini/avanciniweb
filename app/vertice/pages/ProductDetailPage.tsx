"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useVertice } from "../store/useVerticeStore";
import { Product } from "../types";
import { ProductCard } from "../components/ProductCard";

interface ProductDetailPageProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateCatalog: (category?: string) => void;
}

export function ProductDetailPage(props: ProductDetailPageProps) {
  return <ProductDetailContent key={props.product.id} {...props} />;
}

function ProductDetailContent({
  product,
  onSelectProduct,
  onNavigateHome,
  onNavigateCatalog,
}: ProductDetailPageProps) {
  const { addToCart, toggleWishlist, isWishlisted, openSizeGuide, products } = useVertice();
  const wishlisted = isWishlisted(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle sticky bar visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 650);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const pixPrice = product.price * 0.95;

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.sport === product.sport))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="v-pdp-page">
      {/* BREADCRUMB */}
      <div style={{ padding: "24px 6vw 0", display: "flex", gap: 8, fontSize: 11, color: "#71717a", textTransform: "uppercase", fontWeight: 700 }}>
        <button
          type="button"
          onClick={onNavigateHome}
          style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}
        >
          Início
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => onNavigateCatalog(product.category)}
          style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}
        >
          {product.categoryLabel}
        </button>
        <span>/</span>
        <span style={{ color: "#ffffff" }}>{product.name}</span>
      </div>

      {/* 2-COL MAIN PRODUCT SECTION */}
      <div className="v-pdp-layout">
        {/* LEFT: GALLERY (60%) */}
        <div className="v-pdp-gallery-grid">
          {product.images.map((imgSrc, idx) => (
            <Image
              key={imgSrc + idx}
              src={imgSrc}
              alt={`${product.name} foto ${idx + 1}`}
              className="v-pdp-gallery-img"
              width={600}
              height={720}
              sizes="(max-width: 768px) 100vw, 50vw"
              role="button"
              tabIndex={0}
              onClick={() => setActiveImageIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActiveImageIndex(idx);
              }}
              style={{
                gridColumn: idx === 0 ? "span 2" : "span 1",
                border: activeImageIndex === idx ? "1px solid #ffffff" : "1px solid var(--v-border-subtle)",
              }}
            />
          ))}
        </div>

        {/* RIGHT: DETAILS (40%) */}
        <div className="v-pdp-info-sticky">
          <div className="v-pdp-header">
            <span className="v-card-cat">{product.categoryLabel} · {product.sport.toUpperCase()}</span>
            <h1>{product.name}</h1>
          </div>

          {/* RATING */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#e2e8f0", fontWeight: 700 }}>
            <span style={{ color: "#ffffff" }}>★</span>
            <span>{product.rating.toFixed(1)}</span>
            <span style={{ color: "#71717a" }}>({product.reviewsCount} avaliações verificadas)</span>
          </div>

          {/* PRICES */}
          <div className="v-pdp-price-box">
            <span className="v-pdp-price-current">{formatMoney(product.price)}</span>
            {product.oldPrice && (
              <span className="v-card-price-old">{formatMoney(product.oldPrice)}</span>
            )}
            {product.discount && (
              <span className="v-card-discount">-{product.discount}% OFF</span>
            )}
          </div>
          <div className="v-pdp-pix-price">
            ⚡ <strong>{formatMoney(pixPrice)}</strong> à vista no Pix (5% de desconto extra)
          </div>
          <small style={{ color: "#8e8e93", fontSize: 11.5 }}>
            ou até <strong>10x de {formatMoney(product.price / 10)}</strong> sem juros
          </small>

          {/* COLOR SELECTOR */}
          <div style={{ borderTop: "1px solid var(--v-border-subtle)", paddingTop: 18 }}>
            <div className="v-pdp-selector-label">
              <span>COR: <strong>{selectedColor}</strong></span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    borderRadius: 2,
                    background: selectedColor === color.name ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)",
                    border: selectedColor === color.name ? "1px solid #ffffff" : "1px solid rgba(255,255,255,0.12)",
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

          {/* QUANTITY & ACTIONS */}
          <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div className="v-qty-box" style={{ padding: "8px 12px" }}>
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span style={{ fontSize: 13, fontWeight: 800, padding: "0 12px" }}>{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button
                type="button"
                className="v-btn v-btn-primary"
                style={{ flex: 1 }}
                onClick={handleAddToCart}
              >
                ADICIONAR À SACOLA
              </button>

              <button
                type="button"
                className="v-icon-btn"
                style={{ width: 48, height: 48, borderRadius: 2, border: "1px solid var(--v-border-medium)" }}
                onClick={() => toggleWishlist(product.id)}
                title="Favoritar produto"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>

          {/* SHIPPING BADGE */}
          <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: 2, fontSize: 11.5, color: "#cbd5e1", display: "grid", gap: 6, border: "1px solid var(--v-border-subtle)" }}>
            <div>🚚 <strong>Frete Grátis</strong> em pedidos acima de R$ 399 para todo o Brasil.</div>
            <div>🔄 <strong>30 dias grátis</strong> para trocas sem burocracia.</div>
          </div>

          {/* SHORT DESCRIPTION */}
          <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#94a3b8", margin: 0 }}>
            {product.description}
          </p>
        </div>
      </div>

      {/* STORYTELLING / CAMPANHA TÉCNICA */}
      {product.storytelling && (
        <section className="v-story-section">
          <div className="v-story-copy">
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#8e8e93", textTransform: "uppercase" }}>
              DIREÇÃO DE ENGENHARIA
            </span>
            <h2>{product.storytelling.headline}</h2>
            <p>{product.storytelling.text}</p>
            <ul className="v-story-features">
              {product.storytelling.techFeatures.map((feat) => (
                <li key={feat}>✓ {feat}</li>
              ))}
            </ul>
            <div style={{ marginTop: 24, fontSize: 11.5, color: "#71717a" }}>
              <strong>Composição:</strong> {product.storytelling.materials}
            </div>
          </div>
          <div style={{ position: "relative", borderRadius: 2, overflow: "hidden", aspectRatio: "4/3.2", border: "1px solid var(--v-border-subtle)" }}>
            <Image
              src={product.images[1] || product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>
      )}

      {/* RECOMENDAÇÕES */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: "90px 6vw", borderTop: "1px solid var(--v-border-subtle)" }}>
          <div className="v-section-head">
            <div>
              <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", color: "#8e8e93", textTransform: "uppercase" }}>
                CURADORIA COMPLEMENTAR
              </span>
              <h2>VOCÊ TAMBÉM PODE GOSTAR</h2>
            </div>
          </div>
          <div className="v-product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
            ))}
          </div>
        </section>
      )}

      {/* STICKY ADD TO CART BAR */}
      {showStickyBar && (
        <div className="v-sticky-cart-bar">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={44}
              height={44}
              style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 2 }}
            />
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: "#ffffff", margin: 0 }}>{product.name}</h4>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>{selectedColor} · {selectedSize}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <strong style={{ fontSize: 16, color: "#ffffff" }}>{formatMoney(product.price * quantity)}</strong>
            <button
              type="button"
              className="v-btn v-btn-primary v-btn-sm"
              onClick={handleAddToCart}
            >
              ADICIONAR À SACOLA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
