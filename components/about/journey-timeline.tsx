"use client";

import { motion } from "framer-motion";
import { AstronautIcon } from "@/components/icons/astronaut-icon";

export interface Milestone {
  tag: string;
  period: string;
}

export default function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative mb-16 md:mb-24">
      <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary mb-10">
        The Journey
      </p>

      <div className="relative flex flex-col md:flex-row md:justify-between gap-8 md:gap-4">
        {/* trajectory — mobile: vertical, desktop: horizontal */}
        <div
          className="md:hidden absolute left-2 top-2 bottom-2 w-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--color-border-default) 0 4px, transparent 4px 9px)",
          }}
        />
        <div
          className="hidden md:block absolute left-4 right-4 top-2 h-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, var(--color-border-default) 0 4px, transparent 4px 9px)",
          }}
        />

        {milestones.map((m, i) => {
          const isCurrent = i === milestones.length - 1;
          return (
            <motion.div
              key={m.tag}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="relative z-10 flex md:flex-col items-center md:items-start gap-3"
            >
              <div className="relative shrink-0 w-4 h-4 flex items-center justify-center">
                {isCurrent && (
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: "var(--color-accent)", filter: "blur(6px)" }}
                  />
                )}
                {isCurrent ? (
                  <div
                    className="relative w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "var(--color-accent)", boxShadow: "0 0 10px var(--color-accent)" }}
                  >
                    <AstronautIcon size={9} className="text-ink-inverse" />
                  </div>
                ) : (
                  <div className="w-[7px] h-[7px] rounded-full bg-border-default dark:bg-border-strong" />
                )}
              </div>

              <div>
                <p className="font-mono text-mono-sm text-ink-primary dark:text-ink-inverse">
                  {m.tag}
                </p>
                <p
                  className={`font-mono text-[10px] ${isCurrent ? "text-accent dark:text-accent-dark" : "text-ink-tertiary"}`}
                >
                  {m.period}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
