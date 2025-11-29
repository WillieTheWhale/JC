'use client';

import { useState } from 'react';
import { TraceryDivider, Quatrefoil } from '@/components/gothic';
import { Card, Button } from '@/components/ui';
import { projects } from '@/lib/data';
import { ExternalLink, Github, FileText, ChevronDown, ChevronUp, Folder, FolderOpen } from 'lucide-react';

export default function ProjectsPage() {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'research', 'software', 'teaching'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Quatrefoil size={60} color="#5A6B5A" hiddenSymbol="∑" />
          </div>
          <h1 className="text-display font-heading text-sage-700 mb-4">
            Research Folios
          </h1>
          <p className="text-xl text-sage-500 font-decorative italic max-w-2xl mx-auto">
            A collection of projects exploring the intersection of mathematics, computation, and visualization.
          </p>
        </header>

        <TraceryDivider variant="simple" className="mb-8" />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(cat)}
              className="capitalize"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Projects Grid - Folder Style */}
        <div className="space-y-4">
          {filteredProjects.map((project, index) => {
            const isOpen = openProject === project.id;

            return (
              <div
                key={project.id}
                className="relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Folder Tab */}
                <div
                  className={`absolute -top-3 left-8 px-4 py-1 rounded-t-lg text-xs font-medium transition-colors ${
                    project.category === 'research' ? 'bg-sage-500 text-white' :
                    project.category === 'software' ? 'bg-gold text-white' :
                    'bg-brass text-white'
                  }`}
                >
                  {project.category}
                </div>

                {/* Folder Body */}
                <Card
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? 'shadow-elevated' : ''
                  }`}
                  variant="paper"
                  hoverable={false}
                >
                  {/* Folder Header - Click to open */}
                  <button
                    onClick={() => setOpenProject(isOpen ? null : project.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-sage-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {isOpen ? (
                        <FolderOpen className="text-sage-500" size={24} />
                      ) : (
                        <Folder className="text-sage-500" size={24} />
                      )}
                      <div>
                        <h3 className="text-xl font-heading text-sage-700">
                          {project.title}
                        </h3>
                        <p className="text-sage-500 text-sm mt-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sage-400 text-sm">{project.date}</span>
                      {isOpen ? (
                        <ChevronUp className="text-sage-400" />
                      ) : (
                        <ChevronDown className="text-sage-400" />
                      )}
                    </div>
                  </button>

                  {/* Folder Contents - Expanded */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 border-t border-sage-200">
                      {/* Papers inside folder */}
                      <div className="mt-4 space-y-4">
                        {project.longDescription && (
                          <div className="p-4 bg-cream rounded border border-sage-200">
                            <p className="text-sage-600">{project.longDescription}</p>
                          </div>
                        )}

                        {project.collaborators && (
                          <div>
                            <h4 className="text-sm font-semibold text-sage-600 mb-2">Collaborators</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.collaborators.map((collab, i) => (
                                <span key={i} className="px-2 py-1 bg-sage-100 text-sage-600 text-sm rounded">
                                  {collab}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {project.technologies && (
                          <div>
                            <h4 className="text-sm font-semibold text-sage-600 mb-2">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, i) => (
                                <span key={i} className="px-2 py-1 bg-gold/10 text-gold-dark text-sm rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-wrap gap-3 pt-4">
                          {project.links?.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-typewriter inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded hover:bg-charcoal/90"
                            >
                              <Github size={16} />
                              GitHub
                            </a>
                          )}
                          {project.links?.paper && (
                            <a
                              href={project.links.paper}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-typewriter inline-flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded hover:bg-sage-700"
                            >
                              <FileText size={16} />
                              Paper
                            </a>
                          )}
                          {project.links?.demo && (
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-typewriter inline-flex items-center gap-2 px-4 py-2 bg-gold text-white rounded hover:bg-gold-dark"
                            >
                              <ExternalLink size={16} />
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-sage-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
