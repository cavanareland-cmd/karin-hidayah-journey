import { MapPin, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { useHajjPackages } from "@/hooks/useSupabaseData";
import { Skeleton } from "@/components/ui/skeleton";
import hajjImg1 from "@/assets/hajj-package-1.jpg";

const HajjPackagesSection = () => {
  const { data: packages, isLoading } = useHajjPackages(true);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <section className="py-8 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-border">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <section className="py-8 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.slice(0, 3).map((pkg) => {
            const facilities = (pkg.facilities as string[]) || [];
            
            return (
              <Link
                key={pkg.id}
                to={`/package/${pkg.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image_url || hajjImg1}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold text-foreground">{formatPrice(pkg.price)}</span>
                    <span className="text-muted-foreground text-sm">/Orang</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span className="line-clamp-1">{pkg.duration_days} Hari</span>
                    </div>
                    {facilities.slice(0, 2).map((facility, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Plane className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                        <span className="line-clamp-1">{facility}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <div className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-medium text-center group-hover:bg-secondary/90 transition-colors">
                    Pesan Sekarang
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HajjPackagesSection;
