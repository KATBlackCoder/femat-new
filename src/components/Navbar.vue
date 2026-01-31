<template>
  <header class="border-b border-border bg-background sticky top-0 z-50 shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex h-16 md:h-20 items-center justify-between">
        <!-- Logo -->
        <a :href="getLocalizedHref('/')" class="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200 group">
          <div class="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105 shrink-0 overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40">
            <img 
              v-if="logoLoaded"
              :src="logoSrc" 
              alt="FEMAT Logo" 
              class="w-8 h-8 md:w-10 md:h-10 object-contain"
              @error="logoLoaded = false"
            />
            <span v-else class="text-white font-bold text-xl md:text-2xl">T</span>
          </div>
          <div>
            <p class="font-bold text-xl md:text-2xl text-foreground leading-tight group-hover:text-primary transition-colors">FEMAT</p>
            <p class="text-xs md:text-sm text-muted-foreground leading-tight">Taekwondo Mali</p>
          </div>
        </a>

        <!-- Navigation Desktop -->
        <nav class="hidden lg:flex items-center gap-1">
          <a
            v-for="item in localizedNavItems"
            :key="item.href"
            :href="item.href"
            :class="[
              'inline-flex h-10 w-max items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200',
              isActive(item.href)
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg font-semibold'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            ]"
          >
            {{ item.label }}
          </a>
          
          <!-- Language Selector -->
          <LanguageSelector :currentPath="currentPath" variant="desktop" />
          
          <ModeToggle />
        </nav>

        <!-- Menu Mobile avec Sheet -->
        <div class="lg:hidden flex items-center gap-2">
          <!-- Language Selector Mobile -->
          <LanguageSelector :currentPath="currentPath" variant="mobile" />
          
          <ModeToggle />
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="ghost" size="icon" class="text-muted-foreground hover:text-primary hover:bg-accent">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span class="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" class="w-80 bg-background">
              <SheetHeader class="text-left border-b pb-4 mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                    <img 
                      v-if="logoLoaded"
                      :src="logoSrc" 
                      alt="FEMAT Logo" 
                      class="w-8 h-8 object-contain"
                      @error="logoLoaded = false"
                    />
                    <span v-else class="text-white font-bold text-lg">T</span>
                  </div>
                  <div>
                    <SheetTitle class="text-lg font-bold text-foreground">FEMAT</SheetTitle>
                    <SheetDescription class="text-muted-foreground">Taekwondo Mali</SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              <nav class="flex flex-col space-y-1">
                <Button
                  v-for="item in localizedNavItems"
                  :key="item.href"
                  :variant="isActive(item.href) ? 'default' : 'ghost'"
                  :class="[
                    'justify-start transition-all duration-200 w-full text-base h-11',
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm font-semibold'
                      : 'hover:bg-accent hover:text-accent-foreground text-muted-foreground'
                  ]"
                  as-child
                >
                  <a :href="item.href">{{ item.label }}</a>
                </Button>
                
                <!-- Language section in mobile menu -->
                <div class="pt-4 border-t mt-4 px-4">
                  <LanguageSelector :currentPath="currentPath" variant="buttons" />
                </div>
                
                <div class="pt-4 border-t mt-4">
                  <ModeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import ModeToggle from './ModeToggle.vue'
import LanguageSelector from './LanguageSelector.vue'
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

// Current path reactive state - initialize with prop from Astro
const currentPath = ref<string>(props.initialPath)

// Get current language from path
const currentLang = computed<Language>(() => {
  const match = currentPath.value.match(/^\/(fr|en|ru)/)
  return (match ? match[1] : 'fr') as Language
})

// Translation function using centralized translations
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

// Navigation items (base paths without language prefix)
const navItemsBase = [
  { path: '/', key: 'nav.home' },
  { path: '/actualites', key: 'nav.news' },
  { path: '/evenements', key: 'nav.events' },
  { path: '/federation', key: 'nav.federation' },
]

// Computed localized nav items
const localizedNavItems = computed(() => {
  return navItemsBase.map(item => ({
    href: `/${currentLang.value}${item.path === '/' ? '/' : item.path}`,
    label: t(item.key),
  }))
})

// Get localized href
const getLocalizedHref = (path: string): string => {
  return `/${currentLang.value}${path === '/' ? '/' : path}`
}

// Update current path
const updatePath = () => {
  if (typeof window !== 'undefined') {
    currentPath.value = window.location.pathname
  }
}

// Check if link is active
const isActive = (href: string) => {
  // Get the path without language prefix for comparison
  const currentWithoutLang = currentPath.value.replace(/^\/(fr|en|ru)/, '') || '/'
  const hrefWithoutLang = href.replace(/^\/(fr|en|ru)/, '') || '/'
  
  if (hrefWithoutLang === '/') {
    return currentWithoutLang === '/' || currentWithoutLang === ''
  }
  return currentWithoutLang.startsWith(hrefWithoutLang)
}

// Handle navigation clicks
const handleClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const link = target.closest('a[href]')
  if (link) {
    const href = link.getAttribute('href')
    if (href && href.startsWith('/')) {
      // Small delay to allow Astro navigation to complete
      setTimeout(updatePath, 150)
    }
  }
}

// Initialize and listen for navigation changes
onMounted(() => {
  updatePath()
  // Listen for popstate events (browser back/forward)
  window.addEventListener('popstate', updatePath)
  // Listen to clicks on navigation links
  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  window.removeEventListener('popstate', updatePath)
  document.removeEventListener('click', handleClick)
})
</script>