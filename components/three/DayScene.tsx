import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";

/**
 * Dark Y2K/Y3K iridescent flow field. A near-black base with an oil-slick
 * nebula (the four brand neons) that the cursor REVEALS and brightens — a
 * mouse-interactive, chrome-adjacent background. Full-screen GLSL, fine grain.
 */
const NEONS = ["#52b6dd", "#f079a6", "#4bc78f", "#f5854a"].map(
  (h) => new THREE.Color(h),
);

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
  uniform vec2 uMouse;
  uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 c4;

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
    vec2 mo = uMouse; mo.x *= uAspect;

    float md = distance(uv, mo);
    float infl = smoothstep(0.62, 0.0, md);
    uv += normalize(uv - mo + 1e-4) * infl * infl * 0.14;   // refraction toward cursor

    float t = uTime * 0.035;

    // liquid-chrome fbm field (clean monochrome metal — no muddy colour mixing)
    float n = 0.0, amp = 0.55, frq = 1.0;
    for (int i = 0; i < 4; i++) {
      n += amp * snoise(uv * frq + vec2(t * (0.6 + float(i) * 0.2), -t * 0.45));
      frq *= 1.95; amp *= 0.5;
    }
    n = n * 0.5 + 0.5;

    // mercury ramp: near-black -> graphite -> silver, with a crisp specular
    vec3 deep   = vec3(0.045, 0.05, 0.066);
    vec3 mid    = vec3(0.15, 0.17, 0.21);
    vec3 silver = vec3(0.80, 0.84, 0.90);
    vec3 col = mix(deep, mid, smoothstep(0.22, 0.55, n));
    col = mix(col, silver, smoothstep(0.66, 0.90, n));
    col += smoothstep(0.88, 0.99, n) * 0.35;            // chrome highlight ribbons

    // a whisper of cool tint for richness (kept tiny so it never reads "colourful")
    col += vec3(-0.012, 0.0, 0.022) * smoothstep(0.3, 0.85, n);

    // cursor reveals/brightens the chrome (interactive), deepen slightly on scroll
    col += infl * 0.14;
    col *= 1.0 - uDrift * 0.10;

    float g = (hash(vUv * (uTime + 1.0)) - 0.5) * 0.035;
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
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      c1: { value: NEONS[0].clone() },
      c2: { value: NEONS[1].clone() },
      c3: { value: NEONS[2].clone() },
      c4: { value: NEONS[3].clone() },
    }),
    [],
  );

  useFrame((state, dt) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += dt;
    u.uAspect.value = size.width / size.height;
    u.uDrift.value +=
      (THREE.MathUtils.clamp(scrollState.progress, 0, 1) - u.uDrift.value) *
      0.05;
    const mx = state.pointer.x * 0.5 + 0.5;
    const my = state.pointer.y * 0.5 + 0.5;
    u.uMouse.value.x += (mx - u.uMouse.value.x) * 0.08;
    u.uMouse.value.y += (my - u.uMouse.value.y) * 0.08;
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
