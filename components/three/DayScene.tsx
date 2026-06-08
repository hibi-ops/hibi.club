import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";

/**
 * Premium flowing-gradient hero (the cutting-edge WebGL look): a full-screen
 * simplex-noise color field, slow and organic, with fine grain to kill banding.
 * No literal 3D object. Palette is warm/editorial and easy to swap.
 */

// warm editorial palette (low saturation, premium)
const PALETTE = ["#f6efe6", "#ecdcca", "#e3e7e1", "#f1dfe0"].map(
  (h) => new THREE.Color(h),
);
// a faint cool drift the gradient eases toward as you scroll (dusk)
const DRIFT = new THREE.Color("#dfe4ea");

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform float uDrift;
  uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 c4; uniform vec3 cd;

  // Ashima simplex noise 2D
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
    float t = uTime * 0.045;
    float n1 = snoise(uv * 1.15 + vec2(t, t*0.6));
    float n2 = snoise(uv * 1.9 - vec2(t*0.8, t*0.4) + n1*0.4);
    float n3 = snoise(uv * 0.8 + vec2(-t*0.5, t*0.3));

    vec3 col = mix(c1, c2, smoothstep(-0.7, 0.7, n1));
    col = mix(col, c3, smoothstep(-0.4, 0.8, n2) * 0.7);
    col = mix(col, c4, smoothstep(0.25, 1.0, n3) * 0.6);
    // ease toward a cool drift as you scroll (a quiet "day -> dusk")
    col = mix(col, cd, uDrift * 0.35);

    // fine grain to avoid banding (premium gradients always have it)
    float g = (hash(vUv * (uTime + 1.0)) - 0.5) * 0.025;
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
      uDrift: { value: 0 },
      c1: { value: PALETTE[0].clone() },
      c2: { value: PALETTE[1].clone() },
      c3: { value: PALETTE[2].clone() },
      c4: { value: PALETTE[3].clone() },
      cd: { value: DRIFT.clone() },
    }),
    [],
  );

  useFrame((_, dt) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += dt;
    u.uAspect.value = size.width / size.height;
    u.uDrift.value +=
      (THREE.MathUtils.clamp(scrollState.progress, 0, 1) - u.uDrift.value) *
      0.05;
  });

  return (
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
  );
}
