'use client';

/**
 * @file useGsapHero.ts
 *
 * BUG FIX:
 * - Hapus ScrollTrigger parallax opacity yang menyebabkan teks "ilang permanen"
 *   saat scroll balik ke atas. ScrollTrigger scrub mengubah opacity ke 0 dan
 *   tidak otomatis balik ke 1 karena animasi entrance `to()` sudah resolved.
 * - Solusi: HANYA entrance animation, TIDAK ada parallax opacity.
 *   Camera scroll masih bisa dikontrol via cameraScrollRef tanpa mengubah DOM.
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

export interface UseGsapHeroReturn {
  heroContainerRef: React.RefObject<HTMLElement | null>;
  badgeRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  ctaGroupRef: React.RefObject<HTMLDivElement | null>;
  statsRef: React.RefObject<HTMLDivElement | null>;
  cameraScrollRef: React.MutableRefObject<{ progress: number }>;
}

export function useGsapHero(): UseGsapHeroReturn {
  const heroContainerRef = useRef<HTMLElement | null>(null);
  const badgeRef        = useRef<HTMLDivElement | null>(null);
  const titleRef        = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef     = useRef<HTMLParagraphElement | null>(null);
  const ctaGroupRef     = useRef<HTMLDivElement | null>(null);
  const statsRef        = useRef<HTMLDivElement | null>(null);
  const cameraScrollRef = useRef<{ progress: number }>({ progress: 0 });

  useGSAP(
    () => {
      if (
        !heroContainerRef.current || !badgeRef.current   ||
        !titleRef.current          || !subtitleRef.current ||
        !ctaGroupRef.current       || !statsRef.current
      ) return;

      // ── ENTRANCE: animasi masuk satu kali saat load ─────────────────────────
      // Gunakan gsap.set() dulu untuk memastikan initial state,
      // lalu gsap.to() untuk animasi ke state akhir.
      // Ini lebih reliable dari from() di SSR/hydration.
      gsap.set(
        [badgeRef.current, titleRef.current, subtitleRef.current,
         ctaGroupRef.current, statsRef.current],
        { opacity: 0, y: 30 }
      );

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', clearProps: 'transform' },
        delay: 0.2,
      });

      tl.to(badgeRef.current,    { opacity: 1, y: 0, duration: 0.6 })
        .to(titleRef.current,    { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .to(ctaGroupRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(statsRef.current,    { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

      // ── SCROLL: HANYA update cameraScrollRef, TIDAK sentuh opacity DOM ──────
      // Dengan ini Three.js camera bergerak saat scroll
      // tapi teks TIDAK ikut bergerak/menghilang
      const st = ScrollTrigger.create({
        trigger: heroContainerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          cameraScrollRef.current.progress = self.progress;
        },
      });

      return () => {
        tl.kill();
        st.kill();
        // Kill semua ScrollTrigger yang terkait scope ini
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    },
    { scope: heroContainerRef, dependencies: [] }
  );

  return {
    heroContainerRef, badgeRef, titleRef,
    subtitleRef, ctaGroupRef, statsRef, cameraScrollRef,
  };
}
