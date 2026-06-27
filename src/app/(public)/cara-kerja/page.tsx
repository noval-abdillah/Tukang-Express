/**
 * @file src/app/cara-kerja/page.tsx
 * Halaman lengkap alur cara kerja + payment flow Tukang Express.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Smartphone, CreditCard, MapPin, CheckCircle,
  Shield, Lock, Clock, ArrowRight, Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cara Kerja',
  description: 'Pelajari cara kerja Tukang Express dari pemesanan, pembayaran escrow, tracking real-time, hingga konfirmasi selesai.',
};

const ORDER_STATES = [
  { state: 'WAITING_PAYMENT',  label: 'Menunggu Pembayaran', color: 'bg-gray-100 text-gray-600',   dot: 'bg-gray-400' },
  { state: 'SEARCHING_MITRA',  label: 'Mencari Mitra',       color: 'bg-blue-100 text-blue-600',   dot: 'bg-blue-400' },
  { state: 'MITRA_FOUND',      label: 'Mitra Ditemukan',     color: 'bg-indigo-100 text-indigo-600', dot: 'bg-indigo-400' },
  { state: 'ON_THE_WAY',       label: 'Mitra Menuju Lokasi', color: 'bg-amber-100 text-amber-600', dot: 'bg-amber-400' },
  { state: 'IN_PROGRESS',      label: 'Sedang Dikerjakan',   color: 'bg-orange-100 text-orange-600', dot: 'bg-orange-400' },
  { state: 'AWAITING_CONFIRM', label: 'Menunggu Konfirmasi', color: 'bg-purple-100 text-purple-600', dot: 'bg-purple-400' },
  { state: 'COMPLETED',        label: 'Selesai ✓',           color: 'bg-green-100 text-green-600',  dot: 'bg-green-400' },
  { state: 'CANCELLED',        label: 'Dibatalkan',          color: 'bg-red-100 text-red-600',      dot: 'bg-red-400' },
];

const STEPS = [
  {
    num: 1,
    icon: Smartphone,
    title: 'Pilih Layanan & Isi Detail',
    description: 'Buka aplikasi Tukang Express. Pilih kategori jasa (AC, Ledeng, Kebersihan). Isi deskripsi masalah, unggah foto (opsional), jumlah unit. Sistem auto-kalkulasi estimasi biaya berdasarkan jarak dan kompleksitas.',
    detail: 'Opsi: Pesan Sekarang atau Jadwalkan Nanti',
    color: 'bg-green-500',
  },
  {
    num: 2,
    icon: CreditCard,
    title: 'Bayar ke Rekening Escrow',
    description: 'Dana Anda ditransfer ke rekening escrow terproteksi — bukan langsung ke mitra. Tersedia via: Transfer Bank, GoPay, OVO, DANA, ShopeePay, QRIS, dan Kartu Kredit.',
    detail: 'Dana AMAN, cair hanya setelah konfirmasi selesai',
    color: 'bg-emerald-500',
  },
  {
    num: 3,
    icon: Zap,
    title: 'Sistem Cari Mitra Terdekat',
    description: 'Pembayaran masuk → sistem broadcast order ke semua mitra terverifikasi dalam radius 10 km. Mitra punya 30 detik untuk menerima atau menolak. Auto-assign ke mitra berikutnya jika ditolak.',
    detail: 'Rata-rata mitra ditemukan dalam < 5 menit',
    color: 'bg-blue-500',
  },
  {
    num: 4,
    icon: MapPin,
    title: 'Pantau Real-time',
    description: 'Setelah mitra menerima, Anda dapat melihat: nama & foto mitra, rating, jarak & estimasi waktu tiba, dan status langkah demi langkah. Chat in-app tersedia untuk koordinasi.',
    detail: 'Status: Menuju Lokasi → Sedang Dikerjakan',
    color: 'bg-teal-500',
  },
  {
    num: 5,
    icon: CheckCircle,
    title: 'Konfirmasi & Beri Rating',
    description: 'Mitra selesai bekerja dan menandai pekerjaan selesai. Anda mendapat notifikasi untuk konfirmasi. Setelah konfirmasi, dana escrow otomatis cair ke saldo mitra. Beri rating 1–5 bintang.',
    detail: 'Dana escrow cair otomatis ke mitra',
    color: 'bg-amber-500',
  },
];

export default function CaraKerjaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20 pt-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm font-semibold mb-4 border border-white/30">
            Transparan & Mudah
          </span>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Cara Kerja Tukang Express</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Dari pesan hingga selesai — proses yang aman, transparan, dan terpantau penuh.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black text-green-900 text-center mb-16">5 Langkah Mudah</h2>
          <div className="space-y-12">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex gap-8 items-start">
                  {/* Timeline */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-0.5 h-12 bg-green-200 mt-3" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Langkah {step.num}</span>
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-3">{step.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 border border-green-200">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-700 font-medium">{step.detail}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment Flow */}
      <section className="bg-green-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-green-900 mb-3">Sistem Escrow Payment</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Dana Anda 100% aman. Cair ke mitra hanya setelah Anda konfirmasi pekerjaan selesai.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Lock, title: 'Dana Ditahan', desc: 'Setelah bayar, dana masuk ke rekening escrow terproteksi — bukan ke mitra.' },
              { icon: Shield, title: 'Perlindungan Penuh', desc: 'Jika mitra tidak datang atau pekerjaan tidak memuaskan, dana dikembalikan.' },
              { icon: CheckCircle, title: 'Cair Saat Selesai', desc: 'Dana otomatis cair ke saldo mitra saat Anda klik "Konfirmasi Selesai".' },
            ].map(item => {
              const I = item.icon;
              return (
                <div key={item.title} className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                    <I className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-green-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl p-6 border border-green-100">
            <h3 className="font-bold text-green-900 mb-4 text-center">Metode Pembayaran yang Diterima</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Transfer Bank (BCA, Mandiri, BNI, BRI)', 'GoPay', 'OVO', 'DANA', 'ShopeePay', 'LinkAja', 'QRIS', 'Kartu Kredit/Debit Visa/MC'].map(m => (
                <span key={m} className="px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 font-medium">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Order States */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-green-900 mb-3">Status Order Real-time</h2>
            <p className="text-gray-500">Setiap perubahan status dikirim sebagai notifikasi push ke ponsel Anda.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {ORDER_STATES.map((s) => (
              <div key={s.state} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${s.color} border-current/20`}>
                <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                <span className="text-sm font-semibold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 py-16 text-center text-white">
        <h2 className="text-3xl font-black mb-4">Siap Mencoba?</h2>
        <p className="text-green-100 mb-8 max-w-md mx-auto">Pesan layanan pertama Anda sekarang. Gratis biaya pendaftaran, bayar hanya saat jasa dipesan.</p>
        <Link
          href="/#layanan"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-green-700 font-bold hover:bg-green-50 transition-all duration-300 hover:scale-105 shadow-xl"
        >
          Pesan Sekarang
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <div className="text-center py-10">
        <Link href="/" className="text-green-600 hover:text-green-500 font-medium text-sm">← Kembali ke Beranda</Link>
      </div>
    </main>
  );
}
