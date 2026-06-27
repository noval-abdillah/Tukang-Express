import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSessionFromRequestAsync } from '@/lib/session';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { createWithdrawRequest } from '@/lib/withdraw-store';

const BANK_CODES: Record<string, string> = {
  BCA: 'Bank Central Asia',
  BNI: 'Bank Negara Indonesia',
  BRI: 'Bank Rakyat Indonesia',
  MANDIRI: 'Bank Mandiri',
  BSI: 'Bank Syariah Indonesia',
  CIMB: 'CIMB Niaga',
  PERMATA: 'Bank Permata',
};

const schema = z.object({
  amount: z
    .number()
    .int('Nominal harus bilangan bulat')
    .min(100_000, 'Minimal withdraw Rp 100.000')
    .max(50_000_000, 'Maksimal withdraw Rp 50.000.000'),
  bank_code: z
    .string()
    .refine((v) => Object.keys(BANK_CODES).includes(v), { message: 'Kode bank tidak valid' }),
  account_number: z
    .string()
    .min(6, 'Nomor rekening terlalu pendek')
    .max(20, 'Nomor rekening terlalu panjang')
    .regex(/^\d+$/, 'Nomor rekening hanya angka'),
  account_name: z.string().min(3, 'Nama pemilik rekening minimal 3 karakter').max(100),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequestAsync(req);
    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
    }
    if (session.role !== 'MITRA') {
      return NextResponse.json({ error: 'Hanya mitra yang dapat melakukan withdraw' }, { status: 403 });
    }

    const ip = getClientIp(req);
    const limit = rateLimit(`withdraw:${session.userId}`, 3, 60 * 60 * 1000); // 3x/jam
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Batas permintaan withdraw tercapai. Coba lagi dalam 1 jam.' },
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

    const { amount, bank_code, account_number, account_name } = result.data;

    const withdrawReq = createWithdrawRequest({
      mitraId: session.userId,
      mitraNama: session.nama,
      amount,
      bankCode: bank_code,
      bankName: BANK_CODES[bank_code],
      accountNumber: account_number,
      accountName: account_name,
    });

    return NextResponse.json({
      success: true,
      requestId: withdrawReq.id,
      status: 'PENDING',
      message: 'Permintaan withdraw berhasil diajukan. Diproses dalam 1×24 jam kerja.',
    });
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
