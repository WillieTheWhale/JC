'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getRandomTheorem } from '@/lib/theorems';
import { TheoremPath } from '@/types';

interface ChalkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

export default function ChalkboardHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chalkRef = useRef<HTMLDivElement>(null);
  const [theorem, setTheorem] = useState<TheoremPath | null>(null);
  const [isWriting, setIsWriting] = useState(true);
  const [chalkPosition, setChalkPosition] = useState({ x: 0, y: 0, angle: 0 });
  const particlesRef = useRef<ChalkParticle[]>([]);
  const animationRef = useRef<number>(0);

  // Initialize theorem
  useEffect(() => {
    setTheorem(getRandomTheorem());
  }, []);

  // Chalk brush drawing function
  const drawChalkStroke = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    pressure: number = 1
  ) => {
    const bristles = 8;
    const color = 'rgba(245, 245, 240, ';

    for (let i = 0; i < bristles; i++) {
      const offsetX = (Math.random() - 0.5) * 4 * pressure;
      const offsetY = (Math.random() - 0.5) * 4 * pressure;
      const size = (Math.random() * 1.5 + 0.5) * pressure;
      const opacity = (Math.random() * 0.4 + 0.4) * pressure;

      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${opacity})`;
      ctx.fill();
    }

    // Spawn dust particles
    if (Math.random() > 0.7) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        life: 60 + Math.random() * 60,
      });
    }
  }, []);

  // Update and draw particles
  const updateParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02; // gravity
      p.vx *= 0.99; // friction
      p.life--;
      p.opacity *= 0.98;

      if (p.life > 0 && p.opacity > 0.01) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 240, ${p.opacity})`;
        ctx.fill();
        return true;
      }
      return false;
    });
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!canvasRef.current || !theorem) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        ctx.scale(2, 2);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Text to write
    const text = theorem.latex.replace(/\\/g, '').replace(/[{}^_]/g, '');
    const fontSize = Math.min(canvas.width / 20, 48);
    ctx.font = `${fontSize}px 'Cormorant Garamond', Georgia, serif`;

    // Calculate text positioning
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const centerX = canvas.width / 4;
    const centerY = canvas.height / 4;
    const startX = centerX - textWidth / 2;
    const startY = centerY;

    let charIndex = 0;
    let strokeProgress = 0;
    const writeSpeed = 0.05;
    let currentX = startX;

    const animate = () => {
      // Clear and redraw particles only (text persists)
      ctx.fillStyle = 'rgba(26, 26, 26, 0.02)';
      ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

      updateParticles(ctx);

      if (isWriting && charIndex < text.length) {
        const char = text[charIndex];
        const charWidth = ctx.measureText(char).width;

        // Draw chalk strokes for current character
        const steps = 5;
        for (let s = 0; s < steps; s++) {
          const t = strokeProgress + s * writeSpeed / steps;
          if (t <= 1) {
            const x = currentX + charWidth * t;
            const y = startY + Math.sin(t * Math.PI) * 2;
            drawChalkStroke(ctx, x, y, 0.8 + Math.random() * 0.4);
          }
        }

        // Update chalk position
        setChalkPosition({
          x: currentX + charWidth * strokeProgress,
          y: startY,
          angle: -30 + Math.random() * 5,
        });

        strokeProgress += writeSpeed;

        if (strokeProgress >= 1) {
          // Draw the actual character with chalk effect
          ctx.fillStyle = 'rgba(245, 245, 240, 0.9)';
          ctx.shadowColor = 'rgba(245, 245, 240, 0.3)';
          ctx.shadowBlur = 2;
          ctx.fillText(char, currentX, startY);
          ctx.shadowBlur = 0;

          currentX += charWidth + 2;
          charIndex++;
          strokeProgress = 0;
        }
      } else if (charIndex >= text.length && isWriting) {
        // Finished writing - animate chalk to rest
        setIsWriting(false);
        setTimeout(() => {
          setChalkPosition((prev) => ({
            ...prev,
            y: centerY * 2 + 50,
            angle: 90,
          }));
        }, 500);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start with a delay
    const timeout = setTimeout(() => {
      animate();
    }, 500);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timeout);
    };
  }, [theorem, isWriting, drawChalkStroke, updateParticles]);

  return (
    <div className="relative w-full aspect-video max-w-4xl mx-auto">
      {/* Chalkboard background */}
      <div className="absolute inset-0 chalkboard rounded-lg overflow-hidden shadow-elevated">
        {/* Slate texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Canvas for chalk writing */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* 3D Chalk piece */}
        <div
          ref={chalkRef}
          className="absolute transition-all duration-500 ease-inertia pointer-events-none"
          style={{
            left: chalkPosition.x,
            top: chalkPosition.y - 30,
            transform: `rotate(${chalkPosition.angle}deg)`,
            opacity: isWriting ? 1 : 0.7,
          }}
        >
          {/* Chalk cylinder */}
          <div className="relative">
            <div
              className="w-3 h-12 rounded-full bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200"
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.5)',
              }}
            >
              {/* Worn tip */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-300" />
            </div>
          </div>
        </div>

        {/* Chalk ledge */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-900 to-amber-950">
          {/* Chalk dust accumulation */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-gray-200/20 to-transparent" />
        </div>
      </div>

      {/* Theorem info */}
      {theorem && (
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <p className="text-sage-500 text-sm font-decorative italic">
            {theorem.description}
          </p>
        </div>
      )}
    </div>
  );
}
