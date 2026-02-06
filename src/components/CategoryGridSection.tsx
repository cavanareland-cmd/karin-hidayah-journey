import { Link } from "react-router-dom";
import {
  Book,
  Shirt,
  Laptop,
  Gamepad2,
} from "lucide-react";

const categories = [
  {
    label: "Manasik Umrah",
    slug: "manasik-umrah",
    icon: Book,
  },
  {
    label: "Perlengkapan Ibadah",
    slug: "perlengkapan-ibadah",
    icon: Shirt,
  },
  {
    label: "E-Guide & Materi",
    slug: "e-guide-materi",
    icon: Laptop,
  },
  {
    label: "Aktivitas Jamaah",
    slug: "aktivitas-jamaah",
    icon: Gamepad2,
  },
];

const CategoryGridSection = () => {
  return (
    <section className="bg-muted/40 py-12 px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.slug}
                to={`/kategori/${item.slug}`}
                className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3 hover:bg-muted transition"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGridSection;
