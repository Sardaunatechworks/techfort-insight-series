const BASE_URL = "https://insight.techfortfoundation.org";

export async function GET() {
  const paths = [
    "/",
    "/about",
    "/programs",
    "/sessions",
    "/research",
    "/community",
    "/partners",
    "/resources",
    "/apply",
    "/contact",
  ];
  const urls = paths
    .map(
      (p) =>
        `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
