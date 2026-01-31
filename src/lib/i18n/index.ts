// Import translations from locales
import frTranslations from './locales/fr.json';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

export const languages = {
  fr: 'Français',
  en: 'English',
  ru: 'Русский',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'fr';

// Merged translations object
export const translations: Record<Language, typeof frTranslations> = {
  fr: frTranslations,
  en: enTranslations,
  ru: ruTranslations,
};

/**
 * Get a nested value from an object using dot notation
 * Example: getNestedValue(obj, 'nav.home') => obj.nav.home
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let value: unknown = obj;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return path; // Return the key if not found
    }
  }
  
  return typeof value === 'string' ? value : path;
}

/**
 * Create a translation function for a specific language
 * Usage in Astro: const t = useTranslations('fr');
 */
export function useTranslations(lang: Language) {
  return function t(key: string): string {
    const value = getNestedValue(translations[lang] as unknown as Record<string, unknown>, key);
    if (value === key) {
      // Fallback to default language
      return getNestedValue(translations[defaultLang] as unknown as Record<string, unknown>, key);
    }
    return value;
  };
}

/**
 * Get the language from the URL
 */
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Language;
  return defaultLang;
}

/**
 * Get a localized path
 */
export function getLocalizedPath(path: string, lang: Language): string {
  return `/${lang}${path}`;
}

/**
 * Get flag emoji for a language
 */
export function getFlagEmoji(lang: string): string {
  const flags: Record<string, string> = {
    fr: '🇫🇷',
    en: '🇬🇧',
    ru: '🇷🇺',
  };
  return flags[lang] || '🌐';
}

// Re-export translations type for Vue components
export type Translations = typeof frTranslations;
