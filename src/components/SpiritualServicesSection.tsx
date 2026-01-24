import { BookOpen, Heart, FileText, Headphones, HandHelping, Compass } from "lucide-react";

const services = [
  { icon: BookOpen, label: "Al Quran" },
  { icon: Heart, label: "Dzikir" },
  { icon: FileText, label: "Hadist" },
  { icon: Headphones, label: "Murotal" },
  { icon: HandHelping, label: "Do'a" },
  { icon: Compass, label: "Qiblat" },
];

const SpiritualServicesSection = () => {
  return (
    <section className="section-padding">
      <h2 className="text-center text-foreground/80 text-sm md:text-base mb-6 px-4">
        Layanan untuk Memperkaya Pengalaman Spiritual Anda
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="card-elevated p-4 flex flex-col items-center justify-center hover-lift cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
              <service.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs font-medium text-foreground/80">{service.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpiritualServicesSection;
