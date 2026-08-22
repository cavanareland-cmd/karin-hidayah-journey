// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Static routes + semua deep link paket umrah/haji dan halaman kategori dari database.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://karinhidayahtour.com";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", lastmod: "2025-05-13", changefreq: "weekly", priority: "1.0" },
  { path: "/umrah-packages", lastmod: "2025-05-13", changefreq: "weekly", priority: "0.9" },
  { path: "/hajj-packages", lastmod: "2025-05-13", changefreq: "weekly", priority: "0.9" },
  { path: "/about-us", lastmod: "2025-05-13", changefreq: "monthly", priority: "0.8" },
  { path: "/gallery", lastmod: "2025-05-13", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", lastmod: "2025-05-13", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", lastmod: "2025-05-13", changefreq: "monthly", priority: "0.7" },
  { path: "/login", lastmod: "2025-05-13", changefreq: "yearly", priority: "0.3" },
  { path: "/register", lastmod: "2025-05-13", changefreq: "yearly", priority: "0.3" },
];

const toDate = (value?: string | null) =>
  value ? new Date(value).toISOString().slice(0, 10) : undefined;

async function fetchRows<T>(table: string, query: string): Promise<T[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) {
      console.warn(`[sitemap] ${table}: HTTP ${res.status} — dilewati`);
      return [];
    }
    return (await res.json()) as T[];
  } catch (err) {
    console.warn(`[sitemap] ${table}: gagal diambil — dilewati`, err);
    return [];
  }
}

type PackageRow = { id: string; updated_at?: string | null };
type CategoryRow = { slug: string; updated_at?: string | null };

async function collectEntries(): Promise<SitemapEntry[]> {
  const [umrah, hajj, categories] = await Promise.all([
    fetchRows<PackageRow>("umrah_packages", "select=id,updated_at&is_active=eq.true&limit=1000"),
    fetchRows<PackageRow>("hajj_packages", "select=id,updated_at&is_active=eq.true&limit=1000"),
    fetchRows<CategoryRow>("category_pages", "select=slug,updated_at&limit=1000"),
  ]);

  const packageEntries: SitemapEntry[] = [...umrah, ...hajj].map((row) => ({
    path: `/package/${row.id}`,
    lastmod: toDate(row.updated_at),
    changefreq: "weekly",
    priority: "0.9",
  }));

  const categoryEntries: SitemapEntry[] = categories.map((row) => ({
    path: `/kategori/${row.slug}`,
    lastmod: toDate(row.updated_at),
    changefreq: "monthly",
    priority: "0.8",
  }));

  const all = [...staticEntries, ...packageEntries, ...categoryEntries];
  const seen = new Set<string>();
  return all.filter((e) => (seen.has(e.path) ? false : seen.add(e.path)));
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

const entries = await collectEntries();
writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
