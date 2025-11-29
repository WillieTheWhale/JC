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

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED BLACKBOARD HERO - Proof Writing System Types
// ═══════════════════════════════════════════════════════════════════════════════

// Render mode based on device capabilities
export type RenderMode = 'full' | 'standard' | 'minimal' | 'static';

// Animation playback state
export type AnimationPhase = 'loading' | 'ready' | 'playing' | 'paused' | 'complete';

// Chalk movement states
export type ChalkMotionState = 'idle' | 'approach' | 'writing' | 'lift' | 'reposition' | 'complete';

// Layout metadata for proof positioning
export interface ProofLayoutMetadata {
  gridDefinition: {
    columns: number;
    rows: number;
    gutterPx: number;
  };
  sections: ProofSectionPlacement[];
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  scale: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
}

export interface ProofSectionPlacement {
  sectionId: string;
  gridPosition: {
    row: number;
    column: number;
    rowSpan: number;
    columnSpan: number;
  };
  alignment: 'left' | 'center' | 'right';
}

// Single stroke definition with animation metadata
export interface StrokeDefinition {
  id: string;
  sectionId: string;
  pathData: string;           // SVG path d attribute
  pathLength: number;         // Pre-calculated for performance
  duration: number | null;    // Override duration (ms), null for proportional
  delayBefore: number;        // Pause before stroke (ms)
  delayAfter: number;         // Pause after stroke (ms)
  pressureProfile: number[];  // 0.5-1.5 values, sampled along path
  strokeWidth: number;        // Base width in px
  opacity: number;            // Base opacity 0-1
  jitterSeed: number;         // For reproducible per-session variation
  jitterAmount: number;       // Max control point offset in px
  type: 'text' | 'symbol' | 'diagram' | 'emphasis' | 'annotation';
}

// Complete proof definition for animation
export interface ProofDefinition {
  id: string;
  title: string;
  shortStatement: string;
  accessibleSummary: string;
  accessibleFullText: string;
  layout: ProofLayoutMetadata;
  strokes: StrokeDefinition[];
  metadata: {
    estimatedDuration: number;
    difficulty: 'accessible' | 'intermediate' | 'advanced';
    tags: string[];
    field: string;
    year?: number;
    mathematician?: string;
  };
}

// Animation configuration
export interface BlackboardAnimationConfig {
  targetDuration: number;
  minStrokeDuration: number;
  maxStrokeDuration: number;
  chalkFloat: {
    amplitude: { x: number; y: number; z: number };
    frequency: { x: number; y: number; z: number };
    rotationAmplitude: number;
  };
  chalkMovement: {
    approachDuration: number;
    liftDuration: number;
    repositionSpeed: number;
    repositionEasing: string;
  };
  variation: {
    speedVariation: number;
    pauseVariation: number;
  };
  completion: {
    behavior: 'float' | 'tray' | 'fade';
    transitionDuration: number;
  };
}

// Runtime animation state
export interface BlackboardRuntimeState {
  renderMode: RenderMode;
  phase: AnimationPhase;
  proofId: string;
  proof: ProofDefinition | null;
  currentStrokeIndex: number;
  strokeProgress: number;
  overallProgress: number;
  startTimestamp: number | null;
  pausedAt: number | null;
  totalPausedDuration: number;
  chalkState: ChalkMotionState;
  chalkPosition: { x: number; y: number; z: number };
  chalkRotation: { x: number; y: number; z: number };
  userPaused: boolean;
  hasCompleted: boolean;
}

// Chalk dust particle (extended for new system)
export interface ChalkDustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color?: string;
}
