'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TraceryDivider, Quatrefoil } from '@/components/gothic';
import { Card, Button, MathDisplay } from '@/components/ui';
import { blogPosts } from '@/lib/data';
import { Clock, Tag, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const [filter, setFilter] = useState<string>('all');

  const topics = ['all', ...Array.from(new Set(blogPosts.map(p => p.topic)))];

  const filteredPosts = filter === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.topic === filter);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Quatrefoil size={60} color="#5A6B5A" hiddenSymbol="π" />
          </div>
          <h1 className="text-display font-heading text-sage-700 mb-4">
            Favourite Problems
          </h1>
          <p className="text-xl text-sage-500 font-decorative italic max-w-2xl mx-auto">
            Mathematical musings on elegant problems, beautiful proofs, and the joy of discovery.
            Each post explores a concept that captures the essence of mathematical thinking.
          </p>
        </header>

        <TraceryDivider variant="ornate" className="mb-8" />

        {/* Topic Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant={filter === topic ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(topic)}
              className="capitalize"
            >
              {topic}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid - Coffee Table Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <Card
                className={`h-full overflow-hidden ${
                  post.background === 'blackboard' ? 'bg-blackboard' : 'bg-cream'
                }`}
                withCorners
                hoverable
              >
                {/* Hero Equation */}
                <div
                  className={`p-6 min-h-[120px] flex items-center justify-center ${
                    post.background === 'blackboard' ? 'chalk-text' : 'text-sage-700'
                  }`}
                >
                  <div className="text-2xl font-heading">
                    <MathDisplay latex={post.heroEquation} display />
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 ${post.background === 'blackboard' ? 'bg-offwhite' : 'bg-white'} border-t border-sage-200`}>
                  {/* Topic Tag */}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sage-100 text-sage-600 text-xs rounded mb-3">
                    <Tag size={10} />
                    {post.topic}
                  </span>

                  {/* Title */}
                  <h2 className="text-xl font-heading text-sage-700 mb-2 group-hover:text-sage-600 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sage-500 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-sage-400">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime} min read
                    </span>
                  </div>

                  {/* Read More */}
                  <div className="mt-4 flex items-center text-gold text-sm font-medium group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-sage-500">
            No posts found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
