<template>
  <VLayout class="flex-column">
    <UINavbar />
    <main class="main-layout">
      <slot />
    </main>
  </VLayout>
</template>

<style scoped lang="css">
.main-layout {
  padding-top: 240px;
  width: 1200px;
  margin: auto;
}
</style>
