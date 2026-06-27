'use client';

/**
 * @file HowItWorksSection.tsx
 * @description Section "Cara Kerja" — 4 langkah dari Order State Machine PRD §4.2.
 *
 * Alur yang disederhanakan dari state machine:
 * 1. Pilih Layanan & Bayar → [WAITING_PAYMENT] → [SEARCHING_MITRA]
 * 2. Mitra Ditemukan → [MITRA_FOUND] → [ON_THE_WAY]
 * 3. Pekerjaan Dikerjakan → [IN_PROGRESS] → [AWAITING_CONFIRM]
 * 4. Konfirmasi & Beri Rating → [COMPLETED]
 *
 * Animasi: garis penghubung tumbuh (scaleX) + step masuk berurutan via GSAP.
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, CreditCard, Hammer, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: 1,
    icon: Search,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Pilih & Pesan',
    description:
      'Pilih kategori jasa, isi detail pekerjaan, dan pilih "Sekarang" atau jadwalkan nanti. Sistem otomatis kalkulasi estimasi harga.',
    tag: 'Booking Engine',
    // Gambar: smartphone booking app
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=160&fit=crop&auto=format&q=75',
    imgAlt: 'Memesan layanan melalui smartphone',
  },
  {
    id: 2,
    icon: CreditCard,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Bayar ke Escrow',
    description:
      'Dana Anda ditahan aman di rekening escrow — tidak langsung ke mitra. Pembayaran via transfer, e-wallet, atau kartu.',
    tag: 'Escrow Payment',
    // Gambar: mobile payment
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=160&fit=crop&auto=format&q=75',
    imgAlt: 'Proses pembayaran digital yang aman',
  },
  {
    id: 3,
    icon: Hammer,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    title: 'Mitra Datang & Kerjakan',
    description:
      'Mitra terdekat menerima order dalam 30 detik. Pantau status real-time — dari "Menuju Lokasi" hingga "Sedang Dikerjakan".',
    tag: 'Real-time Tracking',
    // Gambar: technician working
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&h=160&fit=crop&auto=format&q=75',
    imgAlt: 'Teknisi profesional sedang mengerjakan pekerjaan',
  },
  {
    id: 4,
    icon: Star,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Konfirmasi & Nilai',
    description:
      'Konfirmasi pekerjaan selesai, dana escrow otomatis cair ke mitra. Berikan rating 1–5 bintang untuk bantu pengguna lain.',
    tag: 'Rating & Review',
    // Gambar: customer satisfaction / rating
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=160&fit=crop&auto=format&q=75',
    imgAlt: 'Pelanggan memberikan rating kepuasan',
  },
];


export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null!);
  const headingRef = useRef<HTMLDivElement>(null!);
  const stepsRef = useRef<HTMLDivElement>(null!);
  const lineRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      // Heading
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      // Garis penghubung tumbuh dari kiri ke kanan
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 75%',
          },
        }
      );

      // Setiap step masuk dari bawah dengan stagger
      gsap.fromTo(stepsRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.2,
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="cara-kerja"
      className="py-24 lg:py-32 bg-green-50"
      aria-labelledby="cara-kerja-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-20">
          <span className="
            inline-block px-4 py-1.5 rounded-full mb-4
            bg-white text-green-700 text-sm font-semibold
            border border-green-200
          ">
            Mudah & Cepat
          </span>
          <h2
            id="cara-kerja-heading"
            className="text-4xl lg:text-5xl font-black text-green-900 mb-4"
          >
            Pesan dalam{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
              4 Langkah
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Dari order hingga pekerjaan selesai — semuanya terpantau dalam satu aplikasi.
          </p>
        </div>

        {/* ── Steps ─────────────────────────────────────────────────────── */}
        <div className="relative">
          {/* Garis penghubung horizontal (desktop) — di tengah gambar */}
          <div className="hidden lg:block absolute top-[72px] left-[14%] right-[14%] h-[2px] bg-green-200 z-[1]">
            <div
              ref={lineRef}
              className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
            />
          </div>

          <div
            ref={stepsRef}
            className="
              relative z-10
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8
            "
          >
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  id={`step-${step.id}`}
                  className="flex flex-col items-center text-center"
                >
                  {/* Gambar ilustrasi step */}
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-6 bg-green-50">
                    <img
                      src={step.img}
                      alt={step.imgAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Overlay gradasi + icon overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />

                    {/* Nomor step di pojok kiri atas */}
                    <span className="
                      absolute top-3 left-3
                      w-7 h-7 rounded-full
                      bg-green-500 text-white
                      text-xs font-black
                      flex items-center justify-center
                      shadow-md
                    ">
                      {step.id}
                    </span>

                    {/* Icon di pojok kanan bawah */}
                    <div className={`
                      absolute bottom-3 right-3
                      w-9 h-9 rounded-xl
                      ${step.iconBg} backdrop-blur-sm
                      flex items-center justify-center shadow-sm
                    `}>
                      <Icon className={`w-5 h-5 ${step.iconColor}`} aria-hidden />
                    </div>
                  </div>

                  {/* Tag */}
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full mb-3">
                    {step.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-green-900 mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA bawah ────────────────────────────────────────────────── */}
        <div className="text-center mt-16">
          <a
            href="/layanan"
            id="how-it-works-cta"
            className="
              inline-flex items-center gap-3 px-10 py-4 rounded-2xl
              bg-gradient-to-r from-green-500 to-emerald-500
              hover:from-green-400 hover:to-emerald-400
              text-white font-bold text-base
              shadow-lg shadow-green-400/30
              transition-all duration-300 hover:scale-105 active:scale-95
            "
          >
            Coba Sekarang — Gratis
          </a>
          <p className="text-gray-400 text-xs mt-3">
            Tanpa biaya pendaftaran · Bayar hanya saat jasa dipesan
          </p>
        </div>
      </div>
    </section>
  );
}
