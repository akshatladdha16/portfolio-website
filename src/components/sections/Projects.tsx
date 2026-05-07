"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { siteConfig } from "@/config/site";

export function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const activeProject = useMemo(
    () => siteConfig.projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId],
  );

  if (siteConfig.projects.length === 0) {
    return (
      <section
        id="projects"
        className="scroll-mt-24 px-4 py-12 min-[600px]:px-6 min-[600px]:py-16 lg:px-8 lg:py-[96px]"
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-[11px] tracking-[1.2px] text-[var(--body)] uppercase">Selected work</p>
          <h2 className="mt-3 text-4xl leading-[1.1] tracking-tight text-[var(--ink)]">Projects</h2>
          <p className="mt-4 text-[var(--body)]">Projects will appear here soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="scroll-mt-24 px-4 py-12 min-[600px]:px-6 min-[600px]:py-16 lg:px-8 lg:py-[96px]"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-[11px] tracking-[1.2px] text-[var(--body)] uppercase">Selected work</p>
        <motion.h2
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: inView ? 1 : 0, y: inView ? 0 : 20 }
          }
          transition={{ duration: 0.4 }}
          className="mt-3 text-4xl leading-[1.1] tracking-tight text-[var(--ink)]"
        >
          Projects
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 lg:grid-cols-3">
          {siteConfig.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: inView ? 1 : 0, y: inView ? 0 : 20 }
              }
              transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : index * 0.06 }}
            >
              <ProjectCard project={project} onClick={() => setActiveProjectId(project.id)} />
            </motion.div>
          ))}
        </div>

        <ProjectModal
          open={Boolean(activeProject)}
          onOpenChange={(open) => {
            if (!open) {
              setActiveProjectId(null);
            }
          }}
          project={activeProject}
        />
      </div>
    </section>
  );
}
