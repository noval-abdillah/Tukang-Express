'use client';

/**
 * @file HeroRight.tsx
 * @description Kolom kanan Hero — visual mockup dengan:
 * - Foto layanan menggunakan gambar dari Unsplash (CDN publik)
 * - Floating card "Order Aktif" dekoratif
 * - Floating card "Rating" dekoratif
 * - Avatar mitra dengan indicator online
 *
 * Semua gambar menggunakan Unsplash Source URL yang menghasilkan
 * gambar berkaitan dengan keyword yang diberikan.
 */

import { Star, MapPin, CheckCircle, Clock, Wrench, Droplets, Sparkles } from 'lucide-react';

// Data layanan dengan gambar Unsplash
const SERVICE_IMAGES = [
  {
    id: 'ac',
    label: 'Servis AC',
    icon: Wrench,
    // Gambar technician / air conditioning service
    img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop&auto=format',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'kebersihan',
    label: 'Kebersihan',
    icon: Sparkles,
    // Gambar cleaning service
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format',
    color: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    id: 'ledeng',
    label: 'Ledeng',
    icon: Droplets,
    // Gambar plumbing service
    img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop&auto=format',
    color: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
];

// Avatar URLs mitra (foto profil profesional)
const MITRA_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&auto=format',
];

export function HeroRight() {
  return (
    <div className="relative flex items-center justify-center lg:justify-end h-full min-h-[400px] lg:min-h-[560px]">

      {/* ── Card Utama: App Mockup ─────────────────────────────────────────── */}
      <div className="
        relative w-full max-w-sm
        bg-white rounded-3xl
        shadow-2xl shadow-green-200/60
        border border-green-100
        overflow-hidden
      ">
        {/* Header card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-bold text-sm">Pilih Layanan</span>
            <span className="text-green-200 text-xs">3 tersedia</span>
          </div>

          {/* Mitra online avatars */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {MITRA_AVATARS.map((src, i) => (
                <div key={i} className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img
                    src={src}
                    alt={`Mitra ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white animate-pulse-dot" />
                </div>
              ))}
            </div>
            <span className="text-green-100 text-xs ml-1">
              +127 mitra online
            </span>
          </div>
        </div>

        {/* Service cards grid */}
        <div className="p-4 grid grid-cols-3 gap-3">
          {SERVICE_IMAGES.map((svc) => {
            const Icon = svc.icon;
            return (
              <button
                key={svc.id}
                id={`hero-service-btn-${svc.id}`}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 border-transparent hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-xl ${svc.color} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${svc.iconColor}`} aria-hidden />
                </div>
                <span className="text-xs text-gray-600 font-medium text-center leading-tight">{svc.label}</span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-green-100" />

        {/* Order preview */}
        <div className="p-4">
          <div className="bg-green-50 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-green-600" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-green-900">Servis AC Split</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-400" aria-hidden />
                  <span className="text-xs text-gray-500 truncate">Kota Jakarta Selatan</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-green-600">Rp 150K</p>
                <p className="text-xs text-gray-400">estimasi</p>
              </div>
            </div>

            {/* Escrow badge */}
            <div className="mt-3 flex items-center gap-2 bg-white rounded-xl px-3 py-2">
              <CheckCircle className="w-4 h-4 text-green-500" aria-hidden />
              <span className="text-xs text-green-700 font-medium">Dana tersimpan aman di Escrow</span>
            </div>
          </div>

          {/* CTA inside card */}
          <button
            id="hero-card-cta"
            className="
              w-full mt-3 py-3.5 rounded-2xl
              bg-gradient-to-r from-green-500 to-emerald-500
              text-white font-bold text-sm
              shadow-lg shadow-green-400/30
              hover:from-green-400 hover:to-emerald-400
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
            "
          >
            Cari Mitra Terdekat →
          </button>
        </div>
      </div>

      {/* ── Floating Card: Mitra Ditemukan ────────────────────────────────── */}
      <div className="hidden sm:flex absolute -left-6 top-16 bg-white rounded-2xl shadow-xl shadow-green-100 border border-green-100 px-4 py-3 items-center gap-3 w-56 animate-float">
        <div className="relative flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=44&h=44&fit=crop&auto=format"
            alt="Mitra Budi"
            className="w-11 h-11 rounded-full object-cover"
            loading="lazy"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-800">Budi S. • ⭐ 4.9</p>
          <p className="text-xs text-gray-500 truncate">Teknisi AC • 1.2 km</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-600 font-medium">Menuju lokasi</span>
          </div>
        </div>
      </div>

      {/* ── Floating Card: Rating ─────────────────────────────────────────── */}
      <div className="hidden sm:block absolute -right-4 bottom-20 bg-white rounded-2xl shadow-xl shadow-amber-100 border border-amber-100 px-4 py-3 w-44 animate-float-delay">
        <div className="flex items-center gap-1 mb-1">
          {[1,2,3,4,5].map((i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" aria-hidden />
          ))}
        </div>
        <p className="text-xs font-bold text-gray-800">Pelayanan Luar Biasa!</p>
        <p className="text-xs text-gray-500 mt-0.5">— Andini R., Jakarta</p>
      </div>

      {/* ── Floating Badge: Selesai ───────────────────────────────────────── */}
      <div className="hidden sm:flex absolute -left-2 bottom-16 bg-green-500 text-white rounded-2xl shadow-lg shadow-green-400/40 px-4 py-2.5 items-center gap-2 animate-float-delay2">
        <CheckCircle className="w-4 h-4" aria-hidden />
        <div>
          <p className="text-xs font-bold">Pekerjaan Selesai!</p>
          <p className="text-xs text-green-200">Dana escrow dicairkan</p>
        </div>
      </div>

      {/* ── Timer badge ───────────────────────────────────────────────────── */}
      <div className="
        hidden sm:flex absolute top-4 right-0
        bg-white rounded-xl shadow-md border border-green-100
        px-3 py-2
        flex items-center gap-2
      ">
        <Clock className="w-4 h-4 text-green-500" aria-hidden />
        <div>
          <p className="text-xs text-gray-500">Mitra tiba dalam</p>
          <p className="text-sm font-black text-green-700">~15 Menit</p>
        </div>
      </div>

      {/* Floating animations defined in globals.css */}
    </div>
  );
}
