import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequestAsync } from '@/lib/session';

const PUBLIC_PATHS = [
  '/',
  '/masuk',
  '/daftar-mitra',
  '/layanan',
  '/cara-kerja',
  '/fitur',
  '/harga',
  '/tentang',
  '/kontak',
  '/blog',
  '/panduan-mitra',
  '/privasi',
  '/syarat',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Biarkan assets & next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  // Halaman publik: kalau sudah login & buka /masuk → redirect dashboard
  if (pathname === '/masuk') {
    const session = await getSessionFromRequestAsync(req);
    if (session) {
      const dest =
        session.role === 'MITRA'
          ? '/mitra/dashboard'
          : session.role === 'ADMIN'
          ? '/admin/dashboard'
          : '/customer/dashboard';
      return NextResponse.redirect(new URL(dest, req.url));
    }
    return NextResponse.next();
  }

  if (isPublic) return NextResponse.next();

  // Dashboard & admin: wajib login
  const isDashboard =
    pathname.startsWith('/mitra/dashboard') ||
    pathname.startsWith('/customer/dashboard') ||
    pathname.startsWith('/admin');

  if (isDashboard) {
    const session = await getSessionFromRequestAsync(req);

    if (!session) {
      const url = new URL('/masuk', req.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    // Role guard
    if (pathname.startsWith('/mitra/dashboard') && session.role !== 'MITRA') {
      const dest = session.role === 'ADMIN' ? '/admin/dashboard' : '/customer/dashboard';
      return NextResponse.redirect(new URL(dest, req.url));
    }
    if (pathname.startsWith('/customer/dashboard') && session.role !== 'CUSTOMER') {
      const dest = session.role === 'ADMIN' ? '/admin/dashboard' : '/mitra/dashboard';
      return NextResponse.redirect(new URL(dest, req.url));
    }
    if (pathname.startsWith('/admin') && session.role !== 'ADMIN') {
      const dest = session.role === 'MITRA' ? '/mitra/dashboard' : '/customer/dashboard';
      return NextResponse.redirect(new URL(dest, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
