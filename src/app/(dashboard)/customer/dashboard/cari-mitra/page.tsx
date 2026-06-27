'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Search } from 'lucide-react';

const initialMitras = [
  { nama: 'Budi Teknisi', layanan: 'Servis AC', value: 'ac', rating: 4.9, ulasan: 64, jarak: '1.2 km', mulai: 'Rp 150.000', status: 'Online', avatar: 'BT' },
  { nama: 'Andi Plumbing', layanan: 'Ledeng & Pipa', value: 'ledeng', rating: 4.8, ulasan: 41, jarak: '2.1 km', mulai: 'Rp 125.000', status: 'Online', avatar: 'AP' },
  { nama: 'Sari Cleaning', layanan: 'Kebersihan', value: 'kebersihan', rating: 5.0, ulasan: 88, jarak: '3.4 km', mulai: 'Rp 200.000', status: 'Sibuk', avatar: 'SC' },
  { nama: 'Dono Listrik', layanan: 'Instalasi Listrik', value: 'listrik', rating: 4.7, ulasan: 29, jarak: '4.0 km', mulai: 'Rp 175.000', status: 'Online', avatar: 'DL' },
  { nama: 'Rini Kebersihan', layanan: 'Kebersihan', value: 'kebersihan', rating: 4.9, ulasan: 52, jarak: '5.2 km', mulai: 'Rp 200.000', status: 'Online', avatar: 'RK' },
];

export default function CariMitraPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [layananFilter, setLayananFilter] = useState('Semua');
  const [areaFilter, setAreaFilter] = useState('Semua');
  const [mitras, setMitras] = useState(initialMitras);
  
  // local states untuk data dari localStorage (biar aman dari SSR error)
  const [savedMitraName, setSavedMitraName] = useState<string | null>(null);
  const [savedMitraPhoto, setSavedMitraPhoto] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mitra-ratings');
    const savedName = localStorage.getItem('nama-mitra');
    const savedPhoto = localStorage.getItem('avatar-mitra');

    if (savedName) setSavedMitraName(savedName);
    if (savedPhoto) setSavedMitraPhoto(savedPhoto);

    if (saved) {
      const parsed = JSON.parse(saved);
      setMitras(prev => prev.map(m => {
        const stored = parsed[m.nama];
        if (stored) {
          return {
            ...m,
            rating: stored.average,
            ulasan: stored.count
          };
        }
        return m;
      }));
    }

    if (savedName) {
      setMitras(prev => prev.map(m => {
        if (m.nama === 'Budi Teknisi') {
          return {
            ...m,
            nama: savedName,
            avatar: savedName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
          };
        }
        return m;
      }));
    }
  }, []);

  const filtered = mitras.filter((m) => {
    const matchSearch = m.nama.toLowerCase().includes(search.toLowerCase()) || m.layanan.toLowerCase().includes(search.toLowerCase());
    const matchLayanan = layananFilter === 'Semua' || m.layanan === layananFilter;
    return matchSearch && matchLayanan;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Customer</p>
        <h1 className="mt-2 text-3xl font-black">Cari Mitra</h1>
        <p className="text-slate-500">Temukan mitra terverifikasi di sekitar kamu.</p>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-400"
              placeholder="Cari nama mitra atau keahlian..."
            />
          </div>
          <select
            value={layananFilter}
            onChange={(e) => setLayananFilter(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-400 bg-white"
          >
            <option value="Semua">Semua Layanan</option>
            <option value="Servis AC">Servis AC</option>
            <option value="Ledeng & Pipa">Ledeng & Pipa</option>
            <option value="Kebersihan">Kebersihan</option>
            <option value="Instalasi Listrik">Instalasi Listrik</option>
          </select>
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-400 bg-white"
          >
            <option value="Semua">Semua Area</option>
            <option value="Jakarta Selatan">Jakarta Selatan</option>
            <option value="Jakarta Barat">Jakarta Barat</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 text-sm bg-white rounded-3xl border border-slate-200">
            Mitra tidak ditemukan.
          </div>
        ) : (
          filtered.map(m => {
            const isBudiModified = (m.nama === savedMitraName || m.nama === 'Budi Teknisi') && savedMitraName;
            const hasSavedAvatar = (isBudiModified || m.nama === savedMitraName) && savedMitraPhoto;
            
            return (
              <div key={m.nama} className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  {hasSavedAvatar ? (
                    <img src={savedMitraPhoto!} alt={m.nama} className="w-12 h-12 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center text-white font-black shrink-0">{m.avatar}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold truncate">{m.nama}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${m.status === 'Online' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{m.status}</span>
                    </div>
                    <p className="text-sm text-slate-500 truncate">{m.layanan}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 text-center rounded-2xl bg-slate-50 p-3 text-sm">
                  <div><p className="font-black">{m.rating} ⭐</p><p className="text-xs text-slate-400">Rating</p></div>
                  <div><p className="font-black">{m.jarak}</p><p className="text-xs text-slate-400">Jarak</p></div>
                  <div><p className="font-black">{m.ulasan}</p><p className="text-xs text-slate-400">Ulasan</p></div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-slate-500">Mulai dari <span className="font-black text-slate-800 text-sm block">{m.mulai}</span></p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/customer/dashboard/chat?aktif=${encodeURIComponent(m.nama)}`)}
                      className="rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50 transition-colors text-slate-500 cursor-pointer"
                      title="Kirim Pesan Chat"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => router.push(`/customer/dashboard/order?mitra=${encodeURIComponent(m.nama)}&layanan=${encodeURIComponent(m.value)}`)}
                      className="rounded-xl bg-blue-500 hover:bg-blue-400 px-4 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Pesan Jasa
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
