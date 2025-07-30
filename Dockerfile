# syntax=docker.io/docker/dockerfile:1

### 1) Stage "builder"
FROM node:22-alpine AS builder
WORKDIR /app

# Copia os arquivos de manifesto e instala as dependências
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Copia o restante dos arquivos da aplicação
COPY . .

# Builda a aplicação
RUN pnpm build

### 2) Stage "runner"
FROM nginx:1.27-alpine AS runner

# Copia os arquivos buildados do estagio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]