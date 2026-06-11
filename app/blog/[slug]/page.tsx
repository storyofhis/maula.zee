import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog-data";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { CodeBlock } from "@/components/blog/code-block";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { ViewCounter } from "@/components/blog/view-counter";
import { LikeButton } from "@/components/blog/like-button";
import { CommentSection } from "@/components/blog/comment-section";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 pt-10 md:pt-32 pb-20 md:pb-40 px-5 md:px-4">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/blog"
                    className="group inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 font-bold mb-8 md:mb-16 transition-colors"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    BACK TO WRITING
                </Link>

                <header className="mb-10 md:mb-20">
                    <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 md:mb-8">
                        <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                        <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
                        <ViewCounter slug={slug} />
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-6 md:mb-10 leading-[1.05] md:leading-[0.95]">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap gap-3">
                        {post.tags.map((tag) => (
                            <span key={tag} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 rounded-full border border-zinc-200 dark:border-zinc-800">
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="prose prose-zinc dark:prose-invert max-w-none
                    prose-headings:font-black prose-headings:tracking-tighter
                    prose-h2:text-2xl md:prose-h2:text-3xl lg:prose-h2:text-4xl
                    prose-h3:text-xl md:prose-h3:text-2xl
                    prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400
                    prose-li:text-base md:prose-li:text-lg prose-li:text-zinc-600 dark:prose-li:text-zinc-400
                    prose-strong:text-zinc-950 dark:prose-strong:text-zinc-50
                    prose-blockquote:border-l-4 prose-blockquote:border-zinc-200 dark:prose-blockquote:border-zinc-800 prose-blockquote:italic
                    prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none
                    prose-img:rounded-lg prose-img:w-full
                    prose-table:text-sm
                ">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                        components={{
                            pre({ children }) {
                                return <CodeBlock>{children}</CodeBlock>;
                            },
                            a: ({ href, children }) => (
                                <a href={href} className="text-zinc-950 dark:text-zinc-50 underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-950 dark:hover:decoration-zinc-50 transition-colors">
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

                <footer className="mt-16 md:mt-32 pt-10 md:pt-16 border-t border-zinc-100 dark:border-zinc-900">
                    <div className="flex justify-between items-center">
                        <p className="text-zinc-400 font-medium">Thanks for reading.</p>
                        <Link
                            href="/blog"
                            className="text-zinc-900 dark:text-zinc-100 font-black tracking-tight hover:text-blue-600 transition-colors"
                        >
                            MORE STORIES →
                        </Link>
                    </div>
                </footer>
            </div>
        </article>
    );
}
