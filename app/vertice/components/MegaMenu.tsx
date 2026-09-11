"use client";

import Image from "next/image";

interface MegaMenuProps {
  category: string;
  onSelect: (filterCategory: string) => void;
}

export function MegaMenu({ category, onSelect }: MegaMenuProps) {
  const isMen = category === "masculino";

  const categories = [
    { label: "Tênis & Running", cat: "tenis" },
    { label: "Camisetas & Regatas", cat: "camisetas" },
    { label: "Moletons & Tech Fleece", cat: "moletons" },
    { label: "Jaquetas & Corta-Vento", cat: "jaquetas" },
    { label: "Calças & Joggers", cat: "calcas" },
    { label: "Shorts & Bermudas", cat: "shorts" },
  ];

  const sports = [
    { label: "Corrida de Alta Performance", cat: "corrida" },
    { label: "Academia & Treino Funcional", cat: "academia" },
    { label: "Streetwear & Urbano", cat: "streetwear" },
    { label: "Lifestyle & Casual", cat: "lifestyle" },
  ];

  const collections = [
    { label: "Performance Lab 2026", cat: "performance" },
    { label: "Vértice Essentials", cat: "essentials" },
    { label: "Street Series", cat: "street" },
    { label: "New Season Drops", cat: "new-season" },
  ];

  return (
    <div className="v-megamenu-overlay" onMouseEnter={() => {}} onMouseLeave={() => {}}>
      {/* COL 1: POR CATEGORIA */}
      <div className="v-megamenu-col">
        <h4>COMPRAR POR PRODUTO</h4>
        <ul>
          {categories.map((item) => (
            <li key={item.cat}>
              <a
                href={`#${item.cat}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(item.cat);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* COL 2: POR ESPORTE */}
      <div className="v-megamenu-col">
        <h4>EXPLORE POR ESPORTE</h4>
        <ul>
          {sports.map((item) => (
            <li key={item.cat}>
              <a
                href={`#${item.cat}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(item.cat);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* COL 3: COLEÇÕES */}
      <div className="v-megamenu-col">
        <h4>COLEÇÕES EXCLUSIVAS</h4>
        <ul>
          {collections.map((item) => (
            <li key={item.cat}>
              <a
                href={`#${item.cat}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(item.cat);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* COL 4: DESTAQUES */}
      <div className="v-megamenu-col">
        <h4>DESTAQUES</h4>
        <ul>
          <li>
            <a
              href="#bestsellers"
              onClick={(e) => {
                e.preventDefault();
                onSelect("bestsellers");
              }}
              style={{ color: "#ffffff", fontWeight: 700 }}
            >
              ✦ Os Mais Desejados
            </a>
          </li>
          <li>
            <a
              href="#new"
              onClick={(e) => {
                e.preventDefault();
                onSelect("new");
              }}
              style={{ color: "#ffffff", fontWeight: 700 }}
            >
              ✦ Lançamentos da Semana
            </a>
          </li>
          <li>
            <a
              href="#sale"
              onClick={(e) => {
                e.preventDefault();
                onSelect("sale");
              }}
              style={{ color: "var(--v-accent-red)", fontWeight: 700 }}
            >
              ✦ Ofertas Especiais até 30%
            </a>
          </li>
        </ul>
      </div>

      {/* COL 5: BANNER EDITORIAL */}
      <div className="v-megamenu-banner">
        <Image
          src={isMen ? "/concepts/nike-tech-fleece.jpg" : "/concepts/nike-sneaker.jpg"}
          alt="Campanha Editorial Vértice"
          fill
          sizes="300px"
        />
        <div className="v-megamenu-banner-shade" />
        <div className="v-megamenu-banner-copy">
          <small>NOVA TEMPORADA 2026</small>
          <strong>{isMen ? "VÉRTICE TECH FLEECE" : "AERO RUNNING PRO"}</strong>
        </div>
      </div>
    </div>
  );
}
