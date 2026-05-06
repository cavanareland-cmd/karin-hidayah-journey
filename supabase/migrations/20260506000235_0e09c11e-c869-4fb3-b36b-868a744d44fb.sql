
CREATE TABLE public.category_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL UNIQUE,
  hero jsonb NOT NULL DEFAULT '{}'::jsonb,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  extra jsonb NOT NULL DEFAULT '{}'::jsonb,
  cta jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.category_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active category pages"
ON public.category_pages FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage category_pages"
ON public.category_pages FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER category_pages_updated_at
BEFORE UPDATE ON public.category_pages
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.category_pages;
ALTER TABLE public.category_pages REPLICA IDENTITY FULL;

-- Seed data
INSERT INTO public.category_pages (page_key, hero, items, features, extra, cta) VALUES
('manasik-umrah',
 '{"badge":"Bimbingan Manasik","title":"Manasik Umrah","description":"Pelajari tata cara umrah dengan bimbingan ustadz berpengalaman. Manasik lengkap & praktis untuk persiapan ibadah Anda.","button_text":"Daftar Manasik","whatsapp_text":"Saya ingin daftar Manasik Umrah","secondary_button_text":"Lihat Paket","secondary_button_link":"/umrah-packages"}'::jsonb,
 '[]'::jsonb,'[]'::jsonb,'{}'::jsonb,
 '{"title":"Siap Menuju Tanah Suci?","description":"Hubungi kami untuk informasi jadwal manasik berikutnya.","button_text":"Hubungi Kami Sekarang","whatsapp_text":"Saya ingin info Manasik Umrah"}'::jsonb),
('perlengkapan-ibadah',
 '{"badge":"Perlengkapan Ibadah","title":"Perlengkapan Ibadah","description":"Lengkapi perjalanan ibadah Anda dengan perlengkapan berkualitas tinggi.","button_text":"Pesan Sekarang","whatsapp_text":"Saya ingin pesan Perlengkapan Ibadah","secondary_button_text":"","secondary_button_link":""}'::jsonb,
 '[]'::jsonb,'[]'::jsonb,'{}'::jsonb,
 '{"title":"Siapkan Ibadah Anda dengan Lengkap","description":"Hubungi kami untuk pemesanan perlengkapan ibadah.","button_text":"Hubungi Kami Sekarang","whatsapp_text":"Saya ingin pesan Perlengkapan Ibadah"}'::jsonb),
('e-guide-materi',
 '{"badge":"E-Guide & Materi Digital","title":"E-Guide & Materi","description":"Pelajari ibadah umrah & haji kapan saja melalui materi digital lengkap.","button_text":"Dapatkan Materi","whatsapp_text":"Saya ingin mendapatkan E-Guide & Materi","secondary_button_text":"Lihat Manasik Umrah","secondary_button_link":"/kategori/manasik-umrah"}'::jsonb,
 '[]'::jsonb,'[]'::jsonb,'{}'::jsonb,
 '{"title":"Siap Belajar Ibadah dengan Lebih Mudah?","description":"Hubungi kami untuk akses materi digital lengkap.","button_text":"Hubungi Kami Sekarang","whatsapp_text":"Saya ingin mendapatkan E-Guide & Materi"}'::jsonb),
('aktivitas-jamaah',
 '{"badge":"Komunitas Jamaah","title":"Aktivitas Jamaah","description":"Bergabunglah dengan komunitas jamaah Karin Hidayah Tour.","button_text":"Gabung Komunitas","whatsapp_text":"Saya ingin bergabung dengan Aktivitas Jamaah","secondary_button_text":"Lihat Galeri","secondary_button_link":"/gallery"}'::jsonb,
 '[]'::jsonb,'[]'::jsonb,'{}'::jsonb,
 '{"title":"Yuk, Jadi Bagian dari Keluarga Besar Kami!","description":"Bergabunglah dengan ribuan jamaah lain.","button_text":"Hubungi Kami Sekarang","whatsapp_text":"Saya ingin bergabung dengan Aktivitas Jamaah"}'::jsonb);
