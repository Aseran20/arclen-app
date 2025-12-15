# 📁 Structure des dossiers

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **folder-structure.md**

---

## Vue d'ensemble

Ce document explique l'organisation complète du projet Arclen avec les conventions de nommage et le rôle de chaque dossier.

---

## 🌳 Arborescence complète

```
arclen-app/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # 🌐 Pages publiques (Aceternity UI)
│   │   ├── page.tsx              # Homepage (/)
│   │   ├── pricing/              # Page pricing
│   │   ├── blog/                 # Blog
│   │   ├── about/                # À propos
│   │   └── layout.tsx            # Layout marketing avec navbar
│   │
│   ├── (login)/                  # 🔐 Auth pages (minimal layout)
│   │   ├── sign-in/              # Connexion
│   │   ├── sign-up/              # Inscription
│   │   └── layout.tsx            # Layout simple sans navbar
│   │
│   ├── (dashboard)/              # 🏠 Protected dashboard (shadcn UI)
│   │   ├── dashboard/            # Page dashboard principale
│   │   ├── settings/             # Paramètres utilisateur
│   │   └── layout.tsx            # Layout dashboard avec sidebar
│   │
│   ├── (docs)/                   # 📚 Documentation publique
│   │   ├── docs/                 # Pages docs (/docs, /docs/quick-start, etc.)
│   │   └── layout.tsx            # Layout docs avec sidebar
│   │
│   ├── api/                      # 🔌 API Routes
│   │   ├── auth/                 # Endpoints auth (sign-in, sign-up, logout)
│   │   ├── webhooks/             # Webhooks (Stripe)
│   │   └── user/                 # User endpoints
│   │
│   ├── globals.css               # 🎨 Tailwind v4 config + CSS variables
│   └── layout.tsx                # Root layout (metadata, fonts)
│
├── components/
│   ├── marketing/                # 🎨 Composants Aceternity (public)
│   │   ├── navbar.tsx            # Navbar avec FloatingNav
│   │   ├── hero-section.tsx      # Hero avec animations
│   │   ├── hero-image.tsx        # Dashboard screenshot
│   │   ├── pricing/              # Section pricing
│   │   ├── how-it-works/         # Skeletons + features
│   │   ├── agentic-intelligence/ # AI features showcase
│   │   └── common/               # Dots, Grid, etc.
│   │
│   ├── dashboard/                # 🏠 Composants dashboard (shadcn)
│   │   ├── app-sidebar.tsx       # Sidebar navigation principale
│   │   └── nav-user.tsx          # User menu avec avatar + dropdown
│   │
│   ├── docs/                     # 📚 Composants documentation
│   │   └── docs-sidebar.tsx      # Sidebar docs (Aceternity hover style)
│   │
│   └── ui/                       # 🧩 shadcn primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       └── ...                   # Tous composants shadcn
│
├── lib/
│   ├── db/
│   │   ├── index.ts              # Drizzle client instance
│   │   ├── schema.ts             # Database schema (users, subscriptions)
│   │   ├── migrations/           # Drizzle migrations SQL
│   │   ├── setup.ts              # Script setup .env
│   │   └── seed.ts               # Seed data (test user)
│   │
│   ├── stripe.ts                 # Stripe client + helpers
│   ├── auth.ts                   # JWT helpers (sign, verify)
│   └── utils.ts                  # cn() utility (Aceternity + shadcn)
│
├── hooks/
│   └── use-toast.ts              # Toast notifications (shadcn)
│
├── public/
│   ├── dashboard@3x.png          # Screenshot dashboard (3312x1860)
│   └── ...                       # Assets publics
│
├── documentation/
│   ├── docs-for-ai/              # 📚 Documentation IA (ce dossier)
│   └── aceternity-installation/  # Guide Aceternity setup
│
├── middleware.ts                 # 🛡️ Auth middleware (JWT validation)
├── next.config.ts                # ⚙️ Next.js config (Cache Components)
├── components.json               # 🔧 shadcn CLI + Aceternity registry
├── tsconfig.json                 # TypeScript config (aliases @/)
├── tailwind.config.ts            # Tailwind config (obsolète en v4)
├── package.json                  # Dependencies + scripts
├── pnpm-lock.yaml                # Lockfile pnpm
├── .env                          # Variables d'environnement (git ignored)
├── .env.example                  # Template .env
├── CLAUDE.md                     # 👈 Point d'entrée doc IA
└── README.md                     # README technique
```

---

## 📂 Détail des dossiers clés

### `app/` - Next.js App Router

#### Route Groups : `(marketing)`, `(login)`, `(dashboard)`, `(docs)`

Les parenthèses `()` créent des **route groups** sans affecter l'URL.

**Bénéfices** :
- Layouts différents pour chaque section
- Séparation claire des design systems (Aceternity vs shadcn)
- Organisation logique

**Exemple** :
```
app/(marketing)/pricing/page.tsx  → URL: /pricing
app/(dashboard)/settings/page.tsx → URL: /settings
app/(docs)/docs/quick-start/page.tsx → URL: /docs/quick-start
```

#### `app/(marketing)/` - Pages publiques

**Design system** : Aceternity UI Pro
**Layout** : [app/(marketing)/layout.tsx](../../../app/(marketing)/layout.tsx)
**Composants** : `components/marketing/`

**Pages** :
- `/` - Homepage (hero, features, pricing, footer)
- `/pricing` - Plans tarifaires
- `/blog` - Articles
- `/about` - À propos

**Particularités** :
- Navbar flottante (FloatingNav) avec Aceternity
- Animations Motion sur tous les composants
- Mode clair/sombre (ModeToggle)

---

#### `app/(login)/` - Authentification

**Design system** : Minimal (formulaires simples)
**Layout** : [app/(login)/layout.tsx](../../../app/(login)/layout.tsx)

**Pages** :
- `/sign-in` - Connexion
- `/sign-up` - Inscription

**Particularités** :
- Pas de navbar (layout minimal)
- Formulaires avec react-hook-form + zod
- Redirect vers dashboard après login

---

#### `app/(dashboard)/` - Dashboard protégé

**Design system** : shadcn UI
**Layout** : [app/(dashboard)/layout.tsx](../../../app/(dashboard)/layout.tsx)
**Composants** : `components/dashboard/` + `components/ui/`

**Pages** :
- `/dashboard` - Vue d'ensemble
- `/settings` - Paramètres utilisateur

**Particularités** :
- Protégé par middleware ([middleware.ts](../../../middleware.ts))
- Sidebar de navigation
- UserButton avec SWR data fetching

**Protection** :
```typescript
// middleware.ts vérifie JWT
if (!token && isDashboardRoute) {
  return NextResponse.redirect("/sign-in");
}
```

---

#### `app/(docs)/` - Documentation publique

**Design system** : Aceternity-inspired sidebar + Tailwind Typography
**Layout** : [app/(docs)/layout.tsx](../../../app/(docs)/layout.tsx)
**Composants** : `components/docs/`

**Pages** :
- `/docs` - Introduction
- `/docs/quick-start` - Guide de démarrage
- `/docs/excel-bulk` - Documentation Excel AI Bulk
- `/docs/excel-audit` - Documentation Excel AI Audit
- `/docs/powerpoint-audit` - Documentation PowerPoint AI Audit

**Particularités** :
- Sidebar sticky avec hover animations (style Aceternity)
- Navigation responsive (drawer sur mobile)
- Contenu formaté avec `prose` (Tailwind Typography)
- Navigation prev/next en bas de chaque page

---

#### `app/api/` - API Routes

**Endpoints** :

**Auth** :
- `POST /api/auth/sign-up` - Inscription (bcrypt hash)
- `POST /api/auth/sign-in` - Connexion (JWT generation)
- `POST /api/auth/logout` - Déconnexion (clear cookie)

**User** :
- `GET /api/user` - Récupère user actuel (JWT)

**Webhooks** :
- `POST /api/webhooks/stripe` - Stripe events (subscription updates)

**Pattern** :
```typescript
// app/api/user/route.ts
export async function GET(request: Request) {
  const token = cookies().get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await db.query.users.findFirst({
    where: eq(users.id, decoded.userId)
  });
  return NextResponse.json(user);
}
```

---

### `components/` - Composants React

#### Règle d'organisation :

| Dossier | Design System | Usage |
|---------|---------------|-------|
| `components/marketing/` | Aceternity UI Pro | Pages publiques `(marketing)` |
| `components/dashboard/` | shadcn UI | Dashboard `(dashboard)` |
| `components/docs/` | Aceternity-inspired | Documentation `(docs)` |
| `components/ui/` | shadcn primitives | Partout (boutons, cards, etc.) |

#### `components/marketing/` - Aceternity

**Composants clés** :
- `navbar.tsx` - DesktopNav + FloatingNav + MobileNav
- `hero-section.tsx` - Hero avec animations
- `hero-image.tsx` - Dashboard screenshot (unoptimized)
- `pricing/` - Cartes de pricing
- `how-it-works/` - Skeletons interactifs
- `common/dots.tsx` - Dot grid animé (requestAnimationFrame)

**Pattern** :
```typescript
import { motion } from "motion/react";

export const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ... */}
    </motion.div>
  );
};
```

---

#### `components/dashboard/` - Dashboard custom

**Composants clés** :
- `nav-user.tsx` - User menu avec avatar + dropdown (SWR)

**Note** : Le sidebar est défini dans `components/ui/collapsible-sidebar.tsx` (Aceternity) et utilisé directement dans `app/(dashboard)/layout.tsx`.

**Pattern NavUser** :
```typescript
import useSWR from "swr";
import { useSidebar } from "@/components/ui/collapsible-sidebar";

export function NavUser() {
  const { open } = useSidebar();
  const { data: user } = useSWR<User>("/api/user", fetcher);

  // Avatar + dropdown avec Account, Settings, Log out
  // Adapte affichage selon état sidebar (open/closed)
}
```

**Dashboard Layout** :
```typescript
// app/(dashboard)/layout.tsx
// Utilise Aceternity collapsible-sidebar avec Motion animations
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/collapsible-sidebar";

function DashboardSidebar() {
  const [open, setOpen] = useState(true);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody>
        <Logo open={open} />  {/* Logo complet ou favicon */}
        {/* Navigation links */}
        <NavUser />
      </SidebarBody>
    </Sidebar>
  );
}
```

---

#### `components/ui/` - UI primitives

Composants shadcn installés via CLI :
```bash
pnpm dlx shadcn@latest add button card dropdown-menu
```

**Composants shadcn** :
- `button.tsx`
- `card.tsx`
- `dropdown-menu.tsx`
- `input.tsx`
- `label.tsx`
- etc.

**Composant Aceternity** :
- `collapsible-sidebar.tsx` - Sidebar dashboard avec animations Motion

**Configuration** : [components.json](../../../components.json)

---

### `lib/` - Utilities & Logic

#### `lib/db/` - Database

**Fichiers** :
- `index.ts` - Drizzle client
- `schema.ts` - Tables (users, subscriptions)
- `migrations/` - SQL migrations auto-générées
- `setup.ts` - Script interactif pour créer `.env`
- `seed.ts` - Seed test user (test@test.com)

**Usage** :
```typescript
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

const allUsers = await db.select().from(users);
```

---

#### `lib/stripe.ts`

**Exports** :
- `stripe` - Stripe client instance
- Helper functions pour checkout, subscriptions

---

#### `lib/auth.ts`

**Exports** :
- `signToken(userId)` - Génère JWT
- `verifyToken(token)` - Vérifie JWT
- `hashPassword(password)` - bcrypt hash
- `comparePassword(password, hash)` - bcrypt compare

---

#### `lib/utils.ts`

**Exports** :
- `cn(...classes)` - Merge Tailwind classes (clsx + tailwind-merge)

**Usage partout** :
```typescript
import { cn } from "@/lib/utils";

<div className={cn("base-class", isActive && "active-class")} />
```

---

## 🎯 Conventions de nommage

### Fichiers

| Type | Convention | Exemple |
|------|------------|---------|
| Page | `page.tsx` | `app/(marketing)/pricing/page.tsx` |
| Layout | `layout.tsx` | `app/(marketing)/layout.tsx` |
| API Route | `route.ts` | `app/api/user/route.ts` |
| Component | `kebab-case.tsx` | `user-button.tsx` |
| Utility | `kebab-case.ts` | `auth.ts`, `stripe.ts` |

### Dossiers

| Type | Convention | Exemple |
|------|------------|---------|
| Route | lowercase | `pricing/`, `dashboard/` |
| Route Group | `(lowercase)` | `(marketing)/`, `(dashboard)/` |
| Component folder | kebab-case | `how-it-works/`, `agentic-intelligence/` |

---

## 🔄 Voir aussi

- [tech-stack.md](tech-stack.md) - Technologies utilisées dans chaque dossier
- [design-systems.md](design-systems.md) - Séparation Aceternity / shadcn
- [common-tasks.md](../02-development/common-tasks.md) - Comment ajouter fichiers/pages

---

*Dernière mise à jour : 2025-12-15*
