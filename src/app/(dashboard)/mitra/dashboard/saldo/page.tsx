'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const BANK_OPTIONS = [
  { code: 'BCA', name: 'BCA — Bank Central Asia' },
  { code: 'BNI', name: 'BNI — Bank Negara Indonesia' },
  { code: 'BRI', name: 'BRI — Bank Rakyat Indonesia' },
  { code: 'MANDIRI', name: 'Mandiri' },
  { code: 'BSI', name: 'BSI — Bank Syariah Indonesia' },
  { code: 'CIMB', name: 'CIMB Niaga' },
  { code: 'PERMATA', name: 'Bank Permata' },
];

const riwayat = [
  { tgl: 'Hari ini', ket: 'Order #ORD-002 selesai', tipe: 'masuk', nominal: '+Rp 200.000' },
  { tgl: 'Kemarin', ket: 'Withdraw ke BCA ****1234', tipe: 'keluar', nominal: '-Rp 500.000' },
  { tgl: 'Kemarin', ket: 'Order #ORD-003 selesai', tipe: 'masuk', nominal: '+Rp 300.000' },
  { tgl: '2 hari lalu', ket: 'Order #ORD-004 selesai', tipe: 'masuk', nominal: '+Rp 175.000' },
  { tgl: '3 hari lalu', ket: 'Withdraw ke BCA ****1234', tipe: 'keluar', nominal: '-Rp 300.000' },
];

interface Toast { msg: string; ok: boolean }

export default function MitraSaldoPage() {
  const [bankCode, setBankCode] = useState('BCA');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amountRaw, setAmountRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  }

  function validateForm(): boolean {
    const errors: Record<string, string> = {};
    const amount = parseInt(amountRaw.replace(/\D/g, ''), 10);
    if (isNaN(amount) || amount < 100_000) errors.amount = 'Minimal withdraw Rp 100.000';
    if (amount > 50_000_000) errors.amount = 'Maksimal withdraw Rp 50.000.000';
    if (!accountNumber.match(/^\d{6,20}$/)) errors.accountNumber = 'Nomor rekening tidak valid (6-20 digit angka)';
    if (accountName.trim().length < 3) errors.accountName = 'Nama pemilik rekening minimal 3 karakter';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleWithdraw(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    const amount = parseInt(amountRaw.replace(/\D/g, ''), 10);
    setLoading(true);
    try {
      const res = await fetch('/api/mitra/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, bank_code: bankCode, account_number: accountNumber, account_name: accountName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error ?? 'Gagal mengajukan withdraw', false);
        return;
      }
      showToast(`Withdraw berhasil diajukan (${data.requestId}). Diproses dalam 1×24 jam kerja.`, true);
      setAmountRaw('');
      setAccountNumber('');
      setAccountName('');
      setFieldErrors({});
    } catch {
      showToast('Terjadi kesalahan jaringan', false);
    } finally {
      setLoading(false);
    }
  }

  const amount = parseInt(amountRaw.replace(/\D/g, ''), 10) || 0;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 max-w-sm rounded-2xl px-5 py-3.5 text-sm font-bold shadow-xl transition-all ${toast.ok ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Mitra</p>
        <h1 className="mt-2 text-3xl font-black">Saldo & Withdraw</h1>
        <p className="text-slate-500">Kelola saldo dan cairkan penghasilan kamu.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Saldo Tersedia', value: 'Rp 1.250.000', color: 'from-green-400 to-emerald-500' },
          { label: 'Saldo Ditahan', value: 'Rp 750.000', color: 'from-yellow-400 to-orange-400' },
          { label: 'Total Dicairkan', value: 'Rp 4.800.000', color: 'from-blue-400 to-indigo-500' },
        ].map((c) => (
          <div key={c.label} className={`rounded-3xl bg-gradient-to-br ${c.color} p-6 text-white shadow-sm`}>
            <p className="text-sm font-semibold opacity-80">{c.label}</p>
            <p className="mt-3 text-3xl font-black">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="font-bold text-lg">Riwayat Transaksi</h2>
          <div className="mt-4 space-y-3">
            {riwayat.map((r, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{r.ket}</p>
                  <p className="text-xs text-slate-400">{r.tgl}</p>
                </div>
                <p className={`font-bold text-sm ${r.tipe === 'masuk' ? 'text-green-600' : 'text-red-500'}`}>{r.nominal}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleWithdraw} className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-lg">Ajukan Withdraw</h2>

          <div>
            <p className="text-xs text-slate-400 font-semibold mb-1">Bank Tujuan *</p>
            <select
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-green-400"
            >
              {BANK_OPTIONS.map((b) => (
                <option key={b.code} value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-semibold mb-1">Nomor Rekening *</p>
            <input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="Contoh: 1234567890"
              className={`w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none ${fieldErrors.accountNumber ? 'border-red-400' : 'border-slate-200 focus:border-green-400'}`}
            />
            {fieldErrors.accountNumber && <p className="text-xs text-red-500 mt-1">{fieldErrors.accountNumber}</p>}
          </div>

          <div>
            <p className="text-xs text-slate-400 font-semibold mb-1">Atas Nama *</p>
            <input
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Nama sesuai buku tabungan"
              className={`w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none ${fieldErrors.accountName ? 'border-red-400' : 'border-slate-200 focus:border-green-400'}`}
            />
            {fieldErrors.accountName && <p className="text-xs text-red-500 mt-1">{fieldErrors.accountName}</p>}
          </div>

          <div>
            <p className="text-xs text-slate-400 font-semibold mb-1">Nominal *</p>
            <input
              value={amountRaw ? `Rp ${amount.toLocaleString('id-ID')}` : ''}
              onChange={(e) => setAmountRaw(e.target.value.replace(/\D/g, ''))}
              placeholder="Rp 0"
              className={`w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none ${fieldErrors.amount ? 'border-red-400' : 'border-slate-200 focus:border-green-400'}`}
            />
            {fieldErrors.amount && <p className="text-xs text-red-500 mt-1">{fieldErrors.amount}</p>}
          </div>

          <p className="text-xs text-slate-400">Min. Rp 100.000 · Proses 1×24 jam kerja</p>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-green-500 py-3 font-bold text-white hover:bg-green-400 transition-colors disabled:opacity-55 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Ajukan Withdraw
          </button>
        </form>
      </div>
    </div>
  );
}
