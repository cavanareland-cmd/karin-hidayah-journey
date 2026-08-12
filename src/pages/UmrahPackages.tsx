import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Plane, Calendar, Users, Star, Filter, ChevronDown, AlertTriangle, PackageOpen, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useUmrahPackages, useSiteSettings } from "@/hooks/useSupabaseData";
import makkahImg from "@/assets/makkah-landscape.jpg";
import umrahImg from "@/assets/umrah-package.jpg";

const categories = [
  { id: "all", label: "Semua Paket" },
  { id: "Regular", label: "Regular" },
  { id: "Premium", label: "Premium" },
  { id: "Ramadhan", label: "Ramadhan" },
  { id: "Plus", label: "Umrah Plus" },
  { id: "VIP", label: "VIP" },
];

const UmrahPackages = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const { data: packages, isLoading, isError, refetch, isFetching } = useUmrahPackages();
  const { data: settings } = useSiteSettings();

  const whatsappNumber = settings?.whatsapp_number || "6281234567890";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Flexible";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredPackages = activeCategory === "all" 
    ? (packages || [])
    : (packages || []).filter(pkg => pkg.category === activeCategory);

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return (b.total_reviews || 0) - (a.total_reviews || 0);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[300px] lg:h-[400px] overflow-hidden">
        <img 
          src={makkahImg} 
          alt="Makkah" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Paket Umrah</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-2xl">
            Temukan paket umrah terbaik dengan harga terjangkau dan pelayanan berkualitas
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-40 bg-background border-b border-border py-4 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort & Filter */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-border rounded-lg text-sm bg-background hover:bg-muted transition-colors cursor-pointer"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-8 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between gap-4">
            {isLoading ? (
              <Skeleton className="h-5 w-48" />
            ) : (
              <p className="text-muted-foreground">
                Menampilkan <span className="font-semibold text-foreground">{isError ? 0 : sortedPackages.length}</span> paket umrah
              </p>
            )}
            {!isLoading && isFetching && (
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Memperbarui...
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
                  <Skeleton className="h-52 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="max-w-md mx-auto text-center py-16 px-6 bg-card border border-destructive/30 rounded-2xl">
              <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Gagal memuat data paket</h3>
              <p className="text-muted-foreground mb-6">
                Koneksi ke server bermasalah. Periksa jaringan Anda lalu coba muat ulang.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => refetch()} disabled={isFetching} className="gap-2">
                  <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
                  Coba Lagi
                </Button>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Tanya via WhatsApp
                </a>
              </div>
            </div>
          ) : sortedPackages.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16 px-6 bg-card border border-border rounded-2xl">
              <PackageOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                {activeCategory === "all" ? "Belum ada paket tersedia" : "Tidak ada paket di kategori ini"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {activeCategory === "all"
                  ? "Paket terbaru sedang kami siapkan. Hubungi kami untuk info jadwal keberangkatan."
                  : "Coba pilih kategori lain atau lihat semua paket yang tersedia."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {activeCategory !== "all" && (
                  <Button onClick={() => setActiveCategory("all")}>Lihat Semua Paket</Button>
                )}
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Tanya via WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPackages.map((pkg) => {
                const facilities = (pkg.facilities as string[]) || [];
                
                return (
                  <Link
                    key={pkg.id}
                    to={`/package/${pkg.id}`}
                    className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={pkg.image_url || umrahImg}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full uppercase">
                          {pkg.category}
                        </span>
                      </div>
                      {/* Rating */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-semibold">{pkg.rating || 5.0}</span>
                        <span className="text-xs text-muted-foreground">({pkg.total_reviews || 0})</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {pkg.name}
                      </h3>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{pkg.duration_days} Hari</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Plane className="w-4 h-4 text-primary" />
                          <span>{formatDate(pkg.departure_date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4 text-primary" />
                          <span>Kuota Tersedia</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>Makkah & Madinah</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {facilities.slice(0, 3).map((facility, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-md"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-xl font-bold text-primary">{formatPrice(pkg.price)}</p>
                          <p className="text-xs text-muted-foreground">/orang</p>
                        </div>
                        <div className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm group-hover:bg-primary/90 transition-colors">
                          Pesan Sekarang
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 lg:px-8 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Butuh Bantuan Memilih Paket?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Tim kami siap membantu Anda menemukan paket umrah yang sesuai dengan kebutuhan dan budget Anda
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Hubungi Kami
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default UmrahPackages;
