import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog-data";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { CodeBlock } from "@/components/blog/code-block";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Blog
            </Link>
            
            <header className="mb-10">
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <time dateTime={post.date}>{post.date}</time>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {post.readTime}
                    </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                    {post.title}
                </h1>
                
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-slate prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:font-bold prose-strong:text-slate-900 dark:prose-strong:text-white prose-em:italic prose-em:text-slate-700 dark:prose-em:text-slate-300 prose-code:text-red-600 dark:prose-code:text-red-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={{
                        // Custom components for better styling
                        h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-4">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold mt-4 mb-3">{children}</h3>,
                        p: ({ children }) => <p className="my-4 leading-7">{children}</p>,
                        strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
                        em: ({ children }) => <em className="italic text-slate-800 dark:text-slate-200">{children}</em>,
                        a: ({ href, children }) => (
                            <a href={href} className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300">
                                {children}
                            </a>
                        ),
                        ul: ({ children }) => <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>,
                        li: ({ children }) => <li className="ml-2">{children}</li>,
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-slate-300 dark:border-slate-700 pl-4 italic my-4 text-slate-600 dark:text-slate-400">
                                {children}
                            </blockquote>
                        ),
                        pre({ children, ...props }) {
                            return (
                                <CodeBlock>
                                    <pre {...props}>
                                        {children}
                                    </pre>
                                </CodeBlock>
                            );
                        }
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}
