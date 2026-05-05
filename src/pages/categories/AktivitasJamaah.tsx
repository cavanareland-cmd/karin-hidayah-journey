import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Users,
  Heart,
  MapPin,
  Phone,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    icon: Users,
    title: "Pengajian & Kajian",
    description:
      "Kajian rutin bersama ustadz pembimbing untuk memperdalam ilmu sebelum keberangkatan.",
    items: ["Kajian mingguan", "Tafsir Al-Qur'an", "Fiqih ibadah"],
  },
  {
    icon: Heart,
    title: "Silaturahmi Jamaah",
    description:
      "Acara temu jamaah untuk membangun ukhuwah Islamiyah antar peserta.",
    items: ["Gathering bulanan", "Buka puasa bersama", "Halal bi halal"],
  },
  {
    icon: MapPin,
    title: "City Tour Tanah Suci",
    description:
      "Kunjungan ziarah ke tempat-tempat bersejarah Islam di Makkah & Madinah.",
    items: ["Jabal Nur", "Jabal Uhud", "Masjid Quba"],
  },
  {
    icon: Camera,
    title: "Dokumentasi Perjalanan",
    description:
      "Tim dokumentasi profesional mengabadikan momen ibadah Anda.",
    items: ["Foto grup harian", "Video highlight", "Album kenangan"],
  },
];

const events = [
  {
    date: "Mingguan",
    title: "Kajian Rutin Calon Jamaah",
    desc: "Setiap Sabtu malam — pembekalan ilmu & ruhiyah.",
  },
  {
    date: "Bulanan",
    title: "Gathering Alumni Jamaah",
    desc: "Reuni dan silaturahmi alumni umrah & haji.",
  },
  {
    date: "Pra-Keberangkatan",
    title: "Manasik Akbar",
    desc: "Simulasi lengkap manasik bersama seluruh jamaah.",
  },
  {
    date: "Pasca-Kepulangan",
    title: "Tasyakuran Jamaah",
    desc: "Syukuran bersama setelah kembali dari Tanah Suci.",
  },
];

const benefits = [
  "Bimbingan komunitas yang hangat & Islami",
  "Networking dengan sesama jamaah dari berbagai daerah",
  "Akses kegiatan eksklusif sepanjang tahun",
  "Dokumentasi profesional setiap acara",
  "Pengajian gratis untuk seluruh anggota",
  "Kesempatan ikut program sosial & dakwah",
];

export default function AktivitasJamaah() {
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
            Komunitas Jamaah
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Aktivitas Jamaah
          </h1>
          <p className="text-base md:text-lg max-w-2xl opacity-90 mb-8">
            Bergabunglah dengan komunitas jamaah Karin Hidayah Tour. Nikmati
            kajian, silaturahmi, ziarah, dan beragam kegiatan Islami bersama
            saudara seiman.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a
                href="https://wa.me/6281234567890?text=Saya%20ingin%20bergabung%20dengan%20Aktivitas%20Jamaah"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="mr-2 h-4 w-4" />
                Gabung Komunitas
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/gallery">Lihat Galeri</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Ragam Kegiatan
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Aktivitas Rutin Jamaah
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Berbagai kegiatan untuk mempererat ukhuwah dan memperdalam ilmu
              agama bersama komunitas.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {activities.map((a) => {
              const Icon = a.icon;
              return (
                <Card
                  key={a.title}
                  className="border-2 hover:border-primary transition group"
                >
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {a.description}
                    </p>
                    <ul className="space-y-2">
                      {a.items.map((it) => (
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

      {/* Events Schedule */}
      <section className="bg-muted/40 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Agenda Komunitas
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Jadwal Acara Jamaah
            </h2>
            <p className="text-muted-foreground">
              Beragam acara rutin yang bisa Anda ikuti sepanjang tahun.
            </p>
          </div>

          <div className="space-y-3">
            {events.map((e, i) => (
              <Card key={i} className="hover:shadow-md transition">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">
                      {e.date}
                    </div>
                    <div className="font-medium">{e.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {e.desc}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <Badge variant="secondary" className="mb-3">
              Keunggulan
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Manfaat Bergabung
            </h2>
            <p className="text-muted-foreground mb-6">
              Sebagai anggota komunitas jamaah Karin Hidayah Tour, Anda akan
              merasakan banyak manfaat baik di dunia maupun akhirat.
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
                <div className="text-2xl font-bold">10.000+</div>
                <div className="text-xs text-muted-foreground">
                  Anggota Komunitas
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-xs text-muted-foreground">
                  Acara per Tahun
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-xs text-muted-foreground">
                  Suasana Islami
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-xs text-muted-foreground">
                  Tahun Pengalaman
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Yuk, Jadi Bagian dari Keluarga Besar Kami!
          </h2>
          <p className="opacity-90 mb-8">
            Bergabunglah dengan ribuan jamaah lain dan rasakan kehangatan
            ukhuwah Islamiyah bersama Karin Hidayah Tour.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a
              href="https://wa.me/6281234567890?text=Saya%20ingin%20bergabung%20dengan%20Aktivitas%20Jamaah"
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
