/**
 * Build-time markdown pipeline for blog articles (Epic 6.3).
 *
 * Stored markdown is admin-authored but still untrusted input by policy —
 * D13 pins sanitisation at RENDER time, so every render goes through
 * rehype-sanitize (default GitHub schema + ids preserved for the TOC)
 * before anything reaches HTML. rehype-slug assigns heading ids AFTER
 * sanitisation; a tiny collector then reads those ids so the table of
 * contents can never desync from the rendered anchors.
 */

import type { Element, Root } from "hast";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/** ids survive sanitisation (rehype-slug relies on them for anchors). */
const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    h1: ["id"],
    h2: ["id"],
    h3: ["id"],
    h4: ["id"],
    h5: ["id"],
    h6: ["id"],
  },
};

/** Walk the hast tree collecting h2/h3 text + anchor ids (already slugged). */
function collectToc(tree: Root): TocEntry[] {
  const toc: TocEntry[] = [];
  const walk = (node: Element | Root): void => {
    for (const child of node.children) {
      if (child.type === "element") {
        if (
          (child.tagName === "h2" || child.tagName === "h3") &&
          typeof child.properties?.id === "string"
        ) {
          const text = flattenText(child);
          if (text) {
            toc.push({
              id: child.properties.id,
              text,
              level: child.tagName === "h2" ? 2 : 3,
            });
          }
        }
        walk(child);
      }
    }
  };
  walk(tree);
  return toc;
}

function flattenText(node: Element | Root): string {
  let out = "";
  for (const child of node.children) {
    if (child.type === "text") out += child.value;
    else if (child.type === "element") out += flattenText(child);
  }
  return out.trim();
}

export interface RenderedArticle {
  html: string;
  toc: TocEntry[];
}

/** Render untrusted markdown to sanitised HTML + heading TOC. */
export async function renderArticle(md: string): Promise<RenderedArticle> {
  let toc: TocEntry[] = [];
  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSanitize, schema)
    .use(rehypeSlug)
    .use(() => (tree: Root) => {
      toc = collectToc(tree);
    })
    .use(rehypeStringify)
    .process(md);
  return { html: String(html), toc };
}
