
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma/seed.ts ./prisma/seed.ts

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma/seed.ts ./prisma/seed.ts
COPY --from=builder /app/tsconfig.json ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

RUN chown -R appuser:appgroup /app

USER appuser

CMD ["npm", "run", "start:prod"]