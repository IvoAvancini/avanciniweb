"use client";

import { Product } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  columns?: 3 | 4;
}

export function ProductGrid({ products, onSelectProduct, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#94a3b8" }}>
        <p style={{ fontSize: 18, fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>
          Nenhum produto corresponde aos filtros selecionados.
        </p>
        <small>Tente redefinir os filtros para explorar todo o catálogo.</small>
      </div>
    );
  }

  return (
    <div className={columns === 3 ? "v-product-grid v-product-grid-3" : "v-product-grid"}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
}
