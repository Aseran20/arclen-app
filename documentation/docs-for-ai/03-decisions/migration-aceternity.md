# 🎨 Migration Aceternity - Fusion des templates

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **migration-aceternity.md**

---

## Décision

**Date** : 2025-12-XX (sessions précédentes)

**Objectif** : Fusionner deux templates complets en un seul projet

**Décideur** : Adrian + Claude Sonnet 4.5

---

## Contexte initial

Deux projets séparés :

### arclen-web (Template Aceternity UI Pro)
- **Design** : Premium, animations complexes
- **Composants** : Marketing pages (hero, pricing, features)
- **UI Library** : Aceternity UI Pro + Motion (Framer Motion)
- **Backend** : ❌ Aucun
- **Auth** : ❌ Non
- **Database** : ❌ Non
- **Payments** : ❌ Non

### arclen-app (Next.js SaaS Starter)
- **Design** : Minimaliste (shadcn UI)
- **Composants** : Dashboard, auth pages
- **UI Library** : shadcn/ui
- **Backend** : ✅ Complet (API routes, Drizzle ORM)
- **Auth** : ✅ JWT + bcryptjs
- **Database** : ✅ PostgreSQL (Neon)
- **Payments** : ✅ Stripe

---

## Problème

**Besoin** : SaaS avec marketing pages premium ET backend fonctionnel

**Dilemme** :
- Utiliser arclen-web → Manque tout le backend
- Utiliser arclen-app → Design marketing basique

**Solution** : Fusionner les deux en gardant le meilleur de chacun

---

## Stratégie de fusion

### Décision : arclen-app comme base

**Raisons** :
1. Backend déjà configuré (DB, auth, Stripe)
2. Structure Next.js App Router solide
3. Middleware auth fonctionnel
4. Plus facile d'ajouter UI que de créer un backend

**Plan** :
1. Garder arclen-app intact (structure, backend, config)
2. Migrer composants Aceternity dans `components/marketing/`
3. Créer route groups pour séparer design systems
4. Unifier Tailwind config (v4 pour les deux)

---

## Étapes de migration

### Étape 1 : Préparation

**Audit arclen-web** :
- Liste tous les composants marketing
- Identifie dépendances (Motion, CSS custom)
- Vérifie Tailwind config

**Audit arclen-app** :
- Vérifie compatibilité Next.js
- Liste composants dashboard existants

---

### Étape 2 : Migration des composants

**Créer structure** :
```bash
arclen-app/components/marketing/
├── navbar.tsx           # FloatingNav + DesktopNav + MobileNav
├── hero-section.tsx     # Hero avec animations
├── hero-image.tsx       # Dashboard screenshot
├── pricing/             # Section pricing
├── how-it-works/        # Features + skeletons
├── agentic-intelligence/# AI showcase
└── common/              # Dots, Grid, etc.
```

**Copier fichiers** :
- Copier `arclen-web/components/` → `arclen-app/components/marketing/`
- Adapter imports (`@/components/ui` → `@/components/marketing`)

---

### Étape 3 : Route groups

**Créer séparation** :
```bash
arclen-app/app/
├── (marketing)/    # Pages Aceternity
│   ├── layout.tsx  # Navbar + Footer
│   ├── page.tsx    # Homepage
│   └── pricing/
├── (dashboard)/    # Pages shadcn
│   ├── layout.tsx  # Sidebar
│   └── dashboard/
```

**Bénéfices** :
- Layouts différents sans affecter URLs
- Design systems séparés naturellement
- Maintenance facile

---

### Étape 4 : Tailwind CSS v4 unification

**Défi** : arclen-web utilisait peut-être Tailwind v3, arclen-app v4

**Solution** :
- Upgrade arclen-web vers v4 syntax
- Convertir `tailwind.config.js` → CSS `@theme`
- Fusionner CSS variables dans `app/globals.css`

**CSS final** :
```css
@import "tailwindcss";

@theme {
  /* shadcn variables */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;

  /* Aceternity variables */
  --color-brand-50: #f0f9ff;
  --color-brand-500: #0ea5e9;
  --color-grid: rgba(255, 255, 255, 0.05);
}
```

---

### Étape 5 : Dependencies merge

**package.json final** :
```json
{
  "dependencies": {
    "next": "16.1.0-canary.22",
    "react": "19.1.0",
    "motion": "12.23.12",        // Pour Aceternity
    "drizzle-orm": "...",        // Pour backend
    "stripe": "...",             // Pour payments
    "bcryptjs": "...",           // Pour auth
    "@radix-ui/...": "...",      // Pour shadcn
    "tailwindcss": "4.1.7"       // v4 pour les deux
  }
}
```

---

## Défis rencontrés

### 1. Dual design system

**Problème** : Conflits potentiels CSS variables (--primary vs --color-brand)

**Solution** :
- Namespaces différents (`--primary` shadcn, `--color-brand-*` Aceternity)
- Scoping par route groups
- Documentation claire ([design-systems.md](../01-architecture/design-systems.md))

---

### 2. Image optimization

**Problème** : Dashboard screenshot (3312x1860) causait 400 errors

**Tentatives** :
1. Custom `imageSizes` config → Échec
2. Suppression image config → Échec
3. Dimensions correctes + `unoptimized` → ✅ Succès

**Solution finale** :
```typescript
<Image
  src="/dashboard@3x.png"
  width={3312}
  height={1860}
  unoptimized
/>
```

---

### 3. Animations performance

**Problème** : Dot grid component causait infinite re-renders

**Solution** : `requestAnimationFrame` throttling

**Détails** : Voir [changelog.md](changelog.md#2025-12-15---fix-performance-dot-component-infinite-re-renders)

---

### 4. SSR avec Math.random()

**Problème** : Skeletons Aceternity utilisaient `Math.random()` en SSR

**Solution** : Pattern `useState` + `useEffect`

**Détails** : Voir [troubleshooting.md](../02-development/troubleshooting.md#erreur--mathrandom-in-client-component)

---

## Résultat final

### Structure projet fusionné

```
arclen-app/
├── app/
│   ├── (marketing)/      # ✅ Pages Aceternity (arclen-web)
│   ├── (dashboard)/      # ✅ Dashboard shadcn (arclen-app)
│   └── api/              # ✅ Backend (arclen-app)
├── components/
│   ├── marketing/        # ✅ Aceternity components
│   ├── dashboard/        # ✅ shadcn custom
│   └── ui/               # ✅ shadcn primitives
├── lib/                  # ✅ DB, Stripe, Auth
└── documentation/
    └── docs-for-ai/      # ✅ Documentation complète
```

---

### Features combinées

| Feature | Source | Status |
|---------|--------|--------|
| Hero premium | arclen-web | ✅ Migré |
| Pricing animations | arclen-web | ✅ Migré |
| Skeletons | arclen-web | ✅ Migré + fixes |
| Navbar floating | arclen-web | ✅ Migré + Suspense |
| Dashboard | arclen-app | ✅ Conservé |
| Auth JWT | arclen-app | ✅ Conservé |
| Stripe payments | arclen-app | ✅ Conservé |
| PostgreSQL | arclen-app | ✅ Conservé |

---

## Cleanup

**2025-12-15** : arclen-web supprimé après vérification complète

**Vérifications avant suppression** :
- ✅ Tous composants migrés
- ✅ Animations fonctionnelles
- ✅ Pas de config manquante
- ✅ Build réussit sans errors

**Commande** :
```bash
rm -rf arclen-web/
```

---

## Bénéfices

### Avant (2 projets)

**arclen-web** :
- Design premium ✅
- Backend ❌
- Maintenance 1 projet

**arclen-app** :
- Design basique
- Backend ✅
- Maintenance 1 projet

**Total maintenance** : 2 projets

---

### Après (1 projet fusionné)

**arclen-app unifié** :
- Design premium ✅ (marketing)
- Design fonctionnel ✅ (dashboard)
- Backend complet ✅
- Maintenance 1 projet

**Total maintenance** : 1 projet

**Gains** :
- -50% effort maintenance
- Features complètes (UI + backend)
- Stack cohérent
- Documentation unifiée

---

## Leçons apprises

### Ce qui a bien fonctionné ✅

1. **Route groups** : Séparation naturelle des design systems
2. **Namespace CSS** : Variables scopées évitent conflits
3. **Tailwind v4** : Syntaxe unifiée pour les deux systèmes
4. **Documentation** : Tracker changements dans changelog

### Ce qui était difficile ⚠️

1. **Image optimization** : Plusieurs tentatives nécessaires
2. **SSR errors** : Patterns React 19 à apprendre
3. **Performance** : requestAnimationFrame non évident
4. **Suspense boundaries** : Next.js 16 strict

### À refaire différemment 🔄

1. **Audit complet** avant migration (lister TOUS les composants)
2. **Tests E2E** après chaque phase (pas attendre la fin)
3. **Documentation en temps réel** (pas après coup)

---

## Recommandations futures

### Ajouter nouveau design system

Si besoin d'un 3ème design system (ex: admin panel) :

1. Créer route group `(admin)`
2. Namespace CSS `--admin-*`
3. Composants dans `components/admin/`
4. Layout séparé `app/(admin)/layout.tsx`

**Pattern scalable** ✅

---

### Garder séparation claire

**Règles** :
- ❌ Ne JAMAIS mélanger composants Aceternity dans dashboard
- ❌ Ne JAMAIS utiliser shadcn dans marketing
- ✅ Partager `lib/utils.ts` (cn function)
- ✅ Partager `lib/db`, `lib/auth`, `lib/stripe`

---

## 🔄 Voir aussi

- [design-systems.md](../01-architecture/design-systems.md) - Comment les deux coexistent
- [changelog.md](changelog.md) - Timeline détaillée de la migration
- [folder-structure.md](../01-architecture/folder-structure.md) - Organisation finale

---

*Migration effectuée sur plusieurs sessions | arclen-web supprimé le 2025-12-15*
