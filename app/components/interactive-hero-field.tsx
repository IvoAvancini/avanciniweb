"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  color: string;
}

export function InteractiveHeroField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      force: 6,
    };

    const colors = ["#22c55e", "#38bdf8", "#60a5fa", "#34d399"];
    const particles: Particle[] = [];

    // Calculate grid spacing based on viewport
    const spacing = Math.max(38, Math.floor(Math.sqrt((width * height) / 360)));

    const createParticles = () => {
      particles.length = 0;
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          const jitterX = (Math.random() - 0.5) * (spacing * 0.4);
          const jitterY = (Math.random() - 0.5) * (spacing * 0.4);
          const px = x + jitterX;
          const py = y + jitterY;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const size = Math.random() * 1.6 + 1.2;

          particles.push({
            x: px,
            y: py,
            originX: px,
            originY: py,
            vx: 0,
            vy: 0,
            size,
            baseAlpha: Math.random() * 0.35 + 0.15,
            color,
          });
        }
      }
    };

    createParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      createParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Physics parameters
    const friction = 0.88;
    const restoreSpeed = 0.04;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting lines between close particles
      ctx.lineWidth = 0.5;

      const count = particles.length;
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // Interaction with mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * mouse.force;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 1.5;
          p.vy -= Math.sin(angle) * force * 1.5;
        }

        // Return to origin spring
        const ox = p.originX - p.x;
        const oy = p.originY - p.y;
        p.vx += ox * restoreSpeed;
        p.vy += oy * restoreSpeed;

        // Apply friction
        p.vx *= friction;
        p.vy *= friction;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Calculate proximity to mouse for glow intensification
        let alpha = p.baseAlpha;
        let currentSize = p.size;

        if (dist < mouse.radius * 1.4) {
          const proximity = 1 - Math.min(1, dist / (mouse.radius * 1.4));
          alpha = Math.min(0.9, p.baseAlpha + proximity * 0.6);
          currentSize = p.size * (1 + proximity * 1.2);
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // Connect near neighbors when close to cursor
        if (dist < mouse.radius * 0.9) {
          for (let j = i + 1; j < Math.min(i + 6, count); j++) {
            const p2 = particles[j];
            const p2dx = p.x - p2.x;
            const p2dy = p.y - p2.y;
            const p2dist = Math.sqrt(p2dx * p2dx + p2dy * p2dy);

            if (p2dist < spacing * 1.4) {
              const lineAlpha = (1 - p2dist / (spacing * 1.4)) * 0.25;
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = lineAlpha;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-hero-canvas"
      aria-hidden="true"
    />
  );
}
