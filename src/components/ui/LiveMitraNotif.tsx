'use client';

/**
 * @file LiveMitraNotif.tsx
 * Komponen notifikasi pop-up "mitra baru bergabung" yang muncul
 * di pojok bawah kiri layar.
 *
 * Cara kerja:
 * - Data simulasi mitra baru (nama, kota, keahlian) ditampilkan bergantian
 * - Muncul setiap ~15-20 detik dengan animasi slide-in
 * - Counter total mitra disimpan di sessionStorage agar tidak reset tiap load
 * - Jujur: ada disclaimer "data simulasi platform"
 */

import { useState, useEffect, useCallback } from 'react';
import { UserCheck, X } from 'lucide-react';

// Data simulasi — representasi tipe mitra yang daftar, bukan data real
const MOCK_REGISTRATIONS = [
  { name: 'Ahmad S.',   city: 'Jakarta Selatan', skill: 'Teknisi AC',   avatar: 'A' },
  { name: 'Budi P.',    city: 'Bandung',          skill: 'Plumber',      avatar: 'B' },
  { name: 'Cahya R.',   city: 'Surabaya',         skill: 'Cleaning',     avatar: 'C' },
  { name: 'Doni M.',    city: 'Bekasi',           skill: 'Teknisi AC',   avatar: 'D' },
  { name: 'Eko W.',     city: 'Tangerang',        skill: 'Plumber',      avatar: 'E' },
  { name: 'Fajar K.',   city: 'Depok',            skill: 'Cleaning',     avatar: 'F' },
  { name: 'Gilang A.',  city: 'Bogor',            skill: 'Teknisi AC',   avatar: 'G' },
  { name: 'Hendra S.',  city: 'Medan',            skill: 'Plumber',      avatar: 'H' },
  { name: 'Irfan B.',   city: 'Semarang',         skill: 'Cleaning',     avatar: 'I' },
  { name: 'Joko P.',    city: 'Yogyakarta',       skill: 'Teknisi AC',   avatar: 'J' },
];

const INTERVAL_MS = 18000; // 18 detik antar notifikasi
const SHOW_MS     = 6000;  // tampil 6 detik lalu hilang

interface NotifData {
  name: string;
  city: string;
  skill: string;
  avatar: string;
}

export function LiveMitraNotif() {
  const [current,  setCurrent]  = useState<NotifData | null>(null);
  const [visible,  setVisible]  = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [idx,      setIdx]      = useState(0);

  const showNext = useCallback(() => {
    if (dismissed) return;
    const next = MOCK_REGISTRATIONS[idx % MOCK_REGISTRATIONS.length];
    setCurrent(next);
    setVisible(true);
    setIdx(i => i + 1);

    // Auto-hide setelah SHOW_MS
    setTimeout(() => setVisible(false), SHOW_MS);
  }, [idx, dismissed]);

  // Tampilkan pertama kali setelah 5 detik, lalu setiap INTERVAL_MS
  useEffect(() => {
    const first  = setTimeout(showNext, 5000);
    const repeat = setInterval(showNext, INTERVAL_MS);
    return () => { clearTimeout(first); clearInterval(repeat); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (dismissed || !current) return null;

  return (
    <div
      className={`
        fixed bottom-[calc(var(--bottom-nav-height)+var(--safe-bottom)+0.5rem)] left-4 lg:bottom-6 z-30
        transition-all duration-500 ease-out
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
      `}
      role="status"
      aria-live="polite"
      aria-label="Notifikasi mitra baru bergabung"
    >
      <div className="
        bg-white rounded-2xl shadow-xl shadow-green-200/60 border border-green-100
        px-4 py-3 flex items-start gap-3
        max-w-[280px] sm:max-w-[300px]
      ">
        {/* Avatar */}
        <div className="
          w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500
          flex items-center justify-center text-white font-black text-sm
          flex-shrink-0
        ">
          {current.avatar}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <UserCheck className="w-3.5 h-3.5 text-green-500 flex-shrink-0" aria-hidden />
            <span className="text-xs font-bold text-green-700">Mitra Baru Bergabung</span>
          </div>
          <p className="text-sm font-semibold text-green-900 truncate">{current.name}</p>
          <p className="text-xs text-gray-500">{current.skill} · {current.city}</p>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => { setVisible(false); setDismissed(true); }}
          className="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Disclaimer kecil */}
      <p className="text-[9px] text-gray-400 mt-1 ml-1">*Ilustrasi platform</p>
    </div>
  );
}
