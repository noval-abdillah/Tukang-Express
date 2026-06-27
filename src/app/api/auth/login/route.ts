import { NextRequest, NextResponse } from 'next/server';
import { AuthSchema } from '@/lib/validators';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { findTesterAccount } from '@/lib/tester-accounts';
import { createOtp } from '@/lib/otp-store';

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 request/menit per IP
    const ip = getClientIp(req);
    const limit = rateLimit(`login:${ip}`, 5, 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Terlalu banyak percobaan. Coba lagi dalam 1 menit.' },
        {
          status: 429,
          headers: { 'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)) },
        }
      );
    }

    const body = await req.json();
    const result = AuthSchema.login.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Nomor HP tidak valid', details: result.error.format() },
        { status: 400 }
      );
    }

    const { phone } = result.data;

    // Cek tester account
    const tester = findTesterAccount(phone);
    if (tester) {
      createOtp(phone);
      return NextResponse.json({ success: true, otpSent: true, isTester: true });
    }

    // Cek DB (skip kalau env tidak ada)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // Bukan tester & tidak ada DB → tolak
      return NextResponse.json(
        { error: 'Nomor HP tidak terdaftar. Daftar terlebih dahulu.' },
        { status: 404 }
      );
    }

    const { createSupabaseAdmin } = await import('@/lib/supabase');
    const supabase = createSupabaseAdmin();

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, phone_number, role, nama')
      .eq('phone_number', phone)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      return NextResponse.json({ error: 'Gagal memproses data' }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Nomor HP tidak terdaftar. Daftar terlebih dahulu.' },
        { status: 404 }
      );
    }

    createOtp(phone);
    // TODO: kirim SMS via provider (Twilio/Vonage) — OTP di otp-store.ts
    return NextResponse.json({ success: true, otpSent: true });
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
