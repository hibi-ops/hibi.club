"use client";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A coherent 3D particle model (teletech-style): ~7000 fine particles orbiting
 * a torus — a quiet planetary ring behind the hero. Fully GPU-animated.
 * Mouse: the ring tilts toward the cursor; nearby particles are pushed aside,
 * brighten and grow. Colour: a slowly-shifting muted spectrum along the ring
 * (premium "variable colour", never candy).
 */
const COUNT = 7000;

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

  // muted designer palette: slate -> mauve -> sage -> bronze (low saturation)
  vec3 pal(float t){
    return vec3(0.46) + vec3(0.17, 0.15, 0.19) * cos(6.2831853 * (t + vec3(0.0, 0.11, 0.23)));
  }

  void main(){
    // orbital motion along the ring + slow swirl around the tube
    float v = aV + uTime * (0.05 + 0.10 * aSeed);
    float u = aU + uTime * (0.25 * aSeed);
    float R = 2.6;
    vec3 p;
    p.x = (R + aR * cos(u)) * cos(v);
    p.y = (R + aR * cos(u)) * sin(v);
    p.z = aR * sin(u);

    // gentle breathing so the band feels alive
    p += 0.05 * vec3(
      sin(v * 3.0 + uTime * 0.7 + aSeed * 6.2831853),
      cos(v * 2.0 + uTime * 0.55),
      sin(u * 2.0 + uTime * 0.5)
    );

    vec4 world = modelMatrix * vec4(p, 1.0);

    // cursor pushes nearby particles aside (water-pocket), they brighten + grow
    vec2 d = world.xy - uMouse;
    float md = length(d);
    float rep = smoothstep(2.1, 0.0, md);
    world.xy += normalize(d + 1e-4) * rep * rep * 0.85;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + 3.4 * aSeed) * uPx * (6.0 / -mv.z) * (1.0 + rep * 0.9);

    vCol = pal(fract(v * 0.159155 + uHue));
    vA = (0.30 + 0.45 * aSeed) * (1.0 + rep * 0.9);
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
    const pos = new Float32Array(COUNT * 3); // placeholder; real pos computed in shader
    const aU = new Float32Array(COUNT);
    const aV = new Float32Array(COUNT);
    const aR = new Float32Array(COUNT);
    const aSeed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      aU[i] = Math.random() * Math.PI * 2;
      aV[i] = Math.random() * Math.PI * 2;
      // bias dust toward the tube core, with a hazy halo
      const rr = Math.pow(Math.random(), 1.6);
      aR[i] = 0.1 + rr * 0.55;
      aSeed[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aU", new THREE.BufferAttribute(aU, 1));
    g.setAttribute("aV", new THREE.BufferAttribute(aV, 1));
    g.setAttribute("aR", new THREE.BufferAttribute(aR, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    // shader computes positions; keep it from being culled
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
    uniforms.uMouse.value.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2,
    );
    // the model leans toward the cursor (whole-object interaction)
    const g = group.current;
    if (g) {
      g.rotation.x += (1.22 - state.pointer.y * 0.14 - g.rotation.x) * 0.05;
      g.rotation.y += (state.pointer.x * 0.22 - g.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, -0.2, 0]} rotation={[1.22, 0, 0.16]}>
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
