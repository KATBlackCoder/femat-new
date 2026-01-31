<template>
  <!-- Version Desktop (avec label) -->
  <DropdownMenu v-if="variant === 'desktop'">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="gap-2 px-3">
        <Globe class="w-4 h-4" />
        <span class="text-sm font-medium">{{ currentLanguageLabel }}</span>
        <ChevronDown class="w-3 h-3" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuItem
        v-for="(label, code) in languages"
        :key="code"
        :class="{ 'bg-accent': currentLang === code }"
        as-child
      >
        <a :href="getLocalizedUrl(code as Language)" class="flex items-center gap-2 cursor-pointer w-full">
          <span>{{ getFlagEmoji(code) }}</span>
          <span>{{ label }}</span>
          <Check v-if="currentLang === code" class="w-4 h-4 ml-auto" />
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <!-- Version Mobile (icône seulement) -->
  <DropdownMenu v-else-if="variant === 'mobile'">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="text-muted-foreground hover:text-primary hover:bg-accent">
        <Globe class="w-5 h-5" />
        <span class="sr-only">{{ t('nav.language') }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuItem
        v-for="(label, code) in languages"
        :key="code"
        :class="{ 'bg-accent': currentLang === code }"
        as-child
      >
        <a :href="getLocalizedUrl(code as Language)" class="flex items-center gap-2 cursor-pointer w-full">
          <span>{{ getFlagEmoji(code) }}</span>
          <span>{{ label }}</span>
          <Check v-if="currentLang === code" class="w-4 h-4 ml-auto" />
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <!-- Version Buttons (pour le menu Sheet) -->
  <div v-else-if="variant === 'buttons'" class="space-y-2">
    <p class="text-sm font-medium text-muted-foreground mb-2">{{ t('nav.language') }}</p>
    <div class="flex flex-wrap gap-2">
      <Button
        v-for="(label, code) in languages"
        :key="code"
        :variant="currentLang === code ? 'default' : 'outline'"
        size="sm"
        as-child
      >
        <a :href="getLocalizedUrl(code as Language)" class="flex items-center gap-1">
          <span>{{ getFlagEmoji(code) }}</span>
          <span>{{ label }}</span>
        </a>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, ChevronDown, Check } from 'lucide-vue-next'
import { languages, translations, getFlagEmoji, type Language } from '@/lib/i18n'

interface Props {
  currentPath: string
  variant?: 'desktop' | 'mobile' | 'buttons'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'desktop'
})

// Get current language from path
const currentLang = computed<Language>(() => {
  const match = props.currentPath.match(/^\/(fr|en|ru)/)
  return (match ? match[1] : 'fr') as Language
})

// Translation function
const t = (key: string): string => {
  const keys = key.split('.')
  let value: unknown = translations[currentLang.value]
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return key
    }
  }
  return typeof value === 'string' ? value : key
}

// Get current language label
const currentLanguageLabel = computed(() => languages[currentLang.value])

// Get URL for a different language (route lang + content lang in slugs)
const getLocalizedUrl = (lang: Language): string => {
  let pathWithoutLang = props.currentPath.replace(/^\/(fr|en|ru)/, '')
  // Map content lang in slugs: /actualites/fr/... -> /actualites/en/..., /evenements/en/... -> /evenements/fr/...
  if (/^\/(actualites|evenements)\/(fr|en|ru)\//.test(pathWithoutLang)) {
    pathWithoutLang = pathWithoutLang.replace(/^\/(actualites|evenements)\/(fr|en|ru)\//, `/$1/${lang}/`)
  }
  return `/${lang}${pathWithoutLang || '/'}`
}
</script>
