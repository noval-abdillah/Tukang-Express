'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import type { WithdrawRequest } from '@/lib/withdraw-store';

const statusBadge: Record<string, string> = {
  PENDING: 'bg-yellow-400/20 text-yellow-400',
  APPROVED: 'bg-green-400/20 text-green-400',
  REJECTED: 'bg-red-400/20 text-red-400',
};

export default function AdminWithdrawalsPage() {
  const [data, setData] = useState<WithdrawRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/withdrawals');
      const json = await res.json();
      if (json.success) setData(json.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  async function handleAction(id: string, action: 'approve' | 'reject', note?: string) {
    setProcessing(id);
    try {
      const res = await fetch(`/api/admin/withdrawals/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, note }),
      });
      const json = await res.json();
      if (json.success) {
        setToast({ msg: `Request ${action === 'approve' ? 'disetujui' : 'ditolak'} berhasil.`, ok: true });
        fetchData();
      } else {
        setToast({ msg: json.error ?? 'Gagal memproses', ok: false });
      }
    } catch {
      setToast({ msg: 'Terjadi kesalahan jaringan', ok: false });
    } finally {
      setProcessing(null);
    }
  }

  const filtered = filter === 'ALL' ? data : data.filter((d) => d.status === filter);
  const totalPending = data.filter((d) => d.status === 'PENDING').reduce((s, d) => s + d.amount, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 rounded-2xl px-5 py-3 text-sm font-bold shadow-lg transition-all ${toast.ok ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">Admin Panel</p>
          <h1 className="mt-2 text-3xl font-black text-white">Withdraw Requests</h1>
          <p className="text-slate-400">Total pending: <span className="font-black text-yellow-400">Rp {totalPending.toLocaleString('id-ID')}</span></p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 rounded-xl bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-600 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold border transition-colors ${
              filter === f ? 'bg-red-500 text-white border-red-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
            }`}
          >
            {f} {f !== 'ALL' && `(${data.filter((d) => d.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-slate-800/60 border border-slate-700 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500 text-sm">Memuat data...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">Tidak ada request dengan filter ini.</div>
        ) : (
          <div className="divide-y divide-slate-700/50">
            {filtered.map((w) => (
              <div key={w.id} className="p-5 hover:bg-slate-700/20 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-white">{w.mitraNama}</p>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${statusBadge[w.status]}`}>{w.status}</span>
                    </div>
                    <p className="text-xs text-slate-400">{w.id} · {new Date(w.createdAt).toLocaleString('id-ID')}</p>
                    <p className="text-sm text-slate-300">
                      {w.bankName} · <span className="font-mono">{w.accountNumber}</span> · a/n {w.accountName}
                    </p>
                    {w.note && (
                      <p className="text-xs text-slate-400 bg-slate-700/50 rounded-lg px-3 py-1.5">Catatan: {w.note}</p>
                    )}
                    {w.processedAt && (
                      <p className="text-xs text-slate-500">Diproses: {new Date(w.processedAt).toLocaleString('id-ID')}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-xl font-black text-white">Rp {w.amount.toLocaleString('id-ID')}</p>
                    {w.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <button
                          disabled={processing === w.id}
                          onClick={() => handleAction(w.id, 'approve')}
                          className="flex items-center gap-1.5 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-2 text-xs font-bold transition-colors disabled:opacity-50"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Approve
                        </button>
                        <button
                          disabled={processing === w.id}
                          onClick={() => handleAction(w.id, 'reject', 'Ditolak oleh admin')}
                          className="flex items-center gap-1.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-2 text-xs font-bold transition-colors disabled:opacity-50"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Reject
                        </button>
                      </div>
                    )}
                    {w.status !== 'PENDING' && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        Sudah diproses
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
