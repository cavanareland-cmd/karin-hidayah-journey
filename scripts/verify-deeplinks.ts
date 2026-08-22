// Verifikasi deep link: cek setiap URL di public/sitemap.xml mengembalikan HTTP 200.
// Jalankan: bun run verify:links   (atau: bun run verify:links -- https://karinhidayahtour.lovable.app)

import { readFileSync } from "fs";
import { resolve } from "path";

const overrideOrigin = process.argv[2];

const xml = readFileSync(resolve("public/sitemap.xml"), "utf8");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const urls = overrideOrigin
  ? locs.map((loc) => overrideOrigin.replace(/\/$/, "") + new URL(loc).pathname)
  : locs;

if (urls.length === 0) {
  console.error("Tidak ada URL di sitemap.xml");
  process.exit(1);
}

let failed = 0;

for (const url of urls) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const ok = res.status === 200;
    if (!ok) failed++;
    console.log(`${ok ? "OK  " : "FAIL"} ${res.status} ${url}`);
  } catch (err) {
    failed++;
    console.log(`FAIL ---  ${url} (${(err as Error).message})`);
  }
}

console.log(`\n${urls.length - failed}/${urls.length} URL OK`);
process.exit(failed > 0 ? 1 : 0);
