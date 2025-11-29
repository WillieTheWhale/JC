'use client';

import Link from 'next/link';
import { TraceryDivider } from '@/components/gothic';
import { Card, MathDisplay } from '@/components/ui';
import { BlogPost } from '@/types';
import { ArrowLeft, Clock, Tag, Share2, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-display font-heading text-sage-700 mb-6 mt-8">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-title font-heading text-sage-700 mb-4 mt-6">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-subtitle font-heading text-sage-700 mb-3 mt-4">{line.slice(4)}</h3>;
      }

      // Display math ($$...$$)
      if (line.startsWith('$$') && line.endsWith('$$')) {
        return (
          <div key={i} className="my-6 p-4 bg-sage-50 rounded-lg">
            <MathDisplay latex={line.slice(2, -2)} display />
          </div>
        );
      }

      // List items
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-sage-600 mb-2 flex items-start gap-2">
            <span className="text-gold mt-1.5">•</span>
            <span>{renderInlineContent(line.slice(2))}</span>
          </li>
        );
      }

      // Empty lines
      if (line.trim() === '') {
        return <br key={i} />;
      }

      // Regular paragraphs
      return <p key={i} className="text-sage-600 mb-4 leading-relaxed">{renderInlineContent(line)}</p>;
    });
  };

  // Render inline content (bold, inline math, etc.)
  const renderInlineContent = (text: string) => {
    // Handle inline math $...$
    const parts = text.split(/(\$[^$]+\$)/g);
    return parts.map((part, i) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        return <MathDisplay key={i} latex={part.slice(1, -1)} />;
      }
      // Handle bold **...**
      if (part.includes('**')) {
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((bp, j) => {
          if (bp.startsWith('**') && bp.endsWith('**')) {
            return <strong key={`bold-${i}-${j}`} className="font-semibold">{bp.slice(2, -2)}</strong>;
          }
          return bp;
        });
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sage-500 hover:text-sage-700 mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Hero Section */}
        <Card
          className={`mb-8 overflow-hidden ${
            post.background === 'blackboard' ? 'bg-blackboard' : 'bg-cream'
          }`}
          withCorners
          hoverable={false}
        >
          <div className={`p-12 text-center ${post.background === 'blackboard' ? 'chalk-text' : 'text-sage-700'}`}>
            <div className="text-4xl md:text-5xl font-heading mb-4">
              <MathDisplay latex={post.heroEquation} display />
            </div>
          </div>
        </Card>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-sage-100 text-sage-600 text-sm rounded-full">
              <Tag size={12} />
              {post.topic}
            </span>
          </div>

          <h1 className="text-display font-heading text-sage-700 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sage-500 text-sm">
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readingTime} min read
            </span>
          </div>
        </header>

        <TraceryDivider variant="simple" className="mb-8" />

        {/* Article Content */}
        <article className="prose prose-sage max-w-none">
          {renderContent(post.content)}
        </article>

        {/* Tags */}
        <div className="mt-8 pt-8 border-t border-sage-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-sage-50 text-sage-500 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 p-6 bg-sage-50 rounded-lg">
          <h3 className="font-heading text-sage-700 mb-4 flex items-center gap-2">
            <Share2 size={18} />
            Share this post
          </h3>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full hover:bg-sage-100 transition-colors"
            >
              <Twitter size={20} className="text-sage-600" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full hover:bg-sage-100 transition-colors"
            >
              <Linkedin size={20} className="text-sage-600" />
            </a>
            <button
              onClick={copyLink}
              className="p-2 bg-white rounded-full hover:bg-sage-100 transition-colors"
            >
              <LinkIcon size={20} className={copied ? 'text-green-500' : 'text-sage-600'} />
            </button>
            {copied && <span className="text-green-500 text-sm self-center">Copied!</span>}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="font-heading text-xl text-sage-700 mb-6">Related Posts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <Card className="p-4 h-full" hoverable>
                    <h4 className="font-heading text-sage-700 mb-2">{relatedPost.title}</h4>
                    <p className="text-sage-500 text-sm">{relatedPost.excerpt}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
