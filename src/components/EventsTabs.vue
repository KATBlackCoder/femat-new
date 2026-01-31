<template>
  <div class="w-full">
    <Tabs default-value="upcoming" class="w-full">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="upcoming">
          📅 À venir
          <Badge v-if="upcomingCount > 0" variant="secondary" class="ml-2">{{ upcomingCount }}</Badge>
        </TabsTrigger>
        <TabsTrigger value="ongoing">
          🎯 En cours
          <Badge v-if="ongoingCount > 0" variant="default" class="ml-2">{{ ongoingCount }}</Badge>
        </TabsTrigger>
        <TabsTrigger value="completed">
          ✅ Terminés
          <Badge v-if="completedCount > 0" variant="outline" class="ml-2">{{ completedCount }}</Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" class="space-y-8 mt-8">
        <div v-if="upcomingCount === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">Aucun événement à venir pour le moment.</p>
        </div>
        <PaginatedEvents
          v-else
          :items="upcomingItems"
          :items-per-page="3"
          :lang="lang"
          button-text="Voir les détails"
        />
      </TabsContent>

      <TabsContent value="ongoing" class="space-y-8 mt-8">
        <div v-if="ongoingCount === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">Aucun événement en cours pour le moment.</p>
        </div>
        <PaginatedEvents
          v-else
          :items="ongoingItems"
          :items-per-page="3"
          :lang="lang"
          button-text="Suivre l'événement"
          card-class="border-green/20 bg-green-light"
          button-variant="default"
        />
      </TabsContent>

      <TabsContent value="completed" class="space-y-8 mt-8">
        <div v-if="completedCount === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">Aucun événement terminé pour le moment.</p>
        </div>
        <PaginatedEvents
          v-else
          :items="completedItems"
          :items-per-page="3"
          :lang="lang"
          button-text="Voir les résultats"
          card-class="opacity-75"
        />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import PaginatedEvents from '@/components/PaginatedEvents.vue'

interface Props {
  upcomingItems: any[]
  ongoingItems: any[]
  completedItems: any[]
  lang?: string
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'fr'
})

const upcomingCount = props.upcomingItems.length
const ongoingCount = props.ongoingItems.length
const completedCount = props.completedItems.length
</script>
