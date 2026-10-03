"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useTheme } from "@/components/providers/theme-provider";

const SURABAYA: [number, number] = [-7.2575, 112.7521];

export default function ContactGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dark = theme === "dark";
    let width = canvas.offsetWidth;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phiRef.current,
      theta: 0.3,
      dark: dark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: dark ? 6 : 4,
      baseColor: dark ? [0.3, 0.3, 0.3] : [0.9, 0.9, 0.9],
      markerColor: [0.357, 0.357, 0.839],
      glowColor: dark ? [0.3, 0.3, 0.4] : [1, 1, 1],
      markers: [{ location: SURABAYA, size: 0.08 }],
    });

    let frame: number;
    const animate = () => {
      phiRef.current += 0.004;
      globe.update({ phi: phiRef.current });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
        globe.update({ width: width * 2, height: width * 2 });
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [theme]);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[320px]"
      style={{ contain: "layout paint size" }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
