<template>
  <Card
    class="group relative overflow-hidden border-0 bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/5"
  >
    <a :href="href" class="block">
      <!-- Image -->
      <div
        v-if="image"
        class="relative aspect-[16/10] overflow-hidden bg-muted"
      >
        <img
          :src="image"
          :alt="title"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <div class="absolute left-3 top-3 flex flex-wrap gap-1.5">
        </div>
        <div
          class="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
        >
          {{ formattedDate }}
        </div>
      </div>

      <!-- Fallback when no image -->
      <div
        v-else
        class="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-muted to-muted/50"
      >
        <span class="text-4xl text-muted-foreground/40">📰</span>
        <div v-if="featured" class="absolute right-3 top-3">
          <Badge variant="secondary" class="text-xs">
            À la une
          </Badge>
        </div>
        <div class="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {{ formattedDate }}
        </div>
      </div>

      <CardHeader class="pb-3 pt-4">
        <div v-if="!image && author" class="mb-2 text-xs text-muted-foreground">
          {{ author }}
        </div>
        <CardTitle class="line-clamp-2 text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
          {{ title }}
        </CardTitle>
        <CardDescription class="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {{ description }}
        </CardDescription>
      </CardHeader>

      <CardContent class="pt-0">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div v-if="displayTags.length" class="flex flex-wrap gap-1">
            <Badge
              v-for="tag in displayTags"
              :key="tag"
              variant="secondary"
              class="text-xs font-normal"
            >
              #{{ tag }}
            </Badge>
          </div>
          <span
            class="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2"
          >
            {{ readMoreText }}
            <span aria-hidden>→</span>
          </span>
        </div>
      </CardContent>
    </a>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { computed } from 'vue'

interface Props {
  title: string
  description: string
  date: Date
  image?: string
  featured?: boolean
  tags?: string[]
  author?: string
  href: string
  readMoreText?: string
  maxTags?: number
}

const props = withDefaults(defineProps<Props>(), {
  readMoreText: 'Lire la suite',
  maxTags: 2
})

const formattedDate = computed(() => {
  return props.date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})

const displayTags = computed(() => {
  return props.tags?.slice(0, props.maxTags) || []
})
</script>
