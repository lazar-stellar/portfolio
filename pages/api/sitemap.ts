import type { NextApiRequest, NextApiResponse } from "next";
import { blogPosts } from "../../src/data/blogs";

const baseUrl = "https://www.lazarpanovic.dev";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const staticPages = [
    "",
    "/full-stack-developer",
    "/database-driven-applications",
    "/backend-developer",
    "/nestjs-developer",
    "/blogs",
  ];

  const blogPages = blogPosts.map((post) => `/blog/${post.slug}`);

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(sitemap);
}
