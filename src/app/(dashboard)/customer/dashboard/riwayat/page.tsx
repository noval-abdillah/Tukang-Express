'use client';

import { useState } from 'react';

const initialRiwayat = [
  { id: 'ORD-001', layanan: 'Servis AC', mitra: 'Budi Teknisi', tgl: 'Hari ini, 11:00', status: 'Dikerjakan', nominal: 'Rp 157.500', rating: null },
  { id: 'ORD-002', layanan: 'Ledeng & Pipa', mitra: 'Andi Plumbing', tgl: 'Kemarin, 13:00', status: 'Selesai', nominal: 'Rp 82.500', rating: 5 },
  { id: 'ORD-003', layanan: 'Kebersihan', mitra: 'Sari Cleaning', tgl: '3 hari lalu, 09:00', status: 'Selesai', nominal: 'Rp 126.000', rating: 5 },
  { id: 'ORD-004', layanan: 'Servis AC', mitra: 'Budi Teknisi', tgl: '1 minggu lalu', status: 'Dibatalkan', nominal: 'Rp 157.500', rating: null },
  { id: 'ORD-005', layanan: 'Instalasi Listrik', mitra: 'Dono Listrik', tgl: '2 minggu lalu', status: 'Selesai', nominal: 'Rp 210.000', rating: 4 },
];

const badgeColor: Record<string, string> = {
  Dikerjakan: 'bg-blue-100 text-blue-700',
  Selesai: 'bg-green-100 text-green-700',
  Dibatalkan: 'bg-red-100 text-red-700',
  Menunggu: 'bg-yellow-100 text-yellow-700',
};

export default function RiwayatPage() {
  const [filter, setFilter] = useState<'Semua' | 'Dikerjakan' | 'Selesai' | 'Dibatalkan'>('Semua');
  const [riwayatList, setRiwayatList] = useState(initialRiwayat);
  const [ratingModal, setRatingModal] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState(5);

  const filtered = filter === 'Semua' ? riwayatList : riwayatList.filter(o => o.status === filter);

  function handleRate(id: string) {
    const targetOrder = riwayatList.find(o => o.id === id);
    if (targetOrder) {
      // Simpan rating mitra ke localStorage
      const savedRatings = localStorage.getItem('mitra-ratings') ? JSON.parse(localStorage.getItem('mitra-ratings')!) : {};
      const mitraKey = targetOrder.mitra; // contoh: "Budi Teknisi"
      
      const current = savedRatings[mitraKey] || { totalRating: 4.9 * 64, count: 64 };
      const newTotal = current.totalRating + selectedRating;
      const newCount = current.count + 1;
      
      savedRatings[mitraKey] = {
        totalRating: newTotal,
        count: newCount,
        average: parseFloat((newTotal / newCount).toFixed(1))
      };
      
      localStorage.setItem('mitra-ratings', JSON.stringify(savedRatings));
    }

    setRiwayatList(prev => prev.map(o => o.id === id ? { ...o, rating: selectedRating } : o));
    setRatingModal(null);
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Customer</p>
        <h1 className="mt-2 text-3xl font-black">Riwayat Order</h1>
        <p className="text-slate-500">Semua pesanan yang pernah kamu buat.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Total Order', String(riwayatList.length)],
          ['Selesai', String(riwayatList.filter(o => o.status === 'Selesai').length)],
          ['Dikerjakan', String(riwayatList.filter(o => o.status === 'Dikerjakan').length)],
          ['Dibatalkan', String(riwayatList.filter(o => o.status === 'Dibatalkan').length)],
        ].map(([l, v]) => (
          <div key={l} className="rounded-3xl bg-white p-5 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">{l}</p>
            <p className="mt-3 text-2xl font-black">{v}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        {(['Semua', 'Dikerjakan', 'Selesai', 'Dibatalkan'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold border cursor-pointer transition-all ${
              filter === f ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center text-slate-400 text-sm">
            Tidak ada order dalam kategori ini.
          </div>
        ) : (
          filtered.map(o => (
            <div key={o.id} className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center text-white font-black text-xs shrink-0">
                {o.mitra.split(' ').map(w => w[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold">{o.layanan}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${badgeColor[o.status]}`}>{o.status}</span>
                </div>
                <p className="text-sm text-slate-500">{o.mitra} · {o.tgl}</p>
                {o.rating && (
                  <p className="text-xs text-yellow-500 font-semibold mt-0.5">{'★'.repeat(o.rating)}{'☆'.repeat(5 - o.rating)} Kamu beri rating {o.rating}</p>
                )}
              </div>
              <div className="text-right shrink-0 pr-4">
                <p className="font-black">{o.nominal}</p>
                <p className="text-xs text-slate-400">{o.id}</p>
              </div>
              <div className="flex gap-2">
                {o.status === 'Selesai' && !o.rating && (
                  <button
                    onClick={() => setRatingModal(o.id)}
                    className="rounded-xl bg-yellow-400 px-3 py-2 text-xs font-bold text-yellow-900 cursor-pointer hover:bg-yellow-300 transition-colors"
                  >
                    Beri Rating
                  </button>
                )}
                {o.status === 'Selesai' && (
                  <button
                    onClick={() => window.location.href = '/customer/dashboard/order'}
                    className="rounded-xl bg-blue-50 text-blue-600 px-3 py-2 text-xs font-bold cursor-pointer hover:bg-blue-100 transition-colors"
                  >
                    Pesan Lagi
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rating Modal Simulator */}
      {ratingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-100 text-center">
            <h3 className="font-bold text-slate-800 text-lg">Beri Penilaian</h3>
            <p className="text-slate-500 text-sm">Bagaimana performa mitra untuk order #{ratingModal}?</p>

            <div className="flex justify-center gap-2 text-3xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  className={`cursor-pointer hover:scale-110 transition-transform ${star <= selectedRating ? 'text-yellow-400' : 'text-slate-200'}`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setRatingModal(null)}
                className="flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleRate(ratingModal)}
                className="flex-1 py-2.5 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm cursor-pointer"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
