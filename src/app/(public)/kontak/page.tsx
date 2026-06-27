/**
 * @file src/app/kontak/page.tsx
 * Halaman Hubungi Kami dengan form kontak.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, MessageCircle, HeadphonesIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Hubungi tim Tukang Express untuk pertanyaan, keluhan, atau kerjasama. Kami siap membantu.',
};

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20 pt-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Hubungi Kami</h1>
          <p className="text-green-100 text-lg max-w-xl mx-auto">
            Tim support kami siap membantu Anda 7 hari seminggu, 08.00–22.00 WIB.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info Kontak */}
            <div>
              <h2 className="text-2xl font-black text-green-900 mb-8">Cara Menghubungi Kami</h2>

              <div className="space-y-6 mb-10">
                {[
                  { icon: Phone, label: 'Telepon / WhatsApp', val: '+62 812-3456-7890', sub: 'Senin–Minggu, 08.00–22.00 WIB' },
                  { icon: Mail, label: 'Email', val: 'halo@tukangexpress.id', sub: 'Respons dalam 2 jam kerja' },
                  { icon: MessageCircle, label: 'Live Chat', val: 'Tersedia di aplikasi', sub: 'Real-time, rata-rata respons 3 menit' },
                  { icon: MapPin, label: 'Kantor Pusat', val: 'Jakarta Selatan, DKI Jakarta', sub: 'Belum menerima kunjungan walk-in' },
                  { icon: Clock, label: 'Jam Operasional', val: 'Senin–Minggu: 08.00–22.00', sub: 'Darurat: 24 jam via WhatsApp' },
                ].map(item => {
                  const I = item.icon;
                  return (
                    <div key={item.label} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                        <I className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.label}</p>
                        <p className="font-bold text-green-900">{item.val}</p>
                        <p className="text-sm text-gray-500">{item.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FAQ Cepat */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-2 mb-4">
                  <HeadphonesIcon className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-900">Pertanyaan Sering Diajukan</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { q: 'Bagaimana jika mitra tidak datang?', a: 'Dana escrow dikembalikan 100% dalam 1x24 jam.' },
                    { q: 'Apakah ada biaya pendaftaran?', a: 'Tidak. Gratis untuk customer dan mitra.' },
                    { q: 'Kapan dana escrow cair ke mitra?', a: 'Setelah customer konfirmasi pekerjaan selesai.' },
                  ].map(faq => (
                    <div key={faq.q} className="border-b border-green-200 pb-4 last:border-0 last:pb-0">
                      <p className="text-sm font-semibold text-green-800 mb-1">{faq.q}</p>
                      <p className="text-sm text-gray-500">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Kontak */}
            <div>
              <h2 className="text-2xl font-black text-green-900 mb-8">Kirim Pesan</h2>
              <form className="space-y-5" action="#" method="POST">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nama" className="block text-sm font-semibold text-green-900 mb-1.5">Nama Lengkap *</label>
                    <input
                      id="nama" name="nama" type="text" required
                      placeholder="Budi Santoso"
                      className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-green-900 mb-1.5">Nomor HP *</label>
                    <input
                      id="phone" name="phone" type="tel" required
                      placeholder="08123456789"
                      className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none text-sm transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-green-900 mb-1.5">Email</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="budi@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="topik" className="block text-sm font-semibold text-green-900 mb-1.5">Topik *</label>
                  <select
                    id="topik" name="topik" required
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none text-sm transition-colors bg-white"
                  >
                    <option value="">-- Pilih Topik --</option>
                    <option value="keluhan">Keluhan / Masalah Order</option>
                    <option value="refund">Refund / Pembayaran</option>
                    <option value="mitra">Daftar Jadi Mitra</option>
                    <option value="kerjasama">Kerjasama / Partnership</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="pesan" className="block text-sm font-semibold text-green-900 mb-1.5">Pesan *</label>
                  <textarea
                    id="pesan" name="pesan" required rows={5}
                    placeholder="Tuliskan pertanyaan atau keluhan Anda secara detail..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none text-sm transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-base shadow-lg shadow-green-400/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Kirim Pesan →
                </button>
                <p className="text-xs text-gray-400 text-center">Dengan mengirim pesan, Anda menyetujui Kebijakan Privasi kami.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center py-10">
        <Link href="/" className="text-green-600 hover:text-green-500 font-medium text-sm">← Kembali ke Beranda</Link>
      </div>
    </main>
  );
}
