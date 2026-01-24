import { BookOpen, Heart, FileText, Headphones, HandHelping, Compass } from "lucide-react";

const services = [
  { icon: BookOpen, label: "Al Quran" },
  { icon: Heart, label: "Dzikir" },
  { icon: FileText, label: "Hadist" },
  { icon: Headphones, label: "Murotal" },
  { icon: HandHelping, label: "Do'a" },
  { icon: Compass, label: "Qiblat" },
];

const ServiceIconsSection = () => {
  return (
    <section className="py-6 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="flex justify-center gap-4 md:gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-border bg-white flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                <service.icon className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                {service.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceIconsSection;
