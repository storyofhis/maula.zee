"use client";

import { useEffect, useRef } from "react";
import { useMotionEnv } from "@/lib/use-motion-env";

/**
 * Dark 3D scene of floating keycaps and interface objects behind the page.
 * Three.js is loaded on demand from ./scene, so it stays out of the main bundle.
 */
export default function FloatingScene() {
  const env = useMotionEnv();
  const nearRef = useRef<HTMLCanvasElement>(null);
  const farRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const near = nearRef.current;
    if (!env || !near) return;
    const [tier, reduced] = env.split(":");
    let dispose: (() => void) | undefined;
    let cancelled = false;

    import("./scene").then(({ mountScene }) => {
      if (cancelled) return;
      try {
        dispose = mountScene({
          near,
          far: farRef.current,
          strength: reduced ? 0 : tier === "desktop" ? 1 : tier === "tablet" ? 0.5 : 0,
          animate: !reduced,
          lite: tier === "mobile",
        });
      } catch {
        // No WebGL: the CSS ambient gradient alone is an acceptable fallback.
      }
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [env]);

  if (!env) return null;

  return (
    <div aria-hidden="true" className="floating-scene pointer-events-none fixed inset-0 -z-10">
      {!env.startsWith("mobile") && <canvas ref={farRef} className="floating-scene-far absolute inset-0 h-full w-full" />}
      <canvas ref={nearRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
