import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-b-3xl md:rounded-b-[3rem]">
        {/* Background Image */}
        <img
          src={heroBg}
          alt="Kaaba at night"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-dark" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12">
          <div className="max-w-lg">
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-2">
              Oleh - oleh
            </h1>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight">
              Haji dan Umrah
            </h1>
          </div>
        </div>

        {/* Decorative Gold Pattern - Top Corners */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-60 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A962" />
                <stop offset="100%" stopColor="#E5C882" />
              </linearGradient>
            </defs>
            <path
              d="M0,0 Q50,0 50,50 Q0,50 0,0 Z"
              fill="url(#goldGrad)"
              opacity="0.3"
            />
          </svg>
        </div>
        
        <div className="absolute top-0 right-0 w-32 h-32 opacity-60 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M100,0 Q50,0 50,50 Q100,50 100,0 Z"
              fill="url(#goldGrad)"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
