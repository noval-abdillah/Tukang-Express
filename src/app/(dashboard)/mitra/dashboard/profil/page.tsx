'use client';

import { useState, useEffect } from 'react';
import { Camera, Save, CheckCircle, Loader2 } from 'lucide-react';

export default function MitraProfilPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [nama, setNama] = useState('Budi Santoso');
  const [phone, setPhone] = useState('+62 822-2222-2222');
  const [email, setEmail] = useState('budi.mitra@tukangexpress.id');
  const [kota, setKota] = useState('Jakarta Selatan');
  const [bio, setBio] = useState('Teknisi AC berpengalaman 8 tahun. Melayani pemasangan, servis, dan isi freon semua merek.');
  
  const [bank, setBank] = useState('BCA');
  const [rekening, setRekening] = useState('1234567890');
  const [atasNama, setAtasNama] = useState('Budi Santoso');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // Load profile dari localStorage saat render pertama
  useEffect(() => {
    const savedPhoto = localStorage.getItem('avatar-mitra');
    const savedNama = localStorage.getItem('nama-mitra');
    const savedPhone = localStorage.getItem('phone-mitra');
    const savedEmail = localStorage.getItem('email-mitra');
    const savedKota = localStorage.getItem('kota-mitra');
    const savedBio = localStorage.getItem('bio-mitra');
    const savedBank = localStorage.getItem('bank-mitra');
    const savedRekening = localStorage.getItem('rekening-mitra');
    const savedAtasNama = localStorage.getItem('atasnama-mitra');

    if (savedPhoto) setPhoto(savedPhoto);
    if (savedNama) setNama(savedNama);
    if (savedPhone) setPhone(savedPhone);
    if (savedEmail) setEmail(savedEmail);
    if (savedKota) setKota(savedKota);
    if (savedBio) setBio(savedBio);
    if (savedBank) setBank(savedBank);
    if (savedRekening) setRekening(savedRekening);
    if (savedAtasNama) setAtasNama(savedAtasNama);
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
      localStorage.setItem('avatar-mitra', base64);
      showToast('Foto profil berhasil diunggah', true);
    };
    reader.readAsDataURL(file);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('nama-mitra', nama);
      localStorage.setItem('phone-mitra', phone);
      localStorage.setItem('email-mitra', email);
      localStorage.setItem('kota-mitra', kota);
      localStorage.setItem('bio-mitra', bio);
      localStorage.setItem('bank-mitra', bank);
      localStorage.setItem('rekening-mitra', rekening);
      localStorage.setItem('atasnama-mitra', atasNama);

      setLoading(false);
      showToast('Perubahan profil berhasil disimpan!', true);
    }, 1200);
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 rounded-2xl px-5 py-3 text-sm font-bold shadow-lg transition-all ${toast.ok ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Mitra</p>
        <h1 className="mt-2 text-3xl font-black">Profil Mitra</h1>
        <p className="text-slate-500">Kelola identitas dan informasi layanan kamu.</p>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 xl:grid-cols-3">
        {/* Kolom Kiri: Foto */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center gap-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-100 flex items-center justify-center bg-slate-100 bg-gradient-to-br from-green-400 to-blue-500 text-white text-4xl font-black shadow-inner">
              {photo ? (
                <img src={photo} alt="Profil Mitra" className="w-full h-full object-cover" />
              ) : (
                nama.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
              )}
            </div>
            <label className="absolute bottom-1 right-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full cursor-pointer shadow-md transition-colors flex items-center justify-center border border-white">
              <Camera className="w-4 h-4" />
              <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
            </label>
          </div>

          <div>
            <p className="font-black text-xl text-slate-800">{nama}</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Mitra Terverifikasi KYC</p>
          </div>

          <div className="flex gap-1.5 flex-wrap justify-center">
            <span className="rounded-full bg-green-50 text-green-700 text-xs font-bold px-3 py-1 border border-green-100">Servis AC</span>
            <span className="rounded-full bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 border border-blue-100">Ledeng & Pipa</span>
          </div>

          <div className="w-full rounded-2xl bg-slate-50 p-4 grid grid-cols-3 gap-2 text-center text-slate-700">
            <div><p className="text-lg font-black">4.9</p><p className="text-[10px] text-slate-400 font-bold uppercase">Rating</p></div>
            <div><p className="text-lg font-black">128</p><p className="text-[10px] text-slate-400 font-bold uppercase">Order</p></div>
            <div><p className="text-lg font-black">98%</p><p className="text-[10px] text-slate-400 font-bold uppercase">Selesai</p></div>
          </div>
        </div>

        {/* Kolom Kanan: Form */}
        <div className="xl:col-span-2 space-y-4">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-lg text-slate-800 border-b border-slate-50 pb-2">Informasi Pribadi</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Nama Lengkap *</p>
                <input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-green-400"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">No. HP *</p>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-green-400"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Email *</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-green-400"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Kota *</p>
                <input
                  value={kota}
                  onChange={(e) => setKota(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-green-400"
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold mb-1">Bio Singkat</p>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm resize-none focus:outline-none focus:border-green-400"
                rows={3}
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-lg text-slate-800 border-b border-slate-50 pb-2">Rekening Bank (untuk Withdraw)</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Bank *</p>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-green-400 bg-white"
                >
                  <option value="BCA">BCA</option>
                  <option value="MANDIRI">Mandiri</option>
                  <option value="BNI">BNI</option>
                  <option value="BRI">BRI</option>
                </select>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">No. Rekening *</p>
                <input
                  value={rekening}
                  onChange={(e) => setRekening(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-green-400"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Atas Nama *</p>
                <input
                  value={atasNama}
                  onChange={(e) => setAtasNama(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-green-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-green-500 py-3.5 font-bold text-white shadow-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
