<template>
  <div class="mt-12">
    <h3 class="text-2xl font-bold mb-6 text-center">{{ title }}</h3>
    <div class="max-w-3xl mx-auto">
      <Accordion type="single" collapsible class="space-y-4">
        <AccordionItem
          v-for="(faq, index) in faqs"
          :key="index"
          :value="`item-${index}`"
          class="border border-border rounded-lg"
        >
          <AccordionTrigger class="cursor-pointer p-4 font-medium hover:bg-accent transition-colors text-left">
            {{ faq.question }}
          </AccordionTrigger>
          <AccordionContent class="px-4 pb-4 text-muted-foreground">
            {{ faq.answer }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQ {
  question: string
  answer: string
}

interface Props {
  faqs: FAQ[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Questions Fréquentes'
})
</script>