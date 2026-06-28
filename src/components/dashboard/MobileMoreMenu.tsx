'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, X } from 'lucide-react';

interface MoreItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MobileMoreMenuProps {
  open: boolean;
  onClose: () => void;
  items: MoreItem[];
  accentColor: 'green' | 'blue' | 'red';
  onLogout: () => void;
}

export function MobileMoreMenu({
  open, onClose, items, accentColor, onLogout,
}: MobileMoreMenuProps) {
  const pathname = usePathname();

  const activeClass = accentColor === 'green'
    ? 'bg-green-50 text-green-700'
    : accentColor === 'blue'
      ? 'bg-blue-50 text-blue-700'
      : 'bg-red-500/20 text-red-400';

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 lg:hidden"
        onClick={onClose}
        aria-hidden
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden rounded-t-3xl bg-white border-t border-slate-200 shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <p className="font-bold text-slate-900">Menu Lainnya</p>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="px-3 pb-safe space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors ${active ? activeClass : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={() => { onClose(); onLogout(); }}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Keluar
          </button>
        </nav>
      </div>
    </>
  );
}
