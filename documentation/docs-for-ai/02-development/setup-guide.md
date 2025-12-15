# 🚀 Guide d'installation complet

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **setup-guide.md**

---

## Vue d'ensemble

Ce guide couvre l'installation complète du projet Arclen depuis zéro jusqu'à avoir un serveur dev fonctionnel avec database, auth, et Stripe.

**Temps estimé** : 10-15 minutes

---

## ✅ Prérequis

Avant de commencer, installe ces outils :

| Outil | Version minimale | Installation |
|-------|------------------|--------------|
| Node.js | 18.x ou supérieur | https://nodejs.org |
| pnpm | 8.x ou supérieur | `npm install -g pnpm` |
| Stripe CLI | Latest | https://stripe.com/docs/stripe-cli |
| PostgreSQL | 14+ (ou compte Neon) | https://neon.tech |

**Vérifications** :
```bash
node --version   # v18.x ou supérieur
pnpm --version   # 8.x ou supérieur
stripe --version # stripe version ...
```

---

## 📦 Étape 1 : Clonage & Installation

### 1.1 Clone le repository

```bash
cd c:\Users\AdrianTurion\devprojects\arclen\website
```

Tu devrais voir :
```
website/
└── arclen-app/  # Le projet
```

### 1.2 Installe les dépendances

```bash
cd arclen-app
pnpm install
```

**Durée** : ~2 minutes

**Packages installés** :
- Next.js 16.1.0-canary.22
- React 19.1.0
- Tailwind CSS 4.1.7
- Motion 12.23.12
- Drizzle ORM
- Stripe
- bcryptjs, jsonwebtoken
- shadcn/ui components
- et ~50 autres dépendances

---

## 🗄️ Étape 2 : Configuration de la base de données

### 2.1 Crée un compte Neon (si pas déjà fait)

1. Va sur https://neon.tech
2. Sign up (gratuit)
3. Crée un nouveau projet : "arclen-dev"
4. Copie la **connection string** (commence par `postgresql://...`)

### 2.2 Configure les variables d'environnement

**Option A : Script automatique (recommandé)**

```bash
pnpm db:setup
```

Le script te demandera :
- Database URL (colle ta connection string Neon)
- JWT Secret (génère automatiquement si tu appuies sur Enter)
- Stripe keys (tu peux skip pour l'instant, on les ajoutera à l'étape 4)

**Option B : Manuel**

Copie `.env.example` → `.env` :
```bash
cp .env.example .env
```

Édite `.env` :
```bash
# Database
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Auth (génère avec: openssl rand -base64 32)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"

# Stripe (optionnel pour l'instant)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

### 2.3 Exécute les migrations

```bash
pnpm db:migrate
```

**Ce que ça fait** :
- Crée les tables dans ta database Neon
- Tables : `users`, `subscriptions`, `sessions`

**Output attendu** :
```
✅ Migrations applied successfully
```

---

### 2.4 Seed la database avec un utilisateur test

```bash
pnpm db:seed
```

**Ce que ça fait** :
- Crée un user : `test@test.com` / `admin123`
- Utile pour tester l'auth immédiatement

**Output attendu** :
```
✅ Seed user created: test@test.com
```

---

## 🔐 Étape 3 : Vérifie l'auth

### 3.1 Lance le dev server

```bash
pnpm dev
```

**Output attendu** :
```
▲ Next.js 16.1.0-canary.22
- Local:        http://localhost:3000
- Turbopack enabled

✓ Ready in 2.5s
```

### 3.2 Teste la connexion

1. Ouvre http://localhost:3000
2. Clique sur "Sign In" (coin supérieur droit)
3. Connecte-toi avec :
   - Email : `test@test.com`
   - Password : `admin123`
4. Tu devrais être redirigé vers `/dashboard`

**Si ça marche** : ✅ Auth configuré correctement !

**Si erreur** : Voir [troubleshooting.md](troubleshooting.md)

---

## 💳 Étape 4 : Configuration Stripe (optionnel)

### 4.1 Crée un compte Stripe

1. Va sur https://dashboard.stripe.com
2. Sign up (gratuit)
3. Active le **Test Mode** (toggle en haut à droite)

### 4.2 Récupère les clés API

**Publishable key** :
1. Dashboard → Developers → API keys
2. Copie "Publishable key" (commence par `pk_test_...`)

**Secret key** :
1. Même page
2. Copie "Secret key" (commence par `sk_test_...`)
3. **Ne JAMAIS commit cette clé !**

### 4.3 Ajoute les clés dans `.env`

```bash
STRIPE_SECRET_KEY="sk_test_abc123..."
STRIPE_PUBLISHABLE_KEY="pk_test_abc123..."
```

### 4.4 Crée les produits de test

**Option A : Via Dashboard Stripe**

1. Dashboard → Products → Add product
2. Crée 3 produits :
   - **Starter** : $9/mois
   - **Pro** : $29/mois
   - **Enterprise** : $99/mois
3. Copie les Price IDs (commence par `price_...`)

**Option B : Via CLI**

```bash
stripe products create --name="Starter Plan" --description="Basic features"
stripe prices create --product=prod_xxx --currency=usd --unit-amount=900 --recurring[interval]=month
```

### 4.5 Configure les webhooks locaux

**Terminal 1** : Dev server
```bash
pnpm dev
```

**Terminal 2** : Stripe CLI
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Output attendu** :
```
> Ready! Your webhook signing secret is whsec_abc123...
```

Copie le **webhook secret** (`whsec_...`) dans `.env` :
```bash
STRIPE_WEBHOOK_SECRET="whsec_abc123..."
```

**Redémarre le dev server** (Ctrl+C puis `pnpm dev`)

### 4.6 Teste un paiement

1. Va sur http://localhost:3000/pricing
2. Clique sur "Subscribe" (plan Pro par exemple)
3. Utilise une carte de test :
   - Numéro : `4242 4242 4242 4242`
   - Expiration : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres
4. Complète le checkout

**Terminal 2** (Stripe CLI) devrait afficher :
```
  customer.subscription.created    [200] POST http://localhost:3000/api/webhooks/stripe
```

**Si ça marche** : ✅ Stripe configuré correctement !

---

## 🎨 Étape 5 : Vérifie l'installation complète

### Checklist finale

- [ ] `pnpm dev` démarre sans erreur
- [ ] Homepage (/) s'affiche avec animations Aceternity
- [ ] Sign in avec test@test.com fonctionne
- [ ] Dashboard (/dashboard) accessible après login
- [ ] Mode clair/sombre fonctionne (toggle en navbar)
- [ ] Page pricing s'affiche
- [ ] (Optionnel) Checkout Stripe fonctionne

**Si tous les ✅** : Installation complète réussie ! 🎉

---

## 📂 Structure de `.env` finale

Ton fichier `.env` devrait ressembler à ça :

```bash
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/arclen?sslmode=require"

# Auth (JWT)
JWT_SECRET="super-secret-key-generated-with-openssl-rand-base64-32"

# Stripe (Test mode)
STRIPE_SECRET_KEY="sk_test_51xxxxx"
STRIPE_PUBLISHABLE_KEY="pk_test_51xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🛠️ Scripts package.json utiles

| Script | Commande | Usage |
|--------|----------|-------|
| Dev server | `pnpm dev` | Lance serveur dev (Turbopack) |
| Build | `pnpm build` | Build production |
| Start | `pnpm start` | Lance serveur production |
| DB setup | `pnpm db:setup` | Configure `.env` interactivement |
| DB migrate | `pnpm db:migrate` | Exécute migrations |
| DB push | `pnpm db:push` | Push schema sans migration |
| DB seed | `pnpm db:seed` | Seed utilisateur test |
| DB studio | `pnpm db:studio` | Interface graphique Drizzle |
| Lint | `pnpm lint` | ESLint check |

---

## 🔧 Drizzle Studio (bonus)

Pour explorer ta database visuellement :

```bash
pnpm db:studio
```

Ouvre http://localhost:4983

**Interface** :
- Voir toutes les tables
- Éditer les données
- Exécuter des queries SQL

**Utile pour** :
- Vérifier le seed user
- Debug auth issues
- Voir les subscriptions Stripe

---

## 🐛 Troubleshooting

### Problème : `DATABASE_URL` invalide

**Erreur** :
```
Error: Invalid connection string
```

**Solution** :
1. Vérifie que l'URL commence par `postgresql://`
2. Inclut `?sslmode=require` à la fin
3. Pas d'espaces dans l'URL

---

### Problème : Migrations échouent

**Erreur** :
```
Error: relation "users" already exists
```

**Solution** :
```bash
# Reset la database (ATTENTION : supprime toutes les données)
pnpm db:push --force
pnpm db:seed
```

---

### Problème : Stripe webhooks ne fonctionnent pas

**Erreur** :
```
Webhook signature verification failed
```

**Solution** :
1. Vérifie que `STRIPE_WEBHOOK_SECRET` est correct dans `.env`
2. Redémarre le dev server après avoir modifié `.env`
3. Vérifie que Stripe CLI tourne (`stripe listen ...`)

---

### Problème : Port 3000 déjà utilisé

**Erreur** :
```
Error: Port 3000 is already in use
```

**Solution** :
```bash
# Option A : Kill le processus sur port 3000
npx kill-port 3000

# Option B : Utilise un autre port
pnpm dev --port 3001
```

---

## 🔄 Voir aussi

- [common-tasks.md](common-tasks.md) - Tâches quotidiennes (ajouter page, migration DB)
- [troubleshooting.md](troubleshooting.md) - Problèmes courants + solutions
- [tech-stack.md](../01-architecture/tech-stack.md) - Détails techniques des outils installés
- [stripe.md](../04-quick-reference/stripe.md) - Référence Stripe complète

---

## 📝 Notes importantes

### En développement

- **Toujours** avoir deux terminaux :
  - Terminal 1 : `pnpm dev`
  - Terminal 2 : `stripe listen ...` (si tu travailles sur payments)

### En production

- **JAMAIS** commit `.env` dans git
- `.env` est dans `.gitignore` par défaut
- Utilise des variables d'environnement sur Vercel/Railway/etc.

---

*Dernière mise à jour : 2025-12-15*
