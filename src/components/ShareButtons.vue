<template>
  <div class="flex gap-2">
    <!-- Bouton WhatsApp -->
    <Button
      @click="shareOnWhatsApp"
      variant="default"
      size="sm"
      class="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
      aria-label="Partager sur WhatsApp"
    >
      <span class="flex items-center gap-2">
        📱 WhatsApp
      </span>
    </Button>

    <!-- Bouton partage natif (fallback) -->
    <Button
      @click="shareNative"
      variant="secondary"
      size="sm"
      aria-label="Partager"
    >
      <span class="flex items-center gap-2">
        📤 Partager
      </span>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'

interface Props {
  url?: string
  title?: string
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: () => window.location.href,
  title: 'FEMAT - Fédération Malienne de Taekwondo',
  text: 'Découvrez les actualités du Taekwondo au Mali'
})

const isMobile = ref(false)

onMounted(() => {
  // Détecter si c'est un appareil mobile
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})

const shareOnWhatsApp = () => {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${props.title}\n\n${props.text}\n\n${props.url}`
  )}`
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
}

const shareNative = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: props.title,
        text: props.text,
        url: props.url,
      })
    } catch (error) {
      // L'utilisateur a annulé le partage ou une erreur s'est produite
      console.log('Erreur de partage:', error)
    }
  } else {
    // Fallback: copier dans le presse-papiers
    try {
      await navigator.clipboard.writeText(`${props.title}\n\n${props.text}\n\n${props.url}`)
      alert('Lien copié dans le presse-papiers !')
    } catch (error) {
      alert('Partage non supporté sur ce navigateur')
    }
  }
}
</script>