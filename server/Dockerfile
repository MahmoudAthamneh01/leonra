FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
ENV NODE_ENV=production
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
