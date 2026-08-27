"use client";

import { motion } from "framer-motion";

const statements: string[] = [
    "I'd rather try something and be wrong than theorize about it and be right too late. Trial and error is how I actually learn — ship the small version, see what breaks, fix the real thing instead of the imagined one.",
  "I don't give up when the first direction turns out wrong — I back up, try the next one, and keep going until something actually holds. Getting stuck isn't the problem; stopping is.",
];

export default function AboutValues() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-32">
      <div className="lg:col-span-4">
        <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary">
          What I Value
        </p>
      </div>
      <div className="lg:col-span-8 space-y-4">
        {statements.map((statement, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-bg-secondary dark:bg-bg-dark-muted border border-border-subtle dark:border-border-strong rounded-lg px-6 py-6"
          >
            <p className="text-body-lg text-ink-primary dark:text-ink-inverse max-w-2xl leading-relaxed">
              {statement}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
