import { MessageCircle } from "lucide-react";

const BantuanSection = () => {
  return (
    <section className="section-padding">
      <div className="card-elevated p-6 text-center">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          BUTUH BANTUAN?
        </h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
          to contribute to serving the Guests of the Most Merciful
        </p>
        <button className="btn-primary inline-flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Hubungi Kami
        </button>
      </div>
    </section>
  );
};

export default BantuanSection;
