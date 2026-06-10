"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function LikeButton({ slug }: { slug: string }) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    // 1. Fetch likes count and restore user state on mount
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

    // 2. Toggle like / unlike
    const handleToggle = async () => {
        const next = !liked;
        const delta = next ? 1 : -1;

        // Optimistic update
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
            // Revert optimistic update on error
            setLiked(!next);
            setLikes((prev) => Math.max(0, prev - delta));
            localStorage.setItem(`liked_${slug}`, !next ? "1" : "0");
            console.error("Failed to sync likes:", e);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center pt-12 pb-16 mt-8 select-none">
            {/* Massive Background Count */}
            <div className="text-[10rem] md:text-[14rem] font-black text-zinc-100/80 dark:text-zinc-800/40 pointer-events-none select-none tracking-tighter transition-all duration-500 leading-none">
                {Number.isNaN(likes) ? 0 : likes}
            </div>

            {/* Like Button Wrapper */}
            <div className="flex flex-col items-center z-10 -mt-16 md:-mt-24">
                <div className="relative">
                    {/* Glowing Aura Effect */}
                    <AnimatePresence>
                        {liked && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.15 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 blur-xl pointer-events-none z-0"
                            />
                        )}
                    </AnimatePresence>

                    {/* Circular Button */}
                    <motion.button
                        onClick={handleToggle}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className={`
                            relative flex items-center justify-center w-20 h-20 rounded-full border transition-all duration-300 z-10 shadow-lg cursor-pointer
                            ${liked
                                ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-500 shadow-emerald-500/10"
                                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                            }
                        `}
                        aria-label={liked ? "Unlike this post" : "Like this post"}
                    >
                        <Heart
                            className={`w-9 h-9 transition-all duration-300 ${liked ? "fill-emerald-500 scale-105" : ""}`}
                            strokeWidth={liked ? 1.5 : 2}
                        />
                    </motion.button>
                </div>

                {/* Helper text */}
                <p className="mt-3 text-[11px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    {liked ? "Click to unlike" : "Click to show love"}
                </p>
            </div>
        </div>
    );
}
