-- Add comprehensive fields to umrah_packages for full PackageDetail management
ALTER TABLE public.umrah_packages 
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS location_text TEXT,
ADD COLUMN IF NOT EXISTS period_text TEXT,
ADD COLUMN IF NOT EXISTS hero_image TEXT,
ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS facilities_not_included JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS reviews_data JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS review_stats JSONB DEFAULT '{"total_reviews": 0, "average_rating": 0, "breakdown": {"5": 0, "4": 0, "3": 0, "2": 0, "1": 0}}'::jsonb,
ADD COLUMN IF NOT EXISTS agent_info JSONB DEFAULT '{"name": "", "position": "", "email": "", "photo_url": "", "button_text": "Contact With Me"}'::jsonb,
ADD COLUMN IF NOT EXISTS gallery_section JSONB DEFAULT '{"title": "", "subtitle": "", "description": "", "button_text": "", "button_link": "", "images": []}'::jsonb,
ADD COLUMN IF NOT EXISTS related_packages JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS cta_section JSONB DEFAULT '{"background_image": "", "headline": "", "subheadline": "", "description": "", "button_text": "", "button_link": ""}'::jsonb;

-- Add comprehensive fields to hajj_packages for full PackageDetail management  
ALTER TABLE public.hajj_packages
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS location_text TEXT,
ADD COLUMN IF NOT EXISTS period_text TEXT,
ADD COLUMN IF NOT EXISTS hero_image TEXT,
ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS facilities JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS facilities_not_included JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS reviews_data JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS review_stats JSONB DEFAULT '{"total_reviews": 0, "average_rating": 0, "breakdown": {"5": 0, "4": 0, "3": 0, "2": 0, "1": 0}}'::jsonb,
ADD COLUMN IF NOT EXISTS agent_info JSONB DEFAULT '{"name": "", "position": "", "email": "", "photo_url": "", "button_text": "Contact With Me"}'::jsonb,
ADD COLUMN IF NOT EXISTS gallery_section JSONB DEFAULT '{"title": "", "subtitle": "", "description": "", "button_text": "", "button_link": "", "images": []}'::jsonb,
ADD COLUMN IF NOT EXISTS related_packages JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS cta_section JSONB DEFAULT '{"background_image": "", "headline": "", "subheadline": "", "description": "", "button_text": "", "button_link": ""}'::jsonb;