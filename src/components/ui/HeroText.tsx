'use client';

/**
 * @file HeroText.tsx
 * @description Konten teks Hero Section — tema hijau muda & putih.
 * Teks gelap (green-900) di atas background putih/hijau-50.
 */

import { Wrench, Zap, Star, ArrowRight, Phone, CheckCircle } from 'lucide-react';

interface HeroTextProps {
  badgeRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  ctaGroupRef: React.RefObject<HTMLDivElement | null>;
  statsRef: React.RefObject<HTMLDivElement | null>;
}

export function HeroText({
  badgeRef, titleRef, subtitleRef, ctaGroupRef, statsRef,
}: HeroTextProps) {
  const trustPoints = [
    'Mitra Terverifikasi KYC',
    'Pembayaran Escrow Aman',
    'Estimasi Harga Transparan',
  ];

  return (
    <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 lg:px-16 max-w-3xl">

      {/* ── Badge ─────────────────────────────────────────────────────────── */}
      <div
        ref={badgeRef}
        id="hero-badge"
        className="
          inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
          bg-green-100 border border-green-200
          text-sm font-semibold text-green-700
          opacity-0
        "
      >
        <Zap className="w-4 h-4 text-green-500" aria-hidden />
        <span>Platform Jasa #1 Terverifikasi di Indonesia</span>
      </div>

      {/* ── H1 Judul ──────────────────────────────────────────────────────── */}
      <h1
        ref={titleRef}
        id="hero-title"
        className="
          text-5xl lg:text-7xl font-black tracking-tight leading-[1.05]
          text-green-900 mb-6
          opacity-0
        "
      >
        Tukang Ahli,{' '}
        <span className="
          bg-gradient-to-r from-green-500 to-emerald-400
          bg-clip-text text-transparent
        ">
          Datang Cepat
        </span>
        ,{' '}
        <br />
        Harga{' '}
        <span className="
          relative inline-block
          after:content-[''] after:absolute after:bottom-0 after:left-0
          after:w-full after:h-[6px] after:bg-green-200 after:-z-10
          after:rounded-full
        ">
          Transparan.
        </span>
      </h1>

      {/* ── Subtitle ──────────────────────────────────────────────────────── */}
      <p
        ref={subtitleRef}
        id="hero-subtitle"
        className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl mb-8 opacity-0"
      >
        Dari servis AC, ledeng, hingga kebersihan rumah —
        pesan <strong className="text-green-700">Mitra Tukang terdekat</strong> dalam
        hitungan menit. Dana aman via sistem escrow.
      </p>

      {/* ── Trust Points ──────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 opacity-0" ref={ctaGroupRef} id="hero-cta-group">
        {trustPoints.map((point) => (
          <div key={point} className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden />
            {point}
          </div>
        ))}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
          <a
            href="#layanan"
            id="hero-cta-primary"
            className="
              group flex items-center justify-center gap-3
              px-8 py-4 rounded-2xl
              bg-gradient-to-r from-green-500 to-emerald-500
              hover:from-green-400 hover:to-emerald-400
              text-white font-bold text-base
              shadow-lg shadow-green-500/30
              transition-all duration-300
              hover:scale-105 hover:shadow-green-500/50
              active:scale-95
            "
          >
            <Wrench className="w-5 h-5" aria-hidden />
            Pesan Sekarang
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </a>

          <a
            href="#mitra"
            id="hero-cta-secondary"
            className="
              group flex items-center justify-center gap-3
              px-8 py-4 rounded-2xl
              bg-white border-2 border-green-300
              hover:bg-green-50 hover:border-green-400
              text-green-700 font-semibold text-base
              transition-all duration-300
              hover:scale-105
              active:scale-95
              shadow-sm
            "
          >
            <Phone className="w-5 h-5" aria-hidden />
            Daftar Jadi Mitra
          </a>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        id="hero-stats"
        className="flex items-center gap-8 opacity-0"
      >
        <StatItem value="5.000+" label="Mitra Aktif" />
        <Divider />
        <StatItem
          value="4.9"
          label="Rating"
          icon={<Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
        />
        <Divider />
        <StatItem value="50K+" label="Order Selesai" />
      </div>
    </div>
  );
}

function StatItem({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="flex items-center gap-1.5 text-2xl font-black text-green-900">
        {icon}{value}
      </span>
      <span className="text-xs text-gray-500 mt-0.5">{label}</span>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-10 bg-green-200" aria-hidden />;
}
