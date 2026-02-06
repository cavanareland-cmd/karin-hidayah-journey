import {
  Book,
  Shirt,
  Laptop,
  Gamepad2,
  ShoppingBasket,
  HeartPulse,
} from "lucide-react";

const categories = [
  { label: "Manasik Umrah", icon: Book },
  { label: "Perlengkapan Ibadah", icon: Shirt },
  { label: "E-Guide & Materi", icon: Laptop },
  { label: "Aktivitas Jamaah", icon: Gamepad2 },
  { label: "Konsumsi & Logistik", icon: ShoppingBasket },
  { label: "Kesehatan Jamaah", icon: HeartPulse },
];

const CategoryGridSection = () => {
  return (
    <section className="bg-muted/40 py-12 px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Layanan & Fasilitas Jamaah
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3 hover:bg-muted transition"
              >
                <Icon className="w-5 h-5 text-primary" />
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
