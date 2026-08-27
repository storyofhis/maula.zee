"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/molecules/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/components/home/projects-section";

const projects: Project[] = [
  // {
  //   name: "zee.dev",
  //   description: "Personal portfolio and blog — built with Next.js, Tailwind CSS, and Prisma. Features dark mode, view counts, likes, and comments.",
  //   year: "2026",
  //   // status: "Live",
  //   tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
  //   github: "https://github.com/storyofhis/portfolio",
  //   url: "#",
  //   slug: "zee-dev",
  // },
  // {
  //   name: "SNAP Payment Gateway",
  //   description: "SNAP-standard payment service integrated with Faspay. Includes transaction tracking via NATS messaging and ElasticSearch.",
  //   year: "2025",
  //   status: "Archived",
  //   tags: ["Go", "NATS", "PostgreSQL", "gRPC"],
  //   slug: "snap-payment-gateway",
  // },
  // {
  //   name: "Gamification Service",
  //   description: "API service for language-learning gamification at Lingotalk. Handles points, streaks, and achievement unlocks at scale.",
  //   year: "2022",
  //   status: "Archived",
  //   tags: ["Node.js", "TypeScript", "FaunaDB", "Docker"],
  //   slug: "gamification-service",
  // },
  {
    name: "CapyRun",
    description: "Endless runner iOS game built for the Project. Features procedurally generated levels and Game Center integration.",
    year: "2026",
    // status: "Archived",
    tags: ["Swift", "SpriteKit", "Game Center"],
    // challenge: "Research Challenge",
    github: "https://github.com/storyofhis/caprince",
    slug: "capyrun-apple-challenge-2",
  },
  {
    name: "Presently",
    description: "A reminder app that nudges you through daily activities, built for the Project. Notification copy is generated per activity and tone with Apple's on-device Foundation Model.",
    year: "2026",
    // status: "Archived",
    tags: ["SwiftUI", "Swift", "Apple Foundation Model"],
    slug: "presently-apple-challenge-1",
  },
  // {
  //   name: "PayRun",
  //   description: "Endless runner iOS game built for the Project. Features procedurally generated levels and Game Center integration.",
  //   year: "2026",
  //   status: "Archived",
  //   tags: ["Swift", "SpriteKit", "Game Center"],
  //   url: "#",
  //   slug: "",
  // },
  {
    name: "Scouters",
    description: "Apps for parents monitoring their children's activities. Features a dashboard for parents and a companion app for children.",
    year: "2026",
    // status: "Archived",
    // challenge: "Urban Living Experience",
    tags: ["Swift"],
    url: "#",
    slug: "scouters-apple-challenge-4",
  },
  {
    name: "SonAR",
    description: "An AR overlay that makes an invisible ultrasonic echo visible, so a robotics student can see why the robot decided to stop — not just that it did.",
    year: "2026",
    // status: "Archived",
    // challenge: "Emerging Tech",
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
        body="A mix of professional work, side projects, and open-source experiments — built as a product engineer across whatever the problem needed."
        headingWidth="max-w-[560px]"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + i * 0.06 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}
