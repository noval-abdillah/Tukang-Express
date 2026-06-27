'use client';

/**
 * @file FooterSection.tsx
 * Footer dengan semua link menuju halaman nyata (App Router pages).
 */

import Link from 'next/link';
import { Wrench, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const FOOTER_LINKS = {
  layanan: [
    { label: 'Servis AC',        href: '/layanan#servis-ac' },
    { label: 'Ledeng & Pipa',    href: '/layanan#ledeng-pipa' },
    { label: 'Kebersihan Rumah', href: '/layanan#kebersihan-rumah' },
    { label: 'Semua Layanan',    href: '/layanan' },
  ],
  perusahaan: [
    { label: 'Tentang Kami', href: '/tentang' },
    { label: 'Cara Kerja',   href: '/cara-kerja' },
    { label: 'Hubungi Kami', href: '/kontak' },
    { label: 'Blog',         href: '/blog' },
  ],
  mitra: [
    { label: 'Daftar Mitra',          href: '/daftar-mitra' },
    { label: 'Panduan Mitra',         href: '/panduan-mitra' },
    { label: 'Premium Subscription',  href: '/daftar-mitra#premium' },
    { label: 'Syarat & Ketentuan',    href: '/syarat' },
  ],
  legal: [
    { label: 'Kebijakan Privasi', href: '/privasi' },
    { label: 'Syarat Layanan',    href: '/syarat' },
    { label: 'Kebijakan Cookie',  href: '/privasi#cookie' },
  ],
};

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-green-950 text-white">

      {/* ── Newsletter Strip ─────────────────────────────────────────────── */}
      <div className="bg-green-600 border-b border-green-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-white text-lg">Dapatkan penawaran eksklusif!</p>
            <p className="text-green-200 text-sm">Daftar dan hemat hingga 30% untuk order pertama Anda.</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="email@anda.com"
              className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-green-700 border border-green-500 text-white placeholder-green-400 focus:outline-none focus:border-white text-sm"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-white text-green-700 font-bold text-sm hover:bg-green-50 transition-colors flex items-center gap-1.5"
            >
              Daftar <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Footer ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand — 2 cols */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-md">
                <Wrench className="w-5 h-5 text-white" aria-hidden />
              </span>
              <span className="font-black text-xl text-white">
                Tukang<span className="text-green-400">Express</span>
              </span>
            </Link>

            <p className="text-green-300/80 text-sm leading-relaxed mb-6 max-w-xs">
              Platform on-demand jasa lokal terverifikasi di Indonesia. Menghubungkan pengguna dengan mitra tukang ahli secara real-time dengan pembayaran escrow yang aman.
            </p>

            <div className="space-y-2.5 mb-6">
              <a href="mailto:halo@tukangexpress.id" className="flex items-center gap-2.5 text-sm text-green-300/70 hover:text-green-300 transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                halo@tukangexpress.id
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-green-300/70 hover:text-green-300 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +62 812-3456-7890 (WhatsApp)
              </a>
              <div className="flex items-start gap-2.5 text-sm text-green-300/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Jakarta Selatan, DKI Jakarta 12560</span>
              </div>
            </div>

            {/* App Store Badges */}
            <div className="flex gap-3">
              <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-center cursor-pointer hover:bg-white/20 transition-colors">
                <p className="text-green-300 text-[10px]">Segera di</p>
                <p className="font-bold text-white">App Store</p>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-center cursor-pointer hover:bg-white/20 transition-colors">
                <p className="text-green-300 text-[10px]">Segera di</p>
                <p className="font-bold text-white">Google Play</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <FooterLinkGroup title="Layanan"     links={FOOTER_LINKS.layanan} />
          <FooterLinkGroup title="Perusahaan"  links={FOOTER_LINKS.perusahaan} />
          <FooterLinkGroup title="Untuk Mitra" links={FOOTER_LINKS.mitra} />
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-green-800/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-400/60 text-xs">
            © {year} Tukang Express. All rights reserved. | Terdaftar di OJK
          </p>
          <div className="flex flex-wrap gap-5">
            {FOOTER_LINKS.legal.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-green-400/60 hover:text-green-400 text-xs transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-green-300/70 hover:text-green-300 transition-colors hover:translate-x-0.5 inline-flex items-center gap-1 group"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
