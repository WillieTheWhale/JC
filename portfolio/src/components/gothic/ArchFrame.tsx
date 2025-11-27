'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// ARCH FRAME - Structural Gothic Arch Content Frame
// Pointed arch frames for content sections, transforming Gothic elements
// from decorative to structural
// ═══════════════════════════════════════════════════════════════════════════════

interface ArchFrameProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'lancet' | 'equilateral' | 'depressed';
  strokeColor?: string;
  fillColor?: string;
  animate?: boolean;
  showKeystone?: boolean;
  keystoneSymbol?: string;
  className?: string;
}

const sizeConfig = {
  sm: { width: 200, height: 280, strokeWidth: 1.5 },
  md: { width: 300, height: 420, strokeWidth: 2 },
  lg: { width: 400, height: 560, strokeWidth: 2.5 },
  xl: { width: 500, height: 700, strokeWidth: 3 },
};

export default function ArchFrame({
  children,
  size = 'md',
  variant = 'lancet',
  strokeColor = '#5A6B5A',
  fillColor = 'transparent',
  animate = true,
  showKeystone = true,
  keystoneSymbol = '∫',
  className = '',
}: ArchFrameProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { width, height, strokeWidth } = sizeConfig[size];

  // Calculate arch geometry based on variant
  const getArchPath = () => {
    const padding = 10;
    const archWidth = width - padding * 2;
    const archHeight = height - padding * 2;
    const baseY = archHeight;
    const centerX = width / 2;

    // Calculate radius based on arch variant
    let radius: number;
    switch (variant) {
      case 'lancet':
        // Pointed - radius > half width (overlapping circles)
        radius = archWidth * 0.9;
        break;
      case 'equilateral':
        // Radius equals width
        radius = archWidth;
        break;
      case 'depressed':
        // Flatter arch - radius < half width
        radius = archWidth * 0.6;
        break;
      default:
        radius = archWidth * 0.8;
    }

    // Calculate the apex point where the two arcs meet
    const apexY = padding + strokeWidth;

    // Build path: start bottom left, up left side, arc to apex, arc to right, down right side
    return `
      M ${padding} ${baseY}
      L ${padding} ${archHeight * 0.35}
      A ${radius} ${radius} 0 0 1 ${centerX} ${apexY}
      A ${radius} ${radius} 0 0 1 ${width - padding} ${archHeight * 0.35}
      L ${width - padding} ${baseY}
    `;
  };

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate path on visibility
  useEffect(() => {
    if (svgRef.current && animate && isVisible) {
      const path = svgRef.current.querySelector('.arch-path') as SVGPathElement;
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        requestAnimationFrame(() => {
          path.style.transition = 'stroke-dashoffset 1.2s ease-out';
          path.style.strokeDashoffset = '0';
        });
      }
    }
  }, [animate, isVisible]);

  const archPath = getArchPath();
  const centerX = width / 2;

  return (
    <div
      className={`arch-frame relative ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Arch Frame */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stone texture filter */}
        <defs>
          <filter id={`stoneTexture-${size}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>

          {/* Subtle inner shadow for depth */}
          <filter id={`archShadow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
          </filter>

          {/* Gradient for stonework effect */}
          <linearGradient id={`stoneGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="1" />
            <stop offset="50%" stopColor={strokeColor} stopOpacity="0.85" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Background fill (optional) */}
        {fillColor !== 'transparent' && (
          <path
            d={`${archPath} L ${width - 10} ${height - 10} L 10 ${height - 10} Z`}
            fill={fillColor}
            opacity="0.95"
          />
        )}

        {/* Main arch path */}
        <path
          className="arch-path"
          d={archPath}
          stroke={`url(#stoneGradient-${size})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: animate ? (isVisible ? 1 : 0) : 1,
            filter: `url(#archShadow-${size})`,
          }}
        />

        {/* Inner arch line for depth */}
        <path
          d={archPath}
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.4}
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
          transform="translate(3, 3)"
        />

        {/* Keystone at apex */}
        {showKeystone && (
          <g
            className="keystone"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.8s',
            }}
          >
            {/* Keystone shape */}
            <path
              d={`M ${centerX - 15} 20 L ${centerX - 10} 5 L ${centerX + 10} 5 L ${centerX + 15} 20 Z`}
              fill={strokeColor}
              opacity="0.9"
            />

            {/* Mathematical symbol in keystone */}
            <text
              x={centerX}
              y="16"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#E8DCC4"
              fontSize="12"
              fontFamily="Georgia, serif"
              fontStyle="italic"
              className="tracery-symbol"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
                filter: isHovered ? 'blur(0)' : 'blur(2px)',
              }}
            >
              {keystoneSymbol}
            </text>
          </g>
        )}

        {/* Decorative imposts (capitals at arch spring points) */}
        <rect
          x="5"
          y={height * 0.33}
          width="12"
          height="8"
          fill={strokeColor}
          opacity="0.8"
        />
        <rect
          x={width - 17}
          y={height * 0.33}
          width="12"
          height="8"
          fill={strokeColor}
          opacity="0.8"
        />
      </svg>

      {/* Content container */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          padding: `${height * 0.08}px ${width * 0.08}px ${height * 0.05}px`,
          paddingTop: `${height * 0.12}px`,
        }}
      >
        <div className="w-full h-full overflow-hidden">
          {children}
        </div>
      </div>

      {/* Light shift effect on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at ${isHovered ? '60%' : '40%'} 30%, rgba(244, 208, 63, 0.03) 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0.5,
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARCH GALLERY - Grid of arch frames
// ═══════════════════════════════════════════════════════════════════════════════

interface ArchGalleryProps {
  children: ReactNode[];
  columns?: 2 | 3 | 4;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ArchGallery({
  children,
  columns = 3,
  size = 'sm',
  className = '',
}: ArchGalleryProps) {
  return (
    <div
      className={`arch-gallery grid gap-6 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {children.map((child, index) => (
        <ArchFrame
          key={index}
          size={size}
          animate
          keystoneSymbol={['π', 'φ', '∞', 'Σ', '∫', 'Δ'][index % 6]}
        >
          {child}
        </ArchFrame>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARCH ALCOVE - Deep recessed arch with shadow
// ═══════════════════════════════════════════════════════════════════════════════

interface ArchAlcoveProps {
  children: ReactNode;
  depth?: 'shallow' | 'medium' | 'deep';
  className?: string;
}

export function ArchAlcove({
  children,
  depth = 'medium',
  className = '',
}: ArchAlcoveProps) {
  const depthShadow = {
    shallow: 'inset 0 0 20px rgba(0,0,0,0.2)',
    medium: 'inset 0 0 40px rgba(0,0,0,0.3), inset 0 10px 30px rgba(0,0,0,0.2)',
    deep: 'inset 0 0 60px rgba(0,0,0,0.4), inset 0 20px 50px rgba(0,0,0,0.3)',
  };

  return (
    <div
      className={`arch-alcove relative rounded-t-full ${className}`}
      style={{
        boxShadow: depthShadow[depth],
        background: 'linear-gradient(180deg, rgba(26,42,26,0.3) 0%, transparent 100%)',
      }}
    >
      {children}
    </div>
  );
}
