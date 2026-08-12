import { Link } from "react-router-dom";
import { Calendar, Plane, Users, MapPin, Star, ArrowRight, AlertTriangle, PackageOpen, RefreshCw } from "lucide-react";
import { PackageCardSkeletonGrid } from "@/components/PackageCardSkeleton";
import { Button } from "@/components/ui/button";
import { useUmrahPackages } from "@/hooks/useSupabaseData";
import umrahImg from "@/assets/umrah-package.jpg";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Flexible";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const PricingSection = () => {
  const { data: packages, isLoading, isError, refetch, isFetching } = useUmrahPackages();

  // Urutan sama dengan halaman /umrah-packages (default: paling populer)
  const displayPackages = [...(packages || [])]
    .sort((a, b) => (b.total_reviews || 0) - (a.total_reviews || 0))
    .slice(0, 3);

  return (
    <section className="py-16 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">
            Paket Layanan
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-3">
            Pilihan Paket Umrah &amp; Haji
          </h2>
          <p className="text-muted-foreground">
            Pilih paket yang sesuai dengan kebutuhan ibadah dan kenyamanan Anda.
          </p>
        </div>

        {/* Packages Grid */}
        {isLoading ? (
          <PackageCardSkeletonGrid count={3} />

        ) : isError ? (
          <div className="max-w-md mx-auto text-center py-14 px-6 bg-card border border-destructive/30 rounded-2xl">
            <AlertTriangle className="w-10 h-10 text-destructive mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-1">Gagal memuat paket</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Terjadi kendala saat mengambil data paket. Silakan coba lagi.
            </p>
            <Button onClick={() => refetch()} disabled={isFetching} className="gap-2">
              <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
              Coba Lagi
            </Button>
          </div>
        ) : displayPackages.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-14 px-6 bg-card border border-border rounded-2xl">
            <PackageOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-1">Belum ada paket tersedia</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Paket terbaru sedang kami siapkan. Hubungi kami untuk informasi jadwal keberangkatan.
            </p>
            <Link
              to="/umrah-packages"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Lihat Halaman Paket
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPackages.map((pkg) => {
              const facilities = (pkg.facilities as string[]) || [];
              return (
                <Link
                  key={pkg.id}
                  to={`/package/${pkg.id}`}
                  className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={pkg.image_url || umrahImg}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full uppercase">
                        {pkg.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold">{pkg.rating || 5.0}</span>
                      <span className="text-xs text-muted-foreground">({pkg.total_reviews || 0})</span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {pkg.name}
                    </h3>

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
                        <span>Makkah &amp; Madinah</span>
                      </div>
                    </div>

                    {facilities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {facilities.slice(0, 3).map((facility, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-md line-clamp-1"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
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

        {/* View All CTA */}
        {displayPackages.length > 0 && (
          <div className="text-center mt-10">
            <Link
              to="/umrah-packages"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Lihat Semua Paket
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
