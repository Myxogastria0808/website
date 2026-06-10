const BASE_URL = "https://yukiosada.work";
const pages = ["/", "/works"];

const generateSitemap = async () => {
  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  await Bun.write("public/sitemap.xml", xml);
  console.log("sitemap.xml generated");
};

generateSitemap().catch(console.error);
