import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PricingSection from "@/components/PricingSection";

const CATEGORY_CONTENT: Record<
  string,
  {
    title: string;
    description: string;
    features: string[];
  }
> = {
  "manasik-umrah": {
    title: "Manasik Umrah",
    description:
      "Pembekalan manasik Umrah yang terstruktur dan mudah dipahami, dipandu oleh pembimbing berpengalaman.",
    features: [
      "Manasik tatap muka & online",
      "Simulasi ibadah Umrah",
      "Bimbingan doa & niat",
    ],
  },
  "perlengkapan-ibadah": {
    title: "Perlengkapan Ibadah",
    description:
      "Perlengkapan ibadah lengkap dan berkualitas untuk menunjang kenyamanan jamaah selama perjalanan.",
    features: [
      "Koper & tas travel",
      "Perlengkapan ihram",
      "Buku doa & perlengkapan ibadah",
    ],
  },
  "e-guide-materi": {
    title: "E-Guide & Materi Digital",
    description:
      "Panduan digital lengkap yang bisa diakses kapan saja oleh jamaah sebelum dan selama perjalanan.",
    features: [
      "Panduan Umrah & Haji digital",
      "Video manasik",
      "Doa-doa harian",
    ],
  },
  "aktivitas-jamaah": {
    title: "Aktivitas Jamaah",
    description:
      "Aktivitas kebersamaan jamaah yang mempererat ukhuwah dan menambah pengalaman spiritual.",
    features: [
      "Kajian & tausiyah",
      "City tour islami",
      "Sharing session jamaah",
    ],
  },
};

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? CATEGORY_CONTENT[slug] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {!data ? (
          <section className="py-32 text-center">
            <h1 className="text-2xl font-semibold">
              Kategori tidak ditemukan
            </h1>
            <p className="mt-4 text-muted-foreground">
              Silakan kembali ke halaman utama.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-md"
            >
              Kembali ke Beranda
            </Link>
          </section>
        ) : (
          <>
            {/* HERO */}
            <section className="py-24 px-6 bg-muted/40">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {data.title}
                </h1>
                <p className="mt-4 text-muted-foreground">
                  {data.description}
                </p>

                <div className="mt-6 flex justify-center gap-4">
                  <Link
                    to="/umrah-packages"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90"
                  >
                    Lihat Paket Umrah
                  </Link>

                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    className="px-6 py-3 border rounded-md hover:bg-muted"
                  >
                    Tanya Admin
                  </a>
                </div>
              </div>
            </section>

            {/* FEATURES */}
            <section className="py-24 px-6">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-center">
                  Apa yang Anda Dapatkan
                </h2>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {data.features.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border p-6 hover:shadow-md transition"
                    >
                      <h3 className="font-semibold">{item}</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Layanan ini kami siapkan untuk memastikan kenyamanan
                        dan ketenangan ibadah Anda.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PRICING */}
            <PricingSection />
          </>
        )}
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default CategoryDetail;
