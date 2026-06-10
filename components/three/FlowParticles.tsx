import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";

/**
 * Flow-field particles (the reference look): a constellation of fine ink dust
 * advected along an organic noise direction field — real flow-field motion,
 * clearly visible on the pastel mesh, decorating the background.
 * Mouse interaction: particles are pushed away, brighten and grow near the
 * cursor, then drift back into the field.
 */
const COUNT = 2400;
const BX = 10; // half-extent x (world units)
const BY = 6; // half-extent y

const vert = /* glsl */ `
  uniform float uPx;
  uniform vec2 uMouse;
  attribute float aSeed;
  varying float vA;

  void main(){
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;

    float rep = smoothstep(2.6, 0.0, distance(position.xy, uMouse));
    // 6.0/-mv.z ~= 1 at the camera distance -> sizes ~2.5..7px (x dpr), visible
    gl_PointSize = (2.5 + 4.5 * aSeed) * uPx * (6.0 / -mv.z) * (1.0 + rep * 0.7);
    vA = (0.22 + 0.26 * aSeed) * (1.0 + rep * 0.9);
  }
`;

const frag = /* glsl */ `
  precision mediump float;
  varying float vA;
  void main(){
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.1, d) * vA;
    gl_FragColor = vec4(0.13, 0.14, 0.19, alpha);  // ink dust
  }
`;

export default function FlowParticles() {
  const { viewport } = useThree();
  const noise = useMemo(() => new ImprovedNoise(), []);
  const posAttr = useRef<THREE.BufferAttribute>(null!);

  const sim = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 2);
    const seed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * BX;
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * BY;
      pos[i * 3 + 2] = 0;
      seed[i] = Math.random();
    }
    return { pos, vel, seed };
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pa = new THREE.BufferAttribute(sim.pos, 3);
    pa.setUsage(THREE.DynamicDrawUsage);
    g.setAttribute("position", pa);
    g.setAttribute("aSeed", new THREE.BufferAttribute(sim.seed, 1));
    posAttr.current = pa;
    return g;
  }, [sim]);

  const uniforms = useMemo(
    () => ({
      uPx: {
        value:
          typeof window !== "undefined"
            ? Math.min(2, window.devicePixelRatio)
            : 1,
      },
      uMouse: { value: new THREE.Vector2(99, 99) },
    }),
    [],
  );

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = state.clock.elapsedTime * 0.05;
    const mx = (state.pointer.x * viewport.width) / 2;
    const my = (state.pointer.y * viewport.height) / 2;
    uniforms.uMouse.value.set(mx, my);

    const { pos, vel, seed } = sim;
    const damp = Math.exp(-2.0 * dt);
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const iv = i * 2;
      const x = pos[ix];
      const y = pos[ix + 1];

      // direction field: angle from 3D noise -> organic streamline motion
      const a =
        noise.noise(x * 0.16, y * 0.16, t + seed[i] * 0.03) * Math.PI * 2.4;
      vel[iv] += Math.cos(a) * 1.5 * dt;
      vel[iv + 1] += Math.sin(a) * 1.5 * dt;

      // mouse repulsion (water-like push, then the field re-collects them)
      const dx = x - mx;
      const dy = y - my;
      const md2 = dx * dx + dy * dy;
      if (md2 < 6.76) {
        const md = Math.sqrt(md2) + 1e-4;
        const f = ((1 - md / 2.6) * (1 - md / 2.6) * 9.0 * dt) / md;
        vel[iv] += dx * f;
        vel[iv + 1] += dy * f;
      }

      vel[iv] *= damp;
      vel[iv + 1] *= damp;
      let nx = x + vel[iv] * dt * 8.0;
      let ny = y + vel[iv + 1] * dt * 8.0;

      // wrap around the stage
      if (nx > BX) nx = -BX;
      else if (nx < -BX) nx = BX;
      if (ny > BY) ny = -BY;
      else if (ny < -BY) ny = BY;
      pos[ix] = nx;
      pos[ix + 1] = ny;
    }
    posAttr.current.needsUpdate = true;
  });

  return (
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
  );
}
