import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { glossy, makeRenderer } from "@/components/background/scene";

/*
 * Glossy 3D push button with an extruded book glyph (closed cover + page stack;
 * an original drawing, not an SF Symbol). Floats, tilts toward the cursor,
 * and presses down on hover.
 */

// White book glyph on transparent canvas, used as an alpha cut-out.
function bookTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  const rr = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
  };
  rr(58, 30, 146, 156, 18); // cover
  rr(66, 194, 130, 34, 10); // page block
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillRect(84, 30, 7, 156); // spine groove
  ctx.fillRect(66, 205, 130, 3); // page edges
  ctx.fillRect(66, 216, 130, 3);
  rr(108, 66, 70, 11, 5.5); // title lines
  rr(108, 88, 46, 11, 5.5);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function buildButton() {
  const g = new THREE.Group();
  // Dark housing the button sits in.
  const base = new THREE.Mesh(new RoundedBoxGeometry(2.05, 2.05, 0.3, 6, 0.5), glossy(0x111118, 0.4));
  base.position.z = -0.25;
  g.add(base);

  const cap = new THREE.Group();
  cap.add(new THREE.Mesh(new RoundedBoxGeometry(1.7, 1.7, 0.42, 8, 0.42), glossy(0x5f5fe0, 0.2)));

  // Glyph extruded by stacking alpha-tested slices: white face, lavender walls.
  const map = bookTexture();
  const plane = new THREE.PlaneGeometry(1.05, 1.05);
  const slices = 10;
  const face = new THREE.Color(0xffffff), wall = new THREE.Color(0xc4c5f2), deep = new THREE.Color(0x6a6ad8);
  for (let i = slices - 1; i >= 0; i--) {
    const color = i === 0 ? face : wall.clone().lerp(deep, i / (slices - 1));
    const slice = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ map, color, alphaTest: 0.5, transparent: true }));
    slice.position.z = 0.21 + 0.1 - i * 0.01;
    cap.add(slice);
  }
  g.add(cap);
  return { g, cap };
}

export function mountBookButton(canvas: HTMLCanvasElement, animate: boolean): () => void {
  const { renderer, scene } = makeRenderer(canvas, Math.min(devicePixelRatio, 2));
  scene.fog = null;
  scene.environmentIntensity = 0.8;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.z = 7.5;

  const { g, cap } = buildButton();
  const rig = new THREE.Group();
  rig.rotation.set(-0.35, 0.45, 0.06); // 3/4 view so the button's depth reads
  rig.add(g);
  scene.add(rig);

  const layout = () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  };

  const pointer = { x: 0, y: 0, over: 0 };
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    pointer.over = 1;
  };
  const onLeave = () => {
    pointer.x = pointer.y = pointer.over = 0;
  };

  // Springy press so the cap overshoots a little on release.
  const press = { x: 0, v: 0 };
  const tilt = { x: 0, y: 0 };
  let raf = 0;
  const start = performance.now();
  let prev = start;

  const frame = (now: number) => {
    const dt = Math.min((now - prev) / 1000, 1 / 30);
    prev = now;
    const t = (now - start) / 1000;

    press.v += (90 * (pointer.over - press.x) - 12 * press.v) * dt;
    press.x += press.v * dt;
    cap.position.z = -0.14 * press.x;

    const k = 1 - Math.exp(-dt * 6);
    tilt.x += (pointer.y * 0.3 - tilt.x) * k;
    tilt.y += (pointer.x * 0.4 - tilt.y) * k;
    g.rotation.set(tilt.x + 0.05 * Math.sin(t * 0.8), tilt.y + 0.07 * Math.sin(t * 0.6), 0);
    g.position.y = 0.08 * Math.sin(t * 1.2);

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
      const mat = o.material as THREE.Material & { map?: THREE.Texture | null };
      mat.map?.dispose();
      mat.dispose();
    });
    scene.environment?.dispose();
    renderer.dispose();
  };
}
