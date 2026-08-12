import { useState } from "react";
import { Link } from "react-router-dom";
import { useUmrahPackages } from "@/hooks/useSupabaseData";
import { Skeleton } from "@/components/ui/skeleton";
import featuredImg from "@/assets/destination-featured.jpg";

const FeaturedTourSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  // Sumber data sama dengan /umrah-packages (semua paket aktif)
  const { data: packages, isLoading } = useUmrahPackages();

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
      <section className="py-10 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-32" />
            </div>
            <div className="order-1 md:order-2">
              <Skeleton className="h-72 md:h-96 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!packages || packages.length === 0) {
    return null;
  }

  const featuredPackage = packages[activeSlide % packages.length];
  const totalSlides = Math.min(packages.length, 4);

  return (
    <section className="py-10 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 md:order-1">
            <div className="border-l-2 border-border pl-4 mb-4">
              <p className="text-muted-foreground text-sm">{featuredPackage.category}</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
              {featuredPackage.name}
            </h2>
            <p className="text-primary font-bold text-xl mb-4">
              {formatPrice(featuredPackage.price)}
            </p>
            <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
              {featuredPackage.description || `Paket perjalanan umrah ${featuredPackage.duration_days} hari dengan fasilitas terbaik untuk pengalaman ibadah yang sempurna di Tanah Suci.`}
            </p>
            <a 
              href={`/package/${featuredPackage.id}`}
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Lihat Detail
            </a>
          </div>

          {/* Right Image */}
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden h-72 md:h-96">
              <img
                src={featuredPackage.image_url || featuredImg}
                alt={featuredPackage.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrow */}
              <button 
                onClick={() => setActiveSlide((prev) => (prev + 1) % totalSlides)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeSlide === idx
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTourSection;
