import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { verifyOtp } from '@/lib/otp-store';
import { findTesterAccount } from '@/lib/tester-accounts';
import { setSessionCookie } from '@/lib/session';
import type { SessionPayload } from '@/lib/session';

const schema = z.object({
  phone: z.string().regex(/^\d{9,15}$/, 'Nomor HP tidak valid'),
  otp: z.string().length(6, 'OTP harus 6 digit').regex(/^\d{6}$/, 'OTP hanya angka'),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit(`verify-otp:${ip}`, 10, 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Terlalu banyak percobaan. Coba lagi sebentar.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Input tidak valid', details: result.error.format() },
        { status: 400 }
      );
    }

    const { phone, otp } = result.data;

    const otpResult = verifyOtp(phone, otp);

    if (otpResult === 'expired') {
      return NextResponse.json(
        { error: 'Kode OTP sudah kadaluarsa. Minta kode baru.' },
        { status: 410 }
      );
    }
    if (otpResult === 'max_attempts') {
      return NextResponse.json(
        { error: 'Terlalu banyak percobaan OTP. Minta kode baru.' },
        { status: 429 }
      );
    }
    if (otpResult === 'invalid') {
      return NextResponse.json({ error: 'Kode OTP salah.' }, { status: 401 });
    }

    // OTP valid — buat session
    let payload: SessionPayload;

    const tester = findTesterAccount(phone);
    if (tester) {
      payload = {
        userId: tester.userId,
        role: tester.role,
        nama: tester.nama,
        hp: tester.hp,
      };
    } else if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { createSupabaseAdmin } = await import('@/lib/supabase');
      const supabase = createSupabaseAdmin();
      const { data: user, error } = await supabase
        .from('users')
        .select('id, phone_number, role, nama')
        .eq('phone_number', phone)
        .single();

      if (error || !user) {
        return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
      }

      payload = {
        userId: user.id,
        role: user.role as SessionPayload['role'],
        nama: user.nama ?? phone,
        hp: phone,
      };
    } else {
      return NextResponse.json({ error: 'Akun tidak ditemukan' }, { status: 404 });
    }

    const redirectTo =
      payload.role === 'MITRA'
        ? '/mitra/dashboard'
        : payload.role === 'ADMIN'
        ? '/admin/dashboard'
        : '/customer/dashboard';

    const res = NextResponse.json({ success: true, role: payload.role, redirectTo });
    await setSessionCookie(res, payload);
    return res;
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
