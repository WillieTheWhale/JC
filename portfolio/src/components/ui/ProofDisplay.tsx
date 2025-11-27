'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// PROOF DISPLAY - Step-by-Step Mathematical Proof Animation
// Reveals proof steps with chalk writing animation, mimicking a professor
// writing on a blackboard during a lecture
// ═══════════════════════════════════════════════════════════════════════════════

interface ProofStep {
  content: string | ReactNode;
  justification?: string;
  isConclusion?: boolean;
}

interface ProofDisplayProps {
  title: string;
  steps: ProofStep[];
  autoPlay?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  onComplete?: () => void;
}

const speedMap = {
  slow: 1500,
  normal: 800,
  fast: 400,
};

export default function ProofDisplay({
  title,
  steps,
  autoPlay = false,
  speed = 'normal',
  className = '',
  onComplete,
}: ProofDisplayProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isWriting, setIsWriting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepDelay = speedMap[speed];

  // Auto-play progression
  useEffect(() => {
    if (autoPlay && currentStep < steps.length - 1 && !isWriting) {
      const timer = setTimeout(() => {
        advanceStep();
      }, stepDelay);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, currentStep, isWriting, steps.length, stepDelay]);

  // Check completion
  useEffect(() => {
    if (currentStep === steps.length - 1 && !isWriting) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentStep, isWriting, steps.length, onComplete]);

  const advanceStep = () => {
    if (currentStep < steps.length - 1) {
      setIsWriting(true);
      setCurrentStep((prev) => prev + 1);

      // Writing animation duration
      setTimeout(() => {
        setIsWriting(false);
      }, stepDelay * 0.8);
    }
  };

  const reset = () => {
    setCurrentStep(-1);
    setIsComplete(false);
    setIsWriting(false);
  };

  const revealAll = () => {
    setCurrentStep(steps.length - 1);
    setIsComplete(true);
    setIsWriting(false);
  };

  return (
    <div
      ref={containerRef}
      className={`proof-display relative ${className}`}
    >
      {/* Chalkboard container */}
      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1E2D28 0%, #141F1A 100%)',
          boxShadow: `
            inset 0 0 60px rgba(0, 0, 0, 0.3),
            0 10px 40px rgba(0, 0, 0, 0.4),
            0 0 0 6px #5C4033,
            0 0 0 8px #3D2B1F
          `,
        }}
      >
        {/* Chalk dust texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="p-6 md:p-8">
          {/* Title */}
          <div className="mb-6 pb-4 border-b border-chalk-white/20">
            <h3
              className="font-heading text-xl md:text-2xl tracking-wide"
              style={{
                color: '#F5F5F0',
                textShadow: '0 0 2px rgba(245,245,240,0.5)',
              }}
            >
              {title}
            </h3>
          </div>

          {/* Proof Steps */}
          <div className="space-y-4 min-h-[200px]">
            {steps.map((step, index) => (
              <ProofStepLine
                key={index}
                step={step}
                stepNumber={index + 1}
                isVisible={index <= currentStep}
                isWriting={index === currentStep && isWriting}
                isConclusion={step.isConclusion}
              />
            ))}

            {/* QED Box - appears after all steps */}
            {isComplete && (
              <QEDBox delay={stepDelay * 0.5} />
            )}
          </div>

          {/* Controls */}
          <div className="mt-8 pt-4 border-t border-chalk-white/10 flex items-center justify-between">
            <div className="flex gap-2">
              {!autoPlay && (
                <button
                  onClick={advanceStep}
                  disabled={currentStep >= steps.length - 1 || isWriting}
                  className="px-4 py-2 text-sm font-heading tracking-wider uppercase
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition-all duration-200 hover:scale-105"
                  style={{
                    color: '#F5E6A3',
                    textShadow: '0 0 4px rgba(245,230,163,0.5)',
                  }}
                >
                  {currentStep === -1 ? 'Begin Proof' : 'Next Step'}
                </button>
              )}
              <button
                onClick={revealAll}
                disabled={isComplete}
                className="px-4 py-2 text-sm font-heading tracking-wider uppercase
                  disabled:opacity-30 disabled:cursor-not-allowed
                  transition-all duration-200 hover:scale-105"
                style={{
                  color: '#A8C5D8',
                  textShadow: '0 0 4px rgba(168,197,216,0.5)',
                }}
              >
                Reveal All
              </button>
            </div>

            <button
              onClick={reset}
              className="px-4 py-2 text-sm font-heading tracking-wider uppercase
                transition-all duration-200 hover:scale-105"
              style={{
                color: '#E8B4B8',
                textShadow: '0 0 4px rgba(232,180,184,0.5)',
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Chalk ledge */}
        <div
          className="h-4"
          style={{
            background: 'linear-gradient(180deg, #5C4033 0%, #3D2B1F 50%, #2A1F15 100%)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROOF STEP LINE - Individual step with animation
// ═══════════════════════════════════════════════════════════════════════════════

interface ProofStepLineProps {
  step: ProofStep;
  stepNumber: number;
  isVisible: boolean;
  isWriting: boolean;
  isConclusion?: boolean;
}

function ProofStepLine({
  step,
  stepNumber,
  isVisible,
  isWriting,
  isConclusion,
}: ProofStepLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  if (!isVisible) return null;

  return (
    <div
      ref={lineRef}
      className={`proof-step flex items-start gap-4 ${isWriting ? 'animate-chalk-write' : ''}`}
      style={{
        opacity: isWriting ? 0.7 : 1,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      {/* Step number or therefore symbol */}
      <span
        className="flex-shrink-0 w-8 text-right font-heading"
        style={{
          color: isConclusion ? '#F5E6A3' : '#A8C5D8',
          textShadow: `0 0 3px ${isConclusion ? 'rgba(245,230,163,0.5)' : 'rgba(168,197,216,0.5)'}`,
        }}
      >
        {isConclusion ? '∴' : `(${stepNumber})`}
      </span>

      {/* Step content */}
      <div className="flex-1">
        <span
          className="font-decorative"
          style={{
            color: '#F5F5F0',
            textShadow: '0 0 1px rgba(245,245,240,0.8), 0 0 3px rgba(245,245,240,0.4)',
          }}
        >
          {step.content}
        </span>

        {/* Justification */}
        {step.justification && (
          <span
            className="ml-4 text-sm font-decorative italic"
            style={{
              color: '#C4D8C4',
              textShadow: '0 0 2px rgba(196,216,196,0.5)',
            }}
          >
            [{step.justification}]
          </span>
        )}
      </div>

      {/* Writing chalk piece indicator */}
      {isWriting && (
        <div
          className="absolute -right-2 animate-pulse"
          style={{
            width: 4,
            height: 16,
            background: 'linear-gradient(180deg, #F5F5F0 0%, #E5E5E0 100%)',
            borderRadius: 2,
            boxShadow: '0 0 8px rgba(245,245,240,0.6)',
          }}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// QED BOX - End of proof marker with draw animation
// ═══════════════════════════════════════════════════════════════════════════════

interface QEDBoxProps {
  delay?: number;
}

function QEDBox({ delay = 0 }: QEDBoxProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (svgRef.current) {
        const path = svgRef.current.querySelector('rect');
        if (path) {
          setIsDrawn(true);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="flex justify-end mt-6 pr-4">
      <div className="relative">
        <svg
          ref={svgRef}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="overflow-visible"
        >
          {/* QED box with draw animation */}
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            fill={isDrawn ? '#F5F5F0' : 'transparent'}
            stroke="#F5F5F0"
            strokeWidth="2"
            style={{
              strokeDasharray: 80,
              strokeDashoffset: isDrawn ? 0 : 80,
              transition: 'stroke-dashoffset 0.6s ease-out, fill 0.3s ease-out 0.4s',
              filter: 'drop-shadow(0 0 4px rgba(245,245,240,0.5))',
            }}
          />
        </svg>

        {/* Q.E.D. text */}
        <span
          className="absolute -left-16 top-1/2 -translate-y-1/2 text-sm font-decorative italic tracking-wider"
          style={{
            color: '#F5F5F0',
            opacity: isDrawn ? 1 : 0,
            transition: 'opacity 0.3s ease-out 0.6s',
            textShadow: '0 0 2px rgba(245,245,240,0.5)',
          }}
        >
          Q.E.D.
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEOREM HEADER - Styled theorem/lemma header
// ═══════════════════════════════════════════════════════════════════════════════

interface TheoremHeaderProps {
  type?: 'theorem' | 'lemma' | 'corollary' | 'proposition' | 'definition';
  number?: string;
  name?: string;
  className?: string;
}

export function TheoremHeader({
  type = 'theorem',
  number,
  name,
  className = '',
}: TheoremHeaderProps) {
  const typeLabels = {
    theorem: 'Theorem',
    lemma: 'Lemma',
    corollary: 'Corollary',
    proposition: 'Proposition',
    definition: 'Definition',
  };

  return (
    <div className={`theorem-header flex items-center gap-2 mb-3 ${className}`}>
      <span
        className="font-heading font-semibold tracking-wider uppercase text-sm"
        style={{
          color: '#C9A227',
          textShadow: '0 0 4px rgba(201,162,39,0.4)',
        }}
      >
        {typeLabels[type]}
        {number && ` ${number}`}
      </span>
      {name && (
        <>
          <span className="text-brass-tarnished">—</span>
          <span
            className="font-decorative italic"
            style={{ color: '#E8DCC4' }}
          >
            {name}
          </span>
        </>
      )}
    </div>
  );
}
