# Stage de build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Instalar todas as dependências
RUN npm install

RUN npx prisma generate

# Copiar o resto dos arquivos
COPY . .


# Build da aplicação
RUN npm run build

# Stage final
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos necessários do stage de build
COPY --from=builder /. ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000

RUN npx prisma generate

CMD ["node", "dist/main"]
