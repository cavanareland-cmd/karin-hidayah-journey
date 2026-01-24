import { Calendar, MapPin } from "lucide-react";
import olehOlehImg from "@/assets/oleh-oleh.jpg";
import travelImg from "@/assets/travel-destination.jpg";

const ArrangementSection = () => {
  return (
    <section className="py-6 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Oleh-oleh Card */}
          <div className="relative overflow-hidden rounded-2xl h-48 md:h-56">
            <img
              src={olehOlehImg}
              alt="Oleh-oleh Haji dan Umrah"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                  NEW SEASON
                </span>
              </div>
              <h3 className="text-white font-bold text-lg leading-tight">
                OLEH-OLEH
              </h3>
              <h3 className="text-white font-bold text-lg leading-tight">
                HAJI DAN UMRAH
              </h3>
            </div>
          </div>

          {/* Middle CTA Card */}
          <div className="flex flex-col justify-center items-center text-center py-6 md:py-0">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2">
              Arrange your <span className="text-primary">time</span>
            </h2>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4">
              and <span className="text-primary">place</span> perfectly.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Plan your trip to explore the world with ease and comfort
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>

          {/* Travel Destination Card */}
          <div className="relative overflow-hidden rounded-2xl h-48 md:h-56">
            <img
              src={travelImg}
              alt="Travel destination"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <Calendar className="w-3 h-3" />
                <span>21 Oct - 24 Oct 2024</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold text-lg mb-1">Travelling to Bali</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-white/80 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>Total</span>
                </div>
                <span className="text-white font-semibold text-sm">7 Spots</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArrangementSection;
