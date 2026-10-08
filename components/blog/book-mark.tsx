import { ThreeCanvas } from "@/components/atoms/three-canvas";

const load = () => import("./book-button").then((m) => m.mountBookButton);

/** 3D push button with a book glyph, for the writing page header. */
export function BookMark({ className = "" }: { className?: string }) {
  return <ThreeCanvas load={load} className={className} />;
}
