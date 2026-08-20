"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { BrandMark } from "./BrandMark";

type ActivePath = "web" | "sync";

export function IdentityStage() {
  const [active, setActive] = useState<ActivePath>("web");
  const stageRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    stage.style.setProperty("--pointer-x", `${x * 100}%`);
    stage.style.setProperty("--pointer-y", `${y * 100}%`);
    stage.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    stage.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
  };

  const resetPointer = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--pointer-x", "50%");
    stage.style.setProperty("--pointer-y", "50%");
    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");
  };

  const style = {
    "--stage-accent": active === "web" ? "#ef3340" : "#ff7a00",
    "--pointer-x": "50%",
    "--pointer-y": "50%",
    "--tilt-x": "0deg",
    "--tilt-y": "0deg",
  } as CSSProperties;

  return (
    <div
      className={`identity-stage identity-stage-ws stage-active-${active}`}
      ref={stageRef}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label="Símbolo Avancini OS interativo conectado às especializações Web e Sync"
    >
      <div className="stage-spotlight" aria-hidden="true" />
      <div className="stage-ring stage-ring-one" aria-hidden="true" />
      <div className="stage-ring stage-ring-two" aria-hidden="true" />
      <div className="stage-ring stage-ring-three" aria-hidden="true" />
      <div className="stage-axis" aria-hidden="true" />
      <div className="stage-pulse stage-pulse-web" aria-hidden="true" />
      <div className="stage-pulse stage-pulse-sync" aria-hidden="true" />

      <button
        className="stage-label stage-web"
        type="button"
        aria-pressed={active === "web"}
        onClick={() => setActive("web")}
      >
        <i /> WEB <small>ATRAIR</small><b>+</b>
      </button>
      <button
        className="stage-label stage-sync"
        type="button"
        aria-pressed={active === "sync"}
        onClick={() => setActive("sync")}
      >
        <i /> SYNC <small>ATENDER</small><b>+</b>
      </button>

      <div className="stage-core">
        <div className="core-halo" aria-hidden="true" />
        <BrandMark large />
        <span className="core-status"><i /> AVANCINI OS</span>
      </div>

      <div className="stage-caption" aria-live="polite">
        <span>{active === "web" ? "AVANCINI WEB" : "AVANCINI SYNC"}</span>
        <b>{active === "web" ? "PRESENÇA QUE ATRAI" : "INTELIGÊNCIA QUE ATENDE"}</b>
      </div>
      <p className="stage-hint">MOVA O CURSOR · SELECIONE UM CAMINHO</p>
    </div>
  );
}
