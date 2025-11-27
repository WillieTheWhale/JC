import type { Metadata } from 'next';
import './globals.css';
import { CardCatalogNav, Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'John Christopher | Mathematics',
  description: 'Personal portfolio of John Christopher - Mathematics student exploring algebraic topology, category theory, and the hidden patterns that unify abstract mathematics.',
  keywords: ['mathematics', 'portfolio', 'algebraic topology', 'category theory', 'research', 'dark academia'],
  authors: [{ name: 'John Christopher' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'John Christopher | Mathematics',
    description: 'Personal portfolio of John Christopher - Mathematics student exploring the elegant structures of abstract mathematics.',
    siteName: 'John Christopher',
  },
};

export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-walnut text-parchment antialiased">
        {/* Ambient candlelight effect at top */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(244, 208, 63, 0.04) 0%, rgba(244, 208, 63, 0.01) 40%, transparent 70%)',
          }}
        />

        {/* Page vignette */}
        <div
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(13, 9, 6, 0.3) 100%)',
          }}
        />

        <Header />
        <CardCatalogNav />

        <main className="relative z-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
