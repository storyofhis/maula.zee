"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/atoms/section-label";

interface PageHeaderProps {
  eyebrow: string;
  heading: React.ReactNode;
  body?: React.ReactNode;
  headingWidth?: string;
  bodyWidth?: string;
  className?: string;
}

export function PageHeader({
  eyebrow,
  heading,
  body,
  headingWidth = "max-w-[640px]",
  bodyWidth = "max-w-[480px]",
  className = "",
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-16 ${className}`}
    >
      <SectionLabel className="mb-6">{eyebrow}</SectionLabel>
      <h1
        className={`font-display text-display-xl leading-[1.1] tracking-tight text-ink-primary dark:text-ink-inverse mb-6 text-balance ${headingWidth}`}
      >
        {heading}
      </h1>
      {body && (
        <div
          className={`text-body-lg text-ink-secondary dark:text-ink-tertiary leading-relaxed ${bodyWidth}`}
        >
          {body}
        </div>
      )}
    </motion.div>
  );
}
