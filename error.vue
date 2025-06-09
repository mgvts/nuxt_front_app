<script setup lang="ts">
import type { NuxtError } from "#app";
import { computed } from "vue";

const props = defineProps({
  error: {
    type: Object as PropType<NuxtError | undefined>,
    default: undefined,
  },
});

const handleError = () => clearError({ redirect: "/" });

const is404 = computed(() => props.error?.statusCode === 404);
</script>

<template>
  <NuxtLayout>
    <div class="error-container">
      <div class="error-content">
        <h1>{{ props.error?.statusCode || "Ошибка" }}</h1>
        <p v-if="is404">Страница не найдена</p>
        <p v-else>{{ props.error?.message || "Произошла ошибка" }}</p>
        <NuxtLink to="/" class="home-link" @click="handleError">
          На главную
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--v-theme-background));
  padding: 4rem 0;
}

.error-content {
  background: rgb(var(--v-theme-primary-2));
  color: rgb(var(--v-theme-on-primary-2));
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow: 0 4px 24px rgba(142, 111, 248, 0.08);
  text-align: center;
}

.error-content h1 {
  font-size: 6rem;
  margin: 0 0 1rem 0;
  font-weight: var(--font-bold);
}

.error-content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.85;
}

.home-link {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: rgb(var(--v-theme-on-primary-2));
  color: rgb(var(--v-theme-primary-2));
  border-radius: 1.5rem;
  font-size: 1.1rem;
  font-weight: var(--font-medium);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.home-link:hover {
  background: rgb(var(--v-theme-primary-1));
  color: rgb(var(--v-theme-on-primary-1));
}
</style>
