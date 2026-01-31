<template>
  <div>
    <!-- Liste paginée -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <EventCard
        v-for="event in paginatedItems"
        :key="event.id"
        :title="event.data.title"
        :date="event.data.date.toISOString().split('T')[0]"
        :location="event.data.location"
        :description="event.data.description"
        :status="event.data.status"
        :statusText="getStatusText(event.data.status)"
        :statusVariant="event.data.status === 'completed' ? 'outline' : getStatusColor(event.data.status)"
        :href="`/${lang}/evenements/${event.id}`"
        :buttonText="buttonText"
        :cardClass="cardClass"
        :buttonVariant="buttonVariant"
      >
        <template #type>
          {{ getTypeText(event.data.type) }}
        </template>
        <template>
          <div class="space-y-1 text-sm text-muted-foreground mb-4">
            <div v-if="event.data.registered && event.data.capacity">
              👥 {{ event.data.registered }}/{{ event.data.capacity }} inscrits
            </div>
            <div v-if="event.data.price">
              💰 {{ event.data.price }}
            </div>
            <div v-if="event.data.registered && !event.data.capacity">
              👥 {{ event.data.registered }} participants
            </div>
          </div>
        </template>
      </EventCard>
    </div>
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <Pagination
        v-slot="{ page }"
        :items-per-page="itemsPerPage"
        :total="items.length"
        :default-page="currentPage"
        @update:page="handlePageChange"
      >
        <PaginationContent v-slot="{ items: paginationItems }">
          <PaginationPrevious />
          <template v-for="(item, index) in paginationItems" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else-if="item.type === 'ellipsis'" :index="index" />
          </template>
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import EventCard from '@/components/cards/event/EventCard.vue'

interface Props {
  items: any[]
  itemsPerPage: number
  lang?: string
  initialPage?: number
  buttonText?: string
  cardClass?: string
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'fr',
  initialPage: 1,
  buttonText: 'Voir les détails',
  cardClass: '',
  buttonVariant: 'outline'
})

const currentPage = ref(props.initialPage)

const totalPages = computed(() => {
  return Math.ceil(props.items.length / props.itemsPerPage)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return props.items.slice(start, end)
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming': return 'secondary'
    case 'ongoing': return 'default'
    case 'completed': return 'outline'
    default: return 'secondary'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'upcoming': return 'À venir'
    case 'ongoing': return 'En cours'
    case 'completed': return 'Terminé'
    default: return status
  }
}

const getTypeText = (type: string) => {
  switch (type) {
    case 'competition': return '🏆 Compétition'
    case 'formation': return '🎓 Formation'
    case 'passage-grades': return '🥋 Passage de grades'
    case 'stage': return '⚽ Stage'
    case 'conference': return '🎤 Conférence'
    default: return '📅 Événement'
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(() => props.items.length, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1
  }
})
</script>
