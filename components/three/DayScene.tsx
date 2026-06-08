import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
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

// day light arc — kept LIGHT so ink type stays readable + brand stays white-first
const DAWN = new THREE.Color("#e9f3fb"); // sky-tinted morning
const NOON = new THREE.Color("#f8f8f6"); // paper near-white
const DUSK = new THREE.Color("#eef6f0"); // green-tinted dusk (belong)
const SUN_DAWN = new THREE.Color("#bfe2f2");
const SUN_NOON = new THREE.Color("#fff3e2");
const SUN_DUSK = new THREE.Color("#bfe6cf");

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
  const sunMatRef = useRef<THREE.MeshBasicMaterial>(null!);
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
        color: new THREE.Color("#e4e4e1"),
        roughness: 0.62,
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

    // sun arc + tint
    if (sunRef.current && sunMatRef.current) {
      const ang = p * Math.PI;
      sunRef.current.position.set(-4.5 + p * 9, -1.4 + Math.sin(ang) * 4.2, -5);
      dayLerp(p, SUN_DAWN, SUN_NOON, SUN_DUSK, sunMatRef.current.color);
      if (sunLightRef.current) {
        sunLightRef.current.position.copy(sunRef.current.position);
        sunLightRef.current.color.copy(sunMatRef.current.color);
      }
    }

    // mark: gentle sway (never edge-on) + cursor tilt + slow scroll recede
    if (markRef.current) {
      const t = state.clock.elapsedTime;
      const swayY = Math.sin(t * 0.3) * 0.45 + px * 0.35;
      const swayX = 0.12 + Math.sin(t * 0.23) * 0.08 - py * 0.28;
      markRef.current.rotation.y += (swayY - markRef.current.rotation.y) * 0.05;
      markRef.current.rotation.x += (swayX - markRef.current.rotation.x) * 0.05;
      const s = 1.35 - p * 0.5; // large embossed watermark, recedes on scroll
      markRef.current.scale.setScalar(s);
      markRef.current.position.y = -0.2 + py * 0.12 + Math.sin(t * 0.6) * 0.05;
      markRef.current.position.z = -1.5 - p * 1.5; // sit behind content
    }

    // stamp field: parallax to cursor + fly through on scroll
    if (stampsRef.current) {
      stampsRef.current.position.x +=
        (px * 0.6 - stampsRef.current.position.x) * 0.04;
      stampsRef.current.position.y +=
        (py * 0.45 - stampsRef.current.position.y) * 0.04;
      stampsRef.current.position.z = -2 + p * 7;
      stampsRef.current.rotation.z += dt * 0.015;
    }
  });

  return (
    <>
      <color ref={bgRef} attach="background" args={["#f8f8f6"]} />
      <fog ref={fogRef} attach="fog" args={["#f8f8f6", 5, 19]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <pointLight ref={sunLightRef} intensity={18} distance={22} decay={2} />

      {/* sun */}
      <mesh ref={sunRef} position={[-4.5, 0, -5]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          ref={sunMatRef}
          color={SUN_DAWN}
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
    </>
  );
}
