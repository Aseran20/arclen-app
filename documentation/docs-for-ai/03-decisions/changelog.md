# 📜 Changelog

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **changelog.md**

---

## Vue d'ensemble

Ce fichier contient l'historique chronologique de tous les changements significatifs du projet Arclen. Format : plus récent en haut.

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
