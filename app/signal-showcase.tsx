"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "./project-data";
import { DirectionIcon } from "./direction-icon";
import "./signal-showcase.css";

const categories = [
  { id: "all", label: "Todos os Trabalhos" },
  { id: "ecommerce", label: "E-commerces & Catálogos" },
  { id: "institucional", label: "Sites Institucionais" },
  { id: "especialidades", label: "Saúde & Profissionais" },
];

export function SignalShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"deck" | "grid">("deck");

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "ecommerce") {
      return project.slug === "vertice" || project.slug === "motora";
    }
    if (selectedCategory === "institucional") {
      return project.slug === "janildo" || project.slug === "solaris" || project.slug === "moreira";
    }
    if (selectedCategory === "especialidades") {
      return project.slug === "san-diego" || project.slug === "nexo" || project.slug === "caio";
    }
    return true;
  });

  return (
    <section className="signal-showcase" id="projetos" aria-labelledby="showcase-title">
      <header className="signal-showcase-head">
        <div className="signal-showcase-label" data-reveal>
          <span>02</span>
          <i />
          Portfólio de Alta Conversão
        </div>
        <h2 id="showcase-title" data-reveal>
          Projetos autorais construídos<br />
          <em>com direção visual única</em>
        </h2>
        <p data-reveal>
          Cada negócio exige uma arquitetura própria. Sem templates pré-fabricados ou soluções genéricas: veja como transformamos marcas em experiências digitais desejáveis e rentáveis.
        </p>

        {/* Barra de Filtros e Alternância de Visualização */}
        <div className="showcase-controls-bar" data-reveal>
          <div className="showcase-category-filters" role="tablist" aria-label="Filtrar por categoria">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`category-filter-btn ${selectedCategory === cat.id ? "is-active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="showcase-view-switch" role="group" aria-label="Modo de visualização">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === "deck" ? "is-active" : ""}`}
              onClick={() => setViewMode("deck")}
              title="Modo Deck Empilhado (Cards Sticky)"
            >
              <span>Deck Empilhado 🃏</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === "grid" ? "is-active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Modo Grade Completa"
            >
              <span>Grade ⊞</span>
            </button>
          </div>
        </div>
      </header>

      {/* Visualização 1: Stacking Cards Deck (Efeito Deck Sticky ao Rolar) */}
      {viewMode === "deck" && (
        <div className="stacking-cards-deck" aria-label="Portfólio em deck empilhado">
          {filteredProjects.map((project, index) => {
            const external = project.href.startsWith("http");

            return (
              <article
                key={project.slug}
                className="stack-card-item"
                style={{
                  top: `calc(90px + ${index * 16}px)`,
                  zIndex: index + 10,
                }}
              >
                {/* Lado Esquerdo: Narrativa e Escopo Comercial */}
                <div className="stack-card-left">
                  <div className="stack-card-top-meta">
                    <span className="stack-index-pill">
                      0{index + 1} / 0{filteredProjects.length}
                    </span>
                    <span className="stack-category-pill">
                      {project.category.split("·")[0].trim()}
                    </span>
                    <span className="stack-segment-pill">{project.segment}</span>
                  </div>

                  <h3 className="stack-card-name">{project.name}</h3>

                  <p className="stack-card-headline">{project.headline}</p>

                  <div className="stack-card-insights">
                    <div className="insight-block">
                      <strong>Desafio:</strong>
                      <p>{project.problem}</p>
                    </div>
                    <div className="insight-block">
                      <strong>Solução:</strong>
                      <p>{project.direction}</p>
                    </div>
                  </div>

                  {/* Tags de Escopo Técnico */}
                  <div className="stack-scope-tags">
                    {project.scope.map((tag) => (
                      <span key={tag} className="scope-tag-pill">
                        {tag}
                      </span>
                    ))}
                    <span className="scope-tag-tech">Next.js 15 & Uptime 99.9%</span>
                  </div>

                  {/* Ação Estilo Paulo Leme */}
                  <div className="stack-card-action">
                    <Link
                      href={project.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="stack-action-pill-btn"
                    >
                      <span>{external ? "Acessar Projeto Oficial" : "Ver Detalhes do Case"}</span>
                      <span className="stack-arrow-badge" aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>

                {/* Lado Direito: Preview em Dispositivo / Browser Real */}
                <div className="stack-card-right">
                  <div className="device-browser-frame">
                    <div className="device-browser-bar">
                      <div className="browser-dots">
                        <span />
                        <span />
                        <span />
                      </div>
                      <span className="browser-url">
                        {external ? project.href.replace("https://", "") : `avancini-os.com.br${project.href}`}
                      </span>
                      <span className="browser-status">ONLINE</span>
                    </div>

                    <div className="device-media-box">
                      <Image
                        src={project.image}
                        alt={`Interface do projeto ${project.name}`}
                        fill
                        sizes="(max-width: 900px) 100vw, 55vw"
                        className="device-media-img"
                      />
                      <div className="device-glass-sheen" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Visualização 2: Grade Completa (Grid View) */}
      {viewMode === "grid" && (
        <div className="showcase-projects-grid">
          {filteredProjects.map((project, index) => {
            const external = project.href.startsWith("http");

            return (
              <article key={project.slug} className="portfolio-card" data-reveal>
                <div className="portfolio-media-wrapper">
                  <Image
                    src={project.image}
                    alt={`Projeto ${project.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="portfolio-img"
                  />
                  <div className="portfolio-media-overlay">
                    <span className="portfolio-view-badge">
                      <span>{external ? "Ver site ao vivo" : "Explorar projeto"}</span>
                      <DirectionIcon />
                    </span>
                  </div>
                  <div className="portfolio-badge-top">
                    <span className="category-pill">{project.category.split("·")[0].trim()}</span>
                    <span className="number-pill">0{index + 1}</span>
                  </div>
                </div>

                <div className="portfolio-info-body">
                  <div className="portfolio-meta">
                    <span className="portfolio-segment">{project.segment}</span>
                    <div className="portfolio-scope-tags">
                      {project.scope.slice(0, 2).map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <h3 className="portfolio-name">{project.name}</h3>
                  <p className="portfolio-headline">{project.headline}</p>

                  <div className="portfolio-actions">
                    <Link
                      href={project.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="portfolio-link-btn"
                    >
                      <span>{external ? "Acessar Projeto Oficial" : "Ver Detalhes do Case"}</span>
                      <DirectionIcon />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
