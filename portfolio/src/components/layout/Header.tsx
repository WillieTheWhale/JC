'use client';

import Link from 'next/link';
import { Quatrefoil } from '@/components/gothic';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-offwhite/80 backdrop-blur-md border-b border-sage-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <Quatrefoil size={40} color="#5A6B5A" hiddenSymbol="∞" />
          <div>
            <h1 className="font-heading text-xl font-semibold text-sage-700 group-hover:text-sage-600 transition-colors">
              John Christopher
            </h1>
            <p className="text-xs text-sage-500 font-decorative italic">
              Mathematics
            </p>
          </div>
        </Link>

        {/* Decorative element */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sage-400 font-decorative italic text-sm">
            e<sup>iπ</sup> + 1 = 0
          </span>
        </div>
      </div>
    </header>
  );
}
