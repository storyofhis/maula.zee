"use client";

import { motion } from "framer-motion";
import { GlassCard, PillTag } from "@/components/atoms/glass-card";
import { RocketSticker } from "@/components/about/rocket-sticker";

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
  // milestones: Milestone[];
}

export default function AboutExperience({ experiences, educations }: Props) {
  return (
    <>
      {/* <JourneyTimeline milestones={milestones} /> */}

      {/* Experience */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-32">
        <div className="lg:col-span-4">
          {/* Sticks while the cards scroll past; the rocket spins with scroll progress. */}
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary">
              Professional Experience
            </p>
            <RocketSticker className="hidden lg:block size-64 mt-6 -ml-6" />
          </div>
        </div>
        <div className="lg:col-span-8 space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GlassCard className="p-6 md:p-8">
              <div className="relative flex flex-col md:flex-row md:items-baseline justify-between mb-2 gap-2">
                <h3 className="font-display text-display-md leading-snug tracking-tight text-ink-primary dark:text-ink-inverse">
                  {exp.title}
                </h3>
                <span className="font-mono text-mono-sm text-ink-tertiary shrink-0">
                  {exp.period}
                </span>
              </div>

              <p className="relative text-body-sm font-medium text-ink-secondary dark:text-ink-tertiary mb-3">
                {exp.company}
              </p>

              <p className="relative text-body-md text-ink-secondary dark:text-ink-tertiary max-w-2xl leading-relaxed mb-4">
                {exp.desc}
              </p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="relative flex flex-wrap gap-1.5 mb-5">
                  {exp.technologies.map((tech) => (
                    <PillTag key={tech}>{tech}</PillTag>
                  ))}
                </div>
              )}

              {exp.highlights?.map((highlight, j) => (
                <p key={j} className="relative text-body-sm text-ink-secondary dark:text-ink-tertiary leading-relaxed flex gap-2">
                  <span className="text-accent dark:text-accent-dark mt-px">↗</span>
                  {highlight}
                </p>
              ))}
              </GlassCard>
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
        <div className="lg:col-span-8 space-y-4">
          {educations.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GlassCard className="p-6 md:p-8">
              <div className="relative flex flex-col md:flex-row md:items-baseline justify-between mb-2 gap-2">
                <h3 className="font-display text-display-md leading-snug tracking-tight text-ink-primary dark:text-ink-inverse">
                  {edu.degree}
                </h3>
                <span className="font-mono text-mono-sm text-ink-tertiary shrink-0">
                  {edu.period}
                </span>
              </div>

              <p className="relative text-body-sm font-medium text-ink-secondary dark:text-ink-tertiary mb-3">
                {edu.institution}
              </p>

              <p className="relative text-body-md text-ink-secondary dark:text-ink-tertiary max-w-2xl leading-relaxed">
                {edu.description}
              </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
