'use client';

/**
 * @file Navbar.tsx — Navbar responsif yang konsisten di semua halaman.
 *
 * Fitur:
 * - Active state berdasarkan pathname (bukan hanya section scroll)
 * - Di halaman `/` : smooth scroll ke section
 * - Di halaman lain: Link navigasi biasa dengan active highlight
 * - Mobile: overlay menu full-screen dengan animasi
 * - Accessibility: aria-label, aria-expanded, focus trap
 */

import { useState, useEffect, useCallback } from 'react';
import { Wrench, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label:     string;
  href:      string;         // URL navigasi
  sectionId?: string;        // ID section untuk smooth scroll (hanya jika di /)
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Layanan',
    href: '/layanan',
    sectionId: 'layanan',
    children: [
      { label: 'Servis AC',        href: '/layanan#servis-ac' },
      { label: 'Ledeng & Pipa',    href: '/layanan#ledeng-pipa' },
      { label: 'Kebersihan Rumah', href: '/layanan#kebersihan-rumah' },
      { label: 'Estimasi Harga',   href: '/harga' },
    ],
  },
  { label: 'Cara Kerja', href: '/cara-kerja', sectionId: 'cara-kerja' },
  { label: 'Fitur',      href: '/fitur',      sectionId: 'fitur'      },
  {
    label: 'Mitra',
    href: '/panduan-mitra',
    sectionId: 'mitra',
    children: [
      { label: 'Daftar Mitra',    href: '/daftar-mitra' },
      { label: 'Panduan Mitra',   href: '/panduan-mitra' },
      { label: 'Tentang Kami',    href: '/tentang' },
    ],
  },
];

function isActiveRoute(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export function Navbar() {
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [openDropdown,  setOpenDropdown]  = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('');

  const pathname = usePathname();
  const isHome   = pathname === '/';

  // ── Scroll detection ─────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Route change resets via key below to avoid sync setState in effect ────

  // ── Prevent body scroll when mobile menu is open ─────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // ── Active section detection (hanya di /) ────────────────────────────────
  useEffect(() => {
    if (!isHome) return;
    const ids = ['hero', 'layanan', 'cara-kerja', 'fitur', 'mitra'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // ── Smooth scroll (hanya di /) ────────────────────────────────────────────
  const smoothScroll = useCallback((sectionId: string, e: React.MouseEvent) => {
    if (!isHome) return;
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [isHome]);

  // ── Determine if navbar should be dark (on non-home or scrolled) ─────────
  const isDark = scrolled || !isHome;

  return (
    <>
      <header
        key={pathname}
        id="navbar"
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isDark
            ? 'bg-white/98 backdrop-blur-xl border-b border-green-100 shadow-sm shadow-green-50/50'
            : 'bg-transparent'
          }
        `}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 h-[72px] flex items-center justify-between"
          aria-label="Navigasi Utama"
        >
          {/* ── Logo ──────────────────────────────────────────────────── */}
          <Link
            href="/"
            id="navbar-logo"
            className="flex items-center gap-2.5 font-black text-xl tracking-tight group flex-shrink-0"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-md shadow-green-400/30 group-hover:scale-110 transition-transform duration-300">
              <Wrench className="w-5 h-5 text-white" aria-hidden />
            </span>
            <span className="text-green-900">
              Tukang<span className="text-green-500">Express</span>
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_ITEMS.map((item) => {
              const active = isHome && item.sectionId
                ? activeSection === item.sectionId
                : isActiveRoute(item.href, pathname);

              return (
                <li key={item.href} className="relative">
                  {/* Item dengan dropdown */}
                  {item.children ? (
                    <div className="relative">
                      <button
                        id={`nav-${item.href.replace(/\//g, '-')}`}
                        onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                        onMouseEnter={() => setOpenDropdown(item.href)}
                        className={`
                          flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                          ${active ? 'text-green-600 bg-green-50' : 'text-green-800 hover:text-green-600 hover:bg-green-50'}
                        `}
                        aria-expanded={openDropdown === item.href}
                        aria-haspopup="menu"
                      >
                        {isHome && item.sectionId ? (
                          <span onClick={(e) => smoothScroll(item.sectionId!, e)}>{item.label}</span>
                        ) : (
                          <Link href={item.href}>{item.label}</Link>
                        )}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.href ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown menu */}
                      {openDropdown === item.href && (
                        <div
                          className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-xl shadow-green-100 border border-green-100 py-2 z-50"
                          onMouseLeave={() => setOpenDropdown(null)}
                          role="menu"
                        >
                          {item.children.map(child => (
                            <Link
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              className="block px-4 py-2.5 text-sm text-green-800 hover:bg-green-50 hover:text-green-600 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Item biasa */
                    isHome && item.sectionId ? (
                      <button
                        id={`nav-${item.sectionId}`}
                        onClick={(e) => smoothScroll(item.sectionId!, e)}
                        className={`
                          relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                          ${active ? 'text-green-600 bg-green-50' : 'text-green-800 hover:text-green-600 hover:bg-green-50'}
                        `}
                      >
                        {item.label}
                        {active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-500" />}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        id={`nav-link-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                        className={`
                          relative block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                          ${active ? 'text-green-600 bg-green-50' : 'text-green-800 hover:text-green-600 hover:bg-green-50'}
                        `}
                      >
                        {item.label}
                        {active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-500" />}
                      </Link>
                    )
                  )}
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA ───────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/masuk"
              id="navbar-login"
              className="px-4 py-2 text-sm font-medium text-green-700 hover:text-green-500 transition-colors rounded-xl hover:bg-green-50"
            >
              Masuk
            </Link>
            <Link
              href={isHome ? '#layanan' : '/layanan'}
              id="navbar-cta"
              onClick={isHome ? (e) => smoothScroll('layanan', e) : undefined}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white text-sm font-bold shadow-md shadow-green-400/20 hover:shadow-green-400/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Pesan Jasa
            </Link>
          </div>

          {/* ── Mobile Toggle ─────────────────────────────────────────── */}
          <button
            id="navbar-mobile-toggle"
            className="lg:hidden p-2 rounded-xl text-green-700 hover:bg-green-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ──────────────────────────────────────────── */}
      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Slide-in Panel */}
      <div
        id="mobile-nav"
        className={`
          fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm
          bg-white shadow-2xl shadow-green-200
          transform transition-transform duration-300 ease-in-out
          lg:hidden flex flex-col
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label="Menu navigasi mobile"
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-green-100 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 font-black text-lg text-green-900" onClick={() => setMobileOpen(false)}>
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </span>
            Tukang<span className="text-green-500">Express</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-xl text-green-700 hover:bg-green-50"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActiveRoute(item.href, pathname);
            return (
              <div key={item.href}>
                {isHome && item.sectionId ? (
                  <button
                    onClick={(e) => smoothScroll(item.sectionId!, e)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all
                      ${active ? 'bg-green-50 text-green-600' : 'text-green-900 hover:bg-green-50'}
                    `}
                  >
                    {item.label}
                    {active && <span className="w-2 h-2 rounded-full bg-green-500" />}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all
                      ${active ? 'bg-green-50 text-green-600' : 'text-green-900 hover:bg-green-50'}
                    `}
                  >
                    {item.label}
                    {active && <span className="w-2 h-2 rounded-full bg-green-500" />}
                  </Link>
                )}

                {/* Sub-items */}
                {item.children && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Panel Footer CTA */}
        <div className="flex-shrink-0 px-4 pb-8 pt-4 border-t border-green-100 space-y-3">
          <Link
            href="/layanan"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg shadow-green-400/25"
          >
            Pesan Jasa Sekarang
          </Link>
          <Link
            href="/masuk"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3.5 rounded-2xl border-2 border-green-200 text-green-700 font-semibold hover:bg-green-50 transition-colors"
          >
            Masuk ke Akun
          </Link>
          <Link
            href="/daftar-mitra"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3.5 rounded-2xl bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition-colors text-sm"
          >
            Daftar Jadi Mitra
          </Link>
        </div>
      </div>
    </>
  );
}
