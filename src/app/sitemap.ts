import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tukangexpress.id';
  const now = new Date();

  const publicPages = [
    { url: base, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/layanan`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/cara-kerja`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/fitur`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/harga`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/daftar-mitra`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/panduan-mitra`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/tentang`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${base}/blog`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${base}/kontak`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${base}/syarat`, priority: 0.4, changeFrequency: 'yearly' as const },
    { url: `${base}/privasi`, priority: 0.4, changeFrequency: 'yearly' as const },
  ];

  return publicPages.map((p) => ({ ...p, lastModified: now }));
}
