import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useHomepageSettings } from "@/hooks/useSupabaseData";
import heroBgDefault from "@/assets/hero-adventure.jpg";

const HeroSection = () => {
  const { data: settings } = useHomepageSettings();
  
  const heroSettings = settings?.find((s) => s.section_key === "hero");
  
  const title = heroSettings?.title || "Your next adventure";
  const subtitle = heroSettings?.subtitle || "starts here";
  const description = heroSettings?.description || "Unique trips to the most fascinating places on Earth";
  const buttonText = heroSettings?.button_text || "Lihat Paket";
  const buttonLink = heroSettings?.button_link || "/umrah-packages";
  const heroImage = heroSettings?.image_url || heroBgDefault;

  return (
    <section className="relative mx-4 lg:mx-8 mt-4">
      {/* Desktop & Tablet Hero */}
      <div className="relative h-[280px] sm:h-[350px] md:h-[420px] lg:h-[500px] xl:h-[560px] overflow-hidden rounded-2xl md:rounded-3xl">
        {/* Background Image */}
        <img
          src={heroImage}
          alt="Adventure destination"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/50 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-between p-6 md:p-10 lg:p-16">
          <div className="max-w-lg lg:max-w-xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-2 md:mb-4">
              {title}
            </h1>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4 md:mb-6">
              {subtitle}
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-md mb-6">
              {description}
            </p>
            
            {/* CTA Button */}
            {buttonText && (
              <Link
                to={buttonLink}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-full font-medium transition-colors"
              >
                {buttonText}
              </Link>
            )}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-64 lg:w-80 xl:w-96 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-3 lg:py-4 px-5 lg:px-6 pr-14 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm lg:text-base"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-11 lg:h-11 bg-accent rounded-full flex items-center justify-center hover:bg-accent/90 transition-colors">
                <Search className="w-4 h-4 lg:w-5 lg:h-5 text-accent-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search destinations..."
            className="w-full bg-muted border border-border rounded-full py-3 px-5 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary rounded-full flex items-center justify-center">
            <Search className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
