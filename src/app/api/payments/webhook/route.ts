import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';
import { requireEnv } from '@/lib/env';

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-payment-signature');
    const secret = requireEnv('PAYMENT_WEBHOOK_SECRET');

    // Validasi Signature Key
    if (!signature || signature !== secret) {
      return NextResponse.json({ error: 'Signature tidak valid / tidak diotorisasi' }, { status: 401 });
    }

    const { order_id, status } = await req.json();
    if (!order_id || !status) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    // Map status dari gateway
    let orderStatus = 'WAITING_PAYMENT';
    let paymentStatus = 'PENDING';

    if (status === 'settlement' || status === 'capture') {
      orderStatus = 'SEARCHING_MITRA';
      paymentStatus = 'HELD';
    } else if (status === 'expire' || status === 'cancel') {
      orderStatus = 'CANCELLED';
      paymentStatus = 'REFUNDED';
    }

    // Update Escrow
    const { error: escrowError } = await supabase
      .from('escrow_transactions')
      .update({ payment_status: paymentStatus })
      .eq('order_id', order_id);

    if (escrowError) {
      return NextResponse.json({ error: 'Gagal update status transaksi' }, { status: 500 });
    }

    // Update Order
    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: orderStatus })
      .eq('id', order_id);

    if (orderError) {
      return NextResponse.json({ error: 'Gagal update status pesanan' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
