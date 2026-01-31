<template>
  <div class="space-y-10">
    <!-- Grid -->
    <div
      class="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Liste des articles"
    >
      <ArticleCard
        v-for="article in paginatedItems"
        :key="article.id"
        :title="article.data.title"
        :description="article.data.description"
        :date="article.data.date"
        :image="article.data.image"
        :featured="article.data.featured"
        :tags="article.data.tags"
        :author="article.data.author"
        :href="`/${lang}/actualites/${article.id}`"
        :read-more-text="readMoreText"
      />
    </div>

    <!-- Pagination -->
    <nav
      v-if="totalPages > 1"
      class="flex flex-col items-center gap-4 border-t border-border pt-10"
      aria-label="Pagination des articles"
    >
      <p class="text-sm text-muted-foreground">
        {{ paginationPageLabel }} {{ currentPage }} {{ paginationOfLabel }} {{ totalPages }}
        <span class="ml-1">({{ items.length }} {{ items.length > 1 ? paginationArticlesLabel : paginationArticleLabel }})</span>
      </p>
      <Pagination
        v-slot="{ page }"
        :items-per-page="itemsPerPage"
        :total="items.length"
        :default-page="currentPage"
        @update:page="handlePageChange"
      >
        <PaginationContent
          v-slot="{ items: paginationItems }"
          class="flex flex-wrap items-center justify-center gap-1"
        >
          <PaginationPrevious />
          <template v-for="(item, index) in paginationItems" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
              class="min-w-9"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else-if="item.type === 'ellipsis'" :index="index" />
          </template>
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    </nav>
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
import ArticleCard from '@/components/cards/article/ArticleCard.vue'

interface Props {
  items: any[]
  itemsPerPage: number
  lang?: string
  initialPage?: number
  readMoreText?: string
  paginationPageLabel?: string
  paginationOfLabel?: string
  paginationArticleLabel?: string
  paginationArticlesLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'fr',
  initialPage: 1,
  readMoreText: 'Lire la suite',
  paginationPageLabel: 'Page',
  paginationOfLabel: 'sur',
  paginationArticleLabel: 'article',
  paginationArticlesLabel: 'articles'
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
