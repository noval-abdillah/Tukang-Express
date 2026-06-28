/**
 * @file src/app/layout.tsx
 * Root layout — global Navbar, Footer, MobileBottomBar, dan LiveMitraNotif.
 */

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LiveMitraNotif }   from '@/components/ui/LiveMitraNotif';

export const metadata: Metadata = {
  title: {
    default: 'Tukang Express — Jasa Rumah On-Demand Terdekat & Terverifikasi',
    template: '%s | Tukang Express',
  },
  description:
    'Pesan jasa servis AC, kebersihan, dan perbaikan rumah dengan mudah. Mitra terverifikasi KYC, harga transparan, pembayaran aman via escrow. Hadir di 10+ kota Indonesia.',
  keywords: [
    'jasa servis AC', 'jasa kebersihan rumah', 'tukang panggil',
    'on-demand service Indonesia', 'jasa rumah tangga', 'tukang express',
    'servis AC terdekat', 'plumber terdekat', 'cleaning service',
  ],
  authors:  [{ name: 'Tukang Express', url: 'https://tukangexpress.id' }],
  creator:  'Tukang Express',
  openGraph: {
    type:        'website',
    locale:      'id_ID',
    url:         'https://tukangexpress.id',
    siteName:    'Tukang Express',
    title:       'Tukang Express — Jasa Rumah On-Demand',
    description: 'Platform on-demand jasa lokal: servis AC, kebersihan, dan perbaikan rumah. Mitra terverifikasi, harga transparan.',
    images:      [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Tukang Express' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Tukang Express — Jasa Rumah On-Demand',
    description: 'Platform on-demand jasa lokal terverifikasi di Indonesia.',
    images:      ['/opengraph-image'],
  },
  robots:      { index: true, follow: true },
  metadataBase: new URL('https://tukangexpress.id'),
  manifest:     '/manifest.webmanifest',
  appleWebApp: {
    capable:        true,
    statusBarStyle: 'default',
    title:          'Tukang Express',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor:   '#22C55E',
  width:        'device-width',
  initialScale: 1,
  viewportFit:  'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className="antialiased">
        {children}
        <LiveMitraNotif />
      </body>
    </html>
  );
}
