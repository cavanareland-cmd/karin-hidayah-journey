import {
  Book,
  Shirt,
  Laptop,
  Gamepad2,
} from "lucide-react";

const categories = [
  { id: "manasik", label: "Manasik Umrah", icon: Book },
  { id: "perlengkapan", label: "Perlengkapan Ibadah", icon: Shirt },
  { id: "eguide", label: "E-Guide & Materi", icon: Laptop },
  { id: "aktivitas", label: "Aktivitas Jamaah", icon: Gamepad2 },
];

const CategoryGridSection = () => {
  return (
    <section className="bg-muted/40 py-14 px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <h2 className="mb-8 text-2xl font-serif">
          Layanan & Fasilitas Jamaah
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl border bg-background px-5 py-4
                           hover:bg-muted transition-colors"
              >
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGridSection;
