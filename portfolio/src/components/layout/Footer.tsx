'use client';

import { Github, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-walnut-deep overflow-hidden">
      {/* Gothic architectural silhouette at top */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          viewBox="0 0 1200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Flying buttress and spire silhouettes */}
          <path
            d="M0 80 L0 50 Q50 30 100 50 L100 80
               M100 80 L100 40 Q150 15 200 40 L200 80
               M200 80 L200 35 Q250 5 300 35 L300 80
               M300 80 L300 25 Q350 0 400 25 L400 80
               M400 80 L400 20 Q450 0 500 20 L500 80
               M500 80 L500 15 Q550 0 600 15 L600 80
               M600 80 L600 15 Q650 0 700 15 L700 80
               M700 80 L700 20 Q750 0 800 20 L800 80
               M800 80 L800 25 Q850 0 900 25 L900 80
               M900 80 L900 35 Q950 5 1000 35 L1000 80
               M1000 80 L1000 40 Q1050 15 1100 40 L1100 80
               M1100 80 L1100 50 Q1150 30 1200 50 L1200 80"
            fill="#2D1810"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Decorative divider with quatrefoil */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div
              className="flex-1 h-px max-w-[200px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--color-brass-tarnished) 100%)',
              }}
            />
            <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
              <circle cx="20" cy="10" r="7" stroke="#8B7355" strokeWidth="1" />
              <circle cx="30" cy="20" r="7" stroke="#8B7355" strokeWidth="1" />
              <circle cx="20" cy="30" r="7" stroke="#8B7355" strokeWidth="1" />
              <circle cx="10" cy="20" r="7" stroke="#8B7355" strokeWidth="1" />
            </svg>
            <div
              className="flex-1 h-px max-w-[200px]"
              style={{
                background: 'linear-gradient(90deg, var(--color-brass-tarnished) 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Quote */}
          <blockquote className="text-center mb-12">
            <p className="font-decorative text-xl italic text-parchment-aged/80 mb-3">
              &ldquo;Mathematics is the music of reason.&rdquo;
            </p>
            <cite className="text-brass text-sm not-italic">
              &mdash; James Joseph Sylvester
            </cite>
          </blockquote>

          {/* Social links */}
          <div className="flex justify-center gap-6 mb-12">
            {[
              { href: 'mailto:john@example.com', icon: Mail, label: 'Email' },
              { href: 'https://github.com/johnchristopher', icon: Github, label: 'GitHub' },
              { href: 'https://twitter.com/johnchristopher', icon: Twitter, label: 'Twitter' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group p-3 rounded-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, rgba(92, 64, 51, 0.5) 0%, rgba(74, 55, 40, 0.5) 100%)',
                }}
                aria-label={social.label}
              >
                <social.icon
                  size={20}
                  className="text-brass transition-colors duration-300 group-hover:text-gold"
                />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-brass-tarnished text-sm">
              {currentYear} John Christopher
            </p>
            <p className="text-brass-tarnished/50 text-xs mt-2">
              Built with mathematical precision
            </p>
          </div>
        </div>
      </div>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(13, 9, 6, 0.5) 0%, transparent 100%)',
        }}
      />
    </footer>
  );
}
