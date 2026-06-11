import { Mail } from "lucide-react";
import HomeHero from "@/components/home/home-hero";
import AboutExperience from "@/components/about/about-experience";

const educations = [
  {
    institution: "Institut Teknologi Sepuluh Nopember (ITS)",
    degree: "Bachelor of Computer Science",
    period: "2020 – 2024",
    description:
      "Focused on software engineering, algorithms, and system design. Graduated with honors and completed a thesis on scalable web applications.",
  },
  {
    institution: "Apple Developer Academy @ BINUS, Tangerang",
    degree: "Apple Certified Product Engineer",
    period: "March 2026 – Present",
    description:
      "Intensive program covering iOS development, Swift, UI/UX design, and app deployment. Currently building a capstone social networking app for local communities.",
  },
];

const experiences = [
  {
    title: "iOS Product Engineer",
    company: "Apple Developer Academy @ BINUS",
    period: "Mar 2026 – Present",
    desc: "Shifted focus from backend systems to product engineering on Apple platforms — building iOS apps from concept to App Store. Deep dive into Swift, SwiftUI, and Apple's Human Interface Guidelines.",
    technologies: ["Swift", "SwiftUI", "Xcode", "Foundation Models", "UIKit"],
    highlights: [
      "Building a capstone social networking app for local communities on iOS",
      "Studying Apple Foundation Models framework for on-device AI integration",
      "Practicing full product cycle: ideation, design system, implementation, and user testing",
      "Applying HIG principles and Apple design language across all projects",
    ],
  },
  {
    title: "Software Engineer",
    company: "Bayarind Artha Internusa",
    period: "Oct 2024 – Feb 2026",
    desc: "Specialized in backend development including payment gateway integration and microservices. Developed SNAP-standard payment services using Go, NATS, and PostgreSQL.",
    technologies: ["Go", "NATS", "PostgreSQL", "Redis", "gRPC", "ElasticSearch"],
    highlights: [
      "Built payment gateway integrated with Faspay using SNAP API standardization",
      "Created messaging listener system to track transactions via NATS + ElasticSearch",
      "Maintained authentication service with gRPC-based encrypted communication",
      "Migrated payment integration codebase from PHP to Go",
    ],
  },
  {
    title: "Frontend Software Engineer",
    company: "Dinas Pendidikan Kota Surabaya",
    period: "Jan 2022 – Jul 2023",
    desc: "Built modern web applications with a focus on performance using React, Next.js, TypeScript, and Redux.",
    technologies: ["React", "Next.js", "TypeScript", "Redux"],
    highlights: [
      "Developed responsive web applications across multiple projects",
      "Managed design systems and resolved frontend bugs",
      "Collaborated with design and backend teams on large-scale software",
    ],
  },
  {
    title: "Backend Engineer Intern",
    company: "Lingotalk",
    period: "Oct 2022 – Dec 2022",
    desc: "Focused on backend development and system design for high-performance applications using Node.js and FaunaDB.",
    technologies: ["Node.js", "TypeScript", "FaunaDB", "Docker"],
    highlights: [
      "Built gamification service APIs and deployment tooling",
      "Designed scalable microservices architecture",
      "Diagnosed and resolved backend bugs to optimize code efficiency",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-[1120px] mx-auto px-6 w-full flex-1">
        <HomeHero />

        <div className="pt-12 md:pt-24 pb-16 md:pb-32">
          <AboutExperience experiences={experiences} educations={educations} />
        </div>
      </div>

      <footer className="border-t border-border-subtle dark:border-border-strong py-16">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="font-mono text-mono-sm font-medium text-ink-primary dark:text-ink-inverse mb-1">
                zee.dev
              </p>
              <p className="text-body-sm text-ink-secondary dark:text-ink-tertiary">
                &copy; 2026 — Crafted with precision.
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="mailto:azizi.maula@gmail.com"
                aria-label="Email"
                className="p-2 text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
