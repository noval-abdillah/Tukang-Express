'use client';

/**
 * @file ParticleField.tsx
 * @description Partikel ambient untuk light theme — hijau muda sangat transparan.
 * Memberikan kesan "ruang yang hidup" tanpa menggelapkan background putih.
 *
 * Fix: r3f v9+ mengubah API bufferAttribute — kini menggunakan attach via
 * THREE.BufferGeometry.setAttribute() secara imperatif di useEffect.
 */

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  spread?: number;
}

export function ParticleField({ count = 80, spread = 7 }: ParticleFieldProps) {
  const pointsRef  = useRef<THREE.Points>(null!);
  const geoRef     = useRef<THREE.BufferGeometry>(null!);

  /**
   * Posisi random dalam sphere — Float32Array untuk performa.
   * Jumlah partikel dikurangi (80 vs 120) karena light bg = lebih terlihat.
   */
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 0] = (Math.random() * 2 - 1) * spread; // X: [-spread, +spread]
      pos[i3 + 1] = (Math.random() * 2 - 1) * spread; // Y
      pos[i3 + 2] = (Math.random() * 2 - 1) * spread; // Z
    }
    return pos;
  });

  // Attach BufferAttribute secara imperatif — kompatibel dengan r3f v8 & v9
  useEffect(() => {
    if (!geoRef.current) return;
    geoRef.current.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );
  }, [positions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Rotasi sangat lambat — 0.012 rad/s ≈ hampir tidak terasa
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.006;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial
        size={0.04}
        color="#22C55E"      // green-500
        sizeAttenuation
        transparent
        opacity={0.3}        // lebih transparan di light bg agar tidak mencolok
        depthWrite={false}
      />
    </points>
  );
}
