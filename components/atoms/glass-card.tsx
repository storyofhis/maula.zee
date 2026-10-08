"use client";

import type { PointerEvent, ReactNode } from "react";

// Spotlight + border glow follow the cursor via CSS vars; no React state per move.
function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Bordered glass surface shared by project, value, and experience cards. */
export function GlassCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      onPointerMove={trackPointer}
      className={`glass-card group relative rounded-xl border border-black/10 dark:border-white/12 bg-white/80 dark:bg-white/[0.035] hover:border-black/20 dark:hover:border-white/20 ${className}`}
    >
      {children}
    </div>
  );
}

export function PillTag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-wide text-ink-secondary dark:text-ink-tertiary bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] px-2 py-0.5 rounded-full">
      {children}
    </span>
  );
}
