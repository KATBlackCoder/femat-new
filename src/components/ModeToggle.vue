<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'

const isDark = ref(false)

// Écouter les changements externes (si le script inline change le thème)
let observer: MutationObserver | null = null

// Détecter l'état initial et configurer l'observer
onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  
  if (typeof window !== 'undefined') {
    observer = new MutationObserver(() => {
      const currentIsDark = document.documentElement.classList.contains('dark')
      if (currentIsDark !== isDark.value) {
        isDark.value = currentIsDark
      }
    })
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
  }
})

const toggleMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <Button 
    variant="outline" 
    size="icon" 
    class="relative"
    @click="toggleMode"
    :title="isDark ? 'Mode sombre' : 'Mode clair'"
  >
    <Icon 
      icon="radix-icons:sun" 
      :class="[
        'h-[1.2rem] w-[1.2rem] transition-all',
        isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'
      ]"
    />
    <Icon 
      icon="radix-icons:moon" 
      :class="[
        'absolute h-[1.2rem] w-[1.2rem] transition-all',
        isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
      ]"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
