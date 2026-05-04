import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle2, MapPin, Sparkles, Users, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    no: "01",
    title: "Niat & Ihram",
    description:
      "Memulai ihram dari miqat dengan niat umrah, mengenakan pakaian ihram, dan membaca talbiyah.",
  },
  {
    no: "02",
    title: "Thawaf",
    description:
      "Mengelilingi Ka'bah sebanyak 7 putaran dimulai dari Hajar Aswad dengan penuh khusyuk.",
  },
  {
    no: "03",
    title: "Sa'i",
    description:
      "Berjalan dan berlari kecil antara bukit Shafa dan Marwah sebanyak 7 kali putaran.",
  },
  {
    no: "04",
    title: "Tahallul",
    description:
      "Mencukur atau memendekkan rambut sebagai tanda berakhirnya ibadah umrah.",
  },
];

const benefits = [
  "Bimbingan langsung oleh ustadz berpengalaman",
  "Materi lengkap manasik dari niat hingga tahallul",
  "Simulasi thawaf & sa'i sebelum keberangkatan",
  "Buku panduan & doa-doa umrah eksklusif",
  "Konsultasi pribadi seputar ibadah & teknis",
  "Sertifikat manasik untuk setiap peserta",
];

const schedule = [
  { day: "Sesi 1", topic: "Pengenalan Umrah & Persiapan Mental Spiritual" },
  { day: "Sesi 2", topic: "Tata Cara Ihram, Niat & Larangan Ihram" },
  { day: "Sesi 3", topic: "Praktik Thawaf, Sa'i, dan Tahallul" },
  { day: "Sesi 4", topic: "Doa-doa Mustajab & Adab di Tanah Suci" },
];

export default function ManasikUmrah() {
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
            Bimbingan Manasik
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Manasik Umrah
          </h1>
          <p className="text-base md:text-lg max-w-2xl opacity-90 mb-8">
            Persiapkan ibadah umrah Anda dengan bimbingan manasik lengkap
            bersama ustadz berpengalaman. Tenang, paham, dan siap menjalankan
            setiap rukun di Tanah Suci.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a
                href="https://wa.me/6281234567890?text=Saya%20ingin%20daftar%20Manasik%20Umrah"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="mr-2 h-4 w-4" />
                Daftar Manasik
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

      {/* Steps */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Rukun Umrah
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              4 Tahapan Ibadah Umrah
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pelajari setiap rukun umrah secara berurutan agar ibadah Anda
              sempurna dan diterima.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card
                key={step.no}
                className="border-2 hover:border-primary transition group"
              >
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition mb-3">
                    {step.no}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/40 py-16 px-4">
        <div className="container mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <Badge variant="secondary" className="mb-3">
              Keunggulan
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Apa yang Anda Dapatkan?
            </h2>
            <p className="text-muted-foreground mb-6">
              Program manasik kami dirancang menyeluruh — dari teori hingga
              praktik — agar jamaah benar-benar siap secara ilmu dan mental.
            </p>

            <ul className="space-y-3">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">5.000+</div>
                <div className="text-xs text-muted-foreground">
                  Jamaah Terbimbing
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">4 Sesi</div>
                <div className="text-xs text-muted-foreground">
                  Materi Lengkap
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-xs text-muted-foreground">
                  Ustadz Pembimbing
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">20+</div>
                <div className="text-xs text-muted-foreground">
                  Kota Pelaksanaan
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Jadwal Materi
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Susunan Sesi Manasik
            </h2>
            <p className="text-muted-foreground">
              Empat sesi pembekalan untuk memastikan Anda paham setiap detail
              ibadah umrah.
            </p>
          </div>

          <div className="space-y-3">
            {schedule.map((s, i) => (
              <Card key={i} className="hover:shadow-md transition">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">
                      {s.day}
                    </div>
                    <div className="font-medium">{s.topic}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Siap Memulai Perjalanan Suci Anda?
          </h2>
          <p className="opacity-90 mb-8">
            Daftarkan diri Anda di program manasik umrah kami dan nikmati
            bimbingan lengkap menuju ibadah yang sempurna.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a
              href="https://wa.me/6281234567890?text=Saya%20ingin%20daftar%20Manasik%20Umrah"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="mr-2 h-4 w-4" />
              Hubungi Kami Sekarang
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
