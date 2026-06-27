import { getSession } from '@/lib/session';
import { getAllWithdrawRequests } from '@/lib/withdraw-store';
import { ShieldCheck, Wallet, Users, ClipboardList } from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await getSession();
  const withdrawals = getAllWithdrawRequests();
  const pending = withdrawals.filter((w) => w.status === 'PENDING').length;
  const approved = withdrawals.filter((w) => w.status === 'APPROVED').length;
  const totalApprovedAmount = withdrawals
    .filter((w) => w.status === 'APPROVED')
    .reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-black text-white">Overview</h1>
        <p className="text-slate-400">Halo, {session?.nama}. Selamat datang di panel administrasi.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Withdraw Pending', value: String(pending), icon: Wallet, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
          { label: 'Withdraw Disetujui', value: String(approved), icon: ShieldCheck, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Total Dicairkan', value: `Rp ${totalApprovedAmount.toLocaleString('id-ID')}`, icon: ClipboardList, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Total Request', value: String(withdrawals.length), icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl bg-slate-800/60 border border-slate-700 p-5">
            <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </div>
            <p className="text-sm text-slate-400">{c.label}</p>
            <p className="mt-1 text-2xl font-black text-white">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-6">
        <h2 className="font-bold text-white mb-1">Withdraw Terbaru</h2>
        <p className="text-sm text-slate-400 mb-4">5 request terbaru — lihat semua di halaman Withdraw Requests.</p>
        {withdrawals.length === 0 ? (
          <p className="text-sm text-slate-500 py-6 text-center">Belum ada request withdraw.</p>
        ) : (
          <div className="space-y-2">
            {withdrawals.slice(0, 5).map((w) => (
              <div key={w.id} className="flex items-center justify-between rounded-xl bg-slate-700/40 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{w.mitraNama}</p>
                  <p className="text-xs text-slate-400">{w.id} · {w.bankName} {w.accountNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">Rp {w.amount.toLocaleString('id-ID')}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    w.status === 'PENDING' ? 'bg-yellow-400/20 text-yellow-400' :
                    w.status === 'APPROVED' ? 'bg-green-400/20 text-green-400' :
                    'bg-red-400/20 text-red-400'
                  }`}>{w.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-6 space-y-3">
        <h2 className="font-bold text-white">Akun Tester Aktif</h2>
        <div className="grid gap-2 text-sm">
          {[
            { label: 'Customer', hp: '08111111111', role: 'CUSTOMER' },
            { label: 'Mitra', hp: '08222222222', role: 'MITRA' },
            { label: 'Admin', hp: '08000000000', role: 'ADMIN' },
          ].map((a) => (
            <div key={a.hp} className="flex justify-between rounded-xl bg-slate-700/40 px-4 py-2.5">
              <span className="text-slate-300 font-semibold">{a.label} — {a.hp}</span>
              <span className="text-slate-400">OTP: 123456</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">Akun tester hanya tersedia selama fase pre-launch. Hapus setelah integrasi Supabase aktif.</p>
      </div>
    </div>
  );
}
