import { useState } from "react";
import { ChevronDown, MapPin, ArrowRight, Wifi, Clock, UtensilsCrossed, Sparkles, Car, Package, Bath, Building, Briefcase, PawPrint, User, Star, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import packageHero from "@/assets/package-hero.jpg";
import itineraryMap from "@/assets/itinerary-map.jpg";
import hotelRoom from "@/assets/hotel-room.jpg";
import desertDunes from "@/assets/desert-dunes.jpg";
import Jeddah from "@/assets/infinity-pool.jpg";
import spaWellness from "@/assets/spa-wellness.jpg";
import Dubai from "@/assets/glass-kayaking.jpg";
import Aqsa from "@/assets/lava-massage.jpg";
import Mesir from "@/assets/cta-beach.jpg";

const itineraryData = [
  {
    day: 1,
    from: "Jeddah",
    to: "Makkah",
    temp: "10°",
    weather: "Cloudy",
    description: "Tiba di Bandara King Abdulaziz Jeddah, lanjut perjalanan ke Makkah. Check-in hotel dan persiapan umrah.",
    highlights: [
      { text: "Transfer bandara ke hotel bintang 5", link: true },
      { text: "Makan malam di restoran hotel", link: true },
    ]
  },
  {
    day: 2,
    from: "Makkah",
    to: "Masjidil Haram",
    temp: "12°",
    weather: "Sunny",
    description: "Pelaksanaan ibadah umrah: Ihram, Tawaf, Sa'i, dan Tahallul. Ziarah ke tempat-tempat bersejarah.",
    highlights: [
      { text: "Bimbingan ustadz berpengalaman", link: true },
      { text: "Ziarah Jabal Nur dan Jabal Tsur", link: true },
    ]
  },
  {
    day: 3,
    from: "Makkah",
    to: "Madinah",
    temp: "10°",
    weather: "Cloudy",
    description: "Perjalanan ke Madinah Al-Munawwarah. Ziarah ke Masjid Nabawi dan makam Rasulullah SAW.",
    highlights: [
      { text: "Sholat di Raudhah (jika memungkinkan)", link: true },
      { text: "Ziarah ke Masjid Quba dan Uhud", link: true },
    ]
  }
];

const includedFacilities = [
  { icon: Wifi, text: "High-Speed Wi-Fi" },
  { icon: UtensilsCrossed, text: "24-Hour In-Room Dining" },
  { icon: Sparkles, text: "Luxury In-Room Refreshments" },
  { icon: Clock, text: "Daily Housekeeping" },
  { icon: Bath, text: "Spa-Style Bathroom" },
  { icon: Building, text: "Wellness Pavilion Access" },
  { icon: Car, text: "Complimentary Valet Parking" },
  { icon: Package, text: "Unpacking & Packing Services" },
  { icon: Briefcase, text: "Suite Work Desk & Charging Hub" },
];

const notIncluded = [
  { icon: Clock, text: "Check-in From 3:00 PM to 11:59 PM" },
  { icon: Clock, text: "Check-out From 06:00 AM to 12:00 PM" },
  { icon: null, text: "Cancellation and prepayment terms depend on the room type. Please review the conditions before booking." },
  { icon: PawPrint, text: "Pet are not allowed" },
  { icon: User, text: "The minimum age for check-in is 18" },
];

const reviews = [
  {
    text: "Professional, responsive, and genuinely helpful. The team made everything easy, quick felt like another great experience.",
    rating: 5,
    name: "Arif Santoso",
    role: "Head of Transactions",
    recommended: true,
  },
  {
    text: "Professional, responsive, and genuinely helpful. The team made everything easy, quick felt like another great experience.",
    rating: 5,
    name: "Rahma Dina",
    role: "Experience",
    recommended: true,
  },
  {
    text: "Professional, responsive, and genuinely helpful. The team made everything easy, quick felt like another great experience.",
    rating: 5,
    name: "Khadijah",
    role: "Experience",
    recommended: true,
  },
];

const ratingBreakdown = [
  { stars: 5, count: "3K" },
  { stars: 4, count: "1.0K" },
  { stars: 3, count: "140" },
  { stars: 2, count: "20" },
  { stars: 1, count: "0" },
];

const discoverPlaces = [
  { title: "Mesir", image: cta-beach },
  { title: "Jeddah", image: infinityPool },
  { title: "Dubai", image: glassKayaking },
  { title: "Aqsa", image: lavaMassage },
];

const PackageDetail = () => {
  const [activeFilter, setActiveFilter] = useState("Resorts");
  const [activeDot, setActiveDot] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Itinerary Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-secondary italic">Itinerary</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">Sort by:</span>
            <button className="flex items-center gap-1 font-medium text-foreground">
              Date <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Left Sidebar - Itinerary */}
          <div className="space-y-4">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={itineraryMap} alt="Route Map" className="w-full h-40 object-cover" />
            </div>

            {/* Itinerary Cards */}
            {itineraryData.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-md border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-secondary text-white px-3 py-1 rounded-lg text-sm font-medium">
                    Hari Ke {item.day}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-lg font-semibold text-foreground">{item.temp}</span>
                    <span>{item.weather}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.from} → {item.to}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2">
                  {item.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span className="text-sm text-secondary underline cursor-pointer hover:text-secondary/80">
                        {highlight.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 pt-4">
              {[0, 1, 2, 3].map((dot) => (
                <button
                  key={dot}
                  onClick={() => setActiveDot(dot)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeDot === dot ? "bg-secondary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Hero Image with Filters */}
            <div className="relative rounded-3xl overflow-hidden">
              <img src={packageHero} alt="Package Hero" className="w-full h-[400px] object-cover" />
              <div className="absolute bottom-6 left-6 flex gap-3">
                {["Resorts", "Top Highlights", "Best Value Resorts"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === filter
                        ? "bg-white text-foreground shadow-lg"
                        : "bg-white/30 text-white backdrop-blur-sm hover:bg-white/50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Package Title */}
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-2">
                PAKET UMRAH BULAN RAMADAN 2026
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Makkah Al-Mukarramah & Madinah Al-Munawwarah
              </p>
              <p className="text-foreground leading-relaxed">
                Paket Umrah Ramadhan 2026 bersama Karin Hidayah Tour dirancang untuk memberikan pengalaman ibadah yang khusyuk, nyaman, dan terarah. Dengan pendampingan ustadz berpengalaman, hotel dekat Masjidil Haram & Nabawi, serta layanan profesional dari keberangkatan hingga kepulangan.
            </div>

            {/* Facilities Included */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">FASILITAS SUDAH TERMASUK</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {includedFacilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <facility.icon className="w-5 h-5 text-secondary" />
                    <span className="text-sm text-foreground">{facility.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Not Included */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">TIDAK TERMASUK</h3>
              <div className="space-y-3">
                {notIncluded.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {item.icon ? (
                      <item.icon className="w-5 h-5 text-muted-foreground mt-0.5" />
                    ) : (
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      </div>
                    )}
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Reviews</h3>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8">
                {/* Stats */}
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground">4,2K</div>
                    <div className="text-sm text-muted-foreground">Overall Reviews of This Year</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <span className="text-4xl font-bold text-foreground">4,5/5</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Overall In Reviews of This Year</div>
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground mb-2">Average Rating</div>
                  {ratingBreakdown.map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-2 text-sm">
                      <span className="w-4">{rating.stars}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary rounded-full" 
                          style={{ width: `${(parseInt(rating.count.replace('K', '000')) / 3000) * 100}%` }}
                        />
                      </div>
                      <span className="w-12 text-right text-muted-foreground">{rating.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-muted/30 rounded-2xl p-4 border border-border/50">
                    <p className="text-sm text-foreground mb-4 leading-relaxed">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-secondary" />
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
            <img src={desertDunes} alt="Desert Dunes" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-1">Momen Ibadah yang Menguatkan Hati</h3>
              <p className="text-sm text-white/80 mb-3">Umrah bukan sekadar perjalanan, tetapi panggilan hati. Kami hadir untuk menemani setiap jamaah dalam ibadah yang khusyuk, nyaman, dan sesuai tuntunan Rasulullah</p>
              <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors">
                Explore now
              </button>
            </div>
          </div>

          {/* Hotel Room Card */}
          <div className="relative rounded-3xl overflow-hidden h-64">
            <img src={hotelRoom} alt="Hotel Room" className="w-full h-full object-cover" />
          </div>

          {/* Contact Card */}
          <div className="bg-muted/50 rounded-3xl p-6 h-64 flex flex-col justify-center">
            <button className="bg-secondary text-white px-4 py-2 rounded-full text-sm mb-4 w-fit">
              Contact With Me
            </button>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Mail className="w-4 h-4" />
              <span className="text-sm">admin@karinhidayahtour.com</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Febri Romadon</h3>
            <p className="text-muted-foreground">Agents</p>
          </div>
        </div>

        {/* Discover More Places */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">Paket Umrah Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoverPlaces.map((place, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden h-80">
                <img src={place.image} alt={place.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 text-white font-medium">{place.title}</div>
                <button className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-sm text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
                  BOOK NOW <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-3xl overflow-hidden mt-16 h-[400px]">
          <img src={Mesir} alt="Beach Resort" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-secondary/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Wujudkan Niat Umrah Anda Bersama Kami</h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Konsultasi Gratis Sekarang</h3>
            <p className="max-w-2xl text-white/80 mb-8">
             Konsultasikan rencana Umrah Anda bersama tim Karin Hidayah Tour. Kami siap membimbing dari awal hingga akhir perjalanan ibadah.
            </p>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors border border-white/30">
              BOOK NOW <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default PackageDetail;
