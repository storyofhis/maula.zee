import { getAllPosts } from "@/lib/blog-data";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogHeader } from "@/components/blog/blog-header";

export default function BlogPage() {
  const posts = getAllPosts().filter((p) => !p.tags.includes("Retrospective"));

  return (
    <main className="min-h-screen pt-16 pb-24 px-6 max-w-[1120px] mx-auto">
      <div aria-hidden="true" className="page-ambient pointer-events-none fixed inset-0 -z-10" />
      <BlogHeader />
      <BlogSearch posts={posts} />
    </main>
  );
}
