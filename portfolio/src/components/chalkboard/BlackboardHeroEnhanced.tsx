'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import katex from 'katex';
import { getRandomProof, type ProofData, type ProofLine } from '@/lib/proofs';

// ═══════════════════════════════════════════════════════════════════════════════
// BLACKBOARD HERO ENHANCED - Mathematical Proof Writing Animation
// Features: Stroke-based chalk animation, 3D chalk, dust particles,
//           playback controls, accessibility, and reduced motion support
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
  targetX: number;
  targetY: number;
  rotation: number;
  tilt: number;
  isWriting: boolean;
  opacity: number;
  motionState: 'idle' | 'approach' | 'writing' | 'lift' | 'reposition' | 'complete';
}

type AnimationPhase = 'loading' | 'ready' | 'playing' | 'paused' | 'complete';

// ═══════════════════════════════════════════════════════════════════════════════
// CHALK BOX SVG COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function HagoromoChalkBox({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 90"
      fill="none"
      role="img"
      aria-label="Hagoromo chalk box"
    >
      <defs>
        <linearGradient id="box-front" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c41e3a" />
          <stop offset="50%" stopColor="#a01830" />
          <stop offset="100%" stopColor="#7a1025" />
        </linearGradient>
        <linearGradient id="box-side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b0d20" />
          <stop offset="100%" stopColor="#5a0815" />
        </linearGradient>
        <linearGradient id="box-top" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3a0510" />
          <stop offset="100%" stopColor="#5a0815" />
        </linearGradient>
        <linearGradient id="chalk-white" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d8d8d0" />
          <stop offset="30%" stopColor="#f5f5f0" />
          <stop offset="70%" stopColor="#f5f5f0" />
          <stop offset="100%" stopColor="#d8d8d0" />
        </linearGradient>
        <linearGradient id="chalk-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d8d090" />
          <stop offset="50%" stopColor="#f5e8a0" />
          <stop offset="100%" stopColor="#d8d090" />
        </linearGradient>
        <filter id="box-shadow-filter">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Box body */}
      <g filter="url(#box-shadow-filter)">
        {/* Front face */}
        <path d="M10 30 L90 30 L90 85 L10 85 Z" fill="url(#box-front)" />
        {/* Right side face (isometric) */}
        <path d="M90 30 L110 20 L110 75 L90 85 Z" fill="url(#box-side)" />
        {/* Top edge (open box interior visible) */}
        <path d="M10 30 L30 20 L110 20 L90 30 Z" fill="url(#box-top)" />

        {/* Gold trim lines */}
        <path d="M12 35 L88 35" stroke="#c9a227" strokeWidth="1" opacity="0.6" />
        <path d="M12 80 L88 80" stroke="#c9a227" strokeWidth="1" opacity="0.6" />

        {/* Stylized text (brand suggestion) */}
        <text x="50" y="58" textAnchor="middle" fill="#c9a227" fontSize="10" fontFamily="serif" opacity="0.8">
          HAGOROMO
        </text>
        <text x="50" y="70" textAnchor="middle" fill="#c9a227" fontSize="6" fontFamily="serif" opacity="0.6">
          Fulltouch Chalk
        </text>
      </g>

      {/* Chalk sticks visible inside */}
      <g>
        <rect x="25" y="22" width="5" height="25" rx="2" fill="url(#chalk-white)" transform="rotate(-5 27 34)" opacity="0.9" />
        <rect x="38" y="20" width="5" height="28" rx="2" fill="url(#chalk-white)" transform="rotate(3 40 34)" opacity="0.85" />
        <rect x="52" y="21" width="5" height="24" rx="2" fill="url(#chalk-yellow)" transform="rotate(-2 54 33)" opacity="0.9" />
        <rect x="65" y="23" width="5" height="22" rx="2" fill="url(#chalk-white)" transform="rotate(4 67 34)" opacity="0.8" />
      </g>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION CONTROLS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface AnimationControlsProps {
  phase: AnimationPhase;
  onPause: () => void;
  onResume: () => void;
  onSkip: () => void;
  onReplay: () => void;
  progress: number;
}

function AnimationControls({ phase, onPause, onResume, onSkip, onReplay, progress }: AnimationControlsProps) {
  return (
    <div className="absolute bottom-12 left-4 flex items-center gap-2 z-40">
      {/* Progress bar */}
      <div className="w-24 h-1 bg-black/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-chalk-white/60 transition-all duration-200"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-1">
        {phase === 'playing' ? (
          <button
            onClick={onPause}
            className="w-7 h-7 flex items-center justify-center rounded bg-black/30 hover:bg-black/50 text-chalk-white/70 hover:text-chalk-white transition-all"
            aria-label="Pause animation"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </button>
        ) : phase === 'paused' ? (
          <button
            onClick={onResume}
            className="w-7 h-7 flex items-center justify-center rounded bg-black/30 hover:bg-black/50 text-chalk-white/70 hover:text-chalk-white transition-all"
            aria-label="Resume animation"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        ) : null}

        {(phase === 'playing' || phase === 'paused') && (
          <button
            onClick={onSkip}
            className="w-7 h-7 flex items-center justify-center rounded bg-black/30 hover:bg-black/50 text-chalk-white/70 hover:text-chalk-white transition-all"
            aria-label="Skip to end"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 4l10 8-10 8V4z" />
              <rect x="17" y="4" width="2" height="16" />
            </svg>
          </button>
        )}

        {phase === 'complete' && (
          <button
            onClick={onReplay}
            className="w-7 h-7 flex items-center justify-center rounded bg-black/30 hover:bg-black/50 text-chalk-white/70 hover:text-chalk-white transition-all"
            aria-label="Replay animation"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROOF LINE RENDERER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface ProofLineRendererProps {
  line: ProofLine;
  isVisible: boolean;
  isActive: boolean;
  revealProgress: number;
}

function ProofLineRenderer({ line, isVisible, isActive, revealProgress }: ProofLineRendererProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  // Render LaTeX if present
  useEffect(() => {
    if (lineRef.current && line.latex && isVisible) {
      try {
        katex.render(line.latex, lineRef.current, {
          displayMode: true,
          throwOnError: false,
          trust: true,
        });
      } catch (error) {
        console.error('KaTeX error:', error);
        if (lineRef.current) {
          lineRef.current.textContent = line.latex;
        }
      }
    }
  }, [line.latex, isVisible]);

  if (!isVisible) return null;

  const baseStyles = "transition-all duration-300";
  const indentPadding = line.indent * 24;

  // Type-specific styling
  const getTypeStyles = () => {
    switch (line.type) {
      case 'title':
        return 'text-lg font-heading text-chalk-white tracking-wide border-b border-chalk-white/20 pb-2 mb-3';
      case 'statement':
        return 'text-base text-chalk-white/95 font-medium';
      case 'equation':
        return 'text-base text-chalk-white py-1';
      case 'step':
        return 'text-sm text-chalk-white/90';
      case 'annotation':
        return 'text-xs text-chalk-white/60 italic';
      case 'conclusion':
        return 'text-base text-chalk-white font-medium mt-2';
      default:
        return 'text-sm text-chalk-white/85';
    }
  };

  const opacity = isActive ? Math.min(revealProgress * 2, 1) : 1;

  return (
    <div
      className={`${baseStyles} ${getTypeStyles()} ${line.emphasis ? 'px-3 py-1 border border-chalk-white/30 rounded inline-block' : ''}`}
      style={{
        paddingLeft: `${indentPadding}px`,
        opacity,
        clipPath: isActive ? `polygon(0 0, ${revealProgress * 100}% 0, ${revealProgress * 100}% 100%, 0 100%)` : undefined,
      }}
    >
      {line.latex ? (
        <div
          ref={lineRef}
          className="katex-chalk"
          style={{
            textShadow: '0 0 2px rgba(240, 239, 232, 0.6), 0 0 8px rgba(240, 239, 232, 0.2)',
          }}
        />
      ) : (
        <span style={{
          textShadow: '0 0 2px rgba(240, 239, 232, 0.5), 0 0 6px rgba(240, 239, 232, 0.15)',
        }}>
          {line.content}
        </span>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BlackboardHeroEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);
  const proofContainerRef = useRef<HTMLDivElement>(null);

  // State
  const [proof, setProof] = useState<ProofData | null>(null);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('loading');
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [lineRevealProgress, setLineRevealProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [chalkState, setChalkState] = useState<ChalkState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    rotation: -25,
    tilt: 0,
    isWriting: false,
    opacity: 0,
    motionState: 'idle',
  });

  // Refs for animation
  const dustParticlesRef = useRef<ChalkDustParticle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const writingFrameRef = useRef<number>(0);
  const pausedAtRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const totalPausedDurationRef = useRef<number>(0);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && animationPhase === 'playing') {
        // Skip to end if user enables reduced motion during playback
        handleSkip();
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationPhase]);

  // Initialize proof on mount
  useEffect(() => {
    const selectedProof = getRandomProof();
    setProof(selectedProof);
    setAnimationPhase('ready');
  }, []);

  // Spawn dust particles at chalk tip
  const spawnDust = useCallback((x: number, y: number, intensity: number = 1) => {
    if (prefersReducedMotion) return;

    const particleCount = Math.floor(2 + Math.random() * 3 * intensity);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      dustParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.8,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
        life: 25 + Math.random() * 35,
        maxLife: 60,
      });
    }
  }, [prefersReducedMotion]);

  // Dust particle animation system
  useEffect(() => {
    if (prefersReducedMotion) return;

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

      dustParticlesRef.current = dustParticlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.vx *= 0.98;
        p.life--;

        const lifeFraction = p.life / p.maxLife;
        const currentOpacity = p.opacity * lifeFraction;

        if (p.life > 0 && currentOpacity > 0.01) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, `rgba(245, 245, 240, ${currentOpacity})`);
          gradient.addColorStop(0.6, `rgba(245, 245, 240, ${currentOpacity * 0.4})`);
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
  }, [prefersReducedMotion]);

  // Calculate line positions for chalk targeting
  const getLinePosition = useCallback((lineIndex: number): { x: number; y: number } | null => {
    const container = proofContainerRef.current;
    const board = boardRef.current;
    if (!container || !board || !proof) return null;

    const lines = container.querySelectorAll('[data-line-index]');
    const line = lines[lineIndex] as HTMLElement;
    if (!line) return null;

    const boardRect = board.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();

    return {
      x: lineRect.left - boardRect.left + lineRect.width * 0.1,
      y: lineRect.top - boardRect.top + lineRect.height / 2,
    };
  }, [proof]);

  // Main writing animation controller
  const startAnimation = useCallback(() => {
    if (!proof || prefersReducedMotion) {
      // Show all lines immediately if reduced motion
      setCurrentLineIndex(proof?.lines.length ?? 0);
      setOverallProgress(1);
      setAnimationPhase('complete');
      return;
    }

    setAnimationPhase('playing');
    setCurrentLineIndex(0);
    setLineRevealProgress(0);
    startTimeRef.current = performance.now();
    totalPausedDurationRef.current = 0;

    const lines = proof.lines;
    const totalDuration = proof.estimatedDuration * 1000;
    const baseLineDuration = totalDuration / lines.length;

    let currentLine = 0;
    let lineStartTime = performance.now();

    const animateWrite = (currentTime: number) => {
      if (pausedAtRef.current !== null) {
        writingFrameRef.current = requestAnimationFrame(animateWrite);
        return;
      }

      const adjustedTime = currentTime - totalPausedDurationRef.current;
      const elapsed = adjustedTime - (startTimeRef.current || 0);
      const overall = Math.min(elapsed / totalDuration, 1);
      setOverallProgress(overall);

      const line = lines[currentLine];
      const lineDuration = line.duration || baseLineDuration;
      const lineDelay = line.delay || 0;
      const lineElapsed = adjustedTime - lineStartTime;

      // Handle delay before line
      if (lineElapsed < lineDelay) {
        setChalkState(prev => ({
          ...prev,
          motionState: 'reposition',
          isWriting: false,
        }));
        writingFrameRef.current = requestAnimationFrame(animateWrite);
        return;
      }

      // Calculate line progress
      const writeElapsed = lineElapsed - lineDelay;
      const lineProgress = Math.min(writeElapsed / lineDuration, 1);
      setLineRevealProgress(lineProgress);

      // Get chalk position from line element
      const pos = getLinePosition(currentLine);
      if (pos) {
        const wobbleX = Math.sin(lineProgress * Math.PI * 15) * 2;
        const wobbleY = Math.sin(lineProgress * Math.PI * 10) * 1.5;
        const wobbleRotation = Math.sin(lineProgress * Math.PI * 8) * 4;

        setChalkState({
          x: pos.x + lineProgress * 200 + wobbleX,
          y: pos.y + wobbleY,
          targetX: pos.x + 200,
          targetY: pos.y,
          rotation: -25 + wobbleRotation,
          tilt: 15,
          isWriting: true,
          opacity: 1,
          motionState: 'writing',
        });

        // Spawn dust
        if (lineProgress < 1 && Math.random() > 0.6) {
          spawnDust(pos.x + lineProgress * 200 + wobbleX, pos.y + 25, 0.6);
        }
      }

      // Move to next line
      if (lineProgress >= 1) {
        currentLine++;
        setCurrentLineIndex(currentLine);
        setLineRevealProgress(0);
        lineStartTime = adjustedTime;

        if (currentLine >= lines.length) {
          // Animation complete
          setAnimationPhase('complete');
          setChalkState(prev => ({
            ...prev,
            motionState: 'complete',
            isWriting: false,
            opacity: 0.8,
            x: (boardRef.current?.getBoundingClientRect().width || 600) - 80,
            y: (boardRef.current?.getBoundingClientRect().height || 400) - 60,
            rotation: 75,
          }));
          return;
        }
      }

      writingFrameRef.current = requestAnimationFrame(animateWrite);
    };

    // Small delay before starting
    setTimeout(() => {
      setChalkState(prev => ({ ...prev, opacity: 1, motionState: 'approach' }));
      writingFrameRef.current = requestAnimationFrame(animateWrite);
    }, 500);
  }, [proof, prefersReducedMotion, getLinePosition, spawnDust]);

  // Start animation when proof loads
  useEffect(() => {
    if (proof && animationPhase === 'ready') {
      const timer = setTimeout(startAnimation, 800);
      return () => clearTimeout(timer);
    }
  }, [proof, animationPhase, startAnimation]);

  // Control handlers
  const handlePause = useCallback(() => {
    pausedAtRef.current = performance.now();
    setAnimationPhase('paused');
  }, []);

  const handleResume = useCallback(() => {
    if (pausedAtRef.current !== null) {
      totalPausedDurationRef.current += performance.now() - pausedAtRef.current;
      pausedAtRef.current = null;
    }
    setAnimationPhase('playing');
  }, []);

  const handleSkip = useCallback(() => {
    cancelAnimationFrame(writingFrameRef.current);
    setCurrentLineIndex(proof?.lines.length ?? 0);
    setLineRevealProgress(1);
    setOverallProgress(1);
    setAnimationPhase('complete');
    setChalkState(prev => ({
      ...prev,
      motionState: 'complete',
      isWriting: false,
      opacity: 0.8,
      x: (boardRef.current?.getBoundingClientRect().width || 600) - 80,
      y: (boardRef.current?.getBoundingClientRect().height || 400) - 60,
      rotation: 75,
    }));
  }, [proof]);

  const handleReplay = useCallback(() => {
    pausedAtRef.current = null;
    totalPausedDurationRef.current = 0;
    setCurrentLineIndex(-1);
    setLineRevealProgress(0);
    setOverallProgress(0);
    setAnimationPhase('ready');
    setChalkState({
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      rotation: -25,
      tilt: 0,
      isWriting: false,
      opacity: 0,
      motionState: 'idle',
    });
    setTimeout(() => startAnimation(), 300);
  }, [startAnimation]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (animationPhase === 'playing') handlePause();
        else if (animationPhase === 'paused') handleResume();
      } else if (e.key === 'Escape') {
        if (animationPhase === 'playing' || animationPhase === 'paused') handleSkip();
      } else if (e.key === 'r' && animationPhase === 'complete') {
        handleReplay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [animationPhase, handlePause, handleResume, handleSkip, handleReplay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      cancelAnimationFrame(writingFrameRef.current);
    };
  }, []);

  // Memoize visible lines
  const visibleLines = useMemo(() => {
    if (!proof) return [];
    if (prefersReducedMotion || animationPhase === 'complete') {
      return proof.lines.map((_, i) => i);
    }
    return proof.lines.slice(0, currentLineIndex + 1).map((_, i) => i);
  }, [proof, currentLineIndex, animationPhase, prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden"
      aria-label="Animated mathematical proof demonstration"
    >
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

      <div ref={containerRef} className="w-full max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="font-heading text-hero text-parchment tracking-wide mb-4">
            John Christopher
          </h1>
          <p className="font-decorative text-xl text-brass italic mb-2">
            Mathematics Student
          </p>
          <p className="font-body text-sm text-sage-bright tracking-wider uppercase">
            Algebraic Topology & Category Theory & Homotopy Theory
          </p>
        </div>

        {/* Chalkboard */}
        <div
          ref={boardRef}
          className="relative w-full max-w-5xl mx-auto rounded-sm overflow-hidden"
          style={{
            aspectRatio: '16 / 10',
            background: `linear-gradient(160deg,
              #1e3a2f 0%,
              #1a332a 20%,
              #162b23 50%,
              #12231c 80%,
              #0e1b16 100%
            )`,
            boxShadow: `
              inset 0 0 100px rgba(0, 0, 0, 0.5),
              inset 0 2px 4px rgba(255, 255, 255, 0.03),
              0 0 0 8px #3d2817,
              0 0 0 12px #4a3220,
              0 0 0 14px #5a3d28,
              0 25px 80px rgba(0, 0, 0, 0.6)
            `,
          }}
        >
          {/* SVG Filter definitions for chalk texture */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id="chalk-texture" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="3"
                  seed="5"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="1"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced"
                />
                <feGaussianBlur in="displaced" stdDeviation="0.3" result="blurred" />
                <feComposite in="blurred" in2="noise" operator="arithmetic" k1="0" k2="1" k3="0.15" k4="0" />
              </filter>
            </defs>
          </svg>

          {/* Board texture overlays */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 4px,
                  rgba(255,255,255,0.015) 4px,
                  rgba(255,255,255,0.015) 8px
                )
              `,
            }}
          />

          {/* Old chalk marks */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 15% 25%, rgba(255,255,255,0.9) 0%, transparent 12%),
                radial-gradient(ellipse at 75% 55%, rgba(255,255,255,0.7) 0%, transparent 10%),
                radial-gradient(ellipse at 40% 85%, rgba(255,255,255,0.5) 0%, transparent 8%)
              `,
            }}
          />

          {/* Light reflection */}
          <div
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
            }}
          />

          {/* Dust particles canvas */}
          <canvas
            ref={dustCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            aria-hidden="true"
          />

          {/* Proof content container */}
          <div
            ref={proofContainerRef}
            className="absolute inset-0 p-8 overflow-hidden"
            style={{ paddingBottom: '48px' }}
          >
            <div className="flex flex-col gap-1.5 max-h-full overflow-y-auto">
              {proof?.lines.map((line, index) => (
                <div key={line.id} data-line-index={index}>
                  <ProofLineRenderer
                    line={line}
                    isVisible={visibleLines.includes(index)}
                    isActive={index === currentLineIndex}
                    revealProgress={index === currentLineIndex ? lineRevealProgress : 1}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 3D Chalk stick */}
          {!prefersReducedMotion && (
            <div
              className="absolute pointer-events-none z-30 transition-opacity duration-300"
              style={{
                left: chalkState.x,
                top: chalkState.y,
                opacity: chalkState.opacity,
                transform: `translate(-50%, -100%) rotate(${chalkState.rotation}deg)`,
                transition: chalkState.motionState === 'complete'
                  ? 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  : chalkState.motionState === 'reposition'
                  ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'opacity 0.3s ease-out',
                transformOrigin: 'bottom center',
              }}
            >
              <div className="relative" style={{ perspective: '200px' }}>
                <div
                  className="relative"
                  style={{
                    width: '12px',
                    height: '48px',
                    borderRadius: '3px 3px 2px 2px',
                    background: `linear-gradient(90deg,
                      #c0c0b8 0%,
                      #e4e4de 15%,
                      #f5f5f0 40%,
                      #f2f2ec 60%,
                      #dcdcd4 85%,
                      #c0c0b8 100%
                    )`,
                    boxShadow: `
                      inset 2px 0 3px rgba(255,255,255,0.8),
                      inset -2px 0 2px rgba(0,0,0,0.12),
                      2px 3px 6px rgba(0,0,0,0.35)
                    `,
                    transform: 'rotateY(-5deg)',
                  }}
                >
                  {/* Texture lines */}
                  <div
                    className="absolute inset-0 rounded-sm opacity-15"
                    style={{
                      backgroundImage: `
                        linear-gradient(0deg,
                          transparent 0%,
                          rgba(0,0,0,0.08) 2%,
                          transparent 4%
                        )
                      `,
                      backgroundSize: '100% 5px',
                    }}
                  />

                  {/* Worn tip */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    style={{
                      width: '10px',
                      height: '5px',
                      borderRadius: '0 0 3px 3px',
                      background: 'linear-gradient(180deg, #d4d4cc 0%, #b0b0a8 100%)',
                      boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.25)',
                    }}
                  />

                  {/* Active dust glow */}
                  {chalkState.isWriting && (
                    <div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 rounded-full animate-pulse"
                      style={{
                        background: 'radial-gradient(ellipse, rgba(245,245,240,0.5) 0%, transparent 70%)',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Chalk tray */}
          <div
            className="absolute bottom-0 left-0 right-0 h-9"
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
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            />

            {/* Chalk dust on tray */}
            <div
              className="absolute top-1 left-8 right-8 h-1 opacity-25"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(245,245,240,0.3) 20%, rgba(245,245,240,0.5) 50%, rgba(245,245,240,0.3) 80%, transparent)',
              }}
            />

            {/* Extra chalk pieces */}
            <div
              className="absolute bottom-1.5 right-20 w-2.5 h-7 rounded-full opacity-55"
              style={{
                background: 'linear-gradient(90deg, #ccccc4 0%, #eeeeea 50%, #ccccc4 100%)',
                transform: 'rotate(10deg)',
                boxShadow: '1px 2px 4px rgba(0,0,0,0.25)',
              }}
            />
            <div
              className="absolute bottom-1 right-32 w-2 h-5 rounded-full opacity-45"
              style={{
                background: 'linear-gradient(90deg, #e0d8a0 0%, #f8f0b8 50%, #e0d8a0 100%)',
                transform: 'rotate(-6deg)',
                boxShadow: '1px 2px 4px rgba(0,0,0,0.25)',
              }}
            />
          </div>

          {/* Chalk box illustration */}
          <div className="absolute bottom-10 right-4 z-30 transition-transform duration-300 hover:scale-105">
            <HagoromoChalkBox className="w-20 h-auto opacity-80 hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Animation controls */}
          <AnimationControls
            phase={animationPhase}
            onPause={handlePause}
            onResume={handleResume}
            onSkip={handleSkip}
            onReplay={handleReplay}
            progress={overallProgress}
          />
        </div>

        {/* Proof info */}
        {proof && (
          <div
            className="text-center mt-10 space-y-1"
            style={{
              opacity: animationPhase === 'complete' ? 1 : 0.4,
              transition: 'opacity 1s ease-out',
            }}
          >
            <p className="font-heading text-xl text-gold-leaf tracking-wide">{proof.title}</p>
            <p className="font-decorative text-sm text-parchment-aged italic max-w-xl mx-auto mt-2">
              {proof.shortStatement}
            </p>
            <p className="font-body text-xs text-brass-tarnished tracking-wider mt-2">
              — {proof.mathematician}
              {proof.year && `, ${proof.year > 0 ? proof.year : `${Math.abs(proof.year)} BCE`}`}
            </p>
          </div>
        )}

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

      {/* Accessible content for screen readers */}
      <div className="sr-only" role="region" aria-live="polite">
        <h2>{proof?.title}</h2>
        <p>{proof?.accessibleSummary}</p>
        <details>
          <summary>Full proof content</summary>
          <div>
            {proof?.lines.map((line) => (
              <p key={line.id}>{line.content || line.latex}</p>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
