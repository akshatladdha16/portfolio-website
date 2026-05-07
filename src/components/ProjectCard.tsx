import type { Project } from "@/types";

import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-soft)] p-5 text-left transition-all duration-200 hover:border-[var(--brand-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
    >
      <h3 className="text-2xl leading-[1.33] tracking-[-0.16px] text-[var(--ink)]">{project.title}</h3>
      <p className="line-clamp-2 text-sm text-[var(--body)]">{project.shortDescription}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="font-mono">
            {tag}
          </Badge>
        ))}
      </div>
    </button>
  );
}
