<script setup lang="ts">
useHead({
  title: "Профили",
  meta: [{ name: "description", content: "Профили лекторов" }],
});
</script>

<template>
  <div>
    <h1>Профили лекторов курса</h1>
    <ul class="profile-list">
      <li><NuxtLink to="/profile/mgvts">Влад Целиков</NuxtLink></li>
      <li><NuxtLink to="/profile/kirat_0">Артемий Казаков</NuxtLink></li>
      <li><NuxtLink to="/profile/awakywaky">Александра Шипилова</NuxtLink></li>
      <li><NuxtLink to="/profile/ArtyomShvetsov">Артём Швецов</NuxtLink></li>
    </ul>
  </div>
</template>

<style scoped>
.profile-list {
  padding: 0;
}
.profile-list > li {
  list-style: none;
  padding: 0.5rem 0;
}
</style>
