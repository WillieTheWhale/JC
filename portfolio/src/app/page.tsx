'use client';

import { BlackboardHeroEnhanced, InteractiveChalkboard } from '@/components/chalkboard';
import { IlluminatedHeader, JournalCard } from '@/components/ui';
import { Github, ExternalLink, BookOpen, Mail, Scroll, FlaskConical, Pen } from 'lucide-react';

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
      {/* Hero Section with Enhanced Animated Blackboard */}
      <BlackboardHeroEnhanced />

      {/* About Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <IlluminatedHeader
            title="About"
            subtitle="The scholar behind the equations"
            symbol="φ"
          />

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
      <section id="research" className="relative py-24 px-6 bg-sage-deepest/70">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <IlluminatedHeader
            title="Research"
            subtitle="Exploring the hidden patterns that unify abstract mathematics"
            symbol="∫"
          />

          {/* Research items - styled as journal entries */}
          <div className="space-y-6 mt-8">
            {researchItems.map((item, index) => (
              <JournalCard
                key={index}
                variant="paper"
                className="group"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <Scroll className="w-5 h-5 text-brass-tarnished" />
                    <h3 className="font-heading text-xl text-parchment group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs text-brass-tarnished font-decorative">
                    {item.venue} · {item.year}
                  </span>
                </div>
                <p className="text-parchment-aged text-sm mb-4 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs text-brass rounded-sm border border-brass-tarnished/30"
                      style={{ background: 'rgba(139, 115, 85, 0.15)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </JournalCard>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <IlluminatedHeader
            title="Projects"
            subtitle="Tools and visualizations bringing mathematical concepts to life"
            symbol="∑"
          />

          {/* Project cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {projects.map((project, index) => (
              <JournalCard
                key={index}
                variant="index"
                className="group h-full flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <FlaskConical className="w-5 h-5 text-brass-tarnished" />
                  <h3 className="font-heading text-lg text-parchment group-hover:text-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
                <p className="text-parchment-aged text-sm mb-4 leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs text-brass-tarnished border border-brass-tarnished/30 rounded-sm"
                      style={{ background: 'rgba(139, 115, 85, 0.1)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-auto pt-2 border-t border-brass-tarnished/20">
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
              </JournalCard>
            ))}
          </div>
        </div>
      </section>

      {/* Writings Section */}
      <section id="writings" className="relative py-24 px-6 bg-sage-deepest/70">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <IlluminatedHeader
            title="Favourite Problems"
            subtitle="Mathematical musings on elegant problems and beautiful solutions"
            symbol="∞"
          />

          {/* Writing entries */}
          <div className="space-y-8 mt-8">
            {writings.map((writing, index) => (
              <JournalCard
                key={index}
                variant="manuscript"
                className="group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Pen className="w-4 h-4 text-brass" />
                      <span className="text-xs text-brass font-decorative">{writing.topic}</span>
                    </div>
                    <h3 className="font-heading text-xl text-parchment group-hover:text-gold transition-colors duration-300">
                      {writing.title}
                    </h3>
                  </div>
                  <span className="text-xs text-brass-tarnished whitespace-nowrap font-decorative italic">{writing.date}</span>
                </div>
                <p className="text-parchment-aged text-sm leading-relaxed">{writing.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-brass group-hover:text-gold transition-colors duration-300">
                  <BookOpen size={14} />
                  <span className="text-xs font-decorative">Read more</span>
                </div>
              </JournalCard>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Chalkboard Section */}
      <section id="chalkboard" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <IlluminatedHeader
            title="Chalkboard"
            subtitle="An interactive canvas for mathematical exploration"
            symbol="∂"
          />

          {/* Interactive Chalkboard */}
          <div className="mt-8">
            <InteractiveChalkboard />
          </div>
        </div>
      </section>

      {/* Quote section before footer */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Decorative background element */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(196, 163, 90, 0.03) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Decorative quotation marks */}
          <span
            className="absolute -top-8 -left-4 text-8xl text-brass-tarnished/10 font-decorative select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote className="font-decorative text-2xl italic text-parchment-aged mb-6 leading-relaxed">
            Mathematics, rightly viewed, possesses not only truth, but supreme beauty&mdash;a beauty cold and austere, like that of sculpture.
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div
              className="h-px w-12"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--color-brass-tarnished) 100%)',
              }}
            />
            <cite className="text-brass text-sm not-italic font-heading tracking-wider">Bertrand Russell</cite>
            <div
              className="h-px w-12"
              style={{
                background: 'linear-gradient(90deg, var(--color-brass-tarnished) 0%, transparent 100%)',
              }}
            />
          </div>
          <span
            className="absolute -bottom-8 -right-4 text-8xl text-brass-tarnished/10 font-decorative select-none"
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </div>
      </section>
    </div>
  );
}
