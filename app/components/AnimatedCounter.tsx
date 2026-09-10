"use client";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const steps = 40;
          const step = target / steps;
          let frame = 0;

          const tick = () => {
            frame++;
            current += step;
            if (current >= target || frame >= steps) {
              const formatted =
                decimals > 0
                  ? target.toFixed(decimals)
                  : target.toLocaleString("pt-BR");
              el.textContent = `${prefix}${formatted}${suffix}`;
              return;
            }
            const formatted =
              decimals > 0
                ? current.toFixed(decimals)
                : Math.floor(current).toLocaleString("pt-BR");
            el.textContent = `${prefix}${formatted}${suffix}`;
            requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, prefix, decimals, hasAnimated]);

  return (
    <span
      ref={ref}
      className={`counter ${className}`}
      data-target={target}
    >
      {prefix}0{suffix}
    </span>
  );
}
