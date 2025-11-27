# CLAUDE.md - AI Assistant Guide for John Christopher Portfolio

## Project Overview

This repository contains **John Christopher's Portfolio Website** - a mathematics student's personal portfolio with a unique **Dark Academia** aesthetic combining **Mathematical Minimalism** and **Gothic Architectural** design elements.

### Current State
- **Repository Status**: ✅ **FULLY IMPLEMENTED**
- **Main Application**: `portfolio/` - Complete Next.js 14 application
- **Specification File**: `john_christopher_portfolio_development_prompt.xml` - Original comprehensive development prompt

### Project Goals (All Achieved)
- ✅ Create a highly memorable, technically impressive portfolio website
- ✅ Balance scholarly gravitas with playful intellectualism
- ✅ Stand out from generic academic portfolios through creative Gothic architectural integration
- ✅ Deploy as a static site on GitHub Pages

---

## Quick Start

```bash
# Navigate to portfolio directory
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# The build output is in portfolio/out/
```

---

## Implemented Features

### Pages
| Route | Description |
|-------|-------------|
| `/` | Home page with animated chalkboard writing mathematical theorems |
| `/cv` | Academic CV page with Gothic styling |
| `/projects` | Research Folios - expandable manila folder metaphor |
| `/research` | Journal Archive - papers with BibTeX export |
| `/chalkboard` | Interactive drawing canvas with chalk effects |
| `/blog` | "Favourite Problems" mathematical blog |
| `/blog/[slug]` | Individual blog post pages |

### Gothic SVG Components (`src/components/gothic/`)
- **LancetArch** - Pointed arch frames with draw animation
- **Trefoil** - Three-circle decorative element with hidden symbols
- **Quatrefoil** - Four-circle badge with golden ratio symbol (φ)
- **TraceryDivider** - Section dividers (simple, ornate, geometric variants)
- **RoseWindow** - Spinning loading element with Euler's identity

### UI Components (`src/components/ui/`)
- **Button** - Typewriter-style button with depress effect
- **Card** - Elevating cards with shadow animation
- **LoadingProof** - Loading state showing random mathematical theorem
- **MathDisplay** - KaTeX-powered LaTeX rendering

### Layout Components (`src/components/layout/`)
- **CardCatalogNav** - Vintage card catalog drawer navigation
- **Header** - Site header with quatrefoil logo
- **Footer** - Gothic silhouette footer with flying buttresses

### Chalkboard Components (`src/components/chalkboard/`)
- **ChalkboardHero** - Auto-writing animation with chalk particles
- **InteractiveChalkboard** - Full drawing canvas with multiple colors

---

## Design System

### Color Palette
| Name | Hex | CSS Variable |
|------|-----|--------------|
| Euclidean Sage | `#5A6B5A` | `--color-sage-primary` |
| Charcoal | `#3C3C3C` | `--color-charcoal` |
| Gold Leaf | `#C4A35A` | `--color-gold` |
| Blackboard | `#1A1A1A` | `--color-blackboard` |
| Chalk | `#F5F5F0` | `--color-chalk` |
| Cream | `#F5F1E6` | `--color-cream` |
| Brass | `#B5915A` | `--color-brass` |

### Typography (Google Fonts via CSS import)
- **Headings**: Cormorant Garamond
- **Body**: IBM Plex Serif
- **Code**: Fira Code
- **Decorative**: Spectral
- **Math**: KaTeX

### Tailwind Extensions
Custom extensions defined in `tailwind.config.ts`:
- Custom color scales (sage, gold, brass)
- Fluid typography sizes (hero, display, title, subtitle)
- Custom shadows (card, card-hover, elevated, drawer)
- Custom transitions (spring, inertia, typewriter)
- Custom animations (draw-in, fade-up, rotate-slow, float)

---

## Technical Stack

```
Framework:       Next.js 14.2 (App Router, Static Export)
Styling:         Tailwind CSS with custom design tokens
Math Rendering:  KaTeX
Icons:           Lucide React
Animations:      CSS animations + React state transitions
Deployment:      GitHub Pages via GitHub Actions
```

---

## File Structure

```
JC/
├── CLAUDE.md                                    # This file
├── john_christopher_portfolio_development_prompt.xml
└── portfolio/
    ├── .github/workflows/deploy.yml            # GitHub Actions deployment
    ├── public/.nojekyll                        # For GitHub Pages
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx                      # Root layout with nav
    │   │   ├── page.tsx                        # Home page
    │   │   ├── globals.css                     # Global styles + design system
    │   │   ├── cv/page.tsx                     # CV page
    │   │   ├── projects/page.tsx               # Projects page
    │   │   ├── research/page.tsx               # Research papers page
    │   │   ├── chalkboard/page.tsx             # Interactive chalkboard
    │   │   └── blog/
    │   │       ├── page.tsx                    # Blog listing
    │   │       └── [slug]/
    │   │           ├── page.tsx                # Server component
    │   │           └── BlogPostClient.tsx      # Client component
    │   ├── components/
    │   │   ├── gothic/                         # SVG architectural elements
    │   │   ├── layout/                         # Navigation, Header, Footer
    │   │   ├── ui/                             # Button, Card, etc.
    │   │   └── chalkboard/                     # Drawing components
    │   ├── lib/
    │   │   ├── data.ts                         # Mock data (CV, projects, papers, posts)
    │   │   └── theorems.ts                     # Mathematical theorems library
    │   └── types/index.ts                      # TypeScript interfaces
    ├── next.config.mjs                         # Static export config
    ├── tailwind.config.ts                      # Custom design system
    └── package.json
```

---

## Easter Eggs

Hidden mathematical symbols are embedded in Gothic tracery:
- **Trefoil corners**: π
- **Quatrefoil center**: φ (golden ratio)
- **Tracery intersections**: ∞
- **Rose window center**: e^{iπ}+1=0
- **Arch apex**: ∫
- **Cusp points**: ∂

Symbols reveal on hover with blur → focus animation.

---

## Deployment

### GitHub Actions Workflow
Located at `.github/workflows/deploy.yml`:
1. Triggered on push to `main` branch
2. Installs dependencies with `npm ci`
3. Builds with `npm run build`
4. Deploys static `out/` folder to GitHub Pages

### Configuration for GitHub Pages
In `next.config.mjs`:
```javascript
output: 'export',
basePath: '/JC',  // Repository name
assetPrefix: '/JC/',
trailingSlash: true,
images: { unoptimized: true }
```

---

## Adding Content

### New Blog Post
Add to `src/lib/data.ts` in the `blogPosts` array:
```typescript
{
  slug: 'my-new-post',
  title: 'Title Here',
  date: '2024-01-20',
  topic: 'Number Theory',
  heroEquation: 'x^n + y^n = z^n',
  background: 'blackboard',  // or 'cream'
  excerpt: 'Short description...',
  readingTime: 5,
  tags: ['tag1', 'tag2'],
  content: `# Markdown content here...`
}
```

### New Project
Add to `projects` array in `src/lib/data.ts`.

### New Research Paper
Add to `papers` array in `src/lib/data.ts`.

---

## Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Focus-visible outlines (gold)
- ✅ Reduced motion support via `@media (prefers-reduced-motion: reduce)`
- ✅ Skip links available
- ✅ Color contrast ratio > 4.5:1

---

## Notes for AI Assistants

1. **All 10 sub-agents from the XML specification have been implemented**

2. **Static export** - The site uses Next.js static export. No server-side features.

3. **Gothic elements** are functional UI components, not just decoration. They frame content and respond to interaction.

4. **Chalkboard uses Canvas 2D** - The drawing canvas simulates chalk texture with random particle distribution.

5. **KaTeX** is used for all mathematical rendering. Equations in blog content use `$inline$` and `$$display$$` syntax.

6. **Card catalog navigation** transforms to bottom sheet on mobile (breakpoint: 768px).

7. **To add GSAP** for more complex animations, install and configure in client components with `'use client'` directive.

---

## Development Roadmap: Living Chalkboard + Gothic Architectural Depth

### Overview
Comprehensive enhancement combining two creative directions:
- **Living Chalkboard**: Expanding chalk aesthetics site-wide
- **Gothic Architectural Depth**: Making Gothic elements structural, not just decorative

### Phase 1: Chalk Annotation System
**Files**: `src/components/ui/ChalkAnnotation.tsx`, `globals.css`
- Contextual chalk hover effects on equations
- Margin annotations as chalk sketches
- Underline/circle animations on key terms
- CSS classes: `.chalk-annotate`, `.chalk-underline`, `.chalk-circle`

### Phase 2: Proof Step Reveals
**Files**: `src/components/ui/ProofDisplay.tsx`
- Step-by-step theorem reveal with chalk writing animation
- "Therefore" (∴) symbol flourish
- QED box draw animation
- User-controlled reveal speed

### Phase 3: Enhanced Chalkboard Textures
**Files**: `globals.css`, new texture classes
- Green chalkboard variant (`.chalkboard-green`)
- Slate gray variant (`.chalkboard-slate`)
- Worn patches showing wood grain
- Chalk dust accumulation at board bottoms

### Phase 4: Lancet Arch Content Frames
**Files**: `src/components/gothic/ArchFrame.tsx`
- Structural arch frames for content sections
- Stonework texture with depth shadows
- Multiple sizes for content hierarchy
- Light shift on hover

### Phase 5: Enhanced Tracery Dividers
**Files**: `src/components/gothic/TraceryDivider.tsx`
- Mathematical content-aware patterns
- Light pass-through effect with colored shadows
- Complexity indicating section importance
- Subtle breathing animation

### Phase 6: Flying Buttress Connections
**Files**: `src/components/gothic/FlyingButtress.tsx`
- Visual connections between related content
- Double-arc Gothic form
- Hover highlights connected content
- Creates visible knowledge architecture

### Phase 7: Enhanced Rose Window Transitions
**Files**: `src/components/gothic/RoseWindow.tsx`, transition hooks
- Page transition effects (expand from center)
- Petals contain destination preview
- Mathematical constant rotation during load
- Lock-into-place completion animation

### Phase 8: Ribbed Vault Scroll Effect
**Files**: `src/components/layout/RibbedVault.tsx`
- Subtle parallax ceiling effect on long pages
- Ribs converge at keystones with math symbols
- Creates sense of cathedral nave
- Only appears on pages exceeding viewport height

### Technical Specifications
- All animations respect `prefers-reduced-motion`
- SVG draw effects use `stroke-dasharray`/`stroke-dashoffset`
- Performance: Use `will-change` sparingly, prefer `transform`/`opacity`
- Mobile: Disable complex parallax, simplify animations

### New UI Components to Create
| Component | Purpose | Location |
|-----------|---------|----------|
| ChalkAnnotation | Hover chalk effects | `ui/` |
| ProofDisplay | Step-by-step proofs | `ui/` |
| ArchFrame | Structural content frames | `gothic/` |
| FlyingButtress | Content connections | `gothic/` |
| RibbedVault | Scroll parallax | `layout/` |

### CSS Classes to Add
```css
/* Chalkboard variants */
.chalkboard-green { }
.chalkboard-slate { }
.chalkboard-worn { }

/* Chalk annotations */
.chalk-annotate { }
.chalk-underline { }
.chalk-circle { }
.chalk-emphasis { }

/* Gothic structural */
.arch-frame { }
.arch-frame-sm { }
.arch-frame-lg { }
.buttress-connection { }
.vault-rib { }
```
