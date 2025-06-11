<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    default: undefined,
  },
  size: {
    type: Number,
    default: 60,
  },
})
</script>

<template>
  <UILink
    :to="props.to"
  >
    <v-icon
      color="primary"
      :size="props.size"
      v-bind="$attrs"
    >
      <slot />
    </v-icon>
  </UILink>
</template>
