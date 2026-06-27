import { NextRequest, NextResponse } from 'next/server';
import { AuthSchema } from '@/lib/validators';
import { createSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const body = {
      nama: formData.get('nama'),
      hp: formData.get('hp'),
      kota: formData.get('kota'),
      keahlian: formData.get('keahlian'),
      pengalaman: formData.get('pengalaman'),
      rekening: formData.get('rekening'),
      setuju: formData.get('setuju') === 'on' || formData.get('setuju') === 'true',
    };

    const result = AuthSchema.registerMitra.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Input tidak valid', details: result.error.format() }, { status: 400 });
    }

    const ktpFile = formData.get('ktp') as File;
    const profesiFile = formData.get('foto_profesi') as File;

    if (!ktpFile || !profesiFile) {
      return NextResponse.json({ error: 'Dokumen KYC (KTP & Foto Profesi) wajib diunggah' }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    
    // Cek duplikasi nomor HP
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('phone_number', body.hp)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'Nomor HP sudah terdaftar' }, { status: 409 });
    }

    // Buat User record
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        phone_number: body.hp,
        full_name: body.nama,
        role: 'MITRA',
      })
      .select()
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'Gagal membuat akun mitra' }, { status: 500 });
    }

    // Mock upload KYC file ke storage (bila storage belum di-config secara real)
    const mockKycDocs = {
      ktp_name: ktpFile.name,
      profesi_name: profesiFile.name,
      uploaded_at: new Date().toISOString(),
    };

    // Buat Profil Mitra
    const { error: profileError } = await supabase
      .from('mitra_profiles')
      .insert({
        user_id: user.id,
        services_offered: [body.keahlian],
        is_verified: false,
        kyc_documents: mockKycDocs,
        is_online: false,
      });

    if (profileError) {
      // Cleanup user
      await supabase.from('users').delete().eq('id', user.id);
      return NextResponse.json({ error: 'Gagal menyimpan profil mitra' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Pendaftaran berhasil, menunggu verifikasi Admin' });
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
