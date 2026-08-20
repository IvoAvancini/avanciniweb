"use client";

import { useEffect, useRef } from "react";

export function MotionLayer() {
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-enabled");
    const heroScene = document.querySelector<HTMLElement>(".hero-scroll-scene");
    const hero = document.querySelector<HTMLElement>(".hero");
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-scene]"));

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    let lastScrollY = window.scrollY;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        progressRef.current?.style.setProperty("--scroll-progress", String(progress));
        root.classList.toggle("has-scrolled", window.scrollY > 24);
        root.classList.toggle("scrolling-down", window.scrollY > lastScrollY && window.scrollY > 120);
        lastScrollY = window.scrollY;

        if (heroScene && hero) {
          const rect = heroScene.getBoundingClientRect();
          const distance = Math.max(heroScene.offsetHeight - window.innerHeight, 1);
          const heroProgress = Math.min(1, Math.max(0, -rect.top / distance));
          hero.style.setProperty("--hero-progress", String(heroProgress));
          hero.style.setProperty("--hero-opacity", String(1 - heroProgress * 0.7));
          hero.style.setProperty("--hero-copy-shift", `${heroProgress * -72}px`);
          hero.style.setProperty("--hero-copy-scale", String(1 - heroProgress * 0.04));
          hero.style.setProperty("--hero-signal-shift", `${heroProgress * -20}px`);
          hero.style.setProperty("--hero-signal-scale", String(1 + heroProgress * 0.28));
        }

        scenes.forEach((scene) => {
          const rect = scene.getBoundingClientRect();
          const sceneProgress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
          scene.style.setProperty("--scene-progress", String(sceneProgress));
          scene.style.setProperty("--scene-shift", `${(0.5 - sceneProgress) * 70}px`);
          scene.style.setProperty("--scene-shift-x", `${(sceneProgress - 0.5) * 70}px`);
        });
      });
    };

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !glowRef.current) return;
      glowRef.current.style.transform = `translate3d(${event.clientX - 170}px, ${event.clientY - 170}px, 0)`;
      glowRef.current.style.opacity = "1";
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
      root.classList.remove("motion-enabled", "has-scrolled");
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <div className="cursor-ambient" ref={glowRef} aria-hidden="true" />
    </>
  );
}
