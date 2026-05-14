import { getAllPosts } from "@/lib/blog-data";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogHeader } from "@/components/blog/blog-header";

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 pt-32 pb-20 px-4">
            <BlogHeader />
            <BlogSearch posts={posts} />
        </main>
    );
}