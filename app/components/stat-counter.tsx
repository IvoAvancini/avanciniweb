"use client";

import { useEffect, useRef, useState } from "react";
import "./stat-counter.css";

interface StatItem {
  prefix?: string;
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const stats: StatItem[] = [
  {
    target: 120,
    suffix: "+",
    label: "Projetos Entregues",
    sublabel: "E-commerces, sites & ecossistemas no ar",
  },
  {
    target: 99.8,
    decimals: 1,
    suffix: "%",
    label: "Uptime & Performance",
    sublabel: "Infraestrutura Next.js de alta disponibilidade",
  },
  {
    prefix: "R$ ",
    target: 15,
    suffix: "M+",
    label: "Faturados por Clientes",
    sublabel: "Volume transacionado em checkouts integrados",
  },
  {
    prefix: "< ",
    target: 0.8,
    decimals: 1,
    suffix: "s",
    label: "Tempo de Carregamento",
    sublabel: "Nota 99/100 no Google PageSpeed Insights",
  },
];

export function StatCounterSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map((s) => s.target * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCounts(stats.map((s) => s.target));
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted]);

  return (
    <section className="stat-counter-section" ref={containerRef} aria-label="Estatísticas operacionais">
      <div className="stat-counter-container" data-reveal>
        <div className="stat-counter-header">
          <span className="stat-eyebrow">METRICAS DE ALTO DESEMPENHO</span>
          <h2 className="stat-headline">Tecnologia construída para gerar resultados mensuráveis</h2>
        </div>

        <div className="stat-grid">
          {stats.map((item, idx) => {
            const currentVal = counts[idx];
            const formattedVal =
              item.decimals !== undefined
                ? currentVal.toFixed(item.decimals)
                : Math.floor(currentVal).toString();

            return (
              <div key={item.label} className="stat-card">
                <div className="stat-glow-node" aria-hidden="true" />
                <div className="stat-number-row">
                  {item.prefix && <span className="stat-prefix">{item.prefix}</span>}
                  <span className="stat-number">{formattedVal}</span>
                  <span className="stat-suffix">{item.suffix}</span>
                </div>
                <strong className="stat-title">{item.label}</strong>
                <p className="stat-desc">{item.sublabel}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
