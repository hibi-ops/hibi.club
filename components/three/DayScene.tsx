import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import FlowParticles from "./FlowParticles";

/**
 * Soft pastel mesh gradient (bright, visible, premium) — lilac / pink / blue /
 * peach washes flowing over white; the cursor warps + brightens the mesh.
 * Light enough that ink content stays perfectly readable.
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
  uniform vec2 uMouse;

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

    // cursor warp — visibly pushes the mesh around
    vec2 mo = uMouse; mo.x *= uAspect;
    float md = distance(uv, mo);
    float infl = smoothstep(0.7, 0.0, md);
    uv += normalize(uv - mo + 1e-4) * infl * infl * 0.16;

    float t = uTime * 0.03;
    float n1 = snoise(uv * 0.85 + vec2(t, t * 0.6));
    float n2 = snoise(uv * 1.20 - vec2(t * 0.7, t * 0.4) + n1 * 0.4);
    float n3 = snoise(uv * 0.60 + vec2(-t * 0.5, t * 0.3));
    float n4 = snoise(uv * 1.6 + vec2(t * 0.4, -t * 0.5));

    // SOFT PASTEL MESH GRADIENT (bright, visible, premium — like the reference)
    vec3 white = vec3(1.000, 1.000, 1.000);
    vec3 lilac = vec3(0.855, 0.800, 0.945);
    vec3 pink  = vec3(0.965, 0.780, 0.875);
    vec3 blue  = vec3(0.760, 0.860, 0.965);
    vec3 peach = vec3(0.985, 0.870, 0.800);
    vec3 col = white;
    col = mix(col, lilac, smoothstep(-0.5, 0.7, n1) * 0.55);
    col = mix(col, blue,  smoothstep(-0.4, 0.8, n2) * 0.50);
    col = mix(col, pink,  smoothstep(-0.2, 0.9, n3) * 0.45);
    col = mix(col, peach, smoothstep(0.25, 1.0, n4) * 0.35);

    // cursor reveals a brighter, more saturated bloom
    col = mix(col, mix(pink, blue, 0.5), infl * 0.25);

    float g = (hash(vUv * floor(uTime * 12.0)) - 0.5) * 0.015;
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
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  );

  useFrame((state, dt) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += dt;
    u.uAspect.value = size.width / size.height;
    const mx = state.pointer.x * 0.5 + 0.5;
    const my = state.pointer.y * 0.5 + 0.5;
    u.uMouse.value.x += (mx - u.uMouse.value.x) * 0.09;
    u.uMouse.value.y += (my - u.uMouse.value.y) * 0.09;
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
      <FlowParticles />
    </>
  );
}
