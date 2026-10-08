import { ThreeCanvas } from "@/components/atoms/three-canvas";

const load = () => import("./dollar").then((m) => m.mountDollar);

/** 3D "$" for the values section: value, literally. */
export function DollarMark({ className = "" }: { className?: string }) {
  return <ThreeCanvas load={load} className={className} />;
}
