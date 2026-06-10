"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-24"
    >
      <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary mb-6">
        Story &amp; Ethos
      </p>

      <h1 className="font-display text-display-xl leading-[1.1] tracking-tight text-ink-primary dark:text-ink-inverse mb-8 text-balance max-w-[720px]">
        A Product Engineer who thrives where{" "}
        <span className="text-accent dark:text-accent-dark italic">technical complexity</span>{" "}
        meets minimalist aesthetics.
      </h1>

      <p className="text-body-lg text-ink-secondary dark:text-ink-tertiary max-w-[560px] leading-relaxed">
        I believe the best interfaces are the ones users never have to think about —
        where every interaction feels inevitable in hindsight.
      </p>
    </motion.section>
  );
}
