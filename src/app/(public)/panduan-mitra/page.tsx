/**
 * @file src/app/panduan-mitra/page.tsx
 * Panduan lengkap untuk mitra Tukang Express — tips sukses, FAQ operasional.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle, ToggleRight, Clock, DollarSign,
  Star, Shield, ArrowRight, Wallet, BookOpen,
  AlertCircle, TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Panduan Mitra — Tips Sukses di Tukang Express',
  description: 'Panduan lengkap untuk mitra Tukang Express: cara kerja, tips meningkatkan rating, sistem pembayaran, dan FAQ operasional.',
};

export default function PanduanMitraPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-emerald-800 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-green-200" />
            <h1 className="text-4xl lg:text-5xl font-black mb-4">Panduan Mitra Tukang Express</h1>
            <p className="text-green-100 text-lg max-w-xl mx-auto">
              Semua yang perlu Anda tahu untuk sukses sebagai Mitra — dari pertama daftar hingga menjadi mitra bintang.
            </p>
          </div>
          {/* Quick stats mitra */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
            {[
              { val: 'Rp 8jt+', label: 'Avg. pendapatan/bulan' },
              { val: '< 5 min', label: 'Rata-rata cari order' },
              { val: '4.87 ⭐', label: 'Avg. rating platform' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <p className="text-2xl font-black">{s.val}</p>
                <p className="text-green-200 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-green-900 mb-8 text-center">Memulai Sebagai Mitra</h2>
          <div className="space-y-4">
            {[
              { num: '01', title: 'Daftar & Upload Dokumen', desc: 'Isi formulir pendaftaran online. Upload KTP, foto saat bekerja, dan nomor rekening bank. Proses ini 100% digital.' },
              { num: '02', title: 'Tunggu Verifikasi KYC',   desc: 'Tim admin kami akan review dokumen Anda dalam 1–3 hari kerja. Jujur: tidak semua pendaftar disetujui — kami selektif untuk menjaga kualitas platform.' },
              { num: '03', title: 'Akun Aktif & Training',   desc: 'Setelah disetujui, Anda menerima email panduan onboarding. Pelajari cara terima order, update status, dan menggunakan chat in-app.' },
              { num: '04', title: 'Toggle Online & Mulai',   desc: 'Aktifkan "Online" di aplikasi kapanpun Anda siap. Order akan masuk sebagai notifikasi. Respond dalam 30 detik untuk konfirmasi.' },
            ].map(step => (
              <div key={step.num} className="flex gap-6 bg-white p-6 rounded-2xl border border-green-100">
                <span className="text-3xl font-black text-green-200 flex-shrink-0 w-10">{step.num}</span>
                <div>
                  <h3 className="font-bold text-green-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja Order */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-green-900 mb-4 text-center">Alur Penerimaan Order</h2>
          <p className="text-gray-500 text-center mb-8 max-w-xl mx-auto">Pahami flow order agar tidak ada yang terlewat dan rating Anda terjaga.</p>

          <div className="bg-green-50 rounded-3xl p-6 border border-green-200 space-y-4">
            {[
              { step: 'Order Masuk',         detail: 'Notifikasi pop-up dengan detail: jenis pekerjaan, jarak, dan perkiraan tarif.' },
              { step: 'Respond (30 detik)',  detail: 'Tekan "Terima" dalam 30 detik. Jika tidak, order dialihkan ke mitra lain. Order yang terlalu sering ditolak menurunkan prioritas Anda.' },
              { step: 'Menuju Lokasi',       detail: 'Update status ke "Menuju Lokasi". Customer dapat tracking posisi Anda via GPS.' },
              { step: 'Di Lokasi',           detail: 'Konfirmasi kondisi aktual. Jika ada biaya tambahan material, ajukan via aplikasi dan tunggu approval customer SEBELUM belanja.' },
              { step: 'Kerjakan',            detail: 'Update status ke "Sedang Dikerjakan". Selesai? Update ke "Menunggu Konfirmasi".' },
              { step: 'Konfirmasi Selesai',  detail: 'Customer konfirmasi. Dana escrow cair ke saldo Anda. Rating dibuka untuk customer selama 24 jam.' },
            ].map((item, i) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-green-900 text-sm">{item.step}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2 p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">
              <strong>Penting:</strong> JANGAN meminta customer untuk bayar di luar aplikasi. Ini pelanggaran berat yang dapat mengakibatkan suspend permanen dan potensi tuntutan hukum.
            </p>
          </div>
        </div>
      </section>

      {/* Tips Tingkatkan Rating */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-green-900 mb-8 text-center">
            <TrendingUp className="inline-block w-7 h-7 mb-1 mr-2 text-green-500" />
            Tips Tingkatkan Rating & Pendapatan
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Clock,        title: 'Tepat Waktu',        tip: 'Customer sangat menghargai kedatangan sesuai estimasi. Jika terlambat, informasikan via chat.' },
              { icon: Star,         title: 'Komunikasi Aktif',   tip: 'Update status segera setelah ada perubahan. Jangan biarkan customer bertanya-tanya.' },
              { icon: Shield,       title: 'Jujur Soal Biaya',   tip: 'Lebih baik berikan estimasi akurat daripada harga murah lalu minta tambahan mendadak.' },
              { icon: CheckCircle,  title: 'Hasil Rapi',         tip: 'Bersihkan area kerja setelah selesai. Minta customer periksa sebelum pamit.' },
              { icon: DollarSign,   title: 'Paket Bundling',     tip: 'Tawarkan paket "cuci + freon" saat servis AC. Meningkatkan nilai order dan kepuasan customer.' },
              { icon: Wallet,       title: 'Foto Dokumentasi',   tip: 'Foto sebelum dan sesudah pekerjaan. Bukti kerja yang baik melindungi Anda dari klaim tidak adil.' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3 bg-white p-5 rounded-2xl border border-green-100">
                  <Icon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-green-900 text-sm mb-1">{item.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.tip}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sistem Pembayaran */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-green-900 mb-8 text-center">Sistem Pembayaran Mitra</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-green-900 text-lg">Cara Pencairan Dana</h3>
              {[
                { label: 'Biaya Platform', val: '15% dari nilai order (dipotong otomatis)' },
                { label: 'Minimum Cairkan', val: 'Rp 50.000' },
                { label: 'Proses Transfer', val: '1×24 jam kerja (Senin–Jumat)' },
                { label: 'Bank yang Diterima', val: 'BCA, Mandiri, BNI, BRI, BSI, dan lainnya' },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-semibold text-green-900 text-right ml-4">{item.val}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-bold text-green-900 text-lg mb-4">Kapan Dana Masuk ke Saldo?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p><strong>Skenario Normal:</strong> Customer konfirmasi selesai → Dana langsung masuk ke saldo Anda.</p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p><strong>Customer Tidak Konfirmasi:</strong> Jika tidak ada respons 24 jam setelah Anda markir selesai, dana otomatis cair.</p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p><strong>Dispute:</strong> Jika customer komplain, dana ditahan sementara. Support kami mediasi dalam 3×24 jam.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-green-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-black text-green-900 mb-8 text-center">FAQ Operasional</h2>
          <div className="space-y-3">
            {[
              { q: 'Apakah bisa daftar dari kota kecil/kabupaten?', a: 'Saat ini kami prioritaskan 10 kota besar. Daftar sekarang dan Anda akan dinotifikasi saat layanan menjangkau kota Anda.' },
              { q: 'Berapa lama proses KYC?', a: '1–3 hari kerja. Proses lebih cepat jika foto dokumen jelas dan tidak blur.' },
              { q: 'Bagaimana jika customer mengklaim pekerjaan buruk?', a: 'Hubungi support segera dengan foto dokumentasi. Kami mediasi berdasarkan bukti dari kedua pihak. Selalu foto sebelum dan sesudah kerja!' },
              { q: 'Apakah bisa memiliki lebih dari satu keahlian?', a: 'Ya. Anda bisa mendaftar untuk maksimal 3 kategori keahlian. Rating per kategori dihitung terpisah.' },
              { q: 'Bagaimana premium subscription bekerja?', a: 'Dengan paket premium (Rp 99.000/bulan), profil Anda muncul di posisi atas pencarian customer di radius area Anda, meningkatkan visibilitas hingga 3x.' },
            ].map(faq => (
              <details key={faq.q} className="group rounded-2xl border border-green-100 bg-white">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                  <span className="text-sm font-semibold text-green-900 pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 w-5 h-5 text-green-500 text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-center text-white">
        <h2 className="text-3xl font-black mb-4">Siap Bergabung?</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link href="/daftar-mitra" className="px-10 py-4 rounded-2xl bg-white text-green-700 font-bold hover:bg-green-50 shadow-xl flex items-center gap-2">
            Daftar Sekarang <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/kontak" className="px-10 py-4 rounded-2xl border-2 border-white/40 text-white font-semibold hover:bg-white/10">
            Hubungi Kami
          </Link>
        </div>
      </section>
    </main>
  );
}
