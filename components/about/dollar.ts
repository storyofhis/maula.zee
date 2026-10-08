import * as THREE from "three";
import { glossy, makeRenderer } from "@/components/background/scene";

import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/*
 * Double-stroke "$": an S with modulated stroke width (heavy spine, light terminals),
 * extruded with a soft bevel, pierced top-to-bottom by two polished bars. Floats, flips like a coin
 * every few seconds, tilts toward the cursor.
 */


// Outline of the S: offset the spine curve to both sides, stroke width peaking mid-spine.
function sShape() {
  const spine = new THREE.CatmullRomCurve3(
    [[0.44, 0.44], [0.24, 0.66], [-0.1, 0.7], [-0.38, 0.52], [-0.36, 0.22], [0, 0.02], [0.36, -0.2], [0.4, -0.5], [0.14, -0.7], [-0.2, -0.68], [-0.44, -0.44]]
      .map(([x, y]) => new THREE.Vector3(x, y, 0)),
    false,
    "centripetal",
  );
  const n = 120;
  const left: THREE.Vector2[] = [], right: THREE.Vector2[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const p = spine.getPoint(t), tan = spine.getTangent(t);
    const w = 0.07 + 0.065 * Math.exp(-(((t - 0.5) / 0.16) ** 2));
    left.push(new THREE.Vector2(p.x - tan.y * w, p.y + tan.x * w));
    right.push(new THREE.Vector2(p.x + tan.y * w, p.y - tan.x * w));
  }
  return new THREE.Shape([...left, ...right.reverse()]);
}

function buildDollar() {
  const g = new THREE.Group();
  const depth = 0.2;
  const geo = new THREE.ExtrudeGeometry(sShape(), {
    depth, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.025, bevelSegments: 5, curveSegments: 1,
  });
  geo.translate(0, 0, -depth / 2);
  g.add(new THREE.Mesh(geo, glossy(0x5f5fe0, 0.3)));

  const steel = new THREE.MeshPhysicalMaterial({ color: 0xe6e8f4, roughness: 0.12, metalness: 1, clearcoat: 0.6 });
  // Bars run through the S's thickness, so they show only above, below, and in its counters.
  for (const x of [-0.11, 0.11]) {
    const bar = new THREE.Mesh(new RoundedBoxGeometry(0.07, 2.1, 0.07, 3, 0.03), steel);
    bar.position.set(x, 0, 0);
    g.add(bar);
  }

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.25, 0.012, 16, 200),
    new THREE.MeshPhysicalMaterial({ color: 0x6b6bd6, roughness: 0.3, metalness: 0.8, transparent: true, opacity: 0.5 }),
  );
  ring.rotation.x = 1.2;
  return { g, ring };
}

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);

export function mountDollar(canvas: HTMLCanvasElement, animate: boolean): () => void {
  const { renderer, scene } = makeRenderer(canvas, Math.min(devicePixelRatio, 2));
  scene.fog = null;
  scene.environmentIntensity = 0.8;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.z = 7;

  const { g, ring } = buildDollar();
  const rig = new THREE.Group();
  rig.add(g, ring);
  scene.add(rig);

  const layout = () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  };

  const pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  const onLeave = () => {
    pointer.x = pointer.y = 0;
  };

  let raf = 0;
  const start = performance.now();
  let prev = start;
  const FLIP_EVERY = 6, FLIP_FOR = 1.2;

  const frame = (now: number) => {
    const dt = Math.min((now - prev) / 1000, 1 / 30);
    prev = now;
    const t = (now - start) / 1000;

    // Coin flip: one eased full turn at the end of each cycle, a gentle sway otherwise.
    const cycle = Math.floor(t / FLIP_EVERY);
    const local = Math.max(0, (t % FLIP_EVERY) - (FLIP_EVERY - FLIP_FOR)) / FLIP_FOR;
    g.rotation.y = (cycle + easeInOut(local)) * Math.PI * 2 + 0.35 * Math.sin(t * 0.9);
    g.position.y = 0.08 * Math.sin(t * 1.3);
    ring.rotation.z = t * 0.35;

    const k = 1 - Math.exp(-dt * 6);
    tilt.x += (pointer.y * 0.35 - tilt.x) * k;
    tilt.y += (pointer.x * 0.45 - tilt.y) * k;
    rig.rotation.set(tilt.x, tilt.y, 0);

    renderer.render(scene, camera);
    if (animate) raf = requestAnimationFrame(frame);
  };

  const resizeObserver = new ResizeObserver(() => {
    layout();
    if (!animate) frame(performance.now());
  });
  resizeObserver.observe(canvas);
  layout();
  if (animate) {
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);
  } else {
    frame(start);
  }

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerleave", onLeave);
    scene.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    });
    scene.environment?.dispose();
    renderer.dispose();
  };
}
