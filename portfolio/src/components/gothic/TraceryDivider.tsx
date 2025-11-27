'use client';

import { useEffect, useRef } from 'react';
import { TraceryDividerProps } from '@/types';

export default function TraceryDivider({
  variant = 'simple',
  width = '100%',
  color = '#5A6B5A',
  animate = true,
  className = '',
}: TraceryDividerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && animate) {
      const paths = svgRef.current.querySelectorAll('path');
      paths.forEach((path, i) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        requestAnimationFrame(() => {
          path.style.transition = `stroke-dashoffset 1.2s ease-out ${i * 0.1}s`;
          path.style.strokeDashoffset = '0';
        });
      });
    }
  }, [animate]);

  const renderVariant = () => {
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
      className={`py-4 ${className}`}
      style={{ width }}
      role="separator"
      aria-hidden="true"
    >
      {renderVariant()}
    </div>
  );
}
