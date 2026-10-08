"use client";

import { useEffect, useRef } from "react";
import { useMotionEnv } from "@/lib/use-motion-env";

export type MountFn = (canvas: HTMLCanvasElement, animate: boolean) => () => void;

/**
 * Canvas for a small Three.js scene. `load` should be a stable (module-level)
 * dynamic import, so three stays out of the main bundle. No WebGL → nothing renders.
 */
export function ThreeCanvas({ load, className = "" }: { load: () => Promise<MountFn>; className?: string }) {
  const env = useMotionEnv();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!env || !canvas) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;

    load().then((mount) => {
      if (cancelled) return;
      try {
        dispose = mount(canvas, !env.endsWith(":reduced"));
      } catch {
        // No WebGL: the surrounding layout reads fine without it.
      }
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [env, load]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
