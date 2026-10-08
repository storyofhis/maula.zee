import { ThreeCanvas } from "@/components/atoms/three-canvas";

const load = () => import("@/components/background/scene").then((m) => m.mountIcon);

/** 3D "building a project" mark: a code keycap settling onto a stack. */
export function BuildIcon({ className = "" }: { className?: string }) {
  return <ThreeCanvas load={load} className={className} />;
}
