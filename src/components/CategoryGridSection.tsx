import { Link } from "react-router-dom";
import { Book, Shirt, Laptop, Gamepad2 } from "lucide-react";

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
    <section className="bg-muted/40 py-14 px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.slug}
                to={`/kategori/${item.slug}`}
                aria-label={`Buka kategori ${item.label}`}
                className="
                  group
                  flex items-center gap-3
                  rounded-xl border
                  bg-background
                  px-5 py-4
                  transition
                  hover:bg-muted
                  hover:shadow-md
                  hover:-translate-y-0.5
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                "
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition">
                  <Icon className="h-5 w-5" />
                </div>

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
