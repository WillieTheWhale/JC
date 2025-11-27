'use client';

import { TraceryDivider, Quatrefoil } from '@/components/gothic';
import { Card } from '@/components/ui';
import { education, experience, awards, researchInterests, skills } from '@/lib/data';
import { Download, Mail, MapPin, Calendar, Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react';

export default function CVPage() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header - Academic Poster Style */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Quatrefoil size={60} color="#5A6B5A" hiddenSymbol="∞" />
          </div>
          <h1 className="text-display font-heading text-sage-700 mb-2">
            John Christopher
          </h1>
          <p className="text-xl text-sage-500 font-decorative italic mb-4">
            Mathematics Researcher
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-sage-500">
            <span className="flex items-center gap-1">
              <Mail size={14} /> john@example.edu
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> University of Mathematics
            </span>
          </div>
        </header>

        {/* Download CV Button */}
        <div className="flex justify-center mb-12">
          <a
            href="/cv/john-christopher-cv.pdf"
            className="btn-typewriter inline-flex items-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
          >
            <Download size={18} />
            Download PDF
          </a>
        </div>

        <TraceryDivider variant="ornate" className="mb-12" />

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Education */}
            <section>
              <h2 className="text-title font-heading text-sage-700 mb-6 flex items-center gap-3">
                <GraduationCap className="text-gold" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="p-6" variant="paper">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-heading text-lg text-sage-700">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-sage-500">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-sage-400 flex items-center gap-1">
                        <Calendar size={14} />
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-sage-600 text-sm mt-2">{edu.description}</p>
                    )}
                    {edu.honors && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {edu.honors.map((honor, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gold/10 text-gold-dark text-xs rounded"
                          >
                            {honor}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-title font-heading text-sage-700 mb-6 flex items-center gap-3">
                <Briefcase className="text-gold" />
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <Card key={index} className="p-6" variant="paper">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-heading text-lg text-sage-700">
                          {exp.title}
                        </h3>
                        <p className="text-sage-500">{exp.organization}</p>
                      </div>
                      <span className="text-sm text-sage-400 flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                    <p className="text-sage-600 text-sm mt-2">{exp.description}</p>
                    {exp.highlights && (
                      <ul className="mt-3 space-y-1">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-sage-500 flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
              </div>
            </section>

            {/* Awards */}
            <section>
              <h2 className="text-title font-heading text-sage-700 mb-6 flex items-center gap-3">
                <Award className="text-gold" />
                Awards & Honors
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {awards.map((award, index) => (
                  <Card key={index} className="p-4 border-l-4 border-gold" withCorners={false}>
                    <h3 className="font-heading text-sage-700">{award.title}</h3>
                    <p className="text-sm text-sage-500">{award.organization}</p>
                    <p className="text-xs text-sage-400 mt-1">{award.date}</p>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Research Interests */}
            <Card className="p-6" variant="paper">
              <h2 className="text-subtitle font-heading text-sage-700 mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-gold" />
                Research Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {researchInterests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-sage-100 text-sage-600 text-sm rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6" variant="paper">
              <h2 className="text-subtitle font-heading text-sage-700 mb-4">
                Skills
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-sage-600 mb-2">Mathematical</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.mathematical.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-sage-50 text-sage-500 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-sage-600 mb-2">Programming</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.programming.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-sage-50 text-sage-500 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-sage-600 mb-2">Tools</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.tools.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-sage-50 text-sage-500 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Decorative Quote */}
            <Card variant="blackboard" className="p-6">
              <p className="chalk-text text-center text-sm font-decorative italic">
                &ldquo;Pure mathematics is, in its way, the poetry of logical ideas.&rdquo;
              </p>
              <p className="chalk-text text-center text-xs mt-2 opacity-70">
                — Albert Einstein
              </p>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sage-400 text-sm">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
}
