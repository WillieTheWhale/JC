'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import katex from 'katex';
import { featuredTheorems } from '@/lib/theorems';

// ═══════════════════════════════════════════════════════════════════════════════
// BLACKBOARD HERO - Self-Writing Mathematical Proofs
// Stroke-based chalk animation with realistic chalk stick and dust particles
// ═══════════════════════════════════════════════════════════════════════════════

interface ChalkDustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface ChalkState {
  x: number;
  y: number;
  rotation: number;
  isWriting: boolean;
  opacity: number;
}

// Select a random featured theorem
const getRandomTheorem = () => {
  const index = Math.floor(Math.random() * featuredTheorems.length);
  return featuredTheorems[index];
};

export default function ChalkboardHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const katexRef = useRef<HTMLDivElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [theorem] = useState(getRandomTheorem);
  const [animationPhase, setAnimationPhase] = useState<'waiting' | 'writing' | 'complete'>('waiting');
  const [revealProgress, setRevealProgress] = useState(0);
  const [chalkState, setChalkState] = useState<ChalkState>({
    x: 0,
    y: 0,
    rotation: -25,
    isWriting: false,
    opacity: 0,
  });

  const dustParticlesRef = useRef<ChalkDustParticle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const writingFrameRef = useRef<number>(0);

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

  // Spawn dust particles at chalk tip
  const spawnDust = useCallback((x: number, y: number, intensity: number = 1) => {
    const particleCount = Math.floor(2 + Math.random() * 3 * intensity);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      dustParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1, // Slight upward bias
        size: 1 + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.4,
        life: 30 + Math.random() * 40,
        maxLife: 70,
      });
    }
  }, []);

  // Dust particle animation system
  useEffect(() => {
    const canvas = dustCanvasRef.current;
    const board = boardRef.current;
    if (!canvas || !board) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setupCanvas = () => {
      const rect = board.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      return rect;
    };

    let rect = setupCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update and draw dust particles
      dustParticlesRef.current = dustParticlesRef.current.filter((p) => {
        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gravity
        p.vx *= 0.97; // Air resistance
        p.life--;

        // Fade based on life
        const lifeFraction = p.life / p.maxLife;
        const currentOpacity = p.opacity * lifeFraction;

        if (p.life > 0 && currentOpacity > 0.01) {
          // Draw particle with soft edge
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, `rgba(245, 245, 240, ${currentOpacity})`);
          gradient.addColorStop(0.6, `rgba(245, 245, 240, ${currentOpacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(245, 245, 240, 0)');

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (0.5 + lifeFraction * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          return true;
        }
        return false;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      rect = setupCanvas();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Main writing animation controller
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const startDelay = setTimeout(() => {
      setAnimationPhase('writing');

      const rect = board.getBoundingClientRect();
      const duration = 5000; // 5 seconds for full write
      const startTime = performance.now();

      // Writing area bounds
      const padding = 40;
      const writeStartX = padding;
      const writeEndX = rect.width - padding;
      const writeY = rect.height * 0.48;

      const animateWrite = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);

        // Ease-out for natural writing feel
        const progress = 1 - Math.pow(1 - rawProgress, 2.5);
        setRevealProgress(progress);

        // Calculate chalk position along writing path
        const writeX = writeStartX + progress * (writeEndX - writeStartX);

        // Add natural hand wobble
        const wobbleX = Math.sin(progress * Math.PI * 20) * 2;
        const wobbleY = Math.sin(progress * Math.PI * 15) * 3 + Math.sin(progress * Math.PI * 7) * 2;
        const wobbleRotation = Math.sin(progress * Math.PI * 12) * 5;

        // Update chalk state
        setChalkState({
          x: writeX + wobbleX,
          y: writeY + wobbleY,
          rotation: -25 + wobbleRotation,
          isWriting: true,
          opacity: 1,
        });

        // Spawn dust at chalk tip (more frequent during actual writing)
        if (rawProgress < 1 && Math.random() > 0.5) {
          spawnDust(writeX + wobbleX, writeY + wobbleY + 30, 0.8);
        }

        if (rawProgress < 1) {
          writingFrameRef.current = requestAnimationFrame(animateWrite);
        } else {
          // Writing complete - move chalk to rest position
          setAnimationPhase('complete');
          setChalkState((prev) => ({
            ...prev,
            x: rect.width - 60,
            y: rect.height - 50,
            rotation: 75,
            isWriting: false,
          }));
        }
      };

      writingFrameRef.current = requestAnimationFrame(animateWrite);
    }, 800);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(writingFrameRef.current);
    };
  }, [spawnDust]);

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

      <div ref={containerRef} className="w-full max-w-5xl mx-auto relative z-10">
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
          ref={boardRef}
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
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 3px,
                  rgba(255,255,255,0.02) 3px,
                  rgba(255,255,255,0.02) 6px
                )
              `,
            }}
          />

          {/* Old chalk marks / ghost writing */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 15%),
                radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.6) 0%, transparent 12%),
                radial-gradient(ellipse at 45% 80%, rgba(255,255,255,0.5) 0%, transparent 10%)
              `,
            }}
          />

          {/* Light reflection at top */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 100%)',
            }}
          />

          {/* Dust particles canvas */}
          <canvas
            ref={dustCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          />

          {/* KaTeX equation with stroke-reveal animation */}
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <div className="relative">
              {/* Writing guide line (faint) */}
              <div
                className="absolute left-0 right-0 h-px opacity-5"
                style={{
                  top: '50%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                }}
              />

              {/* Equation container with clip reveal */}
              <div
                className="relative"
                style={{
                  clipPath: `polygon(0 0, ${revealProgress * 100}% 0, ${revealProgress * 100}% 100%, 0 100%)`,
                }}
              >
                <div
                  ref={katexRef}
                  className="katex-chalk"
                  style={{
                    color: '#f0efe8',
                    fontSize: 'clamp(1.2rem, 2.8vw, 2.2rem)',
                    textShadow: `
                      0 0 2px rgba(240, 239, 232, 0.8),
                      0 0 6px rgba(240, 239, 232, 0.4),
                      0 0 12px rgba(240, 239, 232, 0.2)
                    `,
                    letterSpacing: '0.03em',
                    whiteSpace: 'nowrap',
                  }}
                />
              </div>

              {/* Writing edge glow effect */}
              {animationPhase === 'writing' && (
                <div
                  className="absolute top-0 bottom-0 w-8 pointer-events-none"
                  style={{
                    left: `${revealProgress * 100}%`,
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg, transparent, rgba(240, 239, 232, 0.15), transparent)',
                    filter: 'blur(4px)',
                  }}
                />
              )}
            </div>
          </div>

          {/* Chalk stick - CSS 3D rendered */}
          <div
            className="absolute pointer-events-none z-30"
            style={{
              left: chalkState.x,
              top: chalkState.y,
              opacity: animationPhase === 'waiting' ? 0 : chalkState.opacity,
              transform: `translate(-50%, -100%) rotate(${chalkState.rotation}deg)`,
              transition: animationPhase === 'complete'
                ? 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'opacity 0.3s ease-out',
              transformOrigin: 'bottom center',
            }}
          >
            <div className="relative" style={{ perspective: '200px' }}>
              {/* Chalk body */}
              <div
                className="relative"
                style={{
                  width: '14px',
                  height: '52px',
                  borderRadius: '3px 3px 2px 2px',
                  background: `linear-gradient(90deg,
                    #c8c8c0 0%,
                    #e8e8e2 15%,
                    #f8f8f4 40%,
                    #f5f5f0 60%,
                    #e0e0d8 85%,
                    #c8c8c0 100%
                  )`,
                  boxShadow: `
                    inset 2px 0 4px rgba(255,255,255,0.9),
                    inset -2px 0 3px rgba(0,0,0,0.15),
                    2px 4px 8px rgba(0,0,0,0.4)
                  `,
                  transform: 'rotateY(-5deg)',
                }}
              >
                {/* Chalk texture lines */}
                <div
                  className="absolute inset-0 rounded-sm opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(0deg,
                        transparent 0%,
                        rgba(0,0,0,0.1) 2%,
                        transparent 4%
                      )
                    `,
                    backgroundSize: '100% 6px',
                  }}
                />

                {/* Worn/used tip */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: '12px',
                    height: '6px',
                    borderRadius: '0 0 4px 4px',
                    background: 'linear-gradient(180deg, #d8d8d0 0%, #b8b8b0 100%)',
                    boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.3)',
                  }}
                />

                {/* Chalk dust on tip */}
                {chalkState.isWriting && (
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 rounded-full animate-pulse"
                    style={{
                      background: 'radial-gradient(ellipse, rgba(245,245,240,0.6) 0%, transparent 70%)',
                    }}
                  />
                )}
              </div>
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

            {/* Chalk dust accumulation on tray */}
            <div
              className="absolute top-1 left-8 right-8 h-1 opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(245,245,240,0.3) 20%, rgba(245,245,240,0.5) 50%, rgba(245,245,240,0.3) 80%, transparent)',
              }}
            />

            {/* Extra chalk pieces on tray */}
            <div
              className="absolute bottom-1.5 right-16 w-2.5 h-7 rounded-full opacity-60"
              style={{
                background: 'linear-gradient(90deg, #d0d0c8 0%, #f0f0e8 50%, #d0d0c8 100%)',
                transform: 'rotate(12deg)',
                boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
              }}
            />
            <div
              className="absolute bottom-1 right-28 w-2 h-5 rounded-full opacity-50"
              style={{
                background: 'linear-gradient(90deg, #e8e0a0 0%, #fff8c0 50%, #e8e0a0 100%)',
                transform: 'rotate(-8deg)',
                boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
              }}
            />
            <div
              className="absolute bottom-2 left-20 w-1.5 h-4 rounded-full opacity-40"
              style={{
                background: 'linear-gradient(90deg, #c8e0c8 0%, #d8f0d8 50%, #c8e0c8 100%)',
                transform: 'rotate(3deg)',
                boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>

        {/* Theorem info */}
        <div
          ref={infoRef}
          className="text-center mt-10 space-y-1"
          style={{
            opacity: animationPhase === 'complete' ? 1 : 0.3,
            transition: 'opacity 1s ease-out',
          }}
        />

        {/* Scroll indicator */}
        <div
          className="flex justify-center mt-14"
          style={{
            opacity: animationPhase === 'complete' ? 1 : 0,
            transition: 'opacity 0.8s ease-out 0.5s',
          }}
        >
          <div className="flex flex-col items-center gap-3 text-brass-tarnished hover:text-gold transition-colors duration-300 cursor-pointer animate-float">
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
