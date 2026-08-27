"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AstronautIcon } from "@/components/icons/astronaut-icon";


export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 38, damping: 14 });
  const springY = useSpring(mouseY, { stiffness: 38, damping: 14 });
  const rotX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const rotY = useTransform(springX, [-0.5, 0.5], [-20, 20]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:flex items-center justify-center relative w-[340px] h-[340px] shrink-0"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: "900px" }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-accent) 16%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* Float */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Mouse tilt */}
        <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
          {/* Pendulum */}
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: [-28, 28, -28], rotateX: [4, -4, 4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={{ position: "relative", width: "260px", height: "260px", transformStyle: "preserve-3d" }}>

              {/* Orbit ring 1 */}
              <div
                style={{
                  position: "absolute",
                  inset: "20px",
                  borderRadius: "50%",
                  border: "1px solid color-mix(in srgb, var(--color-accent) 38%, transparent)",
                  transform: "rotateX(72deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "8px", height: "8px",
                      borderRadius: "50%",
                      background: "var(--color-accent)",
                      top: "-4px", left: "calc(50% - 4px)",
                      boxShadow: "0 0 10px var(--color-accent), 0 0 22px color-mix(in srgb, var(--color-accent) 55%, transparent)",
                    }}
                  />
                </motion.div>
              </div>

              {/* Orbit ring 2 */}
              <div
                style={{
                  position: "absolute",
                  inset: "38px",
                  borderRadius: "50%",
                  border: "1px solid color-mix(in srgb, var(--color-accent) 24%, transparent)",
                  transform: "rotateX(72deg) rotateZ(55deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "5px", height: "5px",
                      borderRadius: "50%",
                      background: "color-mix(in srgb, var(--color-accent) 85%, white)",
                      top: "-2.5px", left: "calc(50% - 2.5px)",
                      boxShadow: "0 0 7px var(--color-accent)",
                    }}
                  />
                </motion.div>
              </div>

              {/* Orbit ring 3 */}
              <div
                style={{
                  position: "absolute",
                  inset: "-12px",
                  borderRadius: "50%",
                  border: "0.5px solid color-mix(in srgb, var(--color-accent) 14%, transparent)",
                  transform: "rotateX(72deg) rotateZ(115deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "4px", height: "4px",
                      borderRadius: "50%",
                      background: "color-mix(in srgb, var(--color-accent) 60%, transparent)",
                      top: "-2px", left: "calc(50% - 2px)",
                      boxShadow: "0 0 6px var(--color-accent)",
                    }}
                  />
                </motion.div>
              </div>

              {/* Central sphere */}
              <div
                style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  width: "76px", height: "76px",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                  style={{
                    position: "absolute", inset: 0,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    filter: "blur(16px)",
                  }}
                />
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "relative", zIndex: 1,
                    width: "100%", height: "100%",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 36% 30%, color-mix(in srgb, var(--color-accent) 100%, white 40%), color-mix(in srgb, var(--color-accent) 55%, transparent) 60%, color-mix(in srgb, var(--color-accent) 18%, transparent))",
                    boxShadow:
                      "0 0 32px color-mix(in srgb, var(--color-accent) 55%, transparent), 0 6px 24px rgba(0,0,0,0.28)",
                  }}
                />

                {/* Astronaut, tumbling gently in zero-g */}
                <motion.div
                  animate={{ rotate: [-9, 9, -9] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute", inset: 0, zIndex: 2,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <AstronautIcon size={40} className="text-ink-inverse" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest uppercase text-ink-tertiary select-none"
      >
        Zee World
      </motion.span>
    </motion.div>
  );
}
