<script setup lang="ts">
const { text, type } = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  disabled: Boolean,
})
defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="custom-btn"
    @click="$emit('click')"
  >
    <span>{{ text }}<slot /></span>
  </button>
</template>

<style scoped>
.custom-btn {
  width: 100%;
  border-radius: 40px;
  font-size: 1.35rem;
  font-weight: 800;
  padding: 20px 0;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  box-shadow: 0 6px 24px rgba(142, 111, 248, 0.18);
  text-shadow: 0 2px 8px #8e6ff8, 0 1px 1px #fff;
  letter-spacing: 0.02em;
  margin-top: 28px;
  border: none;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  outline: none;
}
.custom-btn:hover:not(:disabled) {
  background: rgb(var(--v-theme-primary-2));
  color: rgb(var(--v-theme-primary));
  box-shadow: 0 8px 32px rgba(142, 111, 248, 0.22);
}
.custom-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
