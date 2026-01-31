import { defineCollection, z } from 'astro:content';

/* Schémas alignés sur la structure femat-nuxt, adaptés pour Astro MDX */

const actualitesSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().describe('Résumé ou chapô pour les listes et SEO'),
  lang: z.enum(['fr', 'en', 'ru']).default('fr').describe('Langue du contenu'),
  image: z.string().optional().describe('Image de couverture'),
  images: z.array(z.string()).optional().describe('Galerie de photos (URLs ou chemins)'),
  video: z.string().optional().describe('URL d\'une vidéo principale (YouTube, Vimeo, etc.)'),
  videos: z.array(z.string()).optional().describe('Plusieurs vidéos (URLs)'),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false).describe('Mise en avant (accueil, à la une)'),
  // Champs optionnels présents dans le contenu existant
  category: z.string().optional(),
  published: z.boolean().optional(),
});

const evenementsSchema = z
  .object({
    title: z.string(),
    date: z.coerce.date().describe('Date de début'),
    endDate: z.coerce.date().optional().describe('Date de fin'),
    description: z.string(),
    lang: z.enum(['fr', 'en', 'ru']).default('fr').describe('Langue du contenu'),
    location: z.string().describe('Lieu (ville, salle, adresse)'),
    type: z.enum([
      'competition',
      'formation',
      'passage-grades',
      'stage',
      'conference',
      'autre',
    ]),
    image: z.string().optional().describe('Image de couverture / affiche'),
    images: z.array(z.string()).optional().describe('Galerie photos de l\'événement'),
    capacity: z.number().optional().describe('Nombre de places'),
    registered: z.number().optional().describe('Nombre d\'inscrits'),
    price: z.string().optional().describe('Tarif ou gratuit'),
    contact: z.string().optional().describe('Contact / lien inscription'),
    infoUrl: z.string().optional().describe('Lien vers plus d\'infos (PDF, page externe)'),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false).describe('Mise en avant (accueil, calendrier)'),
    // Champs optionnels présents dans le contenu existant
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    published: z.boolean().optional(),
  })
  .transform((data) => {
    const now = new Date();
    const startDate = data.date;
    const endDate = data.endDate;

    let status: 'upcoming' | 'ongoing' | 'completed';

    if (now < startDate) {
      status = 'upcoming';
    } else if (endDate && now > endDate) {
      status = 'completed';
    } else {
      status = 'ongoing';
    }

    return {
      ...data,
      status,
    };
  });

const reglesSchema = z.object({
  title: z.string().describe('Titre de la section ou de l\'article'),
  description: z.string().optional().describe('Résumé court (optionnel)'),
  lang: z.enum(['fr', 'en', 'ru']).default('fr').describe('Langue du contenu'),
  part: z.string().optional().describe('Partie / titre principal (ex. « Partie I », « Titre 1 »)'),
  chapter: z.string().optional().describe('Chapitre (ex. « Chapitre 2 »)'),
  article: z.string().optional().describe('Référence article (ex. « Article 5 »)'),
  category: z.string().optional().describe('Catégorie : discipline, compétition, licences, etc.'),
  order: z.number().optional().describe('Ordre d\'affichage (numéro pour tri)'),
  dateApproved: z.coerce.date().optional().describe('Date d\'approbation du règlement'),
});

export const collections = {
  actualites: defineCollection({
    type: 'content',
    schema: actualitesSchema,
  }),
  evenements: defineCollection({
    type: 'content',
    schema: evenementsSchema,
  }),
  regles: defineCollection({
    type: 'content',
    schema: reglesSchema,
  }),
};
