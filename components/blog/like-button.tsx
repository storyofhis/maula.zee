"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function LikeButton({ slug }: { slug: string }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/likes/${slug}`);
        const data = await res.json();
        setLikes(Number(data.likes) || 0);
      } catch (e) {
        console.error("Failed to fetch likes:", e);
      }
    };

    fetchLikes();
    const stored = localStorage.getItem(`liked_${slug}`);
    if (stored === "1") setLiked(true);
  }, [slug]);

  const handleToggle = async () => {
    const next = !liked;
    const delta = next ? 1 : -1;

    setLiked(next);
    setLikes((prev) => Math.max(0, prev + delta));
    localStorage.setItem(`liked_${slug}`, next ? "1" : "0");

    try {
      const res = await fetch(`/api/likes/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: delta }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setLikes(data.likes ?? likes);
    } catch (e) {
      setLiked(!next);
      setLikes((prev) => Math.max(0, prev - delta));
      localStorage.setItem(`liked_${slug}`, !next ? "1" : "0");
      console.error("Failed to sync likes:", e);
    }
  };

  const count = Number.isNaN(likes) ? 0 : likes;

  return (
    <div className="relative flex flex-col items-center justify-center pt-12 pb-16 mt-8 select-none">
      <div
        className="text-[10rem] md:text-[14rem] font-display font-semibold
          text-border-subtle dark:text-border-strong/30
          pointer-events-none select-none tracking-tighter
          transition-all duration-500 leading-none"
      >
        {count}
      </div>

      <div className="flex flex-col items-center z-10 -mt-16 md:-mt-24">
        <div className="relative">
          <AnimatePresence>
            {liked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.15 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 rounded-full bg-accent/15 dark:bg-accent-dark/10 blur-xl pointer-events-none z-0"
              />
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleToggle}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label={liked ? "Unlike this post" : "Like this post"}
            className={`
              relative flex items-center justify-center w-20 h-20 rounded-full
              border transition-all duration-300 z-10 shadow-card cursor-pointer
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40
              ${liked
                ? "bg-accent-subtle dark:bg-accent/10 border-accent/40 dark:border-accent-dark/40 text-accent dark:text-accent-dark"
                : "bg-bg-primary dark:bg-bg-dark-muted border-border-default dark:border-border-strong text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse hover:border-border-strong"
              }
            `}
          >
            <Heart
              className={`w-8 h-8 transition-all duration-300 ${
                liked ? "fill-accent dark:fill-accent-dark scale-105" : ""
              }`}
              strokeWidth={liked ? 1.5 : 2}
            />
          </motion.button>
        </div>

        <p className="mt-4 font-mono text-label uppercase tracking-widest text-ink-tertiary">
          {liked ? "Click to unlike" : "Click to show love"}
        </p>
      </div>
    </div>
  );
}
