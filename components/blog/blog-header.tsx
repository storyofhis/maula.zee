"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/molecules/page-header";
import { BookMark } from "@/components/blog/book-mark";

export function BlogHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
      <PageHeader
        eyebrow="Writing"
        heading="Thinking out loud about systems, craft, and the web."
        body="Exploring system architecture, interface design, and the future of human-machine interaction."
        className="mb-0!"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="hidden md:block shrink-0 -my-8 lg:mr-6"
      >
        <BookMark className="block size-64 lg:size-80" />
      </motion.div>
    </div>
  );
}
