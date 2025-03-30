<template>
  <header class="links">
    <NuxtLink to="/">Главная</NuxtLink>
    <NuxtLink to="/profile">Профили</NuxtLink>
  </header>
  <main>
    <slot />
  </main>
</template>

<style scoped>
.links {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
}
</style>
