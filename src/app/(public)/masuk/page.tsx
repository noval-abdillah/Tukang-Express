'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Phone, ArrowRight, Loader2, Key, RotateCcw } from 'lucide-react';
import { AuthSchema } from '@/lib/validators';

const RESEND_SECONDS = 60;

function MasukComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '';

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<'phone' | 'otp'>('phone');
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);

  const [googleModal, setGoogleModal] = useState(false);

  async function handleGoogleLogin(testerHp: string) {
    setGoogleModal(false);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: testerHp, otp: '123456' }), // Auto-login bypass OTP
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Gagal login Google');
        return;
      }
      const dest = redirectTo || data.redirectTo || '/customer/dashboard';
      router.push(dest);
      router.refresh();
    } catch {
      setError('Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function startCountdown() {
    setCountdown(RESEND_SECONDS);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validation = AuthSchema.login.safeParse({ phone });
    if (!validation.success) {
      const err = validation.error.flatten();
      setError(err.fieldErrors.phone?.[0] ?? 'Nomor HP tidak valid');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Gagal mengirim OTP');
        return;
      }

      setPhase('otp');
      startCountdown();
      setTimeout(() => otpInputRef.current?.focus(), 100);
    } catch {
      setError('Terjadi kesalahan jaringan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (otp.length !== 6) {
      setError('Kode OTP harus 6 digit');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Kode OTP salah');
        setOtp('');
        return;
      }

      // Redirect ke halaman asal atau dashboard sesuai role
      const dest = redirectTo || data.redirectTo || '/customer/dashboard';
      router.push(dest);
      router.refresh();
    } catch {
      setError('Terjadi kesalahan jaringan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (countdown > 0) return;
    setOtp('');
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Gagal mengirim ulang OTP');
        return;
      }
      startCountdown();
    } catch {
      setError('Gagal mengirim ulang OTP');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-6 py-28">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 font-black text-2xl text-green-900">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-md">
              <span className="text-white text-lg">🔧</span>
            </span>
            Tukang<span className="text-green-500">Express</span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">
            {phase === 'phone' ? 'Masuk ke akun Anda' : `Kode OTP dikirim ke +62${phone}`}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-green-100 border border-green-100 p-8">
          <h1 className="text-2xl font-black text-green-900 mb-2">
            {phase === 'phone' ? 'Selamat Datang!' : 'Verifikasi OTP'}
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {phase === 'phone'
              ? 'Masukkan nomor HP untuk mendapatkan kode OTP.'
              : 'Masukkan 6 digit kode yang telah dikirim.'}
          </p>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-200">
              {error}
            </div>
          )}

          {phase === 'phone' ? (
            <form className="space-y-5" onSubmit={handleSendOtp}>
              <div>
                <label htmlFor="phone-login" className="block text-sm font-semibold text-green-900 mb-1.5">
                  Nomor HP *
                </label>
                <div className="flex gap-3">
                  <div className="px-4 py-3 rounded-xl border-2 border-green-200 bg-green-50 text-sm text-green-700 font-semibold shrink-0">
                    +62
                  </div>
                  <input
                    id="phone-login"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="81234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 border border-blue-200 p-3.5 text-xs text-blue-700 font-medium">
                <strong>Mode Tester:</strong> gunakan <code className="bg-blue-100 px-1 rounded">08111111111</code> (customer) atau <code className="bg-blue-100 px-1 rounded">08222222222</code> (mitra). OTP: <code className="bg-blue-100 px-1 rounded">123456</code>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-base shadow-lg shadow-green-400/25 hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-55 cursor-pointer"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Phone className="w-5 h-5" />}
                Kirim Kode OTP
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <div>
                <label htmlFor="otp-input" className="block text-sm font-semibold text-green-900 mb-1.5">
                  Kode OTP *
                </label>
                <div className="flex gap-3">
                  <div className="px-4 py-3 rounded-xl border-2 border-green-200 bg-green-50 text-sm text-green-700 font-semibold shrink-0">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    ref={otpInputRef}
                    id="otp-input"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    autoComplete="one-time-code"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none text-sm transition-colors tracking-[0.4em] text-center font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-base shadow-lg shadow-green-400/25 hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-55 cursor-pointer"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                Verifikasi & Masuk
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => { setPhase('phone'); setOtp(''); setError(null); }}
                  className="text-slate-400 hover:text-green-600 transition-colors"
                >
                  ← Ganti nomor HP
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0 || loading}
                  className="flex items-center gap-1.5 text-green-600 hover:text-green-500 disabled:text-slate-400 transition-colors font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {countdown > 0 ? `Kirim ulang (${countdown}s)` : 'Kirim ulang OTP'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Mitra baru?{' '}
              <Link href="/daftar-mitra" className="text-green-600 font-semibold hover:text-green-500">
                Daftar di sini
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-green-100 text-center">
            <p className="text-xs text-gray-400">
              Dengan masuk, Anda menyetujui{' '}
              <Link href="/syarat" className="text-green-600 underline">Syarat Layanan</Link>
              {' '}dan{' '}
              <Link href="/privasi" className="text-green-600 underline">Kebijakan Privasi</Link> kami.
            </p>
          </div>
        </div>

        {/* Google Sign In Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setGoogleModal(true)}
            className="w-full py-3.5 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
              <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"/>
              <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"/>
              <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
            </svg>
            Masuk dengan Google (Simulasi)
          </button>
        </div>

        {/* Google Chooser Modal Simulator */}
        {googleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-100">
              <div className="text-center">
                <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
                  <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"/>
                  <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"/>
                  <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
                </svg>
                <h3 className="font-bold text-slate-800 text-lg">Pilih Akun Google</h3>
                <p className="text-slate-400 text-xs mt-1">untuk melanjutkan ke Tukang Express</p>
              </div>

              <div className="space-y-2">
                {[
                  { email: 'tester.customer@gmail.com', name: 'Tester Customer', hp: '08111111111' },
                  { email: 'tester.mitra@gmail.com', name: 'Tester Mitra', hp: '08222222222' },
                  { email: 'admin.tukangexpress@gmail.com', name: 'Admin Tukang Express', hp: '08000000000' },
                ].map((acc) => (
                  <button
                    key={acc.email}
                    onClick={() => handleGoogleLogin(acc.hp)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-600">
                      {acc.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{acc.name}</p>
                      <p className="text-xs text-slate-400">{acc.email}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setGoogleModal(false)}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-green-500 transition-colors">← Kembali ke Beranda</Link>
        </p>
      </div>
    </main>
  );
}

export default function MasukPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm font-semibold text-slate-500">Loading...</div>}>
      <MasukComponent />
    </Suspense>
  );
}
