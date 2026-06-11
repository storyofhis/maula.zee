import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/lib/projects-data";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { CodeBlock } from "@/components/blog/code-block";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/social-icons";

export async function generateStaticParams() {
  return getAllCaseStudies().map((s) => ({ slug: s.slug }));
}

const statusColors = {
  Live:     "bg-accent/10 text-accent dark:bg-accent-dark/10 dark:text-accent-dark",
  WIP:      "bg-warning/10 text-warning",
  Archived: "bg-bg-secondary dark:bg-bg-dark-muted text-ink-tertiary border border-border-subtle dark:border-border-strong",
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) notFound();

  return (
    <article className="min-h-screen pt-16 pb-24 px-6">
      <div className="max-w-[720px] mx-auto">

        {/* Back nav */}
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-mono-sm text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150 mb-12"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
          Projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 font-mono text-mono-sm text-ink-tertiary mb-6">
            <span>{project.year}</span>
            <span className="opacity-30">·</span>
            <span>{project.role}</span>
            <span className="opacity-30">·</span>
            <span>{project.timeline}</span>
            <span className="opacity-30">·</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>

          <h1 className="font-display text-display-xl leading-[1.1] tracking-tight text-ink-primary dark:text-ink-inverse mb-4">
            {project.title}
          </h1>

          <p className="text-body-lg text-ink-secondary dark:text-ink-tertiary leading-relaxed mb-8">
            {project.tagline}
          </p>

          {project.metric && (
            <div className="inline-flex items-center gap-3 bg-accent/5 dark:bg-accent-dark/5 border border-accent/20 dark:border-accent-dark/20 rounded-md px-4 py-3 mb-8">
              <span className="font-mono text-mono-sm text-accent dark:text-accent-dark">↑</span>
              <span className="text-body-sm text-accent dark:text-accent-dark font-medium">{project.metric}</span>
            </div>
          )}

          {/* Tags + external links */}
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-border-subtle dark:border-border-strong">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wide text-ink-tertiary bg-bg-secondary dark:bg-bg-dark border border-border-subtle dark:border-border-strong px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
            <div className="flex items-center gap-3 ml-auto">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
                >
                  <GitHubIcon size={14} />
                </a>
              )}
              {project.url && project.url !== "#" && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live site`}
                  className="text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="
          prose prose-neutral dark:prose-invert max-w-none
          prose-headings:font-display prose-headings:tracking-tight
          prose-h2:text-display-sm prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-ink-primary dark:prose-h2:text-ink-inverse
          prose-h3:text-body-lg prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-ink-primary dark:prose-h3:text-ink-inverse
          prose-p:text-body prose-p:leading-relaxed prose-p:text-ink-secondary dark:prose-p:text-ink-tertiary
          prose-li:text-body prose-li:text-ink-secondary dark:prose-li:text-ink-tertiary
          prose-strong:text-ink-primary dark:prose-strong:text-ink-inverse prose-strong:font-semibold
          prose-blockquote:border-l-2 prose-blockquote:border-accent dark:prose-blockquote:border-accent-dark prose-blockquote:not-italic prose-blockquote:text-ink-secondary dark:prose-blockquote:text-ink-tertiary
          prose-table:text-body-sm
          prose-thead:border-border-subtle dark:prose-thead:border-border-strong
          prose-th:font-mono prose-th:text-mono-sm prose-th:uppercase prose-th:tracking-wide prose-th:text-ink-tertiary prose-th:font-normal
          prose-td:text-ink-secondary dark:prose-td:text-ink-tertiary
          prose-tr:border-border-subtle dark:prose-tr:border-border-strong
          prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none
          prose-code:font-mono prose-code:text-mono-sm prose-code:text-accent dark:prose-code:text-accent-dark prose-code:bg-accent/5 dark:prose-code:bg-accent-dark/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-hr:border-border-subtle dark:prose-hr:border-border-strong
        ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              pre({ children }) {
                return <CodeBlock>{children}</CodeBlock>;
              },
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-ink-primary dark:text-ink-inverse underline underline-offset-4 decoration-border-strong hover:decoration-ink-primary dark:hover:decoration-ink-inverse transition-colors"
                >
                  {children}
                </a>
              ),
            }}
          >
            {project.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-10 border-t border-border-subtle dark:border-border-strong flex items-center justify-between">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-mono-sm text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
            All projects
          </Link>
        </footer>

      </div>
    </article>
  );
}
