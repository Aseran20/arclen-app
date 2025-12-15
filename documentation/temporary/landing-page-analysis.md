# Landing Page Analysis - Template Aceternity

Ce document détaille chaque section de la landing page dans l'ordre d'apparition. L'objectif est de faciliter l'adaptation du template pour **Arclen** (AI copilots pour Excel & PowerPoint, cible M&A et finance).

---

## Vue d'ensemble

**Fichier principal** : `app/(marketing)/page.tsx`

**Ordre des sections** :
1. Hero
2. HeroImage
3. LogoCloud
4. AgenticIntelligence (Features)
5. UseCases
6. Benefits
7. Testimonials
8. Pricing
9. Security
10. FAQs
11. CTA

---

## 1. Hero

**Fichier** : `components/marketing/hero.tsx`

### Contenu actuel (template)
| Élément | Valeur actuelle |
|---------|-----------------|
| Badge | "For fast moving engineering teams." |
| Titre | "Manage and simulate agentic **workflows**" |
| Sous-titre | "We empower developers and technical teams to create, simulate, and manage AI-driven workflows visually" |
| CTA Principal | "Start building" → `/sign-up` |
| CTA Secondaire | "View pricing" → `/pricing` |
| Social Proof | Logo Gartner + 5 étoiles + "Innovative AI solution 2025 by Gartner" |

### Structure
```
┌─────────────────────────────────────────┐
│              [Badge]                     │
│         Titre principal                  │
│           Sous-titre                     │
│    [CTA Primary]  [CTA Secondary]        │
│  [Gartner Logo] ★★★★★ "Innovative..."   │
└─────────────────────────────────────────┘
```

### À adapter pour Arclen
- **Badge** : Ex. "For M&A and finance teams"
- **Titre** : Mettre en avant Excel/PowerPoint + AI copilot
- **Sous-titre** : Value prop spécifique finance
- **Social proof** : Remplacer Gartner par vos vraies certifications/awards ou retirer

### Modifiabilité : ⭐ Très facile
Tout est du texte statique dans le composant.

---

## 2. HeroImage

**Fichier** : `components/marketing/hero-image.tsx`

### Contenu actuel
- Image : `/dashboard@3x.png`
- Effet : Parallax au survol (mouse tracking)
- Background : Pattern diagonal avec dots

### Structure
```
┌─────────────────────────────────────────┐
│  [Dots]                          [Dots] │
│  ┌─────────────────────────────────┐    │
│  │     Screenshot du dashboard     │    │
│  │        (avec parallax)          │    │
│  └─────────────────────────────────┘    │
│  [Dots]                          [Dots] │
└─────────────────────────────────────────┘
```

### À adapter pour Arclen
- Remplacer `/dashboard@3x.png` par un screenshot de votre produit
- Idéalement : Excel/PowerPoint avec le copilot Arclen visible

### Modifiabilité : ⭐ Très facile
Juste changer le `src` de l'image (ligne 74).

---

## 3. LogoCloud

**Fichier** : `components/marketing/logo-cloud.tsx`
**Données** : `constants/logos.ts`

### Contenu actuel
- Titre : "Trusted by Fast Growing Startups"
- 8 logos affichés sur 10 disponibles
- Animation : Rotation aléatoire des logos toutes les 3 secondes
- Grille : 2 colonnes mobile, 4 colonnes desktop

### Structure des données (`constants/logos.ts`)
```typescript
{
  title: "First",        // Nom de l'entreprise
  src: "/logos/1.png",   // Chemin vers le logo
  className: "h-10 w-auto"  // Taille
}
```

### À adapter pour Arclen
- **Titre** : "Trusted by leading M&A firms" ou "Used by top investment banks"
- **Logos** :
  - Remplacer par logos de vrais clients
  - Ou logos de firmes finance connues (si autorisé)
  - Ou retirer la section si pas encore de clients

### Modifiabilité : ⭐ Très facile
- Modifier `constants/logos.ts` pour changer les logos
- Modifier le titre ligne 45 du composant

---

## 4. AgenticIntelligence (Features)

**Fichier** : `components/marketing/agentic-intelligence/index.tsx`
**Skeletons** : `components/marketing/agentic-intelligence/skeletons.tsx`

### Contenu actuel
| Élément | Valeur |
|---------|--------|
| Badge | "Features" |
| Titre | "Built for Agentic Intelligence" |
| Sous-titre | "Build, test and deploy AI agents with a powerful visual interface designed for technical teams" |

### Features présentées

#### Row 1 (2 colonnes)
| Feature | Description | Visual |
|---------|-------------|--------|
| **LLM Model Selector** | "Track real-time activity of agents..." | Liste de modèles (Claude, GPT, Llama) avec statuts |
| **Text to workflow builder** | "Preview and debug workflow logic..." | Chat interactif avec assistant |

#### Row 2 (pleine largeur)
| Feature | Description | Visual |
|---------|-------------|--------|
| **Native Tools Integration** | "Track real-time activity of agents..." | Diagramme avec logos (Notion, Linear, Supabase, Slack, OpenAI) |

#### Row 3 (3 colonnes, sans visuals)
| Feature | Description |
|---------|-------------|
| **One Click Auth** | "A drag-and-drop interface to create, connect, and configure agents into logical workflows" |
| **Realtime Sync** | "Agents operate independently and coordinate tasks to complete complex all goals" |
| **Custom Connector SDK** | "Run agent workflows in a sandbox to preview behavior, debug logic, and test interactions" |

### Détail du diagramme "Native Tools Integration"

```
                    ┌─────────────────────────────────────────────┐
                    │                                             │
  Meeting Summarizer ──────────────┐                              │
                                   │     ┌──────┐                 │
  Code Reviewer ───────────────────┼─────│Arclen│─── Notion ──── OpenAI
                                   │     │ Logo │     Linear      │
  Customer Support ────────────────┘     └──────┘    Supabase     │
                                              │       Slack       │
                                        [Connected]               │
                    └─────────────────────────────────────────────┘
```

**Animations** :
- Lignes avec gradient qui "voyage" horizontalement
- Logo central avec effet spinning gradient
- Lignes verticales avec gradient descendant

**Responsive** : Sur mobile, affiche une image statique (`/illustrations/native-tools-integration.svg`)

### À adapter pour Arclen
- **Titre** : Ex. "AI-Powered Excel & PowerPoint"
- **Features** : Adapter aux fonctionnalités réelles :
  - LLM Model Selector → "Smart Formula Assistant"
  - Text to workflow → "Natural Language to Formulas"
  - Native Tools Integration → "Excel & PowerPoint Integration"
  - One Click Auth → "Secure SSO"
  - Realtime Sync → "Live Collaboration"
  - Custom Connector SDK → "Custom Templates"

- **Diagramme** :
  - Gauche : Vos use cases (Financial Modeling, Due Diligence, Valuation)
  - Centre : Logo Arclen
  - Droite : Excel, PowerPoint, SharePoint, Teams

### Modifiabilité

| Élément | Difficulté |
|---------|------------|
| Textes (titres, descriptions) | ⭐ Trivial |
| Icônes des features | ⭐ Facile (imports dans `icons/bento-icons.tsx`) |
| Logos du diagramme | ⭐⭐ Moyen (modifier `skeletons.tsx` + ajouter logos) |
| Architecture du diagramme | ⭐⭐⭐⭐ Complexe (SVG hardcodés) |

---

## 5. UseCases

**Fichier** : `components/marketing/use-cases.tsx`

### Contenu actuel
| Élément | Valeur |
|---------|--------|
| Badge | "Use Cases" |
| Titre | "Across various Industries" |
| Sous-titre | "We empower developers and technical teams to create, simulate, and manage AI-driven workflows visually" |

### Use cases (6 cards)
| Use Case | Icône | Description |
|----------|-------|-------------|
| DevOps | DevopsIcon | "Visually orchestrate autonomous agents without writing boilerplate code" |
| SalesOps | GraphIcon | (même description) |
| Supply Chain | TruckIcon | (même description) |
| Customer Support | PhoneIcon | (même description) |
| DataOps | DatabaseIcon | (même description) |
| FinOps | WalletIcon | (même description) |

### Animation
- Effet de scale/highlight au hover sur chaque card

### À adapter pour Arclen
- **Use cases M&A/Finance** :
  - Financial Modeling
  - Due Diligence
  - Valuation Analysis
  - Deal Structuring
  - Portfolio Reporting
  - Pitch Deck Creation

### Modifiabilité : ⭐ Très facile
Array `useCases` dans le composant (lignes 19-56). Changer titre, description, icône.

---

## 6. Benefits

**Fichier** : `components/marketing/benefits.tsx`

### Contenu actuel
| Élément | Valeur |
|---------|--------|
| Badge | "Benefits" |
| Titre | "Making Engineers 10x faster" |
| Sous-titre | "We empower developers and technical teams to create, simulate, and manage AI-driven workflows visually" |

### Benefits (6 cards + 1 MiddleCard)
| Benefit | Description |
|---------|-------------|
| Launch Faster | "Visually orchestrate autonomous agents without writing boilerplate code" |
| Iterate Rapidly | (même) |
| Scale Smarter | (même) |
| Reuse Intelligence | (même) |
| Prevent Breakdowns | (même) |
| Automate More | (même) |

### MiddleCard (visual central)
- Diagramme : OpenAI ─── Arclen ─── Slack
- Badge "Connected"
- Mini dashboard avec barres de progression (API Calls, Success Rate, Workflows)
- Notification animée qui change : "Meeting created", "Chat history saved", "You talking to me"

### Layout
```
┌────────────────────────────────────────────────────┐
│  [Card 1]     │                      │  [Card 4]   │
│  [Card 2]     │    [MiddleCard]      │  [Card 5]   │
│  [Card 3]     │    avec diagramme    │  [Card 6]   │
└────────────────────────────────────────────────────┘
```

### À adapter pour Arclen
- **Titre** : "Making Finance Teams 10x faster"
- **Benefits** :
  - "Save Hours" - Automate repetitive Excel tasks
  - "Reduce Errors" - AI-powered formula validation
  - "Scale Analysis" - Handle larger datasets
  - "Reuse Templates" - Smart template library
  - "Ensure Compliance" - Built-in audit trails
  - "Collaborate Faster" - Real-time team features

- **MiddleCard** :
  - Remplacer OpenAI/Slack par Excel/PowerPoint
  - Dashboard metrics : "Formulas Generated", "Time Saved", "Deals Processed"

### Modifiabilité : ⭐⭐ Moyen
- Benefits array : ⭐ Trivial
- MiddleCard : ⭐⭐⭐ Moyen (modifier logos, textes, metrics)

---

## 7. Testimonials

**Fichier** : `components/marketing/testimonials.tsx`
**Données** : `constants/testimonials.ts`

### Contenu actuel
- Titre : "Trusted by Fast Growing Startups"
- 10 testimonials avec rotation automatique (10s)
- Sélection manuelle via grille de logos en bas

### Structure d'un testimonial
```typescript
{
  src: "/logos/1.png",           // Logo entreprise
  logoClassName: "h-10 w-auto",
  sideText: "10x",               // Stat mise en avant
  sideSubText: "Hours Saved",    // Description de la stat
  quote: "...",                  // Citation
  name: "James Fincher",
  position: "CEO",
  company: "Aceternity",
  avatar: "https://unsplash.com/..."  // Photo
}
```

### Layout
```
┌──────────────────────────────────────────────────────────┐
│  "Trusted by Fast Growing Startups"                       │
├──────────────────────────────────────────────────────────┤
│  ┌────────┐                                     ┌──────┐ │
│  │ Avatar │  [Logo]                             │ 10x  │ │
│  │        │  "Quote..."                         │Hours │ │
│  │        │  Name, Position, Company            │Saved │ │
│  └────────┘                                     └──────┘ │
├──────────────────────────────────────────────────────────┤
│  [Logo 1] [Logo 2] [Logo 3] [Logo 4]                      │
│  [Logo 5] [Logo 6] [Logo 7] [Logo 8]                      │
└──────────────────────────────────────────────────────────┘
```

### À adapter pour Arclen
- Vrais testimonials de clients (si disponibles)
- Ou testimonials fictifs mais réalistes :
  - Personas : VP Finance, M&A Director, Investment Analyst
  - Companies : PE firms, Investment Banks, Corporate Dev teams
  - Metrics : "80% time saved on modeling", "3x faster due diligence"

### Modifiabilité : ⭐ Très facile
Modifier `constants/testimonials.ts` uniquement.

---

## 8. Pricing

**Fichier** : `components/marketing/pricing.tsx`
**Données** : `constants/pricing.tsx`

### Contenu actuel
| Élément | Valeur |
|---------|--------|
| Badge | "Pricing" |
| Titre | "Simple and Feasible Pricing" |
| Toggle | Monthly / Yearly (Save 20%) |

### Tiers
| Tier | Cible | Monthly | Yearly | Features |
|------|-------|---------|--------|----------|
| **Growth** | Early stage teams | $8/seat | $80/seat | 5 agents, 50 simulations, basic support |
| **Scale** | Fast moving startups | $12/seat | $120/seat | 25 agents, 150 simulations, priority support |
| **Enterprise** | Large enterprises | $25/seat | $250/seat | Unlimited, "Access to Fight Club" |

### À adapter pour Arclen
- Adapter les tiers aux besoins M&A :
  - **Analyst** : Individual use, basic features
  - **Team** : Small teams, collaboration
  - **Enterprise** : Large firms, SSO, compliance

- Features à remplacer :
  - "agents" → "AI queries/month"
  - "simulations" → "documents processed"
  - Ajouter : "Excel add-in", "PowerPoint add-in", "Priority support"

### Modifiabilité : ⭐ Très facile
Modifier `constants/pricing.tsx` uniquement.

---

## 9. Security

**Fichier** : `components/marketing/security.tsx`

### Contenu actuel
| Élément | Valeur |
|---------|--------|
| Badge | "FOR SECURITY FIRST TEAMS" |
| Titre | "Scale securely with confidence" |
| Sous-titre | "Our AI assistant is designed with enterprise-grade security practices and compliant with global data protection standards." |
| CTA | "Start for free" |
| Certifications | CCPA, GDPR, ISO (images dans `/logos/`) |

### Layout
```
┌─────────────────────────────────────────────────────┐
│           "FOR SECURITY FIRST TEAMS"                 │
├─────────────────────────────────────────────────────┤
│  Scale securely...          │  [CCPA] [GDPR] [ISO]  │
│  Description...             │                        │
│  [Start for free]           │                        │
└─────────────────────────────────────────────────────┘
```

### À adapter pour Arclen
- **Très pertinent pour M&A** (données sensibles)
- Mettre en avant :
  - SOC 2 compliance (si applicable)
  - Data encryption
  - No data retention policy
  - On-premise option (si disponible)

### Modifiabilité : ⭐ Très facile
Textes + images de certifications.

---

## 10. FAQs

**Fichier** : `components/marketing/faqs.tsx`
**Données** : `constants/faqs.ts`

### Contenu actuel
| Élément | Valeur |
|---------|--------|
| Badge | "FAQs" |
| Titre | "Frequently Asked Questions" |
| Sous-titre | "Find all your doubts and questions in one place..." |
| CTAs | "Read Docs" + "Contact Us" |

### Questions actuelles (6)
1. What exactly does this platform do?
2. How do I get started with creating my first workflow?
3. What tools and services can I integrate?
4. Is my data secure when using AI agents?
5. Can I test workflows before they go live?
6. What's the difference between automated and manual steps?

### Animation
- Accordéon avec animation smooth (height + opacity)

### À adapter pour Arclen
Questions typiques M&A/Finance :
1. How does Arclen integrate with Excel?
2. Is my deal data secure?
3. Can I use Arclen offline?
4. What Excel functions does Arclen support?
5. How does pricing work for large teams?
6. Do you offer enterprise/on-premise solutions?

### Modifiabilité : ⭐ Très facile
Modifier `constants/faqs.ts` uniquement.

---

## 11. CTA (Call to Action final)

**Fichier** : `components/marketing/cta.tsx`

### Contenu actuel
| Élément | Valeur |
|---------|--------|
| Titre | "Connect your Current Stack and Start Automating" |
| CTA | "Start Building for Free" |
| Visual | Orbite animée avec logos (Supabase, OpenAI, Meta, Slack, Notion, Linear, Anthropic, Google, Facebook, Apple) |

### Animation "CTAOrbit"
- 3 anneaux concentriques
- Logos qui orbitent autour du centre
- Rotation alternée (clockwise/counter-clockwise)
- Durées différentes par anneau

### Layout
```
┌─────────────────────────────────────────────────────┐
│                                                      │
│            ╭──── ● ────╮                             │
│         ╭──●─────●─────●──╮                          │
│       ╭──●───────●───────●──╮                        │
│       │         [●]         │                        │
│       ╰──●───────●───────●──╯                        │
│         ╰──●─────●─────●──╯                          │
│            ╰──── ● ────╯                             │
│                                                      │
│     Connect your Current Stack and Start...          │
│           [Start Building for Free]                  │
└─────────────────────────────────────────────────────┘
```

### À adapter pour Arclen
- **Titre** : "Transform Your Excel & PowerPoint Workflow"
- **CTA** : "Try Arclen Free"
- **Logos orbite** : Excel, PowerPoint, SharePoint, OneDrive, Teams, Google Sheets, Notion, etc.

### Modifiabilité : ⭐⭐ Moyen
- Textes : ⭐ Trivial
- Logos orbite : ⭐⭐ Moyen (modifier array `logos` ligne 53-67)

---

## Fichiers de données à modifier

| Fichier | Contenu |
|---------|---------|
| `constants/logos.ts` | Logos du LogoCloud |
| `constants/testimonials.ts` | Testimonials complets |
| `constants/faqs.ts` | Questions/réponses FAQ |
| `constants/pricing.tsx` | Tiers et features pricing |

---

## Assets à remplacer

| Asset | Localisation | Usage |
|-------|--------------|-------|
| `/dashboard@3x.png` | HeroImage | Screenshot produit |
| `/logos/1.png` à `/logos/10.png` | LogoCloud, Testimonials | Logos clients |
| `/logos/CCPA.png`, `GDPR.png`, `ISO.png` | Security | Certifications |
| `/illustrations/native-tools-integration.svg` | AgenticIntelligence (mobile) | Diagramme statique |

---

## Résumé des priorités d'adaptation

### Priorité 1 - Indispensable
- [ ] Hero (titre, sous-titre, badge)
- [ ] HeroImage (screenshot produit)
- [ ] Pricing (tiers et features)
- [ ] Security (si pertinent pour votre cible)

### Priorité 2 - Important
- [ ] UseCases (adapter aux use cases M&A)
- [ ] Benefits (value props spécifiques)
- [ ] FAQs (questions pertinentes)
- [ ] CTA final (message et logos)

### Priorité 3 - Nice to have
- [ ] LogoCloud (vrais logos clients)
- [ ] Testimonials (vrais ou réalistes)
- [ ] AgenticIntelligence features (si vous gardez cette section)

### Priorité 4 - Optionnel
- [ ] Diagramme "Native Tools Integration" (complexe à modifier)
- [ ] Animations custom

---

## Notes techniques

### Icônes disponibles
- `icons/card-icons.tsx` : Icônes pour les cards (Rocket, Graph, Shield, etc.)
- `icons/bento-icons.tsx` : Icônes pour les features (Brain, Fingerprint, etc.)
- `icons/general.tsx` : Logos tech (OpenAI, Slack, Notion, etc.)

### Composants réutilisables
- `Badge` : Petit label coloré
- `SectionHeading` : Titre de section H2
- `SubHeading` : Sous-titre de section
- `Button` : Primary, Secondary, Brand variants
- `Container` : Wrapper avec bordures
- `DivideX` : Ligne horizontale de séparation
