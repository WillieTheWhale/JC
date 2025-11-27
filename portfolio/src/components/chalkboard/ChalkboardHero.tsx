'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Mathematical theorems with their SVG path data for realistic chalk writing
const theorems = [
  {
    id: 'euler',
    name: "Euler's Identity",
    description: 'The most beautiful equation in mathematics',
    // Simplified text representation - actual SVG paths would be complex
    text: 'e^(i*pi) + 1 = 0',
    duration: 4000,
  },
  {
    id: 'pythagorean',
    name: 'Pythagorean Theorem',
    description: 'Foundation of Euclidean geometry',
    text: 'a^2 + b^2 = c^2',
    duration: 3500,
  },
  {
    id: 'quadratic',
    name: 'Quadratic Formula',
    description: 'Solution to polynomial equations',
    text: 'x = (-b +/- sqrt(b^2-4ac)) / 2a',
    duration: 5000,
  },
  {
    id: 'gaussian',
    name: 'Gaussian Integral',
    description: 'The most important integral in mathematics',
    text: 'integral(-inf to inf) e^(-x^2) dx = sqrt(pi)',
    duration: 5500,
  },
];

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
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<ChalkParticle[]>([]);
  const animationRef = useRef<number>(0);
  const [theorem, setTheorem] = useState(theorems[0]);
  const [isWriting, setIsWriting] = useState(true);
  const [chalkPos, setChalkPos] = useState({ x: 0, y: 0, angle: -30, visible: true });

  // Select random theorem on mount
  useEffect(() => {
    const randomTheorem = theorems[Math.floor(Math.random() * theorems.length)];
    setTheorem(randomTheorem);
  }, []);

  // Chalk brush with realistic bristle effect
  const drawChalkBristles = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    pressure: number = 1
  ) => {
    const bristleCount = 12;
    const spread = 6 * pressure;

    for (let i = 0; i < bristleCount; i++) {
      const angle = (i / bristleCount) * Math.PI * 2;
      const distance = Math.random() * spread;
      const offsetX = Math.cos(angle) * distance + (Math.random() - 0.5) * 2;
      const offsetY = Math.sin(angle) * distance + (Math.random() - 0.5) * 2;
      const size = (0.5 + Math.random() * 1.5) * pressure;
      const opacity = (0.3 + Math.random() * 0.5) * pressure;

      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 245, 240, ${opacity})`;
      ctx.fill();
    }

    // Spawn dust particles occasionally
    if (Math.random() > 0.85) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 1.5 - 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        life: 80 + Math.random() * 40,
      });
    }
  }, []);

  // Draw chalk stroke between two points
  const drawChalkStroke = useCallback((
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    pressure: number = 1
  ) => {
    const dist = Math.hypot(toX - fromX, toY - fromY);
    const steps = Math.max(Math.ceil(dist / 2), 1);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = fromX + (toX - fromX) * t;
      const y = fromY + (toY - fromY) * t;
      // Vary pressure along stroke
      const strokePressure = pressure * (0.8 + Math.sin(t * Math.PI) * 0.2);
      drawChalkBristles(ctx, x, y, strokePressure);
    }
  }, [drawChalkBristles]);

  // Update and render particles
  const updateParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03; // gravity
      p.vx *= 0.98; // air friction
      p.life--;
      p.opacity *= 0.97;

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
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas with proper DPR
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Text properties
    const text = theorem.text;
    const fontSize = Math.min(container.clientWidth / 18, 42);
    ctx.font = `500 ${fontSize}px 'Cormorant Garamond', Georgia, serif`;

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2 - 20;
    const startX = centerX - textWidth / 2;

    let charIndex = 0;
    let charProgress = 0;
    let currentX = startX;
    let lastX = startX;
    let lastY = centerY;
    const charWidths: number[] = [];

    // Pre-calculate character widths
    for (let i = 0; i < text.length; i++) {
      charWidths.push(ctx.measureText(text[i]).width);
    }

    const animate = () => {
      // Clear only particles area (preserving written text)
      ctx.fillStyle = 'rgba(20, 31, 32, 0.03)';
      ctx.fillRect(0, 0, container.clientWidth, container.clientHeight);

      // Update particles
      updateParticles(ctx);

      if (isWriting && charIndex < text.length) {
        const char = text[charIndex];
        const charWidth = charWidths[charIndex];

        // Draw chalk strokes
        const strokeX = currentX + charWidth * charProgress;
        const strokeY = centerY + Math.sin(charProgress * Math.PI) * 2;

        if (charProgress > 0) {
          drawChalkStroke(ctx, lastX, lastY, strokeX, strokeY, 0.9);
        }

        lastX = strokeX;
        lastY = strokeY;

        // Update chalk position for visual
        setChalkPos({
          x: strokeX,
          y: strokeY - 40,
          angle: -30 + Math.sin(charProgress * Math.PI * 4) * 5,
          visible: true,
        });

        charProgress += 0.08;

        if (charProgress >= 1) {
          // Complete character - draw with chalk effect
          ctx.save();
          ctx.fillStyle = 'rgba(245, 245, 240, 0.92)';
          ctx.shadowColor = 'rgba(245, 245, 240, 0.4)';
          ctx.shadowBlur = 3;
          ctx.fillText(char, currentX, centerY);
          ctx.restore();

          currentX += charWidth + (char === ' ' ? 5 : 2);
          charIndex++;
          charProgress = 0;
          lastX = currentX;
          lastY = centerY;
        }
      } else if (charIndex >= text.length && isWriting) {
        // Writing complete - settle chalk
        setIsWriting(false);
        setTimeout(() => {
          setChalkPos(prev => ({
            ...prev,
            x: container.clientWidth - 80,
            y: container.clientHeight - 35,
            angle: 85,
            visible: true,
          }));
        }, 300);
      }

      if (isWriting || particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start with delay
    const timeout = setTimeout(() => {
      animate();
    }, 800);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timeout);
    };
  }, [theorem, isWriting, drawChalkStroke, updateParticles]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-6">
      {/* Background atmospheric effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(244, 208, 63, 0.03) 0%, transparent 50%)',
        }}
      />

      <div className="w-full max-w-5xl mx-auto">
        {/* Title above chalkboard */}
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="font-heading text-hero text-parchment tracking-wide mb-3">
            John Christopher
          </h1>
          <p className="font-decorative text-lg text-brass italic">
            Mathematics Student
          </p>
        </div>

        {/* Chalkboard container */}
        <div
          ref={containerRef}
          className="relative aspect-video max-w-4xl mx-auto rounded overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1E2D2F 0%, #141F20 50%, #0F1718 100%)',
            boxShadow: `
              inset 0 0 80px rgba(0, 0, 0, 0.4),
              0 0 0 12px #5C4033,
              0 0 0 14px #8B7355,
              0 20px 60px rgba(0, 0, 0, 0.5)
            `,
          }}
        >
          {/* Slate texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Subtle light reflection */}
          <div
            className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
            }}
          />

          {/* Canvas for chalk writing */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* 3D Chalk piece */}
          <div
            className="absolute transition-all duration-700 ease-weighted pointer-events-none"
            style={{
              left: chalkPos.x,
              top: chalkPos.y,
              transform: `rotate(${chalkPos.angle}deg)`,
              opacity: chalkPos.visible ? 1 : 0,
            }}
          >
            <div className="relative">
              {/* Chalk body */}
              <div
                className="w-3 h-14 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #E8E8E0 0%, #F8F8F4 30%, #E8E8E0 70%, #D8D8D0 100%)',
                  boxShadow: `
                    inset 2px 0 4px rgba(255,255,255,0.5),
                    inset -2px 0 4px rgba(0,0,0,0.1),
                    0 2px 8px rgba(0,0,0,0.4)
                  `,
                }}
              >
                {/* Worn tip */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-3 rounded-b-full"
                  style={{
                    background: 'linear-gradient(180deg, #E8E8E0 0%, #C8C8C0 100%)',
                  }}
                />
              </div>
              {/* Shadow on board */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  filter: 'blur(2px)',
                }}
              />
            </div>
          </div>

          {/* Chalk ledge */}
          <div
            className="absolute bottom-0 left-0 right-0 h-8"
            style={{
              background: 'linear-gradient(180deg, #5C4033 0%, #4A3728 40%, #3D2B1F 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 6px rgba(0,0,0,0.3)',
            }}
          >
            {/* Chalk dust accumulation */}
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{
                background: 'linear-gradient(180deg, rgba(245,245,240,0.15) 0%, transparent 100%)',
              }}
            />
            {/* Scattered chalk pieces */}
            <div className="absolute bottom-2 right-20 w-2 h-6 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 rotate-12 opacity-60" />
            <div className="absolute bottom-2 right-32 w-1.5 h-4 rounded-full bg-gradient-to-b from-yellow-100 to-yellow-200 -rotate-6 opacity-50" />
          </div>
        </div>

        {/* Theorem info */}
        <div className="text-center mt-8">
          <p className="font-heading text-lg text-gold mb-1">{theorem.name}</p>
          <p className="font-decorative text-sm text-brass-tarnished italic">
            {theorem.description}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12 animate-float">
          <div className="flex flex-col items-center gap-2 text-brass-tarnished">
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
