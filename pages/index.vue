<script setup lang="ts">
import { computed } from "vue";
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

const lecturers = computed(() => {
  const seen = new Set();
  const all = sortedSemesters.value
    .flatMap((s) => s.lectures)
    .flatMap((l) => l.profiles)
    .filter((p) => {
      if (seen.has(p.login)) return false;
      seen.add(p.login);
      return true;
    });
  return all.slice(0, 8);
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

  <section class="lecturers-section">
    <h2 class="lecturers-title">Наши лекторы</h2>
    <div class="lecturers-grid">
      <div
        v-for="(lecturer, idx) in lecturers"
        :key="lecturer.login"
        class="lecturer-card"
        :class="{
          yellow: idx % 4 === 0 || idx % 4 === 3,
          pink: idx % 4 === 1 || idx % 4 === 2,
        }"
      >
        <div class="lecturer-bg-cloud" />
        <img
          :src="lecturer.avatarUrl"
          :alt="lecturer.name"
          class="lecturer-avatar"
        />
        <div class="lecturer-name">{{ lecturer.name }}</div>
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
  margin-bottom: 80px;
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

.lecturers-section {
  margin-top: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lecturers-title {
  font-family: var(--font-lato), sans-serif;
  font-size: 64px;
  font-weight: 700;
  margin-bottom: 80px;
  text-align: center;
}
.lecturers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1200px;
}
.lecturer-card {
  position: relative;
  border-radius: 32px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 32px 24px 24px 24px;
  overflow: hidden;
}
.lecturer-card.yellow {
  background: #faf8ee;
}
.lecturer-card.pink {
  background: #f5eaff;
}
.lecturer-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  margin-bottom: 16px;
  margin-left: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}
.lecturer-name {
  font-family: var(--font-lato), sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #8e6ff8;
  margin-left: 8px;
  margin-top: 0;
  text-align: left;
}
@media (max-width: 1100px) {
  .lecturers-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
}
@media (max-width: 700px) {
  .lecturers-title {
    font-size: 36px;
    margin-bottom: 24px;
  }
  .lecturers-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(8, 1fr);
    gap: 16px;
  }
  .lecturer-card {
    min-height: 180px;
    padding: 16px 8px 12px 8px;
  }
  .lecturer-avatar {
    width: 80px;
    height: 80px;
    margin-bottom: 8px;
    margin-left: 4px;
  }
  .lecturer-name {
    font-size: 18px;
    margin-left: 4px;
  }
}
</style>
