import { blogPosts } from '@/lib/data';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find related posts
  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug && p.topic === post.topic)
    .slice(0, 2);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
