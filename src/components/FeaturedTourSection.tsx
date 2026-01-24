import { useState } from "react";
import featuredImg from "@/assets/destination-featured.jpg";

const FeaturedTourSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;

  return (
    <section className="py-10 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 md:order-1">
            <div className="border-l-2 border-border pl-4 mb-4">
              <p className="text-muted-foreground text-sm">Russia, Kamchatka</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
              Kamchatka tour: Kryopka Hill
            </h2>
            <p className="text-primary font-bold text-xl mb-4">
              $7,999.00
            </p>
            <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
              Journey to the most majestic region of Kamchatka, to the territory 
              of a nature park with the largest active volcano in Eurasia 
              and landscapes worthy of a magazine cover.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
              Buy Ticket
            </button>
          </div>

          {/* Right Image */}
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden h-72 md:h-96">
              <img
                src={featuredImg}
                alt="Kamchatka tour"
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrow */}
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
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
