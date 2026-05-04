import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Shirt, Package, Star, Phone, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    icon: Shirt,
    title: "Pakaian Ihram",
    description: "Kain ihram berkualitas premium untuk pria dan mukena khusus untuk wanita.",
    items: ["Kain Ihram Pria", "Mukena Ihram", "Sabuk Ihram", "Sandal Jepit"],
  },
  {
    icon: Package,
    title: "Tas & Koper",
    description: "Tas paspor, koper kabin, dan tas serbaguna untuk kebutuhan perjalanan.",
    items: ["Tas Paspor", "Koper Kabin", "Tas Selempang", "Tas Sandal"],
  },
  {
    icon: ShoppingBag,
    title: "Perlengkapan Sholat",
    description: "Sajadah, tasbih, Al-Qur'an saku, dan buku doa lengkap.",
    items: ["Sajadah Travel", "Tasbih Digital", "Al-Qur'an Saku", "Buku Doa"],
  },
  {
    icon: Star,
    title: "Aksesoris Lainnya",
    description: "Botol Zamzam, masker, kacamata hitam, dan keperluan harian.",
    items: ["Botol Zamzam", "Masker", "Sunblock", "Hand Sanitizer"],
  },
];

const features = [
  "Produk asli & berkualitas premium",
  "Harga terjangkau dengan paket lengkap",
  "Tersedia paket bundling hemat",
  "Konsultasi pemilihan perlengkapan",
  "Pengiriman ke seluruh Indonesia",
  "Garansi penggantian produk",
];

export default function PerlengkapanIbadah() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm opacity-90 hover:opacity-100 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>

          <Badge className="bg-accent text-accent-foreground mb-4">
            Perlengkapan Ibadah
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Perlengkapan Ibadah Haji & Umrah
          </h1>
          <p className="text-base md:text-lg max-w-2xl opacity-90 mb-8">
            Lengkapi kebutuhan ibadah Anda di Tanah Suci dengan perlengkapan
            berkualitas premium. Tersedia paket bundling hemat untuk seluruh
            jamaah.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a
                href="https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20perlengkapan%20ibadah"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="mr-2 h-4 w-4" />
                Pesan Sekarang
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/umrah-packages">Lihat Paket Umrah</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Kategori Produk
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Pilihan Perlengkapan Lengkap
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Berbagai produk pilihan untuk mendukung kekhusyukan ibadah Anda
              di Tanah Suci.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card
                  key={cat.title}
                  className="border-2 hover:border-primary transition group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{cat.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {cat.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/40 py-16 px-4">
        <div className="container mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <Badge variant="secondary" className="mb-3">
              Mengapa Kami?
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Keunggulan Perlengkapan Kami
            </h2>
            <p className="text-muted-foreground mb-6">
              Kami menyediakan perlengkapan ibadah pilihan dengan kualitas
              terbaik dan harga bersahabat untuk seluruh jamaah.
            </p>

            <ul className="space-y-3">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-8">
              <Badge className="bg-accent text-accent-foreground mb-4">
                Paket Hemat
              </Badge>
              <h3 className="text-2xl font-bold mb-3">
                Paket Bundling Lengkap
              </h3>
              <p className="opacity-90 mb-6 text-sm">
                Hemat hingga 30% dengan paket bundling perlengkapan ibadah
                lengkap untuk umrah & haji.
              </p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Kain Ihram / Mukena
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Tas Paspor & Koper Kabin
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Sajadah & Tasbih Digital
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Buku Doa & Botol Zamzam
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a
                  href="https://wa.me/6281234567890?text=Saya%20ingin%20info%20paket%20bundling%20perlengkapan%20ibadah"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dapatkan Penawaran
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Butuh Perlengkapan Ibadah?
          </h2>
          <p className="opacity-90 mb-8">
            Konsultasikan kebutuhan perlengkapan ibadah Anda dengan tim kami.
            Kami siap membantu memilih produk terbaik sesuai budget Anda.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a
              href="https://wa.me/6281234567890?text=Saya%20ingin%20konsultasi%20perlengkapan%20ibadah"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="mr-2 h-4 w-4" />
              Hubungi Kami via WhatsApp
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
