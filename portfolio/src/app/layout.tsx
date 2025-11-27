import type { Metadata } from 'next';
import './globals.css';
import { CardCatalogNav, Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'John Christopher | Mathematics',
  description: 'Personal portfolio of John Christopher - Mathematics student exploring algebraic topology, category theory, and the beauty of abstract structures.',
  keywords: ['mathematics', 'portfolio', 'algebraic topology', 'category theory', 'research'],
  authors: [{ name: 'John Christopher' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'John Christopher | Mathematics',
    description: 'Personal portfolio of John Christopher - Mathematics student',
    siteName: 'John Christopher Portfolio',
  },
};

export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <CardCatalogNav />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
