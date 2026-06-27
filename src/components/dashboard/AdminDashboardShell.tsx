'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BarChart3, Home, LogOut, ShieldCheck, Wallet } from 'lucide-react';

const adminNav = [
  { href: '/admin/dashboard', label: 'Overview', icon: Home },
  { href: '/admin/dashboard/withdrawals', label: 'Withdraw Requests', icon: Wallet },
];

export function AdminDashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/masuk');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 lg:flex">
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-slate-800 lg:bg-slate-900">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-red-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">Admin Panel</p>
          </div>
          <h1 className="mt-2 text-xl font-black text-white">Tukang Express</h1>
          <p className="mt-1 text-xs text-slate-400">Panel administrasi internal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  active ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>

      <main className="flex-1 pb-20 lg:pb-0">{children}</main>

      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-slate-900 border-t border-slate-800">
        <nav className="flex items-center justify-around px-2 py-2">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-medium ${
                  active ? 'text-red-400' : 'text-slate-500'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-medium text-slate-500"
          >
            <LogOut className="h-5 w-5" />
            Keluar
          </button>
        </nav>
      </div>
    </div>
  );
}
