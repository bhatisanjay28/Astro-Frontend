/**
 * Blog search island (Epic 6.3) — vanilla TS; queries the public
 * /api/v1/blog/posts endpoint and renders PostCard-style results without
 * reloading. Rendered markup mirrors the server card so both states agree.
 * S24: status headings, card meta ("min read") and the date locale follow
 * the page language (module script → dict import is safe; Base sets
 * <html lang> before deferred module scripts run).
 */
import { BLOG_CARD, BLOG_SEARCH } from "../lib/i18n/hubs";

interface SearchPost {
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image_url: string | null;
  alt_text: string | null;
  publish_at: string | null;
  reading_minutes: number | null;
}

const lang = document.documentElement.lang === "hi" ? "hi" : "en";
const tSearch = BLOG_SEARCH[lang];
const tCard = BLOG_CARD[lang];

const dateFmt = new Intl.DateTimeFormat(tCard.locale, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function cardHtml(p: SearchPost): string {
  const img = p.featured_image_url
    ? `<img class="thumb" src="${p.featured_image_url}" alt="${p.alt_text ?? p.title}" loading="lazy" width="640" height="360" />`
    : "";
  const meta = [
    p.publish_at ? dateFmt.format(new Date(p.publish_at)) : "",
    p.reading_minutes ? `${p.reading_minutes}${tCard.readSuf}` : "",
  ]
    .filter(Boolean)
    .map((s) => `<span>${s}</span>`)
    .join("");
  const excerpt = p.excerpt ? `<span class="excerpt">${p.excerpt}</span>` : "";
  return `<a class="card" href="/blog/${p.slug}">${img}<span class="title">${p.title}</span>${excerpt}<span class="meta">${meta}</span></a>`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function initBlogSearch(root: HTMLElement): void {
  const form = root.querySelector<HTMLFormElement>("[data-blog-search]");
  const results = root.querySelector<HTMLElement>("[data-blog-results]");
  const heading = root.querySelector<HTMLElement>("[data-blog-heading]");
  const grid = root.querySelector<HTMLElement>("[data-blog-grid]");
  const clear = root.querySelector<HTMLButtonElement>("[data-blog-clear]");
  if (!form || !results || !heading || !grid || !clear) return;

  const apiBase = form.dataset.apiBase ?? "";

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const q = (form.elements.namedItem("q") as HTMLInputElement | null)?.value.trim() ?? "";
    if (!q) return;
    // textContent is entity-safe — no escaping needed here
    heading.textContent = tSearch.searching(q);
    grid.innerHTML = "";
    results.removeAttribute("hidden");
    try {
      const res = await fetch(
        `${apiBase}/api/v1/blog/posts?q=${encodeURIComponent(q)}&per_page=10`,
      );
      const body = (await res.json()) as { data?: { posts?: SearchPost[] } };
      const posts = body.data?.posts ?? [];
      heading.textContent =
        posts.length > 0 ? tSearch.results(posts.length, q) : tSearch.noMatch(q);
      grid.innerHTML = posts.map(cardHtml).join("");
    } catch {
      heading.textContent = tSearch.unavailable;
    }
  });

  clear.addEventListener("click", () => {
    results.setAttribute("hidden", "");
    (form.elements.namedItem("q") as HTMLInputElement | null)?.focus();
  });
}

for (const el of document.querySelectorAll<HTMLElement>("[data-blog-search]")) {
  initBlogSearch(el.closest("section") ?? el.parentElement ?? el);
}
