import { useParams } from "react-router-dom";
import { ChevronDown, MapPin, ArrowRight, Wifi, Clock, UtensilsCrossed, Sparkles, Car, Package, Bath, Building, Briefcase, PawPrint, User, Star, Mail, Loader2, Plane, Bus, Hotel, ShieldCheck, Users, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useUmrahPackageById, useHajjPackageById } from "@/hooks/useSupabaseData";
import packageHero from "@/assets/package-hero.jpg";
import itineraryMap from "@/assets/itinerary-map.jpg";
import hotelRoom from "@/assets/hotel-room.jpg";
import desertDunes from "@/assets/desert-dunes.jpg";
import Jeddah from "@/assets/infinity-pool.jpg";
import spaWellness from "@/assets/spa-wellness.jpg";
import Dubai from "@/assets/glass-kayaking.jpg";
import Aqsa from "@/assets/lava-massage.jpg";
import Mesir from "@/assets/cta-beach.jpg";

// Icon mapping for dynamic icons
const iconMap: Record<string, any> = {
  Wifi, Clock, UtensilsCrossed, Sparkles, Car, Package, Bath, Building, 
  Briefcase, PawPrint, User, Plane, Bus, Hotel, ShieldCheck, Users, MapPin, X
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || Package;
};

// Default data for fallback
const defaultItinerary = [
  {
    day: 1,
    title: "Jeddah → Makkah",
    temperature: "10°",
    weather: "Cloudy",
    description: "Tiba di Bandara King Abdulaziz Jeddah, lanjut perjalanan ke Makkah. Check-in hotel dan persiapan umrah.",
    activities: [
      { text: "Transfer bandara ke hotel bintang 5", link: "" },
      { text: "Makan malam di restoran hotel", link: "" },
    ],
    thumbnail: itineraryMap
  },
  {
    day: 2,
    title: "Makkah → Masjidil Haram",
    temperature: "12°",
    weather: "Sunny",
    description: "Pelaksanaan ibadah umrah: Ihram, Tawaf, Sa'i, dan Tahallul. Ziarah ke tempat-tempat bersejarah.",
    activities: [
      { text: "Bimbingan ustadz berpengalaman", link: "" },
      { text: "Ziarah Jabal Nur dan Jabal Tsur", link: "" },
    ],
    thumbnail: ""
  },
  {
    day: 3,
    title: "Makkah → Madinah",
    temperature: "10°",
    weather: "Cloudy",
    description: "Perjalanan ke Madinah Al-Munawwarah. Ziarah ke Masjid Nabawi dan makam Rasulullah SAW.",
    activities: [
      { text: "Sholat di Raudhah (jika memungkinkan)", link: "" },
      { text: "Ziarah ke Masjid Quba dan Uhud", link: "" },
    ],
    thumbnail: ""
  }
];

const defaultFacilities = [
  { icon: "Wifi", name: "High-Speed Wi-Fi" },
  { icon: "UtensilsCrossed", name: "24-Hour In-Room Dining" },
  { icon: "Sparkles", name: "Luxury In-Room Refreshments" },
  { icon: "Clock", name: "Daily Housekeeping" },
  { icon: "Bath", name: "Spa-Style Bathroom" },
  { icon: "Building", name: "Wellness Pavilion Access" },
  { icon: "Car", name: "Complimentary Valet Parking" },
  { icon: "Package", name: "Unpacking & Packing Services" },
  { icon: "Briefcase", name: "Suite Work Desk & Charging Hub" },
];

const defaultNotIncluded = [
  { icon: "Clock", text: "Check-in From 3:00 PM to 11:59 PM" },
  { icon: "Clock", text: "Check-out From 06:00 AM to 12:00 PM" },
  { icon: "", text: "Cancellation and prepayment terms depend on the room type. Please review the conditions before booking." },
  { icon: "PawPrint", text: "Pet are not allowed" },
  { icon: "User", text: "The minimum age for check-in is 18" },
];

const defaultReviews = [
  {
    content: "Professional, responsive, and genuinely helpful. The team made everything easy, quick felt like another great experience.",
    name: "Arif Santoso",
    role: "Head of Transactions",
    avatar: "",
    recommended: true,
  },
  {
    content: "Professional, responsive, and genuinely helpful. The team made everything easy, quick felt like another great experience.",
    name: "Rahma Dina",
    role: "Experience",
    avatar: "",
    recommended: true,
  },
  {
    content: "Professional, responsive, and genuinely helpful. The team made everything easy, quick felt like another great experience.",
    name: "Khadijah",
    role: "Experience",
    avatar: "",
    recommended: true,
  },
];

const defaultReviewStats = {
  total_reviews: 4200,
  average_rating: 4.5,
  breakdown: { "5": 3000, "4": 1000, "3": 140, "2": 20, "1": 0 }
};

const defaultRelatedPackages = [
  { id: "1", name: "Mesir", image: Mesir, link: "/umrah-packages", button_text: "BOOK NOW" },
  { id: "2", name: "Jeddah", image: Jeddah, link: "/umrah-packages", button_text: "BOOK NOW" },
  { id: "3", name: "Dubai", image: Dubai, link: "/umrah-packages", button_text: "BOOK NOW" },
  { id: "4", name: "Aqsa", image: Aqsa, link: "/umrah-packages", button_text: "BOOK NOW" },
];

const defaultCta = {
  background_image: Mesir,
  headline: "Wujudkan Niat Umrah Anda Bersama Kami",
  subheadline: "Konsultasi Gratis Sekarang",
  description: "Konsultasikan rencana Umrah Anda bersama tim Karin Hidayah Tour. Kami siap membimbing dari awal hingga akhir perjalanan ibadah.",
  button_text: "Hubungi Kami",
  button_link: "/contact"
};

const defaultAgent = {
  name: "Febri Romadon",
  position: "Agents",
  email: "admin@karinhidayahtour.com",
  photo_url: "",
  button_text: "Contact With Me"
};

const defaultGallerySection = {
  title: "Momen Ibadah yang Menguatkan Hati",
  subtitle: "",
  description: "Umrah bukan sekadar perjalanan, tetapi panggilan hati. Kami hadir untuk menemani setiap jamaah dalam ibadah yang khusyuk, nyaman, dan sesuai tuntunan Rasulullah",
  button_text: "Explore now",
  button_link: "/umrah-packages",
  images: []
};

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Try to fetch as Umrah package first, then Hajj
  const { data: umrahPackage, isLoading: umrahLoading } = useUmrahPackageById(id);
  const { data: hajjPackage, isLoading: hajjLoading } = useHajjPackageById(id);
  
  const isLoading = umrahLoading || hajjLoading;
  const packageData = umrahPackage || hajjPackage;
  
  // Extract data with fallbacks
  const itinerary = (packageData?.itinerary as any[]) || defaultItinerary;
  const facilities = (packageData?.facilities as any[]) || defaultFacilities;
  const facilitiesNotIncluded = (packageData?.facilities_not_included as any[]) || defaultNotIncluded;
  const reviewsData = (packageData?.reviews_data as any[]) || defaultReviews;
  const reviewStats = (packageData?.review_stats as any) || defaultReviewStats;
  const agentInfo = (packageData?.agent_info as any) || defaultAgent;
  const gallerySection = (packageData?.gallery_section as any) || defaultGallerySection;
  const relatedPackages = (packageData?.related_packages as any[]) || defaultRelatedPackages;
  const ctaSection = (packageData?.cta_section as any) || defaultCta;
  
  const heroImage = (packageData as any)?.hero_image || packageData?.image_url || packageHero;
  const subtitle = (packageData as any)?.subtitle || (packageData as any)?.location_text || "Makkah Al-Mukarramah & Madinah Al-Munawwarah";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Itinerary Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-secondary italic">Itinerary</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">Sort by:</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Left Sidebar - Itinerary */}
          <div className="space-y-4">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={itinerary[0]?.thumbnail || itineraryMap} alt="Route Map" className="w-full h-40 object-cover" />
            </div>

            {/* Itinerary Cards */}
            {itinerary.map((item: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-md border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-secondary text-white px-3 py-1 rounded-lg text-sm font-medium">
                    Hari Ke {item.day}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-lg font-semibold text-foreground">{item.temperature || item.temp}</span>
                    <span>{item.weather}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title || `${item.from} → ${item.to}`}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2">
                  {(item.activities || item.highlights || []).map((activity: any, hIndex: number) => (
                    <div key={hIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span className={`text-sm ${activity.link ? "text-secondary underline cursor-pointer hover:text-secondary/80" : "text-muted-foreground"}`}>
                        {activity.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="relative rounded-3xl overflow-hidden">
              <img src={heroImage} alt="Package Hero" className="w-full h-[400px] object-cover" />
            </div>

            {/* Package Title */}
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-2">
                {packageData?.name || "PAKET UMRAH BULAN RAMADAN 2026"}
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                {subtitle}
              </p>
              <p className="text-foreground leading-relaxed">
                {packageData?.description || "Paket Umrah Ramadhan 2026 bersama Karin Hidayah Tour dirancang untuk memberikan pengalaman ibadah yang khusyuk, nyaman, dan terarah."}
              </p>
            </div>

            {/* Facilities Included */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">FASILITAS SUDAH TERMASUK</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {facilities.map((facility: any, index: number) => {
                  const IconComponent = getIcon(facility.icon);
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-secondary" />
                      <span className="text-sm text-foreground">{facility.name || facility.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Not Included */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">TIDAK TERMASUK</h3>
              <div className="space-y-3">
                {facilitiesNotIncluded.map((item: any, index: number) => {
                  const IconComponent = item.icon ? getIcon(item.icon) : null;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      {IconComponent ? (
                        <IconComponent className="w-5 h-5 text-muted-foreground mt-0.5" />
                      ) : (
                        <div className="w-5 h-5 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                        </div>
                      )}
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Reviews</h3>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8">
                {/* Stats */}
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground">{formatNumber(reviewStats.total_reviews)}</div>
                    <div className="text-sm text-muted-foreground">Overall Reviews of This Year</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <span className="text-4xl font-bold text-foreground">{reviewStats.average_rating}/5</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(reviewStats.average_rating) ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Overall In Reviews of This Year</div>
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground mb-2">Average Rating</div>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviewStats.breakdown?.[star.toString()] || 0;
                    const maxCount = Math.max(...Object.values(reviewStats.breakdown || {}).map(Number));
                    return (
                      <div key={star} className="flex items-center gap-2 text-sm">
                        <span className="w-4">{star}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-secondary rounded-full" 
                            style={{ width: `${maxCount > 0 ? (count / maxCount) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-muted-foreground">{formatNumber(count)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {reviewsData.map((review: any, index: number) => (
                  <div key={index} className="bg-muted/30 rounded-2xl p-4 border border-border/50">
                    <p className="text-sm text-foreground mb-4 leading-relaxed">
                      "{review.content || review.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center overflow-hidden">
                        {review.avatar ? (
                          <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-secondary" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{review.name}</div>
                        <div className="text-xs text-muted-foreground">{review.role}</div>
                      </div>
                    </div>
                    {review.recommended && (
                      <div className="mt-3 text-xs text-emerald-600 font-medium">✓ Recommended for you</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {/* Desert Dunes Card */}
          <div className="relative rounded-3xl overflow-hidden h-64">
            <img src={(gallerySection.images && gallerySection.images[0]?.url) || desertDunes} alt="Gallery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-1">{gallerySection.title}</h3>
              <p className="text-sm text-white/80 mb-3">{gallerySection.description}</p>
              {gallerySection.button_text && (
                <button
                  onClick={() => window.location.href = gallerySection.button_link || "/umrah-packages"}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors"
                >
                  {gallerySection.button_text}
                </button>
              )}
            </div>
          </div>

          {/* Hotel Room Card */}
          <div className="relative rounded-3xl overflow-hidden h-64">
            <img src={(gallerySection.images && gallerySection.images[1]?.url) || hotelRoom} alt="Hotel Room" className="w-full h-full object-cover" />
          </div>

          {/* Contact Card */}
          <div className="bg-muted/50 rounded-3xl p-6 h-64 flex flex-col justify-center">
            <button
              onClick={() => window.location.href = "/contact"}
              className="bg-secondary text-white px-4 py-2 rounded-full text-sm mb-4 w-fit"
            >
              {agentInfo.button_text}
            </button>

            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{agentInfo.email}</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">{agentInfo.name}</h3>
            <p className="text-muted-foreground">{agentInfo.position}</p>
          </div>
        </div>

        {/* Discover More Places */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">Paket Umrah Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPackages.map((place: any, index: number) => (
              <div key={place.id || index} className="group relative rounded-3xl overflow-hidden h-80">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 text-white font-medium">{place.name}</div>
                <button
                  onClick={() => window.location.href = place.link || "/umrah-packages"}
                  className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-sm text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
                >
                  {place.button_text || "BOOK NOW"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-3xl overflow-hidden mt-16 h-[400px]">
          <img src={ctaSection.background_image || Mesir} alt="CTA Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-secondary/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{ctaSection.headline}</h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">{ctaSection.subheadline}</h3>
            <p className="max-w-2xl text-white/80 mb-8">
              {ctaSection.description}
            </p>
            {ctaSection.button_text && (
              <button 
                onClick={() => window.location.href = ctaSection.button_link || "/contact"}
                className="bg-white text-secondary px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                {ctaSection.button_text}
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default PackageDetail;
