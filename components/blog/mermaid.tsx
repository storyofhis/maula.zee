"use client";

import { useEffect, useId, useRef } from "react";

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const { default: mermaid } = await import("mermaid");
      const isDark = document.documentElement.classList.contains("dark");
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "neutral",
        themeVariables: { fontFamily: "inherit" },
      });
      const { svg } = await mermaid.render(`mermaid-${id}`, chart);
      if (!cancelled && ref.current) ref.current.innerHTML = svg;
    };

    render();

    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, { attributeFilter: ["class"] });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [chart, id]);

  return <div ref={ref} className="my-6 flex justify-center overflow-x-auto" />;
}
