<template>
  <Card class="hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle class="text-lg">{{ nom }}</CardTitle>
      <CardDescription class="font-medium text-primary">
        {{ poste }}
      </CardDescription>
    </CardHeader>

    <CardContent>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-sm text-muted-foreground">Région:</span>
          <Badge variant="outline">{{ region }}</Badge>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-muted-foreground">Expérience:</span>
          <span class="text-sm font-medium">{{ experience }}</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Props {
  nom: string
  poste: string
  region: string
  experience: string
}

defineProps<Props>()
</script>