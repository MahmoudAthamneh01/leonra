# Linora Full‑Stack Architecture

This document provides an overview of the proposed backend architecture for the Linora e‑commerce platform.

## Overview
The frontend (React 18 + TypeScript) communicates with a Node.js/Express backend. PostgreSQL is used as the primary database and Prisma handles ORM.

## Authentication
- **Roles**: `buyer`, `tajira`, `model`, `admin`.
- JWT based auth with refresh tokens.
- Email/SMS verification hooks in `src/utils` (implement with real provider).
- Middleware `authenticate` enforces role-based access.

## API Routes
- `POST /api/auth/register` – create account and send verification email.
- `GET /api/auth/verify/:token` – verify email address.
- `POST /api/auth/login` – obtain JWT.
- `GET /api/users/me` – view profile.
- `PUT /api/users/me` – update profile.
- `GET /api/products` – list products.
- `POST /api/products` – create product (tajira/admin).
- `PUT /api/products/:id` – update product.
- `DELETE /api/products/:id` – remove product.
- `GET /api/orders` – list authenticated user orders.
- `POST /api/orders` – create order from cart.
- `GET /api/admin/users` – admin user list.
- `GET /api/admin/complaints` – complaint moderation.
- `POST /api/complaints` – create complaint.

## Database Schema
See `server/prisma/schema.prisma` for full schema. Key tables:
- **User** – stores authentication info and role.
  - includes `isVerified` flag for email verification.
- **Product** – products offered by a tajira.
- **Order / OrderItem** – purchase records.
- **Complaint** – admin moderation records.
- **ModelProfile** – additional data for model accounts.
- **VerificationToken** – tokens for email confirmation.

Indices are automatically handled by Prisma for foreign keys and unique constraints.

## File Uploads
Use `multer` middleware to handle product and profile image uploads. Store images in a cloud bucket (e.g., S3) and save URLs in the database.

## Security Enhancements
- Global rate limiter via `express-rate-limit` protects the API from abuse.
- Sessions managed with `express-session` for additional security layers on top of JWT.

## Notifications & Payments
- `/api/notifications` endpoint allows sending simple alerts (extendable to push services).
- `/api/payments/create` handles initiating checkout sessions with a provider.

## PWA Support
- `manifest.json` and `service-worker.js` enable installable app behavior and basic offline caching.

## Admin Customization
`/api/admin` routes expose endpoints for SaaS‑level customization. The `PlatformCustomizer` React component connects to these APIs.

## Deployment
- Containerize the app with Docker.
- Use environments like AWS ECS or DigitalOcean App Platform for hosting.
- Configure CI/CD to run Prisma migrations and deploy frontend assets.

