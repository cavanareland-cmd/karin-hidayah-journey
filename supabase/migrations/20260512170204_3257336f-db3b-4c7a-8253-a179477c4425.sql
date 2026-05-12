-- Seed about_us_content default sections (only insert if section_key not present)
INSERT INTO public.about_us_content (section_key, title, content, image_url, stats, order_index, is_active)
SELECT v.section_key, v.title, v.content, v.image_url, v.stats::jsonb, v.order_index, true
FROM (VALUES
  ('hero', 'Tentang Kami', 'Melayani perjalanan ibadah dengan penuh amanah sejak 2010', NULL, 'null', 1),
  ('profile', 'Karin Hidayah Tour',
    E'Karin Hidayah Tour adalah perusahaan travel haji dan umrah yang berdiri sejak tahun 2010. Berawal dari keinginan untuk memberikan pelayanan terbaik bagi umat Islam Indonesia yang ingin menunaikan ibadah ke Tanah Suci, kami terus berkembang dan telah memberangkatkan lebih dari 10.000 jamaah ke Makkah dan Madinah.\n\nDengan izin resmi dari Kementerian Agama RI dan dukungan tim profesional yang berpengalaman, kami berkomitmen untuk menjadi mitra perjalanan ibadah yang amanah, profesional, dan terpercaya.',
    NULL, 'null', 2),
  ('stats', 'Statistik', NULL, NULL,
    '[{"value":"14+","label":"Tahun Pengalaman"},{"value":"10K+","label":"Jamaah Dilayani"},{"value":"50+","label":"Staff Profesional"},{"value":"100%","label":"Kepuasan Jamaah"}]',
    3),
  ('vision', 'Visi',
    'Menjadi travel haji dan umrah terdepan di Indonesia yang memberikan pengalaman ibadah terbaik dengan pelayanan berkelas internasional, sehingga setiap jamaah dapat menjalankan ibadah dengan khusyuk dan bermakna.',
    NULL, 'null', 4),
  ('mission', 'Misi', NULL, NULL,
    '["Memberikan pelayanan prima dari pendaftaran hingga kepulangan","Menyediakan akomodasi dan transportasi berkualitas tinggi","Menghadirkan pembimbing ibadah yang kompeten dan berpengalaman","Menjaga transparansi dan amanah dalam setiap layanan"]',
    5),
  ('values', 'Nilai-Nilai Kami', 'Nilai-nilai yang menjadi fondasi dalam setiap pelayanan kami', NULL,
    '[{"icon":"Heart","title":"Amanah","description":"Menjaga kepercayaan jamaah dengan pelayanan terbaik dan transparan"},{"icon":"Award","title":"Profesional","description":"Standar layanan tinggi dengan tim yang berpengalaman dan terlatih"},{"icon":"Shield","title":"Terpercaya","description":"Legalitas lengkap dan track record perjalanan yang terbukti aman"},{"icon":"Users","title":"Kekeluargaan","description":"Melayani jamaah seperti keluarga sendiri dengan penuh kasih sayang"}]',
    6),
  ('cta', 'Hubungi Kami', 'Siap membantu Anda merencanakan perjalanan ibadah yang berkesan', NULL, 'null', 7)
) AS v(section_key, title, content, image_url, stats, order_index)
WHERE NOT EXISTS (
  SELECT 1 FROM public.about_us_content a WHERE a.section_key = v.section_key
);