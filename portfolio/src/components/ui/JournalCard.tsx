'use client';

import { useState, useRef, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// JOURNAL CARD - Vintage Academic Card Component
// Styled like pages from an old mathematical journal or index card
// Features aged paper texture, hand-drawn borders, and typewriter fonts
// ═══════════════════════════════════════════════════════════════════════════════

interface JournalCardProps {
  children: React.ReactNode;
  variant?: 'paper' | 'index' | 'manuscript';
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export default function JournalCard({
  children,
  variant = 'paper',
  className = '',
  hoverEffect = true,
  onClick,
}: JournalCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const variantStyles = {
    paper: {
      background: `
        linear-gradient(135deg,
          rgba(232, 220, 196, 0.95) 0%,
          rgba(220, 205, 180, 0.95) 50%,
          rgba(212, 196, 168, 0.95) 100%
        )
      `,
      border: '1px solid rgba(139, 115, 85, 0.3)',
      shadow: `
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 8px 24px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.4)
      `,
      shadowHover: `
        0 4px 8px rgba(0, 0, 0, 0.15),
        0 16px 40px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.5)
      `,
    },
    index: {
      background: `
        linear-gradient(180deg,
          rgba(245, 241, 230, 0.98) 0%,
          rgba(232, 226, 212, 0.98) 100%
        )
      `,
      border: '1px solid rgba(139, 115, 85, 0.2)',
      shadow: `
        0 1px 2px rgba(0, 0, 0, 0.08),
        0 4px 12px rgba(0, 0, 0, 0.1),
        inset 0 -20px 40px rgba(0, 0, 0, 0.02)
      `,
      shadowHover: `
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 8px 24px rgba(0, 0, 0, 0.15),
        inset 0 -20px 40px rgba(0, 0, 0, 0.02)
      `,
    },
    manuscript: {
      background: `
        linear-gradient(145deg,
          rgba(248, 244, 235, 0.95) 0%,
          rgba(240, 232, 218, 0.95) 100%
        )
      `,
      border: '2px solid rgba(139, 115, 85, 0.25)',
      shadow: `
        0 3px 6px rgba(0, 0, 0, 0.1),
        0 10px 30px rgba(0, 0, 0, 0.12),
        inset 0 0 60px rgba(139, 115, 85, 0.05)
      `,
      shadowHover: `
        0 6px 12px rgba(0, 0, 0, 0.15),
        0 20px 50px rgba(0, 0, 0, 0.18),
        inset 0 0 60px rgba(139, 115, 85, 0.08)
      `,
    },
  }[variant];

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-sm cursor-pointer
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${className}
      `}
      style={{
        background: variantStyles.background,
        border: variantStyles.border,
        boxShadow: isHovered && hoverEffect ? variantStyles.shadowHover : variantStyles.shadow,
        transform: isHovered && hoverEffect ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3CfeColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.85 0 0 0 0 0.75 0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Aged edge effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, rgba(139, 115, 85, 0.08) 0%, transparent 3%),
            linear-gradient(-90deg, rgba(139, 115, 85, 0.08) 0%, transparent 3%),
            linear-gradient(180deg, rgba(139, 115, 85, 0.05) 0%, transparent 2%),
            linear-gradient(0deg, rgba(139, 115, 85, 0.1) 0%, transparent 5%)
          `,
        }}
      />

      {/* Corner fold effect for paper variant */}
      {variant === 'paper' && (
        <div
          className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg,
                transparent 50%,
                rgba(139, 115, 85, 0.15) 50%
              )
            `,
          }}
        />
      )}

      {/* Index card lines for index variant */}
      {variant === 'index' && (
        <div
          className="absolute inset-x-0 top-6 bottom-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 23px,
                rgba(139, 115, 85, 0.1) 24px
              )
            `,
            backgroundPosition: '0 0',
          }}
        />
      )}

      {/* Red margin line for index variant */}
      {variant === 'index' && (
        <div
          className="absolute left-6 top-0 bottom-0 w-px pointer-events-none"
          style={{ background: 'rgba(180, 80, 80, 0.25)' }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
