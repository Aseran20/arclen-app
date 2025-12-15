# 🛠️ Tâches courantes

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **common-tasks.md**

---

## Vue d'ensemble

Ce guide couvre les tâches quotidiennes qu'un développeur fait régulièrement sur Arclen : ajouter pages, composants, routes API, migrations DB, etc.

---

## 📄 Ajouter une page marketing

**Design system** : Aceternity UI Pro

### Étape 1 : Crée le fichier page

```bash
# Structure
app/(marketing)/[nom-page]/page.tsx
```

**Exemple** : Page "Features"

Crée `app/(marketing)/features/page.tsx` :

```typescript
import { HeroSection } from "@/components/marketing/hero-section";
import { FeatureGrid } from "@/components/marketing/features/feature-grid";

export const metadata = {
  title: "Features | Arclen",
  description: "Discover all the features of Arclen"
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="Powerful Features"
        subtitle="Everything you need to build amazing products"
      />
      <FeatureGrid />
    </main>
  );
}
```

### Étape 2 : Ajoute dans la navbar

Édite `components/marketing/navbar.tsx` :

```typescript
const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" }, // ← Ajoute ici
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" }
];
```

### Étape 3 : Crée les composants nécessaires

Si besoin de composants custom :

```bash
# Crée dans components/marketing/features/
components/marketing/features/feature-grid.tsx
```

**Pattern Aceternity** :
```typescript
"use client";

import { motion } from "motion/react";

export const FeatureGrid = () => {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Contenu */}
      </motion.div>
    </section>
  );
};
```

**URL** : Accessible sur `/features`

---

## 🏠 Ajouter une page dashboard

**Design system** : shadcn UI

### Étape 1 : Crée le fichier page

```bash
# Structure
app/(dashboard)/[nom-page]/page.tsx
```

**Exemple** : Page "Analytics"

Crée `app/(dashboard)/analytics/page.tsx` :

```typescript
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export const metadata = {
  title: "Analytics | Dashboard"
};

export default async function AnalyticsPage() {
  // Server Component - fetch data directement
  const totalUsers = await db.select().from(users);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalUsers.length}</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Étape 2 : Ajoute dans le sidebar

Édite `components/dashboard/sidebar.tsx` :

```typescript
const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Analytics", href: "/analytics", icon: ChartIcon }, // ← Ajoute ici
  { name: "Settings", href: "/settings", icon: SettingsIcon }
];
```

**URL** : Accessible sur `/analytics` (protégé par middleware)

---

## 🔌 Ajouter une route API

### Étape 1 : Crée le fichier route

```bash
# Structure
app/api/[nom-endpoint]/route.ts
```

**Exemple** : Endpoint GET `/api/stats`

Crée `app/api/stats/route.ts` :

```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, subscriptions } from "@/lib/db/schema";

export async function GET(request: Request) {
  try {
    const totalUsers = await db.select().from(users);
    const activeSubscriptions = await db.select().from(subscriptions);

    return NextResponse.json({
      totalUsers: totalUsers.length,
      activeSubscriptions: activeSubscriptions.length
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Étape 2 : Ajoute d'autres méthodes si besoin

```typescript
// POST
export async function POST(request: Request) {
  const body = await request.json();
  // Traitement
  return NextResponse.json({ success: true });
}

// PUT
export async function PUT(request: Request) {
  // ...
}

// DELETE
export async function DELETE(request: Request) {
  // ...
}
```

### Étape 3 : Utilise dans un composant client

```typescript
"use client";

import { useEffect, useState } from "react";

export const StatsDisplay = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return <div>{stats?.totalUsers} users</div>;
};
```

---

## 🗄️ Modifier le schéma database

### Scénario : Ajouter un champ `phone` à la table `users`

### Étape 1 : Modifie le schéma

Édite `lib/db/schema.ts` :

```typescript
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  phone: text("phone"), // ← Ajoute ce champ
  createdAt: timestamp("created_at").defaultNow().notNull()
});
```

### Étape 2 : Génère la migration

```bash
pnpm drizzle-kit generate
```

**Output** :
```
✅ Migration generated: lib/db/migrations/0001_add_phone_to_users.sql
```

### Étape 3 : Applique la migration

```bash
pnpm db:migrate
```

**Vérification** :
```bash
pnpm db:studio
# Ouvre Drizzle Studio et vérifie que le champ "phone" existe
```

### Étape 4 : Utilise le nouveau champ

```typescript
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

// Créer un user avec phone
await db.insert(users).values({
  email: "user@example.com",
  name: "John Doe",
  password: "hashed",
  phone: "+1234567890" // ← Nouveau champ
});

// Query avec phone
const usersWithPhone = await db
  .select()
  .from(users)
  .where(sql`phone IS NOT NULL`);
```

---

## 🧩 Ajouter un composant shadcn

### Installer un composant existant

```bash
pnpm dlx shadcn@latest add [nom-composant]
```

**Exemples** :
```bash
pnpm dlx shadcn@latest add button      # Bouton
pnpm dlx shadcn@latest add dialog      # Dialog/Modal
pnpm dlx shadcn@latest add table       # Table
pnpm dlx shadcn@latest add form        # Form avec react-hook-form
```

**Output** :
```
✅ component/ui/button.tsx created
```

**Usage** :
```typescript
import { Button } from "@/components/ui/button";

<Button variant="default">Click me</Button>
```

### Customiser un composant shadcn

Édite directement le fichier dans `components/ui/` :

```typescript
// components/ui/button.tsx

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        custom: "bg-gradient-to-r from-blue-500 to-purple-600" // ← Custom variant
      }
    }
  }
);
```

**Usage** :
```typescript
<Button variant="custom">Gradient Button</Button>
```

---

## 🎨 Ajouter un composant Aceternity

### Installer via registry

```bash
pnpm dlx shadcn@latest add @aceternity/[nom-composant]
```

**Exemples** :
```bash
pnpm dlx shadcn@latest add @aceternity/hero-section
pnpm dlx shadcn@latest add @aceternity/feature-grid
```

### Créer un composant Aceternity custom

Crée dans `components/marketing/` :

```bash
# Structure
components/marketing/[nom-section]/[nom-composant].tsx
```

**Template** :
```typescript
"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MyComponentProps {
  title: string;
  description?: string;
  className?: string;
}

export const MyComponent = ({
  title,
  description,
  className
}: MyComponentProps) => {
  return (
    <motion.section
      className={cn("py-20 px-4", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold">{title}</h2>
      {description && <p className="mt-4">{description}</p>}
    </motion.section>
  );
};
```

**Best practices** :
- Toujours `"use client"` pour composants avec animations
- Utiliser `motion` pour animations
- Props typées avec TypeScript
- `className` prop pour customisation

---

## 🔐 Protéger une route

### Option 1 : Via middleware (recommandé pour dashboard)

Le middleware ([middleware.ts](../../../middleware.ts)) protège déjà `/dashboard/*`.

Pour ajouter une route :

```typescript
// middleware.ts

const protectedRoutes = [
  "/dashboard",
  "/analytics", // ← Ajoute ici
  "/settings"
];

if (protectedRoutes.some(route => pathname.startsWith(route))) {
  // Vérifie JWT
}
```

### Option 2 : Server Component check

Dans la page elle-même :

```typescript
// app/(dashboard)/secret/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function SecretPage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/sign-in");
  }

  const user = await verifyToken(token);

  if (!user) {
    redirect("/sign-in");
  }

  return <div>Protected content for {user.email}</div>;
}
```

### Option 3 : Client Component check

```typescript
"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useEffect } from "react";

export const ProtectedComponent = () => {
  const router = useRouter();
  const { data: user, error } = useSWR("/api/user", fetcher);

  useEffect(() => {
    if (error || !user) {
      router.push("/sign-in");
    }
  }, [user, error, router]);

  if (!user) return <div>Loading...</div>;

  return <div>Protected content</div>;
};
```

---

## 💳 Tester Stripe localement

### Étape 1 : Stripe CLI listen

Terminal 2 :
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Étape 2 : Trigger un événement

**Via Dashboard Stripe** :
1. Dashboard → Developers → Events
2. "Send test webhook"
3. Sélectionne `customer.subscription.created`

**Via CLI** :
```bash
stripe trigger customer.subscription.created
```

### Étape 3 : Vérifie les logs

Terminal 2 devrait afficher :
```
  customer.subscription.created    [200] POST http://localhost:3000/api/webhooks/stripe
```

---

## 📝 Mettre à jour la documentation

### Quand mettre à jour ?

✅ Après ajout d'une feature majeure
✅ Après changement d'architecture
✅ Après upgrade de version importante
✅ Après résolution d'un problème complexe

### Fichiers à mettre à jour

1. **changelog.md** (TOUJOURS) :
```markdown
## 2025-12-15 - Ajout page Analytics

**Contexte** : Besoin de visualiser les stats utilisateurs

**Changements** :
- Ajout route `/analytics`
- Nouveau composant StatsDisplay
- Endpoint API `/api/stats`

**Fichiers** :
- app/(dashboard)/analytics/page.tsx
- app/api/stats/route.ts
- components/dashboard/sidebar.tsx (ajout link)
```

2. **Si changement de structure** : `folder-structure.md`
3. **Si nouvelle dépendance** : `tech-stack.md`
4. **Si nouveau problème rencontré** : `troubleshooting.md`

---

## 🔄 Voir aussi

- [setup-guide.md](setup-guide.md) - Installation initiale
- [troubleshooting.md](troubleshooting.md) - Résolution de problèmes
- [folder-structure.md](../01-architecture/folder-structure.md) - Où mettre les fichiers
- [changelog.md](../03-decisions/changelog.md) - Historique des modifications

---

*Dernière mise à jour : 2025-12-15*
