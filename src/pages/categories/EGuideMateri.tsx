import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Download,
  FileText,
  Headphones,
  Phone,
  PlayCircle,
  CheckCircle2,
  Smartphone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const materials = [
  {
    icon: FileText,
    title: "E-Book Panduan Umrah",
    description:
      "Panduan lengkap dalam format PDF — dari persiapan hingga pulang ke tanah air.",
    items: ["Persiapan dokumen", "Tata cara ibadah", "Doa & dzikir harian"],
  },
  {
    icon: PlayCircle,
    title: "Video Tutorial Manasik",
    description:
      "Video HD step-by-step manasik umrah & haji dengan narasi ustadz pembimbing.",
    items: ["Simulasi thawaf & sa'i", "Praktik ihram", "Adab di Tanah Suci"],
  },
  {
    icon: Headphones,
    title: "Audio Doa & Talbiyah",
    description:
      "Rekaman audio talbiyah, doa-doa, dan dzikir untuk dihafalkan kapan saja.",
    items: ["Talbiyah lengkap", "Doa thawaf 7 putaran", "Doa multazam"],
  },
  {
    icon: Smartphone,
    title: "Aplikasi Mobile Jamaah",
    description:
      "Akses semua materi e-guide di smartphone Anda, online maupun offline.",
    items: ["Mode offline", "Reminder ibadah", "Peta interaktif"],
  },
];

const features = [
  "Materi disusun oleh ustadz berpengalaman",
  "Format lengkap: PDF, Video, Audio, & Mobile App",
  "Update materi gratis seumur hidup",
  "Akses kapan saja & di mana saja",
  "Bahasa Indonesia mudah dipahami",
  "Bonus doa-doa pilihan & dzikir harian",
];

export default function EGuideMateri() {
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
            E-Guide & Materi Digital
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            E-Guide & Materi
          </h1>
          <p className="text-base md:text-lg max-w-2xl opacity-90 mb-8">
            Pelajari ibadah umrah & haji kapan saja melalui materi digital
            lengkap — e-book, video tutorial, audio doa, hingga aplikasi mobile
            khusus jamaah.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a
                href="https://wa.me/6281234567890?text=Saya%20ingin%20mendapatkan%20E-Guide%20%26%20Materi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Dapatkan Materi
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/kategori/manasik-umrah">Lihat Manasik Umrah</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Konten Digital
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Materi Lengkap untuk Jamaah
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Empat format pembelajaran agar Anda dapat memahami ibadah dengan
              cara yang paling nyaman.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {materials.map((m) => {
              const Icon = m.icon;
              return (
                <Card
                  key={m.title}
                  className="border-2 hover:border-primary transition group"
                >
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {m.description}
                    </p>
                    <ul className="space-y-2">
                      {m.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{it}</span>
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
              Keunggulan
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Mengapa Memilih E-Guide Kami?
            </h2>
            <p className="text-muted-foreground mb-6">
              Materi digital kami dirancang agar mudah diakses, dipahami, dan
              dipraktikkan oleh seluruh jamaah dari berbagai kalangan.
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

          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-8">
              <BookOpen className="h-10 w-10 mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-2">
                Paket E-Guide Lengkap
              </h3>
              <p className="opacity-90 mb-6 text-sm">
                Dapatkan akses penuh ke seluruh materi digital kami dalam satu
                paket spesial.
              </p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> 5+ E-Book Panduan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> 20+ Video Tutorial HD
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> 50+ Audio Doa & Dzikir
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Akses Aplikasi Mobile
                </li>
              </ul>
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
              >
                <a
                  href="https://wa.me/6281234567890?text=Saya%20ingin%20Paket%20E-Guide%20Lengkap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Pesan Sekarang
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
            Siap Belajar Ibadah dengan Lebih Mudah?
          </h2>
          <p className="opacity-90 mb-8">
            Hubungi kami untuk mendapatkan akses materi digital lengkap dan
            mulai persiapkan ibadah terbaik Anda.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a
              href="https://wa.me/6281234567890?text=Saya%20ingin%20mendapatkan%20E-Guide%20%26%20Materi"
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
