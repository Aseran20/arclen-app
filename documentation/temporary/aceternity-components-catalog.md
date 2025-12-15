# Aceternity UI Components Catalog

Ce document répertorie les **94 composants Aceternity** disponibles via le registry shadcn MCP. Utilisez-le pour brainstormer quels composants intégrer dans la landing page Arclen.

---

## Installation

```bash
# Syntaxe générale
pnpm dlx shadcn@latest add "@aceternity/nom-du-composant"

# Exemples
pnpm dlx shadcn@latest add "@aceternity/spotlight"
pnpm dlx shadcn@latest add "@aceternity/bento-grid"
pnpm dlx shadcn@latest add "@aceternity/animated-testimonials"
```

---

## Table des matières

1. [Backgrounds & Effects](#1-backgrounds--effects)
2. [Cards & Containers](#2-cards--containers)
3. [Text Effects](#3-text-effects)
4. [Navigation](#4-navigation)
5. [Scroll & Parallax](#5-scroll--parallax)
6. [Carousels & Sliders](#6-carousels--sliders)
7. [Modals & Overlays](#7-modals--overlays)
8. [Interactive Elements](#8-interactive-elements)
9. [Layout & Structure](#9-layout--structure)
10. [Forms & Inputs](#10-forms--inputs)
11. [Loaders & Feedback](#11-loaders--feedback)
12. [3D & Advanced](#12-3d--advanced)
13. [Recommandations pour Arclen](#recommandations-pour-arclen)

---

## 1. Backgrounds & Effects

### spotlight
**Installation:** `@aceternity/spotlight`
**Dépendances:** Aucune

Effet de lumière spotlight qui suit le curseur ou reste statique.

**Use case Arclen:** Hero section pour attirer l'attention sur le titre principal.

---

### spotlight-new
**Installation:** `@aceternity/spotlight-new`

Version améliorée du spotlight avec plus d'options de personnalisation.

---

### background-beams
**Installation:** `@aceternity/background-beams`

Rayons lumineux animés qui traversent l'écran en diagonale.

**Use case Arclen:** Section CTA finale pour créer un effet dynamique.

---

### background-beams-with-collision
**Installation:** `@aceternity/background-beams-with-collision`
**Dépendances:** motion

Rayons lumineux avec effet d'explosion quand ils touchent le bas.

**Use case Arclen:** Hero ou section premium pour impressionner.

---

### background-boxes
**Installation:** `@aceternity/background-boxes`

Grille de boxes qui s'illuminent au survol.

**Use case Arclen:** Section features/benefits comme fond subtil.

---

### background-gradient
**Installation:** `@aceternity/background-gradient`

Gradient animé simple.

---

### background-gradient-animation
**Installation:** `@aceternity/background-gradient-animation`

Gradient complexe avec plusieurs couleurs qui bougent et réagissent au curseur.

**Props configurables:**
- `gradientBackgroundStart` / `gradientBackgroundEnd`
- `firstColor` à `fifthColor` (RGB)
- `pointerColor`
- `interactive` (boolean)

**Use case Arclen:** Hero section full-screen avec effet "wow".

---

### background-lines
**Installation:** `@aceternity/background-lines`

Lignes verticales/horizontales animées.

---

### background-ripple-effect
**Installation:** `@aceternity/background-ripple-effect`

Effet ripple qui se propage.

---

### aurora-background
**Installation:** `@aceternity/aurora-background`

Effet aurora borealis avec couleurs qui ondulent.

**Use case Arclen:** Section pricing ou testimonials pour effet premium.

---

### wavy-background
**Installation:** `@aceternity/wavy-background`

Vagues animées en fond.

---

### meteors
**Installation:** `@aceternity/meteors`

Météores qui tombent en diagonale.

**Use case Arclen:** Cards de features pour effet subtil.

---

### sparkles
**Installation:** `@aceternity/sparkles`

Particules scintillantes autour d'un élément.

**Use case Arclen:** Mettre en avant un prix ou une feature clé.

---

### glowing-stars
**Installation:** `@aceternity/glowing-stars`

Étoiles qui brillent et pulsent.

---

### shooting-stars
**Installation:** `@aceternity/shooting-stars`

Étoiles filantes qui traversent l'écran.

---

### stars-background
**Installation:** `@aceternity/stars-background`

Fond étoilé statique ou animé.

---

### vortex
**Installation:** `@aceternity/vortex`

Effet vortex/tourbillon.

---

### noise-background
**Installation:** `@aceternity/noise-background`

Texture de bruit grain film.

---

### dotted-glow-background
**Installation:** `@aceternity/dotted-glow-background`

Points lumineux sur fond sombre.

---

### pixelated-canvas
**Installation:** `@aceternity/pixelated-canvas`

Canvas avec effet pixelisation.

---

### grid
**Installation:** `@aceternity/grid`

Grille de fond simple.

---

### moving-line
**Installation:** `@aceternity/moving-line`

Ligne qui se déplace.

---

## 2. Cards & Containers

### 3d-card
**Installation:** `@aceternity/3d-card`
**Dépendances:** Aucune

Carte avec effet 3D perspective au hover. La carte tourne légèrement selon la position du curseur.

**Use case Arclen:** Cards de pricing ou features pour effet interactif.

---

### 3d-pin
**Installation:** `@aceternity/3d-pin`

Pin 3D style Google Maps avec effet de profondeur.

**Use case Arclen:** Afficher des locations ou points d'intérêt.

---

### bento-grid
**Installation:** `@aceternity/bento-grid`
**Dépendances:** @tabler/icons-react

Grille style "bento box" avec cards de tailles variées.

**Structure:**
```tsx
<BentoGrid>
  <BentoGridItem
    title="Feature"
    description="Description"
    header={<Skeleton />}
    icon={<Icon />}
    className="md:col-span-2" // Pour spanning
  />
</BentoGrid>
```

**Use case Arclen:** Section features principale avec layout asymétrique.

---

### card-hover-effect
**Installation:** `@aceternity/card-hover-effect`

Effet hover avec highlight qui suit le curseur.

---

### card-spotlight
**Installation:** `@aceternity/card-spotlight`

Carte avec effet spotlight intégré.

---

### card-stack
**Installation:** `@aceternity/card-stack`

Pile de cartes empilées qui se révèlent.

**Use case Arclen:** Testimonials ou cas d'usage empilés.

---

### evervault-card
**Installation:** `@aceternity/evervault-card`

Effet style Evervault avec caractères qui changent au survol.

---

### glare-card
**Installation:** `@aceternity/glare-card`

Carte avec effet de reflet lumineux.

---

### wobble-card
**Installation:** `@aceternity/wobble-card`
**Dépendances:** motion

Carte qui "wobble" (tremble légèrement) au hover.

**Use case Arclen:** Cards de features ou CTA secondaires.

---

### comet-card
**Installation:** `@aceternity/comet-card`

Carte avec effet comète/traînée lumineuse.

---

### tooltip-card
**Installation:** `@aceternity/tooltip-card`

Carte tooltip avec preview.

---

### focus-cards
**Installation:** `@aceternity/focus-cards`

Grille de cartes où une seule est "focused" à la fois.

**Use case Arclen:** Gallery de screenshots ou use cases.

---

### draggable-card
**Installation:** `@aceternity/draggable-card`

Carte qu'on peut drag & drop.

---

### text-reveal-card
**Installation:** `@aceternity/text-reveal-card`

Carte avec texte qui se révèle au survol.

---

### direction-aware-hover
**Installation:** `@aceternity/direction-aware-hover`

Hover avec animation qui dépend de la direction d'entrée du curseur.

---

### lens
**Installation:** `@aceternity/lens`

Effet loupe sur une image ou zone.

**Use case Arclen:** Zoom sur des détails de l'interface Excel.

---

## 3. Text Effects

### typewriter-effect
**Installation:** `@aceternity/typewriter-effect`
**Dépendances:** motion

Effet machine à écrire caractère par caractère.

**Props:**
```tsx
<TypewriterEffect
  words={[
    { text: "Build" },
    { text: "awesome", className: "text-blue-500" },
    { text: "apps" },
  ]}
/>
```

**Use case Arclen:** Hero title animé "AI copilot for Excel & PowerPoint".

---

### text-generate-effect
**Installation:** `@aceternity/text-generate-effect`

Texte qui apparaît mot par mot avec blur.

**Use case Arclen:** Sous-titre du hero ou quotes de testimonials.

---

### text-hover-effect
**Installation:** `@aceternity/text-hover-effect`

Effet sur le texte au survol.

---

### flip-words
**Installation:** `@aceternity/flip-words`
**Dépendances:** motion

Mots qui "flip" (tournent) pour changer.

**Exemple:**
```tsx
<FlipWords words={["Excel", "PowerPoint", "Finance"]} />
```

**Use case Arclen:** "AI copilot for [Excel | PowerPoint | M&A]" dans le hero.

---

### colourful-text
**Installation:** `@aceternity/colourful-text`

Texte avec couleurs animées.

---

### cover
**Installation:** `@aceternity/cover`

Effet "cover" qui révèle le texte.

---

### hero-highlight
**Installation:** `@aceternity/hero-highlight`

Highlight animé sur des mots clés.

**Use case Arclen:** Mettre en avant "10x faster" ou "AI-powered".

---

### encrypted-text
**Installation:** `@aceternity/encrypted-text`

Effet texte crypté/décrypté style Matrix.

**Use case Arclen:** Section sécurité pour montrer l'encryption.

---

## 4. Navigation

### floating-navbar
**Installation:** `@aceternity/floating-navbar`

Navbar qui flotte et change au scroll.

---

### navbar-menu
**Installation:** `@aceternity/navbar-menu`

Menu navbar avec animations de dropdown.

---

### resizable-navbar
**Installation:** `@aceternity/resizable-navbar`

Navbar qui se redimensionne au scroll.

---

### floating-dock
**Installation:** `@aceternity/floating-dock`
**Dépendances:** @tabler/icons-react, motion

Dock style macOS qui flotte en bas de l'écran.

**Use case Arclen:** Navigation secondaire ou quick actions.

---

### sidebar
**Installation:** `@aceternity/sidebar`

Sidebar animée avec collapse.

---

## 5. Scroll & Parallax

### parallax-scroll
**Installation:** `@aceternity/parallax-scroll`

Images qui scrollent à des vitesses différentes.

---

### parallax-scroll-2
**Installation:** `@aceternity/parallax-scroll-2`

Variante du parallax scroll.

---

### hero-parallax
**Installation:** `@aceternity/hero-parallax`
**Dépendances:** motion

Hero avec images qui ont un effet parallax au scroll.

**Structure:**
```tsx
<HeroParallax products={[
  { title: "Product 1", link: "/", thumbnail: "/img1.png" },
  { title: "Product 2", link: "/", thumbnail: "/img2.png" },
  // ...
]} />
```

**Use case Arclen:** Showcase de screenshots du produit avec effet impressionnant.

---

### container-scroll-animation
**Installation:** `@aceternity/container-scroll-animation`

Container avec animation au scroll.

---

### sticky-scroll-reveal
**Installation:** `@aceternity/sticky-scroll-reveal`

Contenu qui se révèle en sticky scroll.

**Use case Arclen:** Expliquer les features étape par étape.

---

### macbook-scroll
**Installation:** `@aceternity/macbook-scroll`
**Dépendances:** @tabler/icons-react, motion

Animation style Apple avec MacBook qui s'ouvre au scroll.

**Use case Arclen:** Section "How it works" avec laptop qui montre Excel.

---

### tracing-beam
**Installation:** `@aceternity/tracing-beam`

Ligne qui trace le scroll de l'utilisateur.

**Use case Arclen:** Page longue (blog, docs) pour montrer la progression.

---

## 6. Carousels & Sliders

### infinite-moving-cards
**Installation:** `@aceternity/infinite-moving-cards`
**Dépendances:** Aucune

Cards qui défilent infiniment (marquee).

**Props:**
```tsx
<InfiniteMovingCards
  items={testimonials}
  direction="left" // ou "right"
  speed="slow" // "fast", "normal", "slow"
/>
```

**Use case Arclen:** Logos de clients ou testimonials défilants.

---

### apple-cards-carousel
**Installation:** `@aceternity/apple-cards-carousel`

Carousel style Apple avec cards qui s'expandent.

**Use case Arclen:** Showcase de features ou case studies.

---

### images-slider
**Installation:** `@aceternity/images-slider`

Slider d'images avec transitions.

---

### carousel
**Installation:** `@aceternity/carousel`

Carousel standard avec animations.

---

### 3d-marquee
**Installation:** `@aceternity/3d-marquee`

Marquee avec effet 3D.

---

## 7. Modals & Overlays

### animated-modal
**Installation:** `@aceternity/animated-modal`

Modal avec animations d'entrée/sortie.

---

### svg-mask-effect
**Installation:** `@aceternity/svg-mask-effect`

Effet de masque SVG qui révèle du contenu.

---

### canvas-reveal-effect
**Installation:** `@aceternity/canvas-reveal-effect`

Effet de révélation via canvas.

---

### link-preview
**Installation:** `@aceternity/link-preview`

Preview de lien au hover (comme Twitter).

**Use case Arclen:** Liens vers documentation ou resources.

---

## 8. Interactive Elements

### following-pointer
**Installation:** `@aceternity/following-pointer`

Élément qui suit le curseur.

---

### animated-tooltip
**Installation:** `@aceternity/animated-tooltip`

Tooltip avec animations.

**Use case Arclen:** Avatars d'équipe ou features avec explications.

---

### compare
**Installation:** `@aceternity/compare`
**Dépendances:** @tabler/icons-react, motion

Slider de comparaison avant/après.

**Use case Arclen:** Comparer "Sans Arclen" vs "Avec Arclen" (temps, erreurs, etc.).

---

### tabs
**Installation:** `@aceternity/tabs`
**Dépendances:** @radix-ui/react-tabs

Tabs avec animations de transition.

**Use case Arclen:** Organiser les features par catégorie (Excel, PowerPoint, etc.).

---

### file-upload
**Installation:** `@aceternity/file-upload`

Zone de file upload avec animations.

---

### placeholders-and-vanish-input
**Installation:** `@aceternity/placeholders-and-vanish-input`

Input avec placeholders qui changent et effet "vanish".

**Use case Arclen:** Search bar ou input de démo.

---

### pointer-highlight
**Installation:** `@aceternity/pointer-highlight`

Highlight qui suit le pointeur.

---

### stateful-button
**Installation:** `@aceternity/stateful-button`

Button avec états animés (loading, success, error).

---

### hover-border-gradient
**Installation:** `@aceternity/hover-border-gradient`

Bordure gradient animée au hover.

**Use case Arclen:** CTA buttons pour effet premium.

---

## 9. Layout & Structure

### layout-grid
**Installation:** `@aceternity/layout-grid`

Grille avec animations d'expansion.

---

### timeline
**Installation:** `@aceternity/timeline`
**Dépendances:** motion

Timeline verticale avec animations.

**Structure:**
```tsx
<Timeline data={[
  { title: "2024", content: <p>Description</p> },
  { title: "2025", content: <p>Description</p> },
]} />
```

**Use case Arclen:** Roadmap, historique de l'entreprise, ou process "How it works".

---

### lamp
**Installation:** `@aceternity/lamp`

Effet "lampe" qui illumine le contenu en dessous.

**Use case Arclen:** Hero ou section mise en avant.

---

### container-text-flip
**Installation:** `@aceternity/container-text-flip`

Container avec texte qui flip.

---

### layout-text-flip
**Installation:** `@aceternity/layout-text-flip`

Layout avec effet flip de texte.

---

### sticky-banner
**Installation:** `@aceternity/sticky-banner`

Banner sticky en haut de page.

**Use case Arclen:** Annonces, promotions, ou "Book a demo".

---

## 10. Forms & Inputs

### input
**Installation:** `@aceternity/input`

Input stylisé avec animations focus.

---

### label
**Installation:** `@aceternity/label`

Label stylisé pour forms.

---

### tailwindcss-buttons
**Installation:** `@aceternity/tailwindcss-buttons`

Collection de styles de buttons.

---

## 11. Loaders & Feedback

### multi-step-loader
**Installation:** `@aceternity/multi-step-loader`

Loader avec étapes qui s'affichent.

**Use case Arclen:** Onboarding ou process de génération AI.

---

### loader
**Installation:** `@aceternity/loader`

Loader simple animé.

---

### glowing-effect
**Installation:** `@aceternity/glowing-effect`

Effet de glow pulsant.

---

## 12. 3D & Advanced

### globe
**Installation:** `@aceternity/globe`
**Dépendances:** three, three-globe, @react-three/fiber@alpha, @react-three/drei
**Dev Dependencies:** @types/three

Globe 3D interactif avec points et arcs.

**Use case Arclen:** Section "Global reach" ou clients internationaux.

**Note:** Dépendances lourdes (Three.js), impact sur bundle size.

---

### world-map
**Installation:** `@aceternity/world-map`
**Dépendances:** dotted-map, motion

Carte du monde avec points et connexions.

**Use case Arclen:** Alternative plus légère au globe pour montrer présence internationale.

---

### google-gemini-effect
**Installation:** `@aceternity/google-gemini-effect`

Effet style Google Gemini avec lignes qui convergent.

---

### code-block
**Installation:** `@aceternity/code-block`

Block de code avec syntax highlighting et animations.

**Use case Arclen:** Montrer des formules Excel ou du code API.

---

## Recommandations pour Arclen

### Composants à haute priorité (Landing Page)

| Composant | Section | Pourquoi |
|-----------|---------|----------|
| `flip-words` | Hero | "AI copilot for [Excel \| PowerPoint \| Finance]" |
| `spotlight` | Hero | Attirer l'attention sur le titre |
| `bento-grid` | Features | Layout moderne pour présenter les features |
| `compare` | Benefits | Avant/Après avec Arclen |
| `timeline` | How it works | Expliquer le process |
| `animated-testimonials` | Social Proof | Testimonials interactifs |
| `infinite-moving-cards` | Logo Cloud | Clients qui défilent |
| `hover-border-gradient` | CTA | Buttons premium |
| `tabs` | Features | Organiser Excel vs PowerPoint |

### Composants pour effet "wow"

| Composant | Usage |
|-----------|-------|
| `hero-parallax` | Hero section full-page avec screenshots |
| `macbook-scroll` | "How it works" avec laptop |
| `background-gradient-animation` | Hero ou CTA background |
| `lamp` | Section mise en avant |
| `aurora-background` | Section pricing premium |

### Composants M&A/Finance specific

| Composant | Usage |
|-----------|-------|
| `world-map` | Présence internationale des deals |
| `encrypted-text` | Section sécurité/compliance |
| `lens` | Zoom sur détails Excel |
| `code-block` | Formules Excel générées |
| `multi-step-loader` | Process de génération AI |

### À éviter (trop technique/gaming)

- `meteors`, `shooting-stars` - Trop "space theme"
- `vortex` - Trop intense pour B2B finance
- `evervault-card` - Trop tech/crypto vibes
- `globe` - Trop lourd (Three.js) sauf si vraiment nécessaire

---

## Combinaisons suggérées

### Option A - Clean & Professional
```
Hero: spotlight + flip-words
Features: bento-grid + tabs
Social Proof: animated-testimonials
CTA: hover-border-gradient buttons
```

### Option B - Impressive & Modern
```
Hero: background-gradient-animation + typewriter-effect
Features: sticky-scroll-reveal
How it works: macbook-scroll
CTA: lamp + aurora-background
```

### Option C - Focused on Product
```
Hero: hero-parallax (screenshots)
Features: compare (before/after)
Process: timeline
Demo: lens (zoom on Excel)
```

---

## Notes techniques

### Performance
- Les composants avec `three.js` (globe) sont lourds
- Les backgrounds animés consomment du GPU
- Privilégier `motion` (Framer Motion) qui est déjà dans le projet

### Compatibilité
- Tous les composants supportent dark mode
- Responsive par défaut
- Accessibilité variable (vérifier a11y)

### Installation groupée
```bash
# Installer plusieurs composants
pnpm dlx shadcn@latest add "@aceternity/spotlight" "@aceternity/bento-grid" "@aceternity/flip-words" "@aceternity/tabs"
```
