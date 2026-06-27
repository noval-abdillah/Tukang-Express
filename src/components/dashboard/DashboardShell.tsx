'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3, CalendarCheck2, CreditCard, Home, LogOut,
  MessageCircle, Search, Settings, Wallet,
} from 'lucide-react';

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

function Shell({
  title, subtitle, nav, accentColor, children,
}: {
  title: string;
  subtitle: string;
  nav: NavItem[];
  accentColor: 'green' | 'blue';
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const activeClass = accentColor === 'green'
    ? 'bg-green-50 text-green-700'
    : 'bg-blue-50 text-blue-700';
  const labelColor = accentColor === 'green' ? 'text-green-600' : 'text-blue-600';
  const mobileActiveClass = accentColor === 'green'
    ? 'text-green-600 bg-green-50'
    : 'text-blue-600 bg-blue-50';

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/masuk');
    router.refresh();
  }

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

      <main className="flex-1 pb-24 lg:pb-0">{children}</main>

      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-slate-200 shadow-lg">
        <nav className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-medium transition-all ${active ? mobileActiveClass : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-medium text-slate-500"
          >
            <LogOut className="h-5 w-5" />
            Keluar
          </button>
        </nav>
      </div>
    </div>
  );
}

export function MitraDashboardShell({ children }: { children: ReactNode }) {
  return (
    <Shell title="Panel Mitra" subtitle="Kelola order, saldo, dan performa" nav={mitraNav} accentColor="green">
      {children}
    </Shell>
  );
}

export function CustomerDashboardShell({ children }: { children: ReactNode }) {
  return (
    <Shell title="Panel Customer" subtitle="Cari mitra, buat order, dan pantau pembayaran" nav={customerNav} accentColor="blue">
      {children}
    </Shell>
  );
}
