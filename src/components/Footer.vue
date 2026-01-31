<template>
  <footer class="bg-secondary text-secondary-foreground py-12 mt-16 border-t-4 border-destructive">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <!-- Logo et description -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-primary/20">
              <slot name="logo">
                <img
                  v-if="logoLoaded"
                  :src="logoSrc"
                  alt="FEMAT Logo"
                  class="w-8 h-8 object-contain"
                  @error="logoLoaded = false"
                />
                <span v-else class="text-white font-bold text-lg bg-primary w-full h-full flex items-center justify-center">T</span>
              </slot>
            </div>
            <div>
              <h3 class="font-bold text-lg">FEMAT</h3>
              <p class="text-xs text-muted-foreground">Taekwondo Mali</p>
            </div>
          </div>
          <p class="text-muted-foreground text-sm mb-4">
            {{ t('footer.description') }}
          </p>
          <div class="flex gap-2">
            <Button variant="outline" size="sm" class="border-muted-foreground/20 text-muted-foreground hover:bg-accent/10">
              📧 {{ t('footer.contact') }}
            </Button>
            <Button variant="outline" size="sm" class="border-muted-foreground/20 text-muted-foreground hover:bg-accent/10">
              📍 {{ t('footer.location') }}
            </Button>
          </div>
        </div>

        <!-- Liens rapides -->
        <div>
          <h4 class="font-semibold mb-4">{{ t('footer.quickLinks') }}</h4>
          <ul class="space-y-2 text-sm">
            <li><a :href="getLocalizedHref('/')" class="text-muted-foreground hover:text-sidebar-foreground transition-colors">{{ t('nav.home') }}</a></li>
            <li><a :href="getLocalizedHref('/actualites')" class="text-muted-foreground hover:text-sidebar-foreground transition-colors">{{ t('nav.news') }}</a></li>
            <li><a :href="getLocalizedHref('/evenements')" class="text-muted-foreground hover:text-sidebar-foreground transition-colors">{{ t('nav.events') }}</a></li>
            <li><a :href="getLocalizedHref('/federation')" class="text-muted-foreground hover:text-sidebar-foreground transition-colors">{{ t('nav.federation') }}</a></li>
          </ul>
        </div>

        <!-- Informations -->
        <div>
          <h4 class="font-semibold mb-4">{{ t('footer.info') }}</h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>📞 +223 77 55 19 85</li>
            <li>✉️ femat3@yahoo.fr</li>
            <li>📍 Bamako, Mali</li>
            <li>🕒 {{ t('footer.hours') }}</li>
          </ul>
        </div>
      </div>

      <Separator class="my-8 bg-border" />

      <div class="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>{{ t('footer.copyrightFull') }}</p>
        <div class="flex gap-4 mt-4 md:mt-0">
          <a href="#" class="hover:text-sidebar-foreground transition-colors">{{ t('footer.privacy') }}</a>
          <a href="#" class="hover:text-sidebar-foreground transition-colors">{{ t('footer.terms') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { translations, type Language } from '@/lib/i18n'

interface Props {
  initialPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialPath: '/fr/'
})

// Logo state
const logoLoaded = ref(true)
const logoSrc = ref('/logo_femat.webp')

// Current path reactive state
const currentPath = ref<string>(props.initialPath)

// Get current language from path
const currentLang = computed<Language>(() => {
  const match = currentPath.value.match(/^\/(fr|en|ru)/)
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

// Get localized href
const getLocalizedHref = (path: string): string => {
  return `/${currentLang.value}${path === '/' ? '/' : path}`
}

// Update current path on navigation
const updatePath = () => {
  if (typeof window !== 'undefined') {
    currentPath.value = window.location.pathname
  }
}

onMounted(() => {
  updatePath()
  window.addEventListener('popstate', updatePath)
})

onUnmounted(() => {
  window.removeEventListener('popstate', updatePath)
})
</script>