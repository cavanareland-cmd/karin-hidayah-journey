import { useParams } from "react-router-dom";

const CategoryDetail = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen px-6 py-24 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold capitalize">
        {slug?.replace("-", " ")}
      </h1>

      <p className="mt-4 text-muted-foreground">
        Ini adalah halaman detail untuk kategori <strong>{slug}</strong>.
        Konten bisa kamu isi dari template SaaSly yang tadi.
      </p>
    </div>
  );
};

export default CategoryDetail;
