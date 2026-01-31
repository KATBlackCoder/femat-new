<template>
  <div class="w-full">
    <Tabs default-value="mission" class="w-full">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="mission">{{ t('federation.tabMission') }}</TabsTrigger>
        <TabsTrigger value="bureau">{{ t('federation.tabBureau') }}</TabsTrigger>
        <TabsTrigger value="documents">{{ t('federation.tabDocuments') }}</TabsTrigger>
      </TabsList>

      <TabsContent value="mission" class="space-y-8 mt-8">
        <slot name="mission-content"></slot>
      </TabsContent>

      <TabsContent value="bureau" class="space-y-8 mt-8">
        <slot name="bureau-content"></slot>
      </TabsContent>

      <TabsContent value="documents" class="space-y-8 mt-8">
        <slot name="documents-content"></slot>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { translations, type Language } from '@/lib/i18n'

interface Props {
  lang?: Language
}

const props = withDefaults(defineProps<Props>(), { lang: 'fr' })

function t(key: string): string {
  const keys = key.split('.')
  let value: unknown = translations[props.lang]
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return key
    }
  }
  return typeof value === 'string' ? value : key
}
</script>