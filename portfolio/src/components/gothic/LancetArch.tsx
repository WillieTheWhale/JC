'use client';

import { useEffect, useRef, useState } from 'react';
import { LancetArchProps } from '@/types';

export default function LancetArch({
  width = 200,
  height = 300,
  strokeColor = '#5A6B5A',
  strokeWidth = 2,
  animate = true,
  delay = 0,
  className = '',
  children,
}: LancetArchProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (pathRef.current && animate && isVisible) {
      const path = pathRef.current;
      const length = path.getTotalLength();

      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      // Trigger animation
      requestAnimationFrame(() => {
        path.style.transition = 'stroke-dashoffset 0.8s ease-out';
        path.style.strokeDashoffset = '0';
      });
    }
  }, [animate, isVisible]);

  // Gothic lancet arch geometry - pointed arch formed by two arcs
  const centerX = width / 2;
  const radius = width * 0.8; // Slightly overlapping arcs for pointed effect

  const path = `
    M 0 ${height}
    L 0 ${height * 0.4}
    A ${radius} ${radius} 0 0 1 ${centerX} ${strokeWidth}
    A ${radius} ${radius} 0 0 1 ${width} ${height * 0.4}
    L ${width} ${height}
  `;

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label="Gothic lancet arch decorative frame"
      >
        <path
          ref={pathRef}
          d={path}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            opacity: animate ? (isVisible ? 1 : 0) : 1,
          }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {children}
        </div>
      )}
    </div>
  );
}
