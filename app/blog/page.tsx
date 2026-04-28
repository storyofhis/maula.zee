import { BlogCard } from "@/components/blog/blog-card";
import { DUMMY_POSTS } from "@/lib/blog-data";

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white tracking-tight">Blog</h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
                    Thoughts, learnings, and insights on web development, design engineering, and the future of the product.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {DUMMY_POSTS.map((post) => (
                    <BlogCard key={post.slug} {...post} />
                ))}
            </div>
        </div>
    );
}