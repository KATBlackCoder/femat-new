<template>
  <div class="grid grid-cols-3 gap-4 mb-8">
    <div class="text-center p-4 bg-primary/10 rounded-lg">
      <div class="text-2xl font-bold text-primary">{{ upcomingCount }}</div>
      <div class="text-sm text-muted-foreground">{{ upcomingLabel }}</div>
    </div>
    <div class="text-center p-4 bg-accent/20 rounded-lg">
      <div class="text-2xl font-bold text-accent-foreground">{{ ongoingCount }}</div>
      <div class="text-sm text-muted-foreground">{{ ongoingLabel }}</div>
    </div>
    <div class="text-center p-4 bg-muted rounded-lg">
      <div class="text-2xl font-bold text-muted-foreground">{{ completedCount }}</div>
      <div class="text-sm text-muted-foreground">{{ completedLabel }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  upcomingCount: number
  ongoingCount: number
  completedCount: number
  upcomingLabel?: string
  ongoingLabel?: string
  completedLabel?: string
}

withDefaults(defineProps<Props>(), {
  upcomingLabel: 'À venir',
  ongoingLabel: 'En cours',
  completedLabel: 'Terminés'
})
</script>