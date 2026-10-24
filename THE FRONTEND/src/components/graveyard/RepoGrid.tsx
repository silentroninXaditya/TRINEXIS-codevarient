import React from 'react';
import { RepoCard } from './RepoCard';
import type { OrphanedProject } from '../../types/project';
import { useTheme } from '../../context/ThemeContext';
import { SearchX } from 'lucide-react';

interface RepoGridProps {
  projects: OrphanedProject[];
  onInspectProject: (project: OrphanedProject) => void;
}

export const RepoGrid: React.FC<RepoGridProps> = ({ projects, onInspectProject }) => {
  const { isDark } = useTheme();

  if (projects.length === 0) {
    return (
      <div
        className={`w-full max-w-6xl mx-auto p-12 text-center rounded-2xl border my-8 ${
          isDark
            ? 'bg-slate-900/40 border-indigo-500/20 text-slate-400'
            : 'bg-white border-2 border-black text-slate-700'
        }`}
      >
        <SearchX size={36} className="mx-auto mb-4 text-slate-500" />
        <h4 className="font-serif text-lg font-bold uppercase tracking-wider mb-2">
          No Matching Dormant Projects Found
        </h4>
        <p className="font-serif text-sm max-w-md mx-auto text-slate-500">
          Try clearing your search query or switching development state filters to see other orphaned codebases.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <RepoCard
            key={project.id}
            project={project}
            onInspect={onInspectProject}
          />
        ))}
      </div>
    </div>
  );
};
