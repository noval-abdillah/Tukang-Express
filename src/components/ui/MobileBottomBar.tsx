'use client';

/**
 * @file MobileBottomBar.tsx
 * Sticky bottom navigation bar khusus mobile.
 * Muncul saat scroll ke bawah, hilang di hero.
 * Hanya tampil di layar < lg (1024px).
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wrench, Phone, Home, BookOpen, User } from 'lucide-react';

export function MobileBottomBar() {
  const pathname = usePathname();
  const isHome   = pathname === '/';
  const [visible, setVisible] = useState(!isHome);

  useEffect(() => {
    let active = true;
    if (!isHome) {
      const id = window.requestAnimationFrame(() => {
        if (active) setVisible(true);
      });
      return () => {
        active = false;
        window.cancelAnimationFrame(id);
      };
    }
    const onScroll = () => {
      const heroH = document.getElementById('hero')?.offsetHeight ?? 400;
      if (active) setVisible(window.scrollY > heroH * 0.4);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      active = false;
      window.removeEventListener('scroll', onScroll);
    };
  }, [isHome]);

  const tabs = [
    { icon: Home,     label: 'Beranda',  href: '/' },
    { icon: BookOpen, label: 'Layanan',  href: '/layanan' },
    { icon: Wrench,   label: 'Pesan',    href: '/layanan', isPrimary: true },
    { icon: User,     label: 'Mitra',    href: '/daftar-mitra' },
    { icon: Phone,    label: 'Kontak',   href: '/kontak' },
  ];

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-40 lg:hidden
        transition-all duration-300
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      {/* Safe area background */}
      <div className="bg-white border-t border-green-100 shadow-lg shadow-green-200/50">
        <div className="flex items-center justify-around px-2 py-2 pb-safe max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));

            if (tab.isPrimary) {
              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  id="mobile-bottom-cta"
                  className="flex flex-col items-center gap-1 -mt-6"
                >
                  <span className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-400/40">
                    <Icon className="w-6 h-6 text-white" aria-hidden />
                  </span>
                  <span className="text-[10px] font-semibold text-green-600">{tab.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={tab.label}
                href={tab.href}
                id={`mobile-bottom-${tab.label.toLowerCase()}`}
                className={`
                  flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl min-w-[52px] transition-all
                  ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-green-500'}
                `}
              >
                <Icon className="w-5 h-5" aria-hidden />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
