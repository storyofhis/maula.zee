"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Frontend Architect",
    company: "Design Research Hub",
    period: "2024 — Present",
    desc: "Leading the development of complex data visualization tools and design systems using React and Next.js.",
  },
  {
    role: "Backend Engineer",
    company: "SystemScale",
    period: "2022 — 2024",
    desc: "Scaled payment infrastructures and microservices using Node.js, Docker, and NATS messaging systems.",
  },
];

export default function HomeExperience() {
  return (
    <section className="py-24 border-t border-border-subtle dark:border-border-strong px-6 max-w-[1120px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary mb-4">
            Selected Experience
          </p>
          <p className="text-body-md text-ink-secondary dark:text-ink-tertiary leading-relaxed">
            A decade of crafting digital systems — from rapid prototypes to global infrastructure.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-16">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 gap-2">
                <h3 className="font-display text-display-md leading-snug tracking-tight text-ink-primary dark:text-ink-inverse group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150">
                  {exp.role}
                </h3>
                <span className="font-mono text-mono-sm text-ink-tertiary shrink-0">
                  {exp.period}
                </span>
              </div>
              <p className="text-body-sm font-medium text-ink-secondary dark:text-ink-tertiary mb-3">
                {exp.company}
              </p>
              <p className="text-body-md text-ink-secondary dark:text-ink-tertiary leading-relaxed max-w-2xl">
                {exp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
