import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSessionFromRequestAsync } from '@/lib/session';
import { updateWithdrawStatus, getWithdrawRequestById } from '@/lib/withdraw-store';

const schema = z.object({
  action: z.enum(['approve', 'reject']),
  note: z.string().max(500).optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequestAsync(req);
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 403 });
    }

    const { id } = await params;
    const existing = getWithdrawRequestById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Request tidak ditemukan' }, { status: 404 });
    }
    if (existing.status !== 'PENDING') {
      return NextResponse.json({ error: 'Request sudah diproses sebelumnya' }, { status: 409 });
    }

    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Input tidak valid' }, { status: 400 });
    }

    const { action, note } = result.data;
    const status = action === 'approve' ? 'APPROVED' : 'REJECTED';
    const updated = updateWithdrawStatus(id, status, note);

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
