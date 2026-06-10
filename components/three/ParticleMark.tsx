"use client";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mouseState } from "@/lib/mouse";

/**
 * The Hibi mark (日 / H-in-circle) materialised from ~12k flowing particles —
 * the brand story made literal: every particle a verified visit, streaming
 * along the strokes, days condensing into the stamp (dreamy-particles
 * approach: shaped emitters + noise drift + pointer interaction, all GPU).
 *
 * - SPEED: particles flow along each stroke (ring orbits, bars run vertically
 *   in opposing directions, the crossbar streams sideways).
 * - LIGHT/WATER: per-particle shimmer + a dreamer fraction that drifts off
 *   the glyph like spray.
 * - CHROMATIC ABERRATION: cyan/magenta fringes in the point sprite.
 * - Pointer (window-tracked): the stamp leans; particles scatter from the
 *   cursor like water and re-join the current.
 */
const COUNT = 12000;

// region areas (ring band, two bars, crossbar) for proportional sampling
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
  attribute float aRegion;
  attribute float aP;
  attribute float aQ;
  attribute float aSeed;
  varying float vA;
  varying vec3 vCol;

  vec3 strokePos(out float edgeFade){
    float t = uTime;
    edgeFade = 1.0;
    if (aRegion < 0.5) {
      // ring: orbital current
      float ang = (aP + t * (0.020 + 0.030 * aSeed)) * 6.2831853;
      float r = mix(0.78, 0.92, aQ);
      return vec3(cos(ang) * r, sin(ang) * r, (aSeed - 0.5) * 0.06);
    } else if (aRegion < 1.5) {
      // left bar: upward current
      float yy = fract(aP + t * (0.045 + 0.05 * aSeed));
      edgeFade = smoothstep(0.0, 0.07, yy) * smoothstep(1.0, 0.93, yy);
      return vec3(-0.30 + aQ * 0.12, yy * 1.24 - 0.62, (aSeed - 0.5) * 0.06);
    } else if (aRegion < 2.5) {
      // right bar: downward current
      float yy = fract(aP - t * (0.045 + 0.05 * aSeed));
      edgeFade = smoothstep(0.0, 0.07, yy) * smoothstep(1.0, 0.93, yy);
      return vec3(0.18 + aQ * 0.12, yy * 1.24 - 0.62, (aSeed - 0.5) * 0.06);
    }
    // crossbar: sideways stream
    float xx = fract(aP + t * (0.06 + 0.05 * aSeed));
    edgeFade = smoothstep(0.0, 0.09, xx) * smoothstep(1.0, 0.91, xx);
    return vec3(xx * 0.36 - 0.18, -0.065 + aQ * 0.13, (aSeed - 0.5) * 0.06);
  }

  void main(){
    float edgeFade;
    vec3 p = strokePos(edgeFade);

    // dreamy drift: most particles hold the glyph, a fraction sprays off
    float dreamer = step(0.86, aSeed);
    float amp = mix(0.028, 0.16, dreamer);
    float t2 = uTime * 0.5;
    p += amp * vec3(
      sin(t2 * 0.9 + aSeed * 6.2831853 + p.y * 4.0),
      cos(t2 * 0.8 + aSeed * 4.0 + p.x * 4.0),
      sin(t2 * 0.7 + aSeed * 5.0)
    );

    vec4 world = modelMatrix * vec4(p, 1.0);

    // pointer scatter (water): push aside, brighten, then the current re-collects
    vec2 d = world.xy - uMouse;
    float md = length(d);
    float rep = smoothstep(1.5, 0.0, md);
    world.xy += normalize(d + 1e-4) * rep * rep * 0.8;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.0 + 2.1 * aSeed) * uPx * (6.0 / -mv.z) * (1.0 + rep * 1.2);

    // ink-slate body with a quiet per-particle cool variance
    vec3 ink = vec3(0.15, 0.17, 0.25);
    vec3 cool = vec3(0.24, 0.34, 0.52);
    vCol = mix(ink, cool, fract(aSeed * 7.13) * 0.6);

    // water-glint shimmer
    float shimmer = 0.78 + 0.22 * sin(uTime * 2.2 + aSeed * 6.2831853);
    vA = (0.42 + 0.44 * aSeed) * edgeFade * shimmer * (1.0 + rep * 1.1) * mix(1.0, 0.55, dreamer);
  }
`;

const frag = /* glsl */ `
  precision mediump float;
  varying float vA;
  varying vec3 vCol;

  void main(){
    vec2 c = gl_PointCoord - 0.5;
    vec2 ofs = vec2(0.085, 0.0);
    // chromatic aberration: core + cyan/magenta fringes
    float aK = smoothstep(0.5, 0.10, length(c));
    float aC = smoothstep(0.5, 0.10, length(c - ofs));
    float aM = smoothstep(0.5, 0.10, length(c + ofs));
    float cFr = max(aC - aK, 0.0);
    float mFr = max(aM - aK, 0.0);
    float w = aK + cFr + mFr;
    if (w < 1e-3) discard;
    vec3 cyan = vec3(0.25, 0.72, 0.95);
    vec3 magenta = vec3(0.88, 0.38, 0.72);
    vec3 col = (vCol * aK + cyan * cFr + magenta * mFr) / w;
    gl_FragColor = vec4(col, max(aK, max(aC, aM)) * vA);
  }
`;

export default function ParticleMark() {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3); // computed in shader
    const aRegion = new Float32Array(COUNT);
    const aP = new Float32Array(COUNT);
    const aQ = new Float32Array(COUNT);
    const aSeed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // proportional to stroke area so density is uniform across the glyph
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
      aQ[i] = Math.random();
      aSeed[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aRegion", new THREE.BufferAttribute(aRegion, 1));
    g.setAttribute("aP", new THREE.BufferAttribute(aP, 1));
    g.setAttribute("aQ", new THREE.BufferAttribute(aQ, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 8);
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
    }),
    [],
  );

  useFrame((state, dt) => {
    uniforms.uTime.value += dt;
    const nx = mouseState.nx;
    const ny = mouseState.ny;
    uniforms.uMouse.value.set(
      (nx * viewport.width) / 2,
      (ny * viewport.height) / 2,
    );
    const g = group.current;
    if (g) {
      // idle float + lean toward the cursor (seal hovering over paper)
      g.position.y = 0.05 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
      if (nx < 5) {
        g.rotation.y += (nx * 0.3 - g.rotation.y) * 0.05;
        g.rotation.x += (-ny * 0.22 - g.rotation.x) * 0.05;
      }
    }
  });

  return (
    // a compact stamp behind the title, tilted a touch like a real seal
    <group
      ref={group}
      position={[0, 0.05, -0.8]}
      rotation={[0, 0, -0.05]}
      scale={1.85}
    >
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vert}
          fragmentShader={frag}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}
