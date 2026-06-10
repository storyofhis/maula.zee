import { getAllPosts } from "@/lib/blog-data";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogHeader } from "@/components/blog/blog-header";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen pt-16 pb-24 px-6 max-w-[1120px] mx-auto">
      <BlogHeader />
      <BlogSearch posts={posts} />
    </main>
  );
}
