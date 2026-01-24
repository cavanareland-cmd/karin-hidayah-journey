import { MapPin, Plane } from "lucide-react";
import hajjImg1 from "@/assets/hajj-package-1.jpg";
import hajjImg2 from "@/assets/hajj-package-2.jpg";
import hajjImg3 from "@/assets/hajj-package-3.jpg";

const packages = [
  {
    image: hajjImg1,
    title: "Hajj Packge 10 Days",
    price: "$650",
    priceNote: "/Person",
    details: [
      "Hotel Makkah | Distance 0-500m",
      "Hotel Madina | Distance 0-500m",
      "Flights (up/Dhka) - Saudia Airlines Dhaka - Jedda",
      "Flights (Down/Elma) - Saudia Airlines Madínah - Dhaka",
    ],
  },
  {
    image: hajjImg2,
    title: "Hajj Packge 10 Days",
    price: "$650",
    priceNote: "/Person",
    details: [
      "Hotel Makkah | Distance 0-500m",
      "Hotel Madina | Distance 0-500m",
      "Flights (up/Dhka) - Saudia Airlines Dhaka - Jedda",
      "Flights (Down/Elma) - Saudia Airlines Madínah - Dhaka",
    ],
  },
  {
    image: hajjImg3,
    title: "Hajj Packge 10 Days",
    price: "$650",
    priceNote: "/Person",
    details: [
      "Hotel Makkah | Distance 0-500m",
      "Hotel Madina | Distance 0-500m",
      "Flights (up/Dhka) - Saudia Airlines Dhaka - Jedda",
      "Flights (Down/Elma) - Saudia Airlines Madínah - Dhaka",
    ],
  },
];

const HajjPackagesSection = () => {
  return (
    <section className="py-8 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                  {pkg.title}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold text-foreground">{pkg.price}</span>
                  <span className="text-muted-foreground text-sm">{pkg.priceNote}</span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-5">
                  {pkg.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      {idx < 2 ? (
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      ) : (
                        <Plane className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      )}
                      <span className="line-clamp-1">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-medium hover:bg-secondary/90 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HajjPackagesSection;
