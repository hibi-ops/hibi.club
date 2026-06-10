import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ParticleMark from "./ParticleMark";

/**
 * Clean near-white canvas with a whisper of slowly-shifting cool tint
 * (no pink), behind a coherent 3D particle model (ParticleRing) that
 * carries the motion, colour and mouse interaction.
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;

  vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }

  void main(){
    vec2 uv = vUv; uv.x *= uAspect;

    float t = uTime * 0.02;
    float n1 = snoise(uv * 0.9 + vec2(t, t * 0.6));
    float n2 = snoise(uv * 1.4 - vec2(t * 0.7, t * 0.4));

    // near-white paper with a 4-5% cool tint whose hue drifts very slowly
    // (variable colour, restricted to the cool half — no pink)
    float hue = 0.55 + 0.10 * sin(uTime * 0.01);
    vec3 tintA = mix(vec3(1.0), 0.5 + 0.5 * cos(6.2831853 * (hue + vec3(0.0, 0.33, 0.67))), 0.05);
    vec3 tintB = mix(vec3(1.0), 0.5 + 0.5 * cos(6.2831853 * (hue + 0.12 + vec3(0.0, 0.33, 0.67))), 0.04);

    vec3 col = vec3(0.992);
    col = mix(col, tintA, smoothstep(-0.3, 0.9, n1) * 0.8);
    col = mix(col, tintB, smoothstep(-0.2, 0.95, n2) * 0.6);

    float g = (hash(vUv * floor(uTime * 12.0)) - 0.5) * 0.012;
    col += g;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function DayScene() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
    }),
    [],
  );

  useFrame((_, dt) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += dt;
    u.uAspect.value = size.width / size.height;
  });

  return (
    <>
      <mesh frustumCulled={false}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={matRef}
          args={[{ uniforms, vertexShader: vert, fragmentShader: frag }]}
          depthWrite={false}
          depthTest={false}
          toneMapped={false}
        />
      </mesh>
      <ParticleMark />
    </>
  );
}
