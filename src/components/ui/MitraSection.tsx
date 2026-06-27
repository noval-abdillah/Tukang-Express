'use client';

/**
 * @file MitraSection.tsx
 * @description Section CTA untuk Mitra — berdasarkan PRD §3.2 Sisi Mitra.
 *
 * Fitur mitra yang di-highlight:
 * - Dashboard Kinerja & Pendapatan
 * - Availability Toggle (Online/Offline)
 * - Registrasi & KYC Digital
 * - Premium Subscription (visibilitas lebih tinggi)
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BarChart3, ToggleRight, BadgeCheck, Crown,
  ArrowRight, Wallet, Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MITRA_FEATURES = [
  {
    icon: BarChart3,
    title: 'Dashboard Kinerja',
    description: 'Grafik pendapatan harian/mingguan, ulasan performa, dan saldo dompet digital dalam satu layar.',
  },
  {
    icon: ToggleRight,
    title: 'Online/Offline Toggle',
    description: 'Kontrol penuh kapan Anda mau terima order. Aktifkan kapanpun, matikan kapanpun — fleksibel.',
  },
  {
    icon: BadgeCheck,
    title: 'KYC Digital',
    description: 'Proses verifikasi KTP & sertifikat dilakukan digital. Akun terverifikasi = lebih dipercaya customer.',
  },
  {
    icon: Crown,
    title: 'Premium Subscription',
    description: 'Upgrade ke Mitra Premium untuk tampil lebih atas di radar pencarian customer di area Anda.',
  },
  {
    icon: Wallet,
    title: 'Penarikan Dana Mudah',
    description: 'Cairkan saldo dompet digital ke rekening bank lokal manapun — proses dalam 1x24 jam.',
  },
  {
    icon: Users,
    title: 'Input Biaya Tambahan',
    description: 'Ajukan biaya material ekstra via aplikasi. Customer approve langsung — tidak perlu negosiasi awkward.',
  },
];

export function MitraSection() {
  const sectionRef = useRef<HTMLElement>(null!);
  const leftRef = useRef<HTMLDivElement>(null!);
  const rightRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      // Konten kiri masuk dari kiri
      gsap.fromTo(leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      // Grid fitur masuk dari kanan dengan stagger
      gsap.fromTo(rightRef.current.children,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="mitra"
      className="py-24 lg:py-32 bg-green-600 relative overflow-hidden"
      aria-labelledby="mitra-heading"
    >
      {/* Dekorasi blob di background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-500/40 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-700/40 blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy & CTA ──────────────────────────────────────── */}
          <div ref={leftRef}>
            <span className="
              inline-block px-4 py-1.5 rounded-full mb-6
              bg-white/20 text-white text-sm font-semibold
              border border-white/30
            ">
              Untuk Para Profesional
            </span>

            <h2
              id="mitra-heading"
              className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
            >
              Bergabung Jadi{' '}
              <span className="
                bg-gradient-to-r from-green-200 to-emerald-200
                bg-clip-text text-transparent
              ">
                Mitra Tukang Express
              </span>
            </h2>

            <p className="text-green-100 text-lg leading-relaxed mb-8">
              Tingkatkan penghasilan Anda dengan jangkauan pelanggan lebih luas,
              sistem pembayaran terjamin, dan alat manajemen bisnis profesional —
              semua gratis untuk bergabung.
            </p>

            {/* Stats mini */}
            <div className="flex gap-10 mb-10">
              <div>
                <p className="text-3xl font-black text-white">Rp 8jt+</p>
                <p className="text-green-200 text-sm">Rata-rata pendapatan/bulan</p>
              </div>
              <div className="w-px bg-white/20" aria-hidden />
              <div>
                <p className="text-3xl font-black text-white">5.000+</p>
                <p className="text-green-200 text-sm">Mitra aktif bergabung</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/daftar-mitra"
                id="mitra-cta-primary"
                className="
                  flex items-center justify-center gap-3 px-8 py-4 rounded-2xl
                  bg-white hover:bg-green-50
                  text-green-700 font-bold text-base
                  shadow-xl shadow-green-900/20
                  transition-all duration-300 hover:scale-105 active:scale-95
                "
              >
                Daftar Sekarang — Gratis
                <ArrowRight className="w-4 h-4" aria-hidden />
              </a>

              <a
                href="/panduan-mitra"
                id="mitra-cta-secondary"
                className="
                  flex items-center justify-center gap-3 px-8 py-4 rounded-2xl
                  bg-transparent border-2 border-white/40
                  hover:bg-white/10 hover:border-white/60
                  text-white font-semibold text-base
                  transition-all duration-300 hover:scale-105 active:scale-95
                "
              >
                Pelajari Lebih Lanjut
              </a>
            </div>

            {/* Note KYC */}
            <p className="text-green-200/70 text-xs mt-6 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-green-300" aria-hidden />
              Proses verifikasi KYC digital — siapkan KTP & foto profesi
            </p>
          </div>

          {/* ── Right: Feature Grid ────────────────────────────────────── */}
          <div
            ref={rightRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {MITRA_FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="
                    p-5 rounded-2xl
                    bg-white/10 backdrop-blur-sm border border-white/20
                    hover:bg-white/15 hover:border-white/30
                    transition-all duration-300 hover:-translate-y-0.5
                  "
                >
                  <Icon className="w-6 h-6 text-green-200 mb-3" aria-hidden />
                  <h3 className="text-sm font-bold text-white mb-1.5">{feat.title}</h3>
                  <p className="text-green-200/80 text-xs leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
