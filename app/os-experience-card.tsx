"use client";

import { useState } from "react";

type ExperienceCardProps = {
  accent: "web" | "sync";
  cta: string;
  description: string;
  href: string;
  kicker: string;
  letter: string;
  number: string;
  promise: string;
  services: string[];
  title: string;
};

export function OSExperienceCard({ accent, cta, description, href, kicker, letter, number, promise, services, title }: ExperienceCardProps) {
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [previewActive, setPreviewActive] = useState(false);

  const activatePreview = () => {
    setPreviewLoaded(true);
    setPreviewActive(true);
  };

  return (
    <a
      className={`oshub-card oshub-card-${accent} ${previewActive ? "is-previewing" : ""}`}
      data-letter={letter}
      href={href}
      aria-label={`${title}: ${description}`}
      onBlur={() => setPreviewActive(false)}
      onFocus={activatePreview}
      onPointerEnter={activatePreview}
      onPointerLeave={() => setPreviewActive(false)}
    >
      {previewLoaded && <iframe src={href} title={`Prévia da ${title}`} tabIndex={-1} aria-hidden="true" />}
      <div className="oshub-card-shade" aria-hidden="true" />
      <div className="oshub-card-topline" aria-hidden="true">
        <span>{number}</span>
        <span>SOLUÇÃO COMPLETA · INDEPENDENTE</span>
      </div>
      <span className="oshub-card-preview-label" aria-hidden="true"><i /> PRÉVIA AO VIVO</span>
      <div className="oshub-card-copy">
        <small>{kicker}</small>
        <h2>{title}</h2>
        <strong>{promise}</strong>
        <p>{description}</p>
        <ul aria-label={`Soluções da ${title}`}>
          {services.map((service) => <li key={service}>{service}</li>)}
        </ul>
        <span className="oshub-card-cta">{cta}<b aria-hidden="true">↗</b></span>
      </div>
    </a>
  );
}
