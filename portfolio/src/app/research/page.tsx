'use client';

import { useState } from 'react';
import { TraceryDivider, Quatrefoil } from '@/components/gothic';
import { Card } from '@/components/ui';
import { papers } from '@/lib/data';
import { ExternalLink, FileText, Copy, Check, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function ResearchPage() {
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);
  const [copiedBibtex, setCopiedBibtex] = useState<string | null>(null);

  const copyBibtex = (paperId: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(paperId);
    setTimeout(() => setCopiedBibtex(null), 2000);
  };

  // Group papers by category
  const categories = Array.from(new Set(papers.map(p => p.category)));

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Quatrefoil size={60} color="#5A6B5A" hiddenSymbol="∂" />
          </div>
          <h1 className="text-display font-heading text-sage-700 mb-4">
            Journal Archive
          </h1>
          <p className="text-xl text-sage-500 font-decorative italic max-w-2xl mx-auto">
            Academic publications exploring the frontiers of mathematics.
          </p>
        </header>

        <TraceryDivider variant="ornate" className="mb-12" />

        {/* Bookshelf Visualization */}
        <div className="relative mb-12">
          {/* Shelf */}
          <div className="h-4 bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-md" />

          {/* Books on shelf */}
          <div className="flex gap-2 -mt-32 px-4 items-end justify-center">
            {categories.map((category, index) => (
              <div
                key={category}
                className="relative group cursor-pointer transition-transform hover:-translate-y-2"
                style={{
                  transform: `rotate(${(index % 2 === 0 ? -2 : 2)}deg)`,
                }}
              >
                {/* Book spine */}
                <div
                  className={`w-12 h-28 rounded-sm shadow-lg flex items-center justify-center ${
                    index % 3 === 0 ? 'bg-gradient-to-b from-sage-600 to-sage-700' :
                    index % 3 === 1 ? 'bg-gradient-to-b from-amber-700 to-amber-800' :
                    'bg-gradient-to-b from-brass to-brass-dark'
                  }`}
                >
                  <span
                    className="text-white text-xs font-heading writing-mode-vertical transform rotate-180 whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {category}
                  </span>
                </div>
                {/* Gold embossing */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold/50 rounded" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold/50 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Papers List */}
        <div className="space-y-6">
          {papers.map((paper) => {
            const isExpanded = expandedPaper === paper.id;
            const bibtex = `@article{${paper.id},
  author = {${paper.authors.join(' and ')}},
  title = {${paper.title}},
  journal = {${paper.venue}},
  year = {${paper.year}}
}`;

            return (
              <Card
                key={paper.id}
                className="overflow-hidden"
                variant="paper"
                hoverable={false}
              >
                {/* Paper Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Category badge */}
                      <span className="inline-block px-2 py-0.5 bg-sage-100 text-sage-600 text-xs rounded mb-2">
                        {paper.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-heading text-sage-700 mb-2">
                        {paper.title}
                      </h3>

                      {/* Authors */}
                      <p className="text-sage-500 text-sm">
                        {paper.authors.join(', ')}
                      </p>

                      {/* Venue */}
                      <p className="text-sage-400 text-sm italic mt-1">
                        {paper.venue}, {paper.year}
                      </p>
                    </div>

                    {/* Expand button */}
                    <button
                      onClick={() => setExpandedPaper(isExpanded ? null : paper.id)}
                      className="p-2 text-sage-400 hover:text-sage-600 transition-colors"
                    >
                      {isExpanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 border-t border-sage-200 pt-4">
                    {/* Abstract */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-sage-600 mb-2">Abstract</h4>
                      <p className="text-sage-600 text-sm leading-relaxed">
                        {paper.abstract}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {paper.links?.pdf && (
                        <a
                          href={paper.links.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-typewriter inline-flex items-center gap-2 px-3 py-1.5 bg-sage-600 text-white text-sm rounded hover:bg-sage-700"
                        >
                          <FileText size={14} />
                          PDF
                        </a>
                      )}
                      {paper.links?.arxiv && (
                        <a
                          href={paper.links.arxiv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-typewriter inline-flex items-center gap-2 px-3 py-1.5 bg-gold text-white text-sm rounded hover:bg-gold-dark"
                        >
                          <ExternalLink size={14} />
                          arXiv
                        </a>
                      )}
                      {paper.links?.doi && (
                        <a
                          href={`https://doi.org/${paper.links.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-typewriter inline-flex items-center gap-2 px-3 py-1.5 bg-charcoal text-white text-sm rounded hover:bg-charcoal/90"
                        >
                          <BookOpen size={14} />
                          DOI
                        </a>
                      )}
                    </div>

                    {/* BibTeX */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-sage-600">BibTeX</h4>
                        <button
                          onClick={() => copyBibtex(paper.id, bibtex)}
                          className="flex items-center gap-1 text-xs text-sage-500 hover:text-sage-700"
                        >
                          {copiedBibtex === paper.id ? (
                            <>
                              <Check size={12} className="text-green-500" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3 bg-blackboard text-chalk text-xs rounded overflow-x-auto">
                        <code>{bibtex}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {papers.length === 0 && (
          <div className="text-center py-12 text-sage-500">
            No papers available yet.
          </div>
        )}
      </div>
    </div>
  );
}
