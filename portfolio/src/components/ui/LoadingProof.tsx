'use client';

import { useEffect, useState } from 'react';
import { getRandomTheorem } from '@/lib/theorems';
import { RoseWindow } from '@/components/gothic';

interface LoadingProofProps {
  className?: string;
}

export default function LoadingProof({ className = '' }: LoadingProofProps) {
  const [theorem, setTheorem] = useState(getRandomTheorem());

  useEffect(() => {
    setTheorem(getRandomTheorem());
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center gap-6 p-8 ${className}`}>
      {/* Spinning rose window */}
      <RoseWindow size={80} spinning={true} spinDuration={4} color="#5A6B5A" />

      {/* Writing animation */}
      <div className="chalkboard rounded-lg p-6 min-w-[300px]">
        <div className="chalk-text text-center">
          <p className="text-xs mb-2 opacity-70 font-decorative italic">
            {theorem.name}
          </p>
          <p className="text-xl font-heading tracking-wider loading-equation">
            {theorem.latex.replace(/\\/g, '')}
          </p>
        </div>
      </div>

      {/* Loading text */}
      <p className="text-sage-500 text-sm animate-pulse-soft">
        Loading...
      </p>

      <style jsx>{`
        .loading-equation {
          background: linear-gradient(90deg, #F5F5F0 25%, transparent 50%, #F5F5F0 75%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
