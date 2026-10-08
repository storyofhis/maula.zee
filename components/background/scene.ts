import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/*
 * Floating hardware objects in a dark 3D space.
 * Two canvases share one camera: the far layer renders at low resolution behind
 * a CSS blur (cheap depth of field), the near layer renders sharp on top.
 * Everything runs in one rAF loop: no React, no per-frame allocation.
 */

type Kind = "key" | "cube" | "knob" | "toggle" | "panel" | "pyramid" | "ring" | "text";

type Def = {
  kind: Kind;
  at: [number, number]; // viewport position, -1..1 (x right, y up)
  z: number; // depth; the camera sits at CAM_Z, anything behind FAR_Z goes to the blurred layer
  size: number;
  rot: [number, number, number]; // degrees
  glyph?: string; // keycap legend, or the line of text for kind "text"
  corner?: boolean; // legend sits bottom-right instead of centered
  w?: number; // keycap units
  h?: number;
  lite?: boolean; // kept on mobile
};

// The hero column (left-center) stays empty; weight sits on the corners and the right edge.
const DEFS: Def[] = [
  // foreground
  { kind: "key", glyph: "⌘", corner: true, at: [-1.02, -0.82], z: 2.6, size: 1.2, rot: [14, 18, -9], lite: true },
  { kind: "cube", at: [0.98, -0.78], z: 2, size: 0.95, rot: [24, -28, 12], lite: true },
  // midground
  { kind: "text", glyph: "hello world", at: [0.5, 0.06], z: 0.5, size: 0.9, rot: [6, -18, -3] },
  { kind: "key", glyph: "↵", w: 1.3, h: 1.6, at: [0.86, 0.6], z: 0, size: 1, rot: [10, -16, 7], lite: true },
  { kind: "knob", at: [0.93, -0.3], z: -1, size: 0.75, rot: [-12, -22, 0] },
  { kind: "key", glyph: "esc", at: [0.56, -0.86], z: -1.2, size: 0.7, rot: [16, -10, 9] },
  { kind: "ring", at: [0.12, -1.05], z: -0.5, size: 1.6, rot: [58, 10, -14] },
  { kind: "toggle", at: [-0.95, -0.12], z: -2.6, size: 0.8, rot: [8, 20, -6] },
  { kind: "ring", at: [0.42, 0.68], z: -2.6, size: 0.75, rot: [58, -30, 20] },
  // background
  { kind: "key", glyph: "↑", at: [-0.9, 0.82], z: -4.5, size: 0.9, rot: [12, 14, -12], lite: true },
  { kind: "pyramid", at: [0.15, 0.84], z: -5.5, size: 0.7, rot: [30, 0, 20] },
  { kind: "panel", at: [0.22, -0.72], z: -4.2, size: 1, rot: [18, -12, -8] },
  { kind: "key", at: [-0.25, -0.92], z: -7, size: 0.9, rot: [20, -20, 15] },
  { kind: "ring", at: [-0.05, 0.7], z: -8, size: 1.1, rot: [64, 20, 0] },
];

const CAM_Z = 10;
const FOV = 32;
const FAR_Z = -3;
const RADIUS = 320; // px, cursor field radius
const IDLE_MS = 1500;
const BG = { dark: 0x050507, light: 0xfafaf9 };

const DEG = Math.PI / 180;
const tanHalf = Math.tan((FOV / 2) * DEG);
const smooth = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

/* ── Materials ─────────────────────────────────────────── */

// Cool, faint emissive is the hover "edge light"; base intensity lives in userData.
function physical(p: THREE.MeshPhysicalMaterialParameters, glow = 0) {
  const m = new THREE.MeshPhysicalMaterial({ emissive: 0x2a2aa0, emissiveIntensity: glow, ...p });
  m.userData.glow = glow;
  return m;
}

const body = () => physical({ color: 0x0c0c11, roughness: 0.5, metalness: 0.25, clearcoat: 0.45, clearcoatRoughness: 0.5 });
const face = () => physical({ color: 0x18181f, roughness: 0.72, metalness: 0.1, clearcoat: 0.2, clearcoatRoughness: 0.65 });
const metal = (flat = false) => physical({ color: 0x2a2a35, roughness: 0.32, metalness: 0.85, flatShading: flat });
const pale = () => physical({ color: 0xc6c8de, roughness: 0.35, metalness: 0.3 });
/** Candy-shiny sticker plastic shared by the rocket, the $, and the book button. */
export const glossy = (color: number, metalness = 0.1) =>
  new THREE.MeshPhysicalMaterial({ color, roughness: 0.25, metalness, clearcoat: 1, clearcoatRoughness: 0.12 });

/* ── Geometry ──────────────────────────────────────────── */

// Narrow the top of a +Z-facing box so its side walls slope like a real keycap.
function taper(geo: THREE.BufferGeometry, depth: number, k: number) {
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const s = 1 - (1 - k) * ((pos.getZ(i) + depth / 2) / depth);
    pos.setXY(i, pos.getX(i) * s, pos.getY(i) * s);
  }
  return geo;
}

function glyphTexture(glyph: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${glyph.length > 1 ? 400 : 300} ${glyph.length > 1 ? 112 : 168}px -apple-system, "SF Pro Display", "Segoe UI Symbol", system-ui, sans-serif`;
  ctx.fillText(glyph, 128, 136);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Mono text drawn once with the fallback font, redrawn when Geist Mono is ready.
function textTexture(text: string) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 192;
  const ctx = c.getContext("2d")!;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const family = getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim() || "monospace";
  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "middle";
    ctx.font = `500 140px ${family}`;
    ctx.fillText(text, 12, 100);
    tex.needsUpdate = true;
  };
  draw();
  document.fonts.load(`500 140px ${family}`).then(draw, () => {});
  document.fonts.ready.then(draw);
  return tex;
}

function softTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.5, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function build(def: Def): THREE.Group {
  const g = new THREE.Group();
  switch (def.kind) {
    case "key": {
      const w = def.w ?? 1, h = def.h ?? 1, depth = 0.5;
      // Tapered body + slightly proud top plate: the seam between them is the bevel line.
      g.add(new THREE.Mesh(taper(new RoundedBoxGeometry(w, h, depth, 5, 0.12), depth, 0.86), body()));
      const top = new THREE.Mesh(new RoundedBoxGeometry(w * 0.86 - 0.1, h * 0.86 - 0.1, 0.08, 4, 0.035), face());
      top.position.z = depth / 2;
      g.add(top);
      if (def.glyph) {
        const size = def.corner ? 0.24 : 0.42;
        const legend = new THREE.Mesh(
          new THREE.PlaneGeometry(size, size),
          new THREE.MeshBasicMaterial({ map: glyphTexture(def.glyph), color: 0xb0b4cc, transparent: true, opacity: 0.7, depthWrite: false }),
        );
        legend.position.set(def.corner ? w * 0.22 : 0, def.corner ? -h * 0.22 : 0, depth / 2 + 0.045);
        g.add(legend);
      }
      break;
    }
    case "cube":
      g.add(new THREE.Mesh(new RoundedBoxGeometry(1, 1, 1, 6, 0.2), body()));
      break;
    case "knob": {
      // Faceted side reads as knurling; chamfered metal cap; pale indicator notch.
      const inner = new THREE.Group();
      inner.rotation.x = Math.PI / 2;
      inner.add(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.52, 0.42, 44, 1, true), metal(true)));
      const cap = [[0, 0.21], [0.42, 0.21], [0.47, 0.195], [0.5, 0.16], [0.5, 0.15]].map(([x, y]) => new THREE.Vector2(x, y));
      inner.add(new THREE.Mesh(new THREE.LatheGeometry(cap, 64), metal()));
      const notch = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.012, 0.2), pale());
      notch.position.set(0, 0.215, -0.24);
      inner.add(notch);
      g.add(inner);
      break;
    }
    case "toggle": {
      const pill = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.55, 8, 24), body());
      pill.rotation.z = Math.PI / 2;
      pill.scale.z = 0.55;
      const thumb = new THREE.Mesh(new THREE.SphereGeometry(0.19, 32, 16), pale());
      thumb.scale.z = 0.75;
      thumb.position.set(-0.22, 0, 0.08);
      g.add(pill, thumb);
      break;
    }
    case "panel": {
      g.add(new THREE.Mesh(new RoundedBoxGeometry(2.2, 0.32, 0.14, 4, 0.06), body()));
      const track = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.016, 0.02), metal());
      track.position.z = 0.075;
      const handle = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.2, 0.08, 3, 0.03), pale());
      handle.position.set(0.5, 0, 0.09);
      g.add(track, handle);
      break;
    }
    case "pyramid": {
      const p = new THREE.Mesh(
        new THREE.ConeGeometry(0.6, 0.45, 4, 1),
        physical({ color: 0x5c5c8a, roughness: 0.45, metalness: 0.4, flatShading: true }),
      );
      p.rotation.set(Math.PI / 2, Math.PI / 4, 0);
      g.add(p);
      break;
    }
    case "text": {
      // Extruded by stacking alpha-tested slices: bright face, indigo walls fading to dark.
      const map = textTexture(def.glyph ?? "");
      const plane = new THREE.PlaneGeometry(2.8, 0.525);
      const slices = 16;
      const front = new THREE.Color(0xeef0ff), wall = new THREE.Color(0x5048b8), back = new THREE.Color(0x0d0b22);
      for (let i = slices - 1; i >= 0; i--) {
        const k = i / (slices - 1);
        const color = i === 0 ? front : wall.clone().lerp(back, k);
        const slice = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ map, color, alphaTest: 0.5, transparent: true }));
        slice.position.z = -i * 0.012;
        g.add(slice);
      }
      // Blinking caret just after the last character.
      const caret = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 0.12), new THREE.MeshBasicMaterial({ color: 0x8f9cff }));
      caret.name = "caret";
      caret.position.set(1.32, -0.17, -0.05);
      g.add(caret);
      // AR anchor brackets around the text.
      const pts: number[] = [];
      const [x, y, l] = [1.55, 0.4, 0.16];
      for (const [sx, sy] of [[-1, 1], [1, 1], [1, -1], [-1, -1]]) {
        pts.push(sx * x, sy * y, 0, sx * (x - l), sy * y, 0, sx * x, sy * y, 0, sx * x, sy * (y - l), 0);
      }
      const brackets = new THREE.LineSegments(
        new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pts, 3)),
        new THREE.LineBasicMaterial({ color: 0x8f9cff, transparent: true, opacity: 0.55 }),
      );
      brackets.name = "brackets";
      g.add(brackets);
      break;
    }
    case "ring":
      g.add(new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.012, 16, 220),
        physical({ color: 0x6b6bd6, roughness: 0.3, metalness: 0.8, transparent: true, opacity: 0.4 }, 0.25),
      ));
      break;
  }
  return g;
}

/* ── Scene ─────────────────────────────────────────────── */

type Spring = { v: number; x: number };
const spring = (): Spring => ({ v: 0, x: 0 });
function stepSpring(s: Spring, target: number, k: number, damp: number, dt: number) {
  s.v += (k * (target - s.x) - damp * s.v) * dt;
  s.x += s.v * dt;
}

export function makeRenderer(canvas: HTMLCanvasElement, pixelRatio: number) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.04).texture;
  scene.environmentIntensity = 0.35;
  room.dispose();
  pmrem.dispose();

  // Cool key light from the upper left, violet rim from behind-right, dark purple ambient.
  const key = new THREE.DirectionalLight(0xa9bbff, 2.4);
  key.position.set(-6, 7, 6);
  const rim = new THREE.DirectionalLight(0x8b6cff, 2.6);
  rim.position.set(7, -2, -5);
  scene.add(key, rim, new THREE.HemisphereLight(0x2a2352, 0x050507, 1.2));
  scene.fog = new THREE.Fog(BG.dark, 9, 20);
  return { renderer, scene };
}

export type SceneOptions = {
  near: HTMLCanvasElement;
  far: HTMLCanvasElement | null; // null → background objects are skipped
  strength: number; // cursor response, 0 disables it
  animate: boolean; // false → render one static frame
  lite: boolean; // mobile: only `lite` objects
};

export function mountScene({ near, far, strength, animate, lite }: SceneOptions): () => void {
  const dpr = Math.min(devicePixelRatio, lite ? 1.25 : 1.75);
  const nearL = makeRenderer(near, dpr);
  // Low resolution + CSS blur on the far canvas = soft focus for distant objects.
  const farL = far ? makeRenderer(far, 0.6) : null;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60);
  camera.position.z = CAM_Z;

  const cursorLight = new THREE.PointLight(0x8f9cff, 0, 7, 1.5);
  nearL.scene.add(cursorLight);

  const shadowTex = softTexture();
  const shadowGeo = new THREE.PlaneGeometry(1, 1);

  const items = DEFS.filter((d) => (!lite || d.lite) && (farL || d.z >= FAR_Z)).map((def) => {
    const scene = def.z < FAR_Z ? farL!.scene : nearL.scene;
    const group = build(def);
    scene.add(group);

    const mats: THREE.MeshPhysicalMaterial[] = [];
    group.traverse((o) => {
      if (o instanceof THREE.Mesh && o.material instanceof THREE.MeshPhysicalMaterial) mats.push(o.material);
    });

    // Soft, blue-tinted shadow cast into the void behind the object.
    let shadow: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null;
    if (def.kind !== "ring" && def.kind !== "text") {
      shadow = new THREE.Mesh(
        shadowGeo,
        new THREE.MeshBasicMaterial({ map: shadowTex, color: 0x0b0822, transparent: true, depthWrite: false }),
      );
      shadow.scale.setScalar(def.size * 2.4);
      scene.add(shadow);
    }

    const depthK = Math.min(1, Math.max(0.15, (def.z + 8) / 10.6)); // 1 = nearest
    const rand = () => Math.random();
    return {
      def, group, mats, shadow, depthK,
      rest: new THREE.Vector3(),
      base: new THREE.Euler(def.rot[0] * DEG, def.rot[1] * DEG, def.rot[2] * DEG),
      radiusPx: 0,
      // Idle float: 2–12px of travel, 1–3° of rotation, 5–12s periods, every object out of phase.
      amp: 0.015 + rand() * 0.06,
      tilt: (1 + rand() * 2) * DEG,
      w: [0, 0, 0, 0].map(() => (Math.PI * 2) / (5 + rand() * 7)),
      p: [0, 0, 0, 0].map(() => rand() * Math.PI * 2),
      s: { x: spring(), y: spring(), z: spring(), rx: spring(), ry: spring(), sc: spring(), glow: spring() },
      caret: group.getObjectByName("caret"),
      brackets: group.getObjectByName("brackets") as THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial> | undefined,
    };
  });

  // Few, faint, far-away points to sell the depth.
  if (farL) {
    const pts = new Float32Array(48);
    for (let i = 0; i < 16; i++) pts.set([(Math.random() - 0.5) * 22, (Math.random() - 0.5) * 12, -5 - Math.random() * 6], i * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    farL.scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xa5a8ff, size: 0.04, transparent: true, opacity: 0.5 })));
  }

  let W = 1, H = 1;
  const worldPerPx = (z: number) => (2 * (CAM_Z - z) * tanHalf) / H;
  const layout = () => {
    W = innerWidth;
    H = innerHeight;
    for (const l of [nearL, farL]) l?.renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    for (const it of items) {
      const halfH = (CAM_Z - it.def.z) * tanHalf;
      it.rest.set(it.def.at[0] * halfH * camera.aspect * 0.92, it.def.at[1] * halfH * 0.92, it.def.z);
      it.radiusPx = (it.def.size * 0.75) / worldPerPx(it.def.z);
    }
  };

  const setTheme = () => {
    const color = document.documentElement.classList.contains("dark") ? BG.dark : BG.light;
    for (const l of [nearL, farL]) (l?.scene.fog as THREE.Fog | undefined)?.color.setHex(color);
  };

  const render = () => {
    nearL.renderer.render(nearL.scene, camera);
    farL?.renderer.render(farL.scene, camera);
  };

  const pointer = { x: 0, y: 0, last: -Infinity };
  const field = { x: 0, y: 0, vx: 0, vy: 0 };
  const onMove = (e: PointerEvent) => {
    if (pointer.last === -Infinity) {
      field.x = e.clientX;
      field.y = e.clientY;
    }
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.last = performance.now();
  };

  const v = new THREE.Vector3();
  let presence = 0;
  let raf = 0;
  const start = performance.now();
  let prev = start;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - prev) / 1000, 1 / 30);
    prev = now;
    if (dt <= 0) return;
    const t = (now - start) / 1000;

    // Cursor presence fades in fast, decays slowly once the cursor rests.
    const live = now - pointer.last < IDLE_MS ? 1 : 0;
    presence += (live - presence) * (1 - Math.exp(-dt * (live ? 3 : 0.8)));
    const power = presence * strength;

    const ease = 1 - Math.exp(-dt * 6);
    const nx = field.x + (pointer.x - field.x) * ease;
    const ny = field.y + (pointer.y - field.y) * ease;
    field.vx += ((nx - field.x) / dt - field.vx) * ease;
    field.vy += ((ny - field.y) / dt - field.vy) * ease;
    field.x = nx;
    field.y = ny;

    // Camera drifts with the cursor: true parallax, near objects shift more than far ones.
    const px = (field.x / W) * 2 - 1, py = 1 - (field.y / H) * 2;
    camera.position.set(px * 0.45 * power, py * 0.3 * power, CAM_Z);
    camera.lookAt(0, 0, -2);

    // A faint cool light hovering just in front of the scene under the cursor.
    v.set(px, py, 0.5).unproject(camera).sub(camera.position).normalize();
    cursorLight.position.copy(camera.position).addScaledVector(v, (1.5 - CAM_Z) / v.z);
    cursorLight.intensity = 5 * power;

    const dragX = Math.max(-30, Math.min(30, field.vx * 0.02));
    const dragY = Math.max(-30, Math.min(30, field.vy * 0.02));

    for (const it of items) {
      const { s, def } = it;
      v.copy(it.rest).project(camera);
      const dx = ((v.x + 1) / 2) * W - field.x;
      const dy = ((1 - v.y) / 2) * H - field.y;
      const d = Math.hypot(dx, dy) || 1;

      // Field: gentle push away + drag along the cursor, far objects barely react.
      const i = smooth(1 - d / RADIUS) * power * (0.15 + 0.85 * it.depthK);
      // Hover: cursor over the object itself.
      const h = smooth(1 - d / (it.radiusPx * 1.1)) * power * it.depthK;
      const wpp = worldPerPx(def.z);
      const push = 16 * i * Math.min(1, d / 50);

      stepSpring(s.x, ((dx / d) * push + dragX * i) * wpp, 22, 7, dt);
      stepSpring(s.y, -((dy / d) * push + dragY * i) * wpp, 22, 7, dt);
      stepSpring(s.z, 0.45 * h, 30, 8, dt);
      // Face turns toward the cursor.
      stepSpring(s.rx, -(dy / RADIUS) * 0.22 * i, 34, 8, dt);
      stepSpring(s.ry, -(dx / RADIUS) * 0.22 * i, 34, 8, dt);
      stepSpring(s.sc, 0.03 * h, 34, 8, dt);
      stepSpring(s.glow, 0.5 * h + 0.2 * i, 20, 7, dt);

      const fx = it.amp * Math.sin(t * it.w[0] + it.p[0]);
      const fy = it.amp * Math.sin(t * it.w[1] + it.p[1]);
      const spin = def.kind === "ring" ? t * 0.06 : 0;
      it.group.position.set(it.rest.x + fx + s.x.x, it.rest.y + fy + s.y.x, it.rest.z + s.z.x);
      it.group.rotation.set(
        it.base.x + it.tilt * Math.sin(t * it.w[2] + it.p[2]) + s.rx.x,
        it.base.y + it.tilt * Math.sin(t * it.w[3] + it.p[3]) + s.ry.x + spin * 0.4,
        it.base.z + spin,
      );
      it.group.scale.setScalar(def.size * (1 + s.sc.x));
      for (const m of it.mats) m.emissiveIntensity = m.userData.glow + s.glow.x;
      if (it.caret) it.caret.visible = t % 1.1 < 0.6;
      // Brackets pulse softly, and lock on brighter when the cursor comes close.
      if (it.brackets) it.brackets.material.opacity = 0.35 + 0.15 * Math.sin(t * 1.4) + 0.5 * s.glow.x;

      if (it.shadow) {
        // Cast down-right (away from the key light), nudged away from the cursor.
        it.shadow.position.set(
          it.group.position.x + def.size * (0.25 + 0.15 * s.x.x),
          it.group.position.y - def.size * 0.35 + 0.15 * s.y.x,
          it.group.position.z - def.size * 0.9,
        );
        it.shadow.material.opacity = (0.35 + 0.45 * it.depthK) * (1 + 0.5 * s.glow.x);
      }
    }
    render();
  };

  // Reduced motion: no loop, just re-render a still frame when layout or theme changes.
  const renderStill = () => {
    frame(performance.now());
    cancelAnimationFrame(raf);
  };
  const onResize = () => {
    layout();
    if (!animate) renderStill();
  };
  const themeObserver = new MutationObserver(() => {
    setTheme();
    if (!animate) renderStill();
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  layout();
  setTheme();
  addEventListener("resize", onResize);
  if (!animate) renderStill();
  else {
    if (strength > 0) addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);
  }

  return () => {
    cancelAnimationFrame(raf);
    removeEventListener("resize", onResize);
    removeEventListener("pointermove", onMove);
    themeObserver.disconnect();
    for (const l of [nearL, farL]) {
      if (!l) continue;
      l.scene.traverse((o) => {
        if (!(o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.LineSegments)) return;
        o.geometry.dispose();
        const mat = o.material as THREE.Material & { map?: THREE.Texture | null };
        mat.map?.dispose();
        mat.dispose();
      });
      l.scene.environment?.dispose();
      l.renderer.dispose();
    }
  };
}

/* ── Inline icon ───────────────────────────────────────── */

/**
 * Single "building a project" object: two slabs stacked, a code keycap settling
 * on top, a thin orbit ring. Bobs on its own, tilts toward the cursor on hover.
 */
export function mountIcon(canvas: HTMLCanvasElement, animate: boolean): () => void {
  const { renderer, scene } = makeRenderer(canvas, Math.min(devicePixelRatio, 2));
  scene.fog = null;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  // Pulled back so the ring keeps clear margins even at full hover tilt.
  camera.position.z = 7;

  // tilt: stack axis (+Z) points up and leans toward the camera; spin: 3/4 view around that axis.
  const tilt = new THREE.Group();
  tilt.rotation.x = -Math.PI / 2 + 0.6;
  tilt.position.y = -0.15;
  const spin = new THREE.Group();
  spin.rotation.z = 0.7;
  tilt.add(spin);
  scene.add(tilt);

  const base = new THREE.Mesh(new RoundedBoxGeometry(1.6, 1.6, 0.26, 4, 0.08), body());
  const mid = new THREE.Mesh(new RoundedBoxGeometry(1.3, 1.3, 0.22, 4, 0.07), face());
  mid.position.z = 0.26;
  const key = build({ kind: "key", glyph: "</>", at: [0, 0], z: 0, size: 1, rot: [0, 0, 0] });
  key.scale.setScalar(0.9);
  const ring = build({ kind: "ring", at: [0, 0], z: 0, size: 1, rot: [0, 0, 0] });
  ring.scale.setScalar(1.35);
  spin.add(base, mid, key, ring);

  const mats: THREE.MeshPhysicalMaterial[] = [];
  key.traverse((o) => {
    if (o instanceof THREE.Mesh && o.material instanceof THREE.MeshPhysicalMaterial) mats.push(o.material);
  });

  const layout = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
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

  const s = { rx: spring(), ry: spring(), lift: spring(), glow: spring() };
  let raf = 0;
  const start = performance.now();
  let prev = start;

  const frame = (now: number) => {
    const dt = Math.min((now - prev) / 1000, 1 / 30);
    prev = now;
    const t = (now - start) / 1000;

    stepSpring(s.rx, pointer.y * 0.28, 30, 8, dt);
    stepSpring(s.ry, pointer.x * 0.45, 30, 8, dt);
    stepSpring(s.lift, pointer.over * 0.25, 26, 7, dt);
    stepSpring(s.glow, pointer.over * 0.6, 20, 7, dt);

    // The key hovers and settles onto the stack, like the last piece going in.
    key.position.z = 0.67 + 0.12 * (1 + Math.sin(t * 1.1)) + s.lift.x;
    key.rotation.z = 0.08 * Math.sin(t * 0.7);
    ring.rotation.set(0.12 * Math.sin(t * 0.5), 0.1 * Math.cos(t * 0.4), t * 0.3);
    spin.rotation.z = 0.7 + 0.12 * Math.sin(t * 0.35);
    tilt.rotation.set(-Math.PI / 2 + 0.6 + s.rx.x, s.ry.x, 0);
    for (const m of mats) m.emissiveIntensity = m.userData.glow + s.glow.x;

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
