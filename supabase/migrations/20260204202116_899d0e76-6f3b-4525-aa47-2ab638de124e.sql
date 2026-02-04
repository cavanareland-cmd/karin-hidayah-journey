-- Site Settings (WhatsApp, Social Media, etc.)
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Service Icons (Al Quran, Dzikir, etc.)
CREATE TABLE public.service_icons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon_name TEXT NOT NULL,
  label TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Prayer Times Settings
CREATE TABLE public.prayer_times_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location_name TEXT NOT NULL,
  fajr_time TIME,
  fajr_azan TIME,
  zuhr_time TIME,
  zuhr_azan TIME,
  asr_time TIME,
  asr_azan TIME,
  maghrib_time TIME,
  maghrib_azan TIME,
  isha_time TIME,
  isha_azan TIME,
  jumah_time TIME,
  jumah_azan TIME,
  chourouk_time TIME,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Umrah Packages
CREATE TABLE public.umrah_packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Regular',
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  duration_days INTEGER NOT NULL,
  departure_date DATE,
  image_url TEXT,
  facilities JSONB DEFAULT '[]'::jsonb,
  itinerary JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 5.0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Hajj Packages
CREATE TABLE public.hajj_packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Reguler',
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  duration_days INTEGER NOT NULL,
  departure_year INTEGER,
  image_url TEXT,
  facilities JSONB DEFAULT '[]'::jsonb,
  itinerary JSONB DEFAULT '[]'::jsonb,
  visa_type TEXT,
  waiting_period TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- About Us Content
CREATE TABLE public.about_us_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  content TEXT,
  image_url TEXT,
  stats JSONB DEFAULT '[]'::jsonb,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Gallery Items
CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'Umrah',
  media_type TEXT DEFAULT 'image',
  embed_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Blog Posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'Tips',
  author_name TEXT DEFAULT 'Admin',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact Messages
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Highlight Services (Explore our Highlights)
CREATE TABLE public.highlight_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  icon_name TEXT,
  link_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Oleh-oleh',
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Team Members (for About Us)
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  image_url TEXT,
  bio TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_icons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_times_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.umrah_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hajj_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_us_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlight_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Public read policies for content tables (visitors can view)
CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view active service icons" ON public.service_icons FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active prayer times" ON public.prayer_times_settings FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active umrah packages" ON public.umrah_packages FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active hajj packages" ON public.hajj_packages FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active about us content" ON public.about_us_content FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active gallery items" ON public.gallery_items FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can view active highlight services" ON public.highlight_services FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active team members" ON public.team_members FOR SELECT USING (is_active = true);

-- Contact messages: anyone can insert
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Admin policies (authenticated users can manage all)
CREATE POLICY "Authenticated users can manage site settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage service icons" ON public.service_icons FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage prayer times" ON public.prayer_times_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage umrah packages" ON public.umrah_packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage hajj packages" ON public.hajj_packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage about us content" ON public.about_us_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage gallery items" ON public.gallery_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage blog posts" ON public.blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage contact messages" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage highlight services" ON public.highlight_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage team members" ON public.team_members FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_service_icons_updated_at BEFORE UPDATE ON public.service_icons FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_prayer_times_updated_at BEFORE UPDATE ON public.prayer_times_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_umrah_packages_updated_at BEFORE UPDATE ON public.umrah_packages FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_hajj_packages_updated_at BEFORE UPDATE ON public.hajj_packages FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_about_us_updated_at BEFORE UPDATE ON public.about_us_content FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_highlight_services_updated_at BEFORE UPDATE ON public.highlight_services FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert default WhatsApp setting
INSERT INTO public.site_settings (key, value, description) VALUES 
('whatsapp_number', '6281234567890', 'Nomor WhatsApp untuk floating button'),
('company_email', 'info@karinhidayah.com', 'Email perusahaan'),
('company_phone', '+62 21 1234 5678', 'Telepon perusahaan'),
('company_address', 'Jl. Kebon Jeruk Raya No. 123, Jakarta Barat 11530', 'Alamat kantor');

-- Insert default service icons
INSERT INTO public.service_icons (icon_name, label, order_index) VALUES
('BookOpen', 'Al Quran', 1),
('Heart', 'Dzikir', 2),
('FileText', 'Hadist', 3),
('Headphones', 'Murotal', 4),
('HandHelping', 'Doa', 5),
('Compass', 'Qiblat', 6);