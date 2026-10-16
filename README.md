# Pita CV 🎀 — Pembuat CV & Surat Lamaran Gratis (Next.js + Tailwind)

Website yang dibutuhkan banyak orang: buat CV rapi dan surat lamaran dalam hitungan menit.

## Fitur
- Pratinjau langsung (A4) saat mengetik, di HP ada tombol Edit / Pratinjau
- 3 template (Manis, Klasik ramah-ATS, Modern) × 6 warna
- Foto profil (otomatis dipotong persegi & dikecilkan, hanya di browser)
- Pengalaman, pendidikan, skill (dengan saran), bahasa, sertifikat; urutan bisa digeser
- Generator surat lamaran otomatis dari data CV, bisa diedit
- Skor kelengkapan CV + daftar periksa
- Unduh PDF lewat cetak browser (teks tetap bisa dipilih & dibaca sistem ATS)
- Data tersimpan otomatis di browser, bisa diekspor/diimpor sebagai JSON

## Menjalankan
```bash
npm install
npm run dev     # http://localhost:3000
```

## Deploy gratis
Push ke GitHub lalu import di https://vercel.com.

## Struktur
- `lib/` data contoh, pembuat surat, skor, helper format, hook localStorage
- `components/templates/` template CV & surat
- `components/Editor.js` semua form isian
- `components/Builder.js` halaman utama
