import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'Tukang Express — Jasa Rumah On-Demand';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: 'linear-gradient(135deg, #22c55e, #10b981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
            }}
          >
            🔧
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: '#14532d' }}>
            TukangExpress
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#166534', fontWeight: 600, textAlign: 'center', maxWidth: 800 }}>
          Jasa Rumah On-Demand — Terdekat & Terverifikasi
        </div>
        <div style={{ fontSize: 20, color: '#4ade80', marginTop: 16 }}>
          Servis AC · Ledeng · Kebersihan · Listrik
        </div>
      </div>
    ),
    size
  );
}
