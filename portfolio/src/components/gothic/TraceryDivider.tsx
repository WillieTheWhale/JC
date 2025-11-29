'use client';

import { useEffect, useRef, useState } from 'react';
import { TraceryDividerProps } from '@/types';

export default function TraceryDivider({
  variant = 'simple',
  width = '100%',
  color = '#5A6B5A',
  animate = true,
  className = '',
  glowColor,
  breathe = false,
}: TraceryDividerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (svgRef.current && animate && isVisible) {
      const paths = svgRef.current.querySelectorAll('path, circle, line');
      paths.forEach((path, i) => {
        if (path instanceof SVGGeometryElement) {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length}`;

          requestAnimationFrame(() => {
            path.style.transition = `stroke-dashoffset 1.2s ease-out ${i * 0.08}s`;
            path.style.strokeDashoffset = '0';
          });
        }
      });
    }
  }, [animate, isVisible]);

  const renderVariant = () => {
    const glow = glowColor || color;

    switch (variant) {
      case 'ornate':
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 400 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="traceryGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Central trefoil */}
            <path
              d="M200 5 A15 15 0 1 1 200 35 A15 15 0 1 1 180 25 A15 15 0 1 1 220 25 A15 15 0 1 1 200 5"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            {/* Left cusped arches */}
            <path
              d="M10 45 Q50 5 90 45 M90 45 Q130 5 170 45"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            {/* Right cusped arches */}
            <path
              d="M230 45 Q270 5 310 45 M310 45 Q350 5 390 45"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            {/* Small trefoils in spandrels */}
            <circle cx="70" cy="35" r="5" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="150" cy="35" r="5" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="250" cy="35" r="5" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="330" cy="35" r="5" stroke={color} strokeWidth="1" fill="none" />
          </svg>
        );

      case 'geometric':
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 400 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Bar tracery - interlocking circles */}
            <circle cx="100" cy="20" r="18" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="200" cy="20" r="18" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="300" cy="20" r="18" stroke={color} strokeWidth="1.5" fill="none" />
            {/* Connecting small circles */}
            <circle cx="50" cy="20" r="10" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="150" cy="20" r="10" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="250" cy="20" r="10" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="350" cy="20" r="10" stroke={color} strokeWidth="1" fill="none" />
            {/* Horizontal line */}
            <line x1="0" y1="20" x2="400" y2="20" stroke={color} strokeWidth="0.5" opacity="0.3" />
          </svg>
        );

      // NEW: Mathematical tracery - incorporates mathematical curves
      case 'mathematical':
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 400 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="mathGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Sine wave along top */}
            <path
              d="M0 30 C20 10 40 10 60 30 C80 50 100 50 120 30 C140 10 160 10 180 30 C200 50 220 50 240 30 C260 10 280 10 300 30 C320 50 340 50 360 30 C380 10 400 10 420 30"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
              opacity="0.8"
            />

            {/* Golden ratio spiral approximation at center */}
            <g transform="translate(200, 30)">
              <path
                d="M0 0 Q 8 -8 16 0 Q 12 12 0 8 Q -10 4 -8 -8 Q 0 -16 16 -12"
                stroke={color}
                strokeWidth="1.2"
                fill="none"
                filter="url(#mathGlow)"
              />
            </g>

            {/* Euler's circles (representing e^iπ = -1) */}
            <circle cx="60" cy="30" r="12" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
            <circle cx="60" cy="30" r="8" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
            <circle cx="340" cy="30" r="12" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
            <circle cx="340" cy="30" r="8" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />

            {/* Mathematical symbols at key points */}
            <text x="200" y="34" textAnchor="middle" fill={color} fontSize="10" fontStyle="italic" opacity="0.7">φ</text>
            <text x="60" y="34" textAnchor="middle" fill={color} fontSize="8" fontStyle="italic" opacity="0.5">π</text>
            <text x="340" y="34" textAnchor="middle" fill={color} fontSize="8" fontStyle="italic" opacity="0.5">e</text>

            {/* Base lines */}
            <line x1="0" y1="55" x2="400" y2="55" stroke={color} strokeWidth="0.5" opacity="0.3" />
          </svg>
        );

      // NEW: Flowing tracery - organic curves
      case 'flowing':
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 400 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Flowing ogee curves */}
            <path
              d="M0 45 C30 45 40 5 70 5 C100 5 110 45 140 45 C170 45 180 5 210 5 C240 5 250 45 280 45 C310 45 320 5 350 5 C380 5 390 45 400 45"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            {/* Counter curve */}
            <path
              d="M0 5 C30 5 40 45 70 45 C100 45 110 5 140 5 C170 5 180 45 210 45 C240 45 250 5 280 5 C310 5 320 45 350 45 C380 45 390 5 400 5"
              stroke={color}
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            {/* Intersection points - quatrefoils */}
            {[70, 140, 210, 280, 350].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="25" r="6" stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
                <circle cx={x} cy="25" r="3" stroke={color} strokeWidth="0.5" fill="none" opacity="0.4" />
              </g>
            ))}
          </svg>
        );

      // NEW: Cathedral tracery - elaborate window-style
      case 'cathedral':
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 400 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="cathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={glow} stopOpacity="0.8" />
                <stop offset="100%" stopColor={glow} stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Main pointed arches */}
            <path
              d="M0 65 L0 35 Q40 -10 80 35 L80 65"
              stroke="url(#cathGrad)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M80 65 L80 35 Q120 -10 160 35 L160 65"
              stroke="url(#cathGrad)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M160 65 L160 35 Q200 -10 240 35 L240 65"
              stroke="url(#cathGrad)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M240 65 L240 35 Q280 -10 320 35 L320 65"
              stroke="url(#cathGrad)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M320 65 L320 35 Q360 -10 400 35 L400 65"
              stroke="url(#cathGrad)"
              strokeWidth="2"
              fill="none"
            />

            {/* Trefoil decorations at apex */}
            {[40, 120, 200, 280, 360].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="15" r="8" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
                <circle cx={x - 6} cy="22" r="5" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
                <circle cx={x + 6} cy="22" r="5" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
              </g>
            ))}

            {/* Base line */}
            <line x1="0" y1="65" x2="400" y2="65" stroke={color} strokeWidth="1" opacity="0.5" />
          </svg>
        );

      default: // simple
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 400 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Repeating lancet arch pattern */}
            <path
              d="M0 28 Q20 5 40 28 M40 28 Q60 5 80 28 M80 28 Q100 5 120 28 M120 28 Q140 5 160 28 M160 28 Q180 5 200 28 M200 28 Q220 5 240 28 M240 28 Q260 5 280 28 M280 28 Q300 5 320 28 M320 28 Q340 5 360 28 M360 28 Q380 5 400 28"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Base line */}
            <line x1="0" y1="28" x2="400" y2="28" stroke={color} strokeWidth="1" opacity="0.5" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`py-4 ${className} ${breathe ? 'animate-breathe' : ''}`}
      style={{ width }}
      role="separator"
      aria-hidden="true"
    >
      {renderVariant()}

      {/* Light pass-through effect */}
      {glowColor && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${glowColor}08 50%, transparent 100%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
}
