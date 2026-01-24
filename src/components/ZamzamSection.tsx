import { ArrowRight } from "lucide-react";
import zamzamBg from "@/assets/zamzam-water.jpg";

const ZamzamSection = () => {
  return (
    <section className="section-padding">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={zamzamBg}
          alt="Air Zam Zam"
          className="w-full h-48 md:h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        <div className="absolute inset-0 p-6 flex flex-col justify-center">
          <h3 className="font-serif text-xl font-semibold text-white mb-2">
            AIR ZAM ZAM
          </h3>
          <p className="text-white/70 text-sm mb-4 max-w-[200px] line-clamp-2">
            Zamzam water is an eternal miracle, and You can now eas...
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 w-fit rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            SELENGKAPNYA
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ZamzamSection;
