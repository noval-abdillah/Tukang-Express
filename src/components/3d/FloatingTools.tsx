'use client';

/**
 * @file FloatingTools.tsx
 * @description Komponen Three.js murni — hanya di dalam R3F Canvas.
 * Tema: Hijau muda & putih — clean, fresh.
 *
 * Objek 3D: geometri perkakas rumah tangga (wrench, gear, box, bolt)
 * dengan material putih glossy dan hijau metalik.
 */

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface ToolConfig {
  position: [number, number, number];
  rotation: [number, number, number];
  phaseOffset: number;
  floatSpeed: number;
  floatAmplitude: number;
  color: string;
  emissive: string;
  scale: number;
  type: 'box' | 'torus' | 'octahedron' | 'cylinder';
}

/**
 * Konfigurasi 6 objek 3D — hijau muda & putih.
 * Koordinat world space (X: kiri/kanan, Y: atas/bawah, Z: depan/belakang)
 * Kamera di Z=5, FOV=50 — jadi viewport X≈[-3.5, 3.5], Y≈[-2, 2]
 */
const TOOL_CONFIGS: ToolConfig[] = [
  {
    // Kiri atas — torus hijau (gear)
    position: [-2.8, 1.5, -1.0],
    rotation: [0.3, 0.5, 0.1],
    phaseOffset: 0,
    floatSpeed: 1.1,
    floatAmplitude: 0.18,
    color: '#22C55E',      // green-500
    emissive: '#16A34A',   // green-600
    scale: 0.52,
    type: 'torus',
  },
  {
    // Kanan atas — kotak putih (toolbox)
    position: [2.7, 1.5, -0.5],
    rotation: [0.2, -0.4, 0.15],
    phaseOffset: Math.PI * 0.7,
    floatSpeed: 0.85,
    floatAmplitude: 0.22,
    color: '#FFFFFF',      // putih bersih
    emissive: '#86EFAC',   // green-300 subtle glow
    scale: 0.6,
    type: 'box',
  },
  {
    // Kiri bawah — octahedron emerald (gem)
    position: [-2.3, -1.3, 0.3],
    rotation: [0.5, 0.8, 0.2],
    phaseOffset: Math.PI * 1.4,
    floatSpeed: 1.4,
    floatAmplitude: 0.14,
    color: '#10B981',      // emerald-500
    emissive: '#059669',   // emerald-600
    scale: 0.46,
    type: 'octahedron',
  },
  {
    // Kanan bawah — cylinder hijau muda (bolt)
    position: [2.5, -1.5, 0.2],
    rotation: [1.2, 0.3, 0.4],
    phaseOffset: Math.PI * 0.3,
    floatSpeed: 1.2,
    floatAmplitude: 0.16,
    color: '#86EFAC',      // green-300
    emissive: '#22C55E',   // green-500
    scale: 0.42,
    type: 'cylinder',
  },
  {
    // Tengah kanan — torus besar putih (ring dekoratif)
    position: [3.4, 0.1, -2.0],
    rotation: [0.1, 0.2, 0.3],
    phaseOffset: Math.PI * 1.8,
    floatSpeed: 0.65,
    floatAmplitude: 0.10,
    color: '#FFFFFF',
    emissive: '#DCFCE7',   // green-100
    scale: 0.85,
    type: 'torus',
  },
  {
    // Tengah kiri — kotak kecil hijau gelap
    position: [-3.3, -0.2, -1.5],
    rotation: [0.4, 1.1, 0.2],
    phaseOffset: Math.PI * 1.1,
    floatSpeed: 1.3,
    floatAmplitude: 0.13,
    color: '#16A34A',      // green-600
    emissive: '#22C55E',   // green-500
    scale: 0.38,
    type: 'box',
  },
];

// ─── Individual Tool ──────────────────────────────────────────────────────────

interface SingleToolProps extends ToolConfig {
  scrollProgress: React.MutableRefObject<{ progress: number }>;
  mouseRef: React.MutableRefObject<THREE.Vector2>;
}

function SingleTool({
  position, rotation, phaseOffset, floatSpeed, floatAmplitude,
  color, emissive, scale, type, scrollProgress, mouseRef,
}: SingleToolProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // ── Floating: posY = initialY + sin(t * speed + phase) * amplitude ──────
    meshRef.current.position.y =
      initialY + Math.sin(t * floatSpeed + phaseOffset) * floatAmplitude;

    // ── Idle rotation lambat ──────────────────────────────────────────────────
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.004;

    // ── Mouse parallax (lerp halus, faktor 0.08 = subtle) ────────────────────
    meshRef.current.rotation.x +=
      (mouseRef.current.y * 0.08 - meshRef.current.rotation.x) * 0.015;
    meshRef.current.rotation.y +=
      (mouseRef.current.x * 0.08 - meshRef.current.rotation.y) * 0.015;

    // ── Scroll: objek naik saat scroll ke bawah ───────────────────────────────
    meshRef.current.position.y -= scrollProgress.current.progress * floatAmplitude * 8;
  });

  const matProps = {
    color,
    emissive,
    emissiveIntensity: 0.15,
    metalness: 0.4,
    roughness: 0.25,
  };

  const renderGeometry = () => {
    switch (type) {
      case 'torus':
        // args: [radius, tubeRadius, radialSegments, tubularSegments]
        return <Torus args={[0.5, 0.15, 16, 64]}><meshStandardMaterial {...matProps} /></Torus>;
      case 'box':
        // RoundedBox dengan sudut halus
        return <RoundedBox args={[1, 1, 1]} radius={0.12} smoothness={4}><meshStandardMaterial {...matProps} /></RoundedBox>;
      case 'octahedron':
        // args: [radius, detail]
        return <Octahedron args={[0.6, 0]}><meshStandardMaterial {...matProps} /></Octahedron>;
      case 'cylinder':
        // args: [radiusTop, radiusBottom, height, segments]
        return <mesh><cylinderGeometry args={[0.2, 0.28, 0.9, 8]} /><meshStandardMaterial {...matProps} /></mesh>;
    }
  };

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>{renderGeometry()}</mesh>
    </group>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface FloatingToolsProps {
  scrollProgress: React.MutableRefObject<{ progress: number }>;
}

export function FloatingTools({ scrollProgress }: FloatingToolsProps) {
  const { pointer } = useThree();
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));

  useFrame(() => { mouseRef.current.copy(pointer); });

  return (
    <group>
      {TOOL_CONFIGS.map((config, i) => (
        <SingleTool key={i} {...config} scrollProgress={scrollProgress} mouseRef={mouseRef} />
      ))}
    </group>
  );
}
