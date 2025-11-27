'use client';

import { useEffect, useRef, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// ILLUMINATED MANUSCRIPT SECTION HEADER
// Medieval-inspired headers with ornate decorations and drop caps
// ═══════════════════════════════════════════════════════════════════════════════

interface IlluminatedHeaderProps {
  title: string;
  subtitle?: string;
  symbol?: string; // Mathematical symbol for decoration
  variant?: 'gold' | 'sage' | 'brass';
}

export default function IlluminatedHeader({
  title,
  subtitle,
  symbol = '∞',
  variant = 'gold',
}: IlluminatedHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const colors = {
    gold: {
      primary: '#C9A227',
      secondary: '#D4AF37',
      tertiary: '#8B7355',
      glow: 'rgba(201, 162, 39, 0.3)',
    },
    sage: {
      primary: '#5A6B5A',
      secondary: '#6A7B6A',
      tertiary: '#4A5A4A',
      glow: 'rgba(90, 107, 90, 0.3)',
    },
    brass: {
      primary: '#8B7355',
      secondary: '#A08565',
      tertiary: '#6B5344',
      glow: 'rgba(139, 115, 85, 0.3)',
    },
  }[variant];

  return (
    <div
      ref={headerRef}
      className={`flex flex-col items-center gap-6 mb-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Top ornamental line with Gothic arches */}
      <div className="flex items-center gap-4 w-full max-w-3xl">
        <svg
          viewBox="0 0 200 30"
          className="flex-1 h-8"
          fill="none"
          style={{ transform: 'scaleX(-1)' }}
        >
          <path
            d="M0 28 Q20 8 40 28 Q60 8 80 28 Q100 8 120 28 Q140 8 160 28 Q180 8 200 28"
            stroke={colors.tertiary}
            strokeWidth="1"
            fill="none"
            opacity="0.6"
            className={isVisible ? 'animate-draw-in' : ''}
            style={{
              strokeDasharray: 500,
              strokeDashoffset: isVisible ? 0 : 500,
              transition: 'stroke-dashoffset 1.5s ease-out',
            }}
          />
          <line
            x1="0"
            y1="28"
            x2="200"
            y2="28"
            stroke={colors.tertiary}
            strokeWidth="0.5"
            opacity="0.3"
          />
        </svg>

        {/* Central symbol in ornate frame */}
        <div
          className="relative w-16 h-16 flex items-center justify-center"
          style={{
            filter: `drop-shadow(0 0 10px ${colors.glow})`,
          }}
        >
          {/* Quatrefoil frame */}
          <svg viewBox="0 0 60 60" className="absolute inset-0 w-full h-full">
            <circle
              cx="30"
              cy="12"
              r="10"
              stroke={colors.primary}
              strokeWidth="1.5"
              fill="none"
              className={isVisible ? '' : ''}
              style={{
                strokeDasharray: 63,
                strokeDashoffset: isVisible ? 0 : 63,
                transition: 'stroke-dashoffset 0.8s ease-out 0.3s',
              }}
            />
            <circle
              cx="48"
              cy="30"
              r="10"
              stroke={colors.primary}
              strokeWidth="1.5"
              fill="none"
              style={{
                strokeDasharray: 63,
                strokeDashoffset: isVisible ? 0 : 63,
                transition: 'stroke-dashoffset 0.8s ease-out 0.5s',
              }}
            />
            <circle
              cx="30"
              cy="48"
              r="10"
              stroke={colors.primary}
              strokeWidth="1.5"
              fill="none"
              style={{
                strokeDasharray: 63,
                strokeDashoffset: isVisible ? 0 : 63,
                transition: 'stroke-dashoffset 0.8s ease-out 0.7s',
              }}
            />
            <circle
              cx="12"
              cy="30"
              r="10"
              stroke={colors.primary}
              strokeWidth="1.5"
              fill="none"
              style={{
                strokeDasharray: 63,
                strokeDashoffset: isVisible ? 0 : 63,
                transition: 'stroke-dashoffset 0.8s ease-out 0.9s',
              }}
            />
          </svg>
          {/* Symbol */}
          <span
            className="font-heading text-2xl relative z-10"
            style={{
              color: colors.secondary,
              textShadow: `0 0 8px ${colors.glow}`,
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s ease-out 1.2s',
            }}
          >
            {symbol}
          </span>
        </div>

        <svg viewBox="0 0 200 30" className="flex-1 h-8" fill="none">
          <path
            d="M0 28 Q20 8 40 28 Q60 8 80 28 Q100 8 120 28 Q140 8 160 28 Q180 8 200 28"
            stroke={colors.tertiary}
            strokeWidth="1"
            fill="none"
            opacity="0.6"
            style={{
              strokeDasharray: 500,
              strokeDashoffset: isVisible ? 0 : 500,
              transition: 'stroke-dashoffset 1.5s ease-out',
            }}
          />
          <line
            x1="0"
            y1="28"
            x2="200"
            y2="28"
            stroke={colors.tertiary}
            strokeWidth="0.5"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Title */}
      <h2
        className="font-heading text-display text-parchment tracking-wider text-center"
        style={{
          textShadow: `0 2px 4px rgba(0,0,0,0.3), 0 0 40px ${colors.glow}`,
        }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="font-decorative text-lg italic text-center max-w-xl"
          style={{ color: colors.tertiary }}
        >
          {subtitle}
        </p>
      )}

      {/* Bottom flourish */}
      <svg viewBox="0 0 120 20" className="w-32 h-5" fill="none">
        <path
          d="M0 10 C20 10 20 2 40 2 C50 2 50 10 60 10 C70 10 70 2 80 2 C100 2 100 10 120 10"
          stroke={colors.tertiary}
          strokeWidth="1"
          fill="none"
          opacity="0.5"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: isVisible ? 0 : 200,
            transition: 'stroke-dashoffset 1s ease-out 0.5s',
          }}
        />
        <circle cx="60" cy="10" r="2" fill={colors.primary} opacity="0.7" />
      </svg>
    </div>
  );
}
