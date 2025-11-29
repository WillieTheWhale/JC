'use client';

import { useState, useEffect, useRef } from 'react';
import { RoseWindowProps } from '@/types';

// Extended props for enhanced rose window
interface EnhancedRoseWindowProps extends RoseWindowProps {
  mode?: 'static' | 'spinning' | 'loading' | 'transition';
  progress?: number; // 0-100 for loading mode
  onTransitionComplete?: () => void;
  glowColor?: string;
}

export default function RoseWindow({
  size = 120,
  petals = 8,
  color = '#5A6B5A',
  spinning = true,
  spinDuration = 60,
  className = '',
  mode = 'static',
  progress = 0,
  onTransitionComplete,
  glowColor,
}: EnhancedRoseWindowProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'expanding' | 'complete'>('idle');
  const [petalsFilled, setPetalsFilled] = useState<boolean[]>(new Array(petals).fill(false));

  const center = size / 2;
  const outerRadius = size / 2 - 4;
  const innerRadius = outerRadius * 0.3;
  const petalRadius = outerRadius * 0.6;

  // Handle loading progress - fill petals sequentially
  useEffect(() => {
    if (mode === 'loading') {
      const filledCount = Math.floor((progress / 100) * petals);
      const newFilled = new Array(petals).fill(false).map((_, i) => i < filledCount);
      setPetalsFilled(newFilled);
    }
  }, [progress, petals, mode]);

  // Handle transition mode
  useEffect(() => {
    if (mode === 'transition') {
      setAnimationPhase('expanding');

      const timer = setTimeout(() => {
        setAnimationPhase('complete');
        onTransitionComplete?.();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [mode, onTransitionComplete]);

  // Generate petal paths with fill support
  const generatePetals = () => {
    const paths = [];
    const angleStep = (2 * Math.PI) / petals;

    for (let i = 0; i < petals; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const nextAngle = (i + 1) * angleStep - Math.PI / 2;

      const x1 = center + innerRadius * Math.cos(angle);
      const y1 = center + innerRadius * Math.sin(angle);

      const cpx1 = center + petalRadius * Math.cos(angle + angleStep * 0.3);
      const cpy1 = center + petalRadius * Math.sin(angle + angleStep * 0.3);

      const x2 = center + outerRadius * Math.cos(angle + angleStep / 2);
      const y2 = center + outerRadius * Math.sin(angle + angleStep / 2);

      const cpx2 = center + petalRadius * Math.cos(nextAngle - angleStep * 0.3);
      const cpy2 = center + petalRadius * Math.sin(nextAngle - angleStep * 0.3);

      const x3 = center + innerRadius * Math.cos(nextAngle);
      const y3 = center + innerRadius * Math.sin(nextAngle);

      const isFilled = petalsFilled[i];

      paths.push(
        <path
          key={i}
          d={`M ${x1} ${y1} Q ${cpx1} ${cpy1} ${x2} ${y2} Q ${cpx2} ${cpy2} ${x3} ${y3} Z`}
          stroke={color}
          strokeWidth="1.5"
          fill={isFilled ? `${color}30` : 'none'}
          className="gothic-draw"
          style={{
            animationDelay: `${i * 0.05}s`,
            transition: 'fill 0.3s ease-out',
          }}
        />
      );
    }
    return paths;
  };

  // Generate quatrefoil center
  const quatrefoilRadius = innerRadius * 0.6;
  const quatrefoilPaths = [
    { cx: center, cy: center - quatrefoilRadius * 0.7 },
    { cx: center + quatrefoilRadius * 0.7, cy: center },
    { cx: center, cy: center + quatrefoilRadius * 0.7 },
    { cx: center - quatrefoilRadius * 0.7, cy: center },
  ];

  const isSpinning = spinning || mode === 'loading';
  const actualSpinDuration = mode === 'loading' ? 20 : spinDuration;

  // Transition expansion scale
  const transitionScale = animationPhase === 'expanding' ? 20 : animationPhase === 'complete' ? 30 : 1;

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        transform: mode === 'transition' ? `scale(${transitionScale})` : 'scale(1)',
        transition: mode === 'transition' ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        opacity: animationPhase === 'complete' ? 0 : 1,
      }}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Gothic rose window ornament"
        className={isSpinning ? 'animate-rotate-slow' : ''}
        style={isSpinning ? { animationDuration: `${actualSpinDuration}s` } : {}}
      >
        <defs>
          {/* Glow filter */}
          {glowColor && (
            <filter id="roseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor={glowColor} floodOpacity="0.5" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}

          {/* Gradient for loading progress */}
          <radialGradient id="loadingGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Background circle for loading */}
        {mode === 'loading' && (
          <circle
            cx={center}
            cy={center}
            r={outerRadius - 2}
            fill="url(#loadingGradient)"
            opacity="0.5"
          />
        )}

        {/* Outer cusped ring */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          stroke={color}
          strokeWidth="2"
          fill="none"
          filter={glowColor ? 'url(#roseGlow)' : undefined}
        />

        {/* Inner circle */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Petals */}
        {generatePetals()}

        {/* Central quatrefoil */}
        {quatrefoilPaths.map((pos, i) => (
          <circle
            key={`qf-${i}`}
            cx={pos.cx}
            cy={pos.cy}
            r={quatrefoilRadius * 0.5}
            stroke={color}
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* Hidden center - Euler's identity */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize={size / 12}
          fontFamily="Georgia, serif"
          fontStyle="italic"
          className="tracery-symbol"
        >
          e^iπ+1=0
        </text>

        {/* Loading percentage text */}
        {mode === 'loading' && (
          <text
            x={center}
            y={center + outerRadius + 15}
            textAnchor="middle"
            fill={color}
            fontSize="10"
            fontFamily="Georgia, serif"
          >
            {Math.round(progress)}%
          </text>
        )}
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROSE WINDOW LOADER - Full-screen loading overlay
// ═══════════════════════════════════════════════════════════════════════════════

interface RoseWindowLoaderProps {
  isLoading: boolean;
  progress?: number;
  message?: string;
  onComplete?: () => void;
}

export function RoseWindowLoader({
  isLoading,
  progress = 0,
  message = 'Loading...',
  onComplete,
}: RoseWindowLoaderProps) {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(26,42,26,0.95) 0%, rgba(13,21,13,0.98) 100%)',
        opacity: isLoading ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <RoseWindow
        size={160}
        petals={12}
        mode="loading"
        progress={progress}
        glowColor="#C9A227"
      />

      <p
        className="mt-8 font-decorative italic text-lg"
        style={{
          color: '#E8DCC4',
          textShadow: '0 0 10px rgba(201,162,39,0.3)',
        }}
      >
        {message}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROSE WINDOW TRANSITION - Page transition effect
// ═══════════════════════════════════════════════════════════════════════════════

interface RoseWindowTransitionProps {
  active: boolean;
  onComplete?: () => void;
}

export function RoseWindowTransition({
  active,
  onComplete,
}: RoseWindowTransitionProps) {
  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{
        background: 'transparent',
      }}
    >
      <RoseWindow
        size={80}
        petals={8}
        mode="transition"
        onTransitionComplete={onComplete}
        glowColor="#C9A227"
      />
    </div>
  );
}
