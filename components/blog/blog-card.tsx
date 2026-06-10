import Link from 'next/link';
import { ViewCounter } from './view-counter';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export function BlogCard({ title, description, date, readTime, tags, slug }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-bg-secondary dark:bg-bg-dark-muted border border-border-subtle dark:border-border-strong rounded-lg p-6 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150 ease-out"
    >
      <div className="flex flex-wrap items-center gap-2 font-mono text-mono-sm text-ink-tertiary mb-4">
        <span>{date}</span>
        <span>·</span>
        <span>{readTime}</span>
        <span>·</span>
        <ViewCounter slug={slug} noIncrement={true} />
      </div>

      <h3 className="font-display text-display-md leading-snug tracking-tight text-ink-primary dark:text-ink-inverse group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150 mb-3">
        {title}
      </h3>

      <p className="text-body-md text-ink-secondary dark:text-ink-tertiary leading-relaxed line-clamp-2 mb-5">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-border-subtle dark:border-border-strong">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-mono-sm text-ink-secondary dark:text-ink-tertiary bg-bg-primary dark:bg-bg-dark border border-border-subtle dark:border-border-strong px-2.5 py-1 rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
