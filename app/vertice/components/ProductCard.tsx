"use client";

import { useVertice } from "../store/useVerticeStore";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { toggleWishlist, isWishlisted, openQuickShop } = useVertice();
  const wishlisted = isWishlisted(product.id);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  return (
    <div
      className="v-product-card"
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes de ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(product);
      }}
    >
      {/* MEDIA CONTAINER */}
      <div className="v-card-media">
        {product.badge && (
          <span className={`v-card-badge v-badge-${product.badge.toLowerCase().replace(" ", "")}`}>
            {product.badge}
          </span>
        )}

        {/* WISHLIST BUTTON */}
        <button
          type="button"
          className={`v-card-wishlist-btn ${wishlisted ? "is-active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={wishlisted ? "Remover dos favoritos" : "Salvar nos favoritos"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* IMAGES (FLIP ON HOVER) */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="v-img-primary"
          loading="lazy"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} visualização secundária`}
            className="v-img-secondary"
            loading="lazy"
          />
        )}

        {/* QUICK SHOP BUTTON */}
        <button
          type="button"
          className="v-card-quickshop-btn"
          onClick={(e) => {
            e.stopPropagation();
            openQuickShop(product);
          }}
        >
          ⚡ COMPRA RÁPIDA
        </button>
      </div>

      {/* DETAILS */}
      <div className="v-card-details">
        <span className="v-card-cat">{product.categoryLabel}</span>
        <h3 className="v-card-title">{product.name}</h3>

        <div className="v-card-rating">
          <span style={{ color: "#ffffff" }}>★</span>
          <span>{product.rating.toFixed(1)}</span>
          <span style={{ color: "#71717a" }}>({product.reviewsCount})</span>
        </div>

        <div className="v-card-prices">
          <strong className="v-card-price-now">{formatMoney(product.price)}</strong>
          {product.oldPrice && (
            <span className="v-card-price-old">{formatMoney(product.oldPrice)}</span>
          )}
          {product.discount && (
            <span className="v-card-discount">-{product.discount}%</span>
          )}
        </div>

        {/* COLORS PREVIEW */}
        <div className="v-card-colors-row">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color.name}
              className="v-color-dot"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <small style={{ fontSize: 9, color: "#71717a" }}>+{product.colors.length - 4}</small>
          )}
        </div>
      </div>
    </div>
  );
}
