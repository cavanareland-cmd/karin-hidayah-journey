import { useParams, Link } from "react-router-dom";

export default function CategoryDetail() {
  const { slug } = useParams();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <Link to="/" className="text-sm underline opacity-80 hover:opacity-100">
          ← Back
        </Link>
        <h1 className="text-2xl font-semibold">Category Detail</h1>
      </div>

      <div className="rounded-xl border p-5">
        <p className="text-sm opacity-70">Category slug:</p>
        <p className="mt-1 text-lg font-medium">{slug ?? "-"}</p>

        <p className="mt-4 text-sm opacity-70">
          (Placeholder page — replace with real category content later.)
        </p>
      </div>
    </main>
  );
}

