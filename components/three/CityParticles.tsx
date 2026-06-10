"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mouseState } from "@/lib/mouse";

/**
 * The city, as particles. 80k surface-sampled points baked offline from the
 * city GLB (public/city-points.bin — Int16, ~470 KB; no GLTF/textures at
 * runtime, fast on any laptop/phone). Monochrome ink — the city is drawn by
 * density, not colour.
 *
 * - Sits in the lower band of the viewport.
 * - Scroll: the view eases from bird's-eye (rooftops) to eye-level skyline.
 * - Mouse: drag in the lower part of the screen for LIMITED yaw rotation
 *   (clamped, inertial); pinch / ctrl+wheel for LIMITED zoom; nearby
 *   particles stir organically like the rest of the system.
 * - Fades in softly once the point cloud arrives (no pop, no jank).
 */
const ZONE = 0.6; // pointer below 60% of viewport height interacts with the city

const vert = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPx;
  uniform float uReveal;
  attribute float aSeed;
  attribute float aLight;
  varying float vA;
  varying float vL;

  void main(){
    vec3 p = position;

    // whisper breathing (tiny — the city must stay CRISP)
    p += 0.005 * vec3(
      sin(uTime * 0.8 + aSeed * 6.2831853 + p.y * 5.0),
      cos(uTime * 0.7 + aSeed * 4.0),
      sin(uTime * 0.6 + aSeed * 5.0 + p.x * 4.0)
    );

    vec4 world = modelMatrix * vec4(p, 1.0);

    // organic stir near the cursor (tight, so the form holds)
    vec2 d = world.xy - uMouse;
    float md = length(d);
    float fall = smoothstep(1.3, 0.12, md);
    float organic = 0.55 + 0.45 * sin(aSeed * 12.7 + uTime * 1.3);
    float rep = fall * organic;
    vec2 dir = normalize(d + 1e-4);
    world.xy += (dir * 0.04 + vec2(-dir.y, dir.x) * 0.08) * rep;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    // cap sprite size so near-camera dust stays fine-grained, never blobs
    gl_PointSize = min(
      (1.5 + 2.3 * aSeed) * uPx * (6.0 / -mv.z) * (1.0 + rep * 0.3),
      7.0 * uPx
    );

    // etching light: sun-lit faces breathe lighter, shaded faces hold the ink
    float shade = 1.15 - 0.45 * aLight;
    float shimmer = 0.88 + 0.12 * sin(uTime * 2.0 + aSeed * 6.2831853);
    vA = (0.50 + 0.40 * aSeed) * shade * shimmer * (1.0 + rep * 0.5) * uReveal;
    vL = aLight;
  }
`;

const frag = /* glsl */ `
  precision mediump float;
  varying float vA;
  varying float vL;
  void main(){
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.16, d) * vA;
    if (alpha < 1e-3) discard;
    // ink, warmed a breath on lit faces (luminance only — still no colour)
    vec3 ink = mix(vec3(0.10, 0.11, 0.15), vec3(0.34, 0.35, 0.40), vL * 0.55);
    gl_FragColor = vec4(ink, alpha);
  }
`;

export default function CityParticles() {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const ctl = useRef({
    yaw: 0,
    yawT: 0,
    zoom: 1,
    zoomT: 1,
    dragging: false,
    lastX: 0,
  });

  // load the baked point cloud (Int16 -> Float32), never blocking first paint
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [meta, bin] = await Promise.all([
          fetch("/city-points.json").then((r) => r.json()),
          fetch("/city-points.bin").then((r) => r.arrayBuffer()),
        ]);
        if (!alive) return;
        const n = meta.count as number;
        const q = new Int16Array(bin, 0, n * 3);
        const scale = (meta.maxAbs as number) / 32767;
        const pos = new Float32Array(n * 3);
        for (let i = 0; i < n * 3; i++) pos[i] = q[i] * scale;
        const seeds = new Float32Array(n);
        for (let i = 0; i < n; i++) seeds[i] = Math.random();
        // baked per-point directional light (uint8 tail of the bin)
        const lights = new Float32Array(n);
        if (meta.light) {
          const lb = new Uint8Array(bin, n * 6, n);
          for (let i = 0; i < n; i++) lights[i] = lb[i] / 255;
        } else {
          lights.fill(0.5);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        g.setAttribute("aLight", new THREE.BufferAttribute(lights, 1));
        g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 6);
        setGeometry(g);
      } catch {
        // point cloud unavailable -> the rest of the page works untouched
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uPx: {
        value:
          typeof window !== "undefined"
            ? Math.min(2, window.devicePixelRatio)
            : 1,
      },
      uReveal: { value: 0 },
    }),
    [],
  );

  // limited drag-rotate + pinch-zoom, scoped to the lower band of the screen
  useEffect(() => {
    const c = ctl.current;
    const down = (e: PointerEvent) => {
      if (e.clientY < window.innerHeight * ZONE) return;
      const t = e.target as Element | null;
      if (t?.closest?.("a,button,input,textarea,select,nav,.dock,.mega"))
        return;
      c.dragging = true;
      c.lastX = e.clientX;
    };
    const move = (e: PointerEvent) => {
      if (!c.dragging) return;
      const dx = e.clientX - c.lastX;
      c.lastX = e.clientX;
      c.yawT = THREE.MathUtils.clamp(c.yawT + dx * 0.0035, -0.6, 0.6);
    };
    const up = () => {
      c.dragging = false;
    };
    const wheel = (e: WheelEvent) => {
      // pinch gesture (trackpads report ctrlKey) over the city zone only
      if (!e.ctrlKey || e.clientY < window.innerHeight * ZONE) return;
      e.preventDefault();
      c.zoomT = THREE.MathUtils.clamp(c.zoomT - e.deltaY * 0.0035, 0.8, 1.6);
    };
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("wheel", wheel, { passive: false });
    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("wheel", wheel);
    };
  }, []);

  useFrame((_, dt) => {
    if (!geometry) return;
    uniforms.uTime.value += dt;
    uniforms.uMouse.value.set(
      (mouseState.nx * viewport.width) / 2,
      (mouseState.ny * viewport.height) / 2,
    );
    // soft fade-in once loaded
    uniforms.uReveal.value +=
      (1 - uniforms.uReveal.value) * (1 - Math.exp(-1.6 * dt));

    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-6 * dt);

    // scroll: bird's-eye -> eye-level over the first half of the page
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const sp =
      maxScroll > 0
        ? THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1)
        : 0;
    const t = THREE.MathUtils.smoothstep(sp, 0, 0.5);
    const pitch = THREE.MathUtils.lerp(1.12, 0.06, t);
    const y = THREE.MathUtils.lerp(-4.2, -2.3, t);

    const c = ctl.current;
    c.yaw += (c.yawT - c.yaw) * k;
    c.zoom += (c.zoomT - c.zoom) * k;

    g.rotation.x += (pitch - g.rotation.x) * k;
    g.rotation.y += (c.yaw + mouseState.nx * 0.06 - g.rotation.y) * k;
    g.position.y += (y - g.position.y) * k;
    g.scale.setScalar(2.13 * c.zoom); // 2.5x: the city is a protagonist now
  });

  if (!geometry) return null;

  return (
    <group
      ref={group}
      position={[0, -4.6, 0.3]}
      rotation={[1.12, 0, 0]}
      scale={2.13}
    >
      <points geometry={geometry} frustumCulled={false}>
        {/* args-constructed so uniforms actually bind */}
        <shaderMaterial
          args={[
            {
              uniforms,
              vertexShader: vert,
              fragmentShader: frag,
              transparent: true,
              depthWrite: false,
            },
          ]}
        />
      </points>
    </group>
  );
}
