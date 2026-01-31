---
name: femat-content
description: Creates actualités (news) and/or événements (events) MDX content for the FEMAT site, following src/content/config.ts schemas and i18n structure (fr, en, ru). Use when adding news articles, events, or when the user asks to create content in src/content/actualites or src/content/evenements.
---

# FEMAT Content Creation

## Structure

Content is organized by **language folders** (`fr/`, `en/`, `ru/`) then by **year**:

```
src/content/
├── actualites/
│   ├── fr/{year}/slug.mdx
│   ├── en/{year}/slug.mdx
│   └── ru/{year}/slug.mdx
└── evenements/
    ├── fr/{year}/YYYY-MM-DD-slug.mdx
    ├── en/{year}/YYYY-MM-DD-slug.mdx
    └── ru/{year}/YYYY-MM-DD-slug.mdx
```

**Slug rules**:
- Actualités: lowercase, hyphens, no accents (e.g. `election-president-femat.mdx`)
- Événements: `YYYY-MM-DD-slug.mdx` format for chronology

## Actualités (News)

### Required frontmatter

```yaml
title: "string"        # Article title
date: YYYY-MM-DD       # Publication date
description: "string"  # Summary for lists and SEO
lang: fr | en | ru     # Always explicit
```

### Optional frontmatter

```yaml
image: "/images/actualites/folder/1.jpg"
images: ["/path1", "/path2"]
video: "https://..."
videos: ["https://..."]
author: "FEMAT"
tags: ["taekwondo", "event-name"]
featured: true
published: true
category: "actualite"
```

### Template

```markdown
---
title: "Title in target language"
lang: fr
description: "Summary in target language (150-200 chars for SEO)"
date: 2026-01-30
author: "FEMAT"
category: "actualite"
tags:
  - taekwondo
  - relevant-tag
featured: false
published: true
image: "/images/actualites/folder/image.jpg"
---

# Title (repeat)

**City, Date** – Opening paragraph with key info.

## Section 1

Content...

## Section 2

Content...

---

*Source or closing note*
```

## Événements (Events)

### Required frontmatter

```yaml
title: "string"
date: YYYY-MM-DD
description: "string"
lang: fr | en | ru
location: "string"
type: competition | formation | passage-grades | stage | conference | autre
```

### Optional frontmatter

```yaml
endDate: YYYY-MM-DD
startTime: "08:00"
endTime: "18:00"
image: "/path"
images: []
capacity: number
registered: number
price: "string"
contact: "string"
infoUrl: "string"
tags: []
featured: false
published: true
```

### Type labels

| type | FR | EN | RU |
|------|----|----|-----|
| competition | Compétition | Competition | Соревнование |
| formation | Formation | Training | Тренировка |
| passage-grades | Passage de grades | Belt test | Экзамен на пояс |
| stage | Stage | Seminar | Семинар |
| conference | Conférence | Conference | Конференция |
| autre | Autre | Other | Другое |

### Template

```markdown
---
title: "Event title"
lang: fr
date: 2026-01-30
endDate: 2026-01-31
location: "Venue, City"
description: "Brief description"
type: "conference"
startTime: "08:00"
endTime: "18:00"
featured: false
published: true
---

# Event title

## Section 1

Content...

## Contact

Details...
```

## i18n Workflow

When creating content in **3 languages**:

1. **Create all 3 files** with same slug in `fr/`, `en/`, `ru/`
2. **Translate** title, description, body content
3. **Keep** dates, tags, image paths identical across languages
4. **Use** consistent slug across all 3 files for association

## File paths

- Actualité FR: `src/content/actualites/fr/{year}/{slug}.mdx`
- Actualité EN: `src/content/actualites/en/{year}/{slug}.mdx`
- Actualité RU: `src/content/actualites/ru/{year}/{slug}.mdx`
- Événement FR: `src/content/evenements/fr/{year}/{YYYY-MM-DD-slug}.mdx`
- Événement EN: `src/content/evenements/en/{year}/{YYYY-MM-DD-slug}.mdx`
- Événement RU: `src/content/evenements/ru/{year}/{YYYY-MM-DD-slug}.mdx`

## Checklist before saving

- [ ] `lang` is explicit (fr, en, or ru)
- [ ] `date` format is YYYY-MM-DD
- [ ] Slug matches across languages for same content
- [ ] Événements filename uses YYYY-MM-DD prefix
- [ ] Image paths exist or use placeholder `/images/actualites/{folder}/`
- [ ] Run `npm run astro sync` after adding content

## Additional resources

- For complete examples, see [examples.md](examples.md)
- Schema source: `src/content/config.ts`
