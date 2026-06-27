/**
 * @file page.tsx — Halaman utama / landing page.
 * Navbar & Footer sudah di layout.tsx global, tidak perlu import lagi.
 *
 * Alur section (sesuai PRD):
 * 1. Hero        — 3D tools + GSAP animated text + app mockup
 * 2. Layanan     — 3 kartu: AC, Ledeng, Kebersihan (PRD §7 Fase 1)
 * 3. Cara Kerja  — 4 langkah order state machine (PRD §4.2)
 * 4. Fitur       — Escrow, Real-time tracking, Rating, Chat (PRD §3.1)
 * 5. Mitra       — Fitur & CTA untuk Mitra (PRD §3.2)
 */

import { HeroSection }      from '@/components/ui/HeroSection';
import { ServicesSection }  from '@/components/ui/ServicesSection';
import { HowItWorksSection } from '@/components/ui/HowItWorksSection';
import { FeaturesSection }  from '@/components/ui/FeaturesSection';
import { MitraSection }     from '@/components/ui/MitraSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <FeaturesSection />
      <MitraSection />
    </main>
  );
}
