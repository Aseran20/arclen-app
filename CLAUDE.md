# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Arclen** is a B2B SaaS offering AI copilots for Excel & PowerPoint, built for M&A and finance teams.

**Tech stack**:
- **Marketing pages**: Aceternity UI Pro components (premium animations)
- **Dashboard**: shadcn/ui components with collapsible sidebar
- **Backend**: JWT auth, Stripe payments, PostgreSQL via Drizzle ORM

## Commands

```bash
# Development
pnpm install          # Install dependencies
pnpm dev              # Start dev server (Turbopack)
pnpm build            # Production build

# Database
pnpm db:setup         # Interactive .env setup
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed test user (test@test.com / admin123)
pnpm db:generate      # Generate migration from schema changes
pnpm db:studio        # Open Drizzle Studio GUI

# Stripe (separate terminal)
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Architecture

### Route Groups (app/)
```
app/
├── (marketing)/     # Public: /, /pricing, /contact, /privacy, /terms, /legal
├── (login)/         # Auth: /sign-in, /sign-up
├── (dashboard)/     # Protected: /dashboard/*, /subscription (with sidebar)
└── api/             # API routes: /api/stripe/*, /api/user, /api/team
```

### Dashboard Components
```
components/dashboard/
├── app-sidebar.tsx  # Collapsible sidebar (Account, Billing sections)
└── nav-user.tsx     # User menu with avatar + dropdown (SWR)
```

### Key Architectural Patterns

**Authentication Flow:**
- JWT tokens stored in httpOnly cookies (24h expiry)
- `middleware.ts` protects `/dashboard*` routes and auto-refreshes tokens
- `lib/auth/session.ts`: signToken, verifyToken, getSession, setSession
- `lib/auth/middleware.ts`: validatedAction, validatedActionWithUser, withTeam (Server Action wrappers)

**Database (Drizzle + Neon PostgreSQL):**
- Schema: `lib/db/schema.ts` - users, teams, teamMembers, activityLogs, invitations
- Queries: `lib/db/queries.ts` - getUser(), getTeamForUser(), etc.
- Team-based multi-tenancy with RBAC (owner/member roles)

**Stripe Integration:**
- `lib/payments/stripe.ts`: createCheckoutSession, handleSubscriptionChange
- Webhook: `app/api/stripe/webhook/route.ts`
- Teams have stripeCustomerId, stripeSubscriptionId, planName, subscriptionStatus

**Dual Design System:**
- **Marketing** (`components/marketing/`): Aceternity UI Pro - animations, effects
- **Dashboard** (`components/dashboard/` + `components/ui/`): shadcn/ui - sidebar, forms
- Both configured in `components.json` with registries: @shadcn, @aceternity

**Dashboard Colors (use CSS variables, not hardcoded):**
- Buttons: `bg-primary text-primary-foreground hover:bg-primary/90`
- Accent backgrounds: `bg-primary/10`
- Secondary text: `text-muted-foreground`
- Avoid: `bg-orange-*`, `text-gray-*` hardcoded colors

**Data Fetching:**
- Root layout pre-fetches user/team via SWR fallback pattern
- Dashboard uses SWR with `/api/user` and `/api/team` endpoints

### Component Installation

```bash
# shadcn components
pnpm dlx shadcn@latest add button card

# Aceternity components (via registry)
pnpm dlx shadcn@latest add "@aceternity/spotlight"
```

## Environment Variables

Required in `.env`:
- `POSTGRES_URL` - Neon PostgreSQL connection string
- `AUTH_SECRET` - JWT signing key (generate with `openssl rand -base64 32`)
- `BASE_URL` - App URL (http://localhost:3000 in dev)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - From `stripe listen` output

## Detailed Documentation

For in-depth information, see `documentation/docs-for-ai/`:
- `01-architecture/` - Tech stack details, folder structure, design systems
- `02-development/` - Setup guide, common tasks, troubleshooting
- `03-decisions/` - Changelog, architectural decisions
- `04-quick-reference/` - Stripe, auth, database quick refs
