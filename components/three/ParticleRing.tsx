"use client";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mouseState } from "@/lib/mouse";

/**
 * A coherent 3D particle model: a crisp orbital ring of fine dust circling
 * behind the hero (Saturn-ring ellipse, clearly readable as ONE form).
 * 80% of particles sit in a tight band, 20% form a soft halo. Fully GPU.
 * Mouse (window-tracked): the ring leans toward the cursor; nearby particles
 * are pushed aside, brighten and grow. Colour: a slow-drifting cool spectrum
 * (slate -> violet -> teal), never brown, never candy.
 */
const COUNT = 6500;

const vert = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPx;
  uniform float uHue;
  attribute float aU;
  attribute float aV;
  attribute float aR;
  attribute float aSeed;
  varying float vA;
  varying vec3 vCol;

  // cool designer spectrum: slate blue -> violet grey -> teal (no browns)
  vec3 pal(float t){
    return vec3(0.40, 0.43, 0.55) + vec3(0.10, 0.08, 0.10) * cos(6.2831853 * t + vec3(0.0, 1.2, 2.2));
  }

  void main(){
    // orbital motion along the ring + slow swirl around the tube
    float v = aV + uTime * (0.06 + 0.08 * aSeed);
    float u = aU + uTime * 0.3 * aSeed;
    float R = 2.25;
    vec3 p;
    p.x = (R + aR * cos(u)) * cos(v);
    p.y = (R + aR * cos(u)) * sin(v);
    p.z = aR * sin(u);

    // subtle breathing (kept tiny so the band stays crisp)
    p += 0.02 * vec3(
      sin(v * 3.0 + uTime * 0.6 + aSeed * 6.2831853),
      cos(v * 2.0 + uTime * 0.5),
      sin(u * 2.0 + uTime * 0.45)
    );

    vec4 world = modelMatrix * vec4(p, 1.0);

    // cursor pushes nearby particles aside; they brighten + grow
    vec2 d = world.xy - uMouse;
    float md = length(d);
    float rep = smoothstep(1.9, 0.0, md);
    world.xy += normalize(d + 1e-4) * rep * rep * 1.1;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.3 + 2.4 * aSeed) * uPx * (6.0 / -mv.z) * (1.0 + rep * 1.1);

    vCol = pal(v * 0.159155 + uHue);
    vA = (0.30 + 0.40 * aSeed) * (1.0 + rep * 1.2);
  }
`;

const frag = /* glsl */ `
  precision mediump float;
  varying float vA;
  varying vec3 vCol;
  void main(){
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.12, d) * vA;
    gl_FragColor = vec4(vCol, alpha);
  }
`;

export default function ParticleRing() {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3); // real positions computed in shader
    const aU = new Float32Array(COUNT);
    const aV = new Float32Array(COUNT);
    const aR = new Float32Array(COUNT);
    const aSeed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      aU[i] = Math.random() * Math.PI * 2;
      aV[i] = Math.random() * Math.PI * 2;
      // 80% in a tight band (crisp ring), 20% soft halo dust
      aR[i] =
        Math.random() < 0.8
          ? 0.05 + Math.pow(Math.random(), 1.5) * 0.14
          : 0.18 + Math.random() * 0.3;
      aSeed[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aU", new THREE.BufferAttribute(aU, 1));
    g.setAttribute("aV", new THREE.BufferAttribute(aV, 1));
    g.setAttribute("aR", new THREE.BufferAttribute(aR, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 10);
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
      uHue: { value: 0 },
    }),
    [],
  );

  useFrame((state, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uHue.value = state.clock.elapsedTime * 0.008; // slow colour drift
    // window-tracked pointer (NDC) -> world at the z=0 plane
    const nx = mouseState.nx;
    const ny = mouseState.ny;
    uniforms.uMouse.value.set(
      (nx * viewport.width) / 2,
      (ny * viewport.height) / 2,
    );
    // the whole model leans toward the cursor
    const g = group.current;
    if (g && nx < 5) {
      g.rotation.x += (1.05 - ny * 0.1 - g.rotation.x) * 0.06;
      g.rotation.y += (nx * 0.22 - g.rotation.y) * 0.06;
    }
  });

  return (
    <group ref={group} position={[0, -0.1, 0]} rotation={[1.05, 0, 0.12]}>
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
