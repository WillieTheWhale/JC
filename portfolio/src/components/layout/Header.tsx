'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled
          ? 'bg-walnut-deep/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Name */}
          <Link href="/" className="group flex items-center gap-4">
            {/* Decorative quatrefoil */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 40 40"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Quatrefoil shape */}
                <circle
                  cx="20"
                  cy="10"
                  r="8"
                  className="stroke-gold fill-none transition-colors duration-300 group-hover:stroke-gold-leaf"
                  strokeWidth="1"
                />
                <circle
                  cx="30"
                  cy="20"
                  r="8"
                  className="stroke-gold fill-none transition-colors duration-300 group-hover:stroke-gold-leaf"
                  strokeWidth="1"
                />
                <circle
                  cx="20"
                  cy="30"
                  r="8"
                  className="stroke-gold fill-none transition-colors duration-300 group-hover:stroke-gold-leaf"
                  strokeWidth="1"
                />
                <circle
                  cx="10"
                  cy="20"
                  r="8"
                  className="stroke-gold fill-none transition-colors duration-300 group-hover:stroke-gold-leaf"
                  strokeWidth="1"
                />
                {/* Center symbol - hidden, reveals on hover */}
                <text
                  x="20"
                  y="24"
                  textAnchor="middle"
                  className="fill-gold text-sm font-heading opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ fontSize: '14px' }}
                >
                  phi
                </text>
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-heading text-xl text-parchment tracking-wide transition-colors duration-300 group-hover:text-gold-leaf">
                John Christopher
              </span>
              <span className="text-xs text-brass tracking-widest uppercase font-body">
                Mathematics
              </span>
            </div>
          </Link>

          {/* Navigation links - desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: '#about', label: 'About' },
              { href: '#research', label: 'Research' },
              { href: '#projects', label: 'Projects' },
              { href: '#writings', label: 'Writings' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-heading text-parchment-aged hover:text-gold transition-colors duration-300 py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Decorative equation - desktop only */}
          <div className="hidden md:flex lg:hidden xl:flex items-center">
            <span className="font-decorative text-brass-tarnished text-sm italic opacity-70">
              e<sup className="text-xs">i</sup> + 1 = 0
            </span>
          </div>
        </div>
      </div>

      {/* Bottom border with gradient */}
      <div
        className={`h-px w-full transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--color-brass-tarnished) 20%, var(--color-gold) 50%, var(--color-brass-tarnished) 80%, transparent 100%)',
        }}
      />
    </header>
  );
}
