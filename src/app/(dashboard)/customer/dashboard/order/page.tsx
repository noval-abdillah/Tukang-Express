'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle } from 'lucide-react';

const SERVICE_OPTIONS = [
  { value: 'ac', label: 'Servis AC', price: 150_000 },
  { value: 'ledeng', label: 'Ledeng & Pipa', price: 125_000 },
  { value: 'kebersihan', label: 'Kebersihan Rumah', price: 200_000 },
  { value: 'listrik', label: 'Instalasi Listrik', price: 175_000 },
  { value: 'lainnya', label: 'Lainnya', price: 100_000 },
];

const JAM_OPTIONS = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

interface Toast { msg: string; ok: boolean }

function BuatOrderComponent() {
  const searchParams = useSearchParams();
  const paramLayanan = searchParams.get('layanan') ?? 'ac';
  const paramMitra = searchParams.get('mitra') ?? '';

  const [serviceType, setServiceType] = useState('ac');
  const [address, setAddress] = useState('');
  const [jam, setJam] = useState('09:00');
  const [catatan, setCatatan] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [success, setSuccess] = useState<{ orderId: string; paymentToken: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [paymentModal, setPaymentModal] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  useEffect(() => {
    if (paramLayanan) {
      const match = SERVICE_OPTIONS.some(s => s.value === paramLayanan);
      if (match) setServiceType(paramLayanan);
    }
  }, [paramLayanan]);

  const selectedService = SERVICE_OPTIONS.find((s) => s.value === serviceType)!;
  const platformFee = Math.round(selectedService.price * 0.05);
  const total = selectedService.price + platformFee;

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 5000);
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (address.trim().length < 10) errors.address = 'Alamat minimal 10 karakter';
    if (address.trim().length > 500) errors.address = 'Alamat terlalu panjang';
    if (catatan.length > 1000) errors.catatan = 'Catatan terlalu panjang (max 1000 karakter)';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: serviceType,
          booking_address: address.trim(),
          geo_location: { lat: -6.2088, lng: 106.8456 },
          estimated_price: selectedService.price,
          catatan: catatan.trim() || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        showToast(data.error ?? 'Gagal membuat order', false);
        return;
      }

      setSuccess({ orderId: data.order.id, paymentToken: data.payment_token });
      setPaymentModal(true);
    } catch {
      showToast('Terjadi kesalahan jaringan', false);
    } finally {
      setLoading(false);
    }
  }

  function handleSimulatePayment() {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaySuccess(true);
    }, 1500);
  }

  if (success && paySuccess) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full rounded-3xl bg-white border border-green-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-800">Pembayaran Berhasil!</h2>
          <p className="text-slate-500 text-sm">
            Order kamu telah lunas dan sedang dalam proses pencarian mitra terdekat.
          </p>
          <div className="rounded-2xl bg-slate-50 p-4 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Order ID</span>
              <span className="font-mono font-bold">{success.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Nominal</span>
              <span className="font-black text-green-600">Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Status Escrow</span>
              <span className="font-bold text-blue-600">HELD (Dana Ditahan)</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setSuccess(null); setPaySuccess(false); setAddress(''); setCatatan(''); }}
              className="rounded-2xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Buat Order Lagi
            </button>
            <button
              onClick={() => window.location.href = '/customer/dashboard/riwayat'}
              className="rounded-2xl bg-blue-500 py-3 text-sm font-bold text-white hover:bg-blue-400 cursor-pointer"
            >
              Pantau Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 max-w-sm rounded-2xl px-5 py-3.5 text-sm font-bold shadow-xl ${toast.ok ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Customer</p>
        <h1 className="mt-2 text-3xl font-black">Buat Order</h1>
        <p className="text-slate-500">Isi detail layanan yang kamu butuhkan.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-4">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="font-bold text-lg">Detail Layanan</h2>
              
              {paramMitra && (
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-500 font-bold uppercase tracking-widest">Mitra Terpilih</p>
                    <p className="text-sm font-bold text-blue-900 mt-0.5">{paramMitra}</p>
                  </div>
                  <span className="text-xs text-blue-600 bg-white px-3 py-1.5 rounded-full font-bold border border-blue-100">Khusus Mitra Ini</span>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1">Jenis Layanan *</p>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-400 bg-white"
                  >
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1">Jam Kedatangan *</p>
                  <select
                    value={jam}
                    onChange={(e) => setJam(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-400 bg-white"
                  >
                    {JAM_OPTIONS.map((j) => <option key={j}>{j}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Alamat Lengkap *</p>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Jl. Sudirman No. 10, Jakarta Selatan"
                  className={`w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none ${fieldErrors.address ? 'border-red-400' : 'border-slate-200 focus:border-blue-400'}`}
                />
                {fieldErrors.address && <p className="text-xs text-red-500 mt-1">{fieldErrors.address}</p>}
              </div>

              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Catatan Tambahan</p>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Contoh: AC 2 unit, freon bocor, tidak dingin..."
                  rows={3}
                  className={`w-full rounded-2xl border px-4 py-3 text-sm resize-none focus:outline-none ${fieldErrors.catatan ? 'border-red-400' : 'border-slate-200 focus:border-blue-400'}`}
                />
                {fieldErrors.catatan && <p className="text-xs text-red-500 mt-1">{fieldErrors.catatan}</p>}
                <p className="text-xs text-slate-400 mt-1">{catatan.length}/1000</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="font-bold text-lg">Ringkasan Order</h2>
              <div className="space-y-3 text-sm">
                {[
                  ['Layanan', selectedService.label],
                  ['Harga Layanan', `Rp ${selectedService.price.toLocaleString('id-ID')}`],
                  ['Fee Platform (5%)', `Rp ${platformFee.toLocaleString('id-ID')}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-slate-500">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
                <div className="border-t border-slate-100 pt-3 flex justify-between font-black text-base">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-semibold mb-2">Metode Pembayaran</p>
                <div className="space-y-2">
                  {['Transfer Bank (Escrow)', 'QRIS', 'GoPay / OVO'].map((m, i) => (
                    <label key={m} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 cursor-pointer hover:bg-slate-50 text-sm">
                      <input type="radio" name="payment" className="accent-blue-500" defaultChecked={i === 0} readOnly />
                      {m}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 py-3 font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-55 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Buat Order & Bayar
              </button>
            </div>

            <div className="rounded-2xl bg-blue-50 p-4 text-xs text-blue-700 font-semibold">
              Dana kamu aman — pembayaran ditahan di escrow dan hanya cair ke mitra setelah order selesai.
            </div>
          </div>
        </div>
      </form>

      {/* QRIS SIMULATOR MODAL */}
      {paymentModal && success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl border border-slate-100 text-center">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Bayar dengan QRIS</h3>
              <p className="text-xs text-slate-400">Scan QR code di bawah menggunakan e-wallet / mobile banking</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 max-w-[240px] mx-auto">
              <svg className="w-48 h-48 bg-white border-2 border-slate-100 rounded-xl p-2" viewBox="0 0 100 100">
                <rect x="10" y="10" width="20" height="20" fill="black" />
                <rect x="14" y="14" width="12" height="12" fill="white" />
                <rect x="70" y="10" width="20" height="20" fill="black" />
                <rect x="74" y="14" width="12" height="12" fill="white" />
                <rect x="10" y="70" width="20" height="20" fill="black" />
                <rect x="14" y="74" width="12" height="12" fill="white" />
                <rect x="40" y="40" width="20" height="20" fill="black" />
                <rect x="44" y="44" width="12" height="12" fill="white" />
                <rect x="10" y="40" width="8" height="8" fill="black" />
                <rect x="25" y="50" width="6" height="6" fill="black" />
                <rect x="55" y="20" width="10" height="6" fill="black" />
                <rect x="75" y="45" width="8" height="12" fill="black" />
                <rect x="45" y="75" width="14" height="8" fill="black" />
                <rect x="70" y="70" width="10" height="10" fill="black" />
              </svg>
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700 bg-white border border-slate-100 rounded-full px-3 py-1">
                <span>⚡</span>
                <span>QRIS TERVERIFIKASI</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400">Total Nominal Pembayaran</p>
              <p className="text-xl font-black text-slate-800">Rp {total.toLocaleString('id-ID')}</p>
              <p className="text-[10px] text-slate-400">Order ID: {success.orderId}</p>
            </div>

            <div className="flex gap-2">
              <button
                disabled={paying}
                onClick={() => { setPaymentModal(false); setPaySuccess(false); }}
                className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm cursor-pointer transition-colors disabled:opacity-55"
              >
                Bayar Nanti
              </button>
              <button
                disabled={paying}
                onClick={handleSimulatePayment}
                className="flex-1 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                {paying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Simulasi Bayar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BuatOrderPage() {
  return (
    <Suspense fallback={<div className="p-6 lg:p-8 text-center text-slate-400 text-sm">Memuat form order...</div>}>
      <BuatOrderComponent />
    </Suspense>
  );
}
