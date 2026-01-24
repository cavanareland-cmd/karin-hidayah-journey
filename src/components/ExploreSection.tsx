import { Clock, Users, Bookmark } from "lucide-react";
import destinationImg from "@/assets/destination-1.jpg";

const destinations = [
  {
    image: destinationImg,
    title: "Egyptian pyramids",
    duration: "5 d",
    guests: "100",
    maxGuests: "80",
  },
  {
    image: destinationImg,
    title: "Egyptian pyramids",
    duration: "5 d",
    guests: "100",
    maxGuests: "80",
  },
  {
    image: destinationImg,
    title: "Egyptian pyramids",
    duration: "5 d",
    guests: "100",
    maxGuests: "80",
  },
];

const ExploreSection = () => {
  return (
    <section className="py-8 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
          Explore our Highlights services
        </h2>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl group cursor-pointer h-64"
            >
              {/* Image */}
              <img
                src={dest.image}
                alt={dest.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                  Place
                </span>
              </div>

              {/* Bookmark */}
              <button className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Bookmark className="w-4 h-4 text-primary-foreground" />
              </button>

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-3">
                  {dest.title}
                </h3>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{dest.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{dest.guests}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{dest.maxGuests}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
