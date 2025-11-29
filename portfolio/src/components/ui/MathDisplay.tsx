'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathDisplayProps {
  latex: string;
  display?: boolean;
  className?: string;
}

export default function MathDisplay({
  latex,
  display = false,
  className = '',
}: MathDisplayProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode: display,
          throwOnError: false,
          trust: true,
        });
      } catch (error) {
        console.error('KaTeX error:', error);
        if (containerRef.current) {
          containerRef.current.textContent = latex;
        }
      }
    }
  }, [latex, display]);

  return (
    <span
      ref={containerRef}
      className={`${display ? 'block text-center my-4' : 'inline'} ${className}`}
      aria-label={`Mathematical formula: ${latex}`}
    />
  );
}
