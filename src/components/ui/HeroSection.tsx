'use client';

/**
 * @file HeroSection.tsx
 * @description Hero Section utama — layout 2-kolom: teks (kiri) + visual card (kanan).
 *
 * Fix bug: GSAP tidak bisa override Tailwind opacity-0 class setelah hydration.
 * Solusi: elemen dimulai dengan visibility hidden via inline style,
 * GSAP menganimasikan dari opacity:0 ke opacity:1.
 */

import { useRef } from 'react';
import { useGsapHero } from '@/hooks/useGsapHero';
import { HeroCanvas } from '@/components/3d/HeroCanvas';
import { HeroLeft } from '@/components/ui/HeroLeft';
import { HeroRight } from '@/components/ui/HeroRight';

export function HeroSection() {
  const {
    heroContainerRef, badgeRef, titleRef,
    subtitleRef, ctaGroupRef, statsRef, cameraScrollRef,
  } = useGsapHero();

  return (
    <section
      ref={heroContainerRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #ecfdf5 100%)' }}
      aria-label="Hero Section Tukang Express"
    >
      {/* ── Dekoratif blob kanan atas ─────────────────────────────────────── */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(134,239,172,0.25) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
        aria-hidden
      />
      {/* ── Dekoratif blob kiri bawah ─────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(167,243,208,0.2) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
        aria-hidden
      />

      {/* ── Three.js Canvas (background layer) ───────────────────────────── */}
      <HeroCanvas scrollProgress={cameraScrollRef} />

      {/* ── Main Content: 2-column grid ──────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Kolom Kiri — Teks & CTA */}
          <HeroLeft
            badgeRef={badgeRef}
            titleRef={titleRef}
            subtitleRef={subtitleRef}
            ctaGroupRef={ctaGroupRef}
            statsRef={statsRef}
          />

          {/* Kolom Kanan — Visual Mockup */}
          <HeroRight />
        </div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden
      >
        <div className="w-6 h-10 rounded-full border-2 border-green-300 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2 rounded-full bg-green-400 animate-bounce" />
        </div>
        <span className="text-green-500 text-xs font-medium tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
