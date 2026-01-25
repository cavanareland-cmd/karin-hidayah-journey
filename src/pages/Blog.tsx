import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, ArrowRight, Clock } from "lucide-react";
import makkahImg from "@/assets/makkah-landscape.jpg";
import umrahImg from "@/assets/umrah-package.jpg";
import hajjImg from "@/assets/hajj-package-1.jpg";
import zamzamImg from "@/assets/zamzam-water.jpg";
import tahallulImg from "@/assets/tahallul-service.jpg";
import olehImg from "@/assets/oleh-oleh.jpg";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = [
    "Semua",
    "Tips Perjalanan",
    "Ibadah",
    "Persiapan",
    "Kesehatan",
    "Oleh-oleh",
  ];

  const articles = [
    {
      id: 1,
      title: "10 Tips Persiapan Umrah untuk Pemula yang Wajib Diketahui",
      excerpt:
        "Panduan lengkap persiapan umrah dari mulai dokumen, kesehatan, hingga perlengkapan yang harus dibawa.",
      category: "Persiapan",
      author: "Tim Karin Hidayah",
      date: "20 Jan 2024",
      readTime: "8 menit",
      image: makkahImg,
      featured: true,
    },
    {
      id: 2,
      title: "Panduan Lengkap Tata Cara Umrah dari Awal hingga Akhir",
      excerpt:
        "Pelajari tata cara umrah yang benar sesuai sunnah, mulai dari ihram hingga tahallul.",
      category: "Ibadah",
      author: "Ustadz Ahmad Fauzi",
      date: "18 Jan 2024",
      readTime: "12 menit",
      image: umrahImg,
      featured: true,
    },
    {
      id: 3,
      title: "Menjaga Kesehatan Selama Perjalanan Haji dan Umrah",
      excerpt:
        "Tips menjaga stamina dan kesehatan tubuh selama menjalankan ibadah di Tanah Suci.",
      category: "Kesehatan",
      author: "Dr. Siti Aminah",
      date: "15 Jan 2024",
      readTime: "6 menit",
      image: hajjImg,
      featured: false,
    },
    {
      id: 4,
      title: "Keutamaan Air Zamzam dan Cara Membawanya Pulang",
      excerpt:
        "Mengenal keistimewaan air zamzam dan tips membawa air zamzam ke tanah air dengan aman.",
      category: "Tips Perjalanan",
      author: "Tim Karin Hidayah",
      date: "12 Jan 2024",
      readTime: "5 menit",
      image: zamzamImg,
      featured: false,
    },
    {
      id: 5,
      title: "Doa-doa Mustajab yang Dibaca Saat Umrah dan Haji",
      excerpt:
        "Kumpulan doa-doa yang dianjurkan dibaca di berbagai tempat suci selama ibadah.",
      category: "Ibadah",
      author: "Ustadz Ahmad Fauzi",
      date: "10 Jan 2024",
      readTime: "10 menit",
      image: tahallulImg,
      featured: false,
    },
    {
      id: 6,
      title: "Rekomendasi Oleh-oleh Khas Makkah dan Madinah",
      excerpt:
        "Daftar oleh-oleh populer yang wajib dibeli saat berkunjung ke Tanah Suci.",
      category: "Oleh-oleh",
      author: "Tim Karin Hidayah",
      date: "8 Jan 2024",
      readTime: "7 menit",
      image: olehImg,
      featured: false,
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Blog & Artikel
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Tips & Panduan <span className="text-primary">Perjalanan Suci</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Temukan informasi lengkap seputar persiapan, tata cara, dan tips
              perjalanan umrah dan haji dari para ahli.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base rounded-full border-border/50 bg-card shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-border/50 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Artikel Pilihan
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.id}`}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge className="mb-3 bg-primary text-primary-foreground">
                      {article.category}
                    </Badge>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Semua Artikel
          </h2>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Tidak ada artikel yang ditemukan untuk "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(regularArticles.length > 0 ? regularArticles : filteredArticles).map(
                (article) => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.id}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <Badge
                        variant="secondary"
                        className="mb-3 bg-secondary/10 text-secondary-foreground"
                      >
                        {article.category}
                      </Badge>
                      <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Dapatkan Update Artikel Terbaru
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Berlangganan newsletter kami untuk mendapatkan tips dan informasi
              terbaru seputar perjalanan umrah dan haji.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <button className="px-6 py-2.5 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-colors">
                Berlangganan
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Blog;
