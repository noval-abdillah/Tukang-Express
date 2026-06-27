'use client';

/**
 * @file ServicesSection.tsx
 * @description Section Layanan — 3 kategori utama MVP (PRD §7 Fase 1).
 * Dilengkapi dengan foto layanan dari Unsplash CDN.
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Star, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Map ID layanan ke anchor yang ada di /layanan page
const SERVICE_HREF_MAP: Record<string, string> = {
  ac:          '/layanan#servis-ac',
  ledeng:      '/layanan#ledeng-pipa',
  kebersihan:  '/layanan#kebersihan-rumah',
};

const SERVICES = [
  {
    id: 'ac',
    emoji: '❄️',
    badge: 'Terlaris',
    badgeColor: 'bg-blue-100 text-blue-700',
    title: 'Servis AC',
    subtitle: 'Cuci, freon, instalasi',
    description:
      'Cuci AC, isi freon R22 & R32, perbaikan kompresor, dan instalasi unit baru. Teknisi bersertifikat, peralatan profesional.',
    // Foto AC technician dari Unsplash
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=360&fit=crop&auto=format&q=80',
    imageAlt: 'Teknisi AC profesional sedang melakukan servis',
    price: 'Mulai Rp 85.000',
    features: ['Cuci AC Split & Window', 'Isi Freon R22 & R32', 'Perbaikan Kebocoran', 'Instalasi Unit Baru'],
    duration: '1–2 jam',
    rating: '4.9',
    reviews: '2.3K',
    accentColor: 'border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-50',
    labelColor: 'text-blue-700',
  },
  {
    id: 'ledeng',
    emoji: '🔧',
    badge: null,
    badgeColor: '',
    title: 'Ledeng & Pipa',
    subtitle: 'Kebocoran, mampet, instalasi',
    description:
      'Atasi pipa bocor, saluran mampet, keran rusak, hingga instalasi water heater. Respons cepat, penyelesaian profesional.',
    // Foto plumber dari Unsplash
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=360&fit=crop&auto=format&q=80',
    imageAlt: 'Tukang ledeng profesional sedang memperbaiki pipa',
    price: 'Mulai Rp 75.000',
    features: ['Pipa Bocor & Pecah', 'Saluran Tersumbat', 'Ganti Keran & Kloset', 'Pasang Water Heater'],
    duration: '1–3 jam',
    rating: '4.8',
    reviews: '1.8K',
    accentColor: 'border-cyan-200 hover:border-cyan-400',
    iconBg: 'bg-cyan-50',
    labelColor: 'text-cyan-700',
  },
  {
    id: 'kebersihan',
    emoji: '✨',
    badge: 'Deep Clean',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'Kebersihan Rumah',
    subtitle: 'Standard & deep cleaning',
    description:
      'Regular cleaning hingga deep cleaning menyeluruh. Tim profesional dengan peralatan dan bahan pembersih premium, tanpa bau kimia.',
    // Foto cleaning service dari Unsplash
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=360&fit=crop&auto=format&q=80',
    imageAlt: 'Tim kebersihan profesional sedang membersihkan rumah',
    price: 'Mulai Rp 120.000',
    features: ['Standard Cleaning', 'Deep Cleaning Total', 'Cuci Sofa & Karpet', 'Bersih Dapur & Kamar Mandi'],
    duration: '2–5 jam',
    rating: '4.9',
    reviews: '3.1K',
    accentColor: 'border-green-200 hover:border-green-400',
    iconBg: 'bg-green-50',
    labelColor: 'text-green-700',
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null!);
  const headingRef = useRef<HTMLDivElement>(null!);
  const cardsRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(cardsRef.current.children,
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="layanan"
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="layanan-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full mb-4 bg-green-100 text-green-700 text-sm font-semibold border border-green-200">
            3 Kategori MVP — Fase 1
          </span>
          <h2
            id="layanan-heading"
            className="text-4xl lg:text-5xl font-black text-green-900 mb-4"
          >
            Semua Kebutuhan Rumah,{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
              Satu Aplikasi
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Mitra terverifikasi siap melayani di area Anda. Harga transparan, estimasi otomatis, pembayaran aman.
          </p>
        </div>

        {/* ── Service Cards ─────────────────────────────────────────────── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {SERVICES.map((svc) => (
            <article
              key={svc.id}
              id={`service-card-${svc.id}`}
              className={`
                group relative rounded-3xl border-2 bg-white
                overflow-hidden
                ${svc.accentColor}
                hover:shadow-2xl hover:shadow-green-100
                transition-all duration-400 hover:-translate-y-2
              `}
            >
              {/* Gambar layanan */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={svc.image}
                  alt={svc.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Badge di atas gambar */}
                {svc.badge && (
                  <span className={`
                    absolute top-3 left-3 px-3 py-1 rounded-full
                    text-xs font-bold backdrop-blur-sm
                    ${svc.badgeColor}
                  `}>
                    {svc.badge}
                  </span>
                )}

                {/* Emoji + label di pojok kanan bawah gambar */}
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-bold text-lg drop-shadow">{svc.emoji} {svc.title}</p>
                  <p className="text-white/80 text-xs">{svc.subtitle}</p>
                </div>
              </div>

              {/* Konten card */}
              <div className="p-6">
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {svc.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2 mb-5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="pt-5 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-green-700 font-bold">{svc.price}</span>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" aria-hidden />
                        {svc.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" aria-hidden />
                        {svc.rating} ({svc.reviews})
                      </span>
                    </div>
                  </div>

                  <a
                    href={SERVICE_HREF_MAP[svc.id]}
                    id={`cta-service-${svc.id}`}
                    className="
                      flex items-center justify-center gap-2 w-full py-3 rounded-xl
                      bg-green-50 hover:bg-green-500
                      text-green-700 hover:text-white
                      font-semibold text-sm
                      border border-green-200 hover:border-green-500
                      transition-all duration-300 group/btn
                    "
                  >
                    Pesan Sekarang
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" aria-hidden />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Trust Badges ─────────────────────────────────────────────── */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, label: 'Mitra Terverifikasi', desc: 'KTP & sertifikat dicek manual' },
            { icon: Clock, label: 'Respons < 60 Menit', desc: 'Untuk area jangkauan 10km' },
            { icon: Star, label: 'Garansi Kepuasan', desc: 'Komplain? Diulang gratis' },
            { icon: ShieldCheck, label: 'Radius 10 km', desc: 'Mitra terdekat diprioritaskan' },
          ].map((item) => {
            const I = item.icon;
            return (
              <div key={item.label} className="flex flex-col items-center text-center p-5 rounded-2xl bg-green-50 border border-green-100">
                <I className="w-6 h-6 text-green-500 mb-2" aria-hidden />
                <p className="text-sm font-semibold text-green-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
