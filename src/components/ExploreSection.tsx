import { useEffect, useState } from "react";
import { Clock, Users, Bookmark } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import destinationImg from "@/assets/destination-1.jpg";
import { Link } from "react-router-dom";

interface ExploreItem {
  id: string;
  title: string;
  image_url: string | null;
  link_url: string | null;
  badge_text: string | null;
  duration: string | null;
  guests: number | null;
  max_guests: number | null;
}

const ExploreSection = () => {
  const [items, setItems] = useState<ExploreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from("highlight_services")
          .select("id, title, image_url, link_url, badge_text, duration, guests, max_guests")
          .eq("is_active", true)
          .order("order_index", { ascending: true })
          .limit(3);

        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Fallback data if no items from database
  const defaultItems = [
    {
      id: "1",
      image_url: destinationImg,
      title: "Egyptian pyramids",
      badge_text: "Place",
      duration: "5 d",
      guests: 100,
      max_guests: 80,
      link_url: null,
    },
    {
      id: "2",
      image_url: destinationImg,
      title: "Egyptian pyramids",
      badge_text: "Place",
      duration: "5 d",
      guests: 100,
      max_guests: 80,
      link_url: null,
    },
    {
      id: "3",
      image_url: destinationImg,
      title: "Egyptian pyramids",
      badge_text: "Place",
      duration: "5 d",
      guests: 100,
      max_guests: 80,
      link_url: null,
    },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section className="py-8 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
          Explore our Highlights services
        </h2>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayItems.map((dest) => {
            const CardContent = (
              <>
                {/* Image */}
                <img
                  src={dest.image_url || destinationImg}
                  alt={dest.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    {dest.badge_text || "Place"}
                  </span>
                </div>

                {/* Bookmark */}
                <button className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Bookmark className="w-4 h-4 text-primary-foreground" />
                </button>

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-3">
                    {dest.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{dest.duration || "5 d"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{dest.guests || 100}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{dest.max_guests || 80}</span>
                    </div>
                  </div>
                </div>
              </>
            );

            return dest.link_url ? (
              <Link
                key={dest.id}
                to={dest.link_url}
                className="relative overflow-hidden rounded-2xl group cursor-pointer h-64 block"
              >
                {CardContent}
              </Link>
            ) : (
              <div
                key={dest.id}
                className="relative overflow-hidden rounded-2xl group cursor-pointer h-64"
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
