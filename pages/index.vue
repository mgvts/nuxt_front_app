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

  <section class="courses-section">
    <h2 class="courses-title">Наши курсы</h2>
    <div class="courses-list">
      <div
        v-for="semester in sortedSemesters"
        :key="semester.id"
        class="course-card"
        :class="{ alt: semester.id % 2 === 0 }"
      >
        <div class="course-card-content">
          <div class="course-title">{{ semester.title }}</div>
          <div class="course-description">{{ semester.description }}</div>
        </div>
        <NuxtLink :to="`/semesters/${semester.id}`" class="course-link"
          >перейти</NuxtLink
        >
      </div>
    </div>
  </section>
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

.courses-section {
  margin-top: 64px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.courses-title {
  font-family: var(--font-lato), sans-serif;
  font-size: 64px;
  font-weight: 700;
  margin-bottom: 48px;
  text-align: center;
}
.courses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
}
.course-card {
  background: #f5eaff;
  border-radius: 32px;
  padding: 32px 24px 24px 24px;
  min-width: 280px;
  max-width: 340px;
  flex: 1 1 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s;
}

.course-card.alt {
  background: #faf8ee;
}

.course-title {
  font-family: var(--font-lato), sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #8e6ff8;
  margin-bottom: 16px;
  text-align: center;
}
.course-description {
  font-family: var(--font-lato), sans-serif;
  font-size: 16px;
  color: #6b5ca5;
  margin-bottom: 32px;
  text-align: center;
}
.course-link {
  display: block;
  width: 100%;
  background: #fff;
  color: #8e6ff8;
  font-family: var(--font-lato), sans-serif;
  font-size: 28px;
  font-weight: 700;
  border-radius: 16px;
  padding: 8px 0;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(142, 111, 248, 0.08);
  margin-top: auto;
  transition: background 0.2s, color 0.2s;
}
.course-link:hover {
  background: #8e6ff8;
  color: #fff;
}
@media (max-width: 900px) {
  .courses-title {
    font-size: 40px;
    margin-bottom: 32px;
  }
  .courses-list {
    gap: 16px;
  }
  .course-card {
    padding: 24px 12px 16px 12px;
    min-width: 220px;
    max-width: 100vw;
  }
  .course-title {
    font-size: 22px;
  }
  .course-link {
    font-size: 20px;
  }
}
</style>
