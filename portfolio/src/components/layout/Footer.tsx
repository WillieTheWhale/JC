'use client';

import { TraceryDivider, Trefoil } from '@/components/gothic';
import { Github, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-sage-800 text-chalk pt-12 pb-8">
      {/* Gothic silhouette at top */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          viewBox="0 0 1200 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          {/* Flying buttress silhouettes */}
          <path
            d="M0 60 L0 40 Q100 20 200 40 L200 60 M200 60 L200 30 Q250 10 300 30 L300 60 M300 60 L300 35 Q400 5 500 35 L500 60 M500 60 L500 25 Q550 0 600 25 L600 60 M600 60 L600 25 Q650 0 700 25 L700 60 M700 60 L700 35 Q800 5 900 35 L900 60 M900 60 L900 30 Q950 10 1000 30 L1000 60 M1000 60 L1000 40 Q1100 20 1200 40 L1200 60"
            fill="var(--color-off-white)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Decorative divider */}
        <div className="flex justify-center mb-8">
          <TraceryDivider variant="ornate" width={300} color="#7A8B7A" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-heading text-xl mb-4 flex items-center gap-2">
              <Trefoil size={24} color="#C4A35A" hiddenSymbol="π" />
              About
            </h3>
            <p className="text-sage-300 text-sm leading-relaxed">
              A mathematics student passionate about algebraic topology,
              category theory, and the beauty of abstract structures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['CV', 'Projects', 'Research', 'Blog'].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-sage-300 hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="mailto:john@example.com"
                className="p-2 rounded-full bg-sage-700 hover:bg-sage-600 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com/johnchristopher"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-sage-700 hover:bg-sage-600 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/johnchristopher"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-sage-700 hover:bg-sage-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-sage-700 pt-6 text-center">
          <p className="text-sage-400 text-sm">
            © {currentYear} John Christopher. Built with mathematical precision.
          </p>
          <p className="text-sage-500 text-xs mt-2 font-decorative italic">
            &ldquo;Mathematics is the music of reason.&rdquo; — James Joseph Sylvester
          </p>
        </div>
      </div>
    </footer>
  );
}
