# Astro-Frontend — Vyotish-Astro website

**Astro 5 + TypeScript** with the `@astrojs/cloudflare` adapter (DECISIONS.md D1).
Fully prerendered for the Coming-Soon phase; switches to server output when SSR pages
land (Epic 2). Deploys via the Cloudflare build pipeline on push to `main`
(⚠️ push = deploy — owner approval required first, D8).

## Run locally (Bun)

```bash
bun install
bun run dev       # http://127.0.0.1:4321
```

## Build / preview

```bash
bun run build     # static output → dist/
bun run preview   # serve the build locally
```

## Checks

```bash
bun run check     # astro check (types)
bun run lint      # Biome
bun run format    # Biome format
```

## Structure

```
src/
├── assets/brand/vyotish-wordmark.svg   # swappable dummy logo (P1) — ONE file
├── components/Wordmark.astro           # wired into the header in Epic 2.1
├── layouts/Base.astro                  # html shell, fonts (hotlinked — P3), meta
├── pages/index.astro                   # Coming-Soon page (1:1 with vyotish.com)
└── styles/tokens.css                   # design tokens (PRD §9)
```

## Environment

- `.env.example` — **PUBLIC_* values only**; the frontend never holds Supabase keys
  or secrets of any kind (DECISIONS.md D3).

## Deploy

- **Cloudflare pipeline (current):** auto-builds on push to `main`. Build command
  `bun install && bun run build`, output `dist/`.
- **Docker (local parity only):** `docker build -t astro-frontend . && docker run -p 8080:80 astro-frontend`
  — not yet build-tested on this workstation (placeholder register P19).
