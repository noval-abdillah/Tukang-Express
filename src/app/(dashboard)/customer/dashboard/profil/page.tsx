'use client';

import { useState, useEffect } from 'react';
import { Camera, Save, Loader2 } from 'lucide-react';

export default function CustomerProfilPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [nama, setNama] = useState('Tester Customer');
  const [phone, setPhone] = useState('+62 811-1111-1111');
  const [email, setEmail] = useState('customer.tester@tukangexpress.id');
  const [alamat, setAlamat] = useState('Jl. Sudirman No. 10, Jakarta Selatan');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // Load profil dari localStorage
  useEffect(() => {
    const savedPhoto = localStorage.getItem('avatar-customer');
    const savedNama = localStorage.getItem('nama-customer');
    const savedPhone = localStorage.getItem('phone-customer');
    const savedEmail = localStorage.getItem('email-customer');
    const savedAlamat = localStorage.getItem('alamat-customer');

    if (savedPhoto) setPhoto(savedPhoto);
    if (savedNama) setNama(savedNama);
    if (savedPhone) setPhone(savedPhone);
    if (savedEmail) setEmail(savedEmail);
    if (savedAlamat) setAlamat(savedAlamat);
  }, []);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Ukuran foto maksimal 5MB', false);
      return;
    }

    if (!file.type.startsWith('image/')) {
      showToast('File harus berupa gambar', false);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPhoto(base64);
      localStorage.setItem('avatar-customer', base64);
      showToast('Foto profil berhasil diunggah', true);
    };
    reader.readAsDataURL(file);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('nama-customer', nama);
      localStorage.setItem('phone-customer', phone);
      localStorage.setItem('email-customer', email);
      localStorage.setItem('alamat-customer', alamat);

      setLoading(false);
      showToast('Profil berhasil diperbarui!', true);
    }, 1200);
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 rounded-2xl px-5 py-3 text-sm font-bold shadow-lg transition-all ${toast.ok ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Customer</p>
        <h1 className="mt-2 text-3xl font-black">Profil Saya</h1>
        <p className="text-slate-500">Kelola identitas dan informasi akun Anda.</p>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 xl:grid-cols-3">
        {/* Avatar Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center gap-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-100 flex items-center justify-center bg-slate-100 bg-gradient-to-br from-blue-400 to-green-500 text-white text-4xl font-black shadow-inner">
              {photo ? (
                <img src={photo} alt="Profil Customer" className="w-full h-full object-cover" />
              ) : (
                nama.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
              )}
            </div>
            <label className="absolute bottom-1 right-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md transition-colors flex items-center justify-center border border-white">
              <Camera className="w-4 h-4" />
              <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
            </label>
          </div>

          <div>
            <p className="font-black text-xl text-slate-800">{nama}</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Akun Customer</p>
          </div>

          <div className="w-full rounded-2xl bg-slate-50 p-4 grid grid-cols-2 gap-2 text-center text-slate-700">
            <div><p className="text-lg font-black">5</p><p className="text-[10px] text-slate-400 font-bold uppercase">Total Order</p></div>
            <div><p className="text-lg font-black">Rp 0</p><p className="text-[10px] text-slate-400 font-bold uppercase">Refund</p></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="xl:col-span-2 space-y-4">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-lg text-slate-800 border-b border-slate-50 pb-2">Informasi Akun</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Nama Lengkap *</p>
                <input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">No. HP *</p>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-slate-400 font-semibold mb-1">Email *</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-slate-400 font-semibold mb-1">Alamat Utama Pengiriman *</p>
                <input
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-500 py-3.5 font-bold text-white shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
