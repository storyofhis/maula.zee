"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Download } from "lucide-react";

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

export default function AboutPage() {
  const educations = [
    {
      institution: "Institut Teknologi Sepuluh Nopember (ITS)",
      degree: "Bachelor of Computer Science",
      period: "2020 - 2024",
      description: "Focused on software engineering, algorithms, and system design. Graduated with honors and completed a thesis on scalable web applications."
    },
    {
      institution: "Apple Developer Academy @ BINUS, Tangerang",
      degree: "Apple Certified Product Engineer (iOS Development)",
      period: "March 2026 - Now",
      description: "Intensive program focused on iOS development, covering Swift programming, UI/UX design, and app deployment. Currently working on a capstone project to develop a social networking app for local communities."
    }
  ];

  const experiences = [
    {
      title: "Software Engineer", 
      company: "Bayarind Artha Internusa (Bayarind)",
      period: "2024 - 2026",
      desc: "Specialized in backend development including payment gateway integration and microservices. Developed SNAP-standard payment services using Go, NATS, and PostgreSQL."
    },
    {
      title: "Frontend Software Engineer",
      company: "Dinas Pendidikan Kota Surabaya",
      period: "2022 - 2023",
      desc: "Built modern web applications with a focus on performance and UX using Next.js, TypeScript, and Redux."
    },
    {
      title: "Backend Engineer Intern", 
      company: "Lingotalk",
      period: "2022",
      desc: "Focused on backend development and system design for high-performance applications using Node.js and FaunaDB."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-zinc-100 dark:selection:bg-zinc-800">
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-40">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Biography Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">BIOGRAPHY</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-8 text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              <p>
                I'm a software engineer with a deep-rooted passion for building scalable, high-performance systems. 
                My journey began with a fascination for crafting seamless user interfaces, which eventually led me 
                into the world of robust backend architectures and payment systems.
              </p>
              <p>
                I believe that software is more than just code—it's a medium for solving real-world problems 
                with elegance and precision. Whether it's optimizing a database query or refining a micro-interaction, 
                I strive for excellence in every detail.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">PROFESSIONAL EXPERIENCE</h2>
          </div>
          <div className="lg:col-span-8 space-y-24">
            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="text-3xl font-black tracking-tight group-hover:text-blue-600 transition-colors">
                    {exp.title}
                  </h3>
                  <span className="text-zinc-400 font-mono text-sm uppercase tracking-widest">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
                  {exp.company}
                </p>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                  {exp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">EDUCATION</h2>
          </div>
          <div className="lg:col-span-8 space-y-24">
            {educations.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="text-3xl font-black tracking-tight group-hover:text-blue-600 transition-colors">
                    {edu.degree}
                  </h3>
                  <span className="text-zinc-400 font-mono text-sm uppercase tracking-widest">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
                  {edu.institution}
                </p>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stack & CTA Section */}
        <section className="border-t border-zinc-100 dark:border-zinc-900 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">CONTACT</h2>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tight leading-none">
                LET'S BUILD <br />
                <span className="text-zinc-400">THE FUTURE</span>.
              </h2>
              
              <div className="flex flex-wrap gap-4 mb-24">
                <a 
                  href="mailto:contact@zee.dev" 
                  className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
                >
                  <Mail size={20} /> Get in Touch
                </a>
                <button 
                  className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full font-bold transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <Download size={20} /> Download CV
                </button>
              </div>

              <div className="flex gap-12">
                <Link href="/" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 font-bold transition-colors">HOME</Link>
                <Link href="/blog" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 font-bold transition-colors">WRITING</Link>
                <a href="#" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 font-bold transition-colors">X / TWITTER</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
