'use client';

import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// FLOATING MATHEMATICAL SYMBOLS
// Creates an atmospheric background with gently drifting mathematical symbols
// Like dust motes in an old library catching the light
// ═══════════════════════════════════════════════════════════════════════════════

const MATH_SYMBOLS = [
  'π', 'φ', 'Σ', '∫', '∂', '∇', '∞', 'ε', 'δ', 'λ',
  'α', 'β', 'γ', 'θ', 'ω', 'ψ', 'ζ', 'η', 'μ', 'σ',
  '∈', '∀', '∃', '⊂', '∪', '∩', '⊕', '⊗', '≅', '≡',
  '√', '∝', '≈', '±', '×', '÷', '≤', '≥', '≠', '∴',
];

interface Symbol {
  x: number;
  y: number;
  char: string;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  phase: number;
}

interface FloatingSymbolsProps {
  density?: number; // 0-1, how many symbols
  speed?: number; // movement speed multiplier
  className?: string;
}

export default function FloatingSymbols({
  density = 0.3,
  speed = 1,
  className = '',
}: FloatingSymbolsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbolsRef = useRef<Symbol[]>([]);
  const animationRef = useRef<number>(0);

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

      // Reinitialize symbols on resize
      initSymbols();
    };

    const initSymbols = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 40000 * density);
      symbolsRef.current = [];

      for (let i = 0; i < count; i++) {
        symbolsRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          char: MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)],
          size: 12 + Math.random() * 18,
          opacity: 0.03 + Math.random() * 0.08,
          speed: (0.1 + Math.random() * 0.3) * speed,
          drift: (Math.random() - 0.5) * 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      symbolsRef.current.forEach((sym) => {
        // Update position
        sym.y -= sym.speed * (delta / 16);
        sym.x += Math.sin(time * 0.001 + sym.phase) * sym.drift * 0.5;
        sym.rotation += sym.rotationSpeed;

        // Wrap around
        if (sym.y < -50) {
          sym.y = window.innerHeight + 50;
          sym.x = Math.random() * window.innerWidth;
        }
        if (sym.x < -50) sym.x = window.innerWidth + 50;
        if (sym.x > window.innerWidth + 50) sym.x = -50;

        // Draw symbol
        ctx.save();
        ctx.translate(sym.x, sym.y);
        ctx.rotate(sym.rotation);
        ctx.font = `${sym.size}px 'Cormorant Garamond', Georgia, serif`;
        ctx.fillStyle = `rgba(139, 115, 85, ${sym.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sym.char, 0, 0);
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
