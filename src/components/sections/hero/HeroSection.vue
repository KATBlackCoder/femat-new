<template>
  <section class="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-24 md:py-32 overflow-hidden">
    <!-- Gradient overlay pour plus de profondeur -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10"></div>
    <!-- Radial gradient pour effet de lumière -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]"></div>
    <!-- Pattern subtil -->
    <div class="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    
    <div class="container mx-auto px-4 text-center relative z-10">
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
        <span class="bg-gradient-to-r from-primary-foreground via-white to-primary-foreground bg-clip-text text-transparent drop-shadow-2xl">
          {{ title }}
        </span>
      </h1>
      <p class="text-lg md:text-xl lg:text-2xl mb-12 md:mb-16 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
        {{ subtitle }}
      </p>
      <div class="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
        <slot name="actions">
          <Button
            variant="secondary"
            size="lg"
            class="bg-background/95 text-foreground hover:bg-background shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 font-semibold px-8 py-6 text-base"
            as-child
          >
            <a :href="`/${lang}/actualites`">{{ primaryAction }}</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            class="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold px-8 py-6 text-base"
            as-child
          >
            <a :href="`/${lang}/evenements`">{{ secondaryAction }}</a>
          </Button>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

interface Props {
  title: string
  subtitle: string
  lang?: string
  primaryAction?: string
  secondaryAction?: string
}

withDefaults(defineProps<Props>(), {
  lang: "fr",
  primaryAction: "Voir les événements",
  secondaryAction: "Voir les actualités"
})
</script>