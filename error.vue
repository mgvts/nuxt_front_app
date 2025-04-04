<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: {
    type: Object as PropType<NuxtError | undefined>,
    default: undefined
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div v-if="props.error">
      <div>{{ props.error?.statusCode }}</div>
      <div>{{ props.error?.message }}</div>
      <div>{{ props.error?.stack }}</div>
    </div>
    <div v-else>
      seems u have not got this page
    </div>
    <button @click="handleError">
      go home
    </button>
  </NuxtLayout>
</template>
