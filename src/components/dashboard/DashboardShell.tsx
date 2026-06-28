'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3, CalendarCheck2, CreditCard, Home, LogOut,
  MessageCircle, MoreHorizontal, Search, Settings, Wallet,
} from 'lucide-react';
import { MobileMoreMenu } from './MobileMoreMenu';

interface NavItem { href: string; label: string; icon: React.ComponentType<{ className?: string }> }

const mitraNav: NavItem[] = [
  { href: '/mitra/dashboard', label: 'Dashboard', icon: Home },
  { href: '/mitra/dashboard/orders', label: 'Order Saya', icon: CalendarCheck2 },
  { href: '/mitra/dashboard/saldo', label: 'Saldo & Withdraw', icon: Wallet },
  { href: '/mitra/dashboard/income', label: 'Income & Laporan', icon: BarChart3 },
  { href: '/mitra/dashboard/chat', label: 'Chat', icon: MessageCircle },
  { href: '/mitra/dashboard/profil', label: 'Profil Mitra', icon: Settings },
];

const customerNav: NavItem[] = [
  { href: '/customer/dashboard', label: 'Dashboard', icon: Home },
  { href: '/customer/dashboard/cari-mitra', label: 'Cari Mitra', icon: Search },
  { href: '/customer/dashboard/order', label: 'Buat Order', icon: CalendarCheck2 },
  { href: '/customer/dashboard/pembayaran', label: 'Pembayaran', icon: CreditCard },
  { href: '/customer/dashboard/chat', label: 'Chat', icon: MessageCircle },
  { href: '/customer/dashboard/riwayat', label: 'Riwayat', icon: Wallet },
  { href: '/customer/dashboard/profil', label: 'Profil', icon: Settings },
];

const mitraPrimaryHrefs = [
  '/mitra/dashboard',
  '/mitra/dashboard/orders',
  '/mitra/dashboard/saldo',
  '/mitra/dashboard/chat',
];

const customerPrimaryHrefs = [
  '/customer/dashboard',
  '/customer/dashboard/cari-mitra',
  '/customer/dashboard/order',
  '/customer/dashboard/chat',
];

function Shell({
  title, subtitle, nav, primaryHrefs, accentColor, children,
}: {
  title: string;
  subtitle: string;
  nav: NavItem[];
  primaryHrefs: string[];
  accentColor: 'green' | 'blue';
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);

  const activeClass = accentColor === 'green'
    ? 'bg-green-50 text-green-700'
    : 'bg-blue-50 text-blue-700';
  const labelColor = accentColor === 'green' ? 'text-green-600' : 'text-blue-600';
  const mobileActiveClass = accentColor === 'green'
    ? 'text-green-600 bg-green-50'
    : 'text-blue-600 bg-blue-50';
  const ctaClass = accentColor === 'green'
    ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-green-400/40'
    : 'bg-gradient-to-br from-blue-500 to-green-500 shadow-blue-400/40';

  const primaryNav = nav.filter((item) => primaryHrefs.includes(item.href));
  const moreNav = nav.filter((item) => !primaryHrefs.includes(item.href));
  const activePage = nav.find((item) => pathname === item.href);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/masuk');
    router.refresh();
  }

  const mainPaddingBottom = 'pb-[calc(var(--bottom-nav-height)+var(--safe-bottom))] lg:pb-0';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white">
        <div className="p-6 border-b border-slate-200">
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${labelColor}`}>Tukang Express</p>
          <h1 className="mt-2 text-xl font-black text-slate-900">{title}</h1>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${active ? activeClass : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 lg:hidden flex items-center justify-between px-4 pt-safe bg-white border-b border-slate-200 shadow-sm h-[var(--mobile-header-height)]">
          <div className="min-w-0">
            <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${labelColor}`}>Tukang Express</p>
            <p className="text-sm font-bold text-slate-900 truncate">{activePage?.label ?? title}</p>
          </div>
          <button
            onClick={() => setMoreOpen(true)}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Menu lainnya"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </header>

        <main className={`flex-1 ${mainPaddingBottom}`}>{children}</main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-slate-200 shadow-lg pb-safe">
        <nav className="flex items-end justify-around px-1 pt-1 max-w-lg mx-auto h-[var(--bottom-nav-height)]">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            const isOrderCta = item.href.includes('/order');

            if (isOrderCta) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-0.5 -mt-4 px-2"
                >
                  <span className={`w-12 h-12 rounded-full ${ctaClass} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <span className={`text-[9px] font-semibold ${active ? (accentColor === 'green' ? 'text-green-600' : 'text-blue-600') : 'text-slate-500'}`}>
                    Order
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-1 rounded-xl transition-all ${active ? mobileActiveClass : 'text-slate-500'}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-[9px] font-medium truncate max-w-full px-0.5 hidden sm:inline">
                  {item.label.split(' ')[0]}
                </span>
              </Link>
            );
          })}
          <button
            onClick={() => setMoreOpen(true)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-1 rounded-xl transition-all ${moreNav.some((i) => pathname === i.href) ? mobileActiveClass : 'text-slate-500'}`}
          >
            <MoreHorizontal className="h-5 w-5 shrink-0" />
            <span className="text-[9px] font-medium">Lainnya</span>
          </button>
        </nav>
      </div>

      <MobileMoreMenu
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        items={moreNav}
        accentColor={accentColor}
        onLogout={handleLogout}
      />
    </div>
  );
}

export function MitraDashboardShell({ children }: { children: ReactNode }) {
  return (
    <Shell
      title="Panel Mitra"
      subtitle="Kelola order, saldo, dan performa"
      nav={mitraNav}
      primaryHrefs={mitraPrimaryHrefs}
      accentColor="green"
    >
      {children}
    </Shell>
  );
}

export function CustomerDashboardShell({ children }: { children: ReactNode }) {
  return (
    <Shell
      title="Panel Customer"
      subtitle="Cari mitra, buat order, dan pantau pembayaran"
      nav={customerNav}
      primaryHrefs={customerPrimaryHrefs}
      accentColor="blue"
    >
      {children}
    </Shell>
  );
}
