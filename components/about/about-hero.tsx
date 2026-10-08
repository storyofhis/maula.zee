"use client";

import { motion } from "framer-motion";
import { PhotoFrame } from "@/components/about/photo-frame";

const PHOTO_SRC = "/me.webp";

export default function AboutHero() {
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12 md:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary mb-6">
          Who I Am
        </p>

        <h1 className="font-display text-display-xl leading-[1.15] md:leading-[1.1] tracking-tight text-ink-primary dark:text-ink-inverse mb-6 md:mb-8 text-balance max-w-[640px]">
          A Product Engineer who thrives where{" "}
          <span className="text-accent dark:text-accent-dark italic">technical complexity</span>{" "}
          meets minimalist aesthetics.
        </h1>

        <p className="text-body-lg text-ink-secondary dark:text-ink-tertiary max-w-[560px] leading-relaxed">
          I believe the best interfaces are the ones users never have to think about.
          Every interaction should feel inevitable in hindsight.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="shrink-0 self-center md:mr-4 lg:mr-10"
      >
        <PhotoFrame src={PHOTO_SRC} />
      </motion.div>
    </section>
  );
}
