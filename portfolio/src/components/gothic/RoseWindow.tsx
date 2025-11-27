'use client';

import { RoseWindowProps } from '@/types';

export default function RoseWindow({
  size = 120,
  petals = 8,
  color = '#5A6B5A',
  spinning = true,
  spinDuration = 60,
  className = '',
}: RoseWindowProps) {
  const center = size / 2;
  const outerRadius = size / 2 - 4;
  const innerRadius = outerRadius * 0.3;
  const petalRadius = outerRadius * 0.6;

  // Generate petal paths
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

      paths.push(
        <path
          key={i}
          d={`M ${x1} ${y1} Q ${cpx1} ${cpy1} ${x2} ${y2} Q ${cpx2} ${cpy2} ${x3} ${y3}`}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          className="gothic-draw"
          style={{ animationDelay: `${i * 0.05}s` }}
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

  return (
    <div className={`inline-block ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Gothic rose window ornament"
        className={spinning ? 'animate-rotate-slow' : ''}
        style={spinning ? { animationDuration: `${spinDuration}s` } : {}}
      >
        {/* Outer cusped ring */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          stroke={color}
          strokeWidth="2"
          fill="none"
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
      </svg>
    </div>
  );
}
