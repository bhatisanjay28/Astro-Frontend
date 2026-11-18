# Astro-Frontend — Vyotish-Astro website (Astro 5, static output)
# Multi-stage: build with Bun, serve static dist with nginx.
# (Cloudflare production deploy happens via the Cloudflare build pipeline;
#  this image is local parity only — DECISIONS.md D2.)

# ---- Build stage ----
FROM oven/bun:1.4.4-slim AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# ---- Serve stage ----
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
