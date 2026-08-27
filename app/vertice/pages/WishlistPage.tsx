"use client";

import { useVertice } from "../store/useVerticeStore";
import { Product } from "../types";
import { ProductCard } from "../components/ProductCard";

interface WishlistPageProps {
  onSelectProduct: (product: Product) => void;
  onExploreProducts: () => void;
}

export function WishlistPage({ onSelectProduct, onExploreProducts }: WishlistPageProps) {
  const { wishlist, products } = useVertice();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div style={{ padding: "140px 6vw", textAlign: "center", minHeight: "65vh" }}>
        <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.2em", color: "#8e8e93", textTransform: "uppercase" }}>
          LISTA DE DESEJOS
        </span>
        <h1 style={{ fontSize: "clamp(26px, 3.2vw, 42px)", fontWeight: 900, color: "#ffffff", margin: "12px 0 16px", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
          GUARDE O QUE MOVE VOCÊ.
        </h1>
        <p style={{ color: "#a1a1aa", maxWidth: 460, margin: "0 auto 32px", fontSize: 14.5, lineHeight: 1.6 }}>
          Salve os produtos da sua preferência para acompanhar lançamentos e garantir suas peças na sacola.
        </p>
        <button
          type="button"
          className="v-btn v-btn-primary"
          onClick={onExploreProducts}
        >
          EXPLORAR PRODUTOS
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "50px 6vw 100px" }}>
      <div style={{ marginBottom: 36, paddingBottom: 22, borderBottom: "1px solid var(--v-border-subtle)" }}>
        <h1 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: "#ffffff", textTransform: "uppercase", margin: 0, letterSpacing: "-0.03em" }}>
          MEUS FAVORITOS ({wishlistedProducts.length})
        </h1>
        <span style={{ fontSize: 12, color: "#8e8e93", fontWeight: 700, marginTop: 4, display: "block" }}>
          Sua seleção pessoal de peças e calçados exclusivos VÉRTICE.
        </span>
      </div>

      <div className="v-product-grid">
        {wishlistedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
}
