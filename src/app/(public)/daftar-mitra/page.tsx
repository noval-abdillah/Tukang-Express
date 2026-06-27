'use client';

/**
 * @file src/app/daftar-mitra/page.tsx
 * Halaman Daftar Mitra dengan form KYC digital terintegrasi backend.
 */

import { useState } from 'react';
import Link from 'next/link';
import { Upload, BadgeCheck, BarChart3, Crown, Wallet, ToggleRight, Loader2 } from 'lucide-react';
import { AuthSchema } from '@/lib/validators';

const MITRA_BENEFITS = [
  { icon: BarChart3, title: 'Dashboard Kinerja', desc: 'Pantau pendapatan harian/mingguan dan performa Anda.' },
  { icon: ToggleRight, title: 'Kontrol Jadwal', desc: 'Toggle Online/Offline. Terima order sesuai kemauan.' },
  { icon: Wallet, title: 'Cairkan Kapanpun', desc: 'Saldo ke rekening bank dalam 1x24 jam.' },
  { icon: Crown, title: 'Paket Premium', desc: 'Tampil di atas radar pencarian customer.' },
];

export default function DaftarMitraPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    nama: '',
    hp: '',
    kota: '',
    keahlian: '',
    pengalaman: '',
    rekening: '',
    setuju: false,
  });

  const [files, setFiles] = useState<{
    ktp: File | null;
    foto_profesi: File | null;
    sertifikat: File | null;
  }>({
    ktp: null,
    foto_profesi: null,
    sertifikat: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: 'ktp' | 'foto_profesi' | 'sertifikat') => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({
        ...prev,
        [name]: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const validation = AuthSchema.registerMitra.safeParse(form);
    if (!validation.success) {
      const errors = validation.error.flatten();
      setError(errors.formErrors[0] || Object.values(errors.fieldErrors)[0]?.[0]);
      setLoading(false);
      return;
    }

    if (!files.ktp || !files.foto_profesi) {
      setError('Dokumen KYC (KTP & Foto Profesi) wajib diunggah');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, String(val));
      });
      formData.append('ktp', files.ktp);
      formData.append('foto_profesi', files.foto_profesi);
      if (files.sertifikat) {
        formData.append('sertifikat', files.sertifikat);
      }

      const res = await fetch('/api/auth/register-mitra', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Pendaftaran gagal');
      } else {
        setSuccess('Pendaftaran berhasil! Akun Anda sedang direview oleh Admin.');
        // Reset form
        setForm({
          nama: '',
          hp: '',
          kota: '',
          keahlian: '',
          pengalaman: '',
          rekening: '',
          setuju: false,
        });
      }
    } catch {
      setError('Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20 pt-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm font-semibold mb-4 border border-white/30">
            Gratis Bergabung
          </span>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Daftar Jadi Mitra Tukang Express</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Tingkatkan penghasilan dengan jangkauan pelanggan lebih luas dan sistem pembayaran yang terjamin.
          </p>
          <div className="flex justify-center gap-10 mt-8">
            {[
              { val: 'Rp 8jt+', label: 'Rata-rata/bulan' },
              { val: '5.000+', label: 'Mitra Aktif' },
              { val: 'Gratis', label: 'Biaya Daftar' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black">{s.val}</p>
                <p className="text-green-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Benefits + Syarat */}
            <div>
              <h2 className="text-2xl font-black text-green-900 mb-6">Keuntungan Menjadi Mitra</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {MITRA_BENEFITS.map(b => {
                  const I = b.icon;
                  return (
                    <div key={b.title} className="p-4 bg-green-50 rounded-2xl border border-green-100">
                      <I className="w-6 h-6 text-green-600 mb-2" />
                      <p className="font-bold text-green-900 text-sm mb-1">{b.title}</p>
                      <p className="text-xs text-gray-500">{b.desc}</p>
                    </div>
                  );
                })}
              </div>

              <h3 className="font-black text-green-900 mb-4">Persyaratan Dokumen (KYC)</h3>
              <ul className="space-y-3">
                {[
                  { doc: 'KTP / E-KTP', req: 'Foto jelas, tidak blur', required: true },
                  { doc: 'Foto Profesi', req: 'Foto saat bekerja (jelas)', required: true },
                  { doc: 'Foto Selfie', req: 'Untuk verifikasi identitas', required: true },
                  { doc: 'Sertifikat Keahlian', req: 'Jika ada (menambah kepercayaan)', required: false },
                  { doc: 'Nomor Rekening Bank', req: 'Untuk pencairan dana', required: true },
                ].map(item => (
                  <li key={item.doc} className="flex items-start gap-3 p-3 rounded-xl border border-green-100 bg-white">
                    <Upload className={`w-5 h-5 mt-0.5 flex-shrink-0 ${item.required ? 'text-green-500' : 'text-gray-400'}`} />
                    <div>
                      <p className="text-sm font-semibold text-green-900">
                        {item.doc}
                        {item.required && <span className="text-red-500 ml-1">*</span>}
                        {!item.required && <span className="text-gray-400 ml-2 text-xs">(opsional)</span>}
                      </p>
                      <p className="text-xs text-gray-500">{item.req}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Proses verifikasi KYC:</strong> Tim admin akan meninjau dokumen dalam 1–3 hari kerja. Anda akan mendapat notifikasi email/SMS saat akun disetujui.
                </p>
              </div>
            </div>

            {/* Form Pendaftaran */}
            <div className="bg-green-50 rounded-3xl p-8 border border-green-100">
              <h2 className="text-xl font-black text-green-900 mb-6">Form Pendaftaran Mitra</h2>

              {error && (
                <div className="mb-4 p-3.5 bg-red-50 text-red-600 rounded-xl text-xs font-semibold border border-red-200">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3.5 bg-green-50 text-green-700 rounded-xl text-xs font-semibold border border-green-200">
                  {success}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nama-mitra" className="block text-sm font-semibold text-green-900 mb-1.5">Nama Lengkap *</label>
                  <input
                    id="nama-mitra" name="nama" type="text" required
                    placeholder="Nama sesuai KTP"
                    value={form.nama}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 bg-white focus:border-green-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="hp-mitra" className="block text-sm font-semibold text-green-900 mb-1.5">Nomor HP *</label>
                  <input
                    id="hp-mitra" name="hp" type="tel" required
                    placeholder="08123456789"
                    value={form.hp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 bg-white focus:border-green-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="kota-mitra" className="block text-sm font-semibold text-green-900 mb-1.5">Kota / Kabupaten *</label>
                  <input
                    id="kota-mitra" name="kota" type="text" required
                    placeholder="Jakarta Selatan"
                    value={form.kota}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 bg-white focus:border-green-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="keahlian" className="block text-sm font-semibold text-green-900 mb-1.5">Keahlian Utama *</label>
                  <select
                    id="keahlian" name="keahlian" required
                    value={form.keahlian}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 bg-white focus:border-green-500 focus:outline-none text-sm"
                  >
                    <option value="">-- Pilih Keahlian --</option>
                    <option value="ac">Teknisi AC</option>
                    <option value="ledeng">Tukang Ledeng / Plumber</option>
                    <option value="kebersihan">Cleaning Service</option>
                    <option value="listrik">Teknisi Listrik</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="pengalaman" className="block text-sm font-semibold text-green-900 mb-1.5">Pengalaman Kerja *</label>
                  <select
                    id="pengalaman" name="pengalaman" required
                    value={form.pengalaman}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 bg-white focus:border-green-500 focus:outline-none text-sm"
                  >
                    <option value="">-- Pilih Pengalaman --</option>
                    <option value="1">Kurang dari 1 tahun</option>
                    <option value="2">1–3 tahun</option>
                    <option value="3">3–5 tahun</option>
                    <option value="4">Lebih dari 5 tahun</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="rekening" className="block text-sm font-semibold text-green-900 mb-1.5">No. Rekening Bank *</label>
                  <input
                    id="rekening" name="rekening" type="text" required
                    placeholder="BCA / Mandiri / BNI / BRI — No. Rekening"
                    value={form.rekening}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 bg-white focus:border-green-500 focus:outline-none text-sm"
                  />
                </div>

                {/* ── Upload Dokumen KYC ─────────────────────────────── */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-px bg-green-200 flex-1" />
                    <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Dokumen KYC (Verifikasi Identitas)</span>
                    <div className="w-6 h-px bg-green-200 flex-1" />
                  </div>
                  <div className="space-y-4">
                    {/* KTP */}
                    <div>
                      <label htmlFor="ktp-upload" className="block text-sm font-semibold text-green-900 mb-1.5">
                        Foto KTP / E-KTP <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="ktp-upload"
                          name="ktp"
                          type="file"
                          required
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={(e) => handleFileChange(e, 'ktp')}
                          className="w-full text-sm text-gray-600 bg-white border-2 border-dashed border-green-300 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 file:text-xs file:font-semibold hover:border-green-400 transition-colors cursor-pointer"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Format: JPG/PNG/WEBP · Maks. 5 MB · Pastikan teks terbaca jelas</p>
                    </div>

                    {/* Foto Profesi */}
                    <div>
                      <label htmlFor="foto-profesi-upload" className="block text-sm font-semibold text-green-900 mb-1.5">
                        Foto Saat Bekerja <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="foto-profesi-upload"
                        name="foto_profesi"
                        type="file"
                        required
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={(e) => handleFileChange(e, 'foto_profesi')}
                        className="w-full text-sm text-gray-600 bg-white border-2 border-dashed border-green-300 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 file:text-xs file:font-semibold hover:border-green-400 transition-colors cursor-pointer"
                      />
                      <p className="text-xs text-gray-400 mt-1">Foto Anda saat sedang mengerjakan pekerjaan di bidang keahlian</p>
                    </div>

                    {/* Sertifikat (opsional) */}
                    <div>
                      <label htmlFor="sertifikat-upload" className="block text-sm font-semibold text-green-900 mb-1.5">
                        Sertifikat Keahlian <span className="text-gray-400 font-normal text-xs ml-1">(opsional, meningkatkan kepercayaan)</span>
                      </label>
                      <input
                        id="sertifikat-upload"
                        name="sertifikat"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                        onChange={(e) => handleFileChange(e, 'sertifikat')}
                        className="w-full text-sm text-gray-600 bg-white border-2 border-dashed border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-600 file:text-xs file:font-semibold hover:border-green-300 transition-colors cursor-pointer"
                      />
                      <p className="text-xs text-gray-400 mt-1">Sertifikat dari lembaga resmi jika ada · JPG/PNG/PDF · Maks. 5 MB</p>
                    </div>

                    {/* Enkripsi info */}
                    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <Upload className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-700 leading-relaxed">
                        <strong>Keamanan dokumen:</strong> Semua file KYC dienkripsi AES-256 saat disimpan dan hanya dapat diakses oleh Admin terverifikasi. Data tidak dibagikan ke customer atau pihak ketiga.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    id="setuju" 
                    name="setuju" 
                    type="checkbox" 
                    required 
                    checked={form.setuju}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 accent-green-500" 
                  />
                  <label htmlFor="setuju" className="text-xs text-gray-600">
                    Saya menyetujui <Link href="/syarat" className="text-green-600 underline">Syarat & Ketentuan</Link> dan{' '}
                    <Link href="/privasi" className="text-green-600 underline">Kebijakan Privasi</Link> Tukang Express.
                    Data KTP saya akan dienkripsi dan hanya diakses oleh tim Admin.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg shadow-green-400/25 hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Daftar Sekarang — Gratis →
                </button>

                <div className="flex items-center justify-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-green-500" />
                  <p className="text-xs text-gray-500">Data Anda aman & terenkripsi. Tidak dibagikan ke pihak ketiga.</p>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>

      {/* Proses Verifikasi */}
      <section className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-green-900 mb-10">Proses Setelah Daftar</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Isi Form', desc: 'Lengkapi formulir dan upload dokumen.' },
              { num: '2', title: 'Review Admin', desc: 'Tim kami review dalam 1–3 hari kerja.' },
              { num: '3', title: 'Akun Aktif', desc: 'Terima SMS/email konfirmasi akun disetujui.' },
              { num: '4', title: 'Mulai Terima Order', desc: 'Toggle Online dan mulai terima pesanan!' },
            ].map(step => (
              <div key={step.num} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white font-black text-lg flex items-center justify-center mb-3 shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-green-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center py-10">
        <Link href="/" className="text-green-600 hover:text-green-500 font-medium text-sm">← Kembali ke Beranda</Link>
      </div>
    </main>
  );
}
