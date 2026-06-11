"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { AvailabilityBadge } from "@/components/home/availability-badge";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social-icons";

export default function HomeHero() {
  return (
    <section className="pt-16 pb-12 md:pt-32 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-[720px]"
      >
        <AvailabilityBadge />

        <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary mb-6">
          Software Engineer &amp; Researcher
        </p>

        <h1 className="font-display text-display-xl leading-[1.1] tracking-tight text-ink-primary dark:text-ink-inverse mb-6 text-balance">
          Building at the edge of{" "}
          <span className="text-accent dark:text-accent-dark italic">design</span>{" "}
          and systems.
        </h1>

        <p className="text-body-lg text-ink-secondary dark:text-ink-tertiary max-w-[560px] mb-10 leading-relaxed">
          I craft high-performance digital experiences where design architecture
          meets system engineering — precise to the pixel, purposeful to the user.
        </p>

        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-accent text-ink-inverse px-5 py-2.5 rounded-md text-body-sm font-medium hover:bg-accent-hover transition-colors duration-150 group"
          >
            Read Blog
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-ink-secondary dark:text-ink-tertiary text-body-sm font-medium hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
          >
            About me →
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:azizi.maula@gmail.com"
            aria-label="Email"
            className="p-1.5 text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://github.com/storyofhis"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-1.5 text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
          >
            <GitHubIcon size={16} />
          </a>
          <a
            href="https://linkedin.com/in/mauladev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-1.5 text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
          >
            <LinkedInIcon size={16} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
