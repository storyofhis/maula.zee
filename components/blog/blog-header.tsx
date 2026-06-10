"use client";

import { motion } from "framer-motion";

export function BlogHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-16"
    >
      <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary mb-6">
        Writing
      </p>
      <h1 className="font-display text-display-xl leading-[1.1] tracking-tight text-ink-primary dark:text-ink-inverse mb-6 text-balance max-w-[640px]">
        Thinking out loud about systems, craft, and the web.
      </h1>
      <p className="text-body-lg text-ink-secondary dark:text-ink-tertiary max-w-[480px] leading-relaxed">
        Exploring system architecture, interface design, and the future of human-machine interaction.
      </p>
    </motion.div>
  );
}
