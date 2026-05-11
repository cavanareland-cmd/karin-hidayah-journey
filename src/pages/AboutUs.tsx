import { Target, Eye, Heart, Users, Award, Shield, Phone, Mail, MapPin, LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import makkahLandscape from "@/assets/makkah-landscape.jpg";
import { useAboutUsContent, useTeamMembers, useSiteSettings } from "@/hooks/useSupabaseData";

const ICONS: Record<string, LucideIcon> = {
  Heart, Award, Shield, Users, Target, Eye, Phone, Mail, MapPin,
};

const AboutUs = () => {
  const { data: sections } = useAboutUsContent();
  const { data: team } = useTeamMembers();
  const { data: settings } = useSiteSettings();

  const get = (key: string) => sections?.find((s) => s.section_key === key);

  const hero = get("hero");
  const profile = get("profile");
  const stats = get("stats");
  const vision = get("vision");
  const mission = get("mission");
  const values = get("values");
  const cta = get("cta");

  const statsList = (stats?.stats as any[]) || [
    { value: "14+", label: "Tahun Pengalaman" },
    { value: "10K+", label: "Jamaah Dilayani" },
    { value: "50+", label: "Staff Profesional" },
    { value: "100%", label: "Kepuasan Jamaah" },
  ];
  const missionList = (mission?.stats as any[]) || [
    "Memberikan pelayanan prima dari pendaftaran hingga kepulangan",
    "Menyediakan akomodasi dan transportasi berkualitas tinggi",
    "Menghadirkan pembimbing ibadah yang kompeten dan berpengalaman",
    "Menjaga transparansi dan amanah dalam setiap layanan",
  ];
  const valuesList = (values?.stats as any[]) || [
    { icon: "Heart", title: "Amanah", description: "Menjaga kepercayaan jamaah dengan pelayanan terbaik dan transparan" },
    { icon: "Award", title: "Profesional", description: "Standar layanan tinggi dengan tim yang berpengalaman dan terlatih" },
    { icon: "Shield", title: "Terpercaya", description: "Legalitas lengkap dan track record perjalanan yang terbukti aman" },
    { icon: "Users", title: "Kekeluargaan", description: "Melayani jamaah seperti keluarga sendiri dengan penuh kasih sayang" },
  ];

  const phone = settings?.phone || settings?.contact_phone || "+62 812-3456-7890";
  const email = settings?.email || settings?.contact_email || "info@karinhidayah.com";
  const address = settings?.address || settings?.contact_address || "Jakarta, Indonesia";
  const waNumber = (settings?.whatsapp || phone).replace(/\D/g, "");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero?.image_url || makkahLandscape} alt="Makkah" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {hero?.title || "Tentang Kami"}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {hero?.content || "Melayani perjalanan ibadah dengan penuh amanah sejak 2010"}
          </p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {profile?.title || "Karin Hidayah Tour"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {profile?.content ||
                "Karin Hidayah Tour adalah perusahaan travel haji dan umrah yang berdiri sejak tahun 2010."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {statsList.map((s, i) => (
              <div key={i} className="text-center p-6 bg-card rounded-2xl border border-border">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-3xl border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{vision?.title || "Visi"}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {vision?.content ||
                  "Menjadi travel haji dan umrah terdepan di Indonesia yang memberikan pengalaman ibadah terbaik."}
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl border border-border">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{mission?.title || "Misi"}</h3>
              <ul className="text-muted-foreground space-y-3">
                {missionList.map((m: any, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{typeof m === "string" ? m : m.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {values?.title || "Nilai-Nilai Kami"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {values?.content || "Nilai-nilai yang menjadi fondasi dalam setiap pelayanan kami"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {valuesList.map((v: any, i) => {
              const Icon = ICONS[v.icon] || Heart;
              return (
                <div key={i} className="text-center p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tim Kami</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dipimpin oleh para profesional berpengalaman di bidang travel haji dan umrah
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(team || []).map((m) => (
              <div key={m.id} className="bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  {m.image_url && (
                    <img src={m.image_url} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{m.name}</h3>
                  <p className="text-primary font-medium mb-3">{m.position}</p>
                  {m.bio && <p className="text-sm text-muted-foreground">{m.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{cta?.title || "Hubungi Kami"}</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              {cta?.content || "Siap membantu Anda merencanakan perjalanan ibadah yang berkesan"}
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Phone className="w-6 h-6" /></div>
                <span className="text-sm">{phone}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Mail className="w-6 h-6" /></div>
                <span className="text-sm">{email}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><MapPin className="w-6 h-6" /></div>
                <span className="text-sm">{address}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo, saya ingin bertanya tentang layanan Karin Hidayah Tour")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default AboutUs;
