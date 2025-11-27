'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  sublabel: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'MAIN HALL', sublabel: 'Return to entrance', href: '#hero' },
  { id: 'about', label: 'ABOUT', sublabel: 'The mathematician', href: '#about' },
  { id: 'research', label: 'RESEARCH', sublabel: 'Academic pursuits', href: '#research' },
  { id: 'projects', label: 'PROJECTS', sublabel: 'Mathematical works', href: '#projects' },
  { id: 'writings', label: 'WRITINGS', sublabel: 'Favourite problems', href: '#writings' },
  { id: 'chalkboard', label: 'CHALKBOARD', sublabel: 'Interactive studio', href: '#chalkboard' },
];

export default function CardCatalogNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Smooth scroll to section
  const scrollToSection = useCallback((href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-elevated"
        style={{
          background: 'linear-gradient(145deg, #5C4033 0%, #3D2B1F 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="text-parchment" size={24} />
        ) : (
          <Menu className="text-parchment" size={24} />
        )}
      </button>

      {/* Desktop Drawer Pull - Fixed to left edge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden lg:flex fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-weighted ${
          isOpen ? 'left-[320px]' : 'left-0'
        }`}
        style={{
          width: '48px',
          height: '140px',
        }}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        {/* Oak drawer edge */}
        <div
          className="w-full h-full rounded-r-lg flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:brightness-110"
          style={{
            background: `
              linear-gradient(90deg,
                #4A3728 0%,
                #5C4033 20%,
                #6B4C3A 50%,
                #5C4033 80%,
                #4A3728 100%
              )
            `,
            boxShadow: '4px 0 20px rgba(0,0,0,0.4), inset -2px 0 4px rgba(0,0,0,0.2)',
          }}
        >
          {/* Brass pull handle */}
          <div
            className="w-3 h-16 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #A08565 0%, #8B7355 30%, #6B5344 70%, #8B7355 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.3)',
            }}
          />
          <span
            className="text-parchment/60 text-[10px] tracking-widest uppercase"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {isOpen ? 'CLOSE' : 'CATALOG'}
          </span>
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(13, 9, 6, 0.7) 0%, rgba(13, 9, 6, 0.9) 100%)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Card Catalog Drawer */}
      <nav
        className={`fixed z-40 transition-transform duration-500 ease-weighted ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } top-0 left-0 h-full w-[320px]`}
        aria-label="Main navigation"
      >
        {/* Drawer body - Oak wood with grain */}
        <div
          className="h-full overflow-hidden"
          style={{
            background: `
              linear-gradient(180deg,
                #5C4033 0%,
                #4A3728 20%,
                #5C4033 40%,
                #4A3728 60%,
                #5C4033 80%,
                #4A3728 100%
              )
            `,
            boxShadow: '4px 0 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Wood grain texture overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 2px,
                  rgba(0,0,0,0.03) 2px,
                  rgba(0,0,0,0.03) 4px
                ),
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  rgba(255,255,255,0.02) 1px,
                  transparent 2px,
                  transparent 30px
                )
              `,
            }}
          />

          {/* Header with brass label holder */}
          <div className="relative px-6 py-8 border-b border-black/20">
            {/* Brass frame */}
            <div className="relative mx-auto w-fit">
              <div
                className="absolute -inset-3 rounded"
                style={{
                  background: 'linear-gradient(180deg, #A08565 0%, #8B7355 50%, #6B5344 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.3)',
                }}
              />
              <div
                className="relative px-6 py-2"
                style={{
                  background: 'linear-gradient(180deg, #F5EFE0 0%, #E8DCC4 100%)',
                }}
              >
                <span
                  className="text-walnut-deep text-xs tracking-[0.3em] uppercase"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  Card Catalog
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="p-6 space-y-4 overflow-y-auto h-[calc(100vh-120px)]">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className="w-full text-left group"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <div
                    className={`relative transition-all duration-300 ${
                      isActive
                        ? 'translate-x-3 scale-[1.02]'
                        : 'hover:translate-y-[-2px] hover:translate-x-1'
                    }`}
                  >
                    {/* Card paper */}
                    <div
                      className="relative p-4 rounded-sm overflow-hidden"
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, #FFFEF7 0%, #F5EFE0 100%)'
                          : 'linear-gradient(135deg, #F5EFE0 0%, #E8DCC4 100%)',
                        boxShadow: isActive
                          ? '0 8px 20px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)'
                          : '0 2px 8px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.1)',
                        transform: `rotate(${(index % 2 === 0 ? 0.3 : -0.3)}deg)`,
                      }}
                    >
                      {/* Paper texture */}
                      <div
                        className="absolute inset-0 opacity-50 pointer-events-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.05'/%3E%3C/svg%3E")`,
                        }}
                      />

                      {/* Brass card holder at top */}
                      <div
                        className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-3 rounded-b"
                        style={{
                          background: 'linear-gradient(180deg, #8B7355 0%, #6B5344 100%)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      />

                      {/* Card content */}
                      <div className="pt-3 relative z-10">
                        <h3
                          className={`text-sm tracking-[0.2em] ${
                            isActive ? 'text-walnut-deep' : 'text-walnut/80'
                          }`}
                          style={{ fontFamily: 'Courier New, monospace' }}
                        >
                          {item.label}
                        </h3>
                        <p className="text-xs text-sepia/60 mt-1 font-decorative italic">
                          {item.sublabel}
                        </p>
                      </div>

                      {/* Active indicator - gold dot */}
                      {isActive && (
                        <div
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #D4AF37 0%, #C9A227 100%)',
                            boxShadow: '0 0 8px rgba(201, 162, 39, 0.5)',
                          }}
                        />
                      )}
                    </div>

                    {/* Card shadow layer */}
                    <div
                      className="absolute inset-0 -z-10 rounded-sm"
                      style={{
                        background: 'rgba(0,0,0,0.2)',
                        transform: 'translate(3px, 3px)',
                        filter: 'blur(2px)',
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Decorative bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{
              background: 'linear-gradient(0deg, rgba(45, 24, 16, 0.8) 0%, transparent 100%)',
            }}
          />
        </div>
      </nav>

      {/* Mobile Bottom Sheet */}
      <nav
        className={`fixed z-40 lg:hidden transition-transform duration-500 ease-weighted ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } bottom-0 left-0 right-0 rounded-t-3xl overflow-hidden`}
        style={{
          maxHeight: '75vh',
          background: 'linear-gradient(180deg, #5C4033 0%, #4A3728 100%)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
        }}
        aria-label="Main navigation"
      >
        {/* Drag handle */}
        <div className="flex justify-center py-4">
          <div
            className="w-12 h-1 rounded-full"
            style={{ background: 'rgba(232, 220, 196, 0.3)' }}
          />
        </div>

        {/* Navigation Cards */}
        <div className="px-6 pb-24 space-y-3 overflow-y-auto max-h-[60vh]">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.replace('#', '');

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className="w-full text-left"
              >
                <div
                  className={`p-4 rounded transition-all duration-300 ${
                    isActive ? 'scale-[1.02]' : ''
                  }`}
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #FFFEF7 0%, #F5EFE0 100%)'
                      : 'linear-gradient(135deg, #F5EFE0 0%, #E8DCC4 100%)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    transform: `rotate(${(index % 2 === 0 ? 0.2 : -0.2)}deg)`,
                  }}
                >
                  <h3
                    className={`text-sm tracking-[0.15em] ${
                      isActive ? 'text-walnut-deep' : 'text-walnut/80'
                    }`}
                    style={{ fontFamily: 'Courier New, monospace' }}
                  >
                    {item.label}
                  </h3>
                  <p className="text-xs text-sepia/60 mt-0.5 font-decorative italic">
                    {item.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
