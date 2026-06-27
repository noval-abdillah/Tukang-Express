# Product Requirement Document (PRD) - Tukang Express (MVP V1.0)

## 1. Ringkasan Proyek & Tujuan (Overview & Objectives)
### 1.1 Latar Belakang
Mencari penyedia jasa rumah tangga (servis AC, ledeng, kebersihan, dll.) di Indonesia saat ini masih didominasi oleh metode konvensional seperti rekomendasi tetangga atau grup Facebook. Metode ini memiliki risiko tinggi terkait keamanan, keandalan, ketidakpastian harga, dan penyedia jasa yang tidak terverifikasi.

### 1.2 Solusi
**Tukang Express** hadir sebagai *two-sided on-demand local service marketplace* terverifikasi. Aplikasi ini menghubungkan Pengguna (Customer) dengan Penyedia Jasa (Mitra Tukang) secara real-time dengan sistem pencarian berbasis lokasi, estimasi harga otomatis, dan sistem pembayaran yang aman menggunakan *escrow* (rekening bersama).

### 1.3 Tujuan MVP (Minimum Viable Product)
Membangun platform inti yang aman, fungsional, dan berskala modular untuk menguji validasi pasar di area urban utama, dengan fokus pada kemudahan implementasi arsitektur bagi pengembang tunggal (*solo creator*).

---

## 2. Pengguna Target & Peran (User Personas & Roles)
1. **Pengguna (Customer):** Masyarakat urban (rumah tangga/apartemen) yang membutuhkan jasa perawatan atau perbaikan rumah cepat, transparan, dan terpercaya.
2. **Mitra (Service Provider):** Pekerja sektor informal atau teknisi lokal yang ingin meningkatkan visibilitas, jangkauan pelanggan, dan kepastian pembayaran.
3. **Admin (Platform Owner):** Mengelola verifikasi mitra, memantau transaksi escrow, menangani sengketa (*dispute*), dan mengelola manajemen konten.

---

## 3. Fitur Utama & Ruang Lingkup (Key Features & Scope)

### 3.1 Sisi Pengguna (Customer App)
* **Otentikasi Mudah:** Login/Register via Nomor HP (OTP) atau Google Auth.
* **Manajemen Lokasi:** Integrasi *Geolocation API* untuk mendeteksi lokasi otomatis dan menyimpan beberapa alamat (Rumah, Kantor, dll.).
* **Modul Pemesanan (Booking Engine):**
  * Memilih kategori jasa (Servis AC, Kebersihan, Perbaikan Rumah).
  * Mengisi form detail kendala (deskripsi teks, jumlah unit, unggah foto).
  * Opsi pemesanan "Sekarang" atau "Jadwalkan Nanti".
* **Kalkulator Estimasi Biaya:** Penghitungan otomatis berbasis jarak, kuantitas unit, dan jenis kerusakan dasar sebelum konfirmasi order.
* **Sistem Pembayaran Escrow:** Integrasi dengan *Payment Gateway* untuk menahan dana pengguna hingga pekerjaan dikonfirmasi selesai.
* **Pelacakan Real-time:** Status penugasan mitra (Menuju Lokasi, Sedang Dikerjakan, Selesai).
* **Komunikasi In-App:** Fitur *Chatting* berbasis teks untuk koordinasi operasional tanpa mengekspos nomor pribadi.
* **Sistem Rating & Ulasan:** Memberikan penilaian 1-5 bintang serta ulasan tekstual setelah proyek selesai.

### 3.2 Sisi Mitra (Mitra App)
* **Registrasi & KYC Digital:** Mengunggah dokumen identitas (KTP), foto profil, dan sertifikasi/keahlian untuk proses kurasi admin.
* **Dashboard Kinerja & Pendapatan:** Grafik ringkasan pendapatan harian/mingguan, ulasan performa, dan saldo dompet digital.
* **Manajemen Ketersediaan (Availability Toggle):** Tombol *Online/Offline* untuk mulai menerima atau mengabaikan penawaran orderan masuk secara real-time.
* **Sistem Manajemen Order:** Menerima notifikasi *pop-up* pesanan masuk (berisi detail jarak, jenis kerja, dan tarif) dengan batas waktu respons (misal: 30 detik).
* **Alur Eksekusi Tugas:** Navigasi rute ke lokasi customer dan tombol update status pekerjaan.
* **Input Biaya Tambahan (Add-on Cost):** Fitur untuk mengajukan biaya material ekstra yang memerlukan *approval* digital langsung dari sisi Customer.
* **Fitur Penarikan Dana (Withdrawal):** Pencairan dana dari dompet digital aplikasi ke rekening bank lokal terdaftar.
* **Sistem Premium Subscription:** Opsi berlangganan paket premium untuk menaikkan peringkat visibilitas di radar pencarian pengguna.

---

## 4. Arsitektur Teknis & Alur Data (Technical Flow & States)

### 4.1 Tech Stack Rekomendasi
* **Frontend:** React Native (Cross-platform iOS & Android), React Navigation, Expo (opsional untuk percepatan MVP).
* **Backend:** Node.js (Express atau NestJS) / Supabase (untuk percepatan *database* dan *real-time subscription*).
* **Database:** PostgreSQL (mendukung ekstensi PostGIS untuk query lokasi/geospatial).
* **Payment Gateway:** Midtrans / Xendit (mendukung transfer, e-wallet, dan fitur hold/escrow dana).
* **Maps & Location:** Google Maps API / Mapbox (Geolocation & Reverse Geocoding).

### 4.2 State Machine Manajemen Pesanan (Order States Enum)
Untuk menjaga konsistensi data, alur pesanan diatur oleh status berikut:
```
[WAITING_PAYMENT] -> Pengguna membuat order, menunggu pembayaran diverifikasi gateway.
       |
[SEARCHING_MITRA] -> Pembayaran masuk ke escrow, sistem memancarkan order ke mitra terdekat.
       |
[MITRA_FOUND]     -> Mitra menerima pesanan, detail mitra dikirim ke customer.
       |
[ON_THE_WAY]      -> Mitra bergerak menuju lokasi customer.
       |
[IN_PROGRESS]     -> Pekerjaan mulai dieksekusi di lokasi.
       |
[AWAITING_CONFIRM]-> Pekerjaan selesai menurut mitra, menunggu persetujuan customer.
       |
[COMPLETED]       -> Customer konfirmasi selesai, dana escrow cair ke saldo mitra, open review.
       |
[CANCELLED]       -> Pesanan dibatalkan (dana dikembalikan ke customer jika status belum dikerjakan).
```

---

## 5. Struktur Basis Data Inti (Core Database Schema)

### 5.1 Tabel `users`
* `id` (UUID, PK)
* `phone_number` (String, Unique)
* `email` (String)
* `full_name` (String)
* `role` (Enum: 'CUSTOMER', 'MITRA', 'ADMIN')
* `created_at` (Timestamp)

### 5.2 Tabel `mitra_profiles`
* `id` (UUID, PK)
* `user_id` (UUID, FK -> users.id)
* `services_offered` (Array/JSON - kategori jasa yang dikuasai)
* `is_verified` (Boolean, Default: false)
* `kyc_documents` (JSON - link KTP, Sertifikat)
* `is_online` (Boolean, Default: false)
* `current_location` (Point/Geography - koordinat terakhir)
* `is_premium` (Boolean, Default: false)

### 5.3 Tabel `orders`
* `id` (UUID, PK)
* `customer_id` (UUID, FK -> users.id)
* `mitra_id` (UUID, FK -> users.id, Nullable)
* `service_type` (String)
* `status` (Enum - sesuai Order States)
* `booking_address` (Text)
* `geo_location` (Point/Geography)
* `estimated_price` (Decimal)
* `additional_price` (Decimal, Default: 0)
* `created_at` (Timestamp)

### 5.4 Tabel `escrow_transactions`
* `id` (UUID, PK)
* `order_id` (UUID, FK -> orders.id)
* `payment_gateway_ref` (String)
* `amount_held` (Decimal)
* `payment_status` (Enum: 'PENDING', 'HELD', 'RELEASED', 'REFUNDED')
* `updated_at` (Timestamp)

---

## 6. Persyaratan Non-Fungsional (Non-Functional Requirements)
* **Keamanan:** Data identitas (KTP) pada modul KYC wajib dienkripsi saat disimpan di storage (S3/Cloud Storage) dan hanya dapat diakses oleh Admin.
* **Performa Lokasi:** Background tracking untuk koordinasi lokasi mitra wajib dioptimalkan agar tidak menguras baterai perangkat secara berlebihan (*battery-efficient geofencing*).
* **Keamanan Escrow:** Integrasi webhook pembayaran harus divalidasi silang menggunakan tanda tangan kriptografi (*Signature Key*) resmi dari penyedia Payment Gateway untuk mencegah manipulasi data transaksi.

---

## 7. Rencana Rilis & Pengembangan Masa Depan (Future Roadmap)
* **Fase 1 (MVP):** Peluncuran 3 kategori jasa utama (AC, Ledeng, Bersih-bersih) dengan sistem manual-verifikasi KYC mitra dan radius pencarian maksimal 10 km.
* **Fase 2:** Optimalisasi algoritma alokasi otomatis (Auto-assignment) berbasis kombinasi rating mitra terkecil dan jarak paling optimal.
* **Fase 3:** Implementasi sistem asuransi kerusakan properti bawaan untuk proteksi protektif ekstra bagi kedua belah pihak.