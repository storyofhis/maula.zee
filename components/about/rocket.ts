import * as THREE from "three";
import { glossy, makeRenderer } from "@/components/background/scene";

/*
 * Glossy 🚀 sticker: white clearcoat body, indigo nose and fins, glass porthole,
 * and a white inverted-hull outline for the die-cut sticker edge.
 * Scroll progress spins it; scroll speed feeds the flame.
 */


const lathe = (pts: [number, number][], color: number) =>
  new THREE.Mesh(new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), 48), glossy(color));

function buildRocket() {
  const rocket = new THREE.Group();
  rocket.add(
    lathe([[0, -0.9], [0.4, -0.88], [0.54, -0.55], [0.58, 0], [0.53, 0.5]], 0xf3f4fa),
    lathe([[0.53, 0.5], [0.42, 0.85], [0.22, 1.12], [0, 1.25]], 0x6464e8),
  );

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 16, 48), glossy(0xb9bccb));
  ring.position.set(0, 0.15, 0.55);
  const glass = new THREE.Mesh(new THREE.SphereGeometry(0.19, 32, 16), glossy(0x3552d6));
  glass.scale.z = 0.45;
  glass.position.set(0, 0.15, 0.55);
  rocket.add(ring, glass);

  const finShape = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(0.42, -0.32), new THREE.Vector2(0.44, -0.72), new THREE.Vector2(0, -0.46)]);
  const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.08, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3 });
  finGeo.translate(0.46, -0.3, -0.04);
  for (let i = 0; i < 3; i++) {
    const fin = new THREE.Mesh(finGeo, glossy(0x6464e8));
    fin.rotation.y = (i / 3) * Math.PI * 2 + Math.PI / 2;
    rocket.add(fin);
  }

  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.34, 0.18, 32), glossy(0x2a2a35));
  nozzle.position.y = -0.98;
  rocket.add(nozzle);

  // Die-cut sticker edge: back faces of a slightly larger copy, flat white.
  const outline = rocket.clone();
  const white = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });
  outline.traverse((o) => {
    if (o instanceof THREE.Mesh) o.material = white;
  });
  outline.scale.setScalar(1.07);

  const flame = new THREE.Group();
  const outer = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.7, 24), new THREE.MeshBasicMaterial({ color: 0xffa94d, transparent: true, opacity: 0.9 }));
  const inner = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.45, 24), new THREE.MeshBasicMaterial({ color: 0xfff1c9 }));
  outer.rotation.x = inner.rotation.x = Math.PI;
  inner.position.y = 0.08;
  flame.add(outer, inner);
  flame.position.y = -1.42;

  const root = new THREE.Group();
  root.add(outline, rocket, flame);
  return { root, flame };
}

export function mountRocket(canvas: HTMLCanvasElement, animate: boolean): () => void {
  // Scroll progress through the enclosing <section>, 0 → 1.
  const section = canvas.closest("section");
  const progress = () => {
    if (!section) return 0;
    const r = section.getBoundingClientRect();
    return Math.min(1, Math.max(0, (innerHeight * 0.4 - r.top) / r.height));
  };
  const { renderer, scene } = makeRenderer(canvas, Math.min(devicePixelRatio, 2));
  scene.fog = null;
  scene.environmentIntensity = 0.9;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.z = 8.5;

  const { root, flame } = buildRocket();
  // Emoji pose: nose pointing up and to the right.
  const pose = new THREE.Group();
  pose.rotation.z = -0.6;
  pose.add(root);
  scene.add(pose);

  const layout = () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  };

  let raf = 0;
  let prevP = progress();
  let speed = 0;
  const start = performance.now();
  let prev = start;

  const frame = (now: number) => {
    const dt = Math.max(1 / 240, Math.min((now - prev) / 1000, 1 / 30));
    prev = now;
    const t = (now - start) / 1000;
    const p = progress();
    speed += (Math.min(Math.abs(p - prevP) / dt, 2) - speed) * (1 - Math.exp(-dt * 6));
    prevP = p;

    root.rotation.y = p * Math.PI * 2 + t * 0.25;
    pose.position.y = 0.12 * Math.sin(t * 1.4) + speed * 0.25;
    pose.rotation.x = 0.15 * Math.sin(t * 0.9);
    flame.scale.set(1, 0.8 + 0.15 * Math.sin(t * 24) + speed * 1.2, 1);

    renderer.render(scene, camera);
    if (animate) raf = requestAnimationFrame(frame);
  };

  const resizeObserver = new ResizeObserver(() => {
    layout();
    if (!animate) frame(performance.now());
  });
  resizeObserver.observe(canvas);
  layout();
  if (animate) raf = requestAnimationFrame(frame);
  else frame(start);

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    scene.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    });
    scene.environment?.dispose();
    renderer.dispose();
  };
}
