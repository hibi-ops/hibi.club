"use client";
import { Canvas } from "@react-three/fiber";
import DayScene from "./DayScene";

export default function DayCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
    >
      <DayScene />
    </Canvas>
  );
}
