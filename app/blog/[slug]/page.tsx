import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog-data";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { CodeBlock } from "@/components/blog/code-block";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-3xl">
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

            <div className="prose prose-lg dark:prose-invert prose-slate max-w-none">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={{
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
