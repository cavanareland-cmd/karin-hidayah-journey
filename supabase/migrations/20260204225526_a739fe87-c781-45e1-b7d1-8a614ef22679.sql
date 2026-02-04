-- Insert sample prayer times
INSERT INTO public.prayer_times_settings (location_name, fajr_time, fajr_azan, zuhr_time, zuhr_azan, asr_time, asr_azan, maghrib_time, maghrib_azan, isha_time, isha_azan, jumah_time, jumah_azan, chourouk_time, is_active)
VALUES ('Makkah Al-Mukarramah', '05:15:00', '05:00:00', '12:30:00', '12:15:00', '15:45:00', '15:30:00', '18:30:00', '18:25:00', '20:00:00', '19:45:00', '12:30:00', '12:00:00', '06:30:00', true);

-- Insert sample umrah packages
INSERT INTO public.umrah_packages (name, category, price, duration_days, description, is_featured, is_active, rating, total_reviews, facilities)
VALUES 
('Umrah Regular 9 Hari', 'Regular', 25000000, 9, 'Paket umrah regular dengan fasilitas lengkap dan bimbingan ibadah profesional.', true, true, 4.9, 128, '["Hotel Bintang 4", "Makkah 4 Malam", "Madinah 3 Malam", "Pesawat PP"]'::jsonb),
('Umrah Premium 12 Hari', 'Premium', 35000000, 12, 'Paket premium dengan hotel bintang 5 dekat Masjidil Haram dan pelayanan VIP.', true, true, 5.0, 89, '["Hotel Bintang 5", "Dekat Masjidil Haram", "City Tour", "Private Transport"]'::jsonb),
('Umrah Ramadhan 14 Hari', 'Ramadhan', 45000000, 14, 'Rasakan kekhusyukan Ramadhan di Tanah Suci dengan ibadah maksimal.', true, true, 4.8, 156, '["Full Ramadhan", "Iftar di Masjidil Haram", "Hotel Premium", "Makan 3x Sehari"]'::jsonb),
('Umrah Plus Turki 15 Hari', 'Plus', 55000000, 15, 'Kombinasi umrah dan wisata religi ke Turki mengunjungi masjid-masjid bersejarah.', false, true, 4.9, 67, '["Umrah + Istanbul", "Hagia Sophia", "Blue Mosque", "Hotel Bintang 5"]'::jsonb);

-- Insert sample hajj packages
INSERT INTO public.hajj_packages (name, category, price, duration_days, description, is_featured, is_active, visa_type, waiting_period, departure_year, facilities)
VALUES 
('Haji Reguler 40 Hari', 'Reguler', 150000000, 40, 'Program haji reguler dengan kuota pemerintah dan bimbingan lengkap.', true, true, 'Reguler', 'Antrian 20-25 Tahun', 2025, '["Hotel Bintang 4", "Makkah 15 Malam", "Madinah 8 Malam", "Full Bimbingan"]'::jsonb),
('Haji Plus 25 Hari', 'Plus', 250000000, 25, 'Haji plus dengan fasilitas premium dan waktu tunggu lebih singkat.', true, true, 'Khusus', '5-10 Tahun', 2025, '["Hotel Bintang 5", "Dekat Masjidil Haram", "Private Transport", "Maktab Terbaik"]'::jsonb),
('Haji Furoda 15 Hari', 'Furoda', 400000000, 15, 'Program haji tanpa antrian dengan visa langsung dari Kerajaan Saudi Arabia.', true, true, 'Furoda', 'Tanpa Antrian', 2025, '["Visa Furoda", "Hotel Premium", "VIP Service", "First Class Flight"]'::jsonb);

-- Insert sample team members
INSERT INTO public.team_members (name, position, bio, order_index, is_active)
VALUES
('Ustadz Ahmad Fauzi', 'Pembimbing Ibadah', 'Lulusan Universitas Al-Azhar dengan pengalaman 15 tahun membimbing jamaah.', 1, true),
('Hj. Siti Aminah', 'Customer Relations', 'Berpengalaman melayani jamaah dengan penuh keramahan dan profesionalisme.', 2, true),
('Dr. Muhammad Yusuf', 'Konsultan Kesehatan', 'Dokter spesialis yang memastikan kesehatan jamaah selama perjalanan.', 3, true),
('Ir. Abdul Rahman', 'Tour Manager', 'Mengelola operasional perjalanan dengan standar internasional.', 4, true);

-- Insert sample highlight services
INSERT INTO public.highlight_services (title, description, icon_name, order_index, is_active)
VALUES
('Bimbingan Ibadah', 'Dipandu oleh ustadz berpengalaman dari awal hingga akhir perjalanan', 'BookOpen', 1, true),
('Akomodasi Premium', 'Hotel bintang 4-5 dengan lokasi strategis dekat Masjidil Haram', 'Building', 2, true),
('Transportasi Nyaman', 'Bus AC eksekutif untuk kenyamanan perjalanan antar kota', 'Bus', 3, true),
('Layanan 24 Jam', 'Tim support siap membantu kapanpun Anda butuhkan', 'HeadphonesIcon', 4, true);