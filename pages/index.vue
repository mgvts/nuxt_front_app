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
  <div class="hello-container">
    <img class="hello-img" src="~/assets/img/hello-img.jpg" alt="Hello" />
    <h1 class="hello-text">
      Курсы<br />по фронтенд-разработке<br />
      от студентов ИТМО<br />
      под руководством<br />
      Олега Мохова
    </h1>
  </div>
</template>

<style scoped>
.hello-container {
  display: flex;
  align-items: stretch;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  gap: 40px;
}

.hello-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 32px;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  max-width: none;
  max-height: none;
}

.hello-text {
  display: flex;
  align-items: center;
  font-family: var(--font-lato), sans-serif;
  font-weight: 700;
  font-size: 30px;
  line-height: 40px;
  letter-spacing: 0.2px;
  text-align: center;
  min-width: 0;
  flex: 0 1 auto;
  max-width: 400px;
}

@media (max-width: 900px) {
  .hello-container {
    flex-direction: column;
    gap: 24px;
    max-width: 100vw;
    align-items: center;
  }
  .hello-img {
    width: 100%;
    max-width: 360px;
    flex: none;
    height: auto;
    object-fit: contain;
  }
  .hello-text {
    font-size: 32px;
    line-height: 40px;
    text-align: center;
    max-width: 100vw;
    flex: none;
    align-items: flex-start;
  }
}
</style>
