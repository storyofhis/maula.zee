"use client";

import { motion } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  period: string;
  desc: string;
  technologies?: string[];
  highlights?: string[];
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

interface Props {
  experiences: Experience[];
  educations: Education[];
}

export default function AboutExperience({ experiences, educations }: Props) {
  return (
    <>
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
              transition={{ duration: 0.5 }}
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
              <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed mt-4">
                {exp.technologies?.map((tech, i) => (
                  <span key={i} className="text-zinc-400 font-mono text-sm uppercase tracking-widest">
                    {tech} {i < exp.technologies!.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              {exp.highlights?.map((highlight, i) => (
                <div key={i} className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed mt-2">
                  <span className="mr-2">•</span> {highlight}
                </div>
              ))}
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
              transition={{ duration: 0.5 }}
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
    </>
  );
}
