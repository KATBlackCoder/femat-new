// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
   
  // Site URL de production
  site: 'https://www.femat.ml',
  
  // Configuration i18n
  i18n: {
    locales: ['fr', 'en', 'ru'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: true
    }
  },

  // Optimisations de build
  build: {
    inlineStylesheets: 'auto',
  },

  // Optimisations d'images
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },


  integrations: [
    vue({
    template: {
      compilerOptions: {
        comments: false,
      },
    },
  }), mdx(), sitemap({
    i18n: {
      defaultLocale: 'fr',
      locales: { fr: 'fr-FR', en: 'en-US', ru: 'ru-RU' },
    },
  })],
    vite: {
      plugins: [tailwindcss()],
    },

  // Optimisations générales
  compressHTML: true,
  output: 'static',
});