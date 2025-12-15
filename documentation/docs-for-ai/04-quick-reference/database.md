# 🗄️ Database - Référence rapide

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **database.md**

---

## Variables d'environnement

```bash
# .env
DATABASE_URL="postgresql://user:password@host:5432/db?sslmode=require"
```

**Format Neon** :
```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

---

## Stack database

| Techno | Rôle |
|--------|------|
| PostgreSQL (Neon) | Database serverless |
| Drizzle ORM | TypeScript ORM |
| `@neondatabase/serverless` | Neon client |

---

## Scripts package.json

| Script | Commande | Usage |
|--------|----------|-------|
| Setup | `pnpm db:setup` | Configure `.env` interactivement |
| Migrate | `pnpm db:migrate` | Applique migrations SQL |
| Push | `pnpm db:push` | Push schema sans migration |
| Seed | `pnpm db:seed` | Seed utilisateur test |
| Studio | `pnpm db:studio` | Interface graphique Drizzle |
| Generate | `pnpm drizzle-kit generate` | Génère migrations depuis schema |

---

## Schema actuel

**Fichier** : [lib/db/schema.ts](../../../lib/db/schema.ts)

### Table : users

```typescript
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
```

**Colonnes** :
- `id` : Serial (auto-increment)
- `email` : Text, unique, not null
- `name` : Text, not null
- `password` : Text (bcrypt hash), not null
- `createdAt` : Timestamp, default now

---

### Table : subscriptions

```typescript
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  status: text("status").notNull(), // active, canceled, past_due
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
```

**Colonnes** :
- `id` : Serial
- `userId` : Foreign key → `users.id`
- `stripeSubscriptionId` : Text, unique (Stripe sub ID)
- `stripePriceId` : Text (Stripe price ID)
- `status` : Text (active, canceled, past_due)
- `createdAt` / `updatedAt` : Timestamps

---

## Drizzle client

**Fichier** : [lib/db/index.ts](../../../lib/db/index.ts)

```typescript
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
```

**Usage** :
```typescript
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

// Query
const allUsers = await db.select().from(users);
```

---

## Queries courantes

### Select all

```typescript
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

const allUsers = await db.select().from(users);
```

---

### Select with WHERE

```typescript
import { eq } from "drizzle-orm";

const user = await db.query.users.findFirst({
  where: eq(users.email, "test@test.com")
});

// Ou
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, "test@test.com"));
```

---

### Insert

```typescript
const newUser = await db.insert(users).values({
  email: "john@example.com",
  name: "John Doe",
  password: "hashed_password"
}).returning();

console.log(newUser[0]); // User créé
```

---

### Update

```typescript
await db
  .update(users)
  .set({ name: "Jane Doe" })
  .where(eq(users.id, 1));
```

---

### Delete

```typescript
await db
  .delete(users)
  .where(eq(users.id, 1));
```

---

### Join

```typescript
import { subscriptions } from "@/lib/db/schema";

const usersWithSubscriptions = await db
  .select({
    user: users,
    subscription: subscriptions
  })
  .from(users)
  .leftJoin(subscriptions, eq(users.id, subscriptions.userId));
```

---

### Count

```typescript
import { count } from "drizzle-orm";

const [result] = await db
  .select({ count: count() })
  .from(users);

console.log(result.count); // Nombre total d'users
```

---

## Migrations

### Workflow migrations

1. **Modifie le schema** : `lib/db/schema.ts`
   ```typescript
   export const users = pgTable("users", {
     id: serial("id").primaryKey(),
     email: text("email").notNull().unique(),
     name: text("name").notNull(),
     password: text("password").notNull(),
     phone: text("phone"), // ← Nouveau champ
     createdAt: timestamp("created_at").defaultNow().notNull()
   });
   ```

2. **Génère la migration** :
   ```bash
   pnpm drizzle-kit generate
   ```

   **Output** :
   ```
   ✅ Migration generated: lib/db/migrations/0001_add_phone_to_users.sql
   ```

3. **Applique la migration** :
   ```bash
   pnpm db:migrate
   ```

---

### Push schema (sans migration)

**Utile pour** : Dev rapide, prototyping

```bash
pnpm db:push
```

**⚠️ Attention** : Ne crée pas de fichiers migration (pas idéal pour prod)

---

### Force reset (DANGER)

```bash
# Supprime TOUTES les données et re-crée le schema
pnpm db:push --force
pnpm db:seed
```

---

## Drizzle Studio

**Interface graphique** pour explorer la DB

```bash
pnpm db:studio
```

**Ouvre** : http://localhost:4983

**Features** :
- Voir toutes les tables
- Éditer données directement
- Exécuter queries SQL
- Voir relations (foreign keys)

---

## Seed data

**Fichier** : [lib/db/seed.ts](../../../lib/db/seed.ts)

**Commande** :
```bash
pnpm db:seed
```

**Crée** :
- User test : `test@test.com` / `admin123`

**Contenu** :
```typescript
import { db } from "./index";
import { users } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await db.insert(users).values({
    email: "test@test.com",
    name: "Test User",
    password: hashedPassword
  });

  console.log("✅ Seed user created: test@test.com");
}

seed();
```

---

## Opérateurs Drizzle

```typescript
import { eq, ne, gt, gte, lt, lte, like, and, or, not, inArray, isNull, isNotNull } from "drizzle-orm";

// Equal
where(eq(users.id, 1))

// Not equal
where(ne(users.status, "inactive"))

// Greater than
where(gt(users.age, 18))

// Like (pattern matching)
where(like(users.email, "%@gmail.com"))

// Multiple conditions (AND)
where(and(
  eq(users.status, "active"),
  gt(users.createdAt, new Date("2025-01-01"))
))

// Multiple conditions (OR)
where(or(
  eq(users.role, "admin"),
  eq(users.role, "moderator")
))

// IN array
where(inArray(users.id, [1, 2, 3]))

// NULL checks
where(isNull(users.deletedAt))
where(isNotNull(users.phone))
```

---

## Relations

**Définir relations** (optionnel, pour `.query` syntax) :

```typescript
import { relations } from "drizzle-orm";

export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(subscriptions)
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id]
  })
}));
```

**Usage** :
```typescript
// Fetch user avec subscriptions
const user = await db.query.users.findFirst({
  where: eq(users.id, 1),
  with: {
    subscriptions: true
  }
});

console.log(user.subscriptions); // Array des subscriptions
```

---

## Debug queries

### Log SQL queries

```typescript
import { drizzle } from "drizzle-orm/neon-serverless";

export const db = drizzle(sql, {
  logger: true // ← Active logs SQL
});
```

**Output console** :
```sql
SELECT * FROM users WHERE email = 'test@test.com'
```

---

### Dry-run query

```typescript
const query = db.select().from(users).where(eq(users.id, 1));

// Voir le SQL sans l'exécuter
console.log(query.toSQL());
```

---

## Transactions

```typescript
await db.transaction(async (tx) => {
  const user = await tx.insert(users).values({
    email: "john@example.com",
    name: "John",
    password: "hashed"
  }).returning();

  await tx.insert(subscriptions).values({
    userId: user[0].id,
    stripeSubscriptionId: "sub_abc123",
    stripePriceId: "price_abc123",
    status: "active"
  });

  // Si erreur → rollback automatique
});
```

---

## Neon-specific features

### Branching

Neon supporte les branches (comme Git pour la DB)

**Créer branch** :
```bash
# Via Neon Dashboard
# Create branch from main → "dev"
```

**Connection string** :
```bash
# Main branch
DATABASE_URL="postgresql://...@ep-main.neon.tech/..."

# Dev branch
DATABASE_URL="postgresql://...@ep-dev.neon.tech/..."
```

---

### Auto-scaling

Neon scale automatiquement :
- **Idle** : 0 compute (gratuit)
- **Active** : Scale up automatiquement
- **Quiet** : Scale down après 5 min

---

## 🔄 Voir aussi

- [setup-guide.md](../02-development/setup-guide.md#étape-2--configuration-de-la-base-de-données) - Setup DB initial
- [common-tasks.md](../02-development/common-tasks.md#modifier-le-schéma-database) - Modifier schema
- [troubleshooting.md](../02-development/troubleshooting.md#database) - Problèmes DB courants

**Docs officielles** :
- Drizzle ORM : https://orm.drizzle.team
- Neon : https://neon.tech/docs

---

*Dernière mise à jour : 2025-12-15*
