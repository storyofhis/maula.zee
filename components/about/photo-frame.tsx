import Image from "next/image";
import { Camera } from "lucide-react";
import { GlassCard } from "@/components/atoms/glass-card";
import { script } from "@/lib/fonts";

const CORNERS = [
  "top-2.5 left-2.5 border-t border-l",
  "top-2.5 right-2.5 border-t border-r",
  "bottom-2.5 left-2.5 border-b border-l",
  "bottom-2.5 right-2.5 border-b border-r",
];

/** Polaroid-style glass frame. Pass `src` (a file in public/) once the photo exists. */
export function PhotoFrame({ src, alt = "Portrait of Zee" }: { src?: string; alt?: string }) {
  return (
    <div className="w-60 lg:w-72 rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
      <GlassCard className="p-3 pb-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-black/5 dark:border-white/8 bg-gradient-to-br from-accent/15 via-transparent to-accent-dark/10">
          {src ? (
            <Image src={src} alt={alt} fill sizes="288px" priority className="object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-ink-tertiary">
              <div className="flex flex-col items-center gap-2">
                <Camera size={22} strokeWidth={1.5} aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-widest">Photo coming soon</span>
              </div>
            </div>
          )}
          {CORNERS.map((c) => (
            <span key={c} aria-hidden="true" className={`absolute size-3 ${c} border-accent/60 dark:border-accent-dark/60`} />
          ))}
        </div>
        {/* Signature, like ink on the polaroid strip. */}
        <p className={`${script.className} relative mt-1 pl-2 -rotate-3 text-[40px] leading-none text-ink-primary/85 dark:text-ink-inverse/85`}>
          Zee
        </p>
      </GlassCard>
    </div>
  );
}
