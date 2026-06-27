/**
 * @file src/app/syarat/page.tsx
 * Syarat & Ketentuan Tukang Express.
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan ketentuan penggunaan layanan Tukang Express untuk Customer dan Mitra.',
};

const SECTIONS = [
  {
    title: '1. Ketentuan Umum',
    content: 'Dengan mendaftar dan menggunakan aplikasi Tukang Express, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan ini. Tukang Express adalah platform perantara yang menghubungkan Customer dengan Mitra Tukang — bukan penyedia jasa langsung.',
  },
  {
    title: '2. Pendaftaran Akun',
    content: 'Pengguna wajib berusia minimal 17 tahun. Data yang dimasukkan harus akurat dan terkini. Satu nomor HP hanya dapat terdaftar untuk satu akun. Akun yang terbukti menggunakan data palsu akan diblokir permanen.',
  },
  {
    title: '3. Verifikasi Mitra (KYC)',
    content: 'Calon Mitra wajib menyerahkan: KTP/E-KTP yang valid, foto profesi, foto selfie, dan nomor rekening bank aktif. Tukang Express berhak menolak pendaftaran tanpa kewajiban memberikan alasan. Mitra yang terbukti memalsukan dokumen akan diblokir dan dilaporkan ke pihak berwajib.',
  },
  {
    title: '4. Sistem Escrow & Pembayaran',
    content: 'Dana Customer ditahan oleh sistem escrow setelah pembayaran dikonfirmasi. Dana HANYA dicairkan ke Mitra setelah Customer mengkonfirmasi pekerjaan selesai. Jika Customer tidak merespons dalam 24 jam setelah Mitra markir selesai, dana otomatis cair ke Mitra. Biaya platform: 15% dari nilai transaksi (dipotong dari porsi Mitra).',
  },
  {
    title: '5. Pembatalan & Refund',
    content: 'Customer dapat membatalkan order GRATIS sebelum Mitra menerima order (status SEARCHING_MITRA). Setelah Mitra menerima (MITRA_FOUND), biaya pembatalan 10% dari nilai order. Setelah Mitra tiba di lokasi (ON_THE_WAY+), tidak ada refund kecuali terbukti kelalaian Mitra. Refund diproses dalam 1–7 hari kerja.',
  },
  {
    title: '6. Tanggung Jawab Mitra',
    content: 'Mitra bertanggung jawab penuh atas kualitas dan keamanan pekerjaan. Mitra wajib membawa alat dan bahan yang sesuai. Kerusakan akibat kelalaian Mitra menjadi tanggung jawab Mitra. Tukang Express tidak bertanggung jawab atas kerusakan yang terjadi. Namun, kami menyediakan mekanisme dispute resolution.',
  },
  {
    title: '7. Larangan & Sanksi',
    content: 'Dilarang: transaksi di luar platform setelah order dibuat, perundungan/pelecehan antara Customer dan Mitra, pemalsuan rating/ulasan, penggunaan akun untuk tujuan ilegal. Pelanggaran dapat mengakibatkan suspend atau blokir permanen.',
  },
  {
    title: '8. Perubahan Layanan',
    content: 'Tukang Express berhak mengubah, menambah, atau menghentikan fitur kapanpun dengan pemberitahuan minimal 7 hari via email/notifikasi in-app. Perubahan harga platform akan diberitahu 30 hari sebelumnya.',
  },
  {
    title: '9. Hukum yang Berlaku',
    content: 'Syarat ini tunduk pada hukum Republik Indonesia. Sengketa diselesaikan melalui musyawarah; jika tidak tercapai, melalui Pengadilan Negeri Jakarta Selatan.',
  },
];

export default function SyaratPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-700 to-emerald-800 text-white py-16 pt-28">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-black mb-3">Syarat & Ketentuan</h1>
          <p className="text-green-200">Terakhir diperbarui: 17 Juni 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-green-900 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{s.content}</p>
            </div>
          ))}

          <div className="mt-10 p-6 bg-green-50 rounded-2xl border border-green-200">
            <p className="text-sm text-green-800">
              Pertanyaan tentang syarat & ketentuan?{' '}
              <Link href="/kontak" className="text-green-600 underline font-semibold">Hubungi kami</Link>
            </p>
          </div>
        </div>
      </section>

      <div className="text-center py-10">
        <Link href="/" className="text-green-600 hover:text-green-500 font-medium text-sm">← Kembali ke Beranda</Link>
      </div>
    </main>
  );
}
