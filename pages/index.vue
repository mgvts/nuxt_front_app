<script setup lang="ts">
import { computed, ref } from "vue";
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

const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      semesterStore.loadSemesters(),
      profileStore.loadProfiles(),
    ]);
  } catch (e) {
    console.error("Failed to load semesters:", e);
  } finally {
    isLoading.value = false;
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
    <img class="hello-img" src="~/assets/img/main-bg.jpg" alt="Hello" />
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
      <template v-if="isLoading || !sortedSemesters.length">
        <div v-for="i in 4" :key="i" class="course-card skeleton">
          <div class="course-card-content">
            <div class="course-image skeleton-image" />
            <div class="course-title skeleton-text" />
            <div class="course-description skeleton-text" />
          </div>
          <div class="course-link skeleton-button" />
        </div>
      </template>
      <template v-else>
        <div
          v-for="semester in sortedSemesters"
          :key="semester.id"
          class="course-card"
          :class="{ alt: semester.id % 2 === 0 }"
        >
          <div class="course-card-content">
            <img
              v-if="semester.imageUrl"
              :src="semester.imageUrl"
              :alt="semester.title"
              class="course-image"
            />
            <div class="course-title">{{ semester.title }}</div>
            <div class="course-description">{{ semester.description }}</div>
          </div>
          <NuxtLink :to="`/semesters/${semester.id}`" class="course-link"
            >перейти</NuxtLink
          >
        </div>
      </template>
    </div>
  </section>

  <section class="lecturers-section">
    <h2 class="lecturers-title">Наши лекторы</h2>
    <div class="lecturers-grid">
      <template v-if="isLoading || !lecturers.length">
        <div v-for="i in 8" :key="i" class="lecturer-card skeleton">
          <div class="lecturer-avatar skeleton-image" />
          <div class="lecturer-name skeleton-text" />
        </div>
      </template>
      <template v-else>
        <NuxtLink
          v-for="(lecturer, idx) in lecturers"
          :key="lecturer.login"
          :to="`/profiles/${lecturer.login}`"
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
        </NuxtLink>
      </template>
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
  margin-top: 70px;
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

.course-card-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.course-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 24px;
}

.course-title {
  font-family: var(--font-lato), sans-serif;
  font-size: 32px;
  line-height: 32px;
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
  .course-image {
    height: 160px;
    margin-bottom: 16px;
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
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0;
  width: 100%;
  max-width: 1200px;
}
.lecturer-card {
  position: relative;
  border-radius: 0;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 48px 32px 32px 32px;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  border: 1px solid rgba(142, 111, 248, 0.2);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.lecturer-card:hover {
  transform: translateY(-4px);
}

.lecturer-card.yellow {
  background: url("~/assets/img/lecturer_yellow.png") center/cover no-repeat;
}
.lecturer-card.pink {
  background: url("~/assets/img/lecturer_pink.png") center/cover no-repeat;
}
.lecturer-avatar {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  margin-bottom: 24px;
  margin-left: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  pointer-events: none;
}
.lecturer-name {
  font-family: var(--font-lato), sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #8e6ff8;
  margin-left: 8px;
  margin-top: 0;
  text-align: left;
  pointer-events: none;
}
@media (max-width: 900px) {
  .lecturers-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(8, 1fr);
    gap: 0;
    max-width: 100vw;
  }
  .lecturer-card {
    border-radius: 0;
    aspect-ratio: 1/1;
    min-height: 280px;
    padding: 24px 16px 16px 16px;
    border: 1px solid rgba(142, 111, 248, 0.2);
  }
  .lecturer-avatar {
    width: 120px;
    height: 120px;
    margin-bottom: 16px;
    margin-left: 4px;
  }
  .lecturer-name {
    font-size: 24px;
    margin-left: 4px;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
  background-size: 200% 100%;
}

.skeleton-image {
  background-color: rgba(142, 111, 248, 0.1);
  border-radius: 16px;
}

.skeleton-text {
  background-color: rgba(142, 111, 248, 0.1);
  height: 24px;
  border-radius: 4px;
  margin-bottom: 16px;
  width: 80%;
}

.skeleton-button {
  background-color: rgba(142, 111, 248, 0.1);
  height: 48px;
  border-radius: 16px;
  width: 100%;
  margin-top: auto;
}

.course-card.skeleton .course-image {
  height: 200px;
  margin-bottom: 24px;
}

.course-card.skeleton .course-title {
  height: 32px;
  margin-bottom: 16px;
}

.course-card.skeleton .course-description {
  height: 72px;
}

.lecturer-card.skeleton {
  background: rgba(142, 111, 248, 0.1);
}

.lecturer-card.skeleton .lecturer-avatar {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  box-shadow: none;
}

.lecturer-card.skeleton .lecturer-name {
  height: 36px;
  width: 60%;
}

@media (max-width: 900px) {
  .course-card.skeleton .course-image {
    height: 160px;
    margin-bottom: 16px;
  }

  .course-card.skeleton .course-title {
    height: 24px;
  }

  .course-card.skeleton .course-description {
    height: 48px;
  }

  .lecturer-card.skeleton .lecturer-avatar {
    width: 120px;
    height: 120px;
  }

  .lecturer-card.skeleton .lecturer-name {
    height: 24px;
  }
}
</style>
