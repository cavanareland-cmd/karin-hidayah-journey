import { Target, Eye, Heart, Users, Award, Shield, Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import makkahLandscape from "@/assets/makkah-landscape.jpg";
import scholar1 from "@/assets/scholar-1.jpg";
import scholar2 from "@/assets/scholar-2.jpg";
import scholar3 from "@/assets/scholar-3.jpg";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Ustadz Ahmad Hidayat",
      role: "Founder & CEO",
      image: scholar1,
      description: "Berpengalaman 20+ tahun dalam industri travel haji dan umrah"
    },
    {
      name: "Hj. Siti Karina",
      role: "Direktur Operasional",
      image: scholar2,
      description: "Ahli dalam manajemen perjalanan ibadah dan pelayanan jamaah"
    },
    {
      name: "Ustadz Muhammad Rizki",
      role: "Pembimbing Ibadah",
      image: scholar3,
      description: "Hafidz Quran dan lulusan Universitas Islam Madinah"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Amanah",
      description: "Menjaga kepercayaan jamaah dengan pelayanan terbaik dan transparan"
    },
    {
      icon: Award,
      title: "Profesional",
      description: "Standar layanan tinggi dengan tim yang berpengalaman dan terlatih"
    },
    {
      icon: Shield,
      title: "Terpercaya",
      description: "Legalitas lengkap dan track record perjalanan yang terbukti aman"
    },
    {
      icon: Users,
      title: "Kekeluargaan",
      description: "Melayani jamaah seperti keluarga sendiri dengan penuh kasih sayang"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={makkahLandscape} 
            alt="Makkah" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Tentang Kami
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Melayani perjalanan ibadah dengan penuh amanah sejak 2010
          </p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Karin Hidayah Tour
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Karin Hidayah Tour adalah perusahaan travel haji dan umrah yang berdiri sejak tahun 2010. 
              Berawal dari keinginan untuk memberikan pelayanan terbaik bagi umat Islam Indonesia yang 
              ingin menunaikan ibadah ke Tanah Suci, kami terus berkembang dan telah memberangkatkan 
              lebih dari 10.000 jamaah ke Makkah dan Madinah.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dengan izin resmi dari Kementerian Agama RI dan dukungan tim profesional yang berpengalaman, 
              kami berkomitmen untuk menjadi mitra perjalanan ibadah yang amanah, profesional, dan terpercaya.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-card rounded-2xl border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">14+</div>
              <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
            </div>
            <div className="text-center p-6 bg-card rounded-2xl border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Jamaah Dilayani</div>
            </div>
            <div className="text-center p-6 bg-card rounded-2xl border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Staff Profesional</div>
            </div>
            <div className="text-center p-6 bg-card rounded-2xl border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Kepuasan Jamaah</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision */}
            <div className="bg-card p-8 rounded-3xl border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Visi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi travel haji dan umrah terdepan di Indonesia yang memberikan pengalaman 
                ibadah terbaik dengan pelayanan berkelas internasional, sehingga setiap jamaah 
                dapat menjalankan ibadah dengan khusyuk dan bermakna.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-card p-8 rounded-3xl border border-border">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Misi</h3>
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Memberikan pelayanan prima dari pendaftaran hingga kepulangan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Menyediakan akomodasi dan transportasi berkualitas tinggi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Menghadirkan pembimbing ibadah yang kompeten dan berpengalaman</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Menjaga transparansi dan amanah dalam setiap layanan</span>
                </li>
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
              Nilai-Nilai Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi dalam setiap pelayanan kami
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tim Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dipimpin oleh para profesional berpengalaman di bidang travel haji dan umrah
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Hubungi Kami
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Siap membantu Anda merencanakan perjalanan ibadah yang berkesan
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-sm">info@karinhidayah.com</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
            </div>

            <a
              href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20bertanya%20tentang%20layanan%20Karin%20Hidayah%20Tour"
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
