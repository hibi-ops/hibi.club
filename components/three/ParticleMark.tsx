"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mouseState } from "@/lib/mouse";

/**
 * The particle journey (air.inc-style scroll narrative, dreamy-particles
 * craft). One cloud of ~26k particles morphs through the product story as
 * you scroll:
 *
 *   hero   — the Hibi mark (日/H), strokes flowing like currents
 *   roles  — a dotted CITY BLOCK skyline ("the block")
 *   stamp  — a dense solid seal ("one day, stamped")
 *   belong — 50 small clusters in a circle (50 days -> a regular)
 *   footer — the cloud breathes out
 *
 * Interaction: drag anywhere on the page background to spin the cloud
 * (inertia); the pointer stirs nearby particles (organic, never a circle);
 * the whole model leans toward the cursor. Chromatic aberration is applied
 * full-screen in the composer (visible), not per-sprite.
 */
const COUNT = 26000;

const REGIONS = [
  { id: 0, area: Math.PI * (0.92 * 0.92 - 0.78 * 0.78) }, // ring annulus
  { id: 1, area: 0.12 * 1.24 }, // left bar
  { id: 2, area: 0.12 * 1.24 }, // right bar
  { id: 3, area: 0.36 * 0.13 }, // crossbar
];
const TOTAL_AREA = REGIONS.reduce((s, r) => s + r.area, 0);

const vert = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPx;
  uniform float uScroll;
  attribute float aRegion;
  attribute float aP;
  attribute float aQ;
  attribute float aSeed;
  attribute vec3 aCity;
  attribute vec3 aSeal;
  attribute vec3 aRing;
  varying float vA;
  varying vec3 vCol;

  vec3 strokePos(out float edgeFade){
    float t = uTime;
    edgeFade = 1.0;
    if (aRegion < 0.5) {
      float ang = (aP + t * (0.020 + 0.030 * aSeed)) * 6.2831853;
      float r = mix(0.78, 0.92, aQ);
      return vec3(cos(ang) * r, sin(ang) * r, (aSeed - 0.5) * 0.06);
    } else if (aRegion < 1.5) {
      float yy = fract(aP + t * (0.045 + 0.05 * aSeed));
      edgeFade = smoothstep(0.0, 0.07, yy) * smoothstep(1.0, 0.93, yy);
      return vec3(-0.30 + aQ * 0.12, yy * 1.24 - 0.62, (aSeed - 0.5) * 0.06);
    } else if (aRegion < 2.5) {
      float yy = fract(aP - t * (0.045 + 0.05 * aSeed));
      edgeFade = smoothstep(0.0, 0.07, yy) * smoothstep(1.0, 0.93, yy);
      return vec3(0.18 + aQ * 0.12, yy * 1.24 - 0.62, (aSeed - 0.5) * 0.06);
    }
    float xx = fract(aP + t * (0.06 + 0.05 * aSeed));
    edgeFade = smoothstep(0.0, 0.09, xx) * smoothstep(1.0, 0.91, xx);
    return vec3(xx * 0.36 - 0.18, -0.065 + aQ * 0.13, (aSeed - 0.5) * 0.06);
  }

  void main(){
    float edgeFade;
    vec3 glyph = strokePos(edgeFade);

    // scroll-driven morph windows (overlapping crossfades)
    float wA = 1.0 - smoothstep(0.13, 0.23, uScroll);
    float wB = smoothstep(0.15, 0.25, uScroll) * (1.0 - smoothstep(0.37, 0.47, uScroll));
    float wC = smoothstep(0.39, 0.49, uScroll) * (1.0 - smoothstep(0.59, 0.69, uScroll));
    float wD = smoothstep(0.61, 0.71, uScroll) * (1.0 - smoothstep(0.84, 0.94, uScroll));
    float raw = wA + wB + wC + wD;
    float inv = 1.0 / max(raw, 1e-3);
    vec3 p = (glyph * wA + aCity * wB + aSeal * wC + aRing * wD) * inv;
    float fade = clamp(raw, 0.0, 1.0);
    edgeFade = mix(1.0, edgeFade, wA * inv); // stroke fades only apply to the glyph

    // dreamy drift on top of whatever shape we're in
    float dreamer = step(0.93, aSeed);
    float amp = mix(0.018, 0.10, dreamer);
    float t2 = uTime * 0.5;
    p += amp * vec3(
      sin(t2 * 0.9 + aSeed * 6.2831853 + p.y * 4.0),
      cos(t2 * 0.8 + aSeed * 4.0 + p.x * 4.0),
      sin(t2 * 0.7 + aSeed * 5.0)
    );

    vec4 world = modelMatrix * vec4(p, 1.0);

    // pointer: subtle organic stir (wide falloff, tangential, phase-broken)
    vec2 d = world.xy - uMouse;
    float md = length(d);
    float fall = smoothstep(2.4, 0.2, md);
    float organic = 0.55 + 0.45 * sin(aSeed * 12.7 + uTime * 1.3);
    float rep = fall * organic;
    vec2 dir = normalize(d + 1e-4);
    vec2 tang = vec2(-dir.y, dir.x);
    world.xy += (dir * 0.10 + tang * 0.22) * rep;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.3 + 2.6 * aSeed) * uPx * (6.0 / -mv.z) * (1.0 + rep * 0.25);

    vec3 ink = vec3(0.15, 0.17, 0.25);
    vec3 cool = vec3(0.24, 0.34, 0.52);
    vCol = mix(ink, cool, fract(aSeed * 7.13) * 0.6);

    float shimmer = 0.82 + 0.18 * sin(uTime * 2.2 + aSeed * 6.2831853);
    vA = (0.26 + 0.30 * aSeed) * edgeFade * shimmer * (1.0 + rep * 0.5)
       * mix(1.0, 0.45, dreamer) * fade;
  }
`;

const frag = /* glsl */ `
  precision mediump float;
  varying float vA;
  varying vec3 vCol;
  void main(){
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.12, d) * vA;
    if (alpha < 1e-3) discard;
    gl_FragColor = vec4(vCol, alpha);
  }
`;

/** gaussian-ish via sum of uniforms */
function gauss() {
  return (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
}

export default function ParticleMark() {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();
  const drag = useRef({ on: false, lastX: 0, rot: 0, vel: 0 });

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const aRegion = new Float32Array(COUNT);
    const aP = new Float32Array(COUNT);
    const aQ = new Float32Array(COUNT);
    const aSeed = new Float32Array(COUNT);
    const aCity = new Float32Array(COUNT * 3);
    const aSeal = new Float32Array(COUNT * 3);
    const aRing = new Float32Array(COUNT * 3);

    // city block: a skyline of dotted facades (windows-grid quantised)
    const B = 9;
    const widths: number[] = [];
    const heights: number[] = [];
    let total = 0;
    for (let b = 0; b < B; b++) {
      const w = 0.35 + Math.random() * 0.4;
      widths.push(w);
      heights.push(0.55 + Math.random() * 1.4);
      total += w + 0.07;
    }
    const xStarts: number[] = [];
    let acc = -total / 2;
    for (let b = 0; b < B; b++) {
      xStarts.push(acc);
      acc += widths[b] + 0.07;
    }
    const areas = widths.map((w, b) => w * heights[b]);
    const areaSum = areas.reduce((s, a) => s + a, 0);
    const scaleCity = 4.6 / total; // normalise skyline width to ~4.6 world units

    for (let i = 0; i < COUNT; i++) {
      // glyph attributes
      let pick = Math.random() * TOTAL_AREA;
      let region = 0;
      for (const r of REGIONS) {
        if (pick < r.area) {
          region = r.id;
          break;
        }
        pick -= r.area;
      }
      aRegion[i] = region;
      aP[i] = Math.random();
      aQ[i] = (Math.random() + Math.random()) / 2;
      aSeed[i] = Math.random();

      // CITY: pick a building by area, quantise to a window grid
      let bp = Math.random() * areaSum;
      let b = 0;
      for (let k = 0; k < B; k++) {
        if (bp < areas[k]) {
          b = k;
          break;
        }
        bp -= areas[k];
      }
      const gx = xStarts[b] + Math.random() * widths[b];
      const gy = Math.random() * heights[b];
      const q = 0.055;
      aCity[i * 3] =
        (Math.round(gx / q) * q + (Math.random() - 0.5) * 0.014) * scaleCity;
      aCity[i * 3 + 1] =
        (Math.round(gy / q) * q + (Math.random() - 0.5) * 0.014) * scaleCity -
        1.05;
      aCity[i * 3 + 2] = (Math.random() - 0.5) * 0.15;

      // SEAL: dense solid disc (the stamp impression)
      const sr = 0.85 * Math.sqrt(Math.random());
      const sa = Math.random() * Math.PI * 2;
      aSeal[i * 3] = Math.cos(sa) * sr;
      aSeal[i * 3 + 1] = Math.sin(sa) * sr + 0.08;
      aSeal[i * 3 + 2] = (Math.random() - 0.5) * 0.08;

      // RING of 50 clusters (50 days -> a regular)
      const k50 = i % 50;
      const ca = (k50 / 50) * Math.PI * 2;
      const R = 1.55;
      aRing[i * 3] = Math.cos(ca) * R + gauss() * 0.13;
      aRing[i * 3 + 1] = Math.sin(ca) * R + gauss() * 0.13;
      aRing[i * 3 + 2] = gauss() * 0.1;
    }

    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aRegion", new THREE.BufferAttribute(aRegion, 1));
    g.setAttribute("aP", new THREE.BufferAttribute(aP, 1));
    g.setAttribute("aQ", new THREE.BufferAttribute(aQ, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    g.setAttribute("aCity", new THREE.BufferAttribute(aCity, 3));
    g.setAttribute("aSeal", new THREE.BufferAttribute(aSeal, 3));
    g.setAttribute("aRing", new THREE.BufferAttribute(aRing, 3));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 9);
    return g;
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
      uScroll: { value: 0 },
    }),
    [],
  );

  // drag anywhere on the page background to spin the cloud (with inertia)
  useEffect(() => {
    const down = (e: PointerEvent) => {
      // lower band belongs to the city's drag-rotate (CityParticles)
      if (e.clientY > window.innerHeight * 0.6) return;
      const t = e.target as Element | null;
      if (
        t?.closest?.(
          "a,button,input,textarea,select,nav,.dock,.mega,.phone-glass",
        )
      )
        return;
      drag.current.on = true;
      drag.current.lastX = e.clientX;
    };
    const move = (e: PointerEvent) => {
      if (!drag.current.on) return;
      const dx = e.clientX - drag.current.lastX;
      drag.current.lastX = e.clientX;
      drag.current.vel = dx * 0.0045;
      drag.current.rot += dx * 0.0045;
    };
    const up = () => {
      drag.current.on = false;
    };
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  useFrame((state, dt) => {
    uniforms.uTime.value += dt;
    // scroll progress straight from the DOM (robust regardless of Lenis);
    // time-based easing so convergence is frame-rate independent
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const sp = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const k = 1 - Math.exp(-6 * dt);
    uniforms.uScroll.value +=
      (THREE.MathUtils.clamp(sp, 0, 1) - uniforms.uScroll.value) * k;
    (window as unknown as { __uScroll?: number }).__uScroll =
      uniforms.uScroll.value;
    const nx = mouseState.nx;
    const ny = mouseState.ny;
    uniforms.uMouse.value.set(
      (nx * viewport.width) / 2,
      (ny * viewport.height) / 2,
    );

    // inertia when released
    if (!drag.current.on) {
      drag.current.rot += drag.current.vel;
      drag.current.vel *= Math.exp(-3 * dt); // frame-rate-independent decay
    }

    const g = group.current;
    if (g) {
      g.position.y = 0.05 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
      const leanY = nx < 5 ? nx * 0.3 : 0;
      const leanX = nx < 5 ? -ny * 0.22 : 0;
      g.rotation.y += (leanY + drag.current.rot - g.rotation.y) * 0.07;
      g.rotation.x += (leanX - g.rotation.x) * 0.05;
    }
  });

  return (
    <group
      ref={group}
      position={[0, 0.05, -0.8]}
      rotation={[0, 0, -0.05]}
      scale={1.85}
    >
      <points geometry={geometry} frustumCulled={false}>
        {/* args-constructed so the uniforms object is ACTUALLY bound
            (passing `uniforms` as a prop silently left them at defaults) */}
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
