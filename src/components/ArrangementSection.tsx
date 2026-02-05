import { Calendar, MapPin } from "lucide-react";
import { useArrangementSection } from "@/hooks/useSupabaseData";
import olehOlehImg from "@/assets/oleh-oleh.jpg";
import travelImg from "@/assets/travel-destination.jpg";
import { Link } from "react-router-dom";

const ArrangementSection = () => {
  const { data: sections } = useArrangementSection();
  
  const leftCard = sections?.find((s) => s.section_key === "left_card");
  const centerCta = sections?.find((s) => s.section_key === "center_cta");
  const rightCard = sections?.find((s) => s.section_key === "right_card");

  return (
    <section className="py-6 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Oleh-oleh Card */}
          <div className="relative overflow-hidden rounded-2xl h-48 md:h-56">
            <img
              src={leftCard?.image_url || olehOlehImg}
              alt={leftCard?.title || "Oleh-oleh Haji dan Umrah"}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                  {leftCard?.badge_text || "NEW SEASON"}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg leading-tight">
                {leftCard?.title || "OLEH-OLEH"}
              </h3>
              <h3 className="text-white font-bold text-lg leading-tight">
                {leftCard?.subtitle || "HAJI DAN UMRAH"}
              </h3>
            </div>
          </div>

          {/* Middle CTA Card */}
          <div className="flex flex-col justify-center items-center text-center py-6 md:py-0">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2">
              {centerCta?.title || "Arrange your"} <span className="text-primary">time</span>
            </h2>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4">
              {centerCta?.subtitle || "and place perfectly."}
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              {centerCta?.description || "Plan your trip to explore the world with ease and comfort"}
            </p>
            <Link 
              to={centerCta?.button_link || "#"}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {centerCta?.button_text || "Get Started"}
            </Link>
          </div>

          {/* Travel Destination Card */}
          <div className="relative overflow-hidden rounded-2xl h-48 md:h-56">
            <img
              src={rightCard?.image_url || travelImg}
              alt={rightCard?.title || "Travel destination"}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <Calendar className="w-3 h-3" />
                <span>{rightCard?.date_text || "21 Oct - 24 Oct 2024"}</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold text-lg mb-1">{rightCard?.title || "Travelling to Bali"}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-white/80 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>{rightCard?.location_text || "Total"}</span>
                </div>
                <span className="text-white font-semibold text-sm">{rightCard?.spots_text || "7 Spots"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArrangementSection;
