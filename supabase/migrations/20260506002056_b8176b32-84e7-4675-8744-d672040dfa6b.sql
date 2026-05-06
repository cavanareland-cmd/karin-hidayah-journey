
UPDATE public.category_pages SET items = '[
  {"icon":"BookOpen","no":"01","title":"Niat & Ihram","description":"Memulai ihram dari miqat dengan niat umrah, mengenakan pakaian ihram, dan membaca talbiyah."},
  {"icon":"BookOpen","no":"02","title":"Thawaf","description":"Mengelilingi Kabah sebanyak 7 putaran dimulai dari Hajar Aswad dengan penuh khusyuk."},
  {"icon":"BookOpen","no":"03","title":"Sai","description":"Berjalan dan berlari kecil antara bukit Shafa dan Marwah sebanyak 7 kali putaran."},
  {"icon":"BookOpen","no":"04","title":"Tahallul","description":"Mencukur atau memendekkan rambut sebagai tanda berakhirnya ibadah umrah."}
]'::jsonb,
features = '["Bimbingan langsung oleh ustadz berpengalaman","Materi lengkap manasik dari niat hingga tahallul","Simulasi thawaf & sai sebelum keberangkatan","Buku panduan & doa-doa umrah eksklusif","Konsultasi pribadi seputar ibadah & teknis","Sertifikat manasik untuk setiap peserta"]'::jsonb,
extra = '{"schedule_title":"Susunan Sesi Manasik","schedule_subtitle":"Empat sesi pembekalan untuk memastikan Anda paham setiap detail ibadah umrah.","schedule":[{"day":"Sesi 1","topic":"Pengenalan Umrah & Persiapan Mental Spiritual"},{"day":"Sesi 2","topic":"Tata Cara Ihram, Niat & Larangan Ihram"},{"day":"Sesi 3","topic":"Praktik Thawaf, Sai, dan Tahallul"},{"day":"Sesi 4","topic":"Doa-doa Mustajab & Adab di Tanah Suci"}],"stats":[{"icon":"Users","value":"5.000+","label":"Jamaah Terbimbing"},{"icon":"BookOpen","value":"4 Sesi","label":"Materi Lengkap"},{"icon":"Sparkles","value":"15+","label":"Ustadz Pembimbing"},{"icon":"MapPin","value":"20+","label":"Kota Pelaksanaan"}]}'::jsonb
WHERE page_key='manasik-umrah';

UPDATE public.category_pages SET items = '[
  {"icon":"Shirt","title":"Pakaian Ihram","description":"Kain ihram berkualitas tinggi, nyaman, dan sesuai syariat.","items":["Bahan handuk premium","Ukuran lengkap","Tahan lama"]},
  {"icon":"Briefcase","title":"Tas & Koper","description":"Tas dan koper khusus jamaah dengan desain praktis.","items":["Koper trolley","Tas selempang","Tas paspor"]},
  {"icon":"Heart","title":"Perlengkapan Sholat","description":"Sajadah, mukena, dan tasbih kualitas terbaik.","items":["Sajadah travel","Mukena katun","Tasbih digital"]},
  {"icon":"Package","title":"Aksesoris Lainnya","description":"Aksesoris pendukung ibadah Anda.","items":["Sabuk ihram","Sandal jepit","Kantong sandal"]}
]'::jsonb,
features = '["Produk berkualitas premium","Harga bersaing & terjangkau","Stok selalu tersedia","Pengiriman ke seluruh Indonesia","Garansi produk original","Konsultasi pemilihan perlengkapan"]'::jsonb,
extra = '{"bundle_title":"Paket Bundling Lengkap","bundle_description":"Hemat lebih banyak dengan paket lengkap perlengkapan ibadah.","bundle_items":["Kain ihram premium","Tas & koper set","Sajadah & mukena","Aksesoris lengkap"],"bundle_button_text":"Pesan Paket Bundling","bundle_whatsapp_text":"Saya ingin pesan Paket Bundling Perlengkapan Ibadah"}'::jsonb
WHERE page_key='perlengkapan-ibadah';

UPDATE public.category_pages SET items = '[
  {"icon":"FileText","title":"E-Book Panduan Umrah","description":"Panduan lengkap dalam format PDF — dari persiapan hingga pulang ke tanah air.","items":["Persiapan dokumen","Tata cara ibadah","Doa & dzikir harian"]},
  {"icon":"PlayCircle","title":"Video Tutorial Manasik","description":"Video HD step-by-step manasik umrah & haji dengan narasi ustadz pembimbing.","items":["Simulasi thawaf & sai","Praktik ihram","Adab di Tanah Suci"]},
  {"icon":"Headphones","title":"Audio Doa & Talbiyah","description":"Rekaman audio talbiyah, doa-doa, dan dzikir untuk dihafalkan kapan saja.","items":["Talbiyah lengkap","Doa thawaf 7 putaran","Doa multazam"]},
  {"icon":"Smartphone","title":"Aplikasi Mobile Jamaah","description":"Akses semua materi e-guide di smartphone Anda, online maupun offline.","items":["Mode offline","Reminder ibadah","Peta interaktif"]}
]'::jsonb,
features = '["Materi disusun oleh ustadz berpengalaman","Format lengkap: PDF, Video, Audio, & Mobile App","Update materi gratis seumur hidup","Akses kapan saja & di mana saja","Bahasa Indonesia mudah dipahami","Bonus doa-doa pilihan & dzikir harian"]'::jsonb,
extra = '{"bundle_title":"Paket E-Guide Lengkap","bundle_description":"Dapatkan akses penuh ke seluruh materi digital kami dalam satu paket spesial.","bundle_items":["5+ E-Book Panduan","20+ Video Tutorial HD","50+ Audio Doa & Dzikir","Akses Aplikasi Mobile"],"bundle_button_text":"Pesan Sekarang","bundle_whatsapp_text":"Saya ingin Paket E-Guide Lengkap"}'::jsonb
WHERE page_key='e-guide-materi';

UPDATE public.category_pages SET items = '[
  {"icon":"Users","title":"Pengajian & Kajian","description":"Kajian rutin bersama ustadz pembimbing untuk memperdalam ilmu sebelum keberangkatan.","items":["Kajian mingguan","Tafsir Al-Quran","Fiqih ibadah"]},
  {"icon":"Heart","title":"Silaturahmi Jamaah","description":"Acara temu jamaah untuk membangun ukhuwah Islamiyah antar peserta.","items":["Gathering bulanan","Buka puasa bersama","Halal bi halal"]},
  {"icon":"MapPin","title":"City Tour Tanah Suci","description":"Kunjungan ziarah ke tempat-tempat bersejarah Islam di Makkah & Madinah.","items":["Jabal Nur","Jabal Uhud","Masjid Quba"]},
  {"icon":"Camera","title":"Dokumentasi Perjalanan","description":"Tim dokumentasi profesional mengabadikan momen ibadah Anda.","items":["Foto grup harian","Video highlight","Album kenangan"]}
]'::jsonb,
features = '["Bimbingan komunitas yang hangat & Islami","Networking dengan sesama jamaah dari berbagai daerah","Akses kegiatan eksklusif sepanjang tahun","Dokumentasi profesional setiap acara","Pengajian gratis untuk seluruh anggota","Kesempatan ikut program sosial & dakwah"]'::jsonb,
extra = '{"events_title":"Jadwal Acara Jamaah","events_subtitle":"Beragam acara rutin yang bisa Anda ikuti sepanjang tahun.","events":[{"date":"Mingguan","title":"Kajian Rutin Calon Jamaah","desc":"Setiap Sabtu malam — pembekalan ilmu & ruhiyah."},{"date":"Bulanan","title":"Gathering Alumni Jamaah","desc":"Reuni dan silaturahmi alumni umrah & haji."},{"date":"Pra-Keberangkatan","title":"Manasik Akbar","desc":"Simulasi lengkap manasik bersama seluruh jamaah."},{"date":"Pasca-Kepulangan","title":"Tasyakuran Jamaah","desc":"Syukuran bersama setelah kembali dari Tanah Suci."}],"stats":[{"icon":"Users","value":"10.000+","label":"Anggota Komunitas"},{"icon":"Calendar","value":"50+","label":"Acara per Tahun"},{"icon":"Heart","value":"100%","label":"Suasana Islami"},{"icon":"Sparkles","value":"15+","label":"Tahun Pengalaman"}]}'::jsonb
WHERE page_key='aktivitas-jamaah';
