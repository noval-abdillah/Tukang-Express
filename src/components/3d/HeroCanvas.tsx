'use client';

/**
 * @file HeroCanvas.tsx
 * @description R3F Canvas untuk Hero Section — light green theme.
 * Background: transparan di atas gradient CSS putih/hijau-50.
 */

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FloatingTools } from './FloatingTools';
import { ParticleField } from './ParticleField';

// ─── Camera Rig ───────────────────────────────────────────────────────────────

interface CameraRigProps {
  scrollProgress: React.MutableRefObject<{ progress: number }>;
}

/**
 * CameraRig: mengontrol kamera berdasarkan scroll progress.
 * Kamera mundur saat scroll (zoom out effect) + gentle float.
 */
function CameraRig({ scrollProgress }: CameraRigProps) {
  useFrame((state) => {
    const p = scrollProgress.current.progress;

    // Z: mulai 5, mundur ke 7.5 saat full scroll
    const targetZ = 5 + p * 2.5;
    // Rotasi Y: putar sedikit ke kanan (max ~12°)
    const targetRotY = -p * (Math.PI / 15);

    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
    state.camera.rotation.y += (targetRotY - state.camera.rotation.y) * 0.05;

    // Subtle floating kamera — amplitude 0.04
    state.camera.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.04;
  });
  return null;
}

// ─── HeroCanvas ───────────────────────────────────────────────────────────────

interface HeroCanvasProps {
  scrollProgress: React.MutableRefObject<{ progress: number }>;
}

export function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
  return (
    <Canvas
      /**
       * Kamera: fov=50, posisi Z=5 (lebih dekat dari sebelumnya agar objek terasa besar)
       */
      camera={{ fov: 50, near: 0.1, far: 100, position: [0, 0, 5] }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* ── Lighting — terang & clean untuk light theme ───────────────────── */}

      {/**
       * Ambient kuat untuk kesan terang merata — intensitas 0.8
       * Di light theme, ambient lebih tinggi dari dark theme
       */}
      <ambientLight intensity={0.8} color="#FFFFFF" />

      {/**
       * Directional utama — dari kanan atas, sinar putih terang
       * Membuat highlight glossy pada permukaan metalik
       */}
      <directionalLight
        position={[6, 5, 4]}
        intensity={2.0}
        color="#FFFFFF"
      />

      {/**
       * Fill light dari kiri — warna hijau sangat lembut
       * Memberikan tinted shadow yang sesuai tema
       */}
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.6}
        color="#DCFCE7"  // green-100
      />

      {/**
       * Accent light dari bawah-depan — hijau muda
       * Rim effect yang fresh pada objek
       */}
      <pointLight
        position={[0, -4, 3]}
        intensity={0.8}
        color="#22C55E"  // green-500
        distance={10}
        decay={2}
      />

      {/* ── 3D Objects ───────────────────────────────────────────────────── */}
      <ParticleField count={80} spread={7} />
      <FloatingTools scrollProgress={scrollProgress} />
      <CameraRig scrollProgress={scrollProgress} />
    </Canvas>
  );
}
