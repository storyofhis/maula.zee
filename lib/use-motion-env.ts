import { useSyncExternalStore } from "react";

const QUERY = {
  desktop: "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
  tablet: "(min-width: 768px)",
  reduced: "(prefers-reduced-motion: reduce)",
};

function subscribe(onChange: () => void) {
  const lists = Object.values(QUERY).map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

// "desktop" | "tablet" | "mobile", suffixed with ":reduced" for reduced motion.
function snapshot(): string {
  const m = (q: string) => window.matchMedia(q).matches;
  const tier = m(QUERY.desktop) ? "desktop" : m(QUERY.tablet) ? "tablet" : "mobile";
  return m(QUERY.reduced) ? `${tier}:reduced` : tier;
}

const serverSnapshot = () => null;

/** Device tier + reduced-motion flag; null during SSR. */
export function useMotionEnv() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
