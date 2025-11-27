import type { Metadata } from 'next';
import './globals.css';
import { CardCatalogNav, Header, Footer } from '@/components/layout';
import { FloatingSymbols, DustMotes } from '@/components/ui';

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
        {/* Floating mathematical symbols - atmospheric background */}
        <FloatingSymbols density={0.25} speed={0.8} />

        {/* Dust motes - candlelight atmosphere */}
        <DustMotes count={40} />

        {/* Ambient candlelight effect at top */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(244, 208, 63, 0.06) 0%, rgba(244, 208, 63, 0.02) 40%, transparent 70%)',
          }}
        />

        {/* Secondary candlelight from bottom corners - like reading lamps */}
        <div
          className="fixed bottom-0 left-0 w-[600px] h-[400px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(196, 163, 90, 0.03) 0%, transparent 60%)',
          }}
        />
        <div
          className="fixed bottom-0 right-0 w-[600px] h-[400px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(196, 163, 90, 0.03) 0%, transparent 60%)',
          }}
        />

        {/* Page vignette - deeper for more dramatic effect */}
        <div
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(13, 9, 6, 0.4) 100%)',
          }}
        />

        {/* Paper texture overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
