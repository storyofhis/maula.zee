"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/social-icons";
import type { Project } from "@/components/home/projects-section";

const projects: Project[] = [
  {
    name: "zee.dev",
    description: "Personal portfolio and blog — built with Next.js, Tailwind CSS, and Prisma. Features dark mode, view counts, likes, and comments.",
    year: "2026",
    status: "Live",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    github: "https://github.com/storyofhis/portfolio",
    url: "#",
  },
  {
    name: "iOS Social App",
    description: "Capstone social networking app for local communities, built at Apple Developer Academy. On-device AI via Foundation Models.",
    year: "2026",
    status: "WIP",
    tags: ["Swift", "SwiftUI", "Foundation Models"],
  },
  {
    name: "SNAP Payment Gateway",
    description: "SNAP-standard payment service integrated with Faspay. Includes transaction tracking via NATS messaging and ElasticSearch.",
    year: "2025",
    status: "Archived",
    tags: ["Go", "NATS", "PostgreSQL", "gRPC"],
  },
  {
    name: "Gamification Service",
    description: "API service for language-learning gamification at Lingotalk. Handles points, streaks, and achievement unlocks at scale.",
    year: "2022",
    status: "Archived",
    tags: ["Node.js", "TypeScript", "FaunaDB", "Docker"],
  },
];

const statusColors: Record<Project["status"], string> = {
  Live:     "bg-accent/10 text-accent dark:bg-accent-dark/10 dark:text-accent-dark",
  WIP:      "bg-warning/10 text-warning",
  Archived: "bg-bg-secondary dark:bg-bg-dark-muted text-ink-tertiary border border-border-subtle dark:border-border-strong",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-16 pb-24 px-6 max-w-[1120px] mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-16"
      >
        <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary mb-6">
          Projects
        </p>
        <h1 className="font-display text-display-xl leading-[1.1] tracking-tight text-ink-primary dark:text-ink-inverse mb-6 text-balance max-w-[640px]">
          Things I've built.
        </h1>
        <p className="text-body-lg text-ink-secondary dark:text-ink-tertiary max-w-[480px] leading-relaxed">
          A mix of professional work, side projects, and open-source experiments — from backend infrastructure to iOS apps.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + i * 0.06 }}
            className="group flex flex-col bg-bg-secondary dark:bg-bg-dark-muted border border-border-subtle dark:border-border-strong rounded-lg p-5 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150 ease-out"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-mono-sm text-ink-tertiary">
                {project.year}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${statusColors[project.status]}`}>
                {project.status}
              </span>
            </div>

            {/* Name */}
            <h2 className="font-display text-display-sm leading-snug tracking-tight text-ink-primary dark:text-ink-inverse group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150 mb-2">
              {project.name}
            </h2>

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
                    aria-label={`${project.name} on GitHub`}
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
    </main>
  );
}
