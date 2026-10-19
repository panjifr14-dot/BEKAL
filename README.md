# BEKAL — Behavior-Based Kitchen Lifecycle Management 🌱

A mobile-first web application designed to eliminate domestic food waste, protect households from supermarket overbuy/promo traps, and connect surplus ingredients to local culinary MSMEs (*Warung Rescue Network*).

---

## 📱 Fitur Utama & 8 Layar Spesifikasi UI/UX

Aplikasi ini mengintegrasikan seluruh 8 spesifikasi desain antarmuka ke dalam satu alur aplikasi web interaktif yang mulus:

1. **Onboarding (`#onboarding`) — Kenalan dengan BEKAL**
   - Hero visual kitchen lifestyle dengan estimasi penghematan (Hemat Rp 150rb+/bln).
   - 3 pilar fitur: *Smart Risk Detector (AI)*, *Anti-Promo Trap (Cermat)*, *Warung Rescue Network (Lokal)*.
   - Aksi langsung: *Mulai Sekarang* (Daftar), *Masuk*, atau *Lewati* (masuk langsung ke Beranda).

2. **Daftar / Registrasi (`#daftar`) — Bergabung dengan BEKAL**
   - Registrasi cepat melalui Google & Apple.
   - Form lengkap: Nama, Email validasi aktif, Kata Sandi dengan meteran kekuatan sandi (*Lemah*, *Sedang*, *Kuat*).
   - Personalisasi Tipe Rumah Tangga interaktif: *Solo / Kos*, *Keluarga Kecil (2–3 Orang)*, dan *Keluarga Besar (4+ Orang)*.
   - Komitmen pengurangan food waste terenkripsi.

3. **Masuk / Autentikasi (`#masuk`) — Akun BEKAL**
   - Input email / no. HP & sandi dengan tombol *toggle visibility* (mata).
   - Simulasi otentikasi biometrik (*Face ID / Sidik Jari*) dengan animasi verifikasi.
   - Banner edukasi kulkas bebas sampah.

4. **Beranda (`#beranda`) — Food Risk Dashboard**
   - Kartu Bento Ringkasan Food Risk dengan *Skor Dapur Sehat* (gauge lingkaran 78 Prima).
   - 3 Pilar Risiko: *Risiko Tinggi (3)*, *Risiko Sedang (5)*, *Aman (12)* dengan aksi filter interaktif.
   - Daftar Bahan Kritis (*Tomat Segar Risk 85*, *Daging Ayam Fillet Risk 80*, *Susu UHT Risk 45*) dilengkapi tombol **Masak** langsung.
   - Widget Eco Impact Pekan Ini (84% terselamatkan, hemat Rp 128.500).
   - 4 Aksi Cepat: *Cek Promo*, *Scan Belanja (OCR)*, *Rescue Recipe*, *Salurkan Lebih*.
   - Rekomendasi Menu Hari Ini: *Ayam Saus Tomat Gurih* (25 mnt, selamatkan 2 bahan).

5. **Inventaris & Pindai (`#inventaris-pindai`) — Promo Trap Detector**
   - Segmented tab: *Input Manual* vs *Pindai Brosur / Link*.
   - Kartu Rencana Pembelian (Tomat Merah Segar diskon -40%).
   - Live Stepper (`-` dan `+` per 0.5 kg) yang secara dinamis menghitung:
     - Biaya promo vs harga normal.
     - Ambang batas konsumsi rumah tangga (0,6 kg / minggu).
     - Deteksi risiko *Overbuy*: Potensi Boncos (Rugi Rp...), Masa simpan (8-10 hari).
     - Deteksi *Kuantitas Aman* (0% kemungkinan limbah).
   - Rekomendasi porsi ideal (1,2 kg) dengan tombol *one-tap* sesuaikan.
   - Accordion ide resep awetan (Saus Marinara & Sun-Dried Tomatoes).
   - Simulator OCR kamera struk belanja.

6. **Resep Penyelamat (`#resep-penyelamat`) — Rescue Recipe**
   - Banner Peringatan 2 Bahan Kritis yang harus diolah hari ini.
   - Filter chips interaktif: *Semua*, *Masak Cepat (< 20 mnt)*, *Budget Hemat*, *Cocok Keluarga*.
   - Kartu Resep lengkap dengan kecocokan bahan kulkas:
     - *Sambal Tomat Terasi & Ayam Suwir* (Score 85, Prioritas Utama).
     - *Semur Ayam Tomat Manis Gurih* (Score 80).
     - *Tumis Bayam Bawang Putih Kuah Bening* (Score 60).
   - Modal Asisten Memasak (*Cooking Assistant*) interaktif dengan checklist bahan, tahapan memasak, timer countdown (15 menit), dan tombol *Selesai Masak* yang otomatis memotong stok kulkas dan menambah +50 XP.

7. **Peta Distribusi (`#donasi-pangan`) — Warung Rescue Network**
   - Peta visual interaktif dengan pin-pin mitra terdekat (*Warung Makan Bu Sari*, *Dapur Nusa Catering*, *Komunitas Berbagi*, *Kedai Kopi*).
   - Selector stok bahan berlebih (Tomat 2.0 kg, Ayam 0.5 kg, Bayam 2 ikat) yang secara dinamis memperbarui persentase kecocokan mitra.
   - Aksi ganda: **Donasi (Gratis)** dan **Jual Murah (-60%)**.
   - Simulator pelacakan kurir relawan penjemputan bahan (*Live Dispatch Tracker*).

8. **Profil Dampak (`#profil-dampak`) — Eco Impact Report**
   - Kartu identitas Andi Pratama, Level 4 (*Zero-Waste Warrior*), Progres XP ke Level 5.
   - Bento grid statistik: 18,4 kg pangan terselamatkan, Rp 685.000 dihemat, 46 kg CO₂e emisi dicegah, 12 mitra UMKM terbantu.
   - Grafik interaktif efisiensi bulanan (Jan 68%, Feb 82%, Mar 94%) dengan keterangan dinamis per bulan.
   - 3 Lencana *Pantry Passport Badges* (*Anti-Promo Trap*, *Rescue Chef*, *Pahlawan Warung*).
   - Bagikan laporan dampak ke Instagram Story (dengan pratinjau kartu story 9:16).
   - Pengaturan: Preferensi masak, Toggle Alarm Kedaluwarsa Dapur (H-3 & H-1), integrasi merchant, dan unduh PDF rekap karbon.

---

## 🛠️ Arsitektur & Teknologi

- **Framework**: Vite + Vanilla JS (Modern Modular ES Modules)
- **Styling**: Tailwind CSS dengan custom design system Material 3 tokens (`surface`, `primary`, `secondary-container`, `space-lg`, dll.)
- **Tipografi**: *Plus Jakarta Sans* (Google Fonts) & *Material Symbols Outlined*
- **Tampilan Desktop**: Dilengkapi bingkai simulator perangkat (*iPhone 16 Pro mockup frame*) dengan status bar, notch kamera dinamis, serta toolbar peralihan cepat ke mode Layar Penuh (*Fullscreen responsive*) dan Dark/Light Mode.

---

## 🚀 Menjalankan Aplikasi Secara Lokal

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Jalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Akses di browser pada: `http://localhost:5173/`

### 3. Build untuk Produksi
```bash
npm run build
```
Hasil build akan tersimpan di direktori `dist/`.
