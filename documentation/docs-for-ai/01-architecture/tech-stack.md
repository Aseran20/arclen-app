# 🔧 Stack technique détaillée

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **tech-stack.md**

---

## Vue d'ensemble

Ce document détaille toutes les technologies utilisées dans Arclen avec leurs versions exactes, particularités du projet, et liens vers la documentation officielle.

---

## 🌐 Framework & Runtime

### Next.js 16.1.0-canary.22
**Rôle** : Framework React full-stack

**Particularités du projet** :
- Utilise **App Router** (pas Pages Router)
- **Cache Components** activé (anciennement PPR/Partial Prerendering)
  - Nécessite des Suspense boundaries pour data fetching
  - Incompatible avec `revalidate` config dans route segments
- Turbopack en mode dev
- Middleware personnalisé pour auth

**Configuration** : [next.config.ts](../../../next.config.ts)

**Documentation** : https://nextjs.org/docs

**Breaking changes importants** :
- `experimental.ppr` → `cacheComponents` (stable)
- `clientSegmentCache` supprimé
- Suspense requis pour `connection()` et data fetching client

---

### React 19.1.0
**Rôle** : UI library

**Particularités du projet** :
- Utilise Server Components (RSC) pour pages marketing et dashboard
- Client Components marqués avec `"use client"`
- Hooks : `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`
- SWR pour data fetching côté client (UserButton)

**Documentation** : https://react.dev

**Pattern important** : Math.random() en SSR
```typescript
// ❌ Incorrect (cause prerender errors)
const randomValue = useMemo(() => Math.random(), []);

// ✅ Correct (client-only)
const [randomValue, setRandomValue] = useState(0);
useEffect(() => {
  setRandomValue(Math.random());
}, []);
```

---

## 🎨 Styling & UI

### Tailwind CSS 4.1.7
**Rôle** : Utility-first CSS framework

**Particularités du projet** :
- **Tailwind v4** (nouvelle syntaxe)
  - `@import "tailwindcss"` au lieu de `@tailwind`
  - `@theme` blocks pour configuration
  - CSS-first au lieu de tailwind.config.js
- Configuration dans [app/globals.css](../../../app/globals.css)
- CSS variables pour théming dual (shadcn + Aceternity)

**Configuration** : [app/globals.css](../../../app/globals.css)

**Documentation** : https://tailwindcss.com/docs

**Exemple de @theme block** :
```css
@theme {
  --color-primary: #3b82f6;
  --color-brand: #6366f1;
}
```

---

### shadcn/ui (Latest)
**Rôle** : Component library pour dashboard

**Particularités du projet** :
- Style : "new-york"
- Composants dans `components/ui/`
- Utilisé UNIQUEMENT pour dashboard (route group `(dashboard)`)
- CSS variables : `--background`, `--foreground`, `--primary`, etc.

**Configuration** : [components.json](../../../components.json)

**Documentation** : https://ui.shadcn.com

**CLI** :
```bash
pnpm dlx shadcn@latest add button
```

---

### Aceternity UI Pro (Latest)
**Rôle** : Premium components pour marketing

**Particularités du projet** :
- Composants dans `components/marketing/`
- Utilisé UNIQUEMENT pour pages marketing (route group `(marketing)`)
- Dépend de Motion (Framer Motion v12)
- Animations avancées avec `motion` components
- CSS variables : `--color-brand-*`, custom tokens

**Configuration** :
- [components.json](../../../components.json) (registry)
- [documentation/aceternity-installation/](../../aceternity-installation/)

**Documentation** : https://ui.aceternity.com

**CLI** :
```bash
pnpm dlx shadcn@latest add @aceternity/hero-section
```

---

### Motion 12.23.12 (Framer Motion fork)
**Rôle** : Animation library

**Particularités du projet** :
- Package name : `"motion"` (pas `"framer-motion"`)
- Compatible React 19
- Utilisé massivement dans composants Aceternity
- Patterns : `motion.div`, `AnimatePresence`, `useInView`

**Documentation** : https://www.framer.com/motion/

**Import** :
```typescript
import { motion, AnimatePresence } from "motion/react";
```

**Performance tip** : Utiliser `requestAnimationFrame` pour throttling
```typescript
useEffect(() => {
  let rafId: number;
  const handleMouseMove = (e: MouseEvent) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  };
  window.addEventListener("mousemove", handleMouseMove);
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    if (rafId) cancelAnimationFrame(rafId);
  };
}, []);
```

---

## 🗄️ Database & ORM

### Drizzle ORM (Latest)
**Rôle** : TypeScript-first ORM

**Particularités du projet** :
- Schéma dans `lib/db/schema.ts`
- Migrations dans `lib/db/migrations/`
- Client : `lib/db/index.ts`

**Scripts package.json** :
```json
{
  "db:setup": "tsx lib/db/setup.ts",
  "db:migrate": "drizzle-kit migrate",
  "db:push": "drizzle-kit push",
  "db:seed": "tsx lib/db/seed.ts",
  "db:studio": "drizzle-kit studio"
}
```

**Documentation** : https://orm.drizzle.team

**Exemple de query** :
```typescript
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const user = await db.query.users.findFirst({
  where: eq(users.email, email)
});
```

---

### Neon PostgreSQL
**Rôle** : Serverless Postgres database

**Particularités du projet** :
- Connection string dans `.env` (`DATABASE_URL`)
- Branching support (dev/staging/prod)
- Auto-scaling

**Documentation** : https://neon.tech/docs

**Connection** :
```typescript
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
```

---

## 💳 Payments

### Stripe (Latest)
**Rôle** : Payment processing + subscriptions

**Particularités du projet** :
- Webhook endpoint : `/api/webhooks/stripe`
- Produits configurés dans Stripe Dashboard
- Test mode avec Stripe CLI
- Types : `stripe-event-types` package

**Variables d'environnement** :
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Documentation** : https://stripe.com/docs

**Webhook local** :
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 🔐 Authentication

### bcryptjs
**Rôle** : Password hashing

**Particularités du projet** :
- Hash rounds : 10
- Utilisé dans `/api/auth/sign-up` et `/api/auth/sign-in`

**Documentation** : https://github.com/dcodeIO/bcrypt.js

**Usage** :
```typescript
import bcrypt from "bcryptjs";

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Compare
const isValid = await bcrypt.compare(password, hashedPassword);
```

---

### jsonwebtoken
**Rôle** : JWT token generation

**Particularités du projet** :
- Secret dans `.env` (`JWT_SECRET`)
- Expiration : 7 jours
- HTTP-only cookies
- Middleware de protection dans `middleware.ts`

**Documentation** : https://github.com/auth0/node-jsonwebtoken

**Usage** :
```typescript
import jwt from "jsonwebtoken";

const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET!,
  { expiresIn: "7d" }
);
```

---

### SWR
**Rôle** : Data fetching + caching côté client

**Particularités du projet** :
- Utilisé dans `UserButton` component
- Pattern : `useSWR("/api/user", fetcher)`

**Documentation** : https://swr.vercel.app

**Usage** :
```typescript
import useSWR from "swr";

const { data, error, isLoading } = useSWR("/api/user", fetcher);
```

---

## 🛠️ Developer Tools

### TypeScript 5.x
**Rôle** : Type safety

**Particularités du projet** :
- Strict mode activé
- Path aliases : `@/` → racine du projet
- Configuration : [tsconfig.json](../../../tsconfig.json)

---

### ESLint + Prettier
**Rôle** : Linting + formatting

**Particularités du projet** :
- Config Next.js par défaut
- `.eslintrc.json` pour règles custom

---

### pnpm
**Rôle** : Package manager

**Particularités du projet** :
- Lockfile : `pnpm-lock.yaml`
- Workspace : mono-repo supporté

**Commandes principales** :
```bash
pnpm install
pnpm dev
pnpm build
pnpm start
```

---

## 📦 Autres dépendances importantes

### @neondatabase/serverless
Neon PostgreSQL client serverless

### stripe
Stripe Node.js library

### zod
Schema validation (formulaires, API)

### react-hook-form
Form state management

### lucide-react
Icon library (utilisé par shadcn)

---

## 🔄 Voir aussi

- [folder-structure.md](folder-structure.md) - Organisation des fichiers utilisant ces technos
- [design-systems.md](design-systems.md) - Comment shadcn et Aceternity coexistent
- [setup-guide.md](../02-development/setup-guide.md) - Installation de toutes ces dépendances
- [changelog.md](../03-decisions/changelog.md) - Historique des changements de versions

---

*Dernière mise à jour : 2025-12-15*
