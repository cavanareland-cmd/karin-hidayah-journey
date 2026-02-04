-- Create homepage_settings table for hero banner, CTA, etc
CREATE TABLE public.homepage_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  button_text TEXT,
  button_link TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create navigation_menu table for dynamic menu items
CREATE TABLE public.navigation_menu (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  path TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  parent_id UUID REFERENCES public.navigation_menu(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create footer_settings table
CREATE TABLE public.footer_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  content TEXT,
  links JSONB DEFAULT '[]'::jsonb,
  social_links JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.homepage_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for homepage_settings
CREATE POLICY "Anyone can view active homepage settings" 
ON public.homepage_settings 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage homepage settings" 
ON public.homepage_settings 
FOR ALL 
USING (auth.role() = 'authenticated');

-- RLS Policies for navigation_menu
CREATE POLICY "Anyone can view active navigation menu" 
ON public.navigation_menu 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage navigation menu" 
ON public.navigation_menu 
FOR ALL 
USING (auth.role() = 'authenticated');

-- RLS Policies for footer_settings
CREATE POLICY "Anyone can view active footer settings" 
ON public.footer_settings 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage footer settings" 
ON public.footer_settings 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Triggers for updated_at
CREATE TRIGGER update_homepage_settings_updated_at
BEFORE UPDATE ON public.homepage_settings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_navigation_menu_updated_at
BEFORE UPDATE ON public.navigation_menu
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_footer_settings_updated_at
BEFORE UPDATE ON public.footer_settings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert default homepage settings
INSERT INTO public.homepage_settings (section_key, title, subtitle, description, button_text, button_link)
VALUES 
('hero', 'Your next adventure', 'starts here', 'Unique trips to the most fascinating places on Earth', 'Lihat Paket', '/umrah-packages'),
('logo', 'Karin Hidayah Tour', NULL, 'Melayani perjalanan ibadah Haji dan Umrah dengan pelayanan terbaik', NULL, NULL);

-- Insert default navigation menu
INSERT INTO public.navigation_menu (label, path, order_index)
VALUES 
('Beranda', '/', 1),
('Paket Umrah', '/umrah-packages', 2),
('Paket Haji', '/hajj-packages', 3),
('Tentang Kami', '/about-us', 4),
('Galeri', '/gallery', 5),
('Blog', '/blog', 6),
('Kontak', '/contact', 7);

-- Insert default footer settings
INSERT INTO public.footer_settings (section_key, title, content, links, social_links)
VALUES 
('brand', 'Karin Hidayah Tour', 'Melayani perjalanan ibadah Haji dan Umrah dengan pelayanan terbaik, amanah, dan profesional sejak 2010.', NULL, 
'[{"platform": "facebook", "url": "#"}, {"platform": "instagram", "url": "#"}, {"platform": "twitter", "url": "#"}, {"platform": "youtube", "url": "#"}]'::jsonb),
('services', 'Layanan', NULL, 
'[{"label": "Paket Umrah", "url": "/umrah-packages"}, {"label": "Paket Haji", "url": "/hajj-packages"}, {"label": "Visa & Dokumen", "url": "#"}, {"label": "Konsultasi", "url": "/contact"}]'::jsonb, NULL),
('contact', 'Kontak', NULL, 
'[{"type": "phone", "value": "+62 812 3456 7890"}, {"type": "email", "value": "info@karinhidayahtour.com"}, {"type": "address", "value": "Jakarta, Indonesia"}]'::jsonb, NULL);