import { blogPosts } from '@/lib/data';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Find related posts
  const relatedPosts = blogPosts
    .filter(p => p.slug !== params.slug && p.topic === post.topic)
    .slice(0, 2);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
