'use client';

/**
 * @file FeaturesSection.tsx
 * @description Section Fitur Unggulan — berdasarkan PRD §3.1 Customer App features.
 *
 * 4 fitur utama yang di-highlight:
 * 1. Escrow Payment (§3.1 - Sistem Pembayaran Escrow)
 * 2. Pelacakan Real-time (§3.1 - Pelacakan Real-time)
 * 3. Rating & Ulasan (§3.1 - Sistem Rating & Ulasan)
 * 4. Chat In-App (§3.1 - Komunikasi In-App)
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, MapPin, Star, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: 'escrow',
    icon: Lock,
    color: 'green',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    border: 'border-green-200 hover:border-green-400',
    glow: 'hover:shadow-green-100',
    title: 'Escrow Payment',
    subtitle: 'Dana 100% Aman',
    description:
      'Dana Anda ditahan di rekening escrow terproteksi, bukan langsung ke mitra. Cair otomatis hanya setelah Anda konfirmasi pekerjaan selesai — proteksi penuh dari awal hingga akhir.',
    perks: ['Terintegrasi Midtrans/Xendit', 'Transfer, e-wallet, kartu', 'Refund otomatis jika batal', 'Webhook berteknologi enkripsi'],
  },
  {
    id: 'tracking',
    icon: MapPin,
    color: 'blue',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    border: 'border-blue-200 hover:border-blue-400',
    glow: 'hover:shadow-blue-100',
    title: 'Pelacakan Real-time',
    subtitle: 'Pantau Langsung',
    description:
      'Status order terpantau secara live — dari mitra ditemukan, menuju lokasi, sedang mengerjakan, hingga selesai. Notifikasi push di setiap perubahan status.',
    perks: ['Status live: 6 tahap', 'Estimasi waktu tiba', 'Notifikasi push otomatis', 'Rute navigasi mitra'],
  },
  {
    id: 'rating',
    icon: Star,
    color: 'amber',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    border: 'border-amber-200 hover:border-amber-400',
    glow: 'hover:shadow-amber-100',
    title: 'Rating & Ulasan',
    subtitle: 'Komunitas Jujur',
    description:
      'Setelah pekerjaan selesai, beri penilaian 1–5 bintang dan ulasan tekstual. Sistem ini menjaga kualitas mitra dan membantu pengguna lain memilih dengan percaya diri.',
    perks: ['Rating 1–5 bintang', 'Ulasan teks terverifikasi', 'Profil mitra terbuka', 'Mitra premium diurutkan atas'],
  },
  {
    id: 'chat',
    icon: MessageCircle,
    color: 'violet',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    border: 'border-violet-200 hover:border-violet-400',
    glow: 'hover:shadow-violet-100',
    title: 'Chat In-App',
    subtitle: 'Privasi Terjaga',
    description:
      'Komunikasi langsung dengan mitra via fitur chat terenkripsi tanpa mengekspos nomor HP pribadi. Koordinasikan detail pekerjaan dengan aman dan mudah.',
    perks: ['Chat terenkripsi end-to-end', 'Nomor HP tersembunyi', 'Riwayat pesan tersimpan', 'Kirim foto/gambar'],
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null!);
  const headingRef = useRef<HTMLDivElement>(null!);
  const gridRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      gsap.fromTo(headingRef.current, 
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(gridRef.current.children, 
        { x: (i) => (i % 2 === 0 ? -50 : 50), opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="fitur"
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="fitur-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="
            inline-block px-4 py-1.5 rounded-full mb-4
            bg-green-100 text-green-700 text-sm font-semibold border border-green-200
          ">
            Teknologi Platform
          </span>
          <h2
            id="fitur-heading"
            className="text-4xl lg:text-5xl font-black text-green-900 mb-4"
          >
            Fitur yang Membuat Anda{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
              Tenang
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Kami membangun platform dengan keamanan dan kenyamanan sebagai prioritas utama.
          </p>
        </div>

        {/* ── Feature Cards ─────────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.id}
                id={`feature-${f.id}`}
                className={`
                  group rounded-3xl border p-8
                  bg-white
                  ${f.border}
                  ${f.glow}
                  hover:shadow-xl
                  transition-all duration-300 hover:-translate-y-1
                `}
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className={`
                    flex-shrink-0 w-14 h-14 rounded-2xl
                    ${f.iconBg} flex items-center justify-center
                    transition-transform duration-300 group-hover:scale-110
                  `}>
                    <Icon className={`w-7 h-7 ${f.iconColor}`} aria-hidden />
                  </div>

                  <div className="flex-1">
                    {/* Subtitle tag */}
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {f.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-green-900 mt-1 mb-3">
                      {f.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                      {f.description}
                    </p>

                    {/* Perks */}
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {f.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className={`
                            w-1.5 h-1.5 rounded-full flex-shrink-0
                            bg-green-400
                          `} />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
