import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Mouse-interactive polished-metal background (Apple-ish): a crisp fbm chrome
 * with colourful iridescent reflections (a harmonious cool spectrum) woven into
 * the metal; the cursor lenses + reveals richer colour. Brighter, not muddy.
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

    // INTERACTIVE: a lens that follows the cursor
    vec2 mo = uMouse; mo.x *= uAspect;
    float md = distance(uv, mo);
    float infl = smoothstep(0.65, 0.0, md);
    uv += normalize(uv - mo + 1e-4) * infl * infl * 0.12;

    float t = uTime * 0.03;

    // crisper polished-metal fbm (more octaves, higher base frequency)
    float n = 0.0, amp = 0.55, frq = 1.35;
    for (int i = 0; i < 5; i++) {
      n += amp * snoise(uv * frq + vec2(t * (0.5 + float(i) * 0.18), -t * 0.4));
      frq *= 2.0; amp *= 0.5;
    }
    n = n * 0.5 + 0.5;

    // cool steel ramp — dark enough for text, lighter than before (not "too dark")
    vec3 deep   = vec3(0.06, 0.07, 0.10);
    vec3 mid    = vec3(0.20, 0.22, 0.29);
    vec3 silver = vec3(0.88, 0.91, 0.99);
    vec3 col = mix(deep, mid, smoothstep(0.16, 0.52, n));
    col = mix(col, silver, smoothstep(0.62, 0.92, n));
    float spec = smoothstep(0.80, 0.99, n);
    col += spec * 0.40;

    // COOL premium iridescence (blue -> violet -> cyan only) — reflections, not a wash
    float ph = fract(n * 0.9 + uv.x * 0.12 + t * 0.35);
    vec3 cblue = vec3(0.20, 0.45, 0.95);
    vec3 cviolet = vec3(0.55, 0.30, 0.96);
    vec3 ccyan = vec3(0.18, 0.85, 0.96);
    vec3 irid = ph < 0.5 ? mix(cblue, cviolet, smoothstep(0.0, 0.5, ph))
                         : mix(cviolet, ccyan, smoothstep(0.5, 1.0, ph));
    col = mix(col, irid, spec * 0.5);               // colour rides the highlights
    col += irid * infl * 0.32;                       // cursor reveals a vivid colour pool
    col += infl * 0.05;

    float g = (hash(vUv * floor(uTime * 12.0)) - 0.5) * 0.022;
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
