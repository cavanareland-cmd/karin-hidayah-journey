## Status saat ini

Berdasarkan audit, hampir semua halaman sudah tersinkronisasi:

| Halaman | DB Hook | Admin CMS | Status |
|---|---|---|---|
| Index (Homepage) | section components (HeroSection, ServiceIcons, PrayerTime, Highlights, Featured, Arrangement, Explore, CategoryGrid, Pricing) | AdminHomepage, AdminServiceIcons, AdminPrayerTimes, AdminHighlights, AdminArrangement, AdminExplore, AdminProducts | ✅ Sudah |
| Umrah Packages | useUmrahPackages | AdminUmrahPackages | ✅ Sudah |
| Hajj Packages | useHajjPackages | AdminHajjPackages | ✅ Sudah |
| Blog | useBlogPosts | AdminBlog | ✅ Sudah |
| Gallery | useGalleryItems | AdminGallery | ✅ Sudah |
| Contact | submitContactMessage + useSiteSettings | AdminMessages + AdminSettings | ✅ Sudah |
| PackageDetail | useUmrah/HajjPackageById | (via Admin packages) | ✅ Sudah |
| 4 Category Pages | useCategoryPage | 4 Admin pages | ✅ Sudah (sesi terakhir) |
| **AboutUs** | ❌ HARDCODED | AdminAbout (tabel team_members + about_us_content sudah ada) | ❌ Belum |
| **CategoryDetail** (`/kategori/:slug` generic) | ❌ Placeholder | — | ❌ Belum |
| **Footer** | ❌ Cek | — | ⚠️ Cek |
| **Navbar** | ❌ Cek | — | ⚠️ Cek |

## Yang akan dikerjakan

### 1. AboutUs page → DB
- Refactor `src/pages/AboutUs.tsx` agar 100% dari DB:
  - Hero, Profile, Stats → `about_us_content` (section_key: `hero`, `profile`, `stats`, `vision`, `mission`, `values`, `cta`)
  - Team → `team_members`
- Pastikan AdminAbout sudah mengelola semua field tersebut; kalau belum, perluas editor.

### 2. Footer & Navbar → DB
- `Footer.tsx` baca dari `footer_settings` (sudah ada tabel + AdminSettings? Cek; jika belum ada admin khusus, tambahkan editor di AdminSettings).
- `Navbar.tsx` baca menu dari `navigation_menu`.

### 3. CategoryDetail generic (`/kategori/:slug`)
- Saat ini hanya placeholder. Akan kita arahkan ke `CategoryPageRenderer` jika `page_key` cocok di DB; jika tidak, tampilkan "Belum tersedia".

### 4. Verifikasi & seeding
- Pastikan semua tabel CMS punya minimal 1 baris seed agar halaman publik tidak kosong.
- Verifikasi RLS sudah benar (sudah, dari audit sebelumnya).

## Catatan teknis
- Semua hook baru pakai pola React Query + Realtime channel (mengikuti `useCategoryPage`).
- Tidak ada perubahan schema DB — semua tabel sudah tersedia (`about_us_content`, `team_members`, `footer_settings`, `navigation_menu`).
- Layout & desain frontend tetap identik dengan tampilan sekarang (sesuai memori: "Frontend layouts must be 100% identical").

## Setelah disetujui
Saya kerjakan berurutan: AboutUs → Footer/Navbar → CategoryDetail generic, lalu seed data default jika tabel kosong.