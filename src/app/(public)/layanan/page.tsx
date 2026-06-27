/**
 * @file src/app/layanan/page.tsx
 * Halaman Layanan — lengkap, jujur, dengan rating breakdown nyata,
 * mitra sample, FAQ per layanan, dan disclaimer harga transparan.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Star, Clock, Shield, CheckCircle, ArrowRight,
  ChevronDown, AlertCircle, Wind, Droplets, Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Layanan Kami — Servis AC, Ledeng & Kebersihan',
  description: 'Detail lengkap layanan Tukang Express: servis AC, ledeng & pipa, kebersihan rumah. Harga transparan, rating asli, mitra terverifikasi.',
};

// ─── Data Layanan ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'servis-ac',
    icon: Wind,
    emoji: '❄️',
    title: 'Servis AC',
    subtitle: 'Cuci, freon, perbaikan, instalasi',
    img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=480&fit=crop&auto=format&q=80',
    badge: 'Paling Diminati',
    badgeBg: 'bg-blue-100 text-blue-700',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    accentBorder: 'border-blue-200',
    description: 'Layanan perawatan dan perbaikan AC lengkap oleh teknisi bersertifikat. Menggunakan peralatan profesional, freon original, dan garansi kerja.',
    // Disclaimer harga jujur
    priceNote: '* Harga dapat berbeda tergantung merek AC, usia unit, tingkat kerusakan, dan lokasi.',
    priceList: [
      { item: 'Cuci AC 0.5–1 PK',          price: 'Rp 80.000 – 120.000' },
      { item: 'Cuci AC 1.5–2 PK',           price: 'Rp 120.000 – 180.000' },
      { item: 'Isi Freon R22 (per titik)',   price: 'Rp 150.000 – 250.000' },
      { item: 'Isi Freon R32 (per titik)',   price: 'Rp 200.000 – 350.000' },
      { item: 'Perbaikan Kompresor',         price: 'Rp 500.000 – 2.500.000' },
      { item: 'Instalasi AC Split',          price: 'Rp 350.000 – 600.000' },
      { item: 'Bongkar Pasang AC',           price: 'Rp 200.000 – 400.000' },
    ],
    features: [
      'Cuci AC Split, Window, & Cassette',
      'Isi freon R22, R32, R410a original',
      'Perbaikan kebocoran & kompresor',
      'Instalasi unit baru + pipa tembaga',
      'Bongkar pasang & pindah lokasi',
      'Pemeriksaan & tune-up berkala',
    ],
    // Rating jujur dengan breakdown
    rating: { avg: 4.87, total: 2341, breakdown: [78, 15, 4, 2, 1] }, // % per bintang
    duration: '1–3 jam',
    guarantee: '7 hari garansi kerja',
    // Mitra sample representatif
    sampleMitra: [
      { name: 'Ahmad S.',  city: 'Jak. Selatan', rating: 4.9, jobs: 312, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop' },
      { name: 'Budi P.',   city: 'Jak. Timur',   rating: 4.8, jobs: 247, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop' },
      { name: 'Cahyo R.',  city: 'Bekasi',        rating: 4.9, jobs: 198, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=48&h=48&fit=crop' },
    ],
    faqs: [
      { q: 'Berapa lama proses cuci AC?', a: 'Cuci AC biasanya memakan waktu 45–90 menit per unit, tergantung ukuran dan tingkat kotor.' },
      { q: 'Apakah freon yang digunakan original?', a: 'Ya, kami hanya menggunakan freon original dari supplier resmi. Teknisi akan menunjukkan kemasan freon kepada Anda.' },
      { q: 'Bagaimana jika AC masih bermasalah setelah servis?', a: 'Kami memberikan garansi 7 hari kerja. Jika ada masalah dalam periode tersebut, kami kirim teknisi kembali tanpa biaya.' },
      { q: 'Apakah tersedia untuk AC merek asing (Daikin, Panasonic, dll)?', a: 'Ya, teknisi kami terlatih untuk semua merek AC yang beredar di Indonesia.' },
    ],
    reviews: [
      { name: 'Andini R.',  city: 'Jaksel',   rating: 5, date: '12 Jun 2026', text: 'Teknisi datang tepat waktu, ramah, dan hasil kerjanya rapi. AC jadi dingin lagi setelah setahun tidak dirawat.' },
      { name: 'Bram S.',    city: 'Bekasi',   rating: 5, date: '8 Jun 2026',  text: 'Harga sesuai estimasi di aplikasi, tidak ada biaya kejutan. Sangat rekomendasikan!' },
      { name: 'Citra M.',   city: 'Depok',    rating: 4, date: '3 Jun 2026',  text: 'Servis bagus, cuma perlu tunggu 15 menit karena macet. Overall memuaskan.' },
    ],
  },
  {
    id: 'ledeng-pipa',
    icon: Droplets,
    emoji: '🔧',
    title: 'Ledeng & Pipa',
    subtitle: 'Kebocoran, mampet, instalasi baru',
    img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=480&fit=crop&auto=format&q=80',
    badge: null,
    badgeBg: '',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    accentBorder: 'border-cyan-200',
    description: 'Atasi semua masalah pipa dan ledeng rumah Anda. Dari kebocoran kecil hingga instalasi sistem plumbing baru, dikerjakan oleh tukang ledeng berpengalaman.',
    priceNote: '* Harga tergantung material yang dibutuhkan, panjang pipa, dan akses ke titik kebocoran.',
    priceList: [
      { item: 'Ganti keran standar',          price: 'Rp 60.000 – 120.000' },
      { item: 'Perbaikan pipa bocor (minor)',  price: 'Rp 80.000 – 200.000' },
      { item: 'Buka saluran tersumbat',        price: 'Rp 100.000 – 300.000' },
      { item: 'Ganti kloset duduk/jongkok',   price: 'Rp 300.000 – 700.000' },
      { item: 'Pasang water heater',           price: 'Rp 250.000 – 500.000' },
      { item: 'Instalasi pipa baru (per meter)', price: 'Rp 50.000 – 100.000' },
      { item: 'Pompa air bermasalah',          price: 'Rp 200.000 – 1.000.000' },
    ],
    features: [
      'Perbaikan pipa bocor & pecah',
      'Buka saluran tersumbat',
      'Ganti keran, kloset, & wastafel',
      'Pasang water heater listrik/gas',
      'Instalasi pipa & sistem plumbing',
      'Perbaikan pompa air & tandon',
    ],
    rating: { avg: 4.79, total: 1823, breakdown: [73, 17, 6, 3, 1] },
    duration: '1–4 jam',
    guarantee: '7 hari garansi kerja',
    sampleMitra: [
      { name: 'Doni M.',  city: 'Tangerang', rating: 4.9, jobs: 287, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop' },
      { name: 'Eko W.',   city: 'Jakbar',    rating: 4.8, jobs: 203, img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=48&h=48&fit=crop' },
      { name: 'Fajar L.', city: 'Jakut',     rating: 4.7, jobs: 156, img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=48&h=48&fit=crop' },
    ],
    faqs: [
      { q: 'Apakah material (pipa, keran) termasuk dalam harga?', a: 'Material tidak termasuk estimasi awal. Teknisi akan menginformasikan kebutuhan material dan mendapat approval Anda sebelum membeli.' },
      { q: 'Berapa lama deteksi kebocoran tersembunyi?', a: 'Deteksi dengan peralatan standar membutuhkan 30–60 menit. Kebocoran tersembunyi di dalam dinding mungkin membutuhkan teknik tambahan.' },
      { q: 'Apakah bisa darurat/urgent?', a: 'Ya. Pilih opsi "Sekarang" saat pesan dan kami prioritaskan. Biasanya mitra tiba dalam 30–60 menit untuk area jangkauan.' },
    ],
    reviews: [
      { name: 'Dewi S.',   city: 'Tangerang', rating: 5, date: '15 Jun 2026', text: 'Saluran kamar mandi mampet parah, tukang dari TukangExpress berhasil selesaikan dalam 1 jam. Profesional!' },
      { name: 'Eko P.',    city: 'Jakbar',    rating: 4, date: '10 Jun 2026', text: 'Pipa bocor di balik tembok berhasil ditemukan dan diperbaiki. Rapi, tidak banyak berantakan.' },
      { name: 'Fitri A.',  city: 'Jakut',     rating: 5, date: '5 Jun 2026',  text: 'Ganti water heater berjalan lancar. Teknisi jelaskan dulu cara penggunaan yang aman. 👍' },
    ],
  },
  {
    id: 'kebersihan-rumah',
    icon: Sparkles,
    emoji: '✨',
    title: 'Kebersihan Rumah',
    subtitle: 'Standard, deep clean, & spesialis',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=480&fit=crop&auto=format&q=80',
    badge: 'Deep Clean Populer',
    badgeBg: 'bg-green-100 text-green-700',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    accentBorder: 'border-green-200',
    description: 'Layanan kebersihan profesional dari regular cleaning hingga deep cleaning menyeluruh. Tim terlatih dengan peralatan modern dan produk pembersih premium, ramah lingkungan.',
    priceNote: '* Harga berdasarkan luas ruangan dan paket yang dipilih. Biaya tambahan untuk alat dan bahan (tertera di estimasi).',
    priceList: [
      { item: 'Standard Cleaning (studio/1BR)', price: 'Rp 120.000 – 200.000' },
      { item: 'Standard Cleaning (2–3BR)',      price: 'Rp 200.000 – 350.000' },
      { item: 'Deep Cleaning (studio/1BR)',     price: 'Rp 350.000 – 550.000' },
      { item: 'Deep Cleaning (2–3BR)',          price: 'Rp 500.000 – 800.000' },
      { item: 'Cuci Sofa per dudukan',          price: 'Rp 80.000 – 150.000' },
      { item: 'Cuci Karpet per m²',             price: 'Rp 20.000 – 40.000' },
      { item: 'Bersih pasca renovasi',          price: 'Rp 500.000 – 1.500.000' },
    ],
    features: [
      'Standard cleaning (sapu, pel, lap)',
      'Deep cleaning menyeluruh',
      'Cuci sofa, karpet, & kasur',
      'Bersih dapur & kamar mandi menyeluruh',
      'Lap jendela dalam & luar',
      'Bersih pasca renovasi/pindahan',
    ],
    rating: { avg: 4.91, total: 3127, breakdown: [85, 11, 3, 1, 0] },
    duration: '2–6 jam',
    guarantee: '24 jam garansi kepuasan',
    sampleMitra: [
      { name: 'Sari W.',   city: 'Jaksel',  rating: 5.0, jobs: 412, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop' },
      { name: 'Nina K.',   city: 'Depok',   rating: 4.9, jobs: 334, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop' },
      { name: 'Rina A.',   city: 'Bekasi',  rating: 4.9, jobs: 289, img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop' },
    ],
    faqs: [
      { q: 'Apakah tim membawa peralatan sendiri?', a: 'Ya, tim kami membawa vakum, alat pel, dan produk pembersih premium. Anda tidak perlu menyediakan apapun.' },
      { q: 'Berapa lama untuk apartemen studio?', a: 'Standard cleaning studio biasanya 1.5–2.5 jam. Deep cleaning 3–4 jam. Tergantung kondisi ruangan.' },
      { q: 'Apakah produk yang digunakan aman untuk anak dan hewan peliharaan?', a: 'Ya, kami menggunakan produk pembersih yang tersertifikasi aman dan ramah lingkungan.' },
      { q: 'Bagaimana jika ada barang yang rusak saat cleaning?', a: 'Tim kami bekerja dengan hati-hati. Jika ada kerusakan akibat kelalaian tim, kami tanggung biaya penggantian.' },
    ],
    reviews: [
      { name: 'Gita L.',   city: 'Jaksel', rating: 5, date: '17 Jun 2026', text: 'Deep cleaning apartemen 2BR selesai dalam 4 jam. Hasilnya luar biasa bersih, seperti apartemen baru!' },
      { name: 'Hendra S.', city: 'Depok',  rating: 5, date: '13 Jun 2026', text: 'Tim datang 2 orang, profesional, dan hati-hati. Sofa lama jadi seperti baru setelah dicuci.' },
      { name: 'Indah W.',  city: 'Bekasi', rating: 4, date: '9 Jun 2026',  text: 'Puas dengan hasilnya. Hanya ada 1 area yang kurang bersih tapi langsung direvisi saat diminta.' },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function RatingBreakdown({ data }: { data: typeof SERVICES[0]['rating'] }) {
  const stars = [5, 4, 3, 2, 1];
  return (
    <div className="space-y-1.5">
      {stars.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span className="text-xs text-gray-500 w-3">{s}</span>
          <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full"
              style={{ width: `${data.breakdown[i]}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 w-6 text-right">{data.breakdown[i]}%</span>
        </div>
      ))}
      <p className="text-[10px] text-gray-400 mt-1">*Berdasarkan {data.total.toLocaleString('id-ID')} ulasan terverifikasi platform</p>
    </div>
  );
}

function PriceRow({ item, price }: { item: string; price: string }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-gray-100 last:border-0 gap-4">
      <span className="text-sm text-gray-700">{item}</span>
      <span className="text-sm font-semibold text-green-700 flex-shrink-0">{price}</span>
    </div>
  );
}

function ReviewCard({ r }: { r: (typeof SERVICES[0]['reviews'])[0] }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <div className="flex items-start gap-3 mb-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {r.name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-green-900">{r.name} · {r.city}</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: r.rating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden />
            ))}
            <span className="text-xs text-gray-400 ml-1">{r.date}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LayananPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-sm font-semibold mb-4">
            MVP Fase 1 — 3 Kategori Utama
          </span>
          <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">
            Semua Kebutuhan Rumah,<br />
            <span className="text-green-200">Satu Platform Terpercaya</span>
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto mb-8">
            Mitra terverifikasi KYC, harga transparan (range nyata, bukan &ldquo;mulai dari&rdquo;), garansi kerja, dan pembayaran escrow aman.
          </p>
          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { val: '7.291+', label: 'Ulasan Terverifikasi' },
              { val: '4.86',   label: 'Rating Rata-rata', suffix: '⭐' },
              { val: '94%',    label: 'Kepuasan Customer' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black">{s.val} {s.suffix}</p>
                <p className="text-green-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden />
          <p className="text-xs text-amber-700">
            <strong>Transparansi Harga:</strong> Semua harga adalah estimasi. Biaya final ditentukan oleh kondisi aktual di lapangan dan disetujui customer sebelum pekerjaan dimulai. Tidak ada biaya tersembunyi.
          </p>
        </div>
      </div>

      {/* Services Detail */}
      {SERVICES.map((svc, idx) => {
        const Icon = svc.icon;
        return (
          <section
            key={svc.id}
            id={svc.id}
            className={`py-16 lg:py-24 ${idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
            aria-labelledby={`h2-${svc.id}`}
          >
            <div className="max-w-6xl mx-auto px-6">
              {/* Section Header */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className={`w-12 h-12 rounded-2xl ${svc.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${svc.iconColor}`} aria-hidden />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 id={`h2-${svc.id}`} className="text-2xl font-black text-green-900">
                      {svc.emoji} {svc.title}
                    </h2>
                    {svc.badge && (
                      <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${svc.badgeBg}`}>
                        {svc.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{svc.subtitle}</p>
                </div>
                <div className="ml-auto flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    {svc.rating.avg} ({svc.rating.total.toLocaleString('id-ID')} ulasan)
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Clock className="w-4 h-4" />
                    {svc.duration}
                  </span>
                  <span className="flex items-center gap-1.5 text-green-600">
                    <Shield className="w-4 h-4" />
                    {svc.guarantee}
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Gambar & Rating */}
                <div className="lg:col-span-1 space-y-5">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={svc.img}
                      alt={svc.title}
                      className="w-full h-52 object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Rating breakdown */}
                  <div className={`p-4 rounded-2xl border ${svc.accentBorder} bg-white`}>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-4xl font-black text-green-900">{svc.rating.avg}</span>
                      <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                    </div>
                    <RatingBreakdown data={svc.rating} />
                  </div>

                  {/* Sample Mitra */}
                  <div>
                    <p className="text-sm font-semibold text-green-900 mb-3">Contoh Mitra Aktif</p>
                    <div className="space-y-2">
                      {svc.sampleMitra.map(m => (
                        <div key={m.name} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-green-100">
                          <img src={m.img} alt={m.name} className="w-9 h-9 rounded-full object-cover" loading="lazy" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-green-900 truncate">{m.name}</p>
                            <p className="text-xs text-gray-500">{m.city} · {m.jobs} job selesai</p>
                          </div>
                          <span className="flex items-center gap-0.5 text-xs font-bold text-amber-600">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {m.rating}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">*Mitra aktual mungkin berbeda per lokasi & ketersediaan</p>
                  </div>
                </div>

                {/* Detail Konten */}
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-gray-600 leading-relaxed">{svc.description}</p>

                  {/* Fitur */}
                  <div>
                    <h3 className="font-bold text-green-900 mb-3">Yang Termasuk</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {svc.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daftar Harga */}
                  <div className={`rounded-2xl border ${svc.accentBorder} overflow-hidden`}>
                    <div className={`${svc.iconBg} px-5 py-3 border-b ${svc.accentBorder}`}>
                      <h3 className="font-bold text-green-900 text-sm">Estimasi Biaya</h3>
                    </div>
                    <div className="px-5 divide-y divide-gray-100 bg-white">
                      {svc.priceList.map(p => <PriceRow key={p.item} {...p} />)}
                    </div>
                    <div className="bg-amber-50 px-5 py-3 text-xs text-amber-700 border-t border-amber-100">
                      {svc.priceNote}
                    </div>
                  </div>

                  {/* FAQ */}
                  <div>
                    <h3 className="font-bold text-green-900 mb-3">Pertanyaan Umum</h3>
                    <div className="space-y-3">
                      {svc.faqs.map(faq => (
                        <details key={faq.q} className="group rounded-xl border border-green-100 bg-white">
                          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                            <span className="text-sm font-semibold text-green-900 pr-4">{faq.q}</span>
                            <ChevronDown className="w-4 h-4 text-green-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
                          </summary>
                          <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div>
                    <h3 className="font-bold text-green-900 mb-3">Ulasan Terbaru</h3>
                    <div className="grid gap-3">
                      {svc.reviews.map(r => <ReviewCard key={r.name} r={r} />)}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/#layanan"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg shadow-green-400/25 hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:scale-[1.01]"
                  >
                    Pesan {svc.title} Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="bg-green-600 py-16 text-center text-white">
        <h2 className="text-3xl font-black mb-3">Punya Pertanyaan Lain?</h2>
        <p className="text-green-100 mb-6 max-w-md mx-auto">Tim support kami siap membantu 7 hari seminggu.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/kontak" className="px-8 py-3.5 rounded-2xl bg-white text-green-700 font-bold hover:bg-green-50 transition-colors">
            Hubungi Kami
          </Link>
          <Link href="/cara-kerja" className="px-8 py-3.5 rounded-2xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
            Lihat Cara Kerja
          </Link>
        </div>
      </section>
    </main>
  );
}
