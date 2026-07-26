"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const draw = (delay: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { delay, duration: 0.7, ease: "easeInOut" }, opacity: { delay, duration: 0.2 } },
  },
});

const fade = (delay: number) => ({
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.4 } },
});

const SLIDES = [
  { label: "The Canvas" },
  { label: "Understand, then help" },
  { label: "Product-User Fit" },
] as const;

export function ValuePropositionCanvasDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const t = (duration: number) => ({ duration: reduceMotion ? 0 : duration });

  return (
    <figure className="not-prose my-10" style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        initial={reduceMotion ? false : { opacity: 0, rotateX: 8, y: 24 }}
        animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
        transition={t(0.7)}
        className="rounded-lg border border-border-subtle dark:border-border-strong/30 bg-bg-secondary dark:bg-bg-dark-muted p-4 md:p-8"
      >
        <svg viewBox="0 0 900 480" className="w-full h-auto" style={{ overflow: "visible" }}>
          <defs>
            <filter id="vpc-sketch" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" />
            </filter>
            <marker id="vpc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="fill-ink-tertiary" />
            </marker>
            <marker id="vpc-arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="fill-accent dark:fill-accent-dark" />
            </marker>
          </defs>

          <g style={{ filter: "url(#vpc-sketch)" }} className="stroke-ink-secondary" fill="none" strokeWidth={2} strokeLinecap="round">
            {/* Value Map square */}
            <motion.rect x={90} y={100} width={280} height={280} rx={4} variants={draw(0)} initial="hidden" animate={inView ? "visible" : "hidden"} />
            {/* vertex sits ~45% in from the left edge, matching the reference sketch's Products & Services wedge */}
            <motion.path d="M215,240 L370,100" variants={draw(0.4)} initial="hidden" animate={inView ? "visible" : "hidden"} />
            <motion.path d="M215,240 L370,380" variants={draw(0.5)} initial="hidden" animate={inView ? "visible" : "hidden"} />

            {/* User Profile circle */}
            <motion.circle cx={700} cy={240} r={140} variants={draw(0.15)} initial="hidden" animate={inView ? "visible" : "hidden"} />
            <motion.path d="M700,240 L700,380" variants={draw(0.55)} initial="hidden" animate={inView ? "visible" : "hidden"} />
            <motion.path d="M700,240 L579,170" variants={draw(0.6)} initial="hidden" animate={inView ? "visible" : "hidden"} />
            <motion.path d="M700,240 L821,170" variants={draw(0.65)} initial="hidden" animate={inView ? "visible" : "hidden"} />

            {/* converging fit arrows, always present */}
            <motion.path d="M375,240 L388,240" markerEnd="url(#vpc-arrow)" variants={draw(0.9)} initial="hidden" animate={inView ? "visible" : "hidden"} strokeDasharray="3 4" />
            <motion.path d="M555,240 L542,240" markerEnd="url(#vpc-arrow)" variants={draw(0.9)} initial="hidden" animate={inView ? "visible" : "hidden"} strokeDasharray="3 4" />
          </g>

          {/* static labels */}
          <g fontFamily="var(--font-sans)" className="fill-ink-primary dark:fill-ink-inverse" textAnchor="middle">
            <motion.text x={290} y={155} fontSize={15} fontWeight={600} variants={fade(1)} initial="hidden" animate={inView ? "visible" : "hidden"}>Gain creators</motion.text>
            <motion.text x={290} y={330} fontSize={15} fontWeight={600} variants={fade(1)} initial="hidden" animate={inView ? "visible" : "hidden"}>Pain relievers</motion.text>
            <motion.g variants={fade(1)} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <text x={110} y={234} fontSize={15} fontWeight={600} textAnchor="start">Products &amp;</text>
              <text x={110} y={254} fontSize={15} fontWeight={600} textAnchor="start">services</text>
            </motion.g>

            <motion.text x={700} y={160} fontSize={15} fontWeight={600} variants={fade(1)} initial="hidden" animate={inView ? "visible" : "hidden"}>Gains</motion.text>
            <motion.text x={775} y={295} fontSize={15} fontWeight={600} variants={fade(1)} initial="hidden" animate={inView ? "visible" : "hidden"}>User jobs</motion.text>
            <motion.text x={630} y={295} fontSize={15} fontWeight={600} variants={fade(1)} initial="hidden" animate={inView ? "visible" : "hidden"}>Pains</motion.text>

            <motion.g variants={fade(1.1)} initial="hidden" animate={inView ? "visible" : "hidden"} fontFamily="var(--font-mono)" className="fill-ink-tertiary">
              <text x={230} y={412} fontSize={12} letterSpacing={0.5}>VALUE MAP</text>
              <text x={700} y={412} fontSize={12} letterSpacing={0.5}>USER PROFILE</text>
            </motion.g>
          </g>

          {/* Slide 2 — the process callouts */}
          <g fontFamily="var(--font-sans)" className="fill-accent dark:fill-accent-dark" style={{ filter: "url(#vpc-sketch)" }}>
            <g className="stroke-accent dark:stroke-accent-dark" strokeWidth={1.5} fill="none">
              <motion.path d="M660,64 L700,100" strokeDasharray="2 4" initial={{ pathLength: 0 }} animate={{ pathLength: step === 1 ? 1 : 0 }} transition={t(0.4)} />
              <motion.path d="M250,64 L300,100" strokeDasharray="2 4" initial={{ pathLength: 0 }} animate={{ pathLength: step === 1 ? 1 : 0 }} transition={{ ...t(0.4), delay: reduceMotion ? 0 : 0.15 }} />
              <motion.path d="M250,388 L165,378" strokeDasharray="2 4" initial={{ pathLength: 0 }} animate={{ pathLength: step === 1 ? 1 : 0 }} transition={{ ...t(0.4), delay: reduceMotion ? 0 : 0.3 }} />
            </g>
            <motion.g animate={{ opacity: step === 1 ? 1 : 0 }} transition={t(0.35)}>
              <circle cx={648} cy={50} r={13} className="fill-accent dark:fill-accent-dark" />
              <text x={648} y={55} fontSize={13} fontWeight={700} textAnchor="middle" className="fill-ink-inverse" fontFamily="var(--font-mono)">1</text>
              <text x={670} y={46} fontSize={12.5} fontWeight={500}>Understand your user:</text>
              <text x={670} y={62} fontSize={12.5} fontWeight={500}>their pains &amp; gains</text>
            </motion.g>
            <motion.g animate={{ opacity: step === 1 ? 1 : 0 }} transition={{ ...t(0.35), delay: reduceMotion ? 0 : 0.15 }}>
              <circle cx={238} cy={50} r={13} className="fill-accent dark:fill-accent-dark" />
              <text x={238} y={55} fontSize={13} fontWeight={700} textAnchor="middle" className="fill-ink-inverse" fontFamily="var(--font-mono)">2</text>
              <text x={260} y={46} fontSize={12.5} fontWeight={500}>Identify how</text>
              <text x={260} y={62} fontSize={12.5} fontWeight={500}>we can help them</text>
            </motion.g>
            <motion.g animate={{ opacity: step === 1 ? 1 : 0 }} transition={{ ...t(0.35), delay: reduceMotion ? 0 : 0.3 }}>
              <circle cx={30} cy={400} r={13} className="fill-accent dark:fill-accent-dark" />
              <text x={30} y={405} fontSize={13} fontWeight={700} textAnchor="middle" className="fill-ink-inverse" fontFamily="var(--font-mono)">3</text>
              <text x={52} y={396} fontSize={12.5} fontWeight={500}>Brainstorm on the</text>
              <text x={52} y={412} fontSize={12.5} fontWeight={500}>possible products</text>
            </motion.g>
          </g>

          {/* Slide 3 — the payoff */}
          <g style={{ filter: "url(#vpc-sketch)" }} className="stroke-accent dark:stroke-accent-dark" fill="none" strokeWidth={2} strokeLinecap="round">
            <motion.path d="M300,110 C380,30 620,30 660,110" markerEnd="url(#vpc-arrow2)" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: step === 2 ? 1 : 0, opacity: step === 2 ? 1 : 0 }} transition={t(0.8)} />
            <motion.path d="M660,370 C620,450 380,450 300,370" markerEnd="url(#vpc-arrow2)" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: step === 2 ? 1 : 0, opacity: step === 2 ? 1 : 0 }} transition={{ ...t(0.8), delay: reduceMotion ? 0 : 0.15 }} />
          </g>
          <motion.g fontFamily="var(--font-mono)" className="fill-accent dark:fill-accent-dark" textAnchor="middle" animate={{ opacity: step === 2 ? 1 : 0 }} transition={{ ...t(0.4), delay: reduceMotion ? 0 : 0.5 }}>
            <text x={480} y={50} fontSize={13} fontWeight={600}>★ VITAMIN</text>
            <text x={480} y={445} fontSize={13} fontWeight={600}>💊 REMEDY</text>
            <text x={410} y={210} fontSize={11} letterSpacing={0.5}>CREATE</text>
            <text x={522} y={210} fontSize={11} letterSpacing={0.5}>OBSERVE</text>
          </motion.g>
          <motion.g animate={{ opacity: step === 2 ? 1 : 0, scale: step === 2 ? 1 : 0.85 }} transition={{ ...t(0.4), delay: reduceMotion ? 0 : 0.65 }} style={{ transformOrigin: "465px 240px" }}>
            <rect x={390} y={224} width={150} height={32} rx={16} className="fill-accent dark:fill-accent-dark" />
            <text x={465} y={245} fontSize={12} fontWeight={600} textAnchor="middle" className="fill-ink-inverse" fontFamily="var(--font-sans)">Product-User Fit</text>
          </motion.g>
        </svg>
      </motion.div>

      <figcaption className="mt-4 flex items-center justify-between">
        <span className="font-mono text-mono-sm text-ink-tertiary">
          Value Proposition Canvas — sketched from a Ci Valen session at Apple Developer Academy
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setStep((s) => (s - 1) as 0 | 1 | 2)}
            disabled={step === 0}
            aria-label="Previous slide"
            className="text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse disabled:opacity-30 disabled:hover:text-ink-secondary dark:disabled:hover:text-ink-tertiary transition-colors duration-150"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.label}
                onClick={() => setStep(i as 0 | 1 | 2)}
                role="tab"
                aria-selected={step === i}
                aria-label={slide.label}
                className={`h-1.5 rounded-full transition-all duration-150 ${
                  step === i ? "w-4 bg-accent dark:bg-accent-dark" : "w-1.5 bg-border-default hover:bg-border-strong"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setStep((s) => (s + 1) as 0 | 1 | 2)}
            disabled={step === 2}
            aria-label="Next slide"
            className="text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse disabled:opacity-30 disabled:hover:text-ink-secondary dark:disabled:hover:text-ink-tertiary transition-colors duration-150"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
