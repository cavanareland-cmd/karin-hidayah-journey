import { Plus } from "lucide-react";

const BookingSection = () => {
  const bookingCards = [
    { title: "Booking", subtitle: "Umrah" },
    { title: "Booking", subtitle: "Haji" },
  ];

  return (
    <section className="section-padding pt-0">
      <div className="grid grid-cols-2 gap-4">
        {bookingCards.map((card, index) => (
          <div
            key={index}
            className="card-dark p-5 flex flex-col items-center justify-center aspect-square hover-lift cursor-pointer group"
          >
            <button className="icon-btn bg-white/10 text-white group-hover:bg-white/20 transition-colors mb-3">
              <Plus className="w-5 h-5" />
            </button>
            <span className="text-secondary-foreground/70 text-xs">{card.title}</span>
            <span className="text-white font-medium">{card.subtitle}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingSection;
