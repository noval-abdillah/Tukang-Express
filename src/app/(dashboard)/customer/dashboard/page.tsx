import { getSession } from '@/lib/session';

export default async function CustomerDashboardPage() {
  const session = await getSession();
  const nama = session?.nama ?? 'Customer';

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Panel Customer</p>
        <h1 className="mt-2 text-3xl font-black">Halo, {nama} 👋</h1>
        <p className="text-slate-500">Cari mitra terdekat, buat order, dan pantau prosesnya.</p>
      </div>

      <section className="rounded-3xl bg-white p-5 border border-slate-200 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="Cari Plumbing, AC, Cleaning..."
          />
          <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm">
            <option>Area terdekat</option>
            <option>Jakarta Selatan</option>
            <option>Jakarta Barat</option>
          </select>
          <a
            href="/customer/dashboard/cari-mitra"
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 px-4 py-3 font-bold text-white text-center text-sm"
          >
            Cari Mitra
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[['Mitra Rekomendasi', '248'], ['Order Aktif', '0'], ['Payment Pending', '0']].map(([l, v]) => (
          <div key={l} className="rounded-3xl bg-white p-5 border border-slate-200">
            <p className="text-sm text-slate-500">{l}</p>
            <p className="mt-3 text-2xl font-black">{v}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 border border-slate-200">
          <h2 className="text-lg font-bold">Mitra Rekomendasi</h2>
          <div className="mt-4 space-y-3">
            {[
              'Budi AC • 4.9 ⭐ • 1.2 km • mulai Rp 85rb',
              'Andi Plumbing • 4.8 ⭐ • 2.1 km • mulai Rp 75rb',
              'Sari Cleaning • 5.0 ⭐ • 3.4 km • mulai Rp 120rb',
            ].map((n) => (
              <div key={n} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold">{n}</div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 border border-slate-200">
          <h2 className="text-lg font-bold">Cara Pembayaran Escrow</h2>
          <p className="mt-3 text-sm text-slate-600">
            Kamu bayar → dana masuk ke saldo ditahan → cair ke mitra setelah order selesai dan kamu konfirmasi. Fee platform transparan sebelum bayar.
          </p>
          <div className="mt-4 rounded-2xl bg-blue-50 p-4 font-semibold text-blue-700 text-sm">
            Pending → Held → Settlement (setelah konfirmasi)
          </div>
        </div>
      </section>
    </div>
  );
}
