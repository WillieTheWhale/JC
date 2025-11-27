// ═══════════════════════════════════════════════════════════════════════════
// PORTFOLIO DATA - John Christopher's Academic Information
// ═══════════════════════════════════════════════════════════════════════════

import { NavItem, Project, Paper, BlogPost, Education, Experience, Award } from '@/types';

// Navigation Items - Card Catalog Style
export const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'HOME',
    sublabel: 'Main Hall',
    href: '/',
  },
  {
    id: 'cv',
    label: 'CURRICULUM VITAE',
    sublabel: 'Academic Record',
    href: '/cv',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    sublabel: 'Research Folios',
    href: '/projects',
  },
  {
    id: 'research',
    label: 'RESEARCH',
    sublabel: 'Journal Archive',
    href: '/research',
  },
  {
    id: 'chalkboard',
    label: 'CHALKBOARD',
    sublabel: 'Interactive Studio',
    href: '/chalkboard',
  },
  {
    id: 'blog',
    label: 'FAVOURITE PROBLEMS',
    sublabel: 'Mathematical Musings',
    href: '/blog',
  },
];

// Education Data
export const education: Education[] = [
  {
    institution: 'University of Mathematics',
    degree: 'Ph.D. Candidate',
    field: 'Pure Mathematics',
    startDate: '2022',
    description: 'Focus on algebraic topology and category theory',
    honors: ['Research Fellowship', 'Teaching Excellence Award'],
  },
  {
    institution: 'College of Sciences',
    degree: 'M.Sc.',
    field: 'Mathematics',
    startDate: '2020',
    endDate: '2022',
    description: 'Thesis: "On the Cohomology of Certain Algebraic Varieties"',
    honors: ['Summa Cum Laude', 'Best Thesis Award'],
  },
  {
    institution: 'Liberal Arts University',
    degree: 'B.A.',
    field: 'Mathematics & Philosophy',
    startDate: '2016',
    endDate: '2020',
    honors: ["Dean's List", 'Mathematics Prize'],
  },
];

// Experience Data
export const experience: Experience[] = [
  {
    title: 'Graduate Teaching Assistant',
    organization: 'Department of Mathematics',
    startDate: '2022',
    description: 'Teaching undergraduate courses in calculus and linear algebra',
    highlights: [
      'Led discussion sections for 120+ students',
      'Developed interactive teaching materials',
      'Received outstanding teaching evaluations',
    ],
  },
  {
    title: 'Research Assistant',
    organization: 'Center for Mathematical Research',
    startDate: '2021',
    endDate: '2022',
    description: 'Conducted research in algebraic geometry',
    highlights: [
      'Co-authored 2 publications',
      'Presented at 3 international conferences',
    ],
  },
];

// Awards
export const awards: Award[] = [
  {
    title: 'Graduate Research Fellowship',
    organization: 'National Science Foundation',
    date: '2023',
    description: 'Competitive fellowship supporting doctoral research',
  },
  {
    title: 'Best Student Paper Award',
    organization: 'Mathematical Association',
    date: '2022',
  },
  {
    title: 'Teaching Excellence Award',
    organization: 'Department of Mathematics',
    date: '2023',
  },
];

// Projects
export const projects: Project[] = [
  {
    id: 'topology-viz',
    title: 'Topology Visualizer',
    description: 'Interactive web application for visualizing topological spaces and transformations',
    longDescription: 'A comprehensive tool for exploring fundamental concepts in topology through interactive 3D visualizations. Features include homotopy animations, fundamental group calculations, and covering space explorations.',
    category: 'software',
    date: '2023',
    technologies: ['Three.js', 'React', 'WebGL', 'TypeScript'],
    links: {
      github: 'https://github.com/johnchristopher/topology-viz',
      demo: 'https://topology-viz.example.com',
    },
    featured: true,
  },
  {
    id: 'category-theory',
    title: 'Category Theory Notes',
    description: 'Comprehensive lecture notes on category theory for graduate students',
    category: 'teaching',
    date: '2023',
    links: {
      paper: '/papers/category-notes.pdf',
    },
  },
  {
    id: 'cohomology-paper',
    title: 'Cohomology Computations',
    description: 'Efficient algorithms for computing sheaf cohomology',
    category: 'research',
    date: '2022',
    collaborators: ['Prof. A. Smith', 'Dr. B. Jones'],
    links: {
      arxiv: 'https://arxiv.org/abs/2022.12345',
    },
    featured: true,
  },
];

// Research Papers
export const papers: Paper[] = [
  {
    id: 'paper-1',
    title: 'On the Cohomology of Algebraic Varieties',
    authors: ['John Christopher', 'A. Smith'],
    venue: 'Journal of Pure Mathematics',
    year: 2023,
    abstract: 'We present new computational methods for calculating the cohomology of certain classes of algebraic varieties, with applications to intersection theory.',
    category: 'Algebraic Geometry',
    links: {
      arxiv: 'https://arxiv.org/abs/2023.xxxxx',
      doi: '10.1000/example',
    },
  },
  {
    id: 'paper-2',
    title: 'Categorical Foundations of Homotopy Theory',
    authors: ['John Christopher'],
    venue: 'Topology Proceedings',
    year: 2022,
    abstract: 'A categorical approach to foundational aspects of homotopy theory, establishing new connections between model categories and infinity-categories.',
    category: 'Category Theory',
    links: {
      pdf: '/papers/homotopy-foundations.pdf',
    },
  },
];

// Blog Posts (Favourite Problems)
export const blogPosts: BlogPost[] = [
  {
    slug: 'euler-identity',
    title: "The Beauty of Euler's Identity",
    date: '2024-01-15',
    topic: 'Complex Analysis',
    heroEquation: 'e^{i\\pi} + 1 = 0',
    background: 'blackboard',
    excerpt: 'Exploring why mathematicians consider this the most beautiful equation ever written.',
    readingTime: 8,
    tags: ['euler', 'complex-numbers', 'beauty'],
    content: `
# The Beauty of Euler's Identity

Euler's identity is often cited as an example of deep mathematical beauty.
This single equation connects five of the most important numbers in mathematics:

$$e^{i\\pi} + 1 = 0$$

## The Five Constants

- **e** - Euler's number, the base of natural logarithms
- **i** - The imaginary unit, satisfying $i^2 = -1$
- **π** - Pi, the ratio of circumference to diameter
- **1** - The multiplicative identity
- **0** - The additive identity

## Why It's Beautiful

The equation elegantly connects:
- Analysis (e)
- Geometry (π)
- Algebra (i, 0, 1)

All in one compact form.
    `,
  },
  {
    slug: 'golden-ratio',
    title: 'The Golden Ratio in Nature',
    date: '2024-01-08',
    topic: 'Number Theory',
    heroEquation: '\\phi = \\frac{1 + \\sqrt{5}}{2}',
    background: 'cream',
    excerpt: 'How the golden ratio appears throughout nature and mathematics.',
    readingTime: 6,
    tags: ['golden-ratio', 'fibonacci', 'nature'],
    content: `
# The Golden Ratio

The golden ratio, denoted φ (phi), is perhaps the most famous irrational number
after π. It's defined as:

$$\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618$$

## Properties

The golden ratio satisfies the beautiful property:

$$\\phi^2 = \\phi + 1$$

This means φ is the solution to $x^2 - x - 1 = 0$.
    `,
  },
  {
    slug: 'prime-numbers',
    title: 'The Mystery of Prime Numbers',
    date: '2024-01-01',
    topic: 'Number Theory',
    heroEquation: '\\pi(x) \\sim \\frac{x}{\\ln x}',
    background: 'blackboard',
    excerpt: 'An exploration of prime numbers and the prime number theorem.',
    readingTime: 10,
    tags: ['primes', 'number-theory', 'riemann'],
    content: `
# Prime Numbers

Prime numbers are the atoms of arithmetic. Every positive integer greater than 1
can be uniquely expressed as a product of primes.

## The Prime Number Theorem

The distribution of primes follows the asymptotic formula:

$$\\pi(x) \\sim \\frac{x}{\\ln x}$$

where $\\pi(x)$ counts the primes up to $x$.
    `,
  },
];

// Research interests for CV
export const researchInterests = [
  'Algebraic Topology',
  'Category Theory',
  'Homological Algebra',
  'Algebraic Geometry',
  'Mathematical Logic',
  'Homotopy Theory',
];

// Skills
export const skills = {
  mathematical: ['Topology', 'Algebra', 'Analysis', 'Geometry', 'Logic'],
  programming: ['Python', 'Julia', 'LaTeX', 'Mathematica', 'MATLAB'],
  tools: ['Git', 'Linux', 'VS Code', 'Jupyter'],
};
