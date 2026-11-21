/**
 * Shared block-spec types for the calculator results renderer
 * (Epic 14 S14-2; design/output-spec.md §1–§2).
 */
export interface Chip {
  label: string;
  value: string;
  status?: "good" | "bad" | "info";
}

export interface DetailCard {
  title?: string;
  rows?: Array<[string, string]>;
  table?: { head: string[]; rows: Cell[][] };
  list?: string[];
  /** 3×3 Lo Shu grid cells (position order). */
  loshu?: Array<{ number: number; count: number }>;
  bar?: { pct: number; label: string };
  /** Small explanatory line under the card content. */
  legend?: string;
}

export type Cell =
  | string
  | { text: string; status?: "good" | "bad" | "info"; badge?: boolean; highlight?: boolean };

export interface ToolSpec {
  eyebrow: string;
  main: string;
  sub?: string;
  status?: "good" | "bad" | "info";
  chips?: Chip[];
  /** B3 — when absent, the renderer uses the API `interpretation` block. */
  meaning?: { text: string[]; guidance?: string[]; basis?: string };
  details?: DetailCard[];
}

export interface ToolMapEntry {
  /** API data keys consumed by `build` — everything else renders as generic rows. */
  hide: string[];
  build: (d: Record<string, unknown>) => ToolSpec;
}
