'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// BLACKBOARD HERO - Realistic Chalk Writing Animation
// The chalk follows actual SVG paths, writing proofs stroke by stroke
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

// Pre-defined handwritten proof strokes - each stroke is an SVG path
// These are simplified mathematical statements written in a handwriting style
interface ProofStroke {
  id: string;
  path: string;
  duration: number; // ms to draw this stroke
  delayAfter: number; // pause after this stroke
}

interface HandwrittenProof {
  id: string;
  title: string;
  mathematician: string;
  year: number;
  strokes: ProofStroke[];
  viewBox: string;
  accessibleText: string;
}

// Handwritten proofs with actual SVG paths that look like chalk writing
const HANDWRITTEN_PROOFS: HandwrittenProof[] = [
  {
    id: 'euler_identity',
    title: "Euler's Identity",
    mathematician: 'Leonhard Euler',
    year: 1748,
    viewBox: '0 0 800 200',
    accessibleText: 'e to the power of i times pi, plus 1, equals 0',
    strokes: [
      // "e" - cursive lowercase e
      { id: 'e1', path: 'M 50 120 Q 65 80 85 85 Q 105 90 100 110 Q 95 130 70 135 Q 45 140 50 120', duration: 400, delayAfter: 50 },
      // "i" superscript
      { id: 'i1', path: 'M 115 60 L 115 85', duration: 150, delayAfter: 30 },
      { id: 'i2', path: 'M 115 50 L 116 52', duration: 80, delayAfter: 50 },
      // "π" superscript
      { id: 'pi1', path: 'M 130 55 L 155 55', duration: 150, delayAfter: 30 },
      { id: 'pi2', path: 'M 137 55 L 137 85', duration: 150, delayAfter: 30 },
      { id: 'pi3', path: 'M 148 55 L 148 85', duration: 150, delayAfter: 100 },
      // "+" sign
      { id: 'plus1', path: 'M 180 100 L 220 100', duration: 200, delayAfter: 50 },
      { id: 'plus2', path: 'M 200 80 L 200 120', duration: 200, delayAfter: 100 },
      // "1"
      { id: 'one1', path: 'M 255 75 L 270 70 L 270 130', duration: 300, delayAfter: 100 },
      // "=" sign
      { id: 'eq1', path: 'M 310 90 L 360 90', duration: 200, delayAfter: 50 },
      { id: 'eq2', path: 'M 310 110 L 360 110', duration: 200, delayAfter: 100 },
      // "0"
      { id: 'zero1', path: 'M 400 100 Q 400 70 420 70 Q 440 70 440 100 Q 440 130 420 130 Q 400 130 400 100', duration: 400, delayAfter: 0 },
    ],
  },
  {
    id: 'pythagorean',
    title: 'Pythagorean Theorem',
    mathematician: 'Pythagoras',
    year: -500,
    viewBox: '0 0 800 200',
    accessibleText: 'a squared plus b squared equals c squared',
    strokes: [
      // "a"
      { id: 'a1', path: 'M 50 130 Q 50 90 75 90 Q 100 90 100 110 L 100 130', duration: 350, delayAfter: 50 },
      { id: 'a2', path: 'M 100 115 L 50 130', duration: 150, delayAfter: 50 },
      // "²" superscript
      { id: 'sup1', path: 'M 110 60 Q 120 50 130 55 Q 135 65 120 75 L 135 75', duration: 250, delayAfter: 100 },
      // "+"
      { id: 'plus1', path: 'M 160 100 L 200 100', duration: 180, delayAfter: 40 },
      { id: 'plus2', path: 'M 180 80 L 180 120', duration: 180, delayAfter: 100 },
      // "b"
      { id: 'b1', path: 'M 230 60 L 230 130', duration: 200, delayAfter: 30 },
      { id: 'b2', path: 'M 230 100 Q 260 90 260 110 Q 260 130 230 130', duration: 300, delayAfter: 50 },
      // "²" superscript
      { id: 'sup2', path: 'M 275 60 Q 285 50 295 55 Q 300 65 285 75 L 300 75', duration: 250, delayAfter: 100 },
      // "="
      { id: 'eq1', path: 'M 330 90 L 380 90', duration: 180, delayAfter: 40 },
      { id: 'eq2', path: 'M 330 110 L 380 110', duration: 180, delayAfter: 100 },
      // "c"
      { id: 'c1', path: 'M 440 95 Q 410 85 410 110 Q 410 135 440 125', duration: 350, delayAfter: 50 },
      // "²" superscript
      { id: 'sup3', path: 'M 450 60 Q 460 50 470 55 Q 475 65 460 75 L 475 75', duration: 250, delayAfter: 0 },
    ],
  },
  {
    id: 'gauss_integral',
    title: 'Gaussian Integral',
    mathematician: 'Carl Friedrich Gauss',
    year: 1809,
    viewBox: '0 0 900 220',
    accessibleText: 'The integral from negative infinity to positive infinity of e to the negative x squared dx equals the square root of pi',
    strokes: [
      // Integral sign ∫
      { id: 'int1', path: 'M 60 50 Q 50 50 45 60 L 45 160 Q 45 175 55 175', duration: 500, delayAfter: 50 },
      // Lower bound -∞
      { id: 'lb1', path: 'M 30 180 L 50 180', duration: 100, delayAfter: 30 },
      { id: 'lb2', path: 'M 55 175 Q 70 180 55 185 Q 70 180 55 175', duration: 150, delayAfter: 50 },
      // Upper bound ∞
      { id: 'ub1', path: 'M 55 35 Q 70 40 55 45 Q 70 40 55 35', duration: 150, delayAfter: 100 },
      // "e"
      { id: 'e1', path: 'M 90 110 Q 105 80 125 85 Q 145 90 140 110 Q 135 130 110 135 Q 85 140 90 110', duration: 400, delayAfter: 50 },
      // "-x²" superscript
      { id: 'neg1', path: 'M 155 65 L 175 65', duration: 120, delayAfter: 30 },
      { id: 'x1', path: 'M 180 55 L 200 85 M 200 55 L 180 85', duration: 250, delayAfter: 40 },
      { id: 'sup1', path: 'M 205 45 Q 215 35 225 40 Q 230 50 215 60 L 230 60', duration: 200, delayAfter: 100 },
      // "dx"
      { id: 'd1', path: 'M 250 90 L 250 130 Q 250 140 265 130 Q 280 120 280 130', duration: 300, delayAfter: 50 },
      { id: 'x2', path: 'M 295 100 L 315 130 M 315 100 L 295 130', duration: 250, delayAfter: 150 },
      // "="
      { id: 'eq1', path: 'M 350 100 L 400 100', duration: 180, delayAfter: 40 },
      { id: 'eq2', path: 'M 350 120 L 400 120', duration: 180, delayAfter: 100 },
      // Square root symbol √
      { id: 'sqrt1', path: 'M 430 130 L 445 145 L 465 70 L 520 70', duration: 400, delayAfter: 50 },
      // "π" under the root
      { id: 'pi1', path: 'M 475 85 L 510 85', duration: 150, delayAfter: 30 },
      { id: 'pi2', path: 'M 485 85 L 485 130', duration: 180, delayAfter: 30 },
      { id: 'pi3', path: 'M 500 85 L 500 130', duration: 180, delayAfter: 0 },
    ],
  },
  {
    id: 'prime_number',
    title: 'Prime Number Theorem',
    mathematician: 'Hadamard & de la Vallée Poussin',
    year: 1896,
    viewBox: '0 0 800 200',
    accessibleText: 'pi of x is asymptotically equivalent to x divided by the natural log of x',
    strokes: [
      // "π"
      { id: 'pi1', path: 'M 50 80 L 100 80', duration: 180, delayAfter: 30 },
      { id: 'pi2', path: 'M 65 80 L 65 130', duration: 180, delayAfter: 30 },
      { id: 'pi3', path: 'M 85 80 L 85 130', duration: 180, delayAfter: 50 },
      // "(x)"
      { id: 'p1', path: 'M 110 70 Q 100 100 110 130', duration: 200, delayAfter: 30 },
      { id: 'x1', path: 'M 125 90 L 145 120 M 145 90 L 125 120', duration: 250, delayAfter: 30 },
      { id: 'p2', path: 'M 155 70 Q 165 100 155 130', duration: 200, delayAfter: 100 },
      // "~" (asymptotic)
      { id: 'asy1', path: 'M 190 100 Q 210 85 230 100 Q 250 115 270 100', duration: 350, delayAfter: 100 },
      // Fraction line
      { id: 'frac1', path: 'M 310 105 L 440 105', duration: 250, delayAfter: 50 },
      // "x" numerator
      { id: 'x2', path: 'M 360 70 L 390 95 M 390 70 L 360 95', duration: 280, delayAfter: 50 },
      // "ln x" denominator
      { id: 'l1', path: 'M 325 120 L 325 155', duration: 150, delayAfter: 30 },
      { id: 'n1', path: 'M 340 130 L 340 155 Q 340 130 360 130 L 360 155', duration: 280, delayAfter: 40 },
      { id: 'x3', path: 'M 380 125 L 410 155 M 410 125 L 380 155', duration: 280, delayAfter: 0 },
    ],
  },
  {
    id: 'quadratic',
    title: 'Quadratic Formula',
    mathematician: 'Ancient Babylonians',
    year: -2000,
    viewBox: '0 0 900 250',
    accessibleText: 'x equals negative b plus or minus the square root of b squared minus 4ac, all divided by 2a',
    strokes: [
      // "x"
      { id: 'x1', path: 'M 50 110 L 90 150 M 90 110 L 50 150', duration: 300, delayAfter: 100 },
      // "="
      { id: 'eq1', path: 'M 120 120 L 170 120', duration: 180, delayAfter: 40 },
      { id: 'eq2', path: 'M 120 140 L 170 140', duration: 180, delayAfter: 100 },
      // Main fraction line
      { id: 'frac1', path: 'M 200 130 L 550 130', duration: 400, delayAfter: 100 },
      // "-b" in numerator
      { id: 'neg1', path: 'M 230 80 L 260 80', duration: 150, delayAfter: 40 },
      { id: 'b1', path: 'M 275 50 L 275 115 Q 275 95 300 95 Q 320 95 320 115', duration: 350, delayAfter: 80 },
      // "±"
      { id: 'pm1', path: 'M 345 70 L 375 70', duration: 150, delayAfter: 30 },
      { id: 'pm2', path: 'M 360 55 L 360 85', duration: 150, delayAfter: 30 },
      { id: 'pm3', path: 'M 345 95 L 375 95', duration: 150, delayAfter: 80 },
      // Square root
      { id: 'sqrt1', path: 'M 395 115 L 410 125 L 430 45 L 530 45', duration: 450, delayAfter: 60 },
      // "b²" under root
      { id: 'b2', path: 'M 445 60 L 445 100 Q 445 85 465 85 Q 480 85 480 100', duration: 300, delayAfter: 30 },
      { id: 'sup1', path: 'M 490 50 Q 498 42 508 47 Q 513 55 500 63 L 513 63', duration: 200, delayAfter: 60 },
      // "-4ac" under root
      { id: 'neg2', path: 'M 400 85 L 425 85', duration: 130, delayAfter: 30 },
      { id: 'four', path: 'M 435 65 L 435 95 L 455 95 M 455 55 L 455 105', duration: 280, delayAfter: 40 },
      { id: 'a1', path: 'M 470 105 Q 470 75 490 75 Q 510 75 510 90 L 510 105 M 510 95 L 470 105', duration: 350, delayAfter: 40 },
      { id: 'c1', path: 'M 540 80 Q 520 75 520 95 Q 520 115 540 110', duration: 280, delayAfter: 100 },
      // "2a" in denominator
      { id: 'two', path: 'M 350 150 Q 365 140 380 150 Q 390 165 350 180 L 395 180', duration: 350, delayAfter: 50 },
      { id: 'a2', path: 'M 410 180 Q 410 155 430 155 Q 450 155 450 168 L 450 180 M 450 170 L 410 180', duration: 350, delayAfter: 0 },
    ],
  },
];

type AnimationPhase = 'loading' | 'ready' | 'writing' | 'paused' | 'complete';

// Get a random proof
function getRandomProof(): HandwrittenProof {
  const index = Math.floor(Math.random() * HANDWRITTEN_PROOFS.length);
  return HANDWRITTEN_PROOFS[index];
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHALK BOX COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function HagoromoChalkBox({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 90" fill="none" aria-label="Hagoromo chalk box">
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
        <linearGradient id="chalk-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d8d8d0" />
          <stop offset="50%" stopColor="#f5f5f0" />
          <stop offset="100%" stopColor="#d8d8d0" />
        </linearGradient>
      </defs>
      <g filter="url(#box-shadow-filter)">
        <path d="M10 30 L90 30 L90 85 L10 85 Z" fill="url(#box-front)" />
        <path d="M90 30 L110 20 L110 75 L90 85 Z" fill="url(#box-side)" />
        <path d="M10 30 L30 20 L110 20 L90 30 Z" fill="#3a0510" />
        <text x="50" y="58" textAnchor="middle" fill="#c9a227" fontSize="8" fontFamily="serif" opacity="0.7">HAGOROMO</text>
      </g>
      <rect x="25" y="22" width="5" height="22" rx="2" fill="url(#chalk-body)" transform="rotate(-3 27 33)" opacity="0.85" />
      <rect x="40" y="20" width="5" height="25" rx="2" fill="url(#chalk-body)" transform="rotate(2 42 32)" opacity="0.9" />
      <rect x="55" y="23" width="5" height="20" rx="2" fill="#f5e6a3" transform="rotate(-1 57 33)" opacity="0.85" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BlackboardHeroEnhanced() {
  const boardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());

  const [proof, setProof] = useState<HandwrittenProof | null>(null);
  const [phase, setPhase] = useState<AnimationPhase>('loading');
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(-1);
  const [strokeProgress, setStrokeProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [chalkPos, setChalkPos] = useState({ x: 0, y: 0, rotation: -30 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const dustParticlesRef = useRef<ChalkDustParticle[]>([]);
  const animationRef = useRef<number>(0);
  const dustAnimationRef = useRef<number>(0);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Initialize proof
  useEffect(() => {
    const selectedProof = getRandomProof();
    setProof(selectedProof);
    setPhase('ready');
  }, []);

  // Get point along an SVG path at a given progress (0-1)
  const getPointOnPath = useCallback((pathElement: SVGPathElement, progress: number) => {
    const length = pathElement.getTotalLength();
    const point = pathElement.getPointAtLength(length * progress);
    return { x: point.x, y: point.y };
  }, []);

  // Spawn chalk dust at position
  const spawnDust = useCallback((x: number, y: number) => {
    if (prefersReducedMotion) return;
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 1.2;
      dustParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        size: 0.8 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4,
        life: 20 + Math.random() * 30,
        maxLife: 50,
      });
    }
  }, [prefersReducedMotion]);

  // Dust particle animation loop
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

    const animateDust = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      dustParticlesRef.current = dustParticlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.vx *= 0.98;
        p.life--;

        const lifeFrac = p.life / p.maxLife;
        const opacity = p.opacity * lifeFrac;

        if (p.life > 0 && opacity > 0.01) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, `rgba(245, 245, 240, ${opacity})`);
          grad.addColorStop(0.5, `rgba(245, 245, 240, ${opacity * 0.4})`);
          grad.addColorStop(1, 'rgba(245, 245, 240, 0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          return true;
        }
        return false;
      });

      dustAnimationRef.current = requestAnimationFrame(animateDust);
    };

    animateDust();
    const handleResize = () => { rect = setupCanvas(); };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(dustAnimationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  // Main writing animation
  const startWriting = useCallback(() => {
    if (!proof || !svgRef.current || prefersReducedMotion) {
      // If reduced motion, show complete immediately
      if (proof) {
        setCurrentStrokeIndex(proof.strokes.length);
        setOverallProgress(1);
        setPhase('complete');
      }
      return;
    }

    setPhase('writing');
    const strokes = proof.strokes;
    let strokeIdx = 0;
    const startTime = performance.now();
    let strokeStartTime = startTime;

    const animate = (currentTime: number) => {
      if (strokeIdx >= strokes.length) {
        setPhase('complete');
        setOverallProgress(1);
        setChalkPos(prev => ({ ...prev, x: 700, y: 180, rotation: 70 }));
        return;
      }

      const stroke = strokes[strokeIdx];
      const pathEl = pathRefs.current.get(stroke.id);

      if (!pathEl) {
        strokeIdx++;
        strokeStartTime = currentTime;
        setCurrentStrokeIndex(strokeIdx);
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - strokeStartTime;
      const progress = Math.min(elapsed / stroke.duration, 1);

      // Ease-out for natural feel
      const easedProgress = 1 - Math.pow(1 - progress, 2.5);

      // Update stroke visibility using dashoffset
      const length = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = `${length}`;
      pathEl.style.strokeDashoffset = `${length * (1 - easedProgress)}`;

      // Get chalk position on path
      const point = getPointOnPath(pathEl, easedProgress);

      // Add natural wobble
      const wobbleX = Math.sin(easedProgress * Math.PI * 12) * 1.5;
      const wobbleY = Math.sin(easedProgress * Math.PI * 8) * 1;
      const wobbleRot = Math.sin(easedProgress * Math.PI * 6) * 3;

      // Scale SVG coordinates to board coordinates
      const svg = svgRef.current!;
      const svgRect = svg.getBoundingClientRect();
      const board = boardRef.current!;
      const boardRect = board.getBoundingClientRect();

      // Get viewBox dimensions
      const vb = proof.viewBox.split(' ').map(Number);
      const scaleX = svgRect.width / vb[2];
      const scaleY = svgRect.height / vb[3];

      const chalkX = (svgRect.left - boardRect.left) + (point.x * scaleX) + wobbleX;
      const chalkY = (svgRect.top - boardRect.top) + (point.y * scaleY) + wobbleY;

      setChalkPos({
        x: chalkX,
        y: chalkY,
        rotation: -30 + wobbleRot,
      });

      setStrokeProgress(easedProgress);
      setOverallProgress((strokeIdx + easedProgress) / strokes.length);

      // Spawn dust while writing
      if (easedProgress < 1 && Math.random() > 0.7) {
        spawnDust(chalkX, chalkY + 35);
      }

      if (progress >= 1) {
        // Move to next stroke after delay
        setTimeout(() => {
          strokeIdx++;
          strokeStartTime = performance.now();
          setCurrentStrokeIndex(strokeIdx);
          setStrokeProgress(0);
          animationRef.current = requestAnimationFrame(animate);
        }, stroke.delayAfter);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    setCurrentStrokeIndex(0);
    animationRef.current = requestAnimationFrame(animate);
  }, [proof, prefersReducedMotion, getPointOnPath, spawnDust]);

  // Start animation when ready
  useEffect(() => {
    if (phase === 'ready' && proof) {
      const timer = setTimeout(startWriting, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, proof, startWriting]);

  // Control handlers
  const handlePause = () => {
    cancelAnimationFrame(animationRef.current);
    setPhase('paused');
  };

  const handleResume = () => {
    setPhase('writing');
    startWriting();
  };

  const handleSkip = () => {
    cancelAnimationFrame(animationRef.current);
    if (proof) {
      // Reveal all strokes
      proof.strokes.forEach((stroke) => {
        const pathEl = pathRefs.current.get(stroke.id);
        if (pathEl) {
          pathEl.style.strokeDashoffset = '0';
        }
      });
      setCurrentStrokeIndex(proof.strokes.length);
      setOverallProgress(1);
      setPhase('complete');
      setChalkPos({ x: 700, y: 180, rotation: 70 });
    }
  };

  const handleReplay = () => {
    if (proof) {
      // Reset all strokes
      proof.strokes.forEach((stroke) => {
        const pathEl = pathRefs.current.get(stroke.id);
        if (pathEl) {
          const length = pathEl.getTotalLength();
          pathEl.style.strokeDasharray = `${length}`;
          pathEl.style.strokeDashoffset = `${length}`;
        }
      });
      setCurrentStrokeIndex(-1);
      setStrokeProgress(0);
      setOverallProgress(0);
      setPhase('ready');
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (phase === 'writing') handlePause();
        else if (phase === 'paused') handleResume();
      } else if (e.key === 'Escape') {
        if (phase === 'writing' || phase === 'paused') handleSkip();
      } else if (e.key === 'r' && phase === 'complete') {
        handleReplay();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Cleanup
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current);
      cancelAnimationFrame(dustAnimationRef.current);
    };
  }, []);

  // Store path refs
  const setPathRef = useCallback((id: string, el: SVGPathElement | null) => {
    if (el) {
      pathRefs.current.set(id, el);
      // Initialize stroke
      const length = el.getTotalLength();
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden" aria-label="Animated mathematical proof">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 15%, rgba(201, 162, 39, 0.05) 0%, transparent 50%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26, 42, 26, 0.4) 100%)',
      }} />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="font-heading text-hero text-parchment tracking-wide mb-4">John Christopher</h1>
          <p className="font-decorative text-xl text-brass italic mb-2">Mathematics Student</p>
          <p className="font-body text-sm text-sage-bright tracking-wider uppercase">
            Algebraic Topology • Category Theory • Homotopy Theory
          </p>
        </div>

        {/* Chalkboard */}
        <div
          ref={boardRef}
          className="relative w-full max-w-4xl mx-auto rounded-sm overflow-hidden"
          style={{
            aspectRatio: '16 / 9',
            background: 'linear-gradient(160deg, #1e3a2f 0%, #1a332a 20%, #162b23 50%, #12231c 80%, #0e1b16 100%)',
            boxShadow: `
              inset 0 0 100px rgba(0, 0, 0, 0.5),
              0 0 0 8px #3d2817,
              0 0 0 12px #4a3220,
              0 0 0 14px #5a3d28,
              0 25px 80px rgba(0, 0, 0, 0.6)
            `,
          }}
        >
          {/* Board texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.02) 4px, rgba(255,255,255,0.02) 8px)',
          }} />

          {/* Ghost chalk marks */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 15%),
              radial-gradient(ellipse at 65% 70%, rgba(255,255,255,0.6) 0%, transparent 12%)
            `,
          }} />

          {/* Dust canvas */}
          <canvas ref={dustCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-20" aria-hidden="true" />

          {/* SVG for handwritten proof */}
          {proof && (
            <svg
              ref={svgRef}
              viewBox={proof.viewBox}
              className="absolute inset-0 w-full h-full p-8"
              style={{ paddingBottom: '60px' }}
              aria-hidden="true"
            >
              <defs>
                <filter id="chalk-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#chalk-glow)">
                {proof.strokes.map((stroke) => (
                  <path
                    key={stroke.id}
                    ref={(el) => setPathRef(stroke.id, el)}
                    d={stroke.path}
                    fill="none"
                    stroke="#e8e4d9"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      opacity: 0.92,
                    }}
                  />
                ))}
              </g>
            </svg>
          )}

          {/* 3D Chalk */}
          {!prefersReducedMotion && phase !== 'loading' && (
            <div
              className="absolute pointer-events-none z-30"
              style={{
                left: chalkPos.x,
                top: chalkPos.y,
                opacity: phase === 'complete' ? 0.7 : 1,
                transform: `translate(-50%, -100%) rotate(${chalkPos.rotation}deg)`,
                transition: phase === 'complete' ? 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                transformOrigin: 'bottom center',
              }}
            >
              <div style={{ perspective: '200px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '45px',
                    borderRadius: '3px 3px 2px 2px',
                    background: 'linear-gradient(90deg, #b8b8b0 0%, #e8e8e2 20%, #f5f5f0 50%, #e8e8e2 80%, #b8b8b0 100%)',
                    boxShadow: 'inset 2px 0 3px rgba(255,255,255,0.7), inset -2px 0 2px rgba(0,0,0,0.1), 2px 3px 6px rgba(0,0,0,0.3)',
                    transform: 'rotateY(-5deg)',
                  }}
                >
                  <div className="absolute inset-0 rounded-sm opacity-15" style={{
                    backgroundImage: 'linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.08) 2%, transparent 4%)',
                    backgroundSize: '100% 5px',
                  }} />
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    style={{
                      width: '8px',
                      height: '4px',
                      borderRadius: '0 0 3px 3px',
                      background: 'linear-gradient(180deg, #d0d0c8 0%, #a8a8a0 100%)',
                    }}
                  />
                  {phase === 'writing' && (
                    <div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: 'radial-gradient(ellipse, rgba(245,245,240,0.5) 0%, transparent 70%)' }}
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
              background: 'linear-gradient(180deg, #5a4030 0%, #4a3528 30%, #3a2a1f 70%, #2a1f15 100%)',
              boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.08), inset 0 -2px 4px rgba(0,0,0,0.3)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="absolute top-1 left-8 right-8 h-0.5 opacity-20" style={{
              background: 'linear-gradient(90deg, transparent, rgba(245,245,240,0.4) 30%, rgba(245,245,240,0.5) 50%, rgba(245,245,240,0.4) 70%, transparent)',
            }} />
          </div>

          {/* Chalk box */}
          <div className="absolute bottom-10 right-4 z-30">
            <HagoromoChalkBox className="w-16 h-auto opacity-75 hover:opacity-90 transition-opacity" />
          </div>

          {/* Controls */}
          <div className="absolute bottom-12 left-4 flex items-center gap-2 z-40">
            <div className="w-20 h-1 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full bg-chalk-white/50 transition-all duration-150" style={{ width: `${overallProgress * 100}%` }} />
            </div>
            <div className="flex gap-1">
              {phase === 'writing' && (
                <button onClick={handlePause} className="w-6 h-6 flex items-center justify-center rounded bg-black/30 hover:bg-black/50 text-chalk-white/60 hover:text-chalk-white transition-all" aria-label="Pause">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                </button>
              )}
              {phase === 'paused' && (
                <button onClick={handleResume} className="w-6 h-6 flex items-center justify-center rounded bg-black/30 hover:bg-black/50 text-chalk-white/60 hover:text-chalk-white transition-all" aria-label="Resume">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </button>
              )}
              {(phase === 'writing' || phase === 'paused') && (
                <button onClick={handleSkip} className="w-6 h-6 flex items-center justify-center rounded bg-black/30 hover:bg-black/50 text-chalk-white/60 hover:text-chalk-white transition-all" aria-label="Skip">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M5 4l10 8-10 8V4z" /><rect x="17" y="4" width="2" height="16" /></svg>
                </button>
              )}
              {phase === 'complete' && (
                <button onClick={handleReplay} className="w-6 h-6 flex items-center justify-center rounded bg-black/30 hover:bg-black/50 text-chalk-white/60 hover:text-chalk-white transition-all" aria-label="Replay">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" /></svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Proof info */}
        {proof && (
          <div className="text-center mt-10" style={{ opacity: phase === 'complete' ? 1 : 0.4, transition: 'opacity 1s' }}>
            <p className="font-heading text-xl text-gold-leaf tracking-wide">{proof.title}</p>
            <p className="font-body text-xs text-brass-tarnished tracking-wider mt-2">
              — {proof.mathematician}{proof.year && `, ${proof.year > 0 ? proof.year : `${Math.abs(proof.year)} BCE`}`}
            </p>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="flex justify-center mt-14" style={{ opacity: phase === 'complete' ? 1 : 0, transition: 'opacity 0.8s 0.5s' }}>
          <div className="flex flex-col items-center gap-3 text-brass-tarnished hover:text-gold transition-colors cursor-pointer animate-float">
            <span className="text-xs tracking-[0.2em] uppercase font-body">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Screen reader content */}
      <div className="sr-only" role="region" aria-live="polite">
        <h2>{proof?.title}</h2>
        <p>{proof?.accessibleText}</p>
      </div>
    </section>
  );
}
