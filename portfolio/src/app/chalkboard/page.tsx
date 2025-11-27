'use client';

import { TraceryDivider, Quatrefoil } from '@/components/gothic';
import { InteractiveChalkboard } from '@/components/chalkboard';

export default function ChalkboardPage() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Quatrefoil size={60} color="#5A6B5A" hiddenSymbol="∫" />
          </div>
          <h1 className="text-display font-heading text-sage-700 mb-4">
            Interactive Chalkboard
          </h1>
          <p className="text-xl text-sage-500 font-decorative italic max-w-2xl mx-auto">
            Express your mathematical ideas with the authentic feel of chalk on slate.
            Draw equations, diagrams, and proofs in a digital chalkboard environment.
          </p>
        </header>

        <TraceryDivider variant="simple" className="mb-8" />

        {/* Interactive Chalkboard */}
        <InteractiveChalkboard />

        {/* Tips Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-3 bg-sage-100 rounded-full flex items-center justify-center">
              <span className="text-sage-600 text-xl">✏️</span>
            </div>
            <h3 className="font-heading text-sage-700 mb-2">Draw Naturally</h3>
            <p className="text-sage-500 text-sm">
              Use your mouse or touch screen to draw. The chalk texture responds to your drawing speed.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-3 bg-sage-100 rounded-full flex items-center justify-center">
              <span className="text-sage-600 text-xl">🎨</span>
            </div>
            <h3 className="font-heading text-sage-700 mb-2">Multiple Colors</h3>
            <p className="text-sage-500 text-sm">
              Choose from white, yellow, pink, and blue chalk colors to organize your work.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-3 bg-sage-100 rounded-full flex items-center justify-center">
              <span className="text-sage-600 text-xl">💾</span>
            </div>
            <h3 className="font-heading text-sage-700 mb-2">Save Your Work</h3>
            <p className="text-sage-500 text-sm">
              Download your chalkboard drawings as PNG images to save and share.
            </p>
          </div>
        </div>

        {/* Mathematical Inspiration */}
        <div className="mt-12 p-8 bg-sage-50 rounded-lg text-center">
          <p className="font-decorative italic text-sage-600 text-lg mb-2">
            &ldquo;The essence of mathematics lies in its freedom.&rdquo;
          </p>
          <p className="text-sage-400 text-sm">— Georg Cantor</p>
        </div>
      </div>
    </div>
  );
}
