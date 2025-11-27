'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/data';
import { Menu, X } from 'lucide-react';

export default function CardCatalogNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button - Styled as drawer pull */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-50 transition-all duration-300 ${
          isMobile
            ? 'bottom-4 right-4 p-3 rounded-lg bg-sage-700 text-chalk shadow-elevated'
            : 'top-1/2 -translate-y-1/2 left-0 w-[60px] h-[120px] bg-gradient-to-r from-amber-900 to-amber-800 rounded-r-lg shadow-drawer flex items-center justify-center'
        }`}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        {isMobile ? (
          isOpen ? <X size={24} /> : <Menu size={24} />
        ) : (
          <div className="flex flex-col items-center gap-2">
            {/* Brass handle */}
            <div className="w-4 h-16 rounded-full bg-gradient-to-b from-brass-light via-brass to-brass-dark shadow-inner" />
            <span className="text-[8px] text-cream/70 uppercase tracking-wider rotate-90 origin-center whitespace-nowrap">
              {isOpen ? 'Close' : 'Menu'}
            </span>
          </div>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Card Catalog Drawer */}
      <nav
        className={`fixed z-40 transition-transform duration-500 ease-spring ${
          isMobile
            ? `bottom-0 left-0 right-0 transform ${
                isOpen ? 'translate-y-0' : 'translate-y-full'
              }`
            : `top-0 left-0 h-full w-[320px] transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              }`
        }`}
        aria-label="Main navigation"
      >
        {/* Drawer body - Oak wood texture */}
        <div
          className={`h-full bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 shadow-drawer overflow-hidden ${
            isMobile ? 'rounded-t-2xl max-h-[70vh]' : ''
          }`}
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,0,0,0.1) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.1) 100%),
              url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23854d0e' fill-opacity='0.1'/%3E%3Cpath d='M0 50h100' stroke='%23000' stroke-opacity='0.05'/%3E%3C/svg%3E")
            `,
          }}
        >
          {/* Header with brass label holder */}
          <div className={`p-6 border-b border-amber-950/30 ${isMobile ? 'pt-4 pb-3' : ''}`}>
            <div className="relative mx-auto w-fit">
              {/* Brass frame */}
              <div className="absolute -inset-2 bg-gradient-to-b from-brass-light via-brass to-brass-dark rounded opacity-80" />
              <div className="relative bg-cream px-4 py-1">
                <span className="font-mono text-xs text-charcoal tracking-widest uppercase">
                  Card Catalog
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className={`p-4 space-y-3 overflow-y-auto ${isMobile ? 'max-h-[calc(70vh-80px)]' : 'h-[calc(100vh-100px)]'}`}>
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`block group animate-stagger`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`relative transition-all duration-300 ${
                      isActive
                        ? 'transform translate-x-2 translate-z-10'
                        : 'hover:translate-y-[-2px] hover:shadow-card'
                    }`}
                  >
                    {/* Card paper effect */}
                    <div
                      className={`relative p-4 rounded-sm ${
                        isActive ? 'bg-cream shadow-card-hover' : 'bg-cream/90 hover:bg-cream'
                      }`}
                      style={{
                        transform: `rotate(${(Math.random() - 0.5) * 0.5}deg)`,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
                        backgroundBlendMode: 'overlay',
                      }}
                    >
                      {/* Brass card holder at top */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-3 rounded-b-sm bg-gradient-to-b from-brass-light to-brass shadow-sm" />

                      {/* Card content */}
                      <div className="pt-2">
                        <h3
                          className={`font-mono text-sm tracking-wider ${
                            isActive ? 'text-sage-700' : 'text-charcoal/80'
                          }`}
                          style={{
                            fontFamily: 'Courier New, monospace',
                          }}
                        >
                          {item.label}
                        </h3>
                        <p className="text-xs text-charcoal/50 mt-1 italic font-decorative">
                          {item.sublabel}
                        </p>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold" />
                      )}
                    </div>

                    {/* Card shadow/depth effect */}
                    <div className="absolute inset-0 bg-amber-950/20 rounded-sm -z-10 translate-y-1 translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer with decorative element */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-950 to-transparent pointer-events-none" />
        </div>
      </nav>
    </>
  );
}
