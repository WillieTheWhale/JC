'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// CHALK ANNOTATION - Contextual Chalk Effects
// Creates chalk-style underlines, circles, and annotations on hover
// Extends the chalkboard aesthetic throughout the site
// ═══════════════════════════════════════════════════════════════════════════════

interface ChalkAnnotationProps {
  children: ReactNode;
  type?: 'underline' | 'circle' | 'box' | 'emphasis';
  color?: 'white' | 'yellow' | 'pink' | 'blue' | 'sage';
  delay?: number;
  className?: string;
  active?: boolean; // Force active state
  annotation?: string; // Margin note text
}

const chalkColors = {
  white: '#F5F5F0',
  yellow: '#F5E6A3',
  pink: '#E8B4B8',
  blue: '#A8C5D8',
  sage: '#C4D8C4',
};

export default function ChalkAnnotation({
  children,
  type = 'underline',
  color = 'white',
  delay = 0,
  className = '',
  active = false,
  annotation,
}: ChalkAnnotationProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [children]);

  // Animate SVG path on hover
  useEffect(() => {
    if (svgRef.current && (isHovered || active)) {
      const paths = svgRef.current.querySelectorAll('path');
      paths.forEach((path, i) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        setTimeout(() => {
          path.style.transition = `stroke-dashoffset 0.4s ease-out ${i * 0.1}s`;
          path.style.strokeDashoffset = '0';
        }, delay);
      });
    } else if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path');
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.transition = 'stroke-dashoffset 0.2s ease-in';
        path.style.strokeDashoffset = `${length}`;
      });
    }
  }, [isHovered, active, delay, dimensions]);

  const strokeColor = chalkColors[color];
  const { width, height } = dimensions;

  // Generate chalk-like wobbly path
  const generateWobblyLine = (x1: number, y1: number, x2: number, y2: number): string => {
    const points: string[] = [`M ${x1} ${y1}`];
    const segments = 8;
    const wobble = 1.5;

    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * wobble;
      points.push(`L ${x} ${y}`);
    }

    return points.join(' ');
  };

  // Generate circle path (slightly wobbly)
  const generateWobblyCircle = (cx: number, cy: number, rx: number, ry: number): string => {
    const points: string[] = [];
    const segments = 24;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const wobbleX = (Math.random() - 0.5) * 2;
      const wobbleY = (Math.random() - 0.5) * 2;
      const x = cx + (rx + wobbleX) * Math.cos(angle);
      const y = cy + (ry + wobbleY) * Math.sin(angle);

      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }

    points.push('Z');
    return points.join(' ');
  };

  // Generate box path
  const generateWobblyBox = (w: number, h: number, padding: number): string => {
    const p = padding;
    const wobble = 1.5;

    const topLeft = { x: -p, y: -p };
    const topRight = { x: w + p, y: -p + (Math.random() - 0.5) * wobble };
    const bottomRight = { x: w + p + (Math.random() - 0.5) * wobble, y: h + p };
    const bottomLeft = { x: -p, y: h + p + (Math.random() - 0.5) * wobble };

    return `M ${topLeft.x} ${topLeft.y} L ${topRight.x} ${topRight.y} L ${bottomRight.x} ${bottomRight.y} L ${bottomLeft.x} ${bottomLeft.y} Z`;
  };

  const renderAnnotation = () => {
    if (width === 0 || height === 0) return null;

    const padding = 4;
    const svgWidth = width + padding * 2;
    const svgHeight = height + padding * 2;

    switch (type) {
      case 'underline':
        return (
          <svg
            ref={svgRef}
            className="absolute pointer-events-none"
            style={{
              left: -padding,
              bottom: -2,
              width: svgWidth,
              height: 8,
              overflow: 'visible',
            }}
            viewBox={`0 0 ${svgWidth} 8`}
            preserveAspectRatio="none"
          >
            <path
              d={generateWobblyLine(padding, 4, width + padding, 4)}
              stroke={strokeColor}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{
                filter: 'url(#chalkTexture)',
              }}
            />
            {/* Second line for chalk texture effect */}
            <path
              d={generateWobblyLine(padding + 2, 5, width + padding - 2, 5)}
              stroke={strokeColor}
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        );

      case 'circle':
        return (
          <svg
            ref={svgRef}
            className="absolute pointer-events-none"
            style={{
              left: -padding - 8,
              top: -padding - 4,
              width: svgWidth + 16,
              height: svgHeight + 8,
              overflow: 'visible',
            }}
            viewBox={`0 0 ${svgWidth + 16} ${svgHeight + 8}`}
          >
            <path
              d={generateWobblyCircle(
                svgWidth / 2 + 8,
                svgHeight / 2 + 4,
                width / 2 + 8,
                height / 2 + 6
              )}
              stroke={strokeColor}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        );

      case 'box':
        return (
          <svg
            ref={svgRef}
            className="absolute pointer-events-none"
            style={{
              left: -padding,
              top: -padding,
              width: svgWidth,
              height: svgHeight,
              overflow: 'visible',
            }}
            viewBox={`${-padding} ${-padding} ${svgWidth} ${svgHeight}`}
          >
            <path
              d={generateWobblyBox(width, height, padding - 2)}
              stroke={strokeColor}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'emphasis':
        // Double underline with slight angle
        return (
          <svg
            ref={svgRef}
            className="absolute pointer-events-none"
            style={{
              left: -padding,
              bottom: -6,
              width: svgWidth,
              height: 12,
              overflow: 'visible',
            }}
            viewBox={`0 0 ${svgWidth} 12`}
            preserveAspectRatio="none"
          >
            <path
              d={generateWobblyLine(padding, 3, width + padding, 3)}
              stroke={strokeColor}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={generateWobblyLine(padding + 4, 8, width + padding - 4, 8)}
              stroke={strokeColor}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Filter for chalk texture */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="chalkTexture" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
          </filter>
        </defs>
      </svg>

      {/* The content */}
      <span className="relative z-10">{children}</span>

      {/* The chalk annotation */}
      {renderAnnotation()}

      {/* Margin annotation if provided */}
      {annotation && (isHovered || active) && (
        <span
          className="absolute left-full ml-4 top-0 whitespace-nowrap text-sm font-decorative italic opacity-0 transition-opacity duration-300"
          style={{
            color: strokeColor,
            opacity: isHovered || active ? 0.8 : 0,
            textShadow: `0 0 4px ${strokeColor}`,
          }}
        >
          {annotation}
        </span>
      )}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHALK MARGIN NOTE - Standalone margin annotation
// ═══════════════════════════════════════════════════════════════════════════════

interface ChalkMarginNoteProps {
  children: ReactNode;
  side?: 'left' | 'right';
  color?: 'white' | 'yellow' | 'pink' | 'blue' | 'sage';
  className?: string;
}

export function ChalkMarginNote({
  children,
  side = 'right',
  color = 'yellow',
  className = '',
}: ChalkMarginNoteProps) {
  const strokeColor = chalkColors[color];

  return (
    <aside
      className={`absolute ${side === 'left' ? 'right-full mr-6' : 'left-full ml-6'}
        top-0 w-32 text-sm font-decorative italic ${className}`}
      style={{
        color: strokeColor,
        textShadow: `0 0 2px ${strokeColor}`,
      }}
    >
      {/* Connecting bracket */}
      <svg
        className={`absolute ${side === 'left' ? '-right-4' : '-left-4'} top-0 w-4 h-full`}
        viewBox="0 0 16 100"
        preserveAspectRatio="none"
      >
        <path
          d={side === 'left' ? 'M 12 0 Q 4 50 12 100' : 'M 4 0 Q 12 50 4 100'}
          stroke={strokeColor}
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </svg>
      {children}
    </aside>
  );
}
