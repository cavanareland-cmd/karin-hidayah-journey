import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import makkahLandscape from "@/assets/makkah-landscape.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Tim kami akan segera merespons.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat Kantor",
      details: ["Jl. Masjid Raya No. 123", "Jakarta Selatan, 12345", "Indonesia"],
    },
    {
      icon: Phone,
      title: "Telepon",
      details: ["+62 812 3456 7890", "+62 21 1234 5678"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@karinhidayah.com", "booking@karinhidayah.com"],
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      details: ["Senin - Jumat: 08:00 - 17:00", "Sabtu: 09:00 - 14:00", "Minggu: Tutup"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={makkahLandscape}
              alt="Kontak Karin Hidayah Tour"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hubungi Kami
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Kami siap membantu mewujudkan perjalanan ibadah Anda
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Kirim Pesan
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Isi formulir di bawah ini dan tim kami akan menghubungi Anda segera.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Masukkan nama lengkap"
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@contoh.com"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+62 812 3456 7890"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subjek *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Pilih subjek pesan"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Pesan *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tulis pesan Anda di sini..."
                        rows={5}
                        required
                        className="bg-background resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Kirim Pesan
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="order-1 lg:order-2 space-y-8">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Informasi Kontak
                  </h2>
                  <p className="text-muted-foreground">
                    Kunjungi kantor kami atau hubungi melalui kontak di bawah ini.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-xl p-5 border border-border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Chat via WhatsApp</h3>
                      <p className="text-white/80 text-sm">Respon cepat dalam hitungan menit</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Karin%20Hidayah%20Tour,%20saya%20ingin%20bertanya%20tentang%20paket%20umrah/haji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-green-600 py-3 rounded-xl font-semibold text-center hover:bg-white/90 transition-colors"
                  >
                    Mulai Chat Sekarang
                  </a>
                </div>

                {/* Map */}
                <div className="bg-card rounded-2xl overflow-hidden border border-border">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Lokasi Kantor
                    </h3>
                  </div>
                  <div className="aspect-video bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0665456893373!2d106.82266431476894!3d-6.256444295458654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1640000000000!5m2!1sid!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lokasi Kantor Karin Hidayah Tour"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Temukan jawaban untuk pertanyaan umum seputar layanan umrah dan haji kami.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  q: "Berapa lama proses pendaftaran?",
                  a: "Proses pendaftaran biasanya memakan waktu 1-2 hari kerja setelah dokumen lengkap.",
                },
                {
                  q: "Apa saja dokumen yang diperlukan?",
                  a: "Paspor, KTP, foto, buku nikah (jika berpasangan), dan surat kesehatan.",
                },
                {
                  q: "Apakah bisa cicilan pembayaran?",
                  a: "Ya, kami menyediakan opsi cicilan hingga 12 bulan dengan berbagai bank partner.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-card rounded-xl p-6 text-left border border-border">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Contact;
