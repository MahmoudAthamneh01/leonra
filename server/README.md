# Linora Backend

This folder contains the Node.js + Express backend using TypeScript and Prisma.

## Features
- JWT authentication for four roles: `buyer`, `tajira`, `model`, `admin`.
- RESTful APIs for users, products, orders, complaints, and admin moderation.
- File uploads via `multer` (configure in `productController` as needed).
- PostgreSQL schema defined in `prisma/schema.prisma`.
- Email verification with token links.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure the database URL in `.env`:
   ```env
   DATABASE_URL=postgres://user:pass@localhost:5432/linora
   JWT_SECRET=supersecret
   EMAIL_FROM=no-reply@linora.com
   ```
3. Generate Prisma client and migrate:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
