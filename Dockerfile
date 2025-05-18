# syntax=docker.io/docker/dockerfile:1

### 1) Stage "deps"
FROM node:22.15.1-alpine3.20 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN if [ -f yarn.lock ]; then \
      yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    elif [ -f pnpm-lock.yaml ]; then \
      corepack enable pnpm && pnpm i --frozen-lockfile; \
    else \
      echo "Lockfile not found." && exit 1; \
    fi

### 2) Stage "builder"
FROM node:22.15.1-alpine3.20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN if [ -f yarn.lock ]; then \
      yarn build; \
    elif [ -f package-lock.json ]; then \
      npm run build; \
    elif [ -f pnpm-lock.yaml ]; then \
      corepack enable pnpm && pnpm run build; \
    fi

### 3) Stage "runner"
FROM node:22.15.1-alpine3.20 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cria usuário não-root
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copia o standalone e estáticos
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static

# Copia de forma segura todo conteúdo de public/, se existir
USER root
RUN mkdir -p public && \
    for file in /app/public/*; do \
      [ -e "$file" ] && cp -r "$file" public/; \
    done
USER nextjs

EXPOSE 3000
ENV PORT=3000 HOST=0.0.0.0

# Healthcheck interno do Docker
HEALTHCHECK --interval=30s --timeout=2s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost:3000/api/healthz || exit 1

CMD ["node", "server.js"]
