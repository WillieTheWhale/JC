'use client';

import { ReactNode } from 'react';
import { Quatrefoil } from '@/components/gothic';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'paper' | 'blackboard';
  withCorners?: boolean;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  withCorners = false,
  hoverable = true,
}: CardProps) {
  const variants = {
    default: 'bg-white border border-sage-200',
    paper: 'paper-aged',
    blackboard: 'chalkboard',
  };

  return (
    <div
      className={`
        relative rounded-lg overflow-hidden
        ${variants[variant]}
        ${hoverable ? 'card-elevate' : ''}
        ${className}
      `}
    >
      {/* Gothic corner ornaments */}
      {withCorners && (
        <>
          <div className="absolute top-2 left-2 opacity-50">
            <Quatrefoil size={24} color={variant === 'blackboard' ? '#F5F5F0' : '#5A6B5A'} />
          </div>
          <div className="absolute top-2 right-2 opacity-50 rotate-90">
            <Quatrefoil size={24} color={variant === 'blackboard' ? '#F5F5F0' : '#5A6B5A'} />
          </div>
          <div className="absolute bottom-2 left-2 opacity-50 -rotate-90">
            <Quatrefoil size={24} color={variant === 'blackboard' ? '#F5F5F0' : '#5A6B5A'} />
          </div>
          <div className="absolute bottom-2 right-2 opacity-50 rotate-180">
            <Quatrefoil size={24} color={variant === 'blackboard' ? '#F5F5F0' : '#5A6B5A'} />
          </div>
        </>
      )}
      {children}
    </div>
  );
}
