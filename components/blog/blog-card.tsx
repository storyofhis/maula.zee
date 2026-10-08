import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlassCard, PillTag } from "../atoms/glass-card";
import { ViewCounter } from "./view-counter";

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
    <GlassCard className="flex flex-col h-full p-6">
      <div className="relative flex items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-mono-sm text-ink-tertiary">
          <span>{date}</span>
          <span>·</span>
          <span>{readTime}</span>
          <span>·</span>
          <ViewCounter slug={slug} noIncrement={true} />
        </div>
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="shrink-0 text-ink-tertiary opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent dark:group-hover:text-accent-dark transition-all duration-300 ease-out"
        />
      </div>

      <h3 className="relative font-display text-display-md leading-snug tracking-tight text-ink-primary dark:text-ink-inverse mb-3">
        <Link href={`/blog/${slug}`} className="after:absolute after:-inset-6 after:z-10 focus-visible:outline-none">
          {title}
        </Link>
      </h3>

      <p className="relative text-body-md text-ink-secondary dark:text-ink-tertiary leading-relaxed line-clamp-2 flex-1 mb-6">
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
