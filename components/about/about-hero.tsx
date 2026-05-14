"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mb-32"
    >
      <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.85] mb-12">
        STORY <br />
        <span className="text-zinc-400 dark:text-zinc-600">&</span> ETHOS<span className="text-blue-600">.</span>
      </h1>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        <p className="max-w-2xl text-xl md:text-3xl text-zinc-500 dark:text-zinc-400 leading-tight font-medium">
          I am a Product Engineer who thrives at the intersection of <span className="text-zinc-950 dark:text-zinc-50">technical complexity</span> and <span className="text-zinc-950 dark:text-zinc-50">minimalist aesthetics</span>.
        </p>
      </div>
    </motion.section>
  );
}
