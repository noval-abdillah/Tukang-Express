import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSessionFromRequestAsync } from '@/lib/session';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const schema = z.object({
  service_type: z.enum(['ac', 'ledeng', 'kebersihan', 'listrik', 'lainnya']).refine(Boolean, {
    message: 'Jenis layanan tidak valid',
  }),
  booking_address: z.string().min(10, 'Alamat terlalu pendek').max(500, 'Alamat terlalu panjang'),
  geo_location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  estimated_price: z
    .number()
    .positive('Harga harus positif')
    .max(10_000_000, 'Harga melebihi batas maksimum'),
  scheduled_at: z.string().datetime({ offset: true }).optional(),
  catatan: z.string().max(1000, 'Catatan terlalu panjang').optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Auth: wajib login sebagai CUSTOMER
    const session = await getSessionFromRequestAsync(req);
    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
    }
    if (session.role !== 'CUSTOMER') {
      return NextResponse.json({ error: 'Hanya customer yang dapat membuat order' }, { status: 403 });
    }

    // Rate limit: 10 order/menit per user
    const limit = rateLimit(`order:${session.userId}`, 10, 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json({ error: 'Terlalu banyak permintaan' }, { status: 429 });
    }

    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Input tidak valid', details: result.error.format() },
        { status: 400 }
      );
    }

    const orderData = result.data;
    const customer_id = session.userId; // TIDAK dari body — aman dari injection

    // Mock response kalau tidak ada DB
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const mockOrder = {
        id: `ORD-${Date.now()}`,
        customer_id,
        service_type: orderData.service_type,
        status: 'WAITING_PAYMENT',
        booking_address: orderData.booking_address,
        estimated_price: orderData.estimated_price,
        catatan: orderData.catatan,
        created_at: new Date().toISOString(),
      };
      const mockPaymentToken = `MOCK-PAY-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
      return NextResponse.json({
        success: true,
        order: mockOrder,
        payment_token: mockPaymentToken,
        payment_url: null, // nanti isi dari Midtrans Snap
      });
    }

    const { createSupabaseAdmin } = await import('@/lib/supabase');
    const supabase = createSupabaseAdmin();

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id,
        service_type: orderData.service_type,
        status: 'WAITING_PAYMENT',
        booking_address: orderData.booking_address,
        estimated_price: orderData.estimated_price,
        geo_location: `POINT(${orderData.geo_location.lng} ${orderData.geo_location.lat})`,
        catatan: orderData.catatan ?? null,
        scheduled_at: orderData.scheduled_at ?? null,
      })
      .select()
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Gagal membuat pesanan' }, { status: 500 });
    }

    const gatewayRef = `MOCK-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    const { error: escrowError } = await supabase.from('escrow_transactions').insert({
      order_id: order.id,
      payment_gateway_ref: gatewayRef,
      amount_held: order.estimated_price,
      payment_status: 'PENDING',
    });

    if (escrowError) {
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json({ error: 'Gagal inisiasi escrow' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      order,
      payment_token: gatewayRef,
      payment_url: null, // swap dengan Midtrans Snap URL
    });
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
