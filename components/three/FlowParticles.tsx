import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Bright, subtle flow-field particles: faint ink dust drifting along an organic
 * field on the white background, gently repelled by the cursor. Premium texture
 * that never steals focus.
 */
const COUNT = 2800;

const vert = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPx;
  attribute float aSeed;
  varying float vA;

  void main(){
    vec3 p = position;
    float t = uTime * 0.08;
    float s = aSeed * 6.2831853;

    // organic flow drift (cheap curl-ish field via layered trig)
    p.x += sin(t * 0.7 + s + p.y * 0.35) * 0.28;
    p.y += cos(t * 0.6 + s + p.x * 0.30) * 0.28;
    p.x += sin(t * 0.23 + p.y * 0.6) * 0.12;

    // gentle cursor repulsion (water-like push)
    vec2 toM = p.xy - uMouse;
    float md = length(toM);
    float rep = smoothstep(2.2, 0.0, md);
    p.xy += normalize(toM + 1e-4) * rep * rep * 0.7;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (4.5 + 8.0 * aSeed) * uPx * (1.0 / -mv.z);
    vA = (0.15 + 0.22 * aSeed) * (1.0 + rep * 1.6);   // subtle, brighten near cursor
  }
`;

const frag = /* glsl */ `
  varying float vA;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float alpha = smoothstep(0.5, 0.0, d) * vA;
    gl_FragColor = vec4(0.11, 0.12, 0.16, alpha);   // faint ink dust
  }
`;

export default function FlowParticles() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * 9;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 5.5;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * 0.6;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
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
    uniforms.uMouse.value.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2,
    );
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
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
