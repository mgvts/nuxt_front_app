<script setup lang="ts">
export type SizeValues = 'link' | 'text' | 'upper'

const props = defineProps({
  color: {
    type: String,
    default: undefined,
  },
  isFirstLetter: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<SizeValues>,
    default: 'text',
  },
})
</script>

<template>
  <span
    v-bind="$attrs"
    class="link-style"
    :class="[props.size, props.isFirstLetter ? 'capital' : '']"
    :style="{ color: props.color }"
  >
    <slot />
  </span>
</template>

<style scoped lang="css">
.link-style {
  display: inline-block;
  font-family: var(--font-kantumruy);
  line-height: 1;
}

.link {
  font-size: 50px;
}

.text {
  font-size: 70px;
}

.upper {
  font-size: 50px;
}

.capital::first-letter {
  font-family: var(--font-katari);
  font-size: 120px;
  color: var(--violet);
}

@media (max-width: 1240px) {
  .link-style.link {
    font-size: 25px;
  }
}
</style>
