import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { GitHubIcon } from '../icons/social-icons';
import { TechTag } from '../atoms/tech-tag';
import { Project } from '../home/projects-section';
import { StatusBadge } from '../atoms/status-badge';

export function ProjectCard({ name, description, year, tags, github, url, slug }: Project) {
  const caseStudyHref = slug ? `/projects/${slug}` : undefined;

  return (
    <div className="group relative flex flex-col h-full bg-bg-secondary dark:bg-bg-dark-muted border border-border-subtle dark:border-border-strong rounded-lg p-6 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150 ease-out">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-mono-sm text-ink-tertiary">{year}</span>
        {/* <StatusBadge status={status} /> */}
      </div>

      <h2 className="font-display text-display-sm leading-snug tracking-tight text-ink-primary dark:text-ink-inverse group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150 mb-2">
        {caseStudyHref ? (
          <Link href={caseStudyHref} className="after:absolute after:inset-0">
            {name}
          </Link>
        ) : (
          name
        )}
      </h2>

      <p className="text-body-sm text-ink-secondary dark:text-ink-tertiary leading-relaxed flex-1 mb-4">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map((tag) => (
          <TechTag key={tag}>{tag}</TechTag>
        ))}
      </div>

      {/* {(github || url) && (
        <div className="relative z-10 flex items-center gap-3 pt-3 mt-auto border-t border-border-subtle dark:border-border-strong">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on GitHub`}
              className="text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
            >
              <GitHubIcon size={14} />
            </a>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} live site`}
              className="text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      )} */}
    </div>
  )
}