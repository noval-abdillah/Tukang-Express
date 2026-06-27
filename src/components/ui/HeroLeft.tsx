'use client';

/**
 * @file HeroLeft.tsx — Kolom kiri Hero: teks, CTA, stats.
 * Elemen TIDAK pakai opacity-0 class — GSAP set via gsap.set() di hook.
 */

import { Wrench, Zap, Star, ArrowRight, Phone, CheckCircle, ShieldCheck, Clock } from 'lucide-react';

interface HeroLeftProps {
  badgeRef:    React.RefObject<HTMLDivElement | null>;
  titleRef:    React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  ctaGroupRef: React.RefObject<HTMLDivElement | null>;
  statsRef:    React.RefObject<HTMLDivElement | null>;
}

export function HeroLeft({ badgeRef, titleRef, subtitleRef, ctaGroupRef, statsRef }: HeroLeftProps) {
  return (
    <div className="flex flex-col items-start">

      {/* Badge */}
      <div
        ref={badgeRef}
        id="hero-badge"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-green-100 border border-green-200 text-sm font-semibold text-green-700"
      >
        <Zap className="w-4 h-4 text-green-500" aria-hidden />
        Platform Jasa #1 Terverifikasi di Indonesia
      </div>

      {/* H1 */}
      <h1
        ref={titleRef}
        id="hero-title"
        className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-green-900 mb-6"
      >
        Tukang Ahli,{' '}
        <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
          Datang Cepat
        </span>
        ,{' '}<br />
        Harga{' '}
        <span className="relative">
          <span className="relative z-10">Transparan.</span>
          <span className="absolute bottom-1 left-0 w-full h-3 bg-green-200 rounded-full -z-0" aria-hidden />
        </span>
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        id="hero-subtitle"
        className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl mb-8"
      >
        Dari servis AC, ledeng, hingga kebersihan rumah —
        pesan{' '}
        <strong className="text-green-700 font-semibold">Mitra Tukang terdekat</strong>{' '}
        dalam hitungan menit. Dana aman via sistem{' '}
        <strong className="text-green-700 font-semibold">escrow</strong>.
      </p>

      {/* CTA Group */}
      <div ref={ctaGroupRef} id="hero-cta-group" className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a
            href="#layanan"
            id="hero-cta-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('layanan')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-base shadow-xl shadow-green-500/25 transition-all duration-300 hover:scale-105 hover:shadow-green-500/40 active:scale-95"
          >
            <Wrench className="w-5 h-5" aria-hidden />
            Pesan Sekarang
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </a>

          <a
            href="#mitra"
            id="hero-cta-secondary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('mitra')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white border-2 border-green-200 hover:bg-green-50 hover:border-green-400 text-green-700 font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
          >
            <Phone className="w-5 h-5" aria-hidden />
            Daftar Jadi Mitra
          </a>
        </div>

        <div className="flex flex-wrap gap-4">
          {[
            { icon: ShieldCheck, text: 'Mitra KYC Terverifikasi' },
            { icon: Clock,        text: 'Respons < 60 Menit' },
            { icon: CheckCircle,  text: 'Escrow Payment Aman' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-sm text-green-700">
              <Icon className="w-4 h-4 text-green-500" aria-hidden />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        id="hero-stats"
        className="flex items-center gap-8 mt-10 pt-8 border-t border-green-100 w-full"
      >
        {[
          { val: '5.000+', label: 'Mitra Aktif' },
          { val: '4.9',    label: 'Rating',   icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> },
          { val: '50K+',   label: 'Order Selesai' },
        ].map((item, i, arr) => (
          <div key={item.label} className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="flex items-center gap-1 text-2xl font-black text-green-900">
                {item.icon}{item.val}
              </span>
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
            {i < arr.length - 1 && <div className="w-px h-10 bg-green-200" />}
          </div>
        ))}
      </div>
    </div>
  );
}
