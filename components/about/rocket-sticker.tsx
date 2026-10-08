import { ThreeCanvas } from "@/components/atoms/three-canvas";

const load = () => import("./rocket").then((m) => m.mountRocket);

/** 🚀 sticker that spins with scroll progress through its enclosing <section>. */
export function RocketSticker({ className = "" }: { className?: string }) {
  return <ThreeCanvas load={load} className={className} />;
}
