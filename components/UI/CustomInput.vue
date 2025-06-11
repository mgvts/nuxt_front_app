<script setup lang="ts">
const model = defineModel<string>({ required: true })
const { label, type } = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: { type: String, default: 'text' },
  placeholder: { type: String, required: true },
  error: { type: String, required: true },
})
</script>

<template>
  <div class="custom-input-block">
    <label
      v-if="label"
      class="custom-label"
    >{{ label }}</label>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :class="['custom-input', { error: !!error }]"
    >
    <div
      v-if="error"
      class="custom-error"
    >
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.custom-input-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.custom-label {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  margin-bottom: 2px;
}

.custom-input {
  width: 100%;
  border-radius: 16px;
  background: rgb(var(--v-theme-primary-2));
  box-shadow: 0 2px 8px rgba(142, 111, 248, 0.07);
  border: 2px solid rgb(var(--v-theme-primary));
  font-size: 1.1rem;
  padding: 12px 16px;
  color: rgb(var(--v-theme-primary));
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
}

.custom-input:focus {
  box-shadow: 0 0 0 2px rgb(var(--v-theme-primary));
  border-color: rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-primary-2));
}

.custom-input.error {
  border-color: #ff4d4f;
}

.custom-error {
  color: #ff4d4f;
  font-size: 0.95rem;
  margin-top: 2px;
}

/* Autofill fix */
.custom-input:-webkit-autofill,
.custom-input:-webkit-autofill:focus,
.custom-input:-webkit-autofill:hover,
.custom-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px rgb(var(--v-theme-primary-2)) inset !important;
  box-shadow: 0 0 0 1000px rgb(var(--v-theme-primary-2)) inset !important;
  -webkit-text-fill-color: rgb(var(--v-theme-primary)) !important;
  caret-color: rgb(var(--v-theme-primary));
  transition: background-color 5000s ease-in-out 0s;
}
</style>
