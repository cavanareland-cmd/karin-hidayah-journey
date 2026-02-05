import { useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  Plane,
  Hotel,
  UtensilsCrossed,
  Users,
  Package,
  Bus,
  BookOpen,
  User,
  Star,
  Mail,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import packageHero from "@/assets/package-hero.jpg";
import itineraryMap from "@/assets/itinerary-map.jpg";
import jamaah1 from "@/assets/jamaah-1.jpg";
import jamaah2 from "@/assets/jamaah-2.jpg";
import kaabah from "@/assets/kaabah.jpg";
import madinah from "@/assets/madinah.jpg";
import ctaUmrah from "@/assets/cta-umrah.jpg";

/* ================= ITINERARY ================= */
const itineraryData = [
  {
    day: 1,
    from: "Jeddah",
    to: "Makkah",
    temp: "—",
    weather: "Arrival",
    description:
      "Tiba di Bandara King Abdulaziz Jeddah, dilanjutkan perjalanan menuju Makkah. Check-in hotel dan persiapan ibadah Umrah.",
    highlights: [
      { text: "Transfer bandara – hotel" },
      { text: "Briefing & persiapan Umrah" },
    ],
  },
  {
    day: 2,
    from: "Makkah",
    to: "Masjidil Haram",
    temp: "—",
    weather: "Umrah",
    description:
      "Pelaksanaan ibadah Umrah: Ihram, Tawaf, Sa’i, dan Tahallul dibimbing oleh ustadz berpengalaman.",
    highlights: [
      { text: "Bimbingan ibadah Umrah" },
      { text: "Shalat berjamaah di Masjidil Haram" },
    ],
  },
  {
    day: 3,
    from: "Makkah",
    to: "Madinah",
    temp: "—",
    weather: "Ziarah",
    description:
      "Perjalanan menuju Madinah Al-Munawwarah dan ibadah di Masjid Nabawi.",
    highlights: [
      { text: "Ziarah Raudhah (jika memungkinkan)" },
      { text: "Ziarah Baqi’, Uhud & Masjid Quba" },
    ],
  },
];

/* ================= FASILITAS ================= */
const includedFacilities = [
  { icon: Plane, text: "Tiket pesawat PP (Ekonomi)" },
  { icon: Hotel, text: "Hotel bintang 4 / 5 dekat Masjid" },
  { icon: UtensilsCrossed, text: "Makan 3x sehari" },
  { icon: Users, text: "Tour Leader & Muthawwif" },
  { icon: BookOpen, text: "Bimbingan ustadz berpengalaman" },
  { icon: Bus, text: "Transportasi selama di Saudi" },
  { icon: Package, text: "Perlengkapan Umrah" },
];

const notIncluded = [
  { text: "Pengeluaran pribadi" },
  { text: "Kelebihan bagasi" },
  { text: "Dam (jika ada)" },
  { text: "Upgrade kamar (opsional)" },
];

/* ================= REVIEWS ================= */
const reviews = [
  {
    text:
      "Alhamdulillah pelayanan sangat profesional. Bimbingan ibadah jelas dan membuat kami tenang selama Umrah.",
    rating: 5,
    name: "Ahmad",
    role: "Jakarta",
  },
  {
    text:
      "Perjalanan Umrah bersama Karin Hidayah Tour sangat terorganisir dan nyaman.",
    rating: 5,
    name: "Siti",
    role: "Bandung",
  },
  {
    text:
      "Hotel dekat Masjid, pembimbing ramah, dan admin sangat responsif.",
    rating: 5,
    name: "Hendra",
    role: "Bekasi",
  },
];

const PackageDetail = () => {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-secondary italic mb-6">
          Itinerary Perjalanan
        </h1>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* LEFT */}
          <div className="space-y-4">
            <img
              src={itineraryMap}
              alt="Rute Umrah"
              className="rounded-2xl shadow"
            />

            {itineraryData.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow border"
              >
                <div className="text-sm font-semibold text-secondary mb-1">
                  Hari ke-{item.day}
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {item.from} → {item.to}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
                <ul className="space-y-1">
                  {item.highlights.map((h, idx) => (
                    <li key={idx} className="text-sm text-secondary">
                      • {h.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDot(d)}
                  className={`w-3 h-3 rounded-full ${
                    activeDot === d ? "bg-secondary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            <img
              src={packageHero}
              alt="Paket Umrah"
              className="rounded-3xl h-[380px] w-full object-cover"
            />

            <div>
              <h2 className="text-3xl font-bold text-secondary mb-2">
                Paket Umrah Ramadhan 2026
              </h2>
              <p className="text-muted-foreground mb-4">
                Makkah Al-Mukarramah & Madinah Al-Munawwarah
              </p>
              <p className="leading-relaxed">
                Paket Umrah Ramadhan 2026 bersama Karin Hidayah Tour
                menghadirkan perjalanan ibadah yang aman, nyaman, dan
                terarah. Didampingi ustadz berpengalaman serta layanan
                profesional dari keberangkatan hingga kembali ke Tanah Air.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">
                Fasilitas Sudah Termasuk
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {includedFacilities.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <f.icon className="w-5 h-5 text-secondary" />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Tidak Termasuk</h3>
              <ul className="space-y-2">
                {notIncluded.map((n, i) => (
                  <li key={i} className="text-muted-foreground">
                    • {n.text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Testimoni Jamaah</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="bg-muted/30 p-4 rounded-2xl"
                  >
                    <p className="text-sm mb-3">"{r.text}"</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium">
                        {r.name} – {r.role}
                      </span>
                    </div>
                    <div className="flex mt-2">
                      {[...Array(r.rating)].map((_, j) => (
                        <Star
                          key={j}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GALLERY */}
        <div className="grid md:grid-cols-3 gap-4 mt-16">
          <img src={jamaah1} className="rounded-2xl" />
          <img src={kaabah} className="rounded-2xl" />
          <img src={madinah} className="rounded-2xl" />
        </div>

        {/* CTA */}
        <div className="relative mt-16 rounded-3xl overflow-hidden h-[360px]">
          <img src={ctaUmrah} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-secondary/70 flex flex-col items-center justify-center text-white text-center px-6">
            <h2 className="text-4xl font-bold mb-4">
              Wujudkan Niat Umrah Anda
            </h2>
            <p className="max-w-xl mb-6 text-white/90">
              Konsultasikan rencana Umrah Anda bersama tim Karin Hidayah Tour.
              Kami siap membimbing dari awal hingga akhir.
            </p>
            <button className="bg-white/20 px-8 py-3 rounded-full flex items-center gap-2">
              Konsultasi Gratis <ArrowRight />
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
