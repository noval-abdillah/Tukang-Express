'use client';

import { useState } from 'react';

const initialOrders = [
  { id: 'ORD-001', customer: 'Andi Saputra', layanan: 'Servis AC', waktu: 'Hari ini, 09:00', status: 'Menunggu', nominal: 'Rp 150.000' },
  { id: 'ORD-002', customer: 'Siti Rahma', layanan: 'Ledeng & Pipa', waktu: 'Hari ini, 13:00', status: 'Dikerjakan', nominal: 'Rp 200.000' },
  { id: 'ORD-003', customer: 'Budi Santoso', layanan: 'Kebersihan', waktu: 'Kemarin, 10:00', status: 'Selesai', nominal: 'Rp 300.000' },
  { id: 'ORD-004', customer: 'Dewi Lestari', layanan: 'Servis AC', waktu: 'Kemarin, 14:00', status: 'Selesai', nominal: 'Rp 175.000' },
  { id: 'ORD-005', customer: 'Reza Firmansyah', layanan: 'Kebersihan', waktu: '2 hari lalu', status: 'Dibatalkan', nominal: 'Rp 250.000' },
];

const badgeColor: Record<string, string> = {
  Menunggu: 'bg-yellow-100 text-yellow-700',
  Dikerjakan: 'bg-blue-100 text-blue-700',
  Selesai: 'bg-green-100 text-green-700',
  Dibatalkan: 'bg-red-100 text-red-700',
};

export default function MitraOrdersPage() {
  const [filter, setFilter] = useState<'Semua' | 'Menunggu' | 'Dikerjakan' | 'Selesai' | 'Dibatalkan'>('Semua');
  const [orders, setOrders] = useState(initialOrders);

  const filtered = filter === 'Semua' ? orders : orders.filter(o => o.status === filter);

  function handleStatusChange(id: string, newStatus: 'Dikerjakan' | 'Selesai') {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Mitra</p>
        <h1 className="mt-2 text-3xl font-black">Order Saya</h1>
        <p className="text-slate-500">Daftar semua order yang masuk ke akun mitra kamu.</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        {(['Semua','Menunggu','Dikerjakan','Selesai','Dibatalkan'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold border cursor-pointer transition-all ${
              filter === f ? 'bg-green-500 text-white border-green-500' : 'bg-white text-slate-600 border-slate-200 hover:border-green-500'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-[1fr_1fr_1fr_120px_100px_130px] px-6 py-3 bg-slate-50 text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100">
          <span>Customer</span><span>Layanan</span><span>Waktu</span><span>Nominal</span><span>Status</span><span>Aksi</span>
        </div>
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">Tidak ada order dalam kategori ini.</div>
        ) : (
          filtered.map(o => (
            <div key={o.id} className="grid grid-cols-[1fr_1fr_1fr_120px_100px_130px] px-6 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors items-center">
              <div>
                <p className="font-semibold text-sm">{o.customer}</p>
                <p className="text-xs text-slate-400">{o.id}</p>
              </div>
              <p className="text-sm text-slate-600">{o.layanan}</p>
              <p className="text-sm text-slate-500">{o.waktu}</p>
              <p className="text-sm font-bold">{o.nominal}</p>
              <div>
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${badgeColor[o.status]}`}>{o.status}</span>
              </div>
              <div>
                {o.status === 'Menunggu' && (
                  <button
                    onClick={() => handleStatusChange(o.id, 'Dikerjakan')}
                    className="rounded-xl bg-green-500 text-white px-3 py-1.5 text-xs font-bold hover:bg-green-600 transition-colors cursor-pointer"
                  >
                    Terima Order
                  </button>
                )}
                {o.status === 'Dikerjakan' && (
                  <button
                    onClick={() => handleStatusChange(o.id, 'Selesai')}
                    className="rounded-xl bg-blue-500 text-white px-3 py-1.5 text-xs font-bold hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    Tandai Selesai
                  </button>
                )}
                {o.status === 'Selesai' && (
                  <span className="text-xs text-slate-400 font-semibold">Tugas Selesai</span>
                )}
                {o.status === 'Dibatalkan' && (
                  <span className="text-xs text-red-400 font-semibold">Dibatalkan</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
