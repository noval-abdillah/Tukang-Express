/**
 * @file src/app/privasi/page.tsx
 * Kebijakan Privasi Tukang Express.
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi Tukang Express — bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.',
};

export default function PrivasiPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-700 to-emerald-800 text-white py-16 pt-28">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-black mb-3">Kebijakan Privasi</h1>
          <p className="text-green-200">Terakhir diperbarui: 17 Juni 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 prose prose-green max-w-none">
          {[
            {
              title: '1. Data yang Kami Kumpulkan',
              content: `Tukang Express mengumpulkan data berikut untuk menjalankan layanan:
- **Data Identitas**: Nama lengkap, nomor HP, email, KTP (hanya untuk Mitra, dienkripsi).
- **Data Lokasi**: Koordinat GPS real-time (hanya saat fitur tracking aktif).
- **Data Transaksi**: Riwayat order, metode pembayaran, jumlah transaksi.
- **Data Komunikasi**: Pesan in-app antara Customer dan Mitra (terenkripsi end-to-end).`,
            },
            {
              title: '2. Bagaimana Kami Menggunakan Data',
              content: `Data digunakan untuk:
- Menjalankan layanan pemesanan dan pencocokan Mitra.
- Memproses pembayaran melalui gateway (Midtrans/Xendit).
- Mengirim notifikasi status order.
- Meningkatkan kualitas layanan dan keamanan platform.
- Memenuhi kewajiban hukum yang berlaku di Indonesia.`,
            },
            {
              title: '3. Keamanan Data KYC Mitra',
              content: `Data identitas Mitra (KTP, foto profesi) mendapat perlindungan khusus:
- Dienkripsi menggunakan AES-256 saat disimpan (at-rest encryption).
- Disimpan di cloud storage terproteksi (S3/Cloud Storage) dengan access control ketat.
- Hanya dapat diakses oleh Admin terverifikasi dengan autentikasi dua faktor.
- TIDAK dibagikan ke Customer atau pihak ketiga manapun.`,
            },
            {
              title: '4. Keamanan Pembayaran Escrow',
              content: `Semua transaksi finansial diproteksi:
- Dana escrow dikelola melalui Payment Gateway berlisensi OJK.
- Webhook pembayaran divalidasi menggunakan Signature Key kriptografis resmi.
- Tidak ada data kartu kredit/debit yang disimpan di server kami.
- Semua koneksi menggunakan HTTPS/TLS 1.3.`,
            },
            {
              title: '5. Berbagi Data dengan Pihak Ketiga',
              content: `Kami TIDAK menjual data Anda. Data hanya dibagikan ke:
- **Payment Gateway** (Midtrans/Xendit): Data transaksi untuk proses pembayaran.
- **Maps API** (Google Maps/Mapbox): Koordinat lokasi untuk fitur tracking.
- **Otoritas Hukum**: Jika diwajibkan oleh hukum yang berlaku.`,
            },
            {
              title: '6. Hak Anda',
              content: `Anda berhak untuk:
- Mengakses data pribadi yang kami simpan tentang Anda.
- Meminta koreksi data yang tidak akurat.
- Meminta penghapusan akun dan data (right to be forgotten).
- Menarik persetujuan penggunaan data kapanpun.

Kirim permintaan ke: privasi@tukangexpress.id`,
            },
            {
              title: '7. Lokasi & Tracking',
              content: `Akses lokasi GPS hanya diaktifkan saat:
- Customer melakukan tracking Mitra secara aktif.
- Mitra mengaktifkan status "Online" untuk menerima order.

Tracking otomatis berhenti saat order selesai atau status "Offline". Data lokasi tidak disimpan permanen.`,
            },
            {
              title: '8. Perubahan Kebijakan',
              content: `Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan signifikan akan diberitahu via:
- Notifikasi in-app.
- Email ke alamat terdaftar.
- Banner di halaman utama.

Penggunaan layanan setelah notifikasi dianggap sebagai persetujuan atas perubahan.`,
            },
          ].map(section => (
            <div key={section.title} className="mb-8">
              <h2 className="text-xl font-bold text-green-900 mb-3">{section.title}</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                {section.content.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('- ') ? 'ml-4 mb-1' : 'mb-2'}>
                    {line.startsWith('- ') ? '• ' + line.slice(2) : line}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 p-6 bg-green-50 rounded-2xl border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Pertanyaan tentang privasi?</strong>{' '}
              Hubungi: <a href="mailto:privasi@tukangexpress.id" className="text-green-600 underline">privasi@tukangexpress.id</a>
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
