<script setup lang="ts">
const isLoading = ref(true);

onMounted(() => {
  // Даем небольшую задержку, чтобы лоадер всегда был виден
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading" class="app-loader">
      <div class="loader-content">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="4"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.app-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--violet-bg, #f5eaff);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
