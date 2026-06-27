/**
 * @file src/app/fitur/page.tsx
 * Halaman lengkap semua fitur platform Tukang Express.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Lock, MapPin, Star, MessageCircle, Smartphone,
  CreditCard, Shield, Bell, Image, Clock, Users, CheckCircle, ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fitur Platform — Escrow, Tracking, Rating & Lainnya',
  description: 'Pelajari semua fitur Tukang Express: escrow payment, real-time tracking, rating, chat in-app, booking engine, dan sistem KYC digital.',
};

const FEATURE_GROUPS = [
  {
    category: 'Untuk Customer',
    icon: Smartphone,
    features: [
      { icon: Lock,           title: 'Escrow Payment',       desc: 'Dana ditahan aman di rekening escrow. Cair ke mitra hanya setelah Anda konfirmasi selesai. Terintegrasi Midtrans/Xendit (transfer, GoPay, OVO, DANA, QRIS, kartu kredit).' },
      { icon: MapPin,         title: 'Pelacakan Real-time',  desc: 'Pantau status mitra dari "Menuju Lokasi" hingga "Selesai". GPS real-time dengan estimasi waktu tiba dan rute navigasi.' },
      { icon: Star,           title: 'Rating & Ulasan',      desc: 'Beri penilaian 1–5 bintang + ulasan teks setelah selesai. Rating terverifikasi, tidak bisa dimanipulasi. Membantu pengguna lain memilih mitra terbaik.' },
      { icon: MessageCircle,  title: 'Chat In-App',          desc: 'Komunikasi langsung dengan mitra tanpa ekspos nomor HP. Chat terenkripsi end-to-end, kirim foto masalah, dan riwayat tersimpan.' },
      { icon: CreditCard,     title: 'Estimasi Harga Otomatis', desc: 'Kalkulasi biaya otomatis berdasarkan kategori, jarak, dan detail pekerjaan. Range harga transparan sebelum konfirmasi.' },
      { icon: Clock,          title: 'Jadwalkan / Sekarang',  desc: 'Opsi "Pesan Sekarang" untuk keadaan darurat, atau "Jadwalkan Nanti" untuk pilih tanggal & waktu. Fleksibel sesuai kebutuhan.' },
      { icon: Image,          title: 'Upload Foto Masalah',  desc: 'Unggah foto kondisi terkini agar mitra bisa mempersiapkan alat dan material yang tepat sebelum tiba.' },
      { icon: Bell,           title: 'Notifikasi Push',       desc: 'Setiap perubahan status order dikirim sebagai notifikasi ke ponsel. Tidak ada lagi menunggu tanpa kepastian.' },
    ],
  },
  {
    category: 'Untuk Mitra',
    icon: Users,
    features: [
      { icon: Shield,         title: 'KYC Digital',          desc: 'Proses verifikasi dokumen secara digital: KTP, foto profesi, sertifikat keahlian. Data dienkripsi AES-256 dan hanya diakses Admin.' },
      { icon: MapPin,         title: 'Manajemen Order',      desc: 'Terima notifikasi pop-up order masuk dengan detail jarak, jenis kerja, dan tarif. Batas waktu respons 30 detik untuk memastikan kecepatan layanan.' },
      { icon: CreditCard,     title: 'Penarikan Dana',       desc: 'Cairkan saldo dompet digital ke rekening bank lokal (BCA, Mandiri, BNI, BRI) dalam 1x24 jam kerja.' },
      { icon: Star,           title: 'Premium Subscription', desc: 'Upgrade ke Mitra Premium untuk tampil di posisi atas radar pencarian customer di area Anda. Lebih banyak order, lebih banyak pendapatan.' },
      { icon: Lock,           title: 'Input Biaya Tambahan', desc: 'Ajukan biaya material ekstra via aplikasi. Customer approve langsung secara digital — transparan dan profesional.' },
      { icon: Clock,          title: 'Toggle Online/Offline', desc: 'Kontrol penuh kapan mau terima order. Aktifkan "Online" saat siap, matikan kapanpun. 100% fleksibel.' },
    ],
  },
];

export default function FiturPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Semua Fitur Platform</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Fitur-fitur yang kami bangun untuk memastikan keamanan, kenyamanan, dan transparansi di setiap transaksi.
          </p>
        </div>
      </section>

      {FEATURE_GROUPS.map((group) => {
        const GroupIcon = group.icon;
        return (
          <section key={group.category} className="py-20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <GroupIcon className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-black text-green-900">{group.category}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {group.features.map(f => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="group p-6 rounded-2xl border border-green-100 bg-white hover:shadow-xl hover:shadow-green-100 transition-all duration-300 hover:-translate-y-0.5">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                          <Icon className="w-5 h-5 text-green-600" aria-hidden />
                        </div>
                        <div>
                          <h3 className="font-bold text-green-900 mb-1.5">{f.title}</h3>
                          <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-green-600 py-16 text-center text-white">
        <h2 className="text-3xl font-black mb-4">Siap Mencoba?</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link href="/layanan" className="px-10 py-4 rounded-2xl bg-white text-green-700 font-bold hover:bg-green-50 shadow-xl flex items-center gap-2">
            Pesan Layanan <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/daftar-mitra" className="px-10 py-4 rounded-2xl border-2 border-white/40 text-white font-semibold hover:bg-white/10">
            Daftar Jadi Mitra
          </Link>
        </div>
      </section>
    </main>
  );
}
