"use client";

import React, { useRef, useState, useCallback } from "react";

interface UseMagneticOptions {
  maxDistance?: number;
  damping?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: UseMagneticOptions = {}
) {
  const { maxDistance = 6, damping = 0.35 } = options;
  const ref = useRef<T>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * damping;
      const deltaY = (e.clientY - centerY) * damping;
      const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
      const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

      setStyle({
        transform: `translate3d(${clampedX.toFixed(1)}px, ${clampedY.toFixed(1)}px, 0)`,
        transition: "transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)",
      });
    },
    [damping, maxDistance]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: "translate3d(0, 0, 0)",
      transition: "transform 0.35s cubic-bezier(0.65, 0, 0.35, 1)",
    });
  }, []);

  return {
    ref,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
}

export function MagneticButton({
  children,
  className = "",
  maxDistance = 6,
  style: userStyle,
  onMouseMove: userMouseMove,
  onMouseLeave: userMouseLeave,
  ...props
}: MagneticButtonProps) {
  const { ref, style: magneticStyle, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement>({
    maxDistance,
  });

  return (
    <button
      ref={ref}
      className={`btn-magnetic ${className}`}
      style={{ ...userStyle, ...magneticStyle }}
      onMouseMove={(e) => {
        onMouseMove(e);
        userMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        onMouseLeave();
        userMouseLeave?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
