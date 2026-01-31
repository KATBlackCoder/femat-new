<template>
  <section :class="containerClass">
    <div class="container mx-auto px-4 py-20 md:py-24">
      <h2 v-if="title" class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{{ title }}</h2>
      <div :class="gridClass">
        <Card
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="text-center hover:shadow-2xl transition-all duration-300 border hover:scale-[1.02] hover:-translate-y-1 bg-card/50 backdrop-blur-sm"
          :class="[
            index === 0 ? 'border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10' : '',
            index === 1 ? 'border-accent/30 bg-accent/5 hover:border-accent/50 hover:bg-accent/10' : '',
            index === 2 ? 'border-destructive/30 bg-destructive/5 hover:border-destructive/50 hover:bg-destructive/10' : '',
            index === 3 ? 'border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10' : ''
          ]"
        >
          <CardContent class="pt-8 pb-8 px-6">
            <div 
              class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
              :class="[
                index === 0 ? 'text-primary' : '',
                index === 1 ? 'text-accent-foreground' : '',
                index === 2 ? 'text-destructive' : '',
                index === 3 ? 'text-primary' : ''
              ]"
            >{{ stat.nombre }}</div>
            <div class="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">{{ stat.label }}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'

interface Stat {
  nombre: string
  label: string
}

interface Props {
  stats: Stat[]
  title?: string
  containerClass?: string
  gridClass?: string
}

withDefaults(defineProps<Props>(), {
  title: "FEMAT en chiffres",
  containerClass: "bg-background",
  gridClass: "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
})
</script>