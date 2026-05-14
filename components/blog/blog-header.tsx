"use client";

import { motion } from "framer-motion";

export function BlogHeader() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto mb-24"
        >
            <h1 className="text-6xl md:text-[8rem] font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none mb-8">
                WRITING<span className="text-zinc-400">.</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-xl md:text-2xl font-medium leading-relaxed">
                Exploring system architecture, interface design, and the future of human-machine interaction.
            </p>
        </motion.div>
    );
}
