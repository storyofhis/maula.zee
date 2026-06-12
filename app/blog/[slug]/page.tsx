import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { CodeBlock } from "@/components/blog/code-block";
import { Clock, Calendar } from "lucide-react";
import { ViewCounter } from "@/components/blog/view-counter";
import { LikeButton } from "@/components/blog/like-button";
import { CommentSection } from "@/components/blog/comment-section";
import { BackLink } from "@/components/molecules/back-link";
import { TechTag } from "@/components/atoms/tech-tag";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen bg-bg-primary dark:bg-bg-dark pt-10 md:pt-28 pb-20 md:pb-40 px-6">
      <div className="max-w-[720px] mx-auto">
        <BackLink href="/blog" label="Writing" />

        <header className="mb-10 md:mb-20">
          <div className="flex flex-wrap items-center gap-3 md:gap-5 font-mono text-mono-sm text-ink-tertiary mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {post.date}
            </span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readTime}
            </span>
            <span className="opacity-30">·</span>
            <ViewCounter slug={slug} />
          </div>

          <h1 className="font-display text-display-xl leading-[1.1] tracking-tight text-ink-primary dark:text-ink-inverse mb-8 text-balance">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TechTag key={tag}>{tag}</TechTag>
            ))}
          </div>
        </header>

        <div
          className="
            prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-display prose-headings:tracking-tight
            prose-h2:text-display-md prose-h2:mt-12 prose-h2:mb-4
            prose-h2:text-ink-primary dark:prose-h2:text-ink-inverse
            prose-h3:text-body-lg prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
            prose-h3:text-ink-primary dark:prose-h3:text-ink-inverse
            prose-p:text-body-md prose-p:leading-relaxed
            prose-p:text-ink-secondary dark:prose-p:text-ink-tertiary
            prose-li:text-body-md prose-li:text-ink-secondary dark:prose-li:text-ink-tertiary
            prose-strong:text-ink-primary dark:prose-strong:text-ink-inverse prose-strong:font-semibold
            prose-blockquote:border-l-2 prose-blockquote:border-accent dark:prose-blockquote:border-accent-dark
            prose-blockquote:not-italic prose-blockquote:pl-5
            prose-blockquote:text-ink-secondary dark:prose-blockquote:text-ink-tertiary
            prose-a:text-ink-primary dark:prose-a:text-ink-inverse
            prose-a:underline prose-a:underline-offset-4 prose-a:decoration-border-strong
            hover:prose-a:decoration-ink-primary dark:hover:prose-a:decoration-ink-inverse
            prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none
            prose-img:rounded-lg prose-img:w-full
            prose-table:text-body-sm
            prose-th:font-mono prose-th:text-mono-sm prose-th:uppercase prose-th:tracking-wide
            prose-th:text-ink-tertiary prose-th:font-normal
            prose-td:text-ink-secondary dark:prose-td:text-ink-tertiary
            prose-hr:border-border-subtle dark:prose-hr:border-border-strong
          "
        >
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
            {post.content}
          </ReactMarkdown>
        </div>

        <LikeButton slug={slug} />
        <CommentSection slug={slug} />

        <footer className="mt-16 md:mt-24 pt-10 border-t border-border-subtle dark:border-border-strong">
          <div className="flex items-center justify-between">
            <p className="text-body-sm text-ink-tertiary">Thanks for reading.</p>
            <Link
              href="/blog"
              className="font-mono text-mono-sm text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
            >
              More writing →
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
