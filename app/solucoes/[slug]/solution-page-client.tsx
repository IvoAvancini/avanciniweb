"use client";

import { useEffect, useRef } from "react";

export function SolutionPageMotion() {
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <span ref={progressRef} className="solution-scroll-progress" aria-hidden="true" />;
}
