'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { featuredTheorems } from '@/lib/theorems';

// ═══════════════════════════════════════════════════════════════════════════════
// CHALKBOARD HERO - Self-Writing Mathematical Proofs
// Features realistic chalk physics, dust particles, and Hagoromo-style chalk
// ═══════════════════════════════════════════════════════════════════════════════

interface ChalkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  color: string;
}

interface ChalkDust {
  x: number;
  y: number;
  opacity: number;
}

// Chalk colors inspired by Hagoromo
const CHALK_COLORS = {
  white: { main: '#F5F5F0', glow: 'rgba(245, 245, 240, 0.4)' },
  yellow: { main: '#F5E6A3', glow: 'rgba(245, 230, 163, 0.4)' },
  sage: { main: '#C4D8C4', glow: 'rgba(196, 216, 196, 0.4)' },
};

export default function ChalkboardHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<ChalkParticle[]>([]);
  const dustRef = useRef<ChalkDust[]>([]);
  const animationRef = useRef<number>(0);
  const [theorem, setTheorem] = useState(featuredTheorems[0]);
  const [writingState, setWritingState] = useState<'idle' | 'writing' | 'complete'>('idle');
  const [chalkPos, setChalkPos] = useState({ x: 100, y: 200, angle: -30, visible: false });
  const [mounted, setMounted] = useState(false);

  // Select random featured theorem on mount
  useEffect(() => {
    setMounted(true);
    const randomTheorem = featuredTheorems[Math.floor(Math.random() * featuredTheorems.length)];
    setTheorem(randomTheorem);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // CHALK PHYSICS ENGINE
  // ─────────────────────────────────────────────────────────────────────────────

  // Draw realistic chalk bristle effect
  const drawChalkBristles = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    pressure: number = 1,
    color: typeof CHALK_COLORS.white = CHALK_COLORS.white
  ) => {
    const bristleCount = 15 + Math.floor(Math.random() * 5);
    const spread = 8 * pressure;

    for (let i = 0; i < bristleCount; i++) {
      const angle = (i / bristleCount) * Math.PI * 2 + Math.random() * 0.5;
      const distance = Math.random() * spread * (0.3 + Math.random() * 0.7);
      const offsetX = Math.cos(angle) * distance + (Math.random() - 0.5) * 3;
      const offsetY = Math.sin(angle) * distance + (Math.random() - 0.5) * 3;
      const size = (0.4 + Math.random() * 1.8) * pressure;
      const opacity = (0.25 + Math.random() * 0.55) * pressure;

      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 245, 240, ${opacity})`;
      ctx.fill();
    }

    // Add smudge effect around the stroke
    if (Math.random() > 0.7) {
      ctx.beginPath();
      ctx.arc(x + (Math.random() - 0.5) * 15, y + (Math.random() - 0.5) * 15, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 245, 240, ${0.05 + Math.random() * 0.1})`;
      ctx.fill();
    }

    // Spawn dust particles
    if (Math.random() > 0.8) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2 - 0.5,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        life: 100 + Math.random() * 60,
        color: color.main,
      });
    }

    // Accumulate chalk dust on the ledge
    if (Math.random() > 0.95) {
      dustRef.current.push({
        x: x + (Math.random() - 0.5) * 20,
        y: containerRef.current ? containerRef.current.clientHeight - 32 : 0,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
  }, []);

  // Draw chalk stroke between two points with natural variation
  const drawChalkStroke = useCallback((
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    pressure: number = 1
  ) => {
    const dist = Math.hypot(toX - fromX, toY - fromY);
    const steps = Math.max(Math.ceil(dist / 1.5), 1);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // Add natural hand tremor
      const tremor = Math.sin(t * Math.PI * 6) * 0.3;
      const x = fromX + (toX - fromX) * t + tremor;
      const y = fromY + (toY - fromY) * t + tremor * 0.5;
      // Vary pressure along stroke for realistic effect
      const strokePressure = pressure * (0.7 + Math.sin(t * Math.PI) * 0.3);
      drawChalkBristles(ctx, x, y, strokePressure);
    }
  }, [drawChalkBristles]);

  // Update and render floating dust particles
  const updateParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.025; // subtle gravity
      p.vx *= 0.985; // air resistance
      p.life--;
      p.opacity *= 0.975;

      if (p.life > 0 && p.opacity > 0.01) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (p.life / 100), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 240, ${p.opacity * 0.6})`;
        ctx.fill();
        return true;
      }
      return false;
    });

    // Draw accumulated dust
    dustRef.current.slice(-50).forEach((d) => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, 1 + Math.random(), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 245, 240, ${d.opacity})`;
      ctx.fill();
    });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // MAIN ANIMATION LOOP
  // ─────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!mounted) return;

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

    // Use the theorem's LaTeX as display text (simplified for canvas)
    const text = theorem.latex
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\\\/g, '')
      .replace(/\\[a-z]+/g, '')
      .replace(/[{}]/g, '')
      .trim();

    const fontSize = Math.min(container.clientWidth / 16, 48);
    ctx.font = `500 ${fontSize}px 'Cormorant Garamond', Georgia, serif`;

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2 - 30;
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

    // Clear canvas initially
    ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);

    const animate = () => {
      // Very subtle fade for particle trails
      ctx.fillStyle = 'rgba(26, 42, 37, 0.02)';
      ctx.fillRect(0, 0, container.clientWidth, container.clientHeight);

      // Update particles
      updateParticles(ctx);

      if (writingState === 'writing' && charIndex < text.length) {
        const char = text[charIndex];
        const charWidth = charWidths[charIndex];

        // Calculate stroke position with natural variation
        const strokeX = currentX + charWidth * charProgress;
        const wobble = Math.sin(charProgress * Math.PI * 3) * 1.5;
        const strokeY = centerY + wobble;

        if (charProgress > 0) {
          drawChalkStroke(ctx, lastX, lastY, strokeX, strokeY, 0.85);
        }

        lastX = strokeX;
        lastY = strokeY;

        // Update chalk position
        setChalkPos({
          x: strokeX,
          y: strokeY - 50,
          angle: -25 + Math.sin(charProgress * Math.PI * 4) * 8,
          visible: true,
        });

        charProgress += 0.07;

        if (charProgress >= 1) {
          // Complete character - draw with chalk texture
          ctx.save();
          ctx.fillStyle = 'rgba(245, 245, 240, 0.9)';
          ctx.shadowColor = 'rgba(245, 245, 240, 0.3)';
          ctx.shadowBlur = 4;
          ctx.fillText(char, currentX, centerY);
          ctx.restore();

          // Add subtle glow
          ctx.save();
          ctx.fillStyle = 'rgba(245, 245, 240, 0.1)';
          ctx.filter = 'blur(3px)';
          ctx.fillText(char, currentX, centerY);
          ctx.restore();

          currentX += charWidth + (char === ' ' ? 6 : 2);
          charIndex++;
          charProgress = 0;
          lastX = currentX;
          lastY = centerY;
        }
      } else if (charIndex >= text.length && writingState === 'writing') {
        // Writing complete - settle chalk on ledge
        setWritingState('complete');
        setTimeout(() => {
          setChalkPos({
            x: container.clientWidth - 100,
            y: container.clientHeight - 45,
            angle: 75,
            visible: true,
          });
        }, 400);
      }

      if (writingState === 'writing' || particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation after delay
    const timeout = setTimeout(() => {
      setWritingState('writing');
      setChalkPos({ x: startX, y: centerY - 50, angle: -30, visible: true });
      animate();
    }, 1200);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timeout);
    };
  }, [theorem, writingState, mounted, drawChalkStroke, updateParticles]);

  if (!mounted) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-6 bg-sage-deep">
        <div className="animate-pulse text-parchment-aged">Loading...</div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-6">
      {/* Atmospheric warm light gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(201, 162, 39, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, rgba(139, 115, 85, 0.03) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 115, 85, 0.02) 0%, transparent 40%)
          `,
        }}
      />

      {/* Sage vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26, 42, 26, 0.3) 100%)',
        }}
      />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Title above chalkboard */}
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="font-heading text-hero text-parchment tracking-wide mb-3">
            John Christopher
          </h1>
          <p className="font-decorative text-xl text-brass italic">
            Mathematics Student
          </p>
          <p className="font-body text-sm text-sage-bright mt-2 tracking-wider uppercase">
            Algebraic Topology • Category Theory • Homotopy Theory
          </p>
        </div>

        {/* Chalkboard container with sage-tinted slate */}
        <div
          ref={containerRef}
          className="relative aspect-video max-w-4xl mx-auto rounded overflow-hidden"
          style={{
            background: `
              linear-gradient(145deg,
                #1A2A25 0%,
                #152520 30%,
                #101D18 60%,
                #0C1612 100%
              )
            `,
            boxShadow: `
              inset 0 0 100px rgba(0, 0, 0, 0.5),
              inset 0 0 40px rgba(26, 42, 37, 0.3),
              0 0 0 8px #4A3728,
              0 0 0 12px #5C4033,
              0 0 0 14px #6B5344,
              0 25px 80px rgba(0, 0, 0, 0.6),
              0 10px 30px rgba(0, 0, 0, 0.4)
            `,
          }}
        >
          {/* Realistic slate texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Subtle sage tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 40% 30%, rgba(74, 90, 74, 0.08) 0%, transparent 60%)',
            }}
          />

          {/* Light reflection on top edge */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 100%)',
            }}
          />

          {/* Worn areas - lighter patches */}
          <div
            className="absolute pointer-events-none opacity-10"
            style={{
              top: '20%',
              left: '15%',
              width: '30%',
              height: '40%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)',
            }}
          />

          {/* Canvas for chalk writing animation */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Hagoromo-style chalk piece */}
          <div
            className="absolute transition-all duration-500 ease-weighted pointer-events-none"
            style={{
              left: chalkPos.x,
              top: chalkPos.y,
              transform: `rotate(${chalkPos.angle}deg) translateX(-50%)`,
              opacity: chalkPos.visible ? 1 : 0,
              transition: writingState === 'complete' ? 'all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'all 100ms ease-out',
            }}
          >
            <div className="relative">
              {/* Chalk body - cylindrical Hagoromo style */}
              <div
                className="w-4 h-16 rounded-full relative overflow-hidden"
                style={{
                  background: `
                    linear-gradient(90deg,
                      #D8D8D0 0%,
                      #F5F5F0 20%,
                      #FFFFFF 40%,
                      #F5F5F0 60%,
                      #E8E8E0 80%,
                      #D0D0C8 100%
                    )
                  `,
                  boxShadow: `
                    inset 3px 0 6px rgba(255,255,255,0.6),
                    inset -3px 0 6px rgba(0,0,0,0.15),
                    0 3px 10px rgba(0,0,0,0.4),
                    0 1px 3px rgba(0,0,0,0.3)
                  `,
                }}
              >
                {/* Chalk dust texture */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Worn tip at bottom */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-4 rounded-b-full"
                  style={{
                    background: 'linear-gradient(180deg, #E8E8E0 0%, #B8B8B0 100%)',
                  }}
                />
              </div>

              {/* Chalk shadow on board */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full"
                style={{
                  background: 'rgba(0,0,0,0.35)',
                  filter: 'blur(3px)',
                }}
              />
            </div>
          </div>

          {/* Ornate wooden chalk ledge */}
          <div
            className="absolute bottom-0 left-0 right-0 h-10"
            style={{
              background: `
                linear-gradient(180deg,
                  #6B5344 0%,
                  #5C4033 20%,
                  #4A3728 50%,
                  #3D2B1F 80%,
                  #2D1F15 100%
                )
              `,
              boxShadow: `
                inset 0 3px 6px rgba(255,255,255,0.12),
                inset 0 -3px 8px rgba(0,0,0,0.4),
                0 -2px 4px rgba(0,0,0,0.2)
              `,
            }}
          >
            {/* Wood grain texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    90deg,
                    transparent 0px,
                    transparent 20px,
                    rgba(0,0,0,0.1) 20px,
                    rgba(0,0,0,0.1) 21px
                  )
                `,
              }}
            />

            {/* Chalk dust line on ledge */}
            <div
              className="absolute inset-x-0 top-0 h-1.5"
              style={{
                background: 'linear-gradient(180deg, rgba(245,245,240,0.2) 0%, rgba(245,245,240,0.05) 100%)',
              }}
            />

            {/* Extra chalk pieces on ledge */}
            <div
              className="absolute bottom-2 right-24 w-2.5 h-8 rounded-full opacity-70"
              style={{
                background: 'linear-gradient(90deg, #E8E8E0 0%, #F8F8F4 50%, #E8E8E0 100%)',
                transform: 'rotate(15deg)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
            <div
              className="absolute bottom-2 right-36 w-2 h-5 rounded-full opacity-50"
              style={{
                background: 'linear-gradient(90deg, #F5E6A3 0%, #FFF5C3 50%, #F5E6A3 100%)',
                transform: 'rotate(-8deg)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
            <div
              className="absolute bottom-2 left-20 w-1.5 h-3 rounded-full opacity-40"
              style={{
                background: 'linear-gradient(90deg, #C4D8C4 0%, #D8ECD8 50%, #C4D8C4 100%)',
                transform: 'rotate(25deg)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>

        {/* Theorem information */}
        <div className="text-center mt-10 space-y-2">
          <p className="font-heading text-xl text-gold-leaf tracking-wide">{theorem.name}</p>
          <p className="font-decorative text-sm text-parchment-aged italic max-w-xl mx-auto">
            {theorem.description}
          </p>
          {theorem.mathematician && (
            <p className="font-body text-xs text-brass-tarnished tracking-wider">
              — {theorem.mathematician}, {theorem.year && theorem.year > 0 ? theorem.year : `${Math.abs(theorem.year || 0)} BCE`}
            </p>
          )}
        </div>

        {/* Scroll indicator with Gothic flair */}
        <div className="flex justify-center mt-14 animate-float">
          <div className="flex flex-col items-center gap-3 text-brass-tarnished group cursor-pointer hover:text-gold transition-colors duration-300">
            <span className="text-xs tracking-[0.2em] uppercase font-body">Scroll to explore</span>
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              {/* Gothic decorative element */}
              <div className="absolute -left-4 -right-4 top-1/2 h-px bg-gradient-to-r from-transparent via-brass-tarnished/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
