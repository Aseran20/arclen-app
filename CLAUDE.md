# 🤖 CLAUDE.md - Guide de contexte IA

> **Dernière mise à jour** : 2025-12-15
> **Pour** : IA (Claude, GPT, etc.) reprenant le projet après réinitialisation

---

## 🎯 Qu'est-ce que ce projet ?

**Arclen** est une plateforme SaaS combinant :
- **Marketing moderne** : Landing pages avec Aceternity UI Pro (animations, design premium)
- **Backend complet** : Auth JWT, Stripe payments, PostgreSQL, Dashboard
- **Stack moderne** : Next.js 16, React 19, Tailwind v4, Motion (Framer Motion)

**Public cible** : Développeurs voulant lancer un SaaS rapidement avec UI premium.

---

## ⚡ Démarrage rapide (< 2 minutes)

```bash
# 1. Installation
pnpm install

# 2. Setup DB + variables d'environnement
pnpm db:setup    # Crée .env avec prompts interactifs
pnpm db:migrate  # Crée les tables
pnpm db:seed     # Seed utilisateur test

# 3. Stripe (dans un terminal séparé)
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# 4. Dev server
pnpm dev
```

**Test** : Connecte-toi avec `test@test.com` / `admin123`

---

## 📚 Stack technique (versions actuelles)

| Techno | Version | Rôle |
|--------|---------|------|
| Next.js | 16.1.0-canary.22 | Framework (App Router, Cache Components) |
| React | 19.1.0 | UI library |
| Tailwind CSS | 4.1.7 | Styling (@import, @theme syntax) |
| Motion | 12.23.12 | Animations (Framer Motion fork) |
| PostgreSQL | via Neon | Database |
| Drizzle ORM | Latest | TypeScript ORM |
| Stripe | Latest | Payments + subscriptions |
| shadcn/ui | Latest | Dashboard components |
| Aceternity UI Pro | Latest | Marketing components |

---

## 📂 Structure du projet (high-level)

```
arclen-app/
├── app/
│   ├── (marketing)/     # Pages publiques (/, /pricing, /blog)
│   ├── (login)/         # Auth (sign-in, sign-up)
│   ├── (dashboard)/     # Protected dashboard
│   └── api/             # API routes + webhooks
├── components/
│   ├── marketing/       # Aceternity components
│   ├── dashboard/       # shadcn components
│   └── ui/              # shadcn primitives
├── lib/                 # Utils (DB, Stripe, auth)
├── documentation/
│   └── docs-for-ai/     # 👈 Documentation détaillée pour IA
└── CLAUDE.md            # 👈 Tu es ici
```

---

## 🗺️ Navigation : Où trouver l'info ?

### Tu débutes sur ce projet ?
→ **Lis d'abord** : [documentation/docs-for-ai/00-start-here.md](documentation/docs-for-ai/00-start-here.md)

### Besoin de comprendre l'architecture ?
→ **Section** : `documentation/docs-for-ai/01-architecture/`
- [tech-stack.md](documentation/docs-for-ai/01-architecture/tech-stack.md) - Détails sur chaque techno
- [folder-structure.md](documentation/docs-for-ai/01-architecture/folder-structure.md) - Organisation des dossiers
- [design-systems.md](documentation/docs-for-ai/01-architecture/design-systems.md) - Aceternity + shadcn coexistence

### Comment faire une tâche spécifique ?
→ **Section** : `documentation/docs-for-ai/02-development/`
- [setup-guide.md](documentation/docs-for-ai/02-development/setup-guide.md) - Installation complète
- [common-tasks.md](documentation/docs-for-ai/02-development/common-tasks.md) - Ajouter page, composant, migration DB
- [troubleshooting.md](documentation/docs-for-ai/02-development/troubleshooting.md) - Problèmes fréquents

### Pourquoi telle décision a été prise ?
→ **Section** : `documentation/docs-for-ai/03-decisions/`
- [changelog.md](documentation/docs-for-ai/03-decisions/changelog.md) - Historique chronologique
- [why-nextjs-16.md](documentation/docs-for-ai/03-decisions/why-nextjs-16.md) - Raison de l'upgrade
- [migration-aceternity.md](documentation/docs-for-ai/03-decisions/migration-aceternity.md) - Fusion des templates

### Référence rapide (Stripe, Auth, DB) ?
→ **Section** : `documentation/docs-for-ai/04-quick-reference/`
- [stripe.md](documentation/docs-for-ai/04-quick-reference/stripe.md) - Config + webhooks
- [auth.md](documentation/docs-for-ai/04-quick-reference/auth.md) - JWT + middleware
- [database.md](documentation/docs-for-ai/04-quick-reference/database.md) - Drizzle + migrations

---

## ⚠️ IMPORTANT : Quand mettre à jour cette documentation ?

**Tu DOIS mettre à jour les docs dans ces cas** :

### 📝 CLAUDE.md (ce fichier)
- ✅ Changement de version majeure (Next.js, React, etc.)
- ✅ Ajout d'une nouvelle section dans docs-for-ai/
- ✅ Changement dans les commandes de démarrage
- ✅ Nouvelle stack technique (ex: ajout de Prisma)

### 📁 documentation/docs-for-ai/
- ✅ **changelog.md** → À CHAQUE modification significative (nouvelle feature, refactoring majeur, upgrade)
- ✅ **tech-stack.md** → Changement de version ou ajout de dépendance
- ✅ **folder-structure.md** → Réorganisation des dossiers
- ✅ **common-tasks.md** → Nouvelle procédure ou changement de workflow
- ✅ **troubleshooting.md** → Nouveau problème rencontré + solution

### 🔄 Workflow de mise à jour
1. Fais ta modification dans le code
2. **Avant de finir**, demande-toi : "Est-ce que ça change la compréhension du projet ?"
3. Si oui → Mets à jour `changelog.md` + fichier(s) concerné(s)
4. Format d'entrée changelog :
   ```markdown
   ## YYYY-MM-DD - Titre court
   **Contexte** : Pourquoi
   **Changements** : Quoi
   **Fichiers** : [Liens vers fichiers modifiés]
   ```

---

## 🧠 Contexte actuel du projet

### État au 2025-12-15 :
- ✅ Next.js 16 upgrade (de 15.6.0-canary.59)
- ✅ Fusion arclen-web (Aceternity) + arclen-app (SaaS Starter)
- ✅ Dual design system configuré (shadcn + Aceternity)
- ✅ Database + Auth + Stripe fonctionnels
- ⏳ Tests E2E à faire (marketing pages, signup flow, dashboard)

### Prochaines étapes suggérées :
1. Tester toutes les pages marketing
2. Tester flow d'inscription + pricing
3. Tester dashboard et fonctionnalités

---

## 📞 Ressources externes

- **Next.js 16 docs** : https://nextjs.org/docs
- **Aceternity UI** : https://ui.aceternity.com
- **shadcn/ui** : https://ui.shadcn.com
- **Stripe docs** : https://stripe.com/docs
- **Drizzle ORM** : https://orm.drizzle.team

---

## 🎓 Principes de cette documentation

Cette doc suit le principe **DRY** (Don't Repeat Yourself) :
- Chaque information existe **une seule fois**
- Les autres fichiers font des **liens** vers la source unique
- Organisation **modulaire** : 1 sujet = 1 fichier (<300 lignes)
- Navigation claire avec **breadcrumbs** et "Voir aussi"

**Pourquoi ?** Contexte IA limité → Lecture rapide, navigation efficace, maintenance facile.

---

*Créé le 2025-12-15 | Par Adrian avec Claude Sonnet 4.5*
