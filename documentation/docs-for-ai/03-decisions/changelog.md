# 📜 Changelog

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **changelog.md**

---

## Vue d'ensemble

Ce fichier contient l'historique chronologique de tous les changements significatifs du projet Arclen. Format : plus récent en haut.

---

## 2025-12-16 - Déploiement Vercel + Fix Next.js 16 prerendering

**Contexte** : Premier déploiement en production sur Vercel avec domaine custom `arclen.app`. Build échouait à cause de `cacheComponents` incompatible avec `next-themes`.

**Problème** :
- `cacheComponents: true` dans Next.js 16 active un prerendering strict
- `next-themes` (ThemeProvider) accède aux cookies pendant le prerender
- Erreur : "Uncached data was accessed outside of <Suspense>"

**Solution** :
1. Désactivé `cacheComponents` dans `next.config.ts` (feature expérimentale)
2. Restructuré dashboard layout : server component (layout.tsx) + client component (dashboard-shell.tsx)
3. Ajouté `connection()` aux pages dashboard pour forcer le rendu dynamique
4. Déplacé SWR prefetch du root layout vers le dashboard layout

**Changements** :
- `next.config.ts` : commenté `cacheComponents: true`
- `app/(dashboard)/layout.tsx` : server component avec `cookies()` + Suspense
- `components/dashboard/dashboard-shell.tsx` : nouveau client component (sidebar + shell)
- `components/dashboard/swr-provider.tsx` : nouveau provider SWR client
- `app/(dashboard)/dashboard/activity/page.tsx` : ajouté `connection()`
- `app/(dashboard)/subscription/page.tsx` : ajouté `connection()`
- `app/layout.tsx` : retiré SWR fallback (déplacé vers dashboard)

**Configuration Vercel** :
- Domaine : `arclen.app`
- Variables d'environnement : `POSTGRES_URL`, `AUTH_SECRET`, `BASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- Webhook Stripe : `https://arclen.app/api/stripe/webhook`

**Configuration Cloudflare DNS** :
- A record : `@` → `216.198.79.1` (DNS only)
- CNAME : `www` → `cname.vercel-dns.com` (DNS only)

**Impact** : Site déployé en production, build passe, pages statiques prerendues, pages dynamiques (dashboard) rendues à la demande.

**Fichiers créés** :
- [components/dashboard/dashboard-shell.tsx](../../../components/dashboard/dashboard-shell.tsx)
- [components/dashboard/swr-provider.tsx](../../../components/dashboard/swr-provider.tsx)

**Fichiers modifiés** :
- [next.config.ts](../../../next.config.ts)
- [app/layout.tsx](../../../app/layout.tsx)
- [app/(dashboard)/layout.tsx](../../../app/(dashboard)/layout.tsx)
- [app/(dashboard)/dashboard/activity/page.tsx](../../../app/(dashboard)/dashboard/activity/page.tsx)
- [app/(dashboard)/subscription/page.tsx](../../../app/(dashboard)/subscription/page.tsx)

---

## 2025-12-15 - Migration Dashboard Sidebar vers Aceternity

**Contexte** : Le dashboard utilisait le sidebar shadcn par défaut. Migration vers un sidebar Aceternity collapsible avec animations Motion pour cohérence avec le design marketing.

**Changements** :

**Nouveau sidebar Aceternity :**
- Créé `components/ui/collapsible-sidebar.tsx` - Sidebar avec animations Motion :
  - `Sidebar`, `SidebarBody`, `SidebarProvider`, `useSidebar`
  - `SidebarLink` avec animation de label
  - `DesktopSidebar` (collapsible 300px ↔ 70px) + `MobileSidebar` (drawer)
  - Bouton collapse (flèche) au hover

**Dashboard layout refactorisé :**
- Mis à jour `app/(dashboard)/layout.tsx` :
  - Utilise Aceternity sidebar au lieu de shadcn
  - Logo dynamique : logo complet quand open, favicon (`favicon-white/black-180x180.svg`) quand collapsed
  - Section labels (Account, Billing) qui disparaissent quand collapsed
  - Navigation avec `SidebarLink` et active state

**NavUser adapté :**
- Mis à jour `components/dashboard/nav-user.tsx` :
  - Import `useSidebar` depuis `collapsible-sidebar.tsx` (pas shadcn)
  - Affiche nom/email seulement quand sidebar open
  - Dropdown menu simplifié (sans SidebarMenu wrappers)

**Fichiers créés** :
- [components/ui/collapsible-sidebar.tsx](../../../components/ui/collapsible-sidebar.tsx)

**Fichiers modifiés** :
- [app/(dashboard)/layout.tsx](../../../app/(dashboard)/layout.tsx)
- [components/dashboard/nav-user.tsx](../../../components/dashboard/nav-user.tsx)

**Fichiers supprimés** :
- `app/(dashboard)/dashboard/layout.tsx` (layout legacy dupliqué)

**Impact** : Dashboard avec sidebar moderne animé, cohérent avec le design Aceternity du marketing.

---

## 2025-12-15 - Page FAQ dédiée

**Contexte** : Le lien FAQ dans le footer pointait vers `#`. Création d'une page dédiée réutilisant le composant FAQs existant.

**Changements** :
- Créé `app/(marketing)/faq/page.tsx` - Page FAQ avec composant `<FAQs />`
- Mis à jour `components/marketing/footer.tsx` - Lien FAQ: `#` → `/faq`

**Impact** : Page FAQ accessible via footer, contenu synchronisé avec la section FAQ de la landing page.

**Fichiers créés** :
- [app/(marketing)/faq/page.tsx](../../../app/(marketing)/faq/page.tsx)

**Fichiers modifiés** :
- [components/marketing/footer.tsx](../../../components/marketing/footer.tsx)

---

## 2025-12-15 - Documentation publique (/docs)

**Contexte** : Besoin d'une page documentation pour le lien "Documentation" dans le footer (pointait vers #).

**Changements** :

**Nouveau route group `(docs)` :**
- Créé `app/(docs)/layout.tsx` - Layout avec sidebar docs
- Créé `app/(docs)/docs/page.tsx` - Introduction (/docs)
- Créé `app/(docs)/docs/quick-start/page.tsx` - Guide de démarrage
- Créé `app/(docs)/docs/excel-bulk/page.tsx` - Doc Excel AI Bulk
- Créé `app/(docs)/docs/excel-audit/page.tsx` - Doc Excel AI Audit
- Créé `app/(docs)/docs/powerpoint-audit/page.tsx` - Doc PowerPoint AI Audit

**Composant sidebar :**
- Créé `components/docs/docs-sidebar.tsx` - Sidebar Aceternity-style avec:
  - Hover animation (motion layoutId)
  - Sections groupées (Getting Started, Products, Support)
  - Lien actif highlighted en primary
  - Mobile drawer responsive
  - Sticky positioning (reste fixe au scroll)
  - Lien "Back to website"

**Footer mis à jour :**
- Lien Documentation: `#` → `/docs`

**Impact** : Documentation intégrée au site, accessible via footer, cohérente avec le design Aceternity.

**Fichiers créés** :
- [components/docs/docs-sidebar.tsx](../../../components/docs/docs-sidebar.tsx)
- [app/(docs)/layout.tsx](../../../app/(docs)/layout.tsx)
- [app/(docs)/docs/page.tsx](../../../app/(docs)/docs/page.tsx)
- [app/(docs)/docs/quick-start/page.tsx](../../../app/(docs)/docs/quick-start/page.tsx)
- [app/(docs)/docs/excel-bulk/page.tsx](../../../app/(docs)/docs/excel-bulk/page.tsx)
- [app/(docs)/docs/excel-audit/page.tsx](../../../app/(docs)/docs/excel-audit/page.tsx)
- [app/(docs)/docs/powerpoint-audit/page.tsx](../../../app/(docs)/docs/powerpoint-audit/page.tsx)

**Fichiers modifiés** :
- [components/marketing/footer.tsx](../../../components/marketing/footer.tsx)

---

## 2025-12-15 - Dashboard Sidebar + Centralisation des couleurs

**Contexte** : Le dashboard utilisait l'ancien thème du boilerplate (orange hardcodé, header simple "ACME"). Besoin d'aligner avec la marque Arclen et d'ajouter une navigation sidebar moderne.

**Changements** :

**Nouveau Dashboard Layout avec Sidebar :**
- Créé `components/dashboard/app-sidebar.tsx` - Navigation sidebar collapsible avec:
  - Logo Arclen
  - Sections: Account (Team Settings, General, Security, Activity) + Billing (Subscription)
  - Back to Home link
  - Collapsible (se réduit en icônes sur Ctrl+B)
- Créé `components/dashboard/nav-user.tsx` - Menu utilisateur avec avatar, dropdown (Account, Settings, Log out)
- Mis à jour `app/(dashboard)/layout.tsx` - Utilise `SidebarProvider`, `AppSidebar`, `SidebarInset`

**Centralisation des couleurs :**
- Remplacé `bg-orange-500 hover:bg-orange-600 text-white` par `bg-primary text-primary-foreground hover:bg-primary/90`
- Remplacé `text-orange-*` par `text-primary`
- Remplacé `bg-orange-100` par `bg-primary/10`
- Remplacé `text-gray-500/600/900` par `text-muted-foreground` ou supprimé (utilise foreground par défaut)

**Pages refactorisées :**
- `app/(dashboard)/dashboard/page.tsx` - Team Settings
- `app/(dashboard)/dashboard/general/page.tsx` - Account info
- `app/(dashboard)/dashboard/security/page.tsx` - Password + Delete account
- `app/(dashboard)/dashboard/activity/page.tsx` - Activity log
- `app/(dashboard)/subscription/page.tsx` - Pricing cards

**Dépendances ajoutées :**
- shadcn sidebar component (`pnpm dlx shadcn@latest add sidebar`)

**Impact** : Dashboard unifié avec branding Arclen, navigation moderne, support dark mode natif via CSS variables.

**Fichiers créés** :
- [components/dashboard/app-sidebar.tsx](../../../components/dashboard/app-sidebar.tsx)
- [components/dashboard/nav-user.tsx](../../../components/dashboard/nav-user.tsx)

**Fichiers modifiés** :
- [app/(dashboard)/layout.tsx](../../../app/(dashboard)/layout.tsx)
- [app/(dashboard)/dashboard/page.tsx](../../../app/(dashboard)/dashboard/page.tsx)
- [app/(dashboard)/dashboard/general/page.tsx](../../../app/(dashboard)/dashboard/general/page.tsx)
- [app/(dashboard)/dashboard/security/page.tsx](../../../app/(dashboard)/dashboard/security/page.tsx)
- [app/(dashboard)/dashboard/activity/page.tsx](../../../app/(dashboard)/dashboard/activity/page.tsx)
- [app/(dashboard)/subscription/page.tsx](../../../app/(dashboard)/subscription/page.tsx)

---

## 2025-12-15 - Pages Marketing (Legal, Contact, Footer, Navbar)

**Contexte** : Création des pages simples du site marketing.

**Changements** :

**Pages légales créées :**
- `app/(marketing)/privacy/page.tsx` - Politique de confidentialité (RGPD)
- `app/(marketing)/terms/page.tsx` - Conditions d'utilisation
- `app/(marketing)/legal/page.tsx` - Mentions légales (SIREN, SIRET, TVA, RCS)

**Page contact avec carte :**
- Créé `components/marketing/contact-form-grid.tsx` - Formulaire contact avec carte mondiale 3D (Aceternity Pro)
- Pin animé positionné sur Genève (`top-2 left-1/3`)
- Copié `world.svg` dans `/public`

**Footer mis à jour :**
- Tagline: "AI copilots for Excel & PowerPoint, built for M&A and finance teams"
- Sections: Product, Company, Resources, Legal
- Liens légaux: /privacy, /terms, /legal
- Social: LinkedIn uniquement

**Navbar mega menu :**
- Refactorisé avec 3 composants: `FloatingNav`, `DesktopNav`, `MobileNav`
- Products dropdown avec 3 produits: Excel - AI Bulk, Excel - AI Audit, PowerPoint - AI Audit
- Liens: Who it's for, Security, Pricing
- FloatingNav avec animation scroll (`useScroll`, `useSpring`, `useTransform`)

**Dépendances ajoutées :**
- `@tabler/icons-react`

**Impact** : Site marketing complet avec pages légales, contact, navigation moderne.

**Fichiers créés** :
- [app/(marketing)/privacy/page.tsx](../../../app/(marketing)/privacy/page.tsx)
- [app/(marketing)/terms/page.tsx](../../../app/(marketing)/terms/page.tsx)
- [app/(marketing)/legal/page.tsx](../../../app/(marketing)/legal/page.tsx)
- [components/marketing/contact-form-grid.tsx](../../../components/marketing/contact-form-grid.tsx)
- [public/world.svg](../../../public/world.svg)

**Fichiers modifiés** :
- [components/marketing/footer.tsx](../../../components/marketing/footer.tsx)
- [components/marketing/navbar.tsx](../../../components/marketing/navbar.tsx)
- [app/(marketing)/contact/page.tsx](../../../app/(marketing)/contact/page.tsx)

---

## 2025-12-15 - Fix TypeScript Pricing types

**Contexte** : Erreur TypeScript dans pricing component - types incompatibles avec retour Stripe API.

**Changements** :
- Mis à jour type `Price` dans `components/marketing/pricing.tsx`:
  - `unitAmount: number | null` (était `number`)
  - `interval: string | undefined` (était `string`)
  - Ajouté `currency`, `trialPeriodDays`
- Mis à jour type `Product`:
  - `description: string | null` (était `string | undefined`)
  - Ajouté `defaultPriceId`
- Ajouté null-checks: `monthlyPrice?.unitAmount ? ... : 0`

**Impact** : Build TypeScript passe sans erreur.

**Fichiers modifiés** :
- [components/marketing/pricing.tsx](../../../components/marketing/pricing.tsx)

---

## 2025-12-15 - Création du système de documentation AI-friendly

**Contexte** : Besoin d'une documentation structurée pour reprendre le projet après réinitialisation de contexte IA.

**Changements** :
- Création de CLAUDE.md (point d'entrée doc IA)
- Création de documentation/docs-for-ai/ (structure modulaire)
- 14 fichiers de documentation créés :
  - 00-start-here.md (hub navigation)
  - 01-architecture/ (tech-stack, folder-structure, design-systems)
  - 02-development/ (setup-guide, common-tasks, troubleshooting)
  - 03-decisions/ (changelog, why-nextjs-16, migration-aceternity)
  - 04-quick-reference/ (stripe, auth, database)

**Impact** : Une IA fraîche peut comprendre le projet en <5 minutes de lecture.

**Fichiers créés** :
- [CLAUDE.md](../../../CLAUDE.md)
- [documentation/docs-for-ai/00-start-here.md](../00-start-here.md)
- [documentation/docs-for-ai/01-architecture/tech-stack.md](../01-architecture/tech-stack.md)
- [documentation/docs-for-ai/01-architecture/folder-structure.md](../01-architecture/folder-structure.md)
- [documentation/docs-for-ai/01-architecture/design-systems.md](../01-architecture/design-systems.md)
- [documentation/docs-for-ai/02-development/setup-guide.md](../02-development/setup-guide.md)
- [documentation/docs-for-ai/02-development/common-tasks.md](../02-development/common-tasks.md)
- [documentation/docs-for-ai/02-development/troubleshooting.md](../02-development/troubleshooting.md)
- [documentation/docs-for-ai/03-decisions/why-nextjs-16.md](why-nextjs-16.md)
- [documentation/docs-for-ai/03-decisions/migration-aceternity.md](migration-aceternity.md)
- [documentation/docs-for-ai/04-quick-reference/stripe.md](../04-quick-reference/stripe.md)
- [documentation/docs-for-ai/04-quick-reference/auth.md](../04-quick-reference/auth.md)
- [documentation/docs-for-ai/04-quick-reference/database.md](../04-quick-reference/database.md)

---

## 2025-12-15 - Suppression d'arclen-web après fusion réussie

**Contexte** : Projet arclen-web (template Aceternity) complètement fusionné dans arclen-app, plus nécessaire.

**Changements** :
- Suppression du dossier arclen-web/ complet
- Tous les composants et configurations Aceternity migrés vers arclen-app

**Impact** : Projet unifié, maintenance simplifiée.

**Fichiers supprimés** :
- arclen-web/ (dossier complet)

---

## 2025-12-15 - Fix performance Dot component (infinite re-renders)

**Contexte** : Composant Dot grid causait "Maximum update depth exceeded" avec événements mousemove.

**Changements** :
- Ajout de `requestAnimationFrame` throttling dans le handler mousemove
- Limite les updates à ~60fps au lieu de 1000+ par seconde

**Impact** : Performance améliorée, plus de crash navigateur sur hover du Dot grid.

**Fichiers modifiés** :
- [components/marketing/common/dots.tsx](../../../components/marketing/common/dots.tsx)

**Code** :
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

## 2025-12-15 - Fix image hero (dashboard screenshot)

**Contexte** : Image dashboard sous le hero retournait 400 Bad Request malgré fonctionnement dans arclen-web.

**Problème initial** : Dimensions incorrectes (1000x1000 vs 3312x1860 réel).

**Tentatives** :
1. Ajout de 1000 dans `imageSizes` → Échec
2. Suppression custom image config → Échec (toujours 400 avec w=3840)
3. Fix dimensions + ajout `unoptimized` flag → Succès ✅

**Changements** :
- Mise à jour width={3312} height={1860} (dimensions réelles)
- Ajout de l'attribut `unoptimized` pour bypass Next.js image optimization

**Impact** : Image dashboard s'affiche correctement.

**Fichiers modifiés** :
- [components/marketing/hero-image.tsx](../../../components/marketing/hero-image.tsx)
- [next.config.ts](../../../next.config.ts) (suppression custom image config)

---

## 2025-12-15 - Fix Math.random() SSR errors dans skeletons

**Contexte** : Next.js 16 Cache Components causait prerender warnings avec Math.random() appelé côté serveur.

**Changements** :
- Conversion de `useMemo(() => Math.random())` en pattern `useState` + `useEffect`
- Ajout de guards `if (!mounted) return null`

**Impact** : Plus d'erreurs SSR, skeletons s'affichent correctement.

**Fichiers modifiés** :
- [components/marketing/how-it-works/skeletons.tsx](../../../components/marketing/how-it-works/skeletons.tsx) (ConnectYourTooklsSkeleton)
- [components/marketing/agentic-intelligence/skeletons.tsx](../../../components/marketing/agentic-intelligence/skeletons.tsx) (LLMModelSelectorSkeleton, TextToWorkflowBuilderSkeleton)

**Pattern appliqué** :
```typescript
const [randomValues, setRandomValues] = useState<number[]>([]);

useEffect(() => {
  setRandomValues(Array.from({ length: 8 }).map(() => Math.random()));
}, []);

if (!randomValues.length) return null;
```

---

## 2025-12-15 - Suppression revalidate config incompatible

**Contexte** : Next.js 16 Cache Components incompatible avec `revalidate` dans route segments.

**Changements** :
- Suppression de `export const revalidate = 3600` dans pricing page

**Impact** : Page pricing fonctionne sans erreur avec Cache Components.

**Fichiers modifiés** :
- [app/(marketing)/pricing/page.tsx](../../../app/(marketing)/pricing/page.tsx)

---

## 2025-12-15 - Ajout Suspense boundaries pour UserButton

**Contexte** : Next.js 16 Cache Components exige Suspense pour composants fetching data côté client.

**Changements** :
- Ajout de `<Suspense>` boundaries autour de UserButton dans navbar (3 locations)
- Fallback : Bouton "Start building" pendant loading

**Impact** : Routes ne bloquent plus sur data fetching UserButton.

**Fichiers modifiés** :
- [components/marketing/navbar.tsx](../../../components/marketing/navbar.tsx) :
  - DesktopNav (lignes 152-161)
  - FloatingNav (lignes 191-200)
  - MobileNav (lignes 122-130)

**Code appliqué** :
```typescript
<Suspense fallback={<Button as={Link} href="/sign-up">Start building</Button>}>
  <UserButton />
</Suspense>
```

---

## 2025-12-15 - Migration Next.js config pour Cache Components

**Contexte** : Next.js 16 a déplacé `experimental.ppr` vers `cacheComponents` (stable feature).

**Changements** :
- Déplacement de `cacheComponents: true` hors de `experimental`
- Suppression de `clientSegmentCache` (déprécié)
- Conservation de `experimental.mdxRs` uniquement

**Impact** : Configuration Next.js 16 compatible.

**Fichiers modifiés** :
- [next.config.ts](../../../next.config.ts)

**Avant** :
```typescript
experimental: {
  ppr: true,
  clientSegmentCache: true,
  mdxRs: true
}
```

**Après** :
```typescript
cacheComponents: true,
experimental: {
  mdxRs: true
}
```

---

## 2025-12-15 - Upgrade Next.js 15 → 16

**Contexte** : Version 15.6.0-canary.59 obsolète, nouvelle version 16.1.0-canary.22 disponible.

**Changements** :
- Mise à jour de `next` : `15.6.0-canary.59` → `16.1.0-canary.22`
- Toutes les dépendances React restées à 19.1.0 (compatible)

**Impact** : Accès aux nouvelles features Next.js 16 (Cache Components stable, App Router amélioré).

**Breaking changes** : Voir [why-nextjs-16.md](why-nextjs-16.md) pour détails.

**Fichiers modifiés** :
- [package.json](../../../package.json)

---

## 2025-12-15 - Vérification compliance Aceternity UI

**Contexte** : Vérifier que le projet suit 100% le guide d'installation Aceternity.

**Vérifications effectuées** :
- ✅ Tailwind CSS v4 configuré (app/globals.css avec @import et @theme)
- ✅ Motion 12.23.12 installé
- ✅ cn() utility présent dans lib/utils.ts
- ✅ CSS variables design tokens présentes

**Résultat** : 100% compliance avec guide Aceternity.

**Fichiers vérifiés** :
- [package.json](../../../package.json)
- [app/globals.css](../../../app/globals.css)
- [lib/utils.ts](../../../lib/utils.ts)

---

## 2025-12-15 - Ajout Aceternity registry dans components.json

**Contexte** : Faciliter installation de composants Aceternity via shadcn CLI.

**Changements** :
- Ajout de `registries` section dans components.json
- Mapping `@aceternity` → `https://ui.aceternity.com/registry/{name}.json`

**Impact** : Permet d'installer composants Aceternity avec :
```bash
pnpm dlx shadcn@latest add @aceternity/hero-section
```

**Fichiers modifiés** :
- [components.json](../../../components.json)

---

## 2025-12-XX - Fusion arclen-web + arclen-app (sessions précédentes)

**Contexte** : Besoin de combiner :
- arclen-web : Template Aceternity UI Pro (design premium marketing)
- arclen-app : Next.js SaaS Starter (backend complet avec auth, Stripe, DB)

**Stratégie** :
- Garder arclen-app comme base (backend, structure, config)
- Migrer composants marketing Aceternity dans `components/marketing/`
- Dual design system : Aceternity (marketing) + shadcn (dashboard)
- Route groups pour séparation : `(marketing)`, `(dashboard)`

**Résultat** : Projet unifié avec UI premium + backend fonctionnel.

**Pour détails** : Voir [migration-aceternity.md](migration-aceternity.md)

---

## Template pour futures entrées

```markdown
## YYYY-MM-DD - Titre court du changement

**Contexte** : Pourquoi ce changement était nécessaire

**Changements** :
- Liste des modifications effectuées
- Bullet points pour clarté

**Impact** : Conséquence pour le projet / les développeurs

**Fichiers modifiés** :
- [chemin/vers/fichier1.ts](chemin/vers/fichier1.ts)
- [chemin/vers/fichier2.tsx](chemin/vers/fichier2.tsx)

**Code** (si pertinent) :
\```typescript
// Exemple de code ajouté/modifié
\```
```

---

## 🔄 Voir aussi

- [why-nextjs-16.md](why-nextjs-16.md) - Détails sur l'upgrade Next.js 16
- [migration-aceternity.md](migration-aceternity.md) - Histoire de la fusion des templates
- [troubleshooting.md](../02-development/troubleshooting.md) - Problèmes résolus documentés

---

*Créé le 2025-12-15 | Mise à jour automatique à chaque changement significatif*
