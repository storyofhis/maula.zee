"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Available for new projects
          </span>
        </div>

        <h1 className="text-6xl md:text-[10rem] font-black tracking-tight leading-[0.85] mb-12">
          ENGINEER <br />
          <span className="text-zinc-400 dark:text-zinc-600">&</span> RESEARCHER<span className="text-blue-600">.</span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <p className="max-w-xl text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
            I build high-performance digital experiences at the intersection of <span className="text-zinc-900 dark:text-zinc-100">design architecture</span> and <span className="text-zinc-900 dark:text-zinc-100">system engineering</span>.
          </p>

          <div className="flex gap-4">
            <Link 
              href="/blog" 
              className="group flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            >
              Read Blog <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full font-bold transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              About Me
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
