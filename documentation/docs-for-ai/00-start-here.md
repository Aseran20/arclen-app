# 🗺️ Documentation AI - Start Here

> **Breadcrumb** : [CLAUDE.md](../../CLAUDE.md) → **00-start-here.md**

---

## 👋 Bienvenue !

Ce dossier `docs-for-ai/` contient toute la documentation détaillée pour reprendre le projet **Arclen** après une réinitialisation de contexte IA.

**Objectif** : Te permettre de comprendre, développer et maintenir le projet sans lire tout le code.

---

## 📚 Table des matières

### 🏗️ Section 01 : Architecture
**Comprendre comment le projet est construit**

| Fichier | Sujet | Taille | À lire si... |
|---------|-------|--------|--------------|
| [tech-stack.md](01-architecture/tech-stack.md) | Stack technique complète | ~200 lignes | Tu veux connaître les versions et particularités de chaque techno |
| [folder-structure.md](01-architecture/folder-structure.md) | Organisation des dossiers | ~180 lignes | Tu te demandes "où mettre ce fichier ?" |
| [design-systems.md](01-architecture/design-systems.md) | Aceternity + shadcn coexistence | ~200 lignes | Tu travailles sur le styling ou les composants |

---

### 🛠️ Section 02 : Development
**Guides pratiques pour développer**

| Fichier | Sujet | Taille | À lire si... |
|---------|-------|--------|--------------|
| [setup-guide.md](02-development/setup-guide.md) | Installation complète | ~250 lignes | C'est ta première fois sur le projet |
| [common-tasks.md](02-development/common-tasks.md) | Tâches courantes (ajouter page, migration DB, etc.) | ~200 lignes | Tu as une tâche spécifique à faire |
| [troubleshooting.md](02-development/troubleshooting.md) | Problèmes connus + solutions | ~150 lignes | Tu rencontres une erreur |

---

### 📜 Section 03 : Decisions
**Historique et contexte des choix techniques**

| Fichier | Sujet | Taille | À lire si... |
|---------|-------|--------|--------------|
| [changelog.md](03-decisions/changelog.md) | Log chronologique de tous les changements | ~300 lignes | Tu veux savoir "qu'est-ce qui a changé récemment ?" |
| [why-nextjs-16.md](03-decisions/why-nextjs-16.md) | Pourquoi upgrade Next.js 16 | ~120 lignes | Tu te demandes pourquoi on utilise Cache Components |
| [migration-aceternity.md](03-decisions/migration-aceternity.md) | Fusion des templates | ~180 lignes | Tu veux comprendre l'origine du dual design system |

---

### ⚡ Section 04 : Quick Reference
**Configurations rapides sans explications longues**

| Fichier | Sujet | Taille | À lire si... |
|---------|-------|--------|--------------|
| [stripe.md](04-quick-reference/stripe.md) | Config Stripe + webhooks | ~150 lignes | Tu travailles sur les paiements |
| [auth.md](04-quick-reference/auth.md) | Système d'authentification | ~120 lignes | Tu debugges l'auth ou ajoutes une route protégée |
| [database.md](04-quick-reference/database.md) | Drizzle + Neon PostgreSQL | ~140 lignes | Tu modifies le schéma ou fais une migration |

---

## 🎯 Parcours de lecture recommandés

### 🆕 Tu découvres le projet ?
1. Lis [CLAUDE.md](../../CLAUDE.md) (3 minutes)
2. Puis [tech-stack.md](01-architecture/tech-stack.md) (5 minutes)
3. Puis [setup-guide.md](02-development/setup-guide.md) (10 minutes)
4. Lance `pnpm dev` et explore !

### 🐛 Tu debugges un problème ?
1. Commence par [troubleshooting.md](02-development/troubleshooting.md)
2. Puis [changelog.md](03-decisions/changelog.md) (cherche si c'est lié à un changement récent)
3. Si problème Stripe → [stripe.md](04-quick-reference/stripe.md)
4. Si problème Auth → [auth.md](04-quick-reference/auth.md)

### 🚀 Tu ajoutes une feature ?
1. Lis [common-tasks.md](02-development/common-tasks.md) - section correspondante
2. Vérifie [folder-structure.md](01-architecture/folder-structure.md) - où créer les fichiers
3. Si feature marketing → [design-systems.md](01-architecture/design-systems.md) - utilise Aceternity
4. Si feature dashboard → [design-systems.md](01-architecture/design-systems.md) - utilise shadcn

### 📝 Tu mets à jour la doc (important !) ?
1. **TOUJOURS** ajouter une entrée dans [changelog.md](03-decisions/changelog.md)
2. Mettre à jour le fichier concerné (tech-stack, folder-structure, etc.)
3. Si changement majeur → Mettre à jour [CLAUDE.md](../../CLAUDE.md) aussi
4. Respecter le principe DRY : 1 info = 1 endroit, liens ailleurs

---

## 🧭 Navigation rapide

- **🏠 Retour au hub** : [CLAUDE.md](../../CLAUDE.md)
- **📖 README technique** : [README.md](../../README.md)
- **⚙️ Config Aceternity** : [aceternity-installation/](../aceternity-installation/)

---

## 📏 Principes de cette documentation

### DRY (Don't Repeat Yourself)
- Chaque information existe **une seule fois**
- Les autres docs font des **liens** vers cette source unique
- Exemple : Les versions de stack sont dans `tech-stack.md`, CLAUDE.md y fait référence

### Modulaire
- 1 fichier = 1 sujet
- Taille max ~300 lignes
- Si un fichier grossit trop → Le diviser

### Navigation claire
- Breadcrumbs en haut de chaque fichier
- Section "Voir aussi" avec liens
- Table des matières pour fichiers longs

### Maintenance
- Rappels explicites dans CLAUDE.md
- Format d'entrée changelog standardisé
- Dates systématiques (YYYY-MM-DD)

---

*Créé le 2025-12-15 | Mise à jour : Check changelog.md*
