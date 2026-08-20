"use client";

import { useEffect, useRef } from "react";

export function MotionLayer() {
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-enabled");

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
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        progressRef.current?.style.setProperty("--scroll-progress", String(progress));
        root.classList.toggle("has-scrolled", window.scrollY > 24);
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
