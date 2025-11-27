// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS FOR JOHN CHRISTOPHER PORTFOLIO
// ═══════════════════════════════════════════════════════════════════════════

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  icon?: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'research' | 'teaching' | 'software' | 'other';
  date: string;
  collaborators?: string[];
  technologies?: string[];
  links?: {
    github?: string;
    paper?: string;
    demo?: string;
    arxiv?: string;
  };
  image?: string;
  featured?: boolean;
}

// Research Paper Types
export interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  category: string;
  links?: {
    pdf?: string;
    arxiv?: string;
    doi?: string;
  };
  bibtex?: string;
}

// Blog Post Types
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  topic: string;
  heroEquation: string;
  background: 'blackboard' | 'cream' | 'graph' | 'parchment';
  excerpt: string;
  readingTime: number;
  tags: string[];
  content: string;
}

// CV Section Types
export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
  honors?: string[];
}

export interface Experience {
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights?: string[];
}

export interface Award {
  title: string;
  organization: string;
  date: string;
  description?: string;
}

// Animation Types
export interface ChalkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

export interface TheoremPath {
  id: string;
  name: string;
  latex: string;
  latexFull?: string;
  duration: number;
  path: string;
  description?: string;
  field?: string;
  year?: number;
  mathematician?: string;
}

// Gothic SVG Component Props
export interface LancetArchProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  animate?: boolean;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}

export interface TrefoilProps {
  size?: number;
  color?: string;
  filled?: boolean;
  animate?: boolean;
  hiddenSymbol?: string;
  className?: string;
}

export interface QuatrefoilProps {
  size?: number;
  color?: string;
  filled?: boolean;
  rounded?: boolean;
  hiddenSymbol?: string;
  className?: string;
}

export interface TraceryDividerProps {
  variant?: 'simple' | 'ornate' | 'geometric' | 'mathematical' | 'flowing' | 'cathedral';
  width?: number | string;
  color?: string;
  animate?: boolean;
  className?: string;
  glowColor?: string;
  breathe?: boolean;
}

export interface RoseWindowProps {
  size?: number;
  petals?: number;
  color?: string;
  spinning?: boolean;
  spinDuration?: number;
  className?: string;
}

// Chalkboard Types
export interface ChalkBrushConfig {
  color: string;
  size: number;
  opacity: number;
}

export interface DrawingTool {
  type: 'chalk' | 'eraser';
  color: string;
  size: number;
}

// Contact/Social Types
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
