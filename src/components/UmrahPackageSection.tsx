import { ChevronRight } from "lucide-react";
import umrahPackageBg from "@/assets/umrah-package.jpg";

const packages = [
  {
    title: "UMRAH SYAWAL 2026",
    price: "Rp. 40.000.000",
    image: umrahPackageBg,
  },
];

const UmrahPackageSection = () => {
  return (
    <section className="section-padding">
      <h2 className="section-title mb-4 font-serif">PAKET UMRAH EKSKLUSIF</h2>

      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-4" style={{ width: "max-content" }}>
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="relative w-72 h-44 rounded-2xl overflow-hidden hover-lift cursor-pointer group"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-white font-semibold mb-1">
                  {pkg.title}
                </h3>
                <p className="text-white/80 text-sm">
                  Mulai dari {pkg.price}
                </p>
              </div>

              <button className="absolute right-3 bottom-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white/30 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* View More Card */}
          <div className="w-72 h-44 rounded-2xl bg-muted flex items-center justify-center hover-lift cursor-pointer group">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                <ChevronRight className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Lihat Semua</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UmrahPackageSection;
