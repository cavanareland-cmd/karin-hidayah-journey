import { Link, useParams } from "react-router-dom";
import { useCategoryPage } from "@/hooks/useCategoryPage";
import CategoryPageRenderer from "@/components/CategoryPageRenderer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useCategoryPage(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Memuat...
      </div>
    );
  }

  if (data) return <CategoryPageRenderer pageKey={slug!} />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Kategori belum tersedia</h1>
        <p className="text-muted-foreground mb-2">Slug: <code>{slug}</code></p>
        <p className="text-muted-foreground mb-6">
          Konten kategori ini belum dibuat di CMS.
        </p>
        <Link to="/" className="text-primary underline">← Kembali ke Beranda</Link>
      </main>
      <Footer />
    </div>
  );
}
