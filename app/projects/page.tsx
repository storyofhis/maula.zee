"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GitHubIcon } from "@/components/icons/social-icons";
import { PageHeader } from "@/components/molecules/page-header";
import { StatusBadge } from "@/components/atoms/status-badge";
import { TechTag } from "@/components/atoms/tech-tag";
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
    slug: "zee-dev",
  },
  {
    name: "SNAP Payment Gateway",
    description: "SNAP-standard payment service integrated with Faspay. Includes transaction tracking via NATS messaging and ElasticSearch.",
    year: "2025",
    status: "Archived",
    tags: ["Go", "NATS", "PostgreSQL", "gRPC"],
    slug: "snap-payment-gateway",
  },
  {
    name: "Gamification Service",
    description: "API service for language-learning gamification at Lingotalk. Handles points, streaks, and achievement unlocks at scale.",
    year: "2022",
    status: "Archived",
    tags: ["Node.js", "TypeScript", "FaunaDB", "Docker"],
    slug: "gamification-service",
  },
  {
    name: "CapyRun",
    description: "Endless runner iOS game built for the Apple Challenge 2. Features procedurally generated levels and Game Center integration.",
    year: "2026",
    status: "Archived",
    tags: ["Swift", "SpriteKit", "Game Center"],
    github: "https://github.com/storyofhis/caprince",
    slug: "capyrun-apple-challenge-2",
  },
  {
    name: "Presently",
    description: "Endless runner iOS game built for the Apple Challenge 1. Features procedurally generated levels and Game Center integration.",
    year: "2026",
    status: "Archived",
    tags: ["Swift", "SpriteKit", "Game Center"],
    url: "#",
    slug: "presently-apple-challenge-1",
  },
  {
    name: "PayRun",
    description: "Endless runner iOS game built for the Apple Challenge 2. Features procedurally generated levels and Game Center integration.",
    year: "2026",
    status: "Archived",
    tags: ["Swift", "SpriteKit", "Game Center"],
    url: "#",
    slug: "",
  },
  {
    name: "Scouters",
    description: "Apps for parents monitoring their children's activities. Features a dashboard for parents and a companion app for children.",
    year: "2026",
    status: "Archived",
    challenge: "Urban Living Experience",
    tags: ["Swift"],
    url: "#",
    slug: "scouters-apple-challenge-4",
  },
  {
    name: "SonAR",
    description: "An AR overlay that makes an invisible ultrasonic echo visible, so a robotics student can see why the robot decided to stop — not just that it did.",
    year: "2026",
    status: "Archived",
    challenge: "Emerging Tech",
    tags: ["SwiftUI", "Swift", "ARKit", "RealityKit", "Vision", "CoreML"],
    github: "https://github.com/storyofhis/refactor-ECS",
    url: "#",
    slug: "sonar-apple-challenge-5",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-16 pb-24 px-6 max-w-[1120px] mx-auto">
      <PageHeader
        eyebrow="Projects"
        heading="Things I've built."
        body="A mix of professional work, side projects, and open-source experiments — from backend infrastructure to iOS apps."
        headingWidth="max-w-[560px]"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + i * 0.06 }}
            className="group flex flex-col bg-bg-secondary dark:bg-bg-dark-muted border border-border-subtle dark:border-border-strong rounded-lg p-5 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150 ease-out"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-mono-sm text-ink-tertiary">
                {project.year}
              </span>
              <StatusBadge status={project.status} />
            </div>

            <h2 className="font-display text-display-sm leading-snug tracking-tight text-ink-primary dark:text-ink-inverse group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150 mb-2">
              {project.name}
            </h2>

            <h3 className="font-display text-display-xs leading-snug tracking-tight text-ink-secondary dark:text-ink-tertiary group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150 mb-2">
              Challenge: {project.challenge}
            </h3>

            <p className="text-body-sm text-ink-secondary dark:text-ink-tertiary leading-relaxed flex-1 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <TechTag key={tag}>{tag}</TechTag>
              ))}
            </div>

            {(project.url || project.github || project.slug) && (
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
                {project.slug && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
                  >
                    Case study
                    <ArrowRight size={11} />
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
