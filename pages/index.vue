<script setup lang="ts">
import messages from "./locale.json";
useHead({
  title: "Главная",
  meta: [
    {
      name: "description",
      content: 'Главная страница курса "Фронтенд 2024-2025, ИТМО"',
    },
  ],
});
const { t } = useI18n({ messages });
const semesterStore = useSemesterStore();
const profileStore = useProfileStore();
const { sortedSemesters, loading, error } = storeToRefs(semesterStore);

onMounted(async () => {
  try {
    await Promise.all([
      semesterStore.loadSemesters(),
      profileStore.loadProfiles(),
    ]);
  } catch (e) {
    console.error("Failed to load semesters:", e);
  }
});
</script>

<template>
  <div class="main-visual">
    <div class="main-bg" />
    <img
      class="main-flower"
      src="~/assets/img/flower-with-hands.png"
      alt="flower"
    />
  </div>
</template>

<style scoped>
.main-visual {
  position: relative;
  width: 100vw;
  min-height: 400px;
  height: 60vh;
  overflow: hidden;
  background: #f8e9f6;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.main-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: url("~/assets/img/upper-main-img.png") center top/cover no-repeat;
  z-index: 1;
}

.main-flower {
  position: absolute;
  right: 4vw;
  bottom: 0;
  width: 420px;
  max-width: 40vw;
  z-index: 2;
  pointer-events: none;
  user-select: none;
}

@media (max-width: 900px) {
  .main-flower {
    width: 220px;
    max-width: 60vw;
    right: 2vw;
  }
  .main-visual {
    min-height: 220px;
    height: 32vh;
  }
}
</style>
