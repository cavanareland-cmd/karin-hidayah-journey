import { ShieldCheck, Package, Users } from "lucide-react";

import Dubai from "@/assets/glass-kayaking.jpg";
import Aqsa from "@/assets/lava-massage.jpg";
import Mesir from "@/assets/cta-beach.jpg";


const services = [
  {
    image: Dubai,
    title: "Layanan Profesional",
    description:
      "Didukung tim berpengalaman yang mendampingi jamaah dari awal pendaftaran hingga kepulangan.",
    icon: Users,
  },
  {
    image: Aqsa,
    title: "Perlengkapan Premium",
    description:
      "Setiap jamaah mendapatkan perlengkapan ibadah lengkap dan berkualitas tinggi.",
    icon: Package,
  },
  {
    image: Mesir,
    title: "Resmi & Terpercaya",
    description:
      "Berizin resmi Kementerian Agama RI dan telah memberangkatkan ribuan jamaah.",
    icon: ShieldCheck,
  },
];


const ExploreSection = () => {
  return (
    <section className="py-12 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
          Keunggulan Layanan Karin Hidayah Tour
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{services.map((item, index) => {
  const Icon = item.icon;

  return (
    <div
      key={index}
      className="relative overflow-hidden rounded-2xl group h-72"
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <div className="w-12 h-12 bg-primary/90 rounded-xl flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-white font-bold text-lg mb-2">
          {item.title}
        </h3>
        <p className="text-white/85 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
})}

        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
