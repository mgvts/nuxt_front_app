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
  <UILink to="/profile" text="Профили лекторов" />
  <div style="border: thin solid black; padding: 20px; margin: 20px; display: flex; flex-direction: column; gap: 200px">
    <li>
      this text Comp:
      <UIText
        is-first-letter
      >lorem 123123123123</UIText>
    </li>
    <li>
      this text Lint:
        <UILink 
          to="./profile" 
          color="red" 
          font="link"
        >profiles</UILink>
    </li>
  </div>
</template>
