import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequestAsync } from '@/lib/session';
import { getAllWithdrawRequests } from '@/lib/withdraw-store';

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequestAsync(req);
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 403 });
  }
  const data = getAllWithdrawRequests();
  return NextResponse.json({ success: true, data });
}
