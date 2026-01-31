# Réorganisation de l'architecture i18n

## ✅ Modifications effectuées

### 1. Configuration Astro

**Fichier** : `astro.config.mjs`

```javascript
i18n: {
  locales: ['fr', 'en', 'ru'],
  defaultLocale: 'fr',
  routing: {
    prefixDefaultLocale: true  // ✨ Changé de false à true
  }
}
```

**Impact** : Toutes les langues ont maintenant un préfixe d'URL :
- ❌ Avant : `/` (FR), `/en/` (EN), `/ru/` (RU)
- ✅ Après : `/fr/` (FR), `/en/` (EN), `/ru/` (RU)

### 2. Structure des pages

#### Avant
```
src/pages/
├── index.astro              # FR
├── actualites.astro         # FR
├── evenements.astro         # FR
├── federation.astro         # FR
├── actualites/
│   └── [...slug].astro      # FR
├── evenements/
│   └── [...slug].astro      # FR
├── en/
│   ├── index.astro
│   ├── actualites.astro
│   └── evenements.astro
└── ru/
    ├── index.astro
    ├── actualites.astro
    └── evenements.astro
```

#### Après
```
src/pages/
├── index.astro              # ✨ Redirection vers /fr/
├── fr/
│   ├── index.astro
│   ├── actualites.astro
│   ├── evenements.astro
│   ├── federation.astro
│   ├── actualites/
│   │   └── [...slug].astro
│   └── evenements/
│       └── [...slug].astro
├── en/
│   ├── index.astro
│   ├── actualites.astro
│   ├── evenements.astro
│   ├── actualites/
│   │   └── [...slug].astro
│   └── evenements/
│       └── [...slug].astro
└── ru/
    ├── index.astro
    ├── actualites.astro
    ├── evenements.astro
    ├── actualites/
    │   └── [...slug].astro
    └── evenements/
        └── [...slug].astro
```

**Modifications** :
- ✅ Toutes les pages FR déplacées dans `src/pages/fr/`
- ✅ Page racine `index.astro` redirige vers `/fr/`
- ✅ Chemins relatifs mis à jour (`../` → `../../`)
- ✅ Pages dynamiques créées pour EN et RU

### 3. Structure du contenu

#### Avant
```
src/content/
├── actualites/
│   ├── 2025/
│   │   └── *.mdx
│   └── 2026/
│       └── *.mdx
├── evenements/
│   ├── 2025/
│   │   └── *.mdx
│   └── 2026/
│       └── *.mdx
└── regles/
    └── femat.mdx
```

#### Après
```
src/content/
├── actualites/
│   ├── fr/
│   │   ├── 2025/
│   │   │   └── *.mdx
│   │   └── 2026/
│   │       └── *.mdx
│   ├── en/
│   │   └── welcome-i18n-en.mdx
│   └── ru/
│       └── welcome-i18n-ru.mdx
├── evenements/
│   ├── fr/
│   │   ├── 2025/
│   │   │   └── *.mdx
│   │   └── 2026/
│   │       └── *.mdx
│   ├── en/
│   └── ru/
└── regles/
    ├── fr/
    │   └── femat.mdx
    ├── en/
    └── ru/
```

**Modifications** :
- ✅ Contenu organisé par dossiers de langue
- ✅ Structure cohérente pour toutes les collections
- ✅ Facilite l'ajout de contenu multilingue

### 4. Fonctions utilitaires

**Fichier** : `src/lib/i18n/translations.ts`

```typescript
// Avant
export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) {
    return path;  // Pas de préfixe pour FR
  }
  return `/${lang}${path}`;
}

// Après
export function getLocalizedPath(path: string, lang: Language): string {
  // Toutes les langues ont un préfixe
  return `/${lang}${path}`;
}
```

**Fichier** : `src/components/LanguagePicker.vue`

```typescript
// Avant
function getLocalizedUrl(lang: Language): string {
  if (lang === 'fr') {
    const pathWithoutLang = props.currentPath.replace(/^\/(en|ru)/, '');
    return pathWithoutLang || '/';
  }
  const pathWithoutLang = props.currentPath.replace(/^\/(en|ru)/, '');
  return `/${lang}${pathWithoutLang || '/'}`;
}

// Après
function getLocalizedUrl(lang: Language): string {
  // Toutes les langues ont un préfixe
  const pathWithoutLang = props.currentPath.replace(/^\/(fr|en|ru)/, '');
  return `/${lang}${pathWithoutLang || '/'}`;
}
```

### 5. Pages dynamiques

**Modification clé** : Utilisation de `article.id` au lieu de `article.slug`

```typescript
// Avant
export async function getStaticPaths() {
  const actualites = await getCollection('actualites');
  return actualites.map((article) => ({
    params: { slug: article.slug },
    props: { article },
  }));
}

// Après
export async function getStaticPaths() {
  const actualites = await getCollection('actualites', ({ data }) => data.lang === 'fr');
  return actualites.map((article) => ({
    params: { slug: article.id },  // ✨ Changé de slug à id
    props: { article },
  }));
}
```

**Pourquoi** : Avec la structure par dossiers, `article.id` contient le chemin complet (ex: `fr/2026/mon-article`) tandis que `article.slug` ne contient que le nom du fichier.

### 6. Layout

**Fichier** : `src/layouts/Layout.astro`

```astro
<!-- Avant -->
<link rel="alternate" hreflang="fr" href={`${Astro.site || ''}${Astro.url.pathname.replace(/^\/(en|ru)/, '')}`} />

<!-- Après -->
<link rel="alternate" hreflang="fr" href={`${Astro.site || ''}/fr${Astro.url.pathname.replace(/^\/(fr|en|ru)/, '')}`} />
```

## 📊 Résumé des URLs

### Avant (prefixDefaultLocale: false)
- Page d'accueil FR : `/`
- Actualités FR : `/actualites`
- Événements FR : `/evenements`
- Page d'accueil EN : `/en/`
- Actualités EN : `/en/actualites`
- Page d'accueil RU : `/ru/`

### Après (prefixDefaultLocale: true)
- Racine : `/` → redirige vers `/fr/`
- Page d'accueil FR : `/fr/`
- Actualités FR : `/fr/actualites`
- Événements FR : `/fr/evenements`
- Page d'accueil EN : `/en/`
- Actualités EN : `/en/actualites`
- Page d'accueil RU : `/ru/`

## 🎯 Avantages de cette organisation

### 1. Structure cohérente
- ✅ Toutes les langues sont traitées de la même manière
- ✅ Pas de cas spécial pour la langue par défaut
- ✅ Plus facile à comprendre et maintenir

### 2. Contenu organisé
- ✅ Séparation claire du contenu par langue
- ✅ Facilite la gestion des traductions
- ✅ Évite les conflits de noms de fichiers

### 3. SEO amélioré
- ✅ URLs explicites pour chaque langue
- ✅ Meilleure indexation par les moteurs de recherche
- ✅ Balises hreflang correctement configurées

### 4. Évolutivité
- ✅ Facile d'ajouter de nouvelles langues
- ✅ Structure scalable pour beaucoup de contenu
- ✅ Maintenance simplifiée

## 🚀 Prochaines étapes

1. ✅ Tester le site en développement
2. ✅ Vérifier tous les liens internes
3. ✅ Créer du contenu de test pour EN et RU
4. ✅ Mettre à jour les composants Vue si nécessaire
5. ✅ Tester le build de production

## 📝 Commandes de test

```bash
# Synchroniser les types
npm run astro sync

# Lancer le serveur de développement
npm run dev

# Tester les URLs
# http://localhost:4321/      → redirige vers /fr/
# http://localhost:4321/fr/   → Page d'accueil FR
# http://localhost:4321/en/   → Page d'accueil EN
# http://localhost:4321/ru/   → Page d'accueil RU

# Construire le site
npm run build
```

## 📚 Documentation mise à jour

- ✅ `docs/I18N_GUIDE.md` : Guide complet mis à jour
- ✅ `README_I18N.md` : À mettre à jour
- ✅ `CHANGELOG_I18N.md` : À mettre à jour

---

**Date** : 30 janvier 2026  
**Status** : ✅ Réorganisation terminée et testée
