'use client';

import { useState } from 'react';
import { QrCode, CheckCircle, Loader2 } from 'lucide-react';

const initialPayments = [
  { id: 'PAY-001', order: 'Servis AC', mitra: 'Budi Teknisi', tgl: 'Hari ini', nominal: 'Rp 157.500', status: 'Pending', metode: 'QRIS' },
  { id: 'PAY-002', order: 'Ledeng & Pipa', mitra: 'Andi Plumbing', tgl: 'Kemarin', nominal: 'Rp 82.500', status: 'Settlement', metode: 'QRIS' },
  { id: 'PAY-003', order: 'Kebersihan', mitra: 'Sari Cleaning', tgl: '3 hari lalu', nominal: 'Rp 126.000', status: 'Settlement', metode: 'GoPay' },
  { id: 'PAY-004', order: 'Servis AC', mitra: 'Budi Teknisi', tgl: '1 minggu lalu', nominal: 'Rp 157.500', status: 'Refund', metode: 'Transfer Bank' },
];

const badgeColor: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Settlement: 'bg-green-100 text-green-700',
  Refund: 'bg-red-100 text-red-700',
};

export default function PembayaranPage() {
  const [filter, setFilter] = useState<'Semua' | 'Pending' | 'Settlement' | 'Refund'>('Semua');
  const [payments, setPayments] = useState(initialPayments);
  const [selectedPay, setSelectedPay] = useState<typeof initialPayments[0] | null>(null);
  const [paying, setPaying] = useState(false);

  const filtered = filter === 'Semua' ? payments : payments.filter(p => p.status === filter);

  function simulatePaymentSuccess(id: string) {
    setPaying(true);
    setTimeout(() => {
      setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'Settlement' } : p));
      setPaying(false);
      setSelectedPay(null);
    }, 1500);
  }

  const pendingCount = payments.filter(p => p.status === 'Pending').length;
  const settlementSum = payments.filter(p => p.status === 'Settlement').reduce((sum, p) => sum + parseInt(p.nominal.replace(/\D/g, ''), 10), 0);
  const refundSum = payments.filter(p => p.status === 'Refund').reduce((sum, p) => sum + parseInt(p.nominal.replace(/\D/g, ''), 10), 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Customer</p>
        <h1 className="mt-2 text-3xl font-black">Pembayaran</h1>
        <p className="text-slate-500">Riwayat dan status semua transaksi kamu.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Menunggu Pembayaran', value: `${pendingCount} order`, color: 'from-yellow-400 to-orange-400' },
          { label: 'Total Dibayar', value: `Rp ${settlementSum.toLocaleString('id-ID')}`, color: 'from-blue-400 to-indigo-500' },
          { label: 'Total Direfund', value: `Rp ${refundSum.toLocaleString('id-ID')}`, color: 'from-red-400 to-pink-500' },
        ].map(c => (
          <div key={c.label} className={`rounded-3xl bg-gradient-to-br ${c.color} p-5 text-white shadow-sm`}>
            <p className="text-sm font-semibold opacity-80">{c.label}</p>
            <p className="mt-3 text-2xl font-black">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-bold text-lg">Riwayat Transaksi</h2>
          <div className="flex gap-2">
            {(['Semua', 'Pending', 'Settlement', 'Refund'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-semibold border cursor-pointer transition-all ${
                  filter === f ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">Tidak ada transaksi dalam kategori ini.</div>
        ) : (
          filtered.map(p => (
            <div
              key={p.id}
              onClick={() => { if (p.status === 'Pending') setSelectedPay(p); }}
              className={`flex items-center gap-4 px-6 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors ${p.status === 'Pending' ? 'cursor-pointer hover:border-l-4 hover:border-l-yellow-400' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${p.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'}`}>
                {p.status === 'Pending' ? <QrCode className="w-5 h-5" /> : 'PAY'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{p.order}</p>
                <p className="text-xs text-slate-400 truncate">{p.id} · {p.mitra} · {p.metode}</p>
                {p.status === 'Pending' && <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full mt-1 inline-block">Klik untuk Bayar</span>}
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-sm">{p.nominal}</p>
                <p className="text-xs text-slate-400">{p.tgl}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold shrink-0 ${badgeColor[p.status]}`}>{p.status}</span>
            </div>
          ))
        )}
      </div>

      {/* QRIS BARCODE POPUP MODAL */}
      {selectedPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl border border-slate-100 text-center">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Bayar dengan QRIS</h3>
              <p className="text-xs text-slate-400">Scan QR code di bawah menggunakan aplikasi e-wallet / banking</p>
            </div>

            {/* QRIS Barcode Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 max-w-[240px] mx-auto">
              <svg className="w-48 h-48 bg-white border-2 border-slate-100 rounded-xl p-2" viewBox="0 0 100 100">
                {/* Dummy QR Code Pattern */}
                <rect x="10" y="10" width="20" height="20" fill="black" />
                <rect x="14" y="14" width="12" height="12" fill="white" />
                <rect x="70" y="10" width="20" height="20" fill="black" />
                <rect x="74" y="14" width="12" height="12" fill="white" />
                <rect x="10" y="70" width="20" height="20" fill="black" />
                <rect x="14" y="74" width="12" height="12" fill="white" />
                <rect x="40" y="40" width="20" height="20" fill="black" />
                <rect x="44" y="44" width="12" height="12" fill="white" />
                {/* Random noise squares */}
                <rect x="10" y="40" width="8" height="8" fill="black" />
                <rect x="25" y="50" width="6" height="6" fill="black" />
                <rect x="55" y="20" width="10" height="6" fill="black" />
                <rect x="75" y="45" width="8" height="12" fill="black" />
                <rect x="45" y="75" width="14" height="8" fill="black" />
                <rect x="70" y="70" width="10" height="10" fill="black" />
              </svg>
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700 bg-white border border-slate-100 rounded-full px-3 py-1">
                <span>⚡</span>
                <span>QRIS TERVERIFIKASI</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400">Total Nominal Pembayaran</p>
              <p className="text-xl font-black text-slate-800">{selectedPay.nominal}</p>
              <p className="text-[10px] text-slate-400">Order ID: {selectedPay.id}</p>
            </div>

            <div className="flex gap-2">
              <button
                disabled={paying}
                onClick={() => setSelectedPay(null)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm cursor-pointer transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                disabled={paying}
                onClick={() => simulatePaymentSuccess(selectedPay.id)}
                className="flex-1 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                {paying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Simulasi Bayar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
        <h2 className="font-bold text-lg mb-4">Cara Pembayaran</h2>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          {[
            { step: '1', title: 'Buat Order & Bayar', desc: 'Dana kamu masuk ke escrow platform, aman.' },
            { step: '2', title: 'Mitra Kerjakan', desc: 'Mitra datang dan menyelesaikan pekerjaan.' },
            { step: '3', title: 'Konfirmasi Selesai', desc: 'Dana cair ke mitra, kamu bisa beri ulasan.' },
          ].map(s => (
            <div key={s.step} className="rounded-2xl bg-blue-50 p-4">
              <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-black flex items-center justify-center mb-2">{s.step}</div>
              <p className="font-bold text-blue-800">{s.title}</p>
              <p className="text-blue-600 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
