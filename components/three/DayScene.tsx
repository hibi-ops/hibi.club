import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";

// brand tokens as three colors
const INK = new THREE.Color("#15141a");
const NEONS = [
  new THREE.Color("#52b6dd"), // sky
  new THREE.Color("#f079a6"), // pink
  new THREE.Color("#4bc78f"), // green
  new THREE.Color("#f5854a"), // orange
];

// day light arc — deeper/cinematic but still light enough for ink type
const DAWN = new THREE.Color("#cfe6f7"); // richer sky morning
const NOON = new THREE.Color("#f8f8f6"); // paper near-white (high noon)
const DUSK = new THREE.Color("#dcecdf"); // deeper green dusk (belong)
const SUN_DAWN = new THREE.Color("#bfe2f5");
const SUN_NOON = new THREE.Color("#fff0d4");
const SUN_DUSK = new THREE.Color("#bdebcf");

const tmpA = new THREE.Color();
const tmpB = new THREE.Color();
function dayLerp(
  p: number,
  a0: THREE.Color,
  a1: THREE.Color,
  a2: THREE.Color,
  out: THREE.Color,
) {
  if (p < 0.5) out.copy(a0).lerp(a1, p / 0.5);
  else out.copy(a1).lerp(a2, (p - 0.5) / 0.5);
  return out;
}

type Stamp = {
  pos: [number, number, number];
  scale: number;
  rot: number;
  neon: number;
};

export default function DayScene() {
  const bgRef = useRef<THREE.Color>(null!);
  const fogRef = useRef<THREE.Fog>(null!);
  const markRef = useRef<THREE.Group>(null!);
  const stampsRef = useRef<THREE.Group>(null!);
  const sunRef = useRef<THREE.Mesh>(null!);
  const sunMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const sunLightRef = useRef<THREE.PointLight>(null!);

  // ~64 drifting "日" stamps; mostly ink (faint), a few neon points
  const stamps = useMemo<Stamp[]>(() => {
    const arr: Stamp[] = [];
    for (let i = 0; i < 64; i++) {
      const neon = Math.random() < 0.12 ? Math.floor(Math.random() * 4) : -1;
      arr.push({
        pos: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          -7 + Math.random() * 7,
        ],
        scale: 0.14 + Math.random() * 0.34,
        rot: Math.random() * Math.PI,
        neon,
      });
    }
    return arr;
  }, []);

  const stampGeo = useMemo(() => new THREE.CircleGeometry(0.5, 40), []);
  const inkMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: INK,
        transparent: true,
        opacity: 0.05,
      }),
    [],
  );
  const neonMats = useMemo(
    () =>
      NEONS.map(
        (c) =>
          new THREE.MeshBasicMaterial({
            color: c,
            transparent: true,
            opacity: 0.42,
          }),
      ),
    [],
  );
  // soft embossed watermark tone — text reads cleanly over it (white-first)
  const markMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#dcdcd9"),
        roughness: 0.6,
        metalness: 0.0,
      }),
    [],
  );

  useFrame((state, dt) => {
    const p = THREE.MathUtils.clamp(scrollState.progress, 0, 1);
    const px = state.pointer.x;
    const py = state.pointer.y;

    // day colour arc
    if (bgRef.current) dayLerp(p, DAWN, NOON, DUSK, bgRef.current);
    if (fogRef.current) dayLerp(p, DAWN, NOON, DUSK, fogRef.current.color);

    // sun arc + HDR emissive tint (drives the bloom)
    if (sunRef.current && sunMatRef.current) {
      const ang = p * Math.PI;
      sunRef.current.position.set(-5 + p * 10, -1.8 + Math.sin(ang) * 5, -5);
      dayLerp(p, SUN_DAWN, SUN_NOON, SUN_DUSK, sunMatRef.current.emissive);
      if (sunLightRef.current) {
        sunLightRef.current.position.copy(sunRef.current.position);
        sunLightRef.current.color.copy(sunMatRef.current.emissive);
      }
    }

    // mark: gentle sway (never edge-on) + cursor tilt + big presence, recedes on scroll
    if (markRef.current) {
      const t = state.clock.elapsedTime;
      const swayY = Math.sin(t * 0.3) * 0.5 + px * 0.4;
      const swayX = 0.12 + Math.sin(t * 0.23) * 0.1 - py * 0.32;
      markRef.current.rotation.y += (swayY - markRef.current.rotation.y) * 0.05;
      markRef.current.rotation.x += (swayX - markRef.current.rotation.x) * 0.05;
      const s = 1.7 - p * 0.55; // bigger hero presence, recedes on scroll
      markRef.current.scale.setScalar(s);
      markRef.current.position.y = -0.2 + py * 0.14 + Math.sin(t * 0.6) * 0.06;
      markRef.current.position.z = -1.3 - p * 1.8;
    }

    // stamp field: parallax to cursor + fly through on scroll
    if (stampsRef.current) {
      stampsRef.current.position.x +=
        (px * 0.7 - stampsRef.current.position.x) * 0.04;
      stampsRef.current.position.y +=
        (py * 0.5 - stampsRef.current.position.y) * 0.04;
      stampsRef.current.position.z = -2 + p * 8;
      stampsRef.current.rotation.z += dt * 0.018;
    }

    // camera: cursor parallax + slow dolly-in on scroll (cinematic depth)
    const cam = state.camera;
    cam.position.x += (px * 0.5 - cam.position.x) * 0.04;
    cam.position.y += (py * 0.4 - cam.position.y) * 0.04;
    cam.position.z += (6 - p * 1.2 - cam.position.z) * 0.04;
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      <color ref={bgRef} attach="background" args={["#f8f8f6"]} />
      <fog ref={fogRef} attach="fog" args={["#f8f8f6", 5, 19]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <pointLight ref={sunLightRef} intensity={18} distance={22} decay={2} />

      {/* sun — HDR emissive so it drives the bloom */}
      <mesh ref={sunRef} position={[-5, 0, -5]}>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshStandardMaterial
          ref={sunMatRef}
          color="#000000"
          emissive={SUN_DAWN}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* the mark: ring (last stroke of 日) + H strokes, extruded to 3D */}
      <group ref={markRef} rotation={[0.1, 0, 0]}>
        <mesh material={markMat}>
          <torusGeometry args={[1, 0.075, 18, 96]} />
        </mesh>
        <mesh position={[-0.4, 0, 0]} material={markMat}>
          <boxGeometry args={[0.12, 1.42, 0.12]} />
        </mesh>
        <mesh position={[0.4, 0, 0]} material={markMat}>
          <boxGeometry args={[0.12, 1.42, 0.12]} />
        </mesh>
        <mesh position={[0, 0.03, 0]} material={markMat}>
          <boxGeometry args={[0.8, 0.1, 0.12]} />
        </mesh>
      </group>

      {/* drifting 日 stamp field */}
      <group ref={stampsRef}>
        {stamps.map((s, i) => (
          <mesh
            key={i}
            geometry={stampGeo}
            material={s.neon >= 0 ? neonMats[s.neon] : inkMat}
            position={s.pos}
            rotation={[0, 0, s.rot]}
            scale={s.scale}
          />
        ))}
      </group>

      {/* cinematic grade: sun bloom + depth + vignette */}
      <EffectComposer enableNormalPass={false}>
        <Bloom
          luminanceThreshold={1.0}
          intensity={0.9}
          radius={0.8}
          mipmapBlur
        />
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.05}
          bokehScale={2.2}
          height={420}
        />
        <Vignette offset={0.32} darkness={0.5} />
      </EffectComposer>
    </>
  );
}
