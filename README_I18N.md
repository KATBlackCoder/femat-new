# Internationalisation (i18n) - Site FEMAT

## 🌍 Langues supportées

Le site FEMAT est maintenant disponible en **3 langues** :

- 🇫🇷 **Français** (langue par défaut)
- 🇬🇧 **Anglais** (English)
- 🇷🇺 **Russe** (Русский)

## 📁 Structure du projet

### Configuration

La configuration i18n se trouve dans `astro.config.mjs` :

```javascript
i18n: {
  locales: ['fr', 'en', 'ru'],
  defaultLocale: 'fr',
  routing: {
    prefixDefaultLocale: false
  }
}
```

### Organisation des fichiers

```
src/
├── pages/
│   ├── index.astro              # 🇫🇷 Page d'accueil FR
│   ├── actualites.astro         # 🇫🇷 Actualités FR
│   ├── evenements.astro         # 🇫🇷 Événements FR
│   ├── federation.astro         # 🇫🇷 Fédération FR
│   ├── en/
│   │   ├── index.astro          # 🇬🇧 Page d'accueil EN
│   │   ├── actualites.astro     # 🇬🇧 Actualités EN
│   │   └── evenements.astro     # 🇬🇧 Événements EN
│   └── ru/
│       ├── index.astro          # 🇷🇺 Page d'accueil RU
│       ├── actualites.astro     # 🇷🇺 Actualités RU
│       └── evenements.astro     # 🇷🇺 Événements RU
├── lib/
│   └── i18n/
│       └── translations.ts      # 📝 Fichier de traductions
└── components/
    └── LanguagePicker.vue       # 🌐 Sélecteur de langue
```

## 🚀 Démarrage rapide

### 1. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur :
- Français : `http://localhost:4321/`
- Anglais : `http://localhost:4321/en/`
- Russe : `http://localhost:4321/ru/`

### 2. Créer du contenu multilingue

#### Exemple : Créer une actualité en 3 langues

**Version française** : `src/content/actualites/2026/mon-article.mdx`

```markdown
---
title: "Mon article"
date: 2026-01-30
description: "Description en français"
lang: fr
---

Contenu en français...
```

**Version anglaise** : `src/content/actualites/2026/my-article.mdx`

```markdown
---
title: "My article"
date: 2026-01-30
description: "Description in English"
lang: en
---

Content in English...
```

**Version russe** : `src/content/actualites/2026/moya-statya.mdx`

```markdown
---
title: "Моя статья"
date: 2026-01-30
description: "Описание на русском"
lang: ru
---

Содержание на русском...
```

### 3. Ajouter une traduction

Éditez `src/lib/i18n/translations.ts` :

```typescript
export const translations = {
  fr: {
    'my.new.key': 'Mon nouveau texte',
  },
  en: {
    'my.new.key': 'My new text',
  },
  ru: {
    'my.new.key': 'Мой новый текст',
  }
}
```

Utilisez-la dans une page :

```astro
---
import { useTranslations } from '../lib/i18n/translations';
const t = useTranslations('fr');
---

<p>{t('my.new.key')}</p>
```

## 🎨 Composants

### LanguagePicker

Le sélecteur de langue est automatiquement intégré dans le Layout. Il affiche :
- Un menu déroulant avec les 3 langues disponibles
- La langue actuellement sélectionnée
- Un changement d'URL automatique lors de la sélection

Position : En haut à droite de chaque page (position fixe).

## 📊 Collections de contenu

Les collections `actualites`, `evenements` et `regles` supportent maintenant le champ `lang` :

```typescript
// Récupérer uniquement le contenu en français
const actualites = await getCollection('actualites', ({ data }) => data.lang === 'fr');

// Récupérer uniquement le contenu en anglais
const evenements = await getCollection('evenements', ({ data }) => data.lang === 'en');

// Récupérer uniquement le contenu en russe
const regles = await getCollection('regles', ({ data }) => data.lang === 'ru');
```

## 🔍 SEO

Le Layout gère automatiquement :

- ✅ Attribut `lang` du HTML (`<html lang="fr">`)
- ✅ Balises `og:locale` pour Open Graph
- ✅ Balises `<link rel="alternate" hreflang="...">` pour indiquer les versions alternatives
- ✅ Métadonnées adaptées à chaque langue

## 📝 Traductions disponibles

Les traductions actuellement disponibles incluent :

- Navigation (Accueil, Actualités, Événements, Fédération)
- Hero section (Titre, sous-titre, boutons)
- Statistiques (Clubs, Pratiquants, Ceintures noires, Régions)
- Événements (À venir, En cours, Terminé)
- Actualités (Lire la suite, Publié le)
- Footer (Copyright, Contact, À propos)
- Partage social
- Pagination

Pour voir la liste complète, consultez `src/lib/i18n/translations.ts`.

## 🛠️ Commandes utiles

```bash
# Lancer le serveur de développement
npm run dev

# Construire le site
npm run build

# Prévisualiser le build
npm run preview

# Synchroniser les types TypeScript
npm run astro sync

# Vérifier les erreurs
npm run astro check
```

## 📚 Documentation complète

Pour plus de détails, consultez le guide complet : `docs/I18N_GUIDE.md`

## 🤝 Contribution

Pour ajouter une nouvelle langue ou améliorer les traductions existantes :

1. Ajoutez la langue dans `astro.config.mjs`
2. Créez les traductions dans `src/lib/i18n/translations.ts`
3. Créez les pages correspondantes dans `src/pages/[lang]/`
4. Testez avec `npm run dev`

## 📧 Contact

Pour toute question ou suggestion concernant les traductions :

**Email** : femat3@yahoo.fr

---

**Développé avec ❤️ par l'équipe FEMAT**
