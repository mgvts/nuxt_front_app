<script setup lang="ts">
useHead({
  title: "Главная",
  meta: [
    {
      name: "description",
      content: 'Главная страница курса "Фронтенд 2024-2025, ИТМО"',
    },
  ],
});
</script>

<template>
  <h1>Сайт курса "Фронтенд 2024-2025, ИТМО"</h1>
  <p>Сделан на Vue, Nuxt.</p>
  <NuxtLink to="/profile">Профили лекторов</NuxtLink>
</template>
