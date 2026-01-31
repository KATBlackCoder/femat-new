<template>
  <Card class="hover:shadow-lg transition-shadow" :class="cardClass">
    <CardHeader>
      <div class="flex justify-between items-start mb-2">
        <Badge :variant="statusVariant">
          {{ statusText }}
        </Badge>
        <span class="text-sm text-muted-foreground">{{ formattedDate }}</span>
      </div>
      <CardTitle class="text-xl" :class="titleClass">
        <slot name="title">
          <a v-if="href" :href="href" class="hover:text-primary transition-colors">
            {{ title }}
          </a>
          <span v-else>{{ title }}</span>
        </slot>
      </CardTitle>
      <CardDescription class="font-medium" :class="descriptionClass">
        <slot name="type">
          📍 {{ location }}
        </slot>
      </CardDescription>
    </CardHeader>

    <CardContent>
      <slot>
        <p class="text-muted-foreground mb-4">{{ description }}</p>
        <Button :variant="buttonVariant" class="w-full" :as-child="!!href">
          <a v-if="href" :href="href">{{ buttonText }}</a>
          <span v-else>{{ buttonText }}</span>
        </Button>
      </slot>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { computed } from 'vue'

interface Props {
  title: string
  date: string
  location: string
  description?: string
  status?: string
  statusText?: string
  statusVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  href?: string
  buttonText?: string
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  cardClass?: string
  titleClass?: string
  descriptionClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  status: 'upcoming',
  statusText: 'À venir',
  statusVariant: 'secondary',
  buttonText: 'En savoir plus',
  buttonVariant: 'outline',
  cardClass: '',
  titleClass: '',
  descriptionClass: 'text-primary'
})

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})
</script>