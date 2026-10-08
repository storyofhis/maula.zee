"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/atoms/glass-card";
import { DollarMark } from "@/components/about/dollar-mark";
import { script } from "@/lib/fonts";

const statements: string[] = [
  "I'd rather try something and be wrong than theorize about it and be right too late. Trial and error is how I actually learn: ship the small version, see what breaks, fix the real thing instead of the imagined one.",
  "I don't give up when the first direction turns out wrong. I back up, try the next one, and keep going until something actually holds. Getting stuck isn't the problem; stopping is.",
];

// Extruded handwriting (stacked 1px shadows) on the first card's top edge, written in when first seen.
function ValuesLabel() {
  return (
    <div className="absolute -top-11 left-4 z-10 -rotate-3">
      <h2 className="sr-only">My values</h2>
      <motion.p
        aria-hidden="true"
        initial={{ clipPath: "inset(-30% 100% -40% -10%)" }}
        whileInView={{ clipPath: "inset(-30% -10% -40% -10%)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className={`${script.className} text-[52px] leading-none text-[#6E6EE8] dark:text-[#A9AAFF] [text-shadow:0_1px_0_#5252C8,1px_2px_0_#4646B4,2px_3px_0_#3B3BA0,3px_4px_0_#31318A,4px_5px_0_#282874,6px_10px_14px_rgb(30_30_90/0.35)] dark:[text-shadow:0_1px_0_#8586F0,1px_2px_0_#6E6EDC,2px_3px_0_#5A5AC4,3px_4px_0_#4848A8,4px_5px_0_#37378A,6px_10px_16px_rgb(0_0_0/0.6)]`}
      >
        my values
      </motion.p>
      <svg viewBox="0 0 220 16" aria-hidden="true" className="w-full h-3 text-accent/60 dark:text-accent-dark/60" fill="none">
        <motion.path
          d="M4 10 C 50 4, 110 14, 216 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.3 }}
        />
      </svg>
    </div>
  );
}

export default function AboutValues() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-32">
      <div className="hidden lg:flex lg:col-span-4 items-center justify-center">
        <DollarMark className="block size-64" />
      </div>
      <div className="lg:col-span-8 space-y-4 pt-10">
        {statements.map((statement, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {i === 0 && <ValuesLabel />}
            <GlassCard className={`px-6 ${i === 0 ? "pt-10 pb-6" : "py-6"}`}>
              <p className="relative text-body-lg text-ink-primary dark:text-ink-inverse max-w-2xl leading-relaxed">
                {statement}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
