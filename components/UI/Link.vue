<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    default: undefined,
  },
  color: {
    type: String,
    default: undefined,
  },
  target: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <NuxtLink :to="props.to" :target="props.target" class="link">
    <UIText
      :color="props.color"
      size="link"
      class="bg-transparent"
      v-bind="$attrs"
    >
      <slot />
    </UIText>
  </NuxtLink>
</template>

<style scoped lang="css">
.link {
  text-decoration: none;
}
</style>
