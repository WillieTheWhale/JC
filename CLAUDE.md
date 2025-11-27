# CLAUDE.md - AI Assistant Guide for John Christopher Portfolio

## Project Overview

This repository contains the development specification for **John Christopher's Portfolio Website** - a mathematics student's personal portfolio with a unique **Dark Academia** aesthetic combining **Mathematical Minimalism** and **Gothic Architectural** design elements.

### Current State
- **Repository Status**: Specification/planning phase
- **Main File**: `john_christopher_portfolio_development_prompt.xml` - Comprehensive development prompt defining all aspects of the project
- **Code Status**: No implementation code yet; the XML serves as a complete blueprint

### Project Goals
- Create a highly memorable, technically impressive portfolio website
- Balance scholarly gravitas with playful intellectualism
- Stand out from generic academic portfolios through creative Gothic architectural integration
- Deploy as a static site on GitHub Pages

---

## Design System & Aesthetic

### Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Euclidean Sage | `#5A6B5A` | Primary |
| Charcoal | `#3C3C3C` | Secondary |
| Pure White | `#FFFFFF` | Tertiary |
| Gold Leaf | `#C4A35A` | Accent |
| True Black (Blackboard) | `#1A1A1A` | Backgrounds |
| Warm White (Chalk) | `#F5F5F0` | Text on dark |

### Typography
- **Headings**: Cormorant Garamond (serif)
- **Body**: IBM Plex Serif
- **Mathematics**: KaTeX
- **Code**: Fira Code (with ligatures)
- **Decorative**: Spectral

### Gothic SVG Components
- `LancetArch` - Navigation frames, card borders
- `Trefoil` - Decorative accents, section endings
- `Quatrefoil` - Card badges, corner decorations
- `TraceryDivider` - Section breaks (simple, ornate, geometric variants)
- `RoseWindow` - Loading states, hero elements

---

## Technical Stack

```
Framework:       Next.js 14+ (App Router)
Styling:         Tailwind CSS with custom design tokens
Animations:      GSAP (ScrollTrigger, DrawSVGPlugin, InertiaPlugin, Physics2DPlugin)
                 Framer Motion for React components
3D Graphics:     Three.js (for Hagoromo chalk sprite)
Canvas:          HTML5 Canvas 2D (interactive chalkboard)
Math Rendering:  KaTeX with auto-render extension
AI Integration:  Gemini API (LaTeX transcription from handwriting)
Deployment:      GitHub Pages via GitHub Actions
```

---

## Intended File Structure

```
john-christopher-portfolio/
├── .github/workflows/deploy.yml
├── public/
│   ├── fonts/                    # Cormorant, IBM Plex, Fira Code, Spectral
│   ├── svg/arches/               # Gothic arch SVGs
│   ├── svg/tracery/              # Tracery pattern SVGs
│   ├── svg/ornaments/            # Decorative elements
│   └── cv/john-christopher-cv.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Home with chalkboard animation
│   │   ├── globals.css
│   │   ├── cv/page.tsx           # Academic Poster CV
│   │   ├── projects/page.tsx     # Research Folios
│   │   ├── research/page.tsx     # Journal Archive
│   │   ├── chalkboard/page.tsx   # Interactive drawing studio
│   │   └── blog/
│   │       ├── page.tsx          # Favourite Problems listing
│   │       └── [slug]/page.tsx   # Individual posts
│   ├── components/
│   │   ├── layout/               # Navigation, Header, Footer, GothicFrame
│   │   ├── ui/                   # Button, Card, LoadingProof, TraceryDivider
│   │   ├── chalkboard/           # ChalkboardCanvas, ChalkSprite, AutoWriting, Particles
│   │   ├── blog/                 # CoffeeTableCard, MathPostRenderer
│   │   └── gothic/               # LancetArch, Trefoil, Quatrefoil, RoseWindow
│   ├── hooks/                    # useGSAP, useChalkboard, useShakeDetection
│   ├── lib/                      # gsap-config, gemini, katex-config, theorems
│   └── types/index.ts
├── content/
│   ├── blog/                     # MDX blog posts
│   └── projects/                 # Project data
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

---

## Key Features to Implement

### 1. Library Card Catalog Navigation
- Slide-out sidebar styled as vintage card catalog drawer
- Aged oak wood texture with brass fixtures
- Typewriter-style labels
- Mobile: transforms to bottom sheet

### 2. Chalkboard Auto-Writing Animation (Home Page)
- 3D Hagoromo chalk sprite (Three.js)
- Writes random mathematical theorems
- Realistic chalk texture and dust particles
- Chalk settles on ledge when complete

### 3. Interactive Chalkboard Page
- Canvas 2D drawing with realistic chalk brush
- Multiple chalk colors (white, yellow, pink, blue)
- Eraser with smudging effect
- Gemini API integration for LaTeX transcription
- Shake-to-clear on mobile

### 4. Content Pages
- **CV**: Academic poster layout with Gothic styling
- **Projects**: Manila folder metaphor with 3D open animation
- **Research**: Leather-bound journal volumes on bookshelf
- **Blog**: "Coffee Table Mathematics" - framed mathematical art cards

### 5. Micro-interactions
- Double-click chalk dust burst (Physics2D)
- Typewriter button depress effect
- Page transitions with weighted feel
- Card elevation with realistic shadows
- Loading states showing famous proofs being written

---

## Development Phases

| Phase | Focus | Agents |
|-------|-------|--------|
| 1 | Foundation | Project Architect, Gothic Architecture Engineer |
| 2 | Core Structure | Navigation, Base animations |
| 3 | Signature Features | Chalkboard animations, Interactive canvas |
| 4 | Content Pages | CV, Projects, Research, Blog |
| 5 | Polish & Launch | Accessibility, Performance, QA, Deployment |

---

## Agent Architecture

The XML specification defines 10 specialized sub-agents:

1. **Project Architect** - Foundation, build config, file structure
2. **Gothic Architecture Engineer** - SVG components with Easter eggs
3. **Navigation Systems Engineer** - Card catalog navigation
4. **Chalkboard Animation Specialist** - Auto-writing with 3D chalk
5. **Interactive Chalkboard Developer** - Drawing canvas + Gemini API
6. **Content Pages Architect** - CV, Projects, Research pages
7. **Blog System Developer** - MDX blog with KaTeX
8. **Animation & Interaction Engineer** - GSAP micro-interactions
9. **Accessibility & Performance Specialist** - WCAG 2.1 AA, Core Web Vitals
10. **Quality Assurance & Deployment** - Testing, GitHub Pages

---

## Creative Directives

When working on this project, follow these principles:

- **Reject Generic**: Every element should feel specifically designed for a mathematician's portfolio
- **Physics Over State**: Interactions should feel physical (buttons depress, pages turn with weight)
- **Hidden Depth**: Include Easter eggs (math symbols in Gothic tracery, different theorems on each load)
- **Scholarly Whimsy**: Balance gravitas with playfulness
- **Authentic Gothic**: Use Gothic elements structurally, not superficially
- **Mathematical Beauty**: Embody the elegance mathematicians see in their work

---

## Environment Variables Required

```env
NEXT_PUBLIC_GEMINI_API_KEY=<your-gemini-api-key>
```

For deployment, store `GEMINI_API_KEY` in GitHub Secrets.

---

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Color contrast minimum 4.5:1
- Full keyboard navigation
- Screen reader support for math (KaTeX accessible markup)
- Reduced motion preference support
- High contrast mode toggle

---

## Performance Targets

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## Commands (Once Implemented)

```bash
# Development
npm run dev

# Build
npm run build

# Export for GitHub Pages
npm run export

# Lint
npm run lint
```

---

## Notes for AI Assistants

1. **Read the full XML specification** before making implementation decisions - it contains detailed requirements for every component

2. **Use GSAP plugins properly**: ScrollTrigger, DrawSVGPlugin, InertiaPlugin, Physics2DPlugin require registration

3. **SVG paths must have `pathLength="1"`** for consistent draw animations

4. **Easter eggs are intentional** - hidden math symbols should be placed in Gothic tracery elements

5. **Mobile-first approach** - card catalog becomes bottom sheet, touch gestures for chalkboard

6. **KaTeX over MathJax** - preferred for performance, with MathML fallbacks for accessibility

7. **Static export required** - site deploys to GitHub Pages, ensure all routes work as static pages

8. **No external font requests** - self-host all fonts for performance
