'use client';

import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// DUST MOTES - Atmospheric Particle Effect
// Simulates dust particles floating in candlelight/sunlight beams
// Like particles visible in an old library when light streams through windows
// ═══════════════════════════════════════════════════════════════════════════════

interface Mote {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  oscillationSpeed: number;
  oscillationAmplitude: number;
  phase: number;
  brightness: number;
}

interface DustMotesProps {
  count?: number;
  className?: string;
}

export default function DustMotes({ count = 50, className = '' }: DustMotesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motesRef = useRef<Mote[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initMotes();
    };

    const initMotes = () => {
      motesRef.current = [];
      for (let i = 0; i < count; i++) {
        motesRef.current.push(createMote());
      }
    };

    const createMote = (): Mote => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 0.5 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.2 - 0.1, // Slight upward drift
      oscillationSpeed: 0.01 + Math.random() * 0.02,
      oscillationAmplitude: 10 + Math.random() * 30,
      phase: Math.random() * Math.PI * 2,
      brightness: 0.5 + Math.random() * 0.5,
    });

    resize();
    window.addEventListener('resize', resize);

    // Track mouse for subtle interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      motesRef.current.forEach((mote) => {
        // Calculate distance from mouse for subtle repulsion
        const dx = mote.x - mouseRef.current.x;
        const dy = mote.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const force = (100 - dist) / 100 * 0.5;
          mote.x += (dx / dist) * force;
          mote.y += (dy / dist) * force;
        }

        // Update position with oscillation
        mote.x += mote.speedX + Math.sin(time * mote.oscillationSpeed + mote.phase) * 0.3;
        mote.y += mote.speedY;
        mote.phase += 0.01;

        // Wrap around edges
        if (mote.x < -10) mote.x = window.innerWidth + 10;
        if (mote.x > window.innerWidth + 10) mote.x = -10;
        if (mote.y < -10) mote.y = window.innerHeight + 10;
        if (mote.y > window.innerHeight + 10) mote.y = -10;

        // Calculate flicker effect (like light catching the particle)
        const flicker = 0.7 + Math.sin(time * 3 + mote.phase) * 0.3;
        const finalOpacity = mote.opacity * mote.brightness * flicker;

        // Draw mote with soft glow
        const gradient = ctx.createRadialGradient(
          mote.x, mote.y, 0,
          mote.x, mote.y, mote.size * 2
        );
        gradient.addColorStop(0, `rgba(245, 230, 200, ${finalOpacity})`);
        gradient.addColorStop(0.5, `rgba(220, 200, 160, ${finalOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(200, 180, 140, 0)');

        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core of the mote
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 250, 240, ${finalOpacity * 1.5})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
      aria-hidden="true"
    />
  );
}
