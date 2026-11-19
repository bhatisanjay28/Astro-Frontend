/**
 * /blog/rss.xml — hand-rolled RSS 2.0 feed (Epic 6.3). Built at build time
 * from the public blog API; no extra dependency. Content is escaped text;
 * the article body is intentionally omitted (readers click through).
 */
import { fetchBlogPosts } from "../../lib/content";

const SITE = "https://vyotish.com";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const result = await fetchBlogPosts({ page: 1, perPage: 50 });
  const posts = result?.posts ?? [];
  const items = posts
    .map((p) => {
      const url = `${SITE}/blog/${p.slug}`;
      const date = p.publish_at ? new Date(p.publish_at).toUTCString() : "";
      const desc = p.excerpt ? `<![CDATA[${p.excerpt}]]>` : "";
      const img = p.featured_image_url
        ? `<enclosure url="${esc(p.featured_image_url)}" type="image/jpeg" length="0" />`
        : "";
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid>${date ? `<pubDate>${date}</pubDate>` : ""}<description>${desc}</description>${img}</item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>Vyotish Blog</title>
<link>${SITE}/blog</link>
<description>Original Vedic astrology articles — signs, nakshatras, yogas, dasha and panchang guides, computed and checked.</description>
<language>en-in</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel></rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
