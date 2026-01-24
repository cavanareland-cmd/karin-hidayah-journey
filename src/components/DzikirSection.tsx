import { ArrowRight, Heart } from "lucide-react";

const DzikirSection = () => {
  return (
    <section className="section-padding">
      <div className="card-dark p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-0.5">DZIKIR</h3>
            <p className="text-white/60 text-sm">Browse and add your Duas</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
          SELENGKAPNYA
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
};

export default DzikirSection;
