import { Link } from "react-router-dom";
import {
  Book,
  Shirt,
  Laptop,
  Gamepad2,
} from "lucide-react";

const categories = [
  { label: "Manasik Umrah", icon: Book, slug: "manasik-umrah" },
  { label: "Perlengkapan Ibadah", icon: Shirt, slug: "perlengkapan-ibadah" },
  { label: "E-Guide & Materi", icon: Laptop, slug: "e-guide-materi" },
  { label: "Aktivitas Jamaah", icon: Gamepad2, slug: "aktivitas-jamaah" },
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
                className="group flex items-center gap-3 rounded-lg border bg-background px-4 py-4 transition
                           hover:bg-muted hover:shadow-md"
              >
                <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition" />
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
