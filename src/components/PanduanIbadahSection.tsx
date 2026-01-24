import { Moon, Bed, MessageCircle, ChevronRight } from "lucide-react";

const guides = [
  {
    icon: Moon,
    title: "Thikr said in the morning and evening",
  },
  {
    icon: Bed,
    title: "Thikr before sleeping",
  },
  {
    icon: MessageCircle,
    title: "Thikr after salam",
  },
];

const PanduanIbadahSection = () => {
  return (
    <section className="section-padding">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title font-serif">PANDUAN IBADAH UMRAH</h2>
        <a href="#" className="text-primary text-sm font-medium hover:underline">
          View All
        </a>
      </div>

      <div className="grid gap-3">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="card-elevated p-4 flex items-center gap-4 hover-lift cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
              <guide.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-sm text-foreground/80 flex-1 line-clamp-2">
              {guide.title}
            </p>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PanduanIbadahSection;
