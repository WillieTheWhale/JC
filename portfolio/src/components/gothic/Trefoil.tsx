'use client';

import { useRef, useState } from 'react';
import { TrefoilProps } from '@/types';

export default function Trefoil({
  size = 60,
  color = '#5A6B5A',
  filled = false,
  animate = true,
  hiddenSymbol = 'π',
  className = '',
}: TrefoilProps) {
  const [isHovered, setIsHovered] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const center = size / 2;
  const radius = size / 4;
  const offset = radius * 0.9;

  // Three circles positioned at 120° intervals
  const circles = [
    { cx: center, cy: center - offset }, // Top
    { cx: center - offset * Math.cos(Math.PI / 6), cy: center + offset * Math.sin(Math.PI / 6) }, // Bottom left
    { cx: center + offset * Math.cos(Math.PI / 6), cy: center + offset * Math.sin(Math.PI / 6) }, // Bottom right
  ];

  return (
    <div
      className={`tracery-reveal relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Gothic trefoil ornament"
        className={animate ? 'transition-transform duration-300 hover:scale-110' : ''}
      >
        <defs>
          <clipPath id={`trefoil-clip-${size}`}>
            {circles.map((circle, i) => (
              <circle key={i} cx={circle.cx} cy={circle.cy} r={radius} />
            ))}
          </clipPath>
        </defs>

        {/* Main trefoil shape */}
        <g clipPath={`url(#trefoil-clip-${size})`}>
          <rect width={size} height={size} fill={filled ? color : 'transparent'} />
        </g>

        {/* Outline circles */}
        {circles.map((circle, i) => (
          <circle
            key={i}
            cx={circle.cx}
            cy={circle.cy}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={2}
            className={animate ? 'gothic-draw' : ''}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}

        {/* Hidden symbol - reveals on hover */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize={size / 4}
          fontFamily="Georgia, serif"
          className="tracery-symbol"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1)' : 'scale(0.8)',
            transformOrigin: 'center',
            transition: 'all 400ms ease-out 200ms',
          }}
        >
          {hiddenSymbol}
        </text>
      </svg>
    </div>
  );
}
