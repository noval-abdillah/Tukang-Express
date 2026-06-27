const bars = [120, 85, 200, 160, 95, 240, 180];
const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const max = Math.max(...bars);

const layanan = [
  { nama: 'Servis AC', order: 38, income: 'Rp 5.700.000', pct: 45 },
  { nama: 'Ledeng & Pipa', order: 22, income: 'Rp 3.300.000', pct: 26 },
  { nama: 'Kebersihan', order: 30, income: 'Rp 3.600.000', pct: 29 },
];

export default function MitraIncomePage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Mitra</p>
        <h1 className="mt-2 text-3xl font-black">Income & Laporan</h1>
        <p className="text-slate-500">Pantau performa dan penghasilan kamu minggu ini.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Income Minggu Ini', 'Rp 1.080.000'],
          ['Income Bulan Ini', 'Rp 12.600.000'],
          ['Total Order', '90 order'],
          ['Rata-rata / Order', 'Rp 140.000'],
        ].map(([l, v]) => (
          <div key={l} className="rounded-3xl bg-white p-5 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">{l}</p>
            <p className="mt-3 text-2xl font-black">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
          <h2 className="font-bold text-lg">Income Harian (minggu ini)</h2>
          <div className="mt-6 h-48 flex items-end gap-2">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-blue-500 to-green-400"
                  style={{ height: `${(h / max) * 100}%` }}
                />
                <p className="text-xs text-slate-400">{days[i]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
          <h2 className="font-bold text-lg">Breakdown per Layanan</h2>
          <div className="mt-4 space-y-4">
            {layanan.map(l => (
              <div key={l.nama}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">{l.nama}</span>
                  <span className="text-slate-500">{l.order} order · {l.income}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
