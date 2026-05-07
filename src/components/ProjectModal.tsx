"use client";

import { ExternalLink, Link2 } from "lucide-react";

import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getYouTubeId } from "@/lib/utils";

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

export function ProjectModal({ open, onOpenChange, project }: ProjectModalProps) {
  const youtubeId = project?.youtubeUrl ? getYouTubeId(project.youtubeUrl) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] w-[90vw] max-w-4xl overflow-y-auto rounded-xl border-[var(--hairline)] p-0 md:w-[70vw]">
        {project ? (
          <div className="space-y-6 p-6">
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="text-2xl font-semibold text-[var(--ink)]">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-[var(--body)]">
                Detailed project overview and demo.
              </DialogDescription>
            </DialogHeader>

            <div>
              {youtubeId ? (
                <iframe
                  title="Project demo video"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="aspect-video w-full rounded-lg border border-[var(--hairline)]"
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-[var(--hairline)] text-sm text-[var(--body)]">
                  Video unavailable
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm text-[var(--body)]">
              {project.fullDescription.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-full font-mono text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.links.github ? (
                <Button asChild variant="outline" className="rounded-full">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Link2 className="size-4" />
                    GitHub
                  </a>
                </Button>
              ) : null}

              {project.links.live ? (
                <Button asChild className="rounded-full">
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4" />
                    Live Demo
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
