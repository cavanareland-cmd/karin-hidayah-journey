import scholar1 from "@/assets/scholar-1.jpg";
import scholar2 from "@/assets/scholar-2.jpg";
import scholar3 from "@/assets/scholar-3.jpg";

const scholars = [
  { image: scholar1, name: "Nuruzaman Mollah", role: "Shariah Consultants" },
  { image: scholar2, name: "Tareq Hussain", role: "Shariah Consultants" },
  { image: scholar3, name: "Mohammad Soleh", role: "Shariah Consultants" },
  { image: scholar1, name: "Nuruzaman Mollah", role: "Shariah Consultants" },
  { image: scholar2, name: "Tareq Hussain", role: "Shariah Consultants" },
  { image: scholar3, name: "Mohammad Soleh", role: "Shariah Consultants" },
];

const HighlightsSection = () => {
  return (
    <section className="py-10 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-primary text-sm font-medium mb-2">
            Our Service
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
            Explore our Highlights services
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            With a steadfast commitment to excellence, Al- Barakah Hajj & Umrah Kafela has achieved 
            remarkable milestones in serving the pilgrims' community
          </p>
        </div>

        {/* Scholars Grid */}
        <div className="flex justify-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {scholars.map((scholar, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-28 md:w-32 text-center group cursor-pointer"
            >
              <div className="relative mb-3">
                <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-primary/30 transition-all">
                  <img
                    src={scholar.image}
                    alt={scholar.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {scholar.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {scholar.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
