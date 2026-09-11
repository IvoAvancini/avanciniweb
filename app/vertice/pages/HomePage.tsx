"use client";

import Image from "next/image";
import { useVertice } from "../store/useVerticeStore";
import { Product } from "../types";
import { ProductGrid } from "../components/ProductGrid";

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateCatalog: (category?: string) => void;
}

export function HomePage({ onSelectProduct, onNavigateCatalog }: HomePageProps) {
  const { products } = useVertice();

  const featuredProducts = products.filter((p) => p.featured || p.bestSeller).slice(0, 8);
  const newReleases = products.filter((p) => p.isNew || p.collection === "new-season").slice(0, 4);

  const categories = [
    {
      id: "tenis",
      name: "Calçados & Running",
      tag: "PERFORMANCE LAB",
      image: "/concepts/nike-sneaker.jpg",
    },
    {
      id: "moletons",
      name: "Tech Fleece",
      tag: "ISOLAMENTO TÉRMICO",
      image: "/concepts/nike-tech-fleece.jpg",
    },
    {
      id: "jaquetas",
      name: "Corta-Vento & Shield",
      tag: "BARREIRA DWR",
      image: "/concepts/nike-windrunner.jpg",
    },
    {
      id: "camisetas",
      name: "Compression & DryTech",
      tag: "ALTA RESPIRAÇÃO",
      image: "/concepts/nike-drifit.jpg",
    },
    {
      id: "streetwear",
      name: "Street Series",
      tag: "ESTÉTICA OVERSIZED",
      image: "/concepts/noma-fashion.jpg",
    },
    {
      id: "acessorios",
      name: "Mochilas & Equipamentos",
      tag: "CORDURA 1000D",
      image: "/concepts/nike-backpack.jpg",
    },
  ];

  return (
    <div className="v-home-page">
      {/* 1. CINEMATIC HERO (IMPACTO) */}
      <section className="v-hero">
        <div className="v-hero-bg">
          <Image
            src="/concepts/nike-hero.jpg"
            alt="Campanha Global Vértice 2026"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="v-hero-shade" />

        <div className="v-hero-content">
          <div className="v-hero-tag">
            <span>COLEÇÃO GLOBAL 2026 · PERFORMANCE & STREETWEAR</span>
          </div>
          <h1>VÁ ALÉM<br />DO ÓBVIO.</h1>
          <p>
            Performance extrema, ergonomia milimétrica e identidade autoral em uma nova geração de vestuário e calçados esportivos.
          </p>
          <div className="v-hero-actions">
            <button
              type="button"
              className="v-btn v-btn-primary"
              onClick={() => onNavigateCatalog()}
            >
              COMPRAR AGORA
            </button>
            <button
              type="button"
              className="v-btn v-btn-secondary"
              onClick={() => onNavigateCatalog("performance")}
            >
              EXPLORAR PERFORMANCE
            </button>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIAS DE DESTAQUE (PORTAL VISUAL) */}
      <section className="v-categories-section">
        <div className="v-section-head">
          <div>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", color: "#8e8e93", textTransform: "uppercase" }}>
              DIRETÓRIO ESSENCIAL
            </span>
            <h2>EXPLORE SEU MOVIMENTO</h2>
          </div>
          <button type="button" onClick={() => onNavigateCatalog()}>
            VER TODAS AS CATEGORIAS ↗
          </button>
        </div>

        <div className="v-category-grid">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="v-category-card"
              onClick={(e) => {
                e.preventDefault();
                onNavigateCatalog(cat.id);
              }}
            >
              <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 50vw, 20vw" loading="lazy" />
              <div className="v-category-card-shade" />
              <div className="v-category-card-info">
                <span>{cat.tag}</span>
                <h3>{cat.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 3. MAIS DESEJADOS (PRODUTO) */}
      <section style={{ padding: "0 6vw 90px" }}>
        <div className="v-section-head">
          <div>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", color: "#8e8e93", textTransform: "uppercase" }}>
              CURADORIA OFICIAL
            </span>
            <h2>MAIS DESEJADOS</h2>
          </div>
          <button type="button" onClick={() => onNavigateCatalog("bestsellers")}>
            EXPLORAR BEST SELLERS ↗
          </button>
        </div>

        <ProductGrid
          products={featuredProducts}
          onSelectProduct={onSelectProduct}
        />
      </section>

      {/* 4. STORYTELLING EDITORIAL (ENGENHARIA E MATERIAIS) */}
      <section className="v-story-section">
        <div style={{ position: "relative", borderRadius: 4, overflow: "hidden", aspectRatio: "4/3.2", border: "1px solid var(--v-border-subtle)" }}>
          <Image
            src="/concepts/nike-sneaker.jpg"
            alt="Engenharia V-Plate Carbon"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="v-story-copy">
          <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#ffffff", textTransform: "uppercase" }}>
            ENGENHARIA TÊXTIL
          </span>
          <h2>DESENVOLVIDO PARA A VELOCIDADE EXTREMA</h2>
          <p>
            Cada costura, gramatura e densidade de amortecimento é testada por atletas sob condições extremas. A linha Vértice Flow combina placas de fibra de carbono aeroespacial e espuma de alto retorno energético para garantir impulsão contínua.
          </p>

          <ul className="v-story-features">
            <li>✓ Placa de Carbono V-Plate 3K com propulsão elástica</li>
            <li>✓ Malha respirável AeroKnit com fios de tração reforçados</li>
            <li>✓ Resistência hidrofugada DWR contra intempéries urbanas</li>
            <li>✓ Produção sustentável com redução de 40% na pegada hídrica</li>
          </ul>

          <div style={{ marginTop: 32 }}>
            <button
              type="button"
              className="v-btn v-btn-primary"
              onClick={() => onNavigateCatalog("tenis")}
            >
              CONHECER A LINHA RUNNING
            </button>
          </div>
        </div>
      </section>

      {/* 5. LANÇAMENTOS RECENTES (NEW DROPS) */}
      <section style={{ padding: "90px 6vw" }}>
        <div className="v-section-head">
          <div>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", color: "#8e8e93", textTransform: "uppercase" }}>
              NEW DROPS 2026
            </span>
            <h2>LANÇAMENTOS DA TEMPORADA</h2>
          </div>
          <button type="button" onClick={() => onNavigateCatalog("new")}>
            VER TODOS OS LANÇAMENTOS ↗
          </button>
        </div>

        <ProductGrid
          products={newReleases}
          onSelectProduct={onSelectProduct}
        />
      </section>

      {/* 6. MANIFESTO EDITORIAL DA MARCA */}
      <section style={{ padding: "0 6vw 100px" }}>
        <div
          style={{
            background: "linear-gradient(180deg, #0d0d12 0%, #060608 100%)",
            borderRadius: 4,
            border: "1px solid var(--v-border-medium)",
            padding: "80px 5vw",
            textAlign: "center",
            display: "grid",
            gap: 18,
            maxWidth: 1080,
            margin: "0 auto",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.24em", color: "#8e8e93", textTransform: "uppercase" }}>
            VÉRTICE MANIFESTO
          </span>
          <h2 style={{ fontSize: "clamp(30px, 3.8vw, 56px)", fontWeight: 900, color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1.02 }}>
            NÃO SEGUIMOS TENDÊNCIAS.<br />CRIAMOS O PADRÃO.
          </h2>
          <p style={{ color: "#a1a1aa", maxWidth: 640, margin: "0 auto", fontSize: 15.5, lineHeight: 1.65 }}>
            A união sem concessões entre a precisão milimétrica do vestuário de alta performance e a autenticidade estética do streetwear internacional.
          </p>
          <div style={{ marginTop: 12 }}>
            <button
              type="button"
              className="v-btn v-btn-secondary"
              onClick={() => onNavigateCatalog()}
            >
              EXPLORAR UNIVERSO VÉRTICE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
