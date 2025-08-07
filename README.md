# Freeshare – Free Software Distribution Platform

Self-hostable Next.js 14+ TypeScript app (App Router) for publishing and discovering freely distributed software, with GitHub integration, WebAuthn passkeys, tRPC + Zod, PWA, and push notifications.

## Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- next-auth (JWT) with GitHub OAuth + custom WebAuthn Credentials provider
- tRPC + Zod, Drizzle ORM (Postgres), Redis (ioredis)
- @simplewebauthn/server & browser
- BullMQ worker + web-push (VAPID)
- PWA via next-pwa
- Vitest + Testing Library

## Quick start (Docker Compose)
1. Copy `.env.example` to `.env` and fill values.
2. Generate VAPID keys: `npx web-push generate-vapid-keys`.
3. Build & run: `docker compose up --build -d`.
4. Run migrations: `docker compose exec app npm run db:push` (or `db:migrate` if using generated migrations in `drizzle/`).
5. Seed data: `docker compose exec app npm run db:seed`.
6. Visit `${NEXT_PUBLIC_APP_URL}`.

Adminer: http://localhost:8080 (server: postgres, user: postgres, pass: postgres, db: freeshare).

## Development
- Install deps: `npm ci`
- Start dev server: `npm run dev`
- Generate Drizzle SQL: `npm run db:generate`
- Apply schema: `npm run db:push`
- Run tests: `npm test`

## Auth and sessions
- next-auth JWT sessions; cookies are `Secure` and `SameSite=Lax` in prod.
- GitHub OAuth handled by built-in provider (link accounts in session UI).
- WebAuthn: client requests options via tRPC; performs `navigator.credentials.create/get` via `@simplewebauthn/browser`; sends payload to custom Credentials provider (`id: 'webauthn'`) with `{ type: 'attestation'|'assertion', data: ... }`.
- Server verifies with `@simplewebauthn/server` comparing against Redis-stored `expectedChallenge` (removed on use) and persists authenticators, updating `counter` to prevent replay.

## tRPC + Zod
- Client hooks via `createTRPCNext` in `src/lib/trpc.ts` (SSR disabled by default). Enable SSR per-route if needed.
- Zod inputs/outputs declared and exported in each router.

## GitHub integration
- Link GitHub via next-auth provider.
- Import releases via `product.importFromGitHub` or webhook at `src/pages/api/github/webhook.ts` (X-Hub-Signature-256 verified).

## Push notifications & PWA
- Subscriptions stored per user; worker sends notifications on new versions.
- Service worker/manifest provided by next-pwa; ensure HTTPS in production for push.

## Database model
Tables mirror spec: `User`, `Authenticator`, `Product`, `ProductVersion`, `Review`, `Category`, `Tag`, `ProductTag`, `PushSubscription`, `Follow`, `PersistedChallenge` (optionally replace with Redis-only storage). See `src/server/db/schema.ts`.

## Security notes
- Do not store plaintext GitHub tokens; if needed, encrypt at rest (see `ENCRYPTION_SECRET`).
- Webhook signatures verified. Ensure strong `NEXTAUTH_SECRET`.
- Persist and validate WebAuthn `signCount` (counter) to mitigate replay.

## Worker
- Built to `dist/worker/index.js`. Compose service `worker` runs it.

## Make it your own
- Update UI, add role checks via `ctx.session` in tRPC, and consider enabling SSR for product pages.