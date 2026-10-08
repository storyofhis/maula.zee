import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlassCard, PillTag } from "../atoms/glass-card";
import type { Project } from "../home/projects-section";

export function ProjectCard({ name, description, year, tags, slug }: Project) {
  const caseStudyHref = slug ? `/projects/${slug}` : undefined;

  return (
    <GlassCard className="flex flex-col h-full p-6">
      <div className="relative flex items-center justify-between mb-5">
        <span className="font-mono text-mono-sm text-ink-tertiary">{year}</span>
        {caseStudyHref && (
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="text-ink-tertiary opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent dark:group-hover:text-accent-dark transition-all duration-300 ease-out"
          />
        )}
      </div>

      <h2 className="relative font-display text-display-sm leading-snug tracking-tight text-ink-primary dark:text-ink-inverse mb-2">
        {caseStudyHref ? (
          <Link href={caseStudyHref} className="after:absolute after:-inset-6 after:z-10 focus-visible:outline-none">
            {name}
          </Link>
        ) : (
          name
        )}
      </h2>

      <p className="relative text-body-sm text-ink-secondary dark:text-ink-tertiary leading-relaxed flex-1 mb-6">
        {description}
      </p>

      <div className="relative flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <PillTag key={tag}>{tag}</PillTag>
        ))}
      </div>
    </GlassCard>
  );
}
