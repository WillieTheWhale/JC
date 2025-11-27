'use client';

import { useState } from 'react';
import { QuatrefoilProps } from '@/types';

export default function Quatrefoil({
  size = 60,
  color = '#5A6B5A',
  filled = false,
  rounded = false,
  hiddenSymbol = 'φ',
  className = '',
}: QuatrefoilProps) {
  const [isHovered, setIsHovered] = useState(false);

  const center = size / 2;
  const radius = size / 4;
  const offset = radius * 0.7;

  // Four circles at 90° intervals (cruciform pattern)
  const circles = [
    { cx: center, cy: center - offset }, // Top
    { cx: center + offset, cy: center }, // Right
    { cx: center, cy: center + offset }, // Bottom
    { cx: center - offset, cy: center }, // Left
  ];

  return (
    <div
      className={`tracery-reveal relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Gothic quatrefoil ornament"
        className="transition-transform duration-300 hover:scale-110"
      >
        <defs>
          <clipPath id={`quatrefoil-clip-${size}-${rounded}`}>
            {circles.map((circle, i) => (
              <circle key={i} cx={circle.cx} cy={circle.cy} r={radius} />
            ))}
          </clipPath>
        </defs>

        {/* Background fill */}
        {filled && (
          <g clipPath={`url(#quatrefoil-clip-${size}-${rounded})`}>
            <rect width={size} height={size} fill={color} fillOpacity={0.1} />
          </g>
        )}

        {/* Outline circles */}
        {circles.map((circle, i) => (
          <circle
            key={i}
            cx={circle.cx}
            cy={circle.cy}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            className="gothic-draw"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}

        {/* Central connecting lines for visual interest */}
        <circle
          cx={center}
          cy={center}
          r={offset / 2}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeDasharray="2,2"
          opacity={0.5}
        />

        {/* Hidden symbol - reveals on hover */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize={size / 3.5}
          fontFamily="Georgia, serif"
          fontStyle="italic"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1)' : 'scale(0.8)',
            transformOrigin: 'center',
            transition: 'all 400ms ease-out 200ms',
            filter: isHovered ? 'blur(0)' : 'blur(4px)',
          }}
        >
          {hiddenSymbol}
        </text>
      </svg>
    </div>
  );
}
