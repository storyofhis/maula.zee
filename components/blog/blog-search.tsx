"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPost } from "@/lib/blog-data";

interface Props {
  posts: BlogPost[];
}

const POSTS_PER_PAGE = 8;

export function BlogSearch({ posts }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => cats.add(tag)));
    return ["All", ...Array.from(cats).sort()];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        !query ||
        `${post.title} ${post.description} ${post.content} ${post.tags.join(" ")}`
          .replace(/[#_*`>\-\n]/g, " ")
          .toLowerCase()
          .includes(query);
      const matchesCategory =
        selectedCategory === "All" || post.tags.includes(selectedCategory);
      return matchesQuery && matchesCategory;
    });
  }, [search, posts, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  return (
    <div className="w-full">
      {/* Search + filters */}
      <div className="mb-10 space-y-4">
        <div className="relative group max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary group-focus-within:text-ink-primary dark:group-focus-within:text-ink-inverse transition-colors duration-150" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-border-default dark:border-border-strong pl-9 pr-4 py-2 bg-bg-secondary dark:bg-bg-dark-muted text-body-sm text-ink-primary dark:text-ink-inverse placeholder:text-ink-tertiary focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors duration-150"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-mono-sm px-3 py-1.5 rounded-sm border transition-colors duration-150 ${
                selectedCategory === cat
                  ? "bg-accent text-ink-inverse border-accent"
                  : "text-ink-secondary dark:text-ink-tertiary border-border-default dark:border-border-strong hover:text-ink-primary dark:hover:text-ink-inverse hover:border-border-strong dark:hover:border-border-default bg-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory + search + currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedPosts.map((post, idx) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, ease: "easeOut" }}
                >
                  <BlogCard {...post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <p className="font-mono text-mono-sm text-ink-tertiary">No articles found.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-md border border-border-default dark:border-border-strong text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse hover:bg-bg-secondary dark:hover:bg-bg-dark-muted transition-colors duration-150 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-md font-mono text-mono-sm transition-colors duration-150 ${
                currentPage === page
                  ? "bg-accent text-ink-inverse"
                  : "text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse hover:bg-bg-secondary dark:hover:bg-bg-dark-muted"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-md border border-border-default dark:border-border-strong text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse hover:bg-bg-secondary dark:hover:bg-bg-dark-muted transition-colors duration-150 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
