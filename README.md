# GLP Website

GLP-1 medication intake and ordering site. Next.js 15 (App Router) + TypeScript, Better Auth, Drizzle + Postgres, Stripe (placeholder), Tailwind v4.

This is a **skeleton** — every surface is stubbed and ready to be filled in. Real product copy, intake questions, branding, and Stripe keys come later.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS v4 + handcrafted shadcn-style primitives in `src/components/ui/` |
| Auth | Better Auth (email/password, Drizzle adapter, `role` field) |
| Database | PostgreSQL via Drizzle ORM |
| Forms | React Hook Form + Zod |
| Payments | Stripe SDK installed; webhook route stubbed |
| Package manager | npm |

## Project layout

```
src/
├── app/
│   ├── (marketing)/          public landing, products
│   ├── (auth)/               login, signup
│   ├── (app)/                authenticated patient area (intake, account, checkout)
│   ├── (admin)/admin/        admin dashboard (role=admin required)
│   ├── api/auth/[...all]/    Better Auth handler
│   └── api/stripe/webhook/   Stripe webhook
├── components/
│   ├── ui/                   button, input, label, card, field-error
│   ├── marketing/            hero, nav, footer
│   ├── intake/               progress-bar
│   ├── admin/                stat-card
│   └── app/                  sign-out button
├── lib/
│   ├── env.ts                Zod-validated environment
│   ├── auth.ts / auth-client.ts
│   ├── db/index.ts, schema.ts
│   ├── crypto.ts             AES-256-GCM for PHI
│   ├── audit.ts              logAudit() helper
│   ├── rbac.ts               requireUser / requireAdmin
│   ├── stripe.ts             lazy Stripe client + webhook secret
│   ├── logger.ts             PHI-redacting console wrapper
│   └── utils.ts              cn()
└── middleware.ts             cookie-based route guard
```

Route groups (`(marketing)`, `(auth)`, `(app)`, `(admin)`) keep layouts isolated without affecting URLs.

## Getting started

### 1. Prerequisites

- Node.js 20+ (24 works)
- A Postgres database. For local dev, easiest options:
  - Free Neon project: https://neon.tech
  - Docker: `docker run -d --name glp-db -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=glp_website postgres:16`

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

```bash
cp .env.example .env.local
```

Then fill in:

```bash
# 32-byte secrets (run each command, paste output)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"  # BETTER_AUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"  # ENCRYPTION_KEY
```

Set `DATABASE_URL` to your Postgres connection string and `BETTER_AUTH_URL` to your public app URL (`http://localhost:3000` for dev). Stripe keys can stay empty until you wire up payments.

### 4. Push the schema

```bash
npm run db:push
```

This applies `src/lib/db/schema.ts` to the database directly (good for dev). For production-style migrations: `npm run db:generate` then `npm run db:push`.

### 5. Run it

```bash
npm run dev
```

Open http://localhost:3000.

## Promoting a user to admin

There's no admin invite UI yet. After signing up via `/signup`, promote yourself in the DB:

```sql
UPDATE "user" SET role = 'admin' WHERE email = 'you@example.com';
```

Or via Drizzle Studio:

```bash
npm run db:studio
```

Then visit `/admin`.

## Conventions

- **Server Actions** for all mutations, colocated as `_actions.ts` inside the route folder.
- **Zod schemas** are the single source of truth for form validation (RHF resolver client-side, `.parse()` server-side).
- **Server Components** by default. Client components must declare `"use client"`.
- **Auth checks** happen in route group layouts via `requireUser()` / `requireAdmin()`. Middleware only does a cheap cookie-presence check for redirects — it doesn't trust the cookie's contents.
- **PHI never leaves `lib/crypto.ts` unencrypted.** Decrypt only at the moment of display, and call `logAudit()` whenever PHI is read or written.
- **Never use `console.*` for objects that might contain PHI** — use `logger` from `lib/logger.ts` instead.

## Compliance posture

This skeleton sets up HIPAA-aware foundations but is **not** HIPAA-compliant on its own. What's already in place:

- AES-256-GCM field-level encryption for the questionnaire (`lib/crypto.ts`)
- Append-only audit log table + `logAudit()` helper
- Role-based access control at the layout boundary
- PHI-redacting logger
- Env validation that fails loudly if `ENCRYPTION_KEY` is missing/wrong-size

What still needs decisions before production with real PHI:

- **Hosting**: Vercel does **not** sign a BAA on Pro/Hobby plans. Either upgrade to Vercel Enterprise (BAA available) or move to a self-hosted Docker deployment on BAA-eligible infra (AWS, GCP).
- **Database**: Neon offers HIPAA on their Business plan; Supabase on Team. Dev tiers are fine as long as no real PHI is stored.
- **Email**: Pick a BAA-friendly transactional email provider (e.g., Postmark for healthcare) before flipping `requireEmailVerification: true` in `lib/auth.ts`.
- **Operational**: backup encryption, breach-notification process, employee training, periodic key rotation with re-encryption migration.

## What's deliberately not built yet

- Real product catalog (just the table + admin/marketing pages over it)
- Real intake questions (3-step placeholder shell exists)
- Stripe checkout flow + webhook handlers
- Email verification + password reset
- Tests (Vitest config will be added when the first non-trivial logic lands)
- Error monitoring (Sentry, etc.)
- CI workflow

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:push` | Push schema directly to DB (dev) |
| `npm run db:generate` | Generate SQL migration files |
| `npm run db:studio` | Drizzle Studio (DB browser) |
