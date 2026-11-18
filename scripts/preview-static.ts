/**
 * Static preview server for the built dist/ output.
 * Replaces `astro preview`, which the @astrojs/cloudflare adapter does not
 * support; workerd (wrangler dev) is unstable on this workstation.
 * Usage: bun run preview  →  http://127.0.0.1:4321
 */
const port = Number(process.env.PREVIEW_PORT ?? 4321);
const root = new URL("../dist/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    const file = Bun.file(root + pathname.replace(/^\//, ""));
    if (await file.exists()) {
      const ext = pathname.slice(pathname.lastIndexOf(".")).toLowerCase();
      return new Response(file, {
        headers: { "Content-Type": MIME[ext] ?? "application/octet-stream" },
      });
    }

    // Astro static output: unknown paths → its 404 page if built, else index
    const notFound = Bun.file(`${root}404.html`);
    if (await notFound.exists()) {
      return new Response(notFound, { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
    return new Response("Not found", { status: 404 });
  },
});

console.log(`preview → http://127.0.0.1:${port} (serving ./dist)`);
