import { z } from 'zod';

export const AuthSchema = {
  login: z.object({
    phone: z.string().regex(/^\d{9,15}$/, 'Nomor HP tidak valid'),
  }),
  registerMitra: z.object({
    nama: z.string().min(3, 'Nama minimal 3 karakter'),
    hp: z.string().regex(/^\d{9,15}$/, 'Nomor HP tidak valid'),
    kota: z.string().min(2, 'Kota wajib diisi'),
    keahlian: z.enum(['ac', 'ledeng', 'kebersihan', 'listrik', 'lainnya']),
    pengalaman: z.string().min(1, 'Pengalaman wajib dipilih'),
    rekening: z.string().min(5, 'Nomor rekening tidak valid'),
    setuju: z.literal(true, { message: 'Wajib setuju syarat & ketentuan' }),
  }),
};

export const OrderSchema = {
  create: z.object({
    service_type: z.string().min(1),
    booking_address: z.string().min(5),
    geo_location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    estimated_price: z.number().positive(),
    customer_id: z.string().uuid(),
  }),
};
