// ═══════════════════════════════════════════════════════════════════════════
// THEOREM LIBRARY - Famous Mathematical Equations for Loading Animations
// ═══════════════════════════════════════════════════════════════════════════

import { TheoremPath } from '@/types';

export const theorems: TheoremPath[] = [
  {
    id: 'euler',
    name: "Euler's Identity",
    latex: 'e^{i\\pi} + 1 = 0',
    duration: 8,
    path: 'M10,50 Q30,30 50,50 T90,50',
    description: 'The most beautiful equation in mathematics',
  },
  {
    id: 'pythagorean',
    name: 'Pythagorean Theorem',
    latex: 'a^2 + b^2 = c^2',
    duration: 6,
    path: 'M10,50 L50,50 L50,10',
    description: 'Foundation of geometry',
  },
  {
    id: 'quadratic',
    name: 'Quadratic Formula',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    duration: 12,
    path: 'M10,50 C30,10 70,90 90,50',
    description: 'Solving second-degree polynomials',
  },
  {
    id: 'gaussian',
    name: 'Gaussian Integral',
    latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
    duration: 15,
    path: 'M10,80 Q50,10 90,80',
    description: 'The Gaussian integral',
  },
  {
    id: 'cauchy',
    name: 'Cauchy Integral Formula',
    latex: 'f(a) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{z-a} dz',
    duration: 18,
    path: 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10',
    description: 'Complex analysis cornerstone',
  },
  {
    id: 'fundamental',
    name: 'Fundamental Theorem of Calculus',
    latex: '\\frac{d}{dx} \\int_a^x f(t)\\,dt = f(x)',
    duration: 14,
    path: 'M10,50 S40,10 50,50 S60,90 90,50',
    description: 'Connecting derivatives and integrals',
  },
];

export const getRandomTheorem = (): TheoremPath => {
  return theorems[Math.floor(Math.random() * theorems.length)];
};

export const getTheoremById = (id: string): TheoremPath | undefined => {
  return theorems.find((t) => t.id === id);
};

// Easter egg mathematical constants
export const mathConstants = {
  phi: { symbol: 'φ', value: '(1+√5)/2', decimal: 1.618033988749895 },
  pi: { symbol: 'π', value: 'π', decimal: 3.141592653589793 },
  e: { symbol: 'e', value: 'e', decimal: 2.718281828459045 },
  infinity: { symbol: '∞', value: '∞', decimal: Infinity },
  integral: { symbol: '∫', value: '∫', decimal: NaN },
  partial: { symbol: '∂', value: '∂', decimal: NaN },
};

// Hidden symbols for Gothic tracery
export const tracerySymbols = [
  { location: 'trefoil-corners', symbol: 'π' },
  { location: 'quatrefoil-center', symbol: 'φ' },
  { location: 'tracery-intersection', symbol: '∞' },
  { location: 'rose-window-center', symbol: 'e^{iπ}+1=0' },
  { location: 'arch-apex', symbol: '∫' },
  { location: 'cusp-points', symbol: '∂' },
];
