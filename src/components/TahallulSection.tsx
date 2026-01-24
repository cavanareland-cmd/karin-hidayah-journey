import { MapPin } from "lucide-react";
import tahallulBg from "@/assets/tahallul-service.jpg";

const TahallulSection = () => {
  return (
    <section className="section-padding">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Background Image */}
        <img
          src={tahallulBg}
          alt="Tahallul Service"
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-serif text-lg font-semibold text-white mb-2">
            TEMPAT TAHALLUL SAAT UMRAH/HAJI
          </h3>
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            Get a smooth and comfortable shave at the dedicated salons inside the holy Mosque, at affordable prices.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors">
            <MapPin className="w-4 h-4" />
            Get Directions
          </button>
        </div>
      </div>
    </section>
  );
};

export default TahallulSection;
