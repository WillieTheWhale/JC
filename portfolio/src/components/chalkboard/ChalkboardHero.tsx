'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import katex from 'katex';
import { featuredTheorems } from '@/lib/theorems';

// ═══════════════════════════════════════════════════════════════════════════════
// CHALKBOARD HERO - Self-Writing Mathematical Proofs
// Clean chalk writing animation without distortion effects
// ═══════════════════════════════════════════════════════════════════════════════

interface ChalkDustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

// Select a random featured theorem
const getRandomTheorem = () => {
  const index = Math.floor(Math.random() * featuredTheorems.length);
  return featuredTheorems[index];
};

export default function ChalkboardHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const katexRef = useRef<HTMLDivElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const chalkRef = useRef<HTMLDivElement>(null);

  const [theorem] = useState(getRandomTheorem);
  const [animationPhase, setAnimationPhase] = useState<'waiting' | 'writing' | 'complete'>('waiting');
  const [revealProgress, setRevealProgress] = useState(0);

  const dustParticlesRef = useRef<ChalkDustParticle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const chalkAnimFrameRef = useRef<number>(0);

  // Render KaTeX equation
  useEffect(() => {
    if (katexRef.current && theorem) {
      try {
        katex.render(theorem.latex, katexRef.current, {
          displayMode: true,
          throwOnError: false,
          trust: true,
        });
      } catch (error) {
        console.error('KaTeX error:', error);
        if (katexRef.current) {
          katexRef.current.textContent = theorem.latex;
        }
      }
    }
  }, [theorem]);

  // Update theorem info display
  useEffect(() => {
    if (infoRef.current && theorem) {
      const year = theorem.year ?? 0;
      const yearDisplay = year > 0 ? year : `${Math.abs(year)} BCE`;
      const description = theorem.description ?? '';
      const mathematician = theorem.mathematician ?? 'Unknown';

      infoRef.current.innerHTML = `
        <p class="font-heading text-xl text-gold-leaf tracking-wide">${theorem.name}</p>
        ${description ? `<p class="font-decorative text-sm text-parchment-aged italic max-w-xl mx-auto mt-2">${description}</p>` : ''}
        <p class="font-body text-xs text-brass-tarnished tracking-wider mt-2">— ${mathematician}${year !== 0 ? `, ${yearDisplay}` : ''}</p>
      `;
    }
  }, [theorem]);

  // Spawn dust particle at position
  const spawnDust = useCallback((x: number, y: number) => {
    for (let i = 0; i < 3; i++) {
      dustParticlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2 - 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        life: 40 + Math.random() * 30,
      });
    }
  }, []);

  // Setup and animate dust particles on canvas
  useEffect(() => {
    const canvas = dustCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      return rect;
    };

    const rect = setupCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      dustParticlesRef.current = dustParticlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.vx *= 0.98;
        p.life--;
        p.opacity *= 0.96;

        if (p.life > 0 && p.opacity > 0.01) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (p.life / 40), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 245, 240, ${p.opacity})`;
          ctx.fill();
          return true;
        }
        return false;
      });

      if (animationPhase !== 'complete' || dustParticlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    const handleResize = () => setupCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [animationPhase]);

  // Main writing animation
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setAnimationPhase('writing');

      const duration = 4000; // 4 seconds for writing
      const startTime = performance.now();

      const animateReveal = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic for natural writing feel
        const eased = 1 - Math.pow(1 - progress, 3);
        setRevealProgress(eased);

        // Spawn dust particles at writing position
        if (containerRef.current && progress < 1) {
          const rect = containerRef.current.getBoundingClientRect();
          const writeX = rect.width * 0.1 + eased * rect.width * 0.8;
          const writeY = rect.height * 0.5 + (Math.random() - 0.5) * 40;

          if (Math.random() > 0.6) {
            spawnDust(writeX, writeY);
          }
        }

        if (progress < 1) {
          chalkAnimFrameRef.current = requestAnimationFrame(animateReveal);
        } else {
          setAnimationPhase('complete');
        }
      };

      chalkAnimFrameRef.current = requestAnimationFrame(animateReveal);
    }, 600);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(chalkAnimFrameRef.current);
    };
  }, [spawnDust]);

  // Chalk stick position animation
  useEffect(() => {
    const chalk = chalkRef.current;
    const container = containerRef.current;
    if (!chalk || !container) return;

    const rect = container.getBoundingClientRect();
    const startX = rect.width * 0.08;
    const endX = rect.width * 0.92;
    const centerY = rect.height * 0.5;

    if (animationPhase === 'waiting') {
      chalk.style.opacity = '0';
    } else if (animationPhase === 'writing') {
      chalk.style.opacity = '1';
      chalk.style.transition = 'none';

      const x = startX + revealProgress * (endX - startX);
      const wobbleY = Math.sin(revealProgress * Math.PI * 12) * 3;
      const wobbleAngle = Math.sin(revealProgress * Math.PI * 8) * 8;

      chalk.style.left = `${x}px`;
      chalk.style.top = `${centerY + wobbleY - 60}px`;
      chalk.style.transform = `rotate(${-30 + wobbleAngle}deg) translateX(-50%)`;
    } else if (animationPhase === 'complete') {
      chalk.style.transition = 'all 0.6s ease-out';
      chalk.style.left = `${rect.width - 70}px`;
      chalk.style.top = `${rect.height - 40}px`;
      chalk.style.transform = 'rotate(80deg) translateX(-50%)';
    }
  }, [animationPhase, revealProgress]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Atmospheric gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 15%, rgba(201, 162, 39, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 25% 75%, rgba(139, 115, 85, 0.04) 0%, transparent 45%)
          `,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26, 42, 26, 0.4) 100%)',
        }}
      />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="font-heading text-hero text-parchment tracking-wide mb-4">
            John Christopher
          </h1>
          <p className="font-decorative text-xl text-brass italic mb-2">
            Mathematics Student
          </p>
          <p className="font-body text-sm text-sage-bright tracking-wider uppercase">
            Algebraic Topology • Category Theory • Homotopy Theory
          </p>
        </div>

        {/* Chalkboard */}
        <div
          ref={containerRef}
          className="relative aspect-video max-w-4xl mx-auto rounded-sm overflow-hidden"
          style={{
            background: `linear-gradient(160deg,
              #1e3a2f 0%,
              #1a332a 20%,
              #162b23 50%,
              #12231c 80%,
              #0e1b16 100%
            )`,
            boxShadow: `
              inset 0 0 80px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.03),
              0 0 0 6px #3d2817,
              0 0 0 10px #4a3220,
              0 0 0 12px #5a3d28,
              0 20px 60px rgba(0, 0, 0, 0.5)
            `,
          }}
        >
          {/* Subtle board texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(255,255,255,0.03) 2px,
                  rgba(255,255,255,0.03) 4px
                )
              `,
            }}
          />

          {/* Light reflection at top */}
          <div
            className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
            }}
          />

          {/* Dust particles canvas */}
          <canvas
            ref={dustCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* KaTeX equation with reveal animation */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div
              className="relative overflow-hidden"
              style={{
                clipPath: `inset(0 ${Math.max(0, 100 - revealProgress * 100)}% 0 0)`,
              }}
            >
              <div
                ref={katexRef}
                className="katex-chalk whitespace-nowrap"
                style={{
                  color: '#f0efe8',
                  fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
                  textShadow: `
                    0 0 4px rgba(240, 239, 232, 0.6),
                    0 0 8px rgba(240, 239, 232, 0.3),
                    0 0 12px rgba(240, 239, 232, 0.15)
                  `,
                  letterSpacing: '0.02em',
                }}
              />
            </div>
          </div>

          {/* Chalk stick */}
          <div
            ref={chalkRef}
            className="absolute pointer-events-none z-20"
            style={{ opacity: 0 }}
          >
            <div className="relative">
              {/* Chalk body */}
              <div
                className="w-3 h-12 rounded-full"
                style={{
                  background: `linear-gradient(90deg,
                    #d4d4cc 0%,
                    #e8e8e2 20%,
                    #f5f5f0 50%,
                    #e8e8e2 80%,
                    #d4d4cc 100%
                  )`,
                  boxShadow: `
                    inset 1px 0 3px rgba(255,255,255,0.8),
                    inset -1px 0 2px rgba(0,0,0,0.1),
                    0 2px 6px rgba(0,0,0,0.3)
                  `,
                }}
              />
              {/* Chalk tip wear */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2 rounded-b-full"
                style={{
                  background: 'linear-gradient(180deg, #e0e0d8 0%, #c0c0b8 100%)',
                }}
              />
            </div>
          </div>

          {/* Chalk tray */}
          <div
            className="absolute bottom-0 left-0 right-0 h-8"
            style={{
              background: `linear-gradient(180deg,
                #5a4030 0%,
                #4a3528 30%,
                #3a2a1f 70%,
                #2a1f15 100%
              )`,
              boxShadow: `
                inset 0 2px 3px rgba(255,255,255,0.08),
                inset 0 -2px 4px rgba(0,0,0,0.3)
              `,
            }}
          >
            {/* Tray edge highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            />

            {/* Chalk pieces on tray */}
            <div
              className="absolute bottom-1 right-12 w-2 h-6 rounded-full opacity-60"
              style={{
                background: 'linear-gradient(90deg, #e0e0d8 0%, #f0f0e8 50%, #e0e0d8 100%)',
                transform: 'rotate(10deg)',
              }}
            />
            <div
              className="absolute bottom-1.5 right-24 w-1.5 h-4 rounded-full opacity-40"
              style={{
                background: 'linear-gradient(90deg, #f0e8a0 0%, #fff8c0 50%, #f0e8a0 100%)',
                transform: 'rotate(-5deg)',
              }}
            />
          </div>
        </div>

        {/* Theorem info */}
        <div
          ref={infoRef}
          className="text-center mt-10 space-y-1"
          style={{
            opacity: animationPhase === 'complete' ? 1 : 0.4,
            transition: 'opacity 0.8s ease-out',
          }}
        />

        {/* Scroll indicator */}
        <div className="flex justify-center mt-14 animate-float">
          <div className="flex flex-col items-center gap-3 text-brass-tarnished hover:text-gold transition-colors duration-300 cursor-pointer">
            <span className="text-xs tracking-[0.2em] uppercase font-body">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
