/**
 * @file src/app/harga/page.tsx
 * Kalkulator estimasi harga layanan Tukang Express.
 * Transparan: harga range, faktor penentu, dan disclaimer jelas.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, AlertCircle, CheckCircle, Wind, Droplets, Sparkles } from 'lucide-react';

const SERVICE_OPTIONS = [
  {
    id: 'ac',
    label: '❄️ Servis AC',
    icon: Wind,
    subtypes: [
      { label: 'Cuci AC 0.5–1 PK',           min: 80000,   max: 120000  },
      { label: 'Cuci AC 1.5–2 PK',           min: 120000,  max: 180000  },
      { label: 'Isi Freon R22',               min: 150000,  max: 250000  },
      { label: 'Isi Freon R32',               min: 200000,  max: 350000  },
      { label: 'Perbaikan Kompresor',         min: 500000,  max: 2500000 },
      { label: 'Instalasi AC Baru',           min: 350000,  max: 600000  },
    ],
  },
  {
    id: 'ledeng',
    label: '🔧 Ledeng & Pipa',
    icon: Droplets,
    subtypes: [
      { label: 'Ganti Keran Standar',          min: 60000,   max: 120000  },
      { label: 'Perbaikan Pipa Bocor',         min: 80000,   max: 200000  },
      { label: 'Buka Saluran Tersumbat',       min: 100000,  max: 300000  },
      { label: 'Ganti Kloset',                 min: 300000,  max: 700000  },
      { label: 'Pasang Water Heater',          min: 250000,  max: 500000  },
      { label: 'Perbaikan Pompa Air',          min: 200000,  max: 1000000 },
    ],
  },
  {
    id: 'kebersihan',
    label: '✨ Kebersihan Rumah',
    icon: Sparkles,
    subtypes: [
      { label: 'Standard Cleaning (studio)',   min: 120000,  max: 200000  },
      { label: 'Standard Cleaning (2–3BR)',    min: 200000,  max: 350000  },
      { label: 'Deep Cleaning (studio)',       min: 350000,  max: 550000  },
      { label: 'Deep Cleaning (2–3BR)',        min: 500000,  max: 800000  },
      { label: 'Cuci Sofa (per dudukan)',      min: 80000,   max: 150000  },
      { label: 'Cuci Karpet (per m²)',         min: 20000,   max: 40000   },
    ],
  },
];

function formatRp(num: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

export default function HargaPage() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedSubtype, setSelectedSubtype] = useState<number>(-1);
  const [qty, setQty] = useState(1);
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);

  const service = SERVICE_OPTIONS.find(s => s.id === selectedService);
  const subtype = service?.subtypes[selectedSubtype];

  const calculate = () => {
    if (!subtype) return;
    setResult({ min: subtype.min * qty, max: subtype.max * qty });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Calculator className="w-12 h-12 mx-auto mb-4 text-green-200" />
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Kalkulator Estimasi Biaya</h1>
          <p className="text-green-100 text-lg max-w-xl mx-auto">
            Dapatkan perkiraan biaya sebelum memesan. Harga final disetujui bersama di lapangan.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Kalkulator */}
            <div className="bg-white rounded-3xl shadow-xl shadow-green-100 border border-green-100 p-8">
              <h2 className="text-xl font-black text-green-900 mb-6">Hitung Estimasi</h2>

              {/* Pilih Layanan */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-green-900 mb-2">1. Pilih Kategori Layanan</label>
                <div className="grid grid-cols-3 gap-3">
                  {SERVICE_OPTIONS.map(svc => {
                    const Icon = svc.icon;
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => { setSelectedService(svc.id); setSelectedSubtype(-1); setResult(null); }}
                        className={`
                          flex flex-col items-center gap-2 p-3 rounded-2xl border-2 text-center transition-all text-sm
                          ${selectedService === svc.id
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50'
                          }
                        `}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="font-semibold leading-tight">{svc.label.split(' ').slice(1).join(' ')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pilih Jenis Pekerjaan */}
              {service && (
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-green-900 mb-2">2. Jenis Pekerjaan</label>
                  <select
                    value={selectedSubtype}
                    onChange={e => { setSelectedSubtype(Number(e.target.value)); setResult(null); }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none text-sm bg-white"
                  >
                    <option value={-1}>-- Pilih jenis pekerjaan --</option>
                    {service.subtypes.map((st, i) => (
                      <option key={st.label} value={i}>{st.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Jumlah */}
              {selectedSubtype >= 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-green-900 mb-2">3. Jumlah / Kuantitas</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-10 h-10 rounded-xl border-2 border-green-200 text-green-700 font-bold hover:bg-green-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-2xl font-black text-green-900 w-12 text-center">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(q => Math.min(10, q + 1))}
                      className="w-10 h-10 rounded-xl border-2 border-green-200 text-green-700 font-bold hover:bg-green-50 transition-colors"
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-500">unit/item</span>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={calculate}
                disabled={selectedSubtype < 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:from-green-400 hover:to-emerald-400 transition-all duration-300"
              >
                Hitung Estimasi
              </button>

              {/* Hasil */}
              {result && (
                <div className="mt-6 p-5 bg-green-50 rounded-2xl border border-green-200">
                  <p className="text-sm text-green-700 mb-2 font-medium">Estimasi biaya untuk {qty} unit:</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-green-700">{formatRp(result.min)}</span>
                    <span className="text-gray-400">—</span>
                    <span className="text-3xl font-black text-green-900">{formatRp(result.max)}</span>
                  </div>
                  <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">
                      Estimasi ini hanya gambaran awal. Biaya aktual dapat berbeda tergantung kondisi lapangan. Teknisi akan konfirmasi biaya final sebelum mulai bekerja.
                    </p>
                  </div>
                  <Link
                    href="/layanan"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-500 transition-colors"
                  >
                    Pesan Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-green-900 mb-4">Faktor Penentu Harga</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Estimasi di atas adalah panduan umum. Biaya akhir dipengaruhi beberapa faktor yang baru bisa dinilai saat teknisi di lokasi:
                </p>
                <div className="space-y-4">
                  {[
                    { factor: 'Kondisi Aktual',    desc: 'Tingkat kerusakan, usia peralatan, kerumitan akses ke titik masalah.' },
                    { factor: 'Material',           desc: 'Harga material berfluktuasi. Teknisi belanja sesuai kebutuhan aktual dengan persetujuan Anda.' },
                    { factor: 'Lokasi',             desc: 'Biaya perjalanan untuk area yang sangat jauh dari titik mitra.' },
                    { factor: 'Waktu Pengerjaan',   desc: 'Pekerjaan malam hari atau hari libur nasional mungkin ada biaya tambahan.' },
                    { factor: 'Merek & Spesifikasi', desc: 'Beberapa merek premium memerlukan suku cadang khusus yang lebih mahal.' },
                  ].map(item => (
                    <div key={item.factor} className="flex gap-3 p-4 bg-white rounded-2xl border border-green-100">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden />
                      <div>
                        <p className="font-semibold text-green-900 text-sm">{item.factor}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-600 text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">Garansi Harga Transparan</h3>
                <ul className="space-y-2 text-sm text-green-100">
                  {[
                    'Teknisi WAJIB minta approval Anda sebelum mulai bekerja',
                    'Biaya tambahan (material) diinformasikan & disetujui dulu',
                    'Tidak ada biaya kejutan setelah pekerjaan selesai',
                    'Dana escrow hanya cair setelah Anda konfirmasi selesai',
                    'Komplain? Hubungi support kami dalam 7 hari',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center pb-16">
        <Link href="/" className="text-green-600 hover:text-green-500 font-medium text-sm">← Kembali ke Beranda</Link>
      </div>
    </main>
  );
}
