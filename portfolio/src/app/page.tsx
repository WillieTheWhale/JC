'use client';

import { ChalkboardHero, InteractiveChalkboard } from '@/components/chalkboard';
import { Github, ExternalLink, BookOpen, Mail } from 'lucide-react';

// Sample data - in production, import from lib/data
const researchItems = [
  {
    title: 'Homotopy Type Theory and Univalent Foundations',
    venue: 'Graduate Seminar',
    year: '2024',
    description: 'Exploring the connections between type theory and homotopy theory, with applications to formalized mathematics.',
    tags: ['Type Theory', 'Homotopy', 'Foundations'],
  },
  {
    title: 'Spectral Sequences in Algebraic Topology',
    venue: 'Reading Course',
    year: '2024',
    description: 'A deep dive into spectral sequences as computational tools for homology and cohomology theories.',
    tags: ['Algebraic Topology', 'Spectral Sequences'],
  },
  {
    title: 'Category Theory for Working Mathematicians',
    venue: 'Independent Study',
    year: '2023',
    description: 'Comprehensive study of categorical structures and their applications across mathematics.',
    tags: ['Category Theory', 'Functors', 'Natural Transformations'],
  },
];

const projects = [
  {
    title: 'Knot Invariants Visualizer',
    description: 'Interactive web application for computing and visualizing polynomial knot invariants including Jones and Alexander polynomials.',
    tech: ['TypeScript', 'Three.js', 'WebGL'],
    links: { github: '#', demo: '#' },
  },
  {
    title: 'Spectral Sequence Calculator',
    description: 'Computational tool for working with spectral sequences, featuring automatic differential computation and visualization.',
    tech: ['Python', 'NumPy', 'Matplotlib'],
    links: { github: '#' },
  },
  {
    title: 'Categorical Diagram Editor',
    description: 'LaTeX-quality commutative diagram editor with automatic arrow placement and tikz-cd export.',
    tech: ['React', 'SVG', 'KaTeX'],
    links: { github: '#', demo: '#' },
  },
];

const writings = [
  {
    title: 'The Beauty of the Gaussian Integral',
    excerpt: 'Why the integral of e^(-x^2) over all real numbers equals the square root of pi, and what it reveals about the deep connections between geometry and analysis.',
    topic: 'Analysis',
    date: 'November 2024',
  },
  {
    title: 'Understanding the Fundamental Group',
    excerpt: 'An intuitive introduction to homotopy and the fundamental group, with visual examples from everyday topology.',
    topic: 'Topology',
    date: 'October 2024',
  },
  {
    title: 'Eulers Identity: Beauty in Mathematics',
    excerpt: 'Exploring why mathematicians consider e^(i*pi) + 1 = 0 the most beautiful equation and what it means for mathematical aesthetics.',
    topic: 'Number Theory',
    date: 'September 2024',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Chalkboard */}
      <ChalkboardHero />

      {/* About Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-6 mb-12">
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--color-brass-tarnished) 100%)',
              }}
            />
            <h2 className="font-heading text-display text-parchment tracking-wide">About</h2>
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, var(--color-brass-tarnished) 0%, transparent 100%)',
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Portrait placeholder */}
            <div className="md:col-span-1">
              <div
                className="aspect-[3/4] rounded-sm overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #3D2820 0%, #2D1810 100%)',
                  boxShadow: '0 0 0 4px #8B7355, 0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-20 h-20 text-brass-tarnished/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bio content */}
            <div className="md:col-span-2 space-y-6">
              <p className="text-parchment-aged leading-relaxed">
                I am a mathematics student fascinated by the elegant structures that underpin our understanding of shape, space, and symmetry. My work lies at the intersection of <span className="text-gold">algebraic topology</span>, <span className="text-gold">category theory</span>, and <span className="text-gold">homotopy theory</span>.
              </p>
              <p className="text-parchment-aged leading-relaxed">
                Beyond formal mathematics, I believe in the power of visualization and computation as tools for mathematical intuition. I develop software tools that help make abstract concepts tangible and accessible.
              </p>
              <p className="text-parchment-aged leading-relaxed">
                When not immersed in mathematics, you might find me exploring old libraries, collecting vintage mathematical texts, or attempting to explain why category theory matters to anyone who will listen.
              </p>

              {/* Contact links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="mailto:john@example.com"
                  className="flex items-center gap-2 text-brass hover:text-gold transition-colors duration-300"
                >
                  <Mail size={18} />
                  <span className="text-sm">Email</span>
                </a>
                <a
                  href="https://github.com/johnchristopher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-brass hover:text-gold transition-colors duration-300"
                >
                  <Github size={18} />
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="relative py-24 px-6 bg-walnut-deep/50">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-6 mb-12">
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--color-brass-tarnished) 100%)',
              }}
            />
            <h2 className="font-heading text-display text-parchment tracking-wide">Research</h2>
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, var(--color-brass-tarnished) 0%, transparent 100%)',
              }}
            />
          </div>

          <p className="text-center text-parchment-aged mb-12 max-w-2xl mx-auto font-decorative italic">
            Exploring the hidden patterns that unify abstract mathematics
          </p>

          {/* Research items - styled as journal entries */}
          <div className="space-y-6">
            {researchItems.map((item, index) => (
              <article
                key={index}
                className="group p-6 rounded-sm transition-all duration-300 hover:translate-x-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(232, 220, 196, 0.05) 0%, rgba(232, 220, 196, 0.02) 100%)',
                  borderLeft: '2px solid var(--color-brass-tarnished)',
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <h3 className="font-heading text-xl text-parchment group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="text-xs text-brass-tarnished">
                    {item.venue} &middot; {item.year}
                  </span>
                </div>
                <p className="text-parchment-aged text-sm mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs text-brass rounded-sm"
                      style={{ background: 'rgba(139, 115, 85, 0.2)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-6 mb-12">
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--color-brass-tarnished) 100%)',
              }}
            />
            <h2 className="font-heading text-display text-parchment tracking-wide">Projects</h2>
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, var(--color-brass-tarnished) 0%, transparent 100%)',
              }}
            />
          </div>

          <p className="text-center text-parchment-aged mb-12 max-w-2xl mx-auto font-decorative italic">
            Tools and visualizations bringing mathematical concepts to life
          </p>

          {/* Project cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <article
                key={index}
                className="group relative p-6 rounded-sm transition-all duration-500"
                style={{
                  background: 'linear-gradient(145deg, rgba(232, 220, 196, 0.08) 0%, rgba(232, 220, 196, 0.03) 100%)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                }}
              >
                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-8 h-8"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(139, 115, 85, 0.3) 50%)',
                  }}
                />

                <h3 className="font-heading text-lg text-parchment mb-3 group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-parchment-aged text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs text-brass-tarnished border border-brass-tarnished/30 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-auto">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      className="flex items-center gap-1.5 text-xs text-brass hover:text-gold transition-colors duration-300"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      className="flex items-center gap-1.5 text-xs text-brass hover:text-gold transition-colors duration-300"
                    >
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Writings Section */}
      <section id="writings" className="relative py-24 px-6 bg-walnut-deep/50">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-6 mb-12">
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--color-brass-tarnished) 100%)',
              }}
            />
            <h2 className="font-heading text-display text-parchment tracking-wide">Favourite Problems</h2>
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, var(--color-brass-tarnished) 0%, transparent 100%)',
              }}
            />
          </div>

          <p className="text-center text-parchment-aged mb-12 max-w-2xl mx-auto font-decorative italic">
            Mathematical musings on elegant problems and beautiful solutions
          </p>

          {/* Writing entries */}
          <div className="space-y-8">
            {writings.map((writing, index) => (
              <article
                key={index}
                className="group cursor-pointer"
              >
                <div
                  className="p-6 rounded-sm transition-all duration-300 group-hover:translate-y-[-2px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245, 239, 224, 0.06) 0%, rgba(245, 239, 224, 0.02) 100%)',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-xs text-brass mb-2 block">{writing.topic}</span>
                      <h3 className="font-heading text-xl text-parchment group-hover:text-gold transition-colors duration-300">
                        {writing.title}
                      </h3>
                    </div>
                    <span className="text-xs text-brass-tarnished whitespace-nowrap">{writing.date}</span>
                  </div>
                  <p className="text-parchment-aged text-sm leading-relaxed">{writing.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-brass group-hover:text-gold transition-colors duration-300">
                    <BookOpen size={14} />
                    <span className="text-xs">Read more</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Chalkboard Section */}
      <section id="chalkboard" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-6 mb-12">
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--color-brass-tarnished) 100%)',
              }}
            />
            <h2 className="font-heading text-display text-parchment tracking-wide">Chalkboard</h2>
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, var(--color-brass-tarnished) 0%, transparent 100%)',
              }}
            />
          </div>

          <p className="text-center text-parchment-aged mb-8 max-w-2xl mx-auto font-decorative italic">
            An interactive canvas for mathematical exploration
          </p>

          {/* Interactive Chalkboard */}
          <InteractiveChalkboard />
        </div>
      </section>

      {/* Quote section before footer */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-decorative text-2xl italic text-parchment-aged mb-4">
            &ldquo;Mathematics, rightly viewed, possesses not only truth, but supreme beauty&mdash;a beauty cold and austere, like that of sculpture.&rdquo;
          </blockquote>
          <cite className="text-brass text-sm not-italic">&mdash; Bertrand Russell</cite>
        </div>
      </section>
    </div>
  );
}
