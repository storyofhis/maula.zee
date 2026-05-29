"use client";
/* eslint-disable react-hooks/set-state-in-effect */

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
        posts.forEach(post => post.tags.forEach(tag => cats.add(tag)));
        return ["All", ...Array.from(cats)].sort();
    }, [posts]);

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase();
        return posts.filter((post) => {
            const matchesQuery = !query || `
                ${post.title}
                ${post.description}
                ${post.content}
                ${post.tags.join(" ")}
            `
                .replace(/[#_*`>\-\n]/g, " ")
                .toLowerCase()
                .includes(query);

            const matchesCategory = selectedCategory === "All" || post.tags.includes(selectedCategory);
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
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16">
                {/* Sidebar area - Fixed on Desktop */}
                <aside className="w-full lg:w-64 shrink-0">
                    <div className="sticky top-32 space-y-12">
                        {/* Search Bar */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                                Search
                            </h3>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Keywords..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-zinc-100 dark:focus:ring-zinc-800/50 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                                Filters
                            </h3>
                            <div className="flex flex-wrap lg:flex-col gap-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all text-left ${
                                            selectedCategory === cat
                                                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xl shadow-zinc-950/10"
                                                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory + search + currentPage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {paginatedPosts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {paginatedPosts.map((post, idx) => (
                                        <motion.div
                                            key={post.slug}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <BlogCard {...post} />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-40 text-center">
                                    <h2 className="text-2xl font-bold text-zinc-400">
                                        No entries found.
                                    </h2>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-20 flex justify-center items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all disabled:opacity-20"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            
                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                                            currentPage === page
                                                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg"
                                                : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all disabled:opacity-20"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}