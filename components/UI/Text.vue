<script setup lang="ts">
export type SizeValues =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "link"
  | "text"
  | "upper";

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
    default: "base",
  },
});
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

.xs {
  font-size: var(--text-xs);
}

.sm {
  font-size: var(--text-sm);
}

.base {
  font-size: var(--text-base);
}

.lg {
  font-size: var(--text-lg);
}

.xl {
  font-size: var(--text-xl);
}

.text-2xl {
  font-size: var(--text-2xl);
}

.text-3xl {
  font-size: var(--text-3xl);
}

.text-4xl {
  font-size: var(--text-4xl);
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
