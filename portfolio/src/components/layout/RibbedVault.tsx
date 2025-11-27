'use client';

import { useEffect, useRef, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// RIBBED VAULT - Subtle Parallax Ceiling Effect
// Creates the sense of walking through a cathedral nave as user scrolls
// Ribs converge at keystones containing mathematical symbols
// Only appears on pages exceeding viewport height
// ═══════════════════════════════════════════════════════════════════════════════

interface RibbedVaultProps {
  enabled?: boolean;
  ribColor?: string;
  keystoneSymbols?: string[];
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export default function RibbedVault({
  enabled = true,
  ribColor = '#5A6B5A',
  keystoneSymbols = ['π', 'φ', 'e', '∞', 'Σ', '∫'],
  intensity = 'subtle',
  className = '',
}: RibbedVaultProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);

  const intensityValues = {
    subtle: { opacity: 0.03, parallaxFactor: 0.1 },
    medium: { opacity: 0.06, parallaxFactor: 0.2 },
    strong: { opacity: 0.1, parallaxFactor: 0.3 },
  };

  const { opacity, parallaxFactor } = intensityValues[intensity];

  // Check if page is tall enough to warrant vault effect
  useEffect(() => {
    const checkPageHeight = () => {
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      setPageHeight(docHeight);
      setIsVisible(enabled && docHeight > viewHeight * 1.5);
    };

    checkPageHeight();
    window.addEventListener('resize', checkPageHeight);
    return () => window.removeEventListener('resize', checkPageHeight);
  }, [enabled]);

  // Track scroll position
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  if (!isVisible) return null;

  // Calculate number of vault sections based on page height
  const sectionCount = Math.max(3, Math.floor(pageHeight / window.innerHeight));

  // Generate rib paths
  const generateRibs = (sectionIndex: number) => {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const sectionHeight = 300;
    const centerX = viewportWidth / 2;

    // Parallax offset based on scroll
    const parallaxOffset = scrollProgress * parallaxFactor * sectionHeight * (sectionIndex + 1);

    return (
      <g
        key={sectionIndex}
        transform={`translate(0, ${sectionIndex * sectionHeight - parallaxOffset})`}
        opacity={opacity}
      >
        {/* Left diagonal ribs */}
        <path
          d={`M 0 0 Q ${centerX * 0.3} ${sectionHeight * 0.3} ${centerX} ${sectionHeight}`}
          stroke={ribColor}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d={`M ${centerX * 0.5} 0 Q ${centerX * 0.6} ${sectionHeight * 0.4} ${centerX} ${sectionHeight}`}
          stroke={ribColor}
          strokeWidth="1"
          fill="none"
        />

        {/* Right diagonal ribs */}
        <path
          d={`M ${viewportWidth} 0 Q ${viewportWidth - centerX * 0.3} ${sectionHeight * 0.3} ${centerX} ${sectionHeight}`}
          stroke={ribColor}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d={`M ${viewportWidth - centerX * 0.5} 0 Q ${viewportWidth - centerX * 0.6} ${sectionHeight * 0.4} ${centerX} ${sectionHeight}`}
          stroke={ribColor}
          strokeWidth="1"
          fill="none"
        />

        {/* Transverse rib (horizontal arch) */}
        <path
          d={`M 0 ${sectionHeight * 0.1} Q ${centerX} ${sectionHeight * -0.2} ${viewportWidth} ${sectionHeight * 0.1}`}
          stroke={ribColor}
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />

        {/* Keystone at intersection */}
        <g transform={`translate(${centerX}, ${sectionHeight})`}>
          {/* Keystone shape */}
          <path
            d="M -12 -8 L -8 -20 L 8 -20 L 12 -8 Z"
            fill={ribColor}
            opacity="0.3"
          />
          {/* Mathematical symbol */}
          <text
            x="0"
            y="-10"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={ribColor}
            fontSize="12"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            opacity="0.6"
          >
            {keystoneSymbols[sectionIndex % keystoneSymbols.length]}
          </text>
        </g>
      </g>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        style={{
          transform: `translateY(${-scrollProgress * 50}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <defs>
          {/* Gradient fade for top edge */}
          <linearGradient id="vaultFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={ribColor} stopOpacity={opacity * 2} />
            <stop offset="30%" stopColor={ribColor} stopOpacity={opacity} />
            <stop offset="100%" stopColor={ribColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Generate vault sections */}
        {Array.from({ length: sectionCount }, (_, i) => generateRibs(i))}

        {/* Top fade overlay */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="150"
          fill="url(#vaultFade)"
        />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VAULT KEYSTONE - Decorative keystone element for content sections
// ═══════════════════════════════════════════════════════════════════════════════

interface VaultKeystoneProps {
  symbol?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function VaultKeystone({
  symbol = '∞',
  size = 'md',
  color = '#5A6B5A',
  className = '',
}: VaultKeystoneProps) {
  const sizeMap = {
    sm: { width: 24, height: 30, fontSize: 10 },
    md: { width: 36, height: 45, fontSize: 14 },
    lg: { width: 48, height: 60, fontSize: 18 },
  };

  const { width, height, fontSize } = sizeMap[size];

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg width={width} height={height} viewBox="0 0 36 45">
        {/* Keystone trapezoid shape */}
        <path
          d="M 4 45 L 8 0 L 28 0 L 32 45 Z"
          fill={color}
          opacity="0.2"
        />
        <path
          d="M 4 45 L 8 0 L 28 0 L 32 45"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />

        {/* Decorative lines */}
        <line x1="12" y1="8" x2="24" y2="8" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <line x1="10" y1="37" x2="26" y2="37" stroke={color} strokeWidth="0.5" opacity="0.4" />

        {/* Symbol */}
        <text
          x="18"
          y="24"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          fontSize={fontSize}
          fontFamily="Georgia, serif"
          fontStyle="italic"
          opacity="0.8"
        >
          {symbol}
        </text>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GROIN VAULT PATTERN - Ceiling pattern overlay
// ═══════════════════════════════════════════════════════════════════════════════

interface GroinVaultPatternProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export function GroinVaultPattern({
  width = 200,
  height = 200,
  color = '#5A6B5A',
  className = '',
}: GroinVaultPatternProps) {
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      {/* Diagonal ribs forming X pattern */}
      <path
        d={`M 0 0 Q ${centerX} ${centerY * 0.5} ${centerX} ${centerY} Q ${centerX} ${centerY * 1.5} ${width} ${height}`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
      <path
        d={`M ${width} 0 Q ${centerX} ${centerY * 0.5} ${centerX} ${centerY} Q ${centerX} ${centerY * 1.5} 0 ${height}`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />

      {/* Transverse arches */}
      <path
        d={`M 0 ${centerY} Q ${centerX} ${centerY * 0.3} ${width} ${centerY}`}
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />
      <path
        d={`M ${centerX} 0 Q ${centerX * 1.3} ${centerY} ${centerX} ${height}`}
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />

      {/* Central boss */}
      <circle
        cx={centerX}
        cy={centerY}
        r="8"
        fill={color}
        opacity="0.15"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r="4"
        fill={color}
        opacity="0.25"
      />
    </svg>
  );
}
