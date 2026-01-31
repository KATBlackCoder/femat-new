<template>
  <Card class="hover:shadow-lg transition-shadow">
    <CardHeader>
      <div class="flex justify-between items-start">
        <div>
          <CardTitle class="text-lg">{{ titre }}</CardTitle>
          <CardDescription>{{ description }}</CardDescription>
        </div>
        <Badge variant="secondary">{{ type }}</Badge>
      </div>
    </CardHeader>

    <CardContent>
      <div class="flex justify-between items-center">
        <div class="text-sm text-muted-foreground">
          <div>Taille: {{ taille }}</div>
          <div>Date: {{ formattedDate }}</div>
        </div>
        <Button variant="outline" size="sm">
          <slot name="download-button">
            📄 Télécharger
          </slot>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { computed } from 'vue'

interface Props {
  titre: string
  description: string
  taille: string
  type: string
  date: string
}

const props = defineProps<Props>()

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString('fr-FR')
})
</script>