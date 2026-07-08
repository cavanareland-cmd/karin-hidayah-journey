import { useParams, Link } from "react-router-dom";
import {
  MapPin, ArrowRight, Wifi, Clock, UtensilsCrossed, Sparkles, Car, Package,
  Bath, Building, Briefcase, PawPrint, User, Star, Mail, Loader2, Plane, Bus,
  Hotel, ShieldCheck, Users, X, Check, Calendar, Ticket, Award, Phone
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUmrahPackageById, useHajjPackageById } from "@/hooks/useSupabaseData";
import packageHero from "@/assets/package-hero.jpg";
import hotelRoom from "@/assets/hotel-room.jpg";
import desertDunes from "@/assets/desert-dunes.jpg";
import Jeddah from "@/assets/infinity-pool.jpg";
import spaWellness from "@/assets/spa-wellness.jpg";
import Dubai from "@/assets/glass-kayaking.jpg";
import Aqsa from "@/assets/lava-massage.jpg";
import Mesir from "@/assets/cta-beach.jpg";

const iconMap: Record<string, any> = {
  Wifi, Clock, UtensilsCrossed, Sparkles, Car, Package, Bath, Building,
  Briefcase, PawPrint, User, Plane, Bus, Hotel, ShieldCheck, Users, MapPin, X,
};
const getIcon = (n: string) => iconMap[n] || Check;

const WHATSAPP_NUMBER = "6281131077070";
const WHATSAPP_DISPLAY = "0811-3107-707";

const defaultItinerary = [
  { day: 1, title: "Keberangkatan Surabaya → Jeddah", description: "Berkumpul di Bandara Juanda T2. Briefing manasik terakhir dan proses imigrasi menuju Jeddah bersama muthawwif." },
  { day: 2, title: "Tiba di Madinah Al-Munawwarah", description: "Transit Jeddah, transfer ke Madinah. Check-in hotel dan orientasi kawasan Masjid Nabawi untuk persiapan ibadah Arba'in." },
  { day: 3, title: "Ibadah & Ziarah Madinah", description: "Ziarah Raudhah, Makam Rasulullah SAW, Masjid Quba, Jabal Uhud, dan Kebun Kurma." },
  { day: 6, title: "Miqat & Umrah Wajib", description: "Mengambil miqat di Bir Ali, ihram, menuju Makkah. Prosesi Thawaf, Sa'i, dan Tahallul di Masjidil Haram." },
  { day: 9, title: "Umrah Sunnah & Ziarah Makkah", description: "Umrah kedua dari Tan'im/Ji'ranah, ziarah Jabal Nur, Jabal Tsur, Padang Arafah, Muzdalifah & Mina." },
  { day: 12, title: "Free City Tour Thaif", description: "Perjalanan darat ke Thaif menikmati Al-Hada, ladang mawar, dan kereta cepat Haramain." },
  { day: 13, title: "Kepulangan Jeddah → Surabaya", description: "Transfer ke Bandara Jeddah untuk penerbangan pulang. Alhamdulillah, umrah mabrurah." },
];

const defaultFacilities = [
  { icon: "Plane", name: "Tiket Pesawat Sub-Jed PP (Lion Air)" },
  { icon: "ShieldCheck", name: "Visa Umrah & Asuransi Perjalanan" },
  { icon: "Package", name: "Perlengkapan Premium Karin Hidayah" },
  { icon: "Sparkles", name: "Dokumentasi Foto & Video Profesional" },
  { icon: "Briefcase", name: "Free Handling Domestik & Internasional" },
  { icon: "Building", name: "Premium Lounge Keberangkatan & Kedatangan" },
  { icon: "Users", name: "Tour Leader & Muthawwif Berpengalaman" },
  { icon: "Hotel", name: "Bimbingan Manasik Umrah 2x" },
  { icon: "UtensilsCrossed", name: "Makan 3x Sehari Menu Indonesia" },
  { icon: "Sparkles", name: "Air Zamzam 5 Liter" },
  { icon: "Bus", name: "Free City Tour Madinah, Makkah, Thaif" },
  { icon: "Bus", name: "Free Kereta Cepat Haramain" },
];

const defaultNotIncluded = [
  { icon: "X", text: "Biaya pembuatan Paspor" },
  { icon: "X", text: "Vaksin Meningitis" },
  { icon: "X", text: "Kelebihan bagasi & keperluan pribadi" },
  { icon: "X", text: "Laundry, telepon, dan tips di luar ketentuan" },
];

const defaultReviews = [
  { content: "Alhamdulillah, pembimbingnya sabar dan profesional. Hotel di Madinah dekat sekali dengan pelataran Nabawi, sangat memudahkan ibadah kami.", name: "H. Nurmansyah", role: "Alumni Umrah 2024", recommended: true },
  { content: "Pelayanan dari pendaftaran hingga kepulangan sangat rapih. Dokumentasi foto & video menjadi kenangan berharga bagi keluarga.", name: "Hj. Siti Rahma", role: "Alumni Umrah 2024", recommended: true },
  { content: "Free city tour Thaif dan kereta cepat Haramain pengalaman yang tidak terlupakan. Terima kasih Karin Hidayah Tour.", name: "Ust. Arif Santoso", role: "Alumni Umrah 2025", recommended: true },
];

const defaultReviewStats = { total_reviews: 128, average_rating: 4.9, breakdown: { "5": 118, "4": 8, "3": 2, "2": 0, "1": 0 } };

const defaultGalleryImages = [
  { url: desertDunes, alt: "Masjidil Haram" },
  { url: hotelRoom, alt: "Hotel Kamar" },
  { url: Jeddah, alt: "Jeddah" },
  { url: Dubai, alt: "Kereta Haramain" },
  { url: Aqsa, alt: "Masjid Nabawi" },
  { url: spaWellness, alt: "Ihram" },
];

const defaultRelatedPackages = [
  { id: "1", name: "Umrah Januari 2027", image: Mesir, link: "/umrah-packages", price: "Rp 29.5 Jt" },
  { id: "2", name: "Umrah Desember 2026", image: Jeddah, link: "/umrah-packages", price: "Rp 35.8 Jt" },
  { id: "3", name: "Umrah Plus Turkey", image: Dubai, link: "/umrah-packages", price: "Rp 39.9 Jt" },
];

const formatIDR = (n?: number) => {
  if (!n && n !== 0) return "-";
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1).replace(".0", "")} Jt`;
  return new Intl.NumberFormat("id-ID").format(n);
};

const formatDate = (d?: string | null) => {
  if (!d) return "19 November 2026";
  try {
    return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  } catch { return d; }
};

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: umrahPackage, isLoading: umrahLoading } = useUmrahPackageById(id);
  const { data: hajjPackage, isLoading: hajjLoading } = useHajjPackageById(id);

  const isLoading = umrahLoading || hajjLoading;
  const packageData: any = umrahPackage || hajjPackage;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </div>
    );
  }

  const itinerary = (packageData?.itinerary as any[])?.length ? (packageData?.itinerary as any[]) : defaultItinerary;
  const facilities = (packageData?.facilities as any[])?.length ? (packageData?.facilities as any[]) : defaultFacilities;
  const facilitiesNotIncluded = (packageData?.facilities_not_included as any[])?.length ? (packageData?.facilities_not_included as any[]) : defaultNotIncluded;
  const reviewsData = (packageData?.reviews_data as any[])?.length ? (packageData?.reviews_data as any[]) : defaultReviews;
  const reviewStats = (packageData?.review_stats as any) || defaultReviewStats;
  const galleryImages = ((packageData?.gallery_images as any[]) || (packageData?.gallery_section as any)?.images)?.length
    ? ((packageData?.gallery_images as any[]) || (packageData?.gallery_section as any)?.images)
    : defaultGalleryImages;
  const relatedPackages = (packageData?.related_packages as any[])?.length ? (packageData?.related_packages as any[]) : defaultRelatedPackages;

  const heroImage = packageData?.hero_image || packageData?.image_url || packageHero;
  const name = packageData?.name || "Paket Umrah Gold - November 2026";
  const subtitle = packageData?.subtitle || packageData?.location_text || "Hotel Bintang 4 · Al Saha Madinah & Olayan Ajyad Makkah";
  const description = packageData?.description ||
    "Paket Umrah Gold Bulan November 2026 bersama Karin Hidayah Tour. No. Izin PPIU 04042300022560003. Keberangkatan 19 November 2026, durasi 13 hari menggunakan maskapai Lion Air rute SUB-JED / JED-SUB.";
  const price = packageData?.price ?? 41_900_000;
  const duration = packageData?.duration_days ?? 13;
  const departureDate = packageData?.departure_date || "2026-11-19";
  const category = packageData?.category || "Gold";

  const isSilver = /silver/i.test(name);
  const madinahHotel = isSilver
    ? { name: "Al Mukhtara Golden", stars: 3, area: "Madinah", note: "/ Setaraf" }
    : { name: "Al Saha", stars: 4, area: "Madinah", note: "/ Setaraf" };
  const makkahHotel = isSilver
    ? { name: "Wahad Ajyad", stars: 3, area: "Makkah", note: "/ Setaraf" }
    : { name: "Olayan Ajyad", stars: 4, area: "Makkah", note: "/ Setaraf" };

  const bookingMessage = encodeURIComponent(
    `Assalamualaikum, saya tertarik dengan ${name} keberangkatan ${formatDate(departureDate)}. Mohon info lebih lanjut.`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${bookingMessage}`;

  const totalBreakdown = Object.values(reviewStats.breakdown || {}).reduce((s: number, v: any) => s + Number(v), 0) as number;

  return (
    <div className="min-h-screen bg-secondary text-white font-['Fira_Sans'] selection:bg-accent selection:text-secondary">
      <Navbar />

      {/* Floating WhatsApp CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="relative flex w-8 h-8 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
          <Phone className="w-5 h-5 relative" />
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[9px] uppercase tracking-widest opacity-80">WhatsApp 24/7</span>
          <span className="font-bold text-sm mt-0.5">{WHATSAPP_DISPLAY}</span>
        </span>
      </a>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Editorial Content */}
          <div className="lg:col-span-8 space-y-16">
            {/* Hero */}
            <section className="relative">
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-accent hidden md:block" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-accent hidden md:block" />
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-accent/20">
                <img src={heroImage} alt={name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-secondary/10" />
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] tracking-widest font-bold uppercase mb-3 border border-accent/60 rounded-sm">
                    Izin PPIU · 04042300022560003
                  </span>
                  <h1 className="font-['DM_Serif_Display'] text-3xl md:text-5xl lg:text-6xl leading-none text-accent">
                    {name}
                  </h1>
                  <p className="mt-3 text-sm md:text-base text-white/70 italic">{subtitle}</p>
                </div>
              </div>

              {/* Meta Badges Strip */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-accent/20 border border-accent/20 mt-6 rounded-lg overflow-hidden">
                {[
                  { label: "Durasi", value: `${duration} HARI` },
                  { label: "Maskapai", value: "LION AIR" },
                  { label: "Rute", value: "SUB-JED" },
                  { label: "Deposit", value: "RP 5 JUTA", accent: true },
                  { label: "Berangkat", value: "19 NOV" },
                ].map((m, i) => (
                  <div key={i} className="bg-secondary/80 backdrop-blur p-4 text-center">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-accent mb-1">{m.label}</p>
                    <p className={`font-bold text-sm ${m.accent ? "text-accent" : "text-white"}`}>{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="mt-8 text-white/75 leading-relaxed text-base md:text-lg">
                {description}
              </p>
            </section>

            {/* Hotel Showcase */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-['DM_Serif_Display'] text-3xl text-accent whitespace-nowrap">Akomodasi Pilihan</h2>
                <div className="h-px bg-gradient-to-r from-accent/40 to-transparent flex-grow" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { ...madinahHotel, image: hotelRoom, distance: "± 50m ke Masjid Nabawi" },
                  { ...makkahHotel, image: Jeddah, distance: "± Kawasan Ajyad, dekat Masjidil Haram" },
                ].map((h, i) => (
                  <article key={i} className="group bg-secondary/60 backdrop-blur border-l-4 border-accent rounded-r-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <div className="aspect-video overflow-hidden relative">
                      <img src={h.image} alt={h.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute top-3 right-3 bg-secondary/80 backdrop-blur px-3 py-1 rounded-full text-accent text-[10px] font-bold uppercase tracking-widest">{h.area}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex gap-1 text-accent mb-2">
                        {Array.from({ length: h.stars }).map((_, s) => <Star key={s} className="w-4 h-4 fill-accent" />)}
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Hotel {h.area}</p>
                      <h3 className="font-['DM_Serif_Display'] text-2xl text-white mb-2">{h.name} <span className="text-accent/70 text-lg">{h.note}</span></h3>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>{h.distance}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Itinerary Timeline */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="font-['DM_Serif_Display'] text-3xl text-accent whitespace-nowrap">Rancangan Perjalanan</h2>
                <div className="h-px bg-gradient-to-r from-accent/40 to-transparent flex-grow" />
              </div>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/30 to-transparent" />
                {itinerary.map((it: any, idx: number) => (
                  <div key={idx} className="relative pl-24 pb-10 group">
                    <div className="absolute left-0 top-0 w-16 h-16 bg-secondary border-2 border-accent flex items-center justify-center font-['DM_Serif_Display'] text-2xl text-accent z-10 transition-colors duration-300 group-hover:bg-accent group-hover:text-secondary rounded-sm">
                      {String(it.day).padStart(2, "0")}
                    </div>
                    <h4 className="font-['DM_Serif_Display'] text-xl md:text-2xl text-white mb-2">{it.title || `Hari ${it.day}`}</h4>
                    <p className="text-white/60 leading-relaxed text-sm md:text-base">{it.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions / Exclusions */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="p-6 md:p-8 bg-secondary/60 border-2 border-accent rounded-xl relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 opacity-5 text-accent">
                  <Check className="w-48 h-48" />
                </div>
                <h3 className="font-['DM_Serif_Display'] text-2xl text-accent mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6" /> Sudah Termasuk
                </h3>
                <ul className="space-y-3 relative">
                  {facilities.map((f: any, i: number) => {
                    const Ico = getIcon(f.icon);
                    return (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                        <span className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-accent" />
                        </span>
                        <span>{f.name || f.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="p-6 md:p-8 border-2 border-white/10 rounded-xl bg-secondary/40">
                <h3 className="font-['DM_Serif_Display'] text-2xl text-white/50 mb-6 flex items-center gap-3">
                  <X className="w-6 h-6" /> Tidak Termasuk
                </h3>
                <ul className="space-y-3">
                  {facilitiesNotIncluded.map((it: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                      <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5" />
                      </span>
                      <span>{it.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Gallery */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-['DM_Serif_Display'] text-3xl text-accent whitespace-nowrap">Galeri Perjalanan</h2>
                <div className="h-px bg-gradient-to-r from-accent/40 to-transparent flex-grow" />
              </div>
              <div className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-4 h-[380px] md:h-[520px]">
                <div className="col-span-2 row-span-2 overflow-hidden rounded-xl border border-accent/20 group">
                  <img src={galleryImages[0]?.url} alt={galleryImages[0]?.alt || "gallery"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                {galleryImages.slice(1, 5).map((g: any, i: number) => (
                  <div key={i} className="overflow-hidden rounded-xl border border-accent/20 group">
                    <img src={g.url} alt={g.alt || `gallery-${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-secondary/60 border border-accent/20 p-8 md:p-12 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-bl-full" />
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-['DM_Serif_Display'] text-3xl text-accent">Ulasan Alumni</h2>
              </div>
              <div className="grid md:grid-cols-[220px_1fr] gap-10 mb-10">
                <div className="text-center md:text-left">
                  <div className="text-6xl md:text-7xl font-['DM_Serif_Display'] text-accent leading-none">{reviewStats.average_rating}</div>
                  <div className="flex justify-center md:justify-start text-accent gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.round(reviewStats.average_rating) ? "fill-accent" : ""}`} />
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-3">{reviewStats.total_reviews} Ulasan Jamaah</p>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const c = Number(reviewStats.breakdown?.[String(s)] || 0);
                    const pct = totalBreakdown > 0 ? (c / totalBreakdown) * 100 : 0;
                    return (
                      <div key={s} className="flex items-center gap-4 text-sm">
                        <span className="w-4 text-white/60">{s}</span>
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-10 text-right text-white/50 text-xs">{Math.round(pct)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {reviewsData.slice(0, 3).map((r: any, i: number) => (
                  <div key={i} className="bg-secondary/80 border border-accent/10 rounded-xl p-5 hover:border-accent/40 transition-colors">
                    <div className="flex text-accent mb-3 gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="w-3 h-3 fill-accent" />)}
                    </div>
                    <p className="text-sm text-white/80 italic leading-relaxed mb-4">"{r.content || r.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold text-sm">
                        {(r.name || "?").split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{r.name}</div>
                        <div className="text-[11px] text-accent/80">{r.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: Sticky Booking Card */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-secondary border-2 border-accent rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="bg-primary p-6 md:p-7 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:14px_14px]" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 mb-2 relative">Harga Paket · {category}</p>
                  <div className="text-4xl md:text-5xl font-['DM_Serif_Display'] text-accent relative leading-none">
                    {formatIDR(price)}
                  </div>
                  <p className="text-[11px] italic text-white/50 mt-2 relative">*Kamar Quad · per jamaah</p>
                </div>

                <div className="p-6 md:p-7 space-y-4">
                  <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                    <span className="flex items-center gap-2 text-sm text-white/60">
                      <Calendar className="w-4 h-4 text-accent" /> Keberangkatan
                    </span>
                    <span className="font-semibold text-white text-sm">{formatDate(departureDate)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                    <span className="flex items-center gap-2 text-sm text-white/60">
                      <Clock className="w-4 h-4 text-accent" /> Durasi
                    </span>
                    <span className="font-semibold text-white text-sm">{duration} Hari</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                    <span className="flex items-center gap-2 text-sm text-white/60">
                      <Plane className="w-4 h-4 text-accent" /> Maskapai
                    </span>
                    <span className="font-semibold text-white text-sm">Lion Air · SUB-JED</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                    <span className="flex items-center gap-2 text-sm text-white/60">
                      <Ticket className="w-4 h-4 text-accent" /> DP Booking
                    </span>
                    <span className="font-bold text-accent text-sm">Rp 5.000.000</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-sm text-white/60">Sisa Kursi</span>
                    <span className="inline-flex items-center gap-2 px-2 py-1 bg-primary/30 text-white text-[11px] font-bold rounded uppercase tracking-widest animate-pulse">
                      Terbatas
                    </span>
                  </div>

                  <div className="pt-3 space-y-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold tracking-widest uppercase text-sm text-center rounded-md flex items-center justify-center gap-2 transition-all border border-accent shadow-[0_10px_30px_rgba(139,30,63,0.35)] hover:scale-[1.02]"
                    >
                      Amankan Kursi Anda <ArrowRight className="w-4 h-4" />
                    </a>
                    <Link
                      to="/contact"
                      className="w-full py-3.5 bg-transparent hover:bg-white/5 text-accent font-bold tracking-widest uppercase text-xs text-center rounded-md flex items-center justify-center gap-2 transition-all border border-accent"
                    >
                      Konsultasi Gratis
                    </Link>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { title: "KEMENAG", sub: "Terakreditasi" },
                  { title: "5 PASTI", sub: "Umroh Resmi" },
                  { title: "SISKOPATUH", sub: "Terdaftar" },
                ].map((b, i) => (
                  <div key={i} className="bg-secondary/60 p-3 text-center border border-accent/10 rounded-lg">
                    <div className="text-accent font-bold text-[11px] mb-1 tracking-wide">{b.title}</div>
                    <p className="text-[9px] text-white/40 uppercase">{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Packages */}
        <section className="mt-24 pt-16 border-t border-accent/15">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2">Rekomendasi</p>
            <h2 className="font-['DM_Serif_Display'] text-3xl md:text-4xl text-white">Paket Umrah Lainnya</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPackages.slice(0, 3).map((p: any, i: number) => (
              <Link key={p.id || i} to={p.link || "/umrah-packages"} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-accent/10 mb-4">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                  {p.price && (
                    <span className="absolute top-4 right-4 bg-accent text-secondary px-3 py-1 text-[11px] font-bold rounded">{p.price}</span>
                  )}
                </div>
                <h4 className="font-['DM_Serif_Display'] text-xl text-white group-hover:text-accent transition-colors">{p.name}</h4>
                <span className="inline-flex items-center gap-2 text-xs text-accent/80 mt-2 group-hover:gap-3 transition-all">
                  Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PackageDetail;
