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
      {/* Experience */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-32">
        <div className="lg:col-span-4">
          <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary">
            Professional Experience
          </p>
        </div>
        <div className="lg:col-span-8 space-y-10 md:space-y-16">
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
                  {exp.title}
                </h3>
                <span className="font-mono text-mono-sm text-ink-tertiary shrink-0">
                  {exp.period}
                </span>
              </div>

              <p className="text-body-sm font-medium text-ink-secondary dark:text-ink-tertiary mb-3">
                {exp.company}
              </p>

              <p className="text-body-md text-ink-secondary dark:text-ink-tertiary max-w-2xl leading-relaxed mb-4">
                {exp.desc}
              </p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-mono-sm text-ink-secondary dark:text-ink-tertiary bg-bg-secondary dark:bg-bg-dark-muted border border-border-subtle dark:border-border-strong px-2.5 py-1 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {exp.highlights?.map((highlight, j) => (
                <p key={j} className="text-body-sm text-ink-secondary dark:text-ink-tertiary leading-relaxed flex gap-2">
                  <span className="text-accent dark:text-accent-dark mt-px">↗</span>
                  {highlight}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-32">
        <div className="lg:col-span-4">
          <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary">
            Education
          </p>
        </div>
        <div className="lg:col-span-8 space-y-10 md:space-y-16">
          {educations.map((edu, i) => (
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
                  {edu.degree}
                </h3>
                <span className="font-mono text-mono-sm text-ink-tertiary shrink-0">
                  {edu.period}
                </span>
              </div>

              <p className="text-body-sm font-medium text-ink-secondary dark:text-ink-tertiary mb-3">
                {edu.institution}
              </p>

              <p className="text-body-md text-ink-secondary dark:text-ink-tertiary max-w-2xl leading-relaxed">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
