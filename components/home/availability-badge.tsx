"use client";

import { motion } from "framer-motion";

export function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="inline-flex items-center gap-2.5 mb-8
        px-3.5 py-1.5 rounded-full
        bg-accent-subtle/40 dark:bg-accent/[0.08]
        border border-accent/20 dark:border-accent-dark/20
        backdrop-blur-sm
        shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-none"
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent dark:bg-accent-dark opacity-40" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent dark:bg-accent-dark" />
      </span>

      <span className="font-mono text-[11px] tracking-wide text-accent/80 dark:text-accent-dark/80 leading-none select-none">
        Currently open for remote opportunities
      </span>
    </motion.div>
  );
}
