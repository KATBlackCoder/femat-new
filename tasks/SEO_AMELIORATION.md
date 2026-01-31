# Étapes d'amélioration SEO — FEMAT (Astro + cPanel)

## Contexte

- **Framework** : Astro (output: static)
- **Hébergement** : cPanel
- **i18n** : fr, en, ru (prefixDefaultLocale: true)

---

## 1. Configuration Astro (`astro.config.mjs`)

- [x] **`site`** : définir l’URL de production (ex. `https://www.femat.ml`)
  - Utilisé pour sitemap, canonical et URLs absolues
  - Obligatoire pour générer un sitemap correct

- [x] **Intégration sitemap** : `@astrojs/sitemap`
  - Génère automatiquement `sitemap-index.xml` et `sitemap-*.xml`
  - Comprend les locales i18n
  - Commande : `pnpm add @astrojs/sitemap`

---

## 2. Métadonnées par page

- [x] **`<title>`** : unique et descriptif (50–60 caractères)
- [x] **`<meta name="description">`** : 150–160 caractères, par page
- [x] **`og:image`** et **`twitter:image`** : image de partage par page ou par défaut
- [x] **`og:url`** et **`og:locale`** / **`og:locale:alternate`** : pour le multilingue
- [x] **Canonical** : `<link rel="canonical">` avec URL absolue (via `site`)

---

## 3. Sitemap et robots.txt

- [x] **sitemap.xml** : généré par `@astrojs/sitemap` à la racine du build
- [x] **robots.txt** : dans `public/robots.txt`
  - Référence vers `https://www.femat.ml/sitemap-index.xml`
  - Blocage éventuel de chemins à exclure

---

## 4. hreflang et multilingue

- [x] **hreflang** : déjà présents sur le Layout, vérifier qu’ils sont corrects
- [x] **`x-default`** : ajouter une balise hreflang avec `hreflang="x-default"` pointant vers la version par défaut (fr)
- [x] **og:locale:alternate** : ajouter pour les autres langues

---

## 5. Structure et contenu

- [x] **Balises sémantiques** : `<main>`, `<article>`, `<header>`, `<nav>`, `<footer>`
- [x] **Hiérarchie H1–H6** : un seul H1 par page, ordre cohérent
- [x] **Données structurées (JSON-LD)** : Organisation, WebSite, BreadcrumbList, Article/Event selon les pages
  - Utile pour les rich snippets dans les SERP

---

## 6. Performance (Core Web Vitals)

- [ ] **Images** : OptimizedImage déjà utilisé, vérifier format WebP/AVIF et lazy loading
- [ ] **LCP** : preload des images critiques, polices si besoin
- [ ] **CLS** : dimensions explicites sur les images
- [ ] **Compression** : `compressHTML: true` déjà activé

---

## 7. Déploiement cPanel

- [ ] **Dossier de déploiement** : contenu de `dist/` vers `public_html/` (ou sous-dossier)
- [ ] **`.htaccess`** :
  - Redirections `www` → non-www ou l’inverse
  - HTTPS forcé
  - GZIP / Brotli si le serveur le permet
  - Redirections 301 pour anciennes URLs si migration
- [ ] **SSL** : certificat Let’s Encrypt via cPanel

---

## 8. Suivi et validation

- [ ] **Google Search Console** : site ajouté et sitemap envoyé
- [ ] **Google Analytics 4** (ou équivalent) : suivi de trafic
- [ ] **Tests** :
  - [PageSpeed Insights](https://pagespeed.web.dev/)
  - [Rich Results Test](https://search.google.com/test/rich-results)
  - [Schema Markup Validator](https://validator.schema.org/)

---

## Ordre recommandé

1. Configurer `site` et ajouter `@astrojs/sitemap`
2. Créer `robots.txt` dans `public/`
3. Compléter les meta (og:image, canonical, x-default)
4. Mettre en place les redirections et `.htaccess` sur cPanel
5. Ajouter les données structurées JSON-LD
6. Configurer Search Console et Analytics
