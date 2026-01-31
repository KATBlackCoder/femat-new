# Guide d'internationalisation (i18n)

Ce guide explique comment utiliser le système d'internationalisation du site FEMAT avec 3 langues : français, anglais et russe.

## Configuration

La configuration i18n se trouve dans `astro.config.mjs` :

```javascript
i18n: {
  locales: ['fr', 'en', 'ru'],
  defaultLocale: 'fr',
  routing: {
    prefixDefaultLocale: true
  }
}
```

- **Langue par défaut** : français (`fr`)
- **Langues supportées** : français, anglais (`en`), russe (`ru`)
- **Routing** : **Toutes les langues ont un préfixe d'URL** (`/fr/`, `/en/`, `/ru/`)

## Structure des URLs

Avec `prefixDefaultLocale: true`, toutes les langues ont un préfixe :

- Français : `https://femat.ml/fr/` ou `https://femat.ml/fr/actualites`
- Anglais : `https://femat.ml/en/` ou `https://femat.ml/en/actualites`
- Russe : `https://femat.ml/ru/` ou `https://femat.ml/ru/actualites`

**Note** : La racine `/` redirige automatiquement vers `/fr/`

## Structure des fichiers

### Pages

Les pages sont organisées par langue avec **toutes les langues dans des dossiers** :

```
src/pages/
├── index.astro              # Redirection vers /fr/
├── fr/
│   ├── index.astro          # Page d'accueil FR
│   ├── actualites.astro     # Actualités FR
│   ├── evenements.astro     # Événements FR
│   ├── federation.astro     # Fédération FR
│   ├── actualites/
│   │   └── [...slug].astro  # Pages dynamiques actualités FR
│   └── evenements/
│       └── [...slug].astro  # Pages dynamiques événements FR
├── en/
│   ├── index.astro          # Page d'accueil EN
│   ├── actualites.astro     # Actualités EN
│   ├── evenements.astro     # Événements EN
│   ├── actualites/
│   │   └── [...slug].astro  # Pages dynamiques actualités EN
│   └── evenements/
│       └── [...slug].astro  # Pages dynamiques événements EN
└── ru/
    ├── index.astro          # Page d'accueil RU
    ├── actualites.astro     # Actualités RU
    ├── evenements.astro     # Événements RU
    ├── actualites/
    │   └── [...slug].astro  # Pages dynamiques actualités RU
    └── evenements/
        └── [...slug].astro  # Pages dynamiques événements RU
```

### Contenu

Les collections de contenu sont **organisées par dossiers de langue** :

```
src/content/
├── actualites/
│   ├── fr/
│   │   ├── 2025/
│   │   │   └── mon-article.mdx
│   │   └── 2026/
│   │       └── autre-article.mdx
│   ├── en/
│   │   └── welcome-i18n-en.mdx
│   └── ru/
│       └── welcome-i18n-ru.mdx
├── evenements/
│   ├── fr/
│   │   ├── 2025/
│   │   └── 2026/
│   ├── en/
│   └── ru/
└── regles/
    ├── fr/
    │   └── femat.mdx
    ├── en/
    └── ru/
```

Chaque fichier MDX utilise toujours le champ `lang` :

```markdown
---
title: "Mon titre"
date: 2026-01-30
description: "Description"
lang: fr  # ou 'en' ou 'ru'
---

Contenu de l'article...
```

## Système de traductions

### Fichier de traductions

Les traductions sont centralisées dans `src/lib/i18n/translations.ts` :

```typescript
export const translations = {
  fr: {
    'nav.home': 'Accueil',
    'nav.news': 'Actualités',
    // ...
  },
  en: {
    'nav.home': 'Home',
    'nav.news': 'News',
    // ...
  },
  ru: {
    'nav.home': 'Главная',
    'nav.news': 'Новости',
    // ...
  }
}
```

### Utilisation dans les pages

```astro
---
import { useTranslations } from '../../lib/i18n/translations';

const t = useTranslations('fr'); // ou 'en' ou 'ru'
---

<h1>{t('hero.title')}</h1>
<p>{t('hero.subtitle')}</p>
```

## Sélecteur de langue

Le composant `LanguagePicker.vue` est intégré dans le Layout et permet de changer de langue.

Il est positionné en haut à droite de chaque page (position fixe).

## Filtrage du contenu par langue

Pour récupérer uniquement le contenu dans une langue spécifique :

```astro
---
import { getCollection } from 'astro:content';

// Récupérer uniquement les actualités en français
const actualites = await getCollection('actualites', ({ data }) => data.lang === 'fr');

// Récupérer uniquement les événements en anglais
const evenements = await getCollection('evenements', ({ data }) => data.lang === 'en');
---
```

## Pages dynamiques

Les pages dynamiques utilisent `article.id` ou `event.id` au lieu de `slug` car le contenu est organisé par dossiers :

```astro
---
export async function getStaticPaths() {
  const actualites = await getCollection('actualites', ({ data }) => data.lang === 'fr');
  return actualites.map((article) => ({
    params: { slug: article.id },  // Utiliser article.id
    props: { article },
  }));
}
---
```

**Important** : `article.id` correspond au chemin relatif du fichier sans l'extension (ex: `fr/2026/mon-article`)

## Ajouter une nouvelle traduction

1. **Ajouter la clé dans `translations.ts`** :

```typescript
export const translations = {
  fr: {
    'new.key': 'Nouveau texte',
  },
  en: {
    'new.key': 'New text',
  },
  ru: {
    'new.key': 'Новый текст',
  }
}
```

2. **Utiliser la traduction** :

```astro
---
const t = useTranslations('fr');
---

<p>{t('new.key')}</p>
```

## Créer du contenu multilingue

### Exemple : Créer une actualité en 3 langues

1. **Version française** : `src/content/actualites/fr/mon-article.mdx`

```markdown
---
title: "Mon article"
date: 2026-01-30
description: "Description en français"
lang: fr
---

Contenu en français...
```

2. **Version anglaise** : `src/content/actualites/en/my-article.mdx`

```markdown
---
title: "My article"
date: 2026-01-30
description: "Description in English"
lang: en
---

Content in English...
```

3. **Version russe** : `src/content/actualites/ru/moya-statya.mdx`

```markdown
---
title: "Моя статья"
date: 2026-01-30
description: "Описание на русском"
lang: ru
---

Содержание на русском...
```

## SEO et métadonnées

Le Layout gère automatiquement :

- L'attribut `lang` du HTML
- Les balises `og:locale` pour Open Graph
- Les balises `<link rel="alternate" hreflang="...">` pour indiquer les versions alternatives

## Bonnes pratiques

1. **Toujours spécifier la langue** : Ajouter `lang="fr"` (ou `en`/`ru`) dans les props du Layout
2. **Utiliser les traductions** : Ne pas coder en dur les textes, utiliser le système de traductions
3. **Filtrer par langue** : Toujours filtrer les collections par langue pour éviter les mélanges
4. **Organisation du contenu** : Placer les fichiers MDX dans les dossiers de langue appropriés
5. **Chemins relatifs** : Utiliser les bons chemins relatifs (`../../` au lieu de `../`) dans les pages des sous-dossiers

## Commandes utiles

```bash
# Lancer le serveur de développement
npm run dev

# Construire le site
npm run build

# Synchroniser les types TypeScript
npm run astro sync
```

## Ressources

- [Documentation Astro i18n](https://docs.astro.build/en/guides/internationalization/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
