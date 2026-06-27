import { getSession } from '@/lib/session';

const stats = [
  ['Saldo Tersedia', 'Rp 1.250.000'],
  ['Saldo Ditahan', 'Rp 750.000'],
  ['Income Hari Ini', 'Rp 420.000'],
  ['Rating', '4.9 (64 ulasan)'],
];

export default async function MitraDashboardPage() {
  const session = await getSession();
  const nama = session?.nama ?? 'Mitra';

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Panel Mitra</p>
        <h1 className="mt-2 text-3xl font-black">Halo, {nama} 👋</h1>
        <p className="text-slate-500">Pantau performa dan kelola order kamu hari ini.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">{l}</p>
            <p className="mt-3 text-2xl font-black">{v}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 border border-slate-200 xl:col-span-2">
          <h2 className="font-bold text-lg">Income Mingguan</h2>
          <div className="mt-6 h-60 flex items-end gap-3 rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 p-4">
            {[45, 70, 55, 90, 65, 95, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-500 to-green-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 border border-slate-200">
          <h2 className="font-bold text-lg">Ketersediaan</h2>
          <button className="mt-4 w-full rounded-2xl bg-green-500 py-5 text-xl font-black text-white">
            ONLINE
          </button>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p>Order aktif: <span className="font-bold">2</span></p>
            <p>Order selesai: <span className="font-bold">128</span></p>
            <p>Performa minggu ini: <span className="font-bold text-green-600">↑ 18%</span></p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {['Menunggu Konfirmasi', 'Sedang Dikerjakan', 'Selesai'].map((s) => (
          <div key={s} className="rounded-3xl bg-white p-5 border border-slate-200">
            <p className="font-bold">{s}</p>
            <p className="mt-2 text-sm text-slate-500">Belum ada data — hubungkan database.</p>
          </div>
        ))}
      </section>
    </div>
  );
}
