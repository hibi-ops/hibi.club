import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import * as THREE from "three";
import CityParticles from "./CityParticles";

/**
 * Clean near-white canvas with a whisper of slowly-shifting cool tint
 * (no pink), behind THE CITY — the only 3D element. A restrained
 * full-screen chromatic aberration keeps a premium lens feel without
 * smearing the dust.
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
  uniform float uScroll;

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

    // the day arc (air.inc atmosphere, Hibi's 日々 story): a clean vertical
    // sky gradient that warms as you ride down — dawn at the hero, golden
    // dusk at the street. Kept very light so ink type always reads.
    vec3 dawnTop = vec3(0.870, 0.915, 0.960);
    vec3 dawnBot = vec3(0.990, 0.975, 0.940);
    vec3 duskTop = vec3(0.905, 0.890, 0.950);
    vec3 duskBot = vec3(0.985, 0.915, 0.815);
    vec3 top = mix(dawnTop, duskTop, uScroll);
    vec3 bot = mix(dawnBot, duskBot, uScroll);
    float band = smoothstep(0.0, 1.0, vUv.y) + n1 * 0.06; // organic horizon
    vec3 col = mix(bot, top, clamp(band, 0.0, 1.0));

    // whisper of drifting light so the sky feels alive
    col = mix(col, vec3(1.0), smoothstep(-0.2, 0.95, n2) * 0.10);

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
      uScroll: { value: 0 },
    }),
    [],
  );

  useFrame((_, dt) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += dt;
    u.uAspect.value = size.width / size.height;
    // day arc follows the ride (frame-rate-independent easing)
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const sp =
      maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    u.uScroll.value += (sp - u.uScroll.value) * (1 - Math.exp(-6 * dt));
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
      <CityParticles />

      {/* full-screen, actually-visible chromatic aberration (canvas only —
          HTML type above is untouched); stronger toward the edges */}
      <EffectComposer>
        <ChromaticAberration
          offset={caOffset}
          radialModulation
          modulationOffset={0.15}
        />
      </EffectComposer>
    </>
  );
}

// restrained: enough for a lens feel at the frame edges, no smearing
const caOffset = new THREE.Vector2(0.0005, 0.0003);
