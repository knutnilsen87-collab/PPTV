# Multi-stage Dockerfile for ProPokerTV (Next.js + pnpm + Prisma SQLite)
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    else pnpm install; \
    fi

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generer Prisma-klient og bygg Next-app
RUN pnpm prisma generate && pnpm build

FROM node:22-alpine AS runner
ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# Ikke kjør som root i prod
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs

# Kopier nødvendige filer
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

# SQLite db vil opprettes ved første migrate; mount som volume i docker-compose
ENV PORT=3000
EXPOSE 3000

CMD ["pnpm", "start"]
