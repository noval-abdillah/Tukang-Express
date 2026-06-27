/**
 * @file src/app/blog/page.tsx
 * Halaman Blog — artikel tips & informasi layanan.
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog & Artikel',
  description: 'Tips perawatan rumah, panduan servis AC, dan informasi terbaru dari Tukang Express.',
};

const ARTICLES = [
  {
    slug: 'cara-merawat-ac-rumah',
    title: 'Cara Merawat AC Rumah Agar Awet dan Hemat Listrik',
    excerpt: 'AC yang jarang dirawat bisa boros listrik hingga 30% lebih boros. Berikut panduan perawatan AC yang bisa Anda lakukan sendiri dan kapan harus memanggil teknisi.',
    category: 'Servis AC',
    readTime: '5 menit',
    img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=360&fit=crop&auto=format&q=75',
    date: '10 Juni 2026',
  },
  {
    slug: 'tanda-pipa-air-bocor',
    title: '7 Tanda Pipa Air Rumah Anda Mulai Bocor (Sebelum Terlambat)',
    excerpt: 'Kebocoran pipa yang tidak terdeteksi bisa menyebabkan tagihan air membengkak dan kerusakan struktur rumah. Kenali tanda-tandanya sejak dini.',
    category: 'Ledeng & Pipa',
    readTime: '4 menit',
    img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=360&fit=crop&auto=format&q=75',
    date: '5 Juni 2026',
  },
  {
    slug: 'tips-deep-cleaning-rumah',
    title: 'Panduan Deep Cleaning Rumah: Urutan yang Benar & Efisien',
    excerpt: 'Deep cleaning berbeda dengan cleaning biasa. Temukan urutan yang tepat, area yang sering terlewat, dan produk pembersih yang paling efektif.',
    category: 'Kebersihan',
    readTime: '6 menit',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=360&fit=crop&auto=format&q=75',
    date: '1 Juni 2026',
  },
  {
    slug: 'kenapa-escrow-penting',
    title: 'Kenapa Sistem Escrow Penting Saat Bayar Jasa Online?',
    excerpt: 'Tidak sedikit kasus penipuan jasa online di mana uang sudah dibayar tapi tukang tidak datang. Pelajari bagaimana escrow melindungi Anda.',
    category: 'Tips Aman',
    readTime: '3 menit',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=360&fit=crop&auto=format&q=75',
    date: '28 Mei 2026',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Servis AC':   'bg-blue-100 text-blue-700',
  'Ledeng & Pipa': 'bg-cyan-100 text-cyan-700',
  'Kebersihan':  'bg-green-100 text-green-700',
  'Tips Aman':   'bg-amber-100 text-amber-700',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20 pt-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Blog & Artikel</h1>
          <p className="text-green-100 text-lg">Tips perawatan rumah, panduan jasa, dan informasi terbaru.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {ARTICLES.map((art) => (
              <article key={art.slug} className="group rounded-3xl border border-green-100 overflow-hidden hover:shadow-xl hover:shadow-green-100 transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[art.category] ?? 'bg-gray-100 text-gray-700'}`}>
                    {art.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{art.date}</span>
                    <span>·</span>
                    <span>{art.readTime} baca</span>
                  </div>
                  <h2 className="font-black text-green-900 text-lg mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {art.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">{art.excerpt}</p>
                  <Link
                    href={`/blog/${art.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-500 transition-colors group/link"
                  >
                    Baca Selengkapnya
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center py-10">
        <Link href="/" className="text-green-600 hover:text-green-500 font-medium text-sm">← Kembali ke Beranda</Link>
      </div>
    </main>
  );
}
