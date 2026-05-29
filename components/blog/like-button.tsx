"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface HeartParticle {
    id: number;
    x: number;
    y: number;
}

export function LikeButton({ slug }: { slug: string }) {
    const [likes, setLikes] = useState(0);
    const [userLikes, setUserLikes] = useState(0);
    const [particles, setParticles] = useState<HeartParticle[]>([]);
    const pendingLikesRef = useRef(0);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 1. Fetch likes count on mount
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const res = await fetch(`/api/likes/${slug}`);
                const data = await res.json();
                setLikes(data.likes || 0);
            } catch (e) {
                console.error("Failed to fetch likes:", e);
            }
        };

        fetchLikes();

        // Load local user likes
        const stored = localStorage.getItem(`likes_${slug}`);
        if (stored) {
            setUserLikes(parseInt(stored, 10));
        }
    }, [slug]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    // 2. Debounced sync to database
    const syncLikesToServer = async (count: number) => {
        try {
            const res = await fetch(`/api/likes/${slug}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ count }),
            });
            const data = await res.json();
            setLikes(data.likes);
        } catch (e) {
            console.error("Failed to sync likes:", e);
        }
    };

    // 3. Handle click
    const handleLike = () => {
        if (userLikes >= 10) return; // Limit to max 10 likes per user

        // 1. Optimistic UI update
        setUserLikes((prev) => {
            const next = prev + 1;
            localStorage.setItem(`likes_${slug}`, next.toString());
            return next;
        });
        setLikes((prev) => prev + 1);

        // 2. Spawn a flying heart particle
        const newParticle: HeartParticle = {
            id: Date.now() + Math.random(),
            x: (Math.random() - 0.5) * 60, // Random horizontal sway
            y: -60 - Math.random() * 60,   // Random upward travel
        };
        setParticles((prev) => [...prev, newParticle]);

        // 3. Debounce POST request to database
        pendingLikesRef.current += 1;
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            const toSync = pendingLikesRef.current;
            pendingLikesRef.current = 0;
            syncLikesToServer(toSync);
        }, 600);
    };

    const removeParticle = (id: number) => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
    };

    const hasLiked = userLikes > 0;
    const isMaxLiked = userLikes >= 10;

    return (
        <div className="relative flex flex-col items-center justify-center pt-12 pb-16 mt-8 select-none">
            {/* Massive Background Count (like in Clarence's blog) */}
            <div className="text-[10rem] md:text-[14rem] font-black text-zinc-100/80 dark:text-zinc-800/40 pointer-events-none select-none tracking-tighter transition-all duration-500 leading-none">
                {likes}
            </div>

            {/* Like Button Wrapper */}
            <div className="flex flex-col items-center z-10 -mt-16 md:-mt-24">
                <div className="relative">
                    {/* Glowing Aura Effect */}
                    <AnimatePresence>
                        {hasLiked && (
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
                        onClick={handleLike}
                        disabled={isMaxLiked}
                        whileHover={{ scale: isMaxLiked ? 1 : 1.08 }}
                        whileTap={{ scale: isMaxLiked ? 1 : 0.92 }}
                        className={`
                            relative flex items-center justify-center w-20 h-20 rounded-full border transition-all duration-300 z-10 shadow-lg
                            ${hasLiked
                                ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-500 shadow-emerald-500/10"
                                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                            }
                            ${isMaxLiked ? "cursor-not-allowed opacity-90" : "cursor-pointer"}
                        `}
                        aria-label="Like this post"
                    >
                        <Heart
                            className={`w-9 h-9 transition-transform duration-300 ${hasLiked ? "fill-emerald-500 scale-105" : ""}`}
                            strokeWidth={hasLiked ? 1.5 : 2}
                        />

                        {/* Visual indicator of likes remainder */}
                        {hasLiked && !isMaxLiked && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-md animate-pulse">
                                +{userLikes}
                            </span>
                        )}

                        {isMaxLiked && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-600 text-[10px] font-bold text-white shadow-md">
                                ✓
                            </span>
                        )}
                    </motion.button>

                    {/* Floating Heart Particles Reaction */}
                    <AnimatePresence>
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                initial={{ opacity: 1, scale: 0.8, x: 0, y: 0 }}
                                animate={{
                                    opacity: 0,
                                    scale: 1.5,
                                    x: particle.x,
                                    y: particle.y,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                onAnimationComplete={() => removeParticle(particle.id)}
                                className="absolute pointer-events-none text-emerald-500 dark:text-emerald-400 z-30"
                                style={{
                                    top: "25%",
                                    left: "35%",
                                }}
                            >
                                <Heart className="w-6 h-6 fill-emerald-500" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Helper text */}
                <p className="mt-3 text-[11px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    {isMaxLiked
                        ? "Thanks for loving!"
                        : hasLiked
                            ? `Loved ${userLikes}/10 times`
                            : "Click to show love"}
                </p>
            </div>
        </div>
    );
}
