/**
 * @file gsap.ts
 * @description Singleton GSAP plugin registration.
 * Import file ini SEKALI di root komponen atau hook untuk mendaftarkan
 * semua plugin GSAP (ScrollTrigger, dll.).
 * 
 * Menggunakan pola "register once" agar tidak ada double-registration
 * yang bisa menyebabkan bug animasi di Next.js (SSR + Client Hydration).
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Daftarkan hanya di sisi client (browser)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
