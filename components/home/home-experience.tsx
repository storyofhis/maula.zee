"use client";

import { motion } from "framer-motion";

const experiences = [
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
];

export default function HomeExperience() {
  return (
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
            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
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
  );
}
