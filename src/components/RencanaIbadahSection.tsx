import { Plus } from "lucide-react";

const RencanaIbadahSection = () => {
  return (
    <section className="section-padding">
      <div className="card-dark p-6 flex items-center justify-between hover-lift cursor-pointer">
        <div className="space-y-1">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-medium mb-2">
            RENCANA IBADAHKU
          </div>
          <p className="text-secondary-foreground/80 text-sm leading-relaxed">
            Semua yang kamu butuhkan<br />
            untuk perjalananmu menuju Baitullah
          </p>
        </div>
        <button className="icon-btn-light">
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default RencanaIbadahSection;
