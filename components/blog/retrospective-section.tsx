"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

interface Props {
  posts: BlogPost[];
}

export function RetrospectiveSection({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="mb-20"
    >
      <div className="flex items-center gap-3 mb-6">
        <p className="font-mono text-mono-sm uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary">
          Notes
        </p>
        <div className="flex-1 h-px bg-border-subtle dark:bg-border-strong" />
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post, idx) => {
          const year = post.date.split(" ").at(-1) ?? post.date.slice(-4);

          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.07, ease: "easeOut" }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-6 md:gap-10 bg-bg-secondary dark:bg-bg-dark-muted border border-border-subtle dark:border-border-strong rounded-lg px-6 py-6 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150 ease-out"
              >
                {/* Year badge */}
                <div className="hidden md:flex flex-col items-center justify-center min-w-[64px]">
                  <span className="font-display text-display-xl font-black tracking-tighter text-border-default dark:text-border-strong group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150 leading-none">
                    {year}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 font-mono text-mono-sm text-ink-tertiary mb-3">
                    <span className="md:hidden">{year}</span>
                    <span className="md:hidden">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-display text-display-md leading-snug tracking-tight text-ink-primary dark:text-ink-inverse group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-body-md text-ink-secondary dark:text-ink-tertiary leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="mt-1 text-ink-tertiary group-hover:text-accent dark:group-hover:text-accent-dark group-hover:translate-x-1 transition-all duration-150 shrink-0"
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
