'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import katex from 'katex';
import { featuredTheorems } from '@/lib/theorems';

// ═══════════════════════════════════════════════════════════════════════════════
// CHALKBOARD HERO - Self-Writing Mathematical Proofs
// Progressive reveal animation with chalk texture effect
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
  const revealMaskRef = useRef<HTMLDivElement>(null);

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

  // Spawn dust particle
  const spawnDust = useCallback((x: number, y: number) => {
    for (let i = 0; i < 2; i++) {
      dustParticlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -Math.random() * 1.2 - 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.35 + 0.15,
        life: 50 + Math.random() * 30,
      });
    }
  }, []);

  // Setup and animate dust particles
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
        p.vy += 0.015;
        p.vx *= 0.995;
        p.life--;
        p.opacity *= 0.985;

        if (p.life > 0 && p.opacity > 0.01) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (p.life / 50), 0, Math.PI * 2);
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

      const duration = 3500; // 3.5 seconds
      const startTime = performance.now();

      const animateReveal = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth reveal
        const eased = 1 - Math.pow(1 - progress, 3);
        setRevealProgress(eased);

        // Spawn dust particles at the writing edge
        if (containerRef.current && progress < 1 && Math.random() > 0.7) {
          const rect = containerRef.current.getBoundingClientRect();
          const writeX = rect.width * 0.15 + eased * rect.width * 0.7;
          const writeY = rect.height * 0.45 + (Math.random() - 0.5) * 30;
          spawnDust(writeX, writeY);
        }

        if (progress < 1) {
          chalkAnimFrameRef.current = requestAnimationFrame(animateReveal);
        } else {
          setAnimationPhase('complete');
        }
      };

      chalkAnimFrameRef.current = requestAnimationFrame(animateReveal);
    }, 800);

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
    const startX = rect.width * 0.12;
    const endX = rect.width * 0.88;
    const centerY = rect.height * 0.45;

    if (animationPhase === 'waiting') {
      chalk.style.opacity = '0';
    } else if (animationPhase === 'writing') {
      chalk.style.opacity = '1';

      const x = startX + revealProgress * (endX - startX);
      const wobbleY = Math.sin(revealProgress * Math.PI * 8) * 2;
      const wobbleAngle = Math.sin(revealProgress * Math.PI * 6) * 6;

      chalk.style.left = `${x}px`;
      chalk.style.top = `${centerY + wobbleY - 50}px`;
      chalk.style.transform = `rotate(${-25 + wobbleAngle}deg) translateX(-50%)`;
    } else if (animationPhase === 'complete') {
      // Smooth transition to rest
      chalk.style.transition = 'all 0.5s ease-out';
      chalk.style.left = `${rect.width - 80}px`;
      chalk.style.top = `${rect.height - 45}px`;
      chalk.style.transform = 'rotate(75deg) translateX(-50%)';
    }
  }, [animationPhase, revealProgress]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Atmospheric warm light gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 15%, rgba(201, 162, 39, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 25% 75%, rgba(139, 115, 85, 0.04) 0%, transparent 45%),
            radial-gradient(ellipse at 75% 85%, rgba(139, 115, 85, 0.03) 0%, transparent 45%)
          `,
        }}
      />

      {/* Sage vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(26, 42, 26, 0.35) 100%)',
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
          className="relative aspect-video max-w-4xl mx-auto rounded overflow-hidden"
          style={{
            background: `linear-gradient(145deg, #1A2A25 0%, #152520 30%, #101D18 60%, #0C1612 100%)`,
            boxShadow: `
              inset 0 0 100px rgba(0, 0, 0, 0.5),
              inset 0 0 40px rgba(26, 42, 37, 0.3),
              0 0 0 8px #4A3728,
              0 0 0 12px #5C4033,
              0 0 0 14px #6B5344,
              0 25px 80px rgba(0, 0, 0, 0.6)
            `,
          }}
        >
          {/* Slate texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Subtle light reflection at top */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 100%)',
            }}
          />

          {/* Worn chalk area (subtle) */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '20%', left: '15%', width: '30%', height: '40%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 60%)',
            }}
          />

          {/* Dust particles canvas */}
          <canvas
            ref={dustCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          />

          {/* KaTeX equation with reveal animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={revealMaskRef}
              className="relative overflow-hidden px-8"
              style={{
                clipPath: `inset(0 ${100 - revealProgress * 100}% 0 0)`,
              }}
            >
              <div
                ref={katexRef}
                className="katex-chalk"
                style={{
                  color: '#F5F5F0',
                  fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                  textShadow: `
                    0 0 8px rgba(245, 245, 240, 0.4),
                    0 0 16px rgba(245, 245, 240, 0.2),
                    1px 1px 2px rgba(0, 0, 0, 0.3)
                  `,
                  filter: 'url(#chalkFilter)',
                }}
              />
            </div>
          </div>

          {/* SVG filter for chalk texture */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id="chalkFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" seed="1" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Hagoromo chalk stick */}
          <div
            ref={chalkRef}
            className="absolute pointer-events-none z-30"
            style={{
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div className="relative">
              {/* Main chalk body */}
              <div
                className="w-3.5 h-14 rounded-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(90deg,
                    #D0D0C8 0%,
                    #E8E8E0 15%,
                    #F5F5F0 30%,
                    #FFFFFF 50%,
                    #F5F5F0 70%,
                    #E8E8E0 85%,
                    #D0D0C8 100%
                  )`,
                  boxShadow: `
                    inset 2px 0 4px rgba(255,255,255,0.7),
                    inset -2px 0 4px rgba(0,0,0,0.1),
                    0 2px 8px rgba(0,0,0,0.35)
                  `,
                }}
              >
                {/* Chalk texture */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />
                {/* Worn tip */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-b-full"
                  style={{
                    background: 'linear-gradient(180deg, #E8E8E0 0%, #C8C8C0 100%)',
                  }}
                />
              </div>
              {/* Shadow */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-1.5 rounded-full"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  filter: 'blur(2px)',
                }}
              />
            </div>
          </div>

          {/* Chalk ledge/tray */}
          <div
            className="absolute bottom-0 left-0 right-0 h-9"
            style={{
              background: `linear-gradient(180deg,
                #6B5344 0%,
                #5C4033 25%,
                #4A3728 55%,
                #3D2B1F 80%,
                #2D1F15 100%
              )`,
              boxShadow: `
                inset 0 2px 4px rgba(255,255,255,0.1),
                inset 0 -2px 6px rgba(0,0,0,0.35)
              `,
            }}
          >
            {/* Wood grain lines */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg,
                  transparent 0px,
                  transparent 18px,
                  rgba(0,0,0,0.15) 18px,
                  rgba(0,0,0,0.15) 19px
                )`,
              }}
            />
            {/* Highlight edge */}
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{
                background: 'linear-gradient(180deg, rgba(245,245,240,0.15) 0%, rgba(245,245,240,0.03) 100%)',
              }}
            />

            {/* Extra chalk pieces on ledge */}
            <div
              className="absolute bottom-1.5 right-16 w-2 h-7 rounded-full opacity-65"
              style={{
                background: 'linear-gradient(90deg, #E0E0D8 0%, #F0F0E8 50%, #E0E0D8 100%)',
                transform: 'rotate(15deg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
              }}
            />
            <div
              className="absolute bottom-1.5 right-28 w-1.5 h-4 rounded-full opacity-45"
              style={{
                background: 'linear-gradient(90deg, #F5E8A8 0%, #FFF8C8 50%, #F5E8A8 100%)',
                transform: 'rotate(-10deg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
              }}
            />
            <div
              className="absolute bottom-1.5 left-12 w-1 h-2.5 rounded-full opacity-35"
              style={{
                background: 'linear-gradient(90deg, #C8D8C8 0%, #E0F0E0 50%, #C8D8C8 100%)',
                transform: 'rotate(20deg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
              }}
            />
          </div>
        </div>

        {/* Theorem information */}
        <div
          ref={infoRef}
          className="text-center mt-10 space-y-1"
          style={{
            opacity: animationPhase === 'complete' ? 1 : 0.3,
            transition: 'opacity 0.8s ease-out',
          }}
        />

        {/* Scroll indicator */}
        <div className="flex justify-center mt-14 animate-float">
          <div className="flex flex-col items-center gap-3 text-brass-tarnished hover:text-gold transition-colors duration-300 cursor-pointer">
            <span className="text-xs tracking-[0.2em] uppercase font-body">Scroll to explore</span>
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <div className="absolute -left-4 -right-4 top-1/2 h-px bg-gradient-to-r from-transparent via-brass-tarnished/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
