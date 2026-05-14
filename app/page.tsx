"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, X, ExternalLink } from "lucide-react";

const fadeUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-zinc-100 dark:selection:bg-zinc-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Experience Section - Editorial Style */}
      <section className="py-32 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-bold mb-6 tracking-tighter">SELECTED EXPERIENCE</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
                A decade of crafting digital systems, from rapid prototypes to global infrastructure.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-24">
              {[
                {
                  role: "Frontend Architect",
                  company: "Design Research Hub",
                  period: "2024 — Present",
                  desc: "Leading the development of complex data visualization tools and design systems using React and Next.js."
                },
                {
                  role: "Backend Engineer",
                  company: "SystemScale",
                  period: "2022 — 2024",
                  desc: "Scaled payment infrastructures and microservices using Node.js, Docker, and NATS messaging systems."
                }
              ].map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group relative"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">
                      {exp.role} / {exp.company}
                    </h3>
                    <span className="text-zinc-400 font-mono text-sm uppercase tracking-widest">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                    {exp.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Teaser Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tight">
            DEEP <span className="text-zinc-400">THOUGHTS</span>.
          </h2>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-4 text-2xl font-bold group"
          >
            View all articles 
            <div className="w-12 h-12 rounded-full border border-zinc-900 dark:border-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all">
              <ArrowRight size={24} />
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-zinc-100 dark:border-zinc-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <p className="text-2xl font-bold tracking-tighter mb-2">ZEE.</p>
              <p className="text-zinc-500 dark:text-zinc-400">&copy; 2026 Crafted with precision.</p>
            </div>

            <div className="flex gap-8">
              <a href="#" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"><X size={24} /></a>
              <a href="#" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"><Globe size={24} /></a>
              <a href="#" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"><ExternalLink size={24} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
