# 🎨 Dual Design System

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **design-systems.md**

---

## Vue d'ensemble

Arclen utilise **deux design systems distincts** qui coexistent sans conflit :

| Design System | Utilisation | Composants | Style |
|---------------|-------------|------------|-------|
| **Aceternity UI Pro** | Marketing pages | `components/marketing/` | Animations premium, design moderne |
| **shadcn/ui** | Dashboard | `components/dashboard/` + `components/ui/` | Minimaliste, fonctionnel |

**Pourquoi deux design systems ?**
- Marketing = Besoin de "wow effect" (animations, design premium) → Aceternity
- Dashboard = Besoin de productivité (rapidité, clarté) → shadcn

---

## 🌐 Aceternity UI Pro (Marketing)

### Utilisation

**Où** : Route group `(marketing)`
- `/` - Homepage
- `/pricing` - Pricing
- `/blog` - Blog
- `/about` - À propos

**Composants** : `components/marketing/`

### Caractéristiques

**Design** :
- Animations avancées (Motion/Framer Motion)
- Glassmorphism, gradients
- Dark mode natif
- Design "startup moderne"

**Dépendances** :
- Motion 12.23.12 (Framer Motion fork)
- Tailwind CSS v4
- Custom CSS variables

### CSS Variables Aceternity

Définies dans [app/globals.css](../../../app/globals.css) :

```css
@theme {
  /* Brand colors (Aceternity) */
  --color-brand-50: #f0f9ff;
  --color-brand-100: #e0f2fe;
  --color-brand-500: #0ea5e9;
  --color-brand-600: #0284c7;

  /* Custom tokens */
  --color-grid: rgba(255, 255, 255, 0.05);
  --color-glow: rgba(14, 165, 233, 0.3);
}
```

**Usage** :
```typescript
<div className="bg-brand-500 text-brand-50">
  Aceternity styled element
</div>
```

### Composants clés

#### Navbar (FloatingNav)
[components/marketing/navbar.tsx](../../../components/marketing/navbar.tsx)

**Features** :
- Scroll-based visibility (disparait en scroll down, apparait en scroll up)
- Glassmorphism background
- Mobile responsive (MobileNav avec drawer)
- Mode toggle (clair/sombre)

**Composants** :
- `DesktopNav` - Desktop navbar fixe en haut
- `FloatingNav` - Floating navbar qui apparait/disparait
- `MobileNav` - Drawer mobile

**Important** : UserButton DOIT être wrappé dans Suspense (Next.js 16)

```typescript
<Suspense fallback={<Button>Start building</Button>}>
  <UserButton />
</Suspense>
```

---

#### Hero Section
[components/marketing/hero-section.tsx](../../../components/marketing/hero-section.tsx)

**Features** :
- Animations Motion (fade in, slide up)
- Gradients animés
- CTA buttons avec hover effects

---

#### Hero Image
[components/marketing/hero-image.tsx](../../../components/hero-image.tsx)

**Particularités** :
- Image dashboard screenshot (3312x1860px)
- `unoptimized` flag (bypass Next.js optimization)
- Perspective 3D avec transform

```typescript
<Image
  src="/dashboard@3x.png"
  alt="Dashboard"
  width={3312}
  height={1860}
  unoptimized
  priority
/>
```

**Pourquoi unoptimized ?** Image trop grande pour Next.js image optimization par défaut.

---

#### Skeletons interactifs
[components/marketing/how-it-works/skeletons.tsx](../../../components/marketing/how-it-works/skeletons.tsx)

**Features** :
- Animations complexes (sparkles, typing effects)
- useState/useEffect pour Math.random() (évite SSR errors)

**Pattern important** :
```typescript
const [randomValues, setRandomValues] = useState<number[]>([]);

useEffect(() => {
  setRandomValues(Array.from({ length: 8 }).map(() => Math.random()));
}, []);

if (!randomValues.length) return null;
```

---

#### Dots Grid
[components/marketing/common/dots.tsx](../../../components/marketing/common/dots.tsx)

**Features** :
- Grid de points interactifs
- Réagit au hover de souris (distance-based glow)
- Performance : `requestAnimationFrame` throttling

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

### Installation Aceternity

**Doc complète** : [documentation/aceternity-installation/aceternity-installation.md](../../aceternity-installation/aceternity-installation.md)

**Résumé** :
1. Tailwind CSS v4 configuré
2. Motion 12.23.12 installé
3. `cn()` utility dans `lib/utils.ts`
4. Registry ajouté dans `components.json`

**CLI** :
```bash
pnpm dlx shadcn@latest add @aceternity/hero-section
```

---

## 🏠 shadcn/ui (Dashboard)

### Utilisation

**Où** : Route group `(dashboard)`
- `/dashboard` - Dashboard principal
- `/settings` - Paramètres

**Composants** :
- `components/dashboard/` - Custom dashboard components
- `components/ui/` - shadcn primitives

### Caractéristiques

**Design** :
- Minimaliste, fonctionnel
- Accessible (ARIA, keyboard navigation)
- Customizable via CSS variables
- Style "new-york" (variant shadcn)

**Dépendances** :
- Radix UI primitives
- Tailwind CSS v4
- Lucide React (icons)

### CSS Variables shadcn

Définies dans [app/globals.css](../../../app/globals.css) :

```css
@theme {
  /* Light mode */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --muted: 240 4.8% 95.9%;
  --border: 240 5.9% 90%;

  /* Dark mode (via [data-theme="dark"]) */
  [data-theme="dark"] {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... */
  }
}
```

**Usage** :
```typescript
<div className="bg-background text-foreground border-border">
  shadcn styled element
</div>
```

### Composants primitives (components/ui/)

**Installés via CLI** :
```bash
pnpm dlx shadcn@latest add button card dropdown-menu input label
```

**Liste complète** :
- `button.tsx` - Boutons (variants: default, destructive, outline, ghost)
- `card.tsx` - Cards (header, content, footer)
- `dropdown-menu.tsx` - Menus dropdown (Radix)
- `input.tsx` - Champs input
- `label.tsx` - Labels formulaires
- `avatar.tsx` - Avatars utilisateurs
- `separator.tsx` - Séparateurs
- etc.

**Pattern** :
```typescript
import { Button } from "@/components/ui/button";

<Button variant="default">Click me</Button>
<Button variant="outline">Cancel</Button>
```

---

### Composants custom (components/dashboard/)

#### Collapsible Sidebar (Aceternity)
[components/ui/collapsible-sidebar.tsx](../../../components/ui/collapsible-sidebar.tsx)

Le dashboard utilise un **sidebar Aceternity** avec animations Motion (pas shadcn).

**Exports** :
- `Sidebar`, `SidebarBody` - Container principal
- `SidebarProvider`, `useSidebar` - Context pour état open/closed
- `SidebarLink` - Lien avec animation de label
- `DesktopSidebar`, `MobileSidebar` - Versions responsive

**Features** :
- Animation width (300px ↔ 70px) avec Motion
- Bouton collapse (flèche) apparaît au hover
- Labels animés (opacity fade)
- Mobile : drawer plein écran

---

#### Dashboard Layout
[app/(dashboard)/layout.tsx](../../../app/(dashboard)/layout.tsx)

**Features** :
- Logo dynamique : logo complet quand open, favicon quand collapsed
- Navigation groupée (Account, Billing, Other)
- Section labels qui disparaissent quand collapsed
- NavUser en footer de sidebar

**Structure** :
```typescript
function DashboardSidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Logo open={open} />  {/* Logo complet ou favicon selon état */}

          <div className="mt-8 flex flex-col gap-1">
            <SidebarLabel open={open}>Account</SidebarLabel>
            {accountLinks.map((link) => (
              <SidebarLink link={link} active={pathname === link.href} />
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-1">
            <SidebarLabel open={open}>Billing</SidebarLabel>
            {billingLinks.map((link) => (
              <SidebarLink link={link} active={pathname === link.href} />
            ))}
          </div>
        </div>

        <NavUser />
      </SidebarBody>
    </Sidebar>
  );
}
```

**Logo dynamique** :
```typescript
function Logo({ open }: { open: boolean }) {
  return (
    <Link href="/">
      {open ? (
        <Image src="/logo-white.svg" ... />  {/* Logo complet */}
      ) : (
        <Image src="/favicon-white-180x180.svg" ... />  {/* Favicon seulement */}
      )}
    </Link>
  );
}
```

---

#### NavUser
[components/dashboard/nav-user.tsx](../../../components/dashboard/nav-user.tsx)

**Features** :
- Avatar utilisateur avec initiales
- Dropdown menu (Account, Settings, Logout)
- SWR data fetching
- Adapte affichage selon état sidebar (open/closed)

**Pattern** :
```typescript
import useSWR from "swr";
import { useSidebar } from "@/components/ui/collapsible-sidebar";

export function NavUser() {
  const { open } = useSidebar();
  const { data: user } = useSWR<User>("/api/user", fetcher);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 ...">
          <Avatar>
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
          {open && (
            <>
              <div className="grid flex-1 text-left">
                <span>{user.name}</span>
                <span className="text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="end">
        <DropdownMenuItem>Account</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

### Couleurs Dashboard (CSS Variables)

**Convention** : Utiliser les variables CSS shadcn, pas de couleurs hardcodées.

| Usage | Classe | Éviter |
|-------|--------|--------|
| Bouton primaire | `bg-primary text-primary-foreground` | `bg-orange-500 text-white` |
| Hover primaire | `hover:bg-primary/90` | `hover:bg-orange-600` |
| Fond accent léger | `bg-primary/10` | `bg-orange-100` |
| Texte principal | (rien, utilise foreground) | `text-gray-900` |
| Texte secondaire | `text-muted-foreground` | `text-gray-500` |
| Bouton destructif | `variant="destructive"` | `bg-red-600` |

---

## 🔄 Coexistence des deux design systems

### Séparation par route groups

**Aucun conflit** grâce à la séparation stricte :

```
app/
├── (marketing)/          → Utilise Aceternity
│   └── components/marketing/
├── (dashboard)/          → Utilise shadcn
│   └── components/dashboard/ + components/ui/
```

### CSS Variables scopées

Les deux systèmes utilisent des **namespaces différents** :

| Variable | Aceternity | shadcn |
|----------|------------|--------|
| Brand color | `--color-brand-500` | `--primary` |
| Background | `--color-background` | `--background` |
| Text | `--color-text` | `--foreground` |

**Aucun conflit** car noms différents.

### Shared utilities

**`lib/utils.ts`** est partagé :
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Utilisé par **les deux** design systems.

---

## 🎭 Mode clair/sombre

### Implementation

**Provider** : `next-themes`

**Toggle** : [components/marketing/mode-toggle.tsx](../../../components/marketing/mode-toggle.tsx)

**Utilisation** :
```typescript
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();

<Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  Toggle theme
</Button>
```

### CSS Variables par thème

**Light mode** (default) :
```css
@theme {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
}
```

**Dark mode** :
```css
[data-theme="dark"] {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
}
```

**Aceternity** gère automatiquement les deux modes via ses variables.

---

## 📏 Best practices

### Quand utiliser Aceternity ?

✅ Pages marketing (homepage, pricing, blog)
✅ Landing pages
✅ Sections nécessitant animations complexes
✅ "Wow effect" requis

### Quand utiliser shadcn ?

✅ Dashboard
✅ Formulaires
✅ Tables de données
✅ Admin panels
✅ Productivité > design

### Règles d'or

1. **Ne jamais mélanger** : Pas de composants Aceternity dans dashboard, et vice-versa
2. **CSS variables** : Respecter les namespaces (--color-brand vs --primary)
3. **Suspense** : Wrapper UserButton dans Suspense (Cache Components)
4. **Performance** : Utiliser requestAnimationFrame pour animations haute fréquence

---

## 🔄 Voir aussi

- [tech-stack.md](tech-stack.md) - Motion, Tailwind, détails techniques
- [folder-structure.md](folder-structure.md) - Organisation des composants
- [../aceternity-installation/](../../aceternity-installation/) - Guide installation Aceternity

---

*Dernière mise à jour : 2025-12-15*
