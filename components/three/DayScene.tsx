import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { scrollState } from "@/lib/scroll";

// dawn -> noon -> dusk sky gradient (clean, light, white-first)
const TOP = [
  new THREE.Color("#a9ccee"),
  new THREE.Color("#e9f0f4"),
  new THREE.Color("#bcd8c6"),
];
const BOT = [
  new THREE.Color("#f4ece1"),
  new THREE.Color("#ffffff"),
  new THREE.Color("#eef1e6"),
];

function dayLerp(p: number, stops: THREE.Color[], out: THREE.Color) {
  if (p < 0.5) out.copy(stops[0]).lerp(stops[1], p / 0.5);
  else out.copy(stops[1]).lerp(stops[2], (p - 0.5) / 0.5);
  return out;
}

const skyVert = /* glsl */ `
  varying vec3 vPos;
  void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`;
const skyFrag = /* glsl */ `
  varying vec3 vPos;
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  void main(){
    float h = normalize(vPos).y * 0.5 + 0.5;
    float t = smoothstep(0.0, 1.0, h);
    gl_FragColor = vec4(mix(bottomColor, topColor, t), 1.0);
  }
`;

export default function DayScene() {
  const skyRef = useRef<THREE.ShaderMaterial>(null!);
  const markRef = useRef<THREE.Group>(null!);

  // the Hibi mark as one merged glass solid: ring (last stroke of 日) + H strokes
  const markGeo = useMemo(() => {
    const parts: THREE.BufferGeometry[] = [];
    parts.push(new THREE.TorusGeometry(1, 0.088, 28, 140));
    const sl = new THREE.BoxGeometry(0.15, 1.46, 0.15);
    sl.translate(-0.4, 0, 0);
    parts.push(sl);
    const sr = new THREE.BoxGeometry(0.15, 1.46, 0.15);
    sr.translate(0.4, 0, 0);
    parts.push(sr);
    const bar = new THREE.BoxGeometry(0.8, 0.13, 0.15);
    bar.translate(0, 0.03, 0);
    parts.push(bar);
    return mergeGeometries(parts, false)!;
  }, []);

  const skyUniforms = useMemo(
    () => ({
      topColor: { value: new THREE.Color("#a9ccee") },
      bottomColor: { value: new THREE.Color("#f4ece1") },
    }),
    [],
  );

  useFrame((state, dt) => {
    const p = THREE.MathUtils.clamp(scrollState.progress, 0, 1);
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (skyRef.current) {
      dayLerp(p, TOP, skyRef.current.uniforms.topColor.value);
      dayLerp(p, BOT, skyRef.current.uniforms.bottomColor.value);
    }

    if (markRef.current) {
      const t = state.clock.elapsedTime;
      const swayY = Math.sin(t * 0.28) * 0.5 + px * 0.4;
      const swayX = 0.1 + Math.sin(t * 0.2) * 0.1 - py * 0.3;
      markRef.current.rotation.y += (swayY - markRef.current.rotation.y) * 0.04;
      markRef.current.rotation.x += (swayX - markRef.current.rotation.x) * 0.04;
      markRef.current.position.x = 1.9 + px * 0.15; // sit to the right of left-aligned type
      markRef.current.position.y = py * 0.12 + Math.sin(t * 0.5) * 0.05;
      markRef.current.scale.setScalar(1.3 - p * 0.4);
      markRef.current.position.z = -0.5 - p * 1.5;
    }

    const cam = state.camera;
    cam.position.x += (px * 0.5 - cam.position.x) * 0.04;
    cam.position.y += (py * 0.4 - cam.position.y) * 0.04;
    cam.position.z += (6 - p * 1.0 - cam.position.z) * 0.04;
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* gradient sky dome */}
      <mesh scale={[1, 1, 1]}>
        <sphereGeometry args={[40, 32, 32]} />
        <shaderMaterial
          ref={skyRef}
          args={[
            {
              uniforms: skyUniforms,
              vertexShader: skyVert,
              fragmentShader: skyFrag,
            },
          ]}
          side={THREE.BackSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />

      {/* procedural environment for the glass to refract/reflect (no HDR download) */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          intensity={2.2}
          position={[0, 3, 3]}
          scale={[7, 3, 1]}
          color="#fff4e6"
        />
        <Lightformer
          intensity={1.1}
          position={[-5, 1, -1]}
          scale={[5, 5, 1]}
          color="#cfe6f7"
        />
        <Lightformer
          intensity={1.3}
          position={[5, -2, 1]}
          scale={[4, 4, 1]}
          color="#dff0e4"
        />
      </Environment>

      {/* the glass Hibi mark */}
      <group ref={markRef} rotation={[0.1, 0, 0]}>
        <mesh geometry={markGeo}>
          <MeshTransmissionMaterial
            transmission={1}
            thickness={0.6}
            roughness={0.05}
            ior={1.45}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.05}
            color="#ffffff"
            attenuationColor="#eaf2fb"
            attenuationDistance={3}
            backside
            samples={8}
            resolution={512}
          />
        </mesh>
      </group>

      {/* clean grade: subtle highlight bloom + vignette */}
      <EffectComposer enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0.82}
          intensity={0.5}
          radius={0.7}
          mipmapBlur
        />
        <Vignette offset={0.3} darkness={0.42} />
      </EffectComposer>
    </>
  );
}
