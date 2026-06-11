"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/social-icons";

export interface Project {
  name: string;
  description: string;
  year: string;
  tags: string[];
  status: "Live" | "WIP" | "Archived";
  url?: string;
  github?: string;
}

const statusColors: Record<Project["status"], string> = {
  Live:     "bg-accent/10 text-accent dark:bg-accent-dark/10 dark:text-accent-dark",
  WIP:      "bg-warning/10 text-warning",
  Archived: "bg-bg-secondary dark:bg-bg-dark-muted text-ink-tertiary",
};

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
      <div className="lg:col-span-4">
        <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary">
          Projects
        </p>
      </div>

      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
              className="group flex flex-col bg-bg-secondary dark:bg-bg-dark-muted border border-border-subtle dark:border-border-strong rounded-lg p-5 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150 ease-out"
            >
              {/* Top row — year + status */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-mono-sm text-ink-tertiary">
                  {project.year}
                </span>
                <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${statusColors[project.status]}`}>
                  {project.status}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display text-display-sm leading-snug tracking-tight text-ink-primary dark:text-ink-inverse group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150 mb-2">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-body-sm text-ink-secondary dark:text-ink-tertiary leading-relaxed flex-1 mb-4">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-wide text-ink-tertiary bg-bg-primary dark:bg-bg-dark border border-border-subtle dark:border-border-strong px-2 py-0.5 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              {(project.url || project.github) && (
                <div className="flex items-center gap-3 pt-3 border-t border-border-subtle dark:border-border-strong">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} GitHub`}
                      className="text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
                    >
                      <GitHubIcon size={14} />
                    </a>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} live site`}
                      className="text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
