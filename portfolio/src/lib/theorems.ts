// ═══════════════════════════════════════════════════════════════════════════════
// THEOREM LIBRARY - Advanced Mathematical Theorems for Self-Writing Animations
// Curated for John Christopher's Portfolio - Deep Mathematical Beauty
// ═══════════════════════════════════════════════════════════════════════════════

import { TheoremPath } from '@/types';

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURED THEOREMS - John's Favorites
// These are the crown jewels - profound results that reveal deep mathematical truth
// ═══════════════════════════════════════════════════════════════════════════════

export const featuredTheorems: TheoremPath[] = [
  {
    id: 'galois',
    name: 'Fundamental Theorem of Galois Theory',
    latex: '\\text{Gal}(E/F) \\cong \\text{Aut}_F(E)',
    latexFull: `\\text{Let } E/F \\text{ be a finite Galois extension.}\\\\
\\text{Then there is a bijection:}\\\\
\\{\\text{intermediate fields } K : F \\subseteq K \\subseteq E\\}\\\\
\\updownarrow\\\\
\\{\\text{subgroups } H \\leq \\text{Gal}(E/F)\\}\\\\
\\text{given by } K \\mapsto \\text{Gal}(E/K)`,
    duration: 18,
    path: 'M10,50 Q30,20 50,50 T90,50',
    description: 'The profound connection between field extensions and group theory, solving the ancient problem of polynomial solvability.',
    field: 'Abstract Algebra',
    year: 1832,
    mathematician: 'Évariste Galois',
  },
  {
    id: 'brouwer',
    name: 'Brouwer Fixed Point Theorem',
    latex: 'f: D^n \\to D^n \\Rightarrow \\exists x : f(x) = x',
    latexFull: `\\text{Let } D^n = \\{x \\in \\mathbb{R}^n : \\|x\\| \\leq 1\\}\\\\
\\text{be the closed unit ball.}\\\\
\\text{If } f: D^n \\to D^n \\text{ is continuous,}\\\\
\\text{then } \\exists x \\in D^n : f(x) = x`,
    duration: 14,
    path: 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10',
    description: 'Every continuous function from a closed ball to itself has a fixed point. A cornerstone of topology with deep implications.',
    field: 'Algebraic Topology',
    year: 1911,
    mathematician: 'L.E.J. Brouwer',
  },
  {
    id: 'urysohn',
    name: "Urysohn's Lemma",
    latex: 'A, B \\text{ closed} \\Rightarrow \\exists f: X \\to [0,1]',
    latexFull: `\\text{Let } X \\text{ be a normal topological space,}\\\\
\\text{and let } A, B \\subseteq X \\text{ be disjoint closed sets.}\\\\
\\text{Then } \\exists f: X \\to [0,1] \\text{ continuous with}\\\\
f(A) = \\{0\\} \\text{ and } f(B) = \\{1\\}`,
    duration: 16,
    path: 'M10,80 C30,80 30,20 50,20 S70,80 90,80',
    description: 'A fundamental separation theorem in point-set topology, enabling the construction of continuous functions.',
    field: 'Topology',
    year: 1925,
    mathematician: 'Pavel Urysohn',
  },
  {
    id: 'prime-number',
    name: 'Prime Number Theorem',
    latex: '\\pi(x) \\sim \\frac{x}{\\ln x}',
    latexFull: `\\pi(x) := |\\{p \\leq x : p \\text{ prime}\\}|\\\\[1em]
\\lim_{x \\to \\infty} \\frac{\\pi(x)}{x / \\ln x} = 1\\\\[1em]
\\text{Equivalently: } \\pi(x) \\sim \\text{Li}(x) = \\int_2^x \\frac{dt}{\\ln t}`,
    duration: 15,
    path: 'M10,70 Q30,60 50,40 T90,10',
    description: 'The asymptotic distribution of prime numbers - one of the most celebrated results in analytic number theory.',
    field: 'Number Theory',
    year: 1896,
    mathematician: 'Hadamard & de la Vallée Poussin',
  },
  {
    id: 'gauss-bonnet',
    name: 'Gauss-Bonnet Theorem',
    latex: '\\int_M K\\, dA + \\int_{\\partial M} k_g\\, ds = 2\\pi\\chi(M)',
    latexFull: `\\text{For a compact 2D Riemannian manifold } M:\\\\[0.5em]
\\int_M K\\, dA + \\int_{\\partial M} k_g\\, ds = 2\\pi\\chi(M)\\\\[1em]
\\text{where } K = \\text{Gaussian curvature}\\\\
k_g = \\text{geodesic curvature}\\\\
\\chi(M) = \\text{Euler characteristic}`,
    duration: 20,
    path: 'M50,10 C20,30 20,70 50,90 C80,70 80,30 50,10',
    description: 'A bridge between local geometry and global topology - curvature determines topology.',
    field: 'Differential Geometry',
    year: 1848,
    mathematician: 'Gauss & Bonnet',
  },
  {
    id: 'godel-first',
    name: "Gödel's First Incompleteness Theorem",
    latex: '\\text{Con}(T) \\Rightarrow \\exists \\phi : T \\nvdash \\phi \\land T \\nvdash \\neg\\phi',
    latexFull: `\\text{If } T \\text{ is a consistent, recursively enumerable}\\\\
\\text{theory extending Peano arithmetic, then}\\\\
\\exists \\phi : T \\nvdash \\phi \\land T \\nvdash \\neg\\phi\\\\[1em]
\\text{There exists a true statement that}\\\\
\\text{cannot be proven within the system.}`,
    duration: 22,
    path: 'M10,50 L30,30 L50,50 L70,30 L90,50',
    description: 'Any sufficiently powerful consistent formal system contains true statements it cannot prove. Mathematics has inherent limits.',
    field: 'Mathematical Logic',
    year: 1931,
    mathematician: 'Kurt Gödel',
  },
  {
    id: 'godel-second',
    name: "Gödel's Second Incompleteness Theorem",
    latex: '\\text{Con}(T) \\Rightarrow T \\nvdash \\text{Con}(T)',
    latexFull: `\\text{If } T \\text{ is a consistent formal system}\\\\
\\text{capable of expressing basic arithmetic, then}\\\\
T \\nvdash \\text{Con}(T)\\\\[1em]
\\text{The system cannot prove its own consistency.}`,
    duration: 18,
    path: 'M10,50 Q50,10 90,50 Q50,90 10,50',
    description: 'No consistent system can prove its own consistency. The ultimate limit on mathematical self-knowledge.',
    field: 'Mathematical Logic',
    year: 1931,
    mathematician: 'Kurt Gödel',
  },
  {
    id: 'euler-lagrange',
    name: 'Euler-Lagrange Equation',
    latex: '\\frac{\\partial L}{\\partial q} - \\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}} = 0',
    latexFull: `\\text{For a functional } S[q] = \\int_{t_1}^{t_2} L(q, \\dot{q}, t)\\, dt\\\\[1em]
\\text{The stationary path satisfies:}\\\\[0.5em]
\\frac{\\partial L}{\\partial q} - \\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}} = 0\\\\[1em]
\\text{Nature optimizes the action integral.}`,
    duration: 16,
    path: 'M10,50 S30,10 50,50 S70,90 90,50',
    description: 'The principle of stationary action - the mathematical foundation of classical mechanics and field theory.',
    field: 'Calculus of Variations',
    year: 1755,
    mathematician: 'Euler & Lagrange',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// CLASSIC THEOREMS - Beautiful Foundational Results
// ═══════════════════════════════════════════════════════════════════════════════

export const classicTheorems: TheoremPath[] = [
  {
    id: 'euler',
    name: "Euler's Identity",
    latex: 'e^{i\\pi} + 1 = 0',
    latexFull: `e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\\\[1em]
\\text{At } \\theta = \\pi:\\\\
e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1\\\\[1em]
\\therefore e^{i\\pi} + 1 = 0`,
    duration: 8,
    path: 'M10,50 Q30,30 50,50 T90,50',
    description: 'The most beautiful equation in mathematics, connecting five fundamental constants.',
    field: 'Complex Analysis',
    year: 1748,
    mathematician: 'Leonhard Euler',
  },
  {
    id: 'pythagorean',
    name: 'Pythagorean Theorem',
    latex: 'a^2 + b^2 = c^2',
    latexFull: `\\text{In a right triangle with legs } a, b\\\\
\\text{and hypotenuse } c:\\\\[1em]
a^2 + b^2 = c^2`,
    duration: 6,
    path: 'M10,50 L50,50 L50,10',
    description: 'The foundation of geometry, known for over 2500 years.',
    field: 'Geometry',
    year: -500,
    mathematician: 'Pythagoras (attributed)',
  },
  {
    id: 'gaussian',
    name: 'Gaussian Integral',
    latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
    latexFull: `\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\\\[1em]
\\text{Proof uses polar coordinates:}\\\\
I^2 = \\int\\int e^{-(x^2+y^2)} dA = \\pi`,
    duration: 15,
    path: 'M10,80 Q50,10 90,80',
    description: 'A transcendental result connecting exponentials to π through an elegant geometric argument.',
    field: 'Analysis',
    year: 1809,
    mathematician: 'Carl Friedrich Gauss',
  },
  {
    id: 'cauchy',
    name: 'Cauchy Integral Formula',
    latex: 'f(a) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{z-a} dz',
    latexFull: `\\text{If } f \\text{ is holomorphic on } D\\\\
\\text{and } \\gamma \\text{ is a simple closed curve in } D,\\\\
\\text{then for any } a \\text{ inside } \\gamma:\\\\[1em]
f(a) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{z-a} dz`,
    duration: 18,
    path: 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10',
    description: 'The cornerstone of complex analysis - function values determined entirely by boundary behavior.',
    field: 'Complex Analysis',
    year: 1831,
    mathematician: 'Augustin-Louis Cauchy',
  },
  {
    id: 'fundamental-calculus',
    name: 'Fundamental Theorem of Calculus',
    latex: '\\frac{d}{dx} \\int_a^x f(t)\\,dt = f(x)',
    latexFull: `\\text{Part I: } \\frac{d}{dx} \\int_a^x f(t)\\,dt = f(x)\\\\[1em]
\\text{Part II: } \\int_a^b f(x)\\,dx = F(b) - F(a)\\\\
\\text{where } F'(x) = f(x)`,
    duration: 14,
    path: 'M10,50 S40,10 50,50 S60,90 90,50',
    description: 'The bridge between differential and integral calculus.',
    field: 'Calculus',
    year: 1668,
    mathematician: 'Newton & Leibniz',
  },
  {
    id: 'stokes',
    name: "Stokes' Theorem",
    latex: '\\int_M d\\omega = \\oint_{\\partial M} \\omega',
    latexFull: `\\text{For a smooth oriented manifold } M\\\\
\\text{with boundary } \\partial M:\\\\[1em]
\\int_M d\\omega = \\oint_{\\partial M} \\omega\\\\[1em]
\\text{Unifies Green, Gauss, and classical Stokes.}`,
    duration: 16,
    path: 'M10,50 C30,20 70,80 90,50',
    description: 'The generalization that unifies all integral theorems in differential geometry.',
    field: 'Differential Geometry',
    year: 1854,
    mathematician: 'George Stokes',
  },
  {
    id: 'noether',
    name: "Noether's Theorem",
    latex: '\\text{Symmetry} \\Leftrightarrow \\text{Conservation Law}',
    latexFull: `\\text{Every continuous symmetry of the}\\\\
\\text{action implies a conserved quantity:}\\\\[1em]
\\text{Time translation} \\Rightarrow \\text{Energy}\\\\
\\text{Space translation} \\Rightarrow \\text{Momentum}\\\\
\\text{Rotation} \\Rightarrow \\text{Angular momentum}`,
    duration: 14,
    path: 'M10,50 L50,10 L90,50 L50,90 Z',
    description: 'The profound connection between symmetry and conservation - the backbone of modern physics.',
    field: 'Mathematical Physics',
    year: 1918,
    mathematician: 'Emmy Noether',
  },
  {
    id: 'riemann-hypothesis',
    name: 'Riemann Hypothesis',
    latex: '\\zeta(s) = 0 \\Rightarrow \\Re(s) = \\frac{1}{2}',
    latexFull: `\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s} = \\prod_p \\frac{1}{1-p^{-s}}\\\\[1em]
\\text{Conjecture: All non-trivial zeros}\\\\
\\text{of } \\zeta(s) \\text{ lie on } \\Re(s) = \\frac{1}{2}`,
    duration: 20,
    path: 'M10,50 Q30,10 50,50 Q70,90 90,50',
    description: 'The most famous unsolved problem in mathematics - the key to prime distribution.',
    field: 'Number Theory',
    year: 1859,
    mathematician: 'Bernhard Riemann',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED THEOREM COLLECTION
// ═══════════════════════════════════════════════════════════════════════════════

export const theorems: TheoremPath[] = [...featuredTheorems, ...classicTheorems];

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const getRandomTheorem = (): TheoremPath => {
  return theorems[Math.floor(Math.random() * theorems.length)];
};

export const getRandomFeaturedTheorem = (): TheoremPath => {
  return featuredTheorems[Math.floor(Math.random() * featuredTheorems.length)];
};

export const getTheoremById = (id: string): TheoremPath | undefined => {
  return theorems.find((t) => t.id === id);
};

export const getTheoremsByField = (field: string): TheoremPath[] => {
  return theorems.filter((t) => t.field === field);
};

// ═══════════════════════════════════════════════════════════════════════════════
// EASTER EGG MATHEMATICAL CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

export const mathConstants = {
  phi: { symbol: 'φ', name: 'Golden Ratio', value: '(1+√5)/2', decimal: 1.618033988749895 },
  pi: { symbol: 'π', name: 'Pi', value: 'π', decimal: 3.141592653589793 },
  e: { symbol: 'e', name: "Euler's Number", value: 'e', decimal: 2.718281828459045 },
  gamma: { symbol: 'γ', name: 'Euler-Mascheroni', value: '0.5772...', decimal: 0.5772156649015329 },
  infinity: { symbol: '∞', name: 'Infinity', value: '∞', decimal: Infinity },
  integral: { symbol: '∫', name: 'Integral', value: '∫', decimal: NaN },
  partial: { symbol: '∂', name: 'Partial', value: '∂', decimal: NaN },
  nabla: { symbol: '∇', name: 'Nabla/Del', value: '∇', decimal: NaN },
  aleph: { symbol: 'ℵ₀', name: 'Aleph-null', value: '|ℕ|', decimal: Infinity },
};

// ═══════════════════════════════════════════════════════════════════════════════
// HIDDEN SYMBOLS FOR GOTHIC TRACERY
// Mathematical symbols hidden in architectural elements
// ═══════════════════════════════════════════════════════════════════════════════

export const tracerySymbols = [
  { location: 'trefoil-corners', symbol: 'π', meaning: 'The circle constant - perfection in geometry' },
  { location: 'quatrefoil-center', symbol: 'φ', meaning: 'The golden ratio - divine proportion' },
  { location: 'tracery-intersection', symbol: '∞', meaning: 'Infinity - the boundless' },
  { location: 'rose-window-center', symbol: 'e^{iπ}+1=0', meaning: "Euler's identity - mathematical beauty" },
  { location: 'arch-apex', symbol: '∫', meaning: 'Integration - the sum of infinitesimals' },
  { location: 'cusp-points', symbol: '∂', meaning: 'Partial derivative - change in one direction' },
  { location: 'lancet-peak', symbol: '∇', meaning: 'Gradient - steepest ascent' },
  { location: 'gothic-pillar', symbol: 'ℵ₀', meaning: 'First infinite cardinal - countable infinity' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// THEOREM CATEGORIES FOR FILTERING
// ═══════════════════════════════════════════════════════════════════════════════

export const theoremFields = [
  'Abstract Algebra',
  'Algebraic Topology',
  'Analysis',
  'Calculus',
  'Calculus of Variations',
  'Complex Analysis',
  'Differential Geometry',
  'Geometry',
  'Mathematical Logic',
  'Mathematical Physics',
  'Number Theory',
  'Topology',
] as const;

export type TheoremField = (typeof theoremFields)[number];
