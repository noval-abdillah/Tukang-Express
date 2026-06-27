/**
 * @file src/app/tentang/page.tsx
 * Halaman Tentang Kami — misi, tim, roadmap.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Users, Zap, Shield, TrendingUp, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Tukang Express — platform on-demand jasa lokal terverifikasi di Indonesia. Menghubungkan pelanggan dengan mitra tukang ahli.',
};

const MILESTONES = [
  { year: '2024', title: 'Fase 1 — MVP Launch', desc: '3 kategori jasa (AC, Ledeng, Kebersihan), manual-verifikasi KYC, radius 10 km.' },
  { year: '2025', title: 'Fase 2 — Auto-Assignment', desc: 'Algoritma alokasi otomatis berbasis rating + jarak optimal.' },
  { year: '2026', title: 'Fase 3 — Insurance Layer', desc: 'Asuransi kerusakan properti bawaan untuk perlindungan ekstra.' },
];

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-emerald-800 text-white py-20 pt-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm font-semibold mb-4 border border-white/30">
            Platform Lokal Indonesia
          </span>
          <h1 className="text-4xl lg:text-5xl font-black mb-6">Tentang Tukang Express</h1>
          <p className="text-green-100 text-xl leading-relaxed max-w-2xl mx-auto">
            Kami hadir untuk memecahkan masalah nyata: mencari tukang yang terpercaya, harga yang jelas, dan pembayaran yang aman.
          </p>
        </div>
      </section>

      {/* Misi */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold border border-green-200 mb-4">
                Misi Kami
              </span>
              <h2 className="text-3xl font-black text-green-900 mb-6 leading-tight">
                Menghubungkan Masyarakat dengan Jasa Profesional yang Terpercaya
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Mencari penyedia jasa rumah tangga di Indonesia masih didominasi metode konvensional seperti rekomendasi tetangga atau grup Facebook — dengan risiko tinggi terkait keamanan, keandalan, dan ketidakpastian harga.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-green-700">Tukang Express</strong> hadir sebagai <em>two-sided on-demand local service marketplace</em> terverifikasi, menghubungkan pelanggan dengan Mitra Tukang secara real-time dengan sistem pencarian berbasis lokasi, estimasi harga otomatis, dan pembayaran aman via escrow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target,     label: 'Misi Jelas',          desc: 'Pasar yang valid, solusi yang nyata.' },
                { icon: Shield,     label: 'Keamanan Utama',       desc: 'KYC, escrow, enkripsi end-to-end.' },
                { icon: Zap,        label: 'Respons Cepat',        desc: 'Mitra ditemukan < 5 menit.' },
                { icon: Heart,      label: 'Kepuasan Dijamin',      desc: 'Garansi pekerjaan ulang gratis.' },
              ].map(item => {
                const I = item.icon;
                return (
                  <div key={item.label} className="p-5 bg-green-50 rounded-2xl border border-green-100">
                    <I className="w-6 h-6 text-green-500 mb-3" />
                    <p className="font-bold text-green-900 text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-600 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { val: '5.000+', label: 'Mitra Aktif' },
              { val: '50.000+', label: 'Order Selesai' },
              { val: '4.9 ⭐', label: 'Rating Rata-rata' },
              { val: '10 Kota', label: 'Area Layanan' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-black mb-1">{s.val}</p>
                <p className="text-green-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-green-900 mb-3">Roadmap Pengembangan</h2>
            <p className="text-gray-500">Rencana bertahap untuk membangun platform yang lebih baik.</p>
          </div>
          <div className="space-y-6">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className={`flex gap-6 p-6 rounded-2xl border-2 ${i === 0 ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-white'}`}>
                <div className="flex-shrink-0">
                  <span className={`inline-block px-3 py-1 rounded-xl text-sm font-bold ${i === 0 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {m.year}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-green-900">{m.title}</h3>
                    {i === 0 && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Live</span>}
                  </div>
                  <p className="text-gray-500 text-sm">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="bg-green-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black text-green-900 text-center mb-12">Untuk Siapa?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users,     title: 'Pengguna (Customer)',        desc: 'Masyarakat urban yang butuh jasa perawatan rumah cepat, transparan, dan terpercaya.', color: 'bg-blue-100 text-blue-600' },
              { icon: TrendingUp, title: 'Mitra (Service Provider)',  desc: 'Teknisi lokal yang ingin tingkatkan visibilitas, jangkauan pelanggan, dan kepastian pembayaran.', color: 'bg-green-100 text-green-600' },
              { icon: Shield,    title: 'Admin (Platform Owner)',     desc: 'Mengelola verifikasi mitra, transaksi escrow, sengketa, dan manajemen konten.', color: 'bg-purple-100 text-purple-600' },
            ].map(item => {
              const I = item.icon;
              return (
                <div key={item.title} className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4`}>
                    <I className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-green-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="text-center py-10">
        <Link href="/" className="text-green-600 hover:text-green-500 font-medium text-sm">← Kembali ke Beranda</Link>
      </div>
    </main>
  );
}
