'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChalkboardHero } from '@/components/chalkboard';
import { TraceryDivider, Quatrefoil, Trefoil } from '@/components/gothic';
import { Button, Card, MathDisplay } from '@/components/ui';
import { ArrowRight, BookOpen, Code, FlaskConical, PenTool } from 'lucide-react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Greeting */}
          <div className={`text-center mb-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-center mb-4">
              <Trefoil size={48} color="#5A6B5A" hiddenSymbol="∞" animate />
            </div>
            <h1 className="text-hero font-heading text-sage-700 mb-4">
              John Christopher
            </h1>
            <p className="text-xl text-sage-500 font-decorative italic max-w-2xl mx-auto">
              Mathematics student exploring the elegant structures of algebraic topology,
              category theory, and the hidden patterns that unify abstract mathematics.
            </p>
          </div>

          {/* Chalkboard Animation */}
          <div className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ChalkboardHero />
          </div>

          {/* Call to action */}
          <div className={`flex flex-wrap justify-center gap-4 mt-16 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link href="/cv">
              <Button variant="primary" size="lg" className="gap-2">
                <BookOpen size={20} />
                View CV
              </Button>
            </Link>
            <Link href="/chalkboard">
              <Button variant="secondary" size="lg" className="gap-2">
                <PenTool size={20} />
                Try Chalkboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <TraceryDivider variant="ornate" />
      </div>

      {/* Featured Sections */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-display font-heading text-sage-700 text-center mb-12">
            Explore
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Research Card */}
            <Link href="/research" className="block">
              <Card className="p-6 h-full" withCorners>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sage-100 rounded-lg">
                    <FlaskConical className="text-sage-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-sage-700 mb-2">Research</h3>
                    <p className="text-sage-500 text-sm">
                      Exploring algebraic topology and category theory through academic publications.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-gold text-sm font-medium">
                  View Papers <ArrowRight size={16} className="ml-2" />
                </div>
              </Card>
            </Link>

            {/* Projects Card */}
            <Link href="/projects" className="block">
              <Card className="p-6 h-full" withCorners>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sage-100 rounded-lg">
                    <Code className="text-sage-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-sage-700 mb-2">Projects</h3>
                    <p className="text-sage-500 text-sm">
                      Software tools and visualizations bringing mathematical concepts to life.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-gold text-sm font-medium">
                  View Projects <ArrowRight size={16} className="ml-2" />
                </div>
              </Card>
            </Link>

            {/* Blog Card */}
            <Link href="/blog" className="block">
              <Card className="p-6 h-full" withCorners>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sage-100 rounded-lg">
                    <BookOpen className="text-sage-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-sage-700 mb-2">Favourite Problems</h3>
                    <p className="text-sage-500 text-sm">
                      Mathematical musings on elegant problems and beautiful solutions.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-gold text-sm font-medium">
                  Read Blog <ArrowRight size={16} className="ml-2" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-6 bg-sage-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Quatrefoil size={40} color="#C4A35A" hiddenSymbol="e" />
          </div>
          <blockquote className="text-2xl font-decorative italic text-sage-600 mb-4">
            &ldquo;Mathematics, rightly viewed, possesses not only truth, but supreme beauty—a beauty cold and austere, like that of sculpture.&rdquo;
          </blockquote>
          <cite className="text-sage-500">— Bertrand Russell</cite>
        </div>
      </section>

      {/* Featured Equation */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card variant="blackboard" className="p-12">
            <div className="text-center">
              <p className="chalk-text text-sm mb-4 opacity-70 font-decorative">
                The Fundamental Theorem of Calculus
              </p>
              <div className="chalk-text text-3xl md:text-4xl font-heading">
                <MathDisplay
                  latex="\frac{d}{dx} \int_a^x f(t)\,dt = f(x)"
                  display
                />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
