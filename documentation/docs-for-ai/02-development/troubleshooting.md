# 🐛 Troubleshooting

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **troubleshooting.md**

---

## Vue d'ensemble

Ce guide recense les problèmes connus dans Arclen avec leurs solutions. Problèmes classés par catégorie.

---

## ⚡ Next.js 16 - Cache Components

### Erreur : "Route used data outside Suspense"

**Message complet** :
```
Error: Route "/": Uncached data or `connection()` was accessed outside of `<Suspense>`.
This delays the entire page from rendering, resulting in a slow user experience.
```

**Cause** : Component client qui fetch de la data (SWR, fetch) utilisé sans Suspense boundary.

**Solution** : Wrapper le composant dans `<Suspense>`

**Exemple** - UserButton dans Navbar :

```typescript
import { Suspense } from "react";
import { UserButton } from "@/components/dashboard/user-button";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav>
      <Suspense fallback={<Button>Sign In</Button>}>
        <UserButton />
      </Suspense>
    </nav>
  );
};
```

**Fichiers concernés** :
- [components/marketing/navbar.tsx](../../../components/marketing/navbar.tsx) (3 endroits)

---

### Erreur : "Math.random() in Client Component"

**Message complet** :
```
Error: Route "/" used `Math.random()` inside a Client Component without a Suspense boundary above it.
```

**Cause** : `Math.random()` appelé pendant SSR (Server-Side Rendering) dans un Client Component, créant des résultats non-déterministes.

**Solution** : Déplacer `Math.random()` dans `useState` + `useEffect`

**❌ Incorrect** :
```typescript
const MyComponent = () => {
  const randomValue = useMemo(() => Math.random(), []);

  return <div style={{ width: `${randomValue * 100}%` }} />;
};
```

**✅ Correct** :
```typescript
const MyComponent = () => {
  const [randomValue, setRandomValue] = useState(0);

  useEffect(() => {
    setRandomValue(Math.random());
  }, []);

  if (!randomValue) return null; // Évite render initial avec 0

  return <div style={{ width: `${randomValue * 100}%` }} />;
};
```

**Fichiers concernés** :
- [components/marketing/how-it-works/skeletons.tsx](../../../components/marketing/how-it-works/skeletons.tsx) (ConnectYourTooklsSkeleton)
- [components/marketing/agentic-intelligence/skeletons.tsx](../../../components/marketing/agentic-intelligence/skeletons.tsx) (LLMModelSelectorSkeleton, TextToWorkflowBuilderSkeleton)

---

### Erreur : "revalidate incompatible with cacheComponents"

**Message complet** :
```
Route segment config "revalidate" is not compatible with `nextConfig.cacheComponents`.
Please remove it.
```

**Cause** : Next.js 16 Cache Components ne supporte pas `revalidate` config dans route segments.

**Solution** : Supprimer `export const revalidate = ...`

**❌ Incorrect** :
```typescript
// app/(marketing)/pricing/page.tsx
export const revalidate = 3600; // ← Supprimer

export default function PricingPage() {
  // ...
}
```

**✅ Correct** :
```typescript
// app/(marketing)/pricing/page.tsx
export default function PricingPage() {
  // ...
}
```

**Alternative** : Utiliser `fetch()` avec option `next: { revalidate: 3600 }`

```typescript
const data = await fetch("https://api.example.com/data", {
  next: { revalidate: 3600 }
});
```

---

## 🖼️ Images

### Erreur : Image 400 Bad Request

**Message** :
```
GET /_next/image?url=%2Fdashboard%403x.png&w=1000&q=75 400 (Bad Request)
```

**Cause** : Dimensions de l'image ne correspondent pas aux props `width`/`height` du composant Image.

**Solution** : Vérifier les dimensions réelles et utiliser `unoptimized` si nécessaire

**Vérifier dimensions** :
```bash
# Windows PowerShell
Get-Item public/dashboard@3x.png | Select-Object Name,Length,@{Name="Dimensions";Expression={(New-Object -ComObject Wia.ImageFile -Property @{LoadFile=$_.FullName}).Width,'x',(New-Object -ComObject Wia.ImageFile -Property @{LoadFile=$_.FullName}).Height -join ''}}

# Linux/Mac
file public/dashboard@3x.png
```

**❌ Incorrect** :
```typescript
<Image
  src="/dashboard@3x.png"
  width={1000}  // ← Image réelle est 3312x1860
  height={1000}
/>
```

**✅ Correct** :
```typescript
<Image
  src="/dashboard@3x.png"
  width={3312}       // Dimensions réelles
  height={1860}
  unoptimized        // Bypass Next.js optimization
  priority
/>
```

**Fichier concerné** :
- [components/marketing/hero-image.tsx](../../../components/marketing/hero-image.tsx)

---

## 🔄 Performance & Re-renders

### Erreur : "Maximum update depth exceeded"

**Message complet** :
```
Maximum update depth exceeded. This can happen when a component calls setState inside useEffect,
but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
at Dot.useEffect.handleMouseMove (components/marketing/common/dots.tsx:24:7)
```

**Cause** : Événement `mousemove` déclenche `setState` à chaque pixel de mouvement (1000+ fois par seconde).

**Solution** : Throttle avec `requestAnimationFrame`

**❌ Incorrect** :
```typescript
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY }); // ← Trop rapide
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);
```

**✅ Correct** :
```typescript
useEffect(() => {
  let rafId: number;

  const handleMouseMove = (e: MouseEvent) => {
    if (rafId) {
      cancelAnimationFrame(rafId); // Cancel pending update
    }

    rafId = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY }); // ~60fps max
    });
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  };
}, []);
```

**Fichier concerné** :
- [components/marketing/common/dots.tsx](../../../components/marketing/common/dots.tsx)

---

## 🔐 Authentication

### Problème : "Invalid JWT token"

**Symptôme** : Déconnexion automatique ou erreur 401 sur `/api/user`

**Causes possibles** :

1. **JWT_SECRET changé** → Invalide tous les tokens existants

**Solution** :
```bash
# Clear cookies dans le navigateur (F12 > Application > Cookies > Delete "token")
# Ou logout puis re-login
```

2. **Token expiré** (après 7 jours)

**Solution** :
```bash
# Re-login
```

3. **JWT_SECRET pas dans .env**

**Solution** :
```bash
# Génère un secret
openssl rand -base64 32

# Ajoute dans .env
JWT_SECRET="ton-secret-généré"
```

---

### Problème : Middleware redirect loop

**Symptôme** : Redirect infini entre `/sign-in` et `/dashboard`

**Cause** : Middleware mal configuré, vérifie token invalide mais redirige vers route protégée

**Solution** : Vérifier la logique dans [middleware.ts](../../../middleware.ts)

```typescript
// middleware.ts

if (!token && pathname.startsWith("/dashboard")) {
  return NextResponse.redirect(new URL("/sign-in", request.url));
}

// ← Ajouter cette condition
if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
```

---

## 💳 Stripe

### Problème : Webhooks ne fonctionnent pas

**Symptôme** : `POST /api/webhooks/stripe` retourne 400

**Causes possibles** :

1. **STRIPE_WEBHOOK_SECRET incorrect**

**Solution** :
```bash
# Terminal 2 : Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copie le secret affiché : whsec_...
# Mets dans .env
STRIPE_WEBHOOK_SECRET="whsec_abc123..."

# Redémarre dev server
```

2. **Stripe CLI pas lancé**

**Solution** :
```bash
# Lance dans un terminal séparé
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

3. **Body déjà parsé avant webhook verification**

**Solution** : Vérifier dans `app/api/webhooks/stripe/route.ts` que le body est lu en raw :

```typescript
export async function POST(request: Request) {
  const body = await request.text(); // ← Pas .json() !
  const signature = request.headers.get("stripe-signature")!;

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  // Traitement event
}
```

---

### Problème : Test payments échouent

**Symptôme** : Erreur "Card declined"

**Solution** : Utiliser cartes de test Stripe

**Cartes valides** :
```
Success : 4242 4242 4242 4242
Decline : 4000 0000 0000 0002
```

**Tous les détails** : https://stripe.com/docs/testing

---

## 🗄️ Database

### Problème : "relation does not exist"

**Message** :
```
error: relation "users" does not exist
```

**Cause** : Migrations pas appliquées

**Solution** :
```bash
pnpm db:migrate
```

**Si ça échoue** :
```bash
# Reset complet (ATTENTION : supprime toutes les données)
pnpm db:push --force
pnpm db:seed
```

---

### Problème : Connection refused

**Message** :
```
Error: connect ECONNREFUSED
```

**Causes** :

1. **DATABASE_URL incorrect dans .env**

**Solution** : Vérifier format :
```bash
DATABASE_URL="postgresql://user:password@host:5432/db?sslmode=require"
```

2. **Neon database suspendu** (inactivité)

**Solution** :
- Ouvre Neon Dashboard
- Redémarre le compute
- Retry

---

## 📦 Dependencies

### Problème : "Module not found"

**Message** :
```
Module not found: Can't resolve 'motion/react'
```

**Solution** :
```bash
# Reinstalle les dépendances
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

### Problème : Type errors après upgrade

**Message** :
```
Type 'string' is not assignable to type 'never'
```

**Solution** :
```bash
# Rebuild TypeScript cache
rm -rf .next
pnpm dev
```

---

## 🛠️ Development

### Problème : Port 3000 déjà utilisé

**Message** :
```
Error: Port 3000 is already in use
```

**Solution** :
```bash
# Option A : Kill le processus
npx kill-port 3000

# Option B : Utilise un autre port
pnpm dev --port 3001
```

---

### Problème : Hot reload ne fonctionne pas

**Symptôme** : Changements de code pas reflétés dans le navigateur

**Solutions** :

1. **Hard refresh** : Ctrl + Shift + R

2. **Clear Next.js cache** :
```bash
rm -rf .next
pnpm dev
```

3. **Vérifier Turbopack** : Si problèmes persistants, désactive Turbopack temporairement :
```bash
pnpm dev --no-turbo
```

---

## 🔄 Voir aussi

- [setup-guide.md](setup-guide.md) - Installation initiale
- [common-tasks.md](common-tasks.md) - Tâches courantes
- [changelog.md](../03-decisions/changelog.md) - Historique des bugs fixés

---

*Dernière mise à jour : 2025-12-15*
