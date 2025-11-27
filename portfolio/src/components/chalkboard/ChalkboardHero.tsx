'use client';

import { useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// CHALKBOARD HERO - Self-Writing Mathematical Proofs
// A realistic chalkboard with Hagoromo-style chalk that writes theorems
// ═══════════════════════════════════════════════════════════════════════════════

interface ChalkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

// Simple equations that render nicely without LaTeX
const displayEquations = [
  { text: 'e^(iπ) + 1 = 0', name: "Euler's Identity", mathematician: 'Leonhard Euler', year: 1748, description: 'The most beautiful equation in mathematics' },
  { text: 'a² + b² = c²', name: 'Pythagorean Theorem', mathematician: 'Pythagoras', year: -500, description: 'The foundation of geometry' },
  { text: '∫e^(-x²)dx = √π', name: 'Gaussian Integral', mathematician: 'Carl Friedrich Gauss', year: 1809, description: 'A transcendental result of profound beauty' },
  { text: 'F = ma', name: "Newton's Second Law", mathematician: 'Isaac Newton', year: 1687, description: 'The foundation of classical mechanics' },
  { text: 'E = mc²', name: 'Mass-Energy Equivalence', mathematician: 'Albert Einstein', year: 1905, description: 'The most famous equation in physics' },
  { text: '∇ × E = -∂B/∂t', name: "Faraday's Law", mathematician: 'James Clerk Maxwell', year: 1865, description: 'Electromagnetic induction' },
  { text: 'ζ(s) = Σ 1/n^s', name: 'Riemann Zeta Function', mathematician: 'Bernhard Riemann', year: 1859, description: 'The key to prime distribution' },
  { text: 'π(x) ~ x/ln(x)', name: 'Prime Number Theorem', mathematician: 'Hadamard', year: 1896, description: 'The distribution of prime numbers' },
];

export default function ChalkboardHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chalkRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Use refs for all animation state to avoid re-renders
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<ChalkParticle[]>([]);
  const equationRef = useRef(displayEquations[Math.floor(Math.random() * displayEquations.length)]);
  const stateRef = useRef({
    charIndex: 0,
    charProgress: 0,
    currentX: 0,
    lastX: 0,
    lastY: 0,
    isWriting: false,
    isComplete: false,
    startX: 0,
    centerY: 0,
    charWidths: [] as number[],
    text: '',
    initialized: false,
  });

  // Draw chalk bristle effect
  const drawChalkBristles = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    pressure: number = 1
  ) => {
    const bristleCount = 12 + Math.floor(Math.random() * 6);
    const spread = 7 * pressure;

    for (let i = 0; i < bristleCount; i++) {
      const angle = (i / bristleCount) * Math.PI * 2 + Math.random() * 0.5;
      const distance = Math.random() * spread * (0.4 + Math.random() * 0.6);
      const offsetX = Math.cos(angle) * distance + (Math.random() - 0.5) * 2.5;
      const offsetY = Math.sin(angle) * distance + (Math.random() - 0.5) * 2.5;
      const size = (0.5 + Math.random() * 1.5) * pressure;
      const opacity = (0.3 + Math.random() * 0.5) * pressure;

      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 245, 240, ${opacity})`;
      ctx.fill();
    }

    // Spawn dust particles occasionally
    if (Math.random() > 0.75) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -Math.random() * 2.5 - 0.5,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.3,
        life: 80 + Math.random() * 50,
      });
    }
  }, []);

  // Draw stroke between two points
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
      const tremor = Math.sin(t * Math.PI * 5) * 0.4;
      const x = fromX + (toX - fromX) * t + tremor;
      const y = fromY + (toY - fromY) * t + tremor * 0.5;
      const strokePressure = pressure * (0.75 + Math.sin(t * Math.PI) * 0.25);
      drawChalkBristles(ctx, x, y, strokePressure);
    }
  }, [drawChalkBristles]);

  // Update particles
  const updateParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.vx *= 0.98;
      p.life--;
      p.opacity *= 0.97;

      if (p.life > 0 && p.opacity > 0.01) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (p.life / 80), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 240, ${p.opacity * 0.5})`;
        ctx.fill();
        return true;
      }
      return false;
    });
  }, []);

  // Update chalk position
  const updateChalkPosition = useCallback((x: number, y: number, angle: number, visible: boolean) => {
    if (chalkRef.current) {
      chalkRef.current.style.left = `${x}px`;
      chalkRef.current.style.top = `${y}px`;
      chalkRef.current.style.transform = `rotate(${angle}deg) translateX(-50%)`;
      chalkRef.current.style.opacity = visible ? '1' : '0';
    }
  }, []);

  // Update theorem info
  const updateInfo = useCallback(() => {
    if (infoRef.current) {
      const eq = equationRef.current;
      infoRef.current.innerHTML = `
        <p class="font-heading text-xl text-gold-leaf tracking-wide">${eq.name}</p>
        <p class="font-decorative text-sm text-parchment-aged italic max-w-xl mx-auto mt-2">${eq.description}</p>
        <p class="font-body text-xs text-brass-tarnished tracking-wider mt-2">— ${eq.mathematician}, ${eq.year > 0 ? eq.year : Math.abs(eq.year) + ' BCE'}</p>
      `;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas
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
    const state = stateRef.current;

    // Initialize text metrics
    const text = equationRef.current.text;
    state.text = text;

    const fontSize = Math.min(rect.width / 14, 52);
    ctx.font = `500 ${fontSize}px 'Cormorant Garamond', Georgia, serif`;

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2 - 20;

    state.startX = centerX - textWidth / 2;
    state.currentX = state.startX;
    state.lastX = state.startX;
    state.lastY = centerY;
    state.centerY = centerY;
    state.charIndex = 0;
    state.charProgress = 0;
    state.isWriting = false;
    state.isComplete = false;
    state.charWidths = [];

    // Pre-calculate character widths
    for (let i = 0; i < text.length; i++) {
      state.charWidths.push(ctx.measureText(text[i]).width);
    }

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Update info display
    updateInfo();

    // Animation loop
    const animate = () => {
      const state = stateRef.current;

      // Subtle fade for particle trails
      ctx.fillStyle = 'rgba(20, 31, 26, 0.015)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Update and draw particles
      updateParticles(ctx);

      if (state.isWriting && !state.isComplete && state.charIndex < state.text.length) {
        const char = state.text[state.charIndex];
        const charWidth = state.charWidths[state.charIndex];

        // Calculate stroke position
        const strokeX = state.currentX + charWidth * state.charProgress;
        const wobble = Math.sin(state.charProgress * Math.PI * 3) * 1.5;
        const strokeY = state.centerY + wobble;

        // Draw stroke
        if (state.charProgress > 0.05) {
          drawChalkStroke(ctx, state.lastX, state.lastY, strokeX, strokeY, 0.9);
        }

        state.lastX = strokeX;
        state.lastY = strokeY;

        // Update chalk position
        const chalkAngle = -28 + Math.sin(state.charProgress * Math.PI * 4) * 10;
        updateChalkPosition(strokeX, strokeY - 55, chalkAngle, true);

        state.charProgress += 0.065;

        if (state.charProgress >= 1) {
          // Draw complete character
          ctx.save();
          ctx.font = `500 ${Math.min(rect.width / 14, 52)}px 'Cormorant Garamond', Georgia, serif`;
          ctx.fillStyle = 'rgba(245, 245, 240, 0.92)';
          ctx.shadowColor = 'rgba(245, 245, 240, 0.35)';
          ctx.shadowBlur = 5;
          ctx.fillText(char, state.currentX, state.centerY);
          ctx.restore();

          // Move to next character
          state.currentX += charWidth + (char === ' ' ? 8 : 3);
          state.charIndex++;
          state.charProgress = 0;
          state.lastX = state.currentX;
          state.lastY = state.centerY;
        }
      } else if (state.isWriting && state.charIndex >= state.text.length && !state.isComplete) {
        // Writing complete
        state.isComplete = true;

        // Move chalk to rest position
        setTimeout(() => {
          updateChalkPosition(rect.width - 90, rect.height - 50, 78, true);
        }, 400);
      }

      // Continue animation if writing or particles exist
      if ((state.isWriting && !state.isComplete) || particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (state.isComplete) {
        // Keep a slow animation going for any remaining particles
        if (particlesRef.current.length > 0) {
          animationRef.current = requestAnimationFrame(animate);
        }
      }
    };

    // Start writing after delay
    const startTimeout = setTimeout(() => {
      state.isWriting = true;
      updateChalkPosition(state.startX, state.centerY - 55, -30, true);
      animate();
    }, 1000);

    // Handle resize
    const handleResize = () => {
      setupCanvas();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [drawChalkStroke, updateParticles, updateChalkPosition, updateInfo]);

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
          {/* Slate texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Light reflection */}
          <div
            className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
            }}
          />

          {/* Worn area */}
          <div
            className="absolute pointer-events-none opacity-8"
            style={{
              top: '18%', left: '12%', width: '35%', height: '45%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 65%)',
            }}
          />

          {/* Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Hagoromo chalk */}
          <div
            ref={chalkRef}
            className="absolute pointer-events-none"
            style={{
              opacity: 0,
              transition: 'opacity 0.3s ease-out',
            }}
          >
            <div className="relative">
              <div
                className="w-4 h-16 rounded-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, #D8D8D0 0%, #F5F5F0 20%, #FFFFFF 40%, #F5F5F0 60%, #E8E8E0 80%, #D0D0C8 100%)`,
                  boxShadow: `inset 3px 0 6px rgba(255,255,255,0.6), inset -3px 0 6px rgba(0,0,0,0.15), 0 3px 10px rgba(0,0,0,0.4)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-4 rounded-b-full"
                  style={{ background: 'linear-gradient(180deg, #E8E8E0 0%, #B8B8B0 100%)' }}
                />
              </div>
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full"
                style={{ background: 'rgba(0,0,0,0.35)', filter: 'blur(3px)' }}
              />
            </div>
          </div>

          {/* Chalk ledge */}
          <div
            className="absolute bottom-0 left-0 right-0 h-10"
            style={{
              background: `linear-gradient(180deg, #6B5344 0%, #5C4033 20%, #4A3728 50%, #3D2B1F 80%, #2D1F15 100%)`,
              boxShadow: `inset 0 3px 6px rgba(255,255,255,0.12), inset 0 -3px 8px rgba(0,0,0,0.4)`,
            }}
          >
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px)`,
            }} />
            <div className="absolute inset-x-0 top-0 h-1.5" style={{
              background: 'linear-gradient(180deg, rgba(245,245,240,0.2) 0%, rgba(245,245,240,0.05) 100%)',
            }} />
            {/* Chalk pieces */}
            <div className="absolute bottom-2 right-20 w-2.5 h-8 rounded-full opacity-70" style={{
              background: 'linear-gradient(90deg, #E8E8E0 0%, #F8F8F4 50%, #E8E8E0 100%)',
              transform: 'rotate(12deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }} />
            <div className="absolute bottom-2 right-32 w-2 h-5 rounded-full opacity-50" style={{
              background: 'linear-gradient(90deg, #F5E6A3 0%, #FFF5C3 50%, #F5E6A3 100%)',
              transform: 'rotate(-8deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }} />
            <div className="absolute bottom-2 left-16 w-1.5 h-3 rounded-full opacity-40" style={{
              background: 'linear-gradient(90deg, #C4D8C4 0%, #D8ECD8 50%, #C4D8C4 100%)',
              transform: 'rotate(25deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }} />
          </div>
        </div>

        {/* Theorem info */}
        <div ref={infoRef} className="text-center mt-10 space-y-1" />

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
