import { Link } from "react-router-dom";
import {
  ArrowLeft, Phone, CheckCircle2, BookOpen, Users, Heart, MapPin, Sparkles,
  Camera, Calendar, Shirt, Briefcase, Package, FileText, PlayCircle,
  Headphones, Smartphone, Download,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCategoryPage } from "@/hooks/useCategoryPage";

const ICONS: Record<string, any> = {
  BookOpen, Users, Heart, MapPin, Sparkles, Camera, Calendar,
  Shirt, Briefcase, Package, FileText, PlayCircle, Headphones, Smartphone,
};

const wa = (msg: string) =>
  `https://wa.me/6281234567890?text=${encodeURIComponent(msg || "Halo")}`;

export default function CategoryPageRenderer({ pageKey }: { pageKey: string }) {
  const { data, isLoading } = useCategoryPage(pageKey);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
          Memuat...
        </div>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-2">Halaman tidak ditemukan</h1>
          <Link to="/" className="text-primary underline">Kembali ke Beranda</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hero = data.hero || {};
  const items = Array.isArray(data.items) ? data.items : [];
  const features = Array.isArray(data.features) ? data.features : [];
  const extra = data.extra || {};
  const cta = data.cta || {};

  const stats = Array.isArray(extra.stats) ? extra.stats : [];
  const schedule = Array.isArray(extra.schedule) ? extra.schedule : [];
  const events = Array.isArray(extra.events) ? extra.events : [];
  const bundleItems = Array.isArray(extra.bundle_items) ? extra.bundle_items : [];

  const isManasik = pageKey === "manasik-umrah";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-90 hover:opacity-100 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          {hero.badge && <Badge className="bg-accent text-accent-foreground mb-4">{hero.badge}</Badge>}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{hero.title}</h1>
          {hero.description && (
            <p className="text-base md:text-lg max-w-2xl opacity-90 mb-8">{hero.description}</p>
          )}
          <div className="flex flex-wrap gap-3">
            {hero.button_text && (
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href={wa(hero.whatsapp_text)} target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-4 w-4" />
                  {hero.button_text}
                </a>
              </Button>
            )}
            {hero.secondary_button_text && hero.secondary_button_link && (
              <Button asChild size="lg" variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to={hero.secondary_button_link}>{hero.secondary_button_text}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Items */}
      {items.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-3">
                {extra.items_title || "Detail Layanan"}
              </h2>
              {extra.items_subtitle && (
                <p className="text-muted-foreground max-w-2xl mx-auto">{extra.items_subtitle}</p>
              )}
            </div>
            <div className={`grid gap-6 sm:grid-cols-2 ${isManasik ? "lg:grid-cols-4" : ""}`}>
              {items.map((it: any, idx: number) => {
                const Icon = ICONS[it.icon] || BookOpen;
                return (
                  <Card key={idx} className="border-2 hover:border-primary transition group">
                    <CardContent className="p-6">
                      {it.no ? (
                        <div className="text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition mb-3">
                          {it.no}
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition mb-4">
                          <Icon className="h-6 w-6" />
                        </div>
                      )}
                      <h3 className="text-lg font-semibold mb-2">{it.title}</h3>
                      {it.description && (
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{it.description}</p>
                      )}
                      {Array.isArray(it.items) && it.items.length > 0 && (
                        <ul className="space-y-2">
                          {it.items.map((sub: string) => (
                            <li key={sub} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Schedule (manasik) */}
      {schedule.length > 0 && (
        <section className="bg-muted/40 py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-3">
                {extra.schedule_title || "Jadwal"}
              </h2>
              {extra.schedule_subtitle && (
                <p className="text-muted-foreground">{extra.schedule_subtitle}</p>
              )}
            </div>
            <div className="space-y-3">
              {schedule.map((s: any, i: number) => (
                <Card key={i} className="hover:shadow-md transition">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">{s.day}</div>
                      <div className="font-medium">{s.topic}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events (aktivitas) */}
      {events.length > 0 && (
        <section className="bg-muted/40 py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-3">
                {extra.events_title || "Jadwal Acara"}
              </h2>
              {extra.events_subtitle && (
                <p className="text-muted-foreground">{extra.events_subtitle}</p>
              )}
            </div>
            <div className="space-y-3">
              {events.map((e: any, i: number) => (
                <Card key={i} className="hover:shadow-md transition">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">{e.date}</div>
                      <div className="font-medium">{e.title}</div>
                      {e.desc && <div className="text-sm text-muted-foreground mt-0.5">{e.desc}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features + Stats / Bundle */}
      {(features.length > 0 || stats.length > 0 || bundleItems.length > 0) && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <Badge variant="secondary" className="mb-3">Keunggulan</Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {extra.features_title || "Apa yang Anda Dapatkan?"}
              </h2>
              {extra.features_subtitle && (
                <p className="text-muted-foreground mb-6">{extra.features_subtitle}</p>
              )}
              <ul className="space-y-3">
                {features.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {stats.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s: any, i: number) => {
                  const Icon = ICONS[s.icon] || Sparkles;
                  return (
                    <Card key={i}>
                      <CardContent className="p-6 text-center">
                        <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold">{s.value}</div>
                        <div className="text-xs text-muted-foreground">{s.label}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : bundleItems.length > 0 ? (
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
                <CardContent className="p-8">
                  <BookOpen className="h-10 w-10 mb-4 opacity-90" />
                  <h3 className="text-2xl font-bold mb-2">{extra.bundle_title}</h3>
                  {extra.bundle_description && (
                    <p className="opacity-90 mb-6 text-sm">{extra.bundle_description}</p>
                  )}
                  <ul className="space-y-2 mb-6 text-sm">
                    {bundleItems.map((b: string) => (
                      <li key={b} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> {b}
                      </li>
                    ))}
                  </ul>
                  {extra.bundle_button_text && (
                    <Button asChild size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 w-full">
                      <a href={wa(extra.bundle_whatsapp_text)} target="_blank" rel="noopener noreferrer">
                        <Phone className="mr-2 h-4 w-4" />
                        {extra.bundle_button_text}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : null}
          </div>
        </section>
      )}

      {/* CTA */}
      {cta.title && (
        <section className="bg-primary text-primary-foreground py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{cta.title}</h2>
            {cta.description && <p className="opacity-90 mb-8">{cta.description}</p>}
            {cta.button_text && (
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href={wa(cta.whatsapp_text)} target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-4 w-4" />
                  {cta.button_text}
                </a>
              </Button>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
