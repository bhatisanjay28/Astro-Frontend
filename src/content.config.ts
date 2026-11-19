import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Learn articles (Epic 4.5, PRD §5.5) — original educational content under
 * /astrology/learn/. Editorial long-form is site content authored in-repo;
 * structured data rows keep coming from Supabase (D12 boundary unchanged).
 */
const learn = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/learn" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = { learn };
