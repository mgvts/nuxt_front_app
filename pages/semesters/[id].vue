<script setup lang="ts">
const route = useRoute();
const semesterId = route.params.id as string;

const semesterStore = useSemesterStore();
const { currentSemester, loading, error } = storeToRefs(semesterStore);

onMounted(async () => {
  try {
    await semesterStore.loadSemester(semesterId);
  } catch (e) {
    console.error("Failed to load semester:", e);
  }
});

useHead(() => ({
  title: currentSemester.value?.title + " semester" || "Семестр",
  meta: [
    {
      name: "description",
      content: currentSemester.value?.description || "Страница семестра",
    },
  ],
}));
</script>

<template>
  <div class="semester-container">
    <div v-if="loading" class="loading">Загрузка семестра...</div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <template v-else-if="currentSemester">
      <div class="semester-header-card">
        <div class="card-content">
          <span class="number">{{ currentSemester.title }}</span>
          <div class="text-content">
            <div class="semester-title">semester</div>
            <div class="semester-description">
              {{ currentSemester.description }}
            </div>
          </div>
        </div>
      </div>

      <div class="lectures-grid">
        <UILink
          v-for="lecture in currentSemester.lectures"
          :key="lecture.slug"
          :to="`/lectures/${lecture.slug}`"
          class="lecture-card"
        >
          <div class="lecture-content">
            <div class="lecture-date">
              {{
                new Date(lecture.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                })
              }}
            </div>
            <h3 class="lecture-title">{{ lecture.title }}</h3>
            <div class="lecture-description">{{ lecture.description }}</div>
            <div class="lecture-lecturers">
              <div
                v-for="profile in lecture.profiles"
                :key="profile.login"
                class="lecturer"
              >
                {{ profile.name }}
              </div>
            </div>
          </div>
        </UILink>
      </div>
    </template>
  </div>
</template>

<style scoped>
.semester-container {
  padding: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #003049;
}

.error {
  color: #dc3545;
}

.semester-header-card {
  background: #a0d6ff8a;
  border: 2px solid #003049;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.number {
  font-family: var(--font-grover);
  font-size: 4rem;
  line-height: 1;
  color: #003049;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.semester-title {
  font-family: var(--font-kantumruy);
  font-size: 2rem;
  color: #003049;
  line-height: 1;
}

.semester-description {
  font-family: var(--font-kantumruy);
  font-size: 1.2rem;
  color: #003049;
}

.lectures-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
}

.lecture-card {
  flex: 1 1 calc(25% - 2rem);
  min-width: 280px;
  background: #a0d6ff8a;
  border: 2px solid #003049;
  border-radius: 16px;
  padding: 1.5rem;
  text-decoration: none !important;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.lecture-card:hover {
  background: #a0d6ffaa;
  transform: translateY(-2px);
  transition: all 0.3s ease;
  text-decoration: none !important;
}

.lecture-card:hover * {
  text-decoration: none !important;
}

.lecture-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lecture-date {
  font-family: var(--font-kantumruy);
  font-size: 1rem;
  color: #003049;
  opacity: 0.8;
}

.lecture-title {
  font-family: var(--font-kantumruy);
  font-size: 1.5rem;
  color: #003049;
  margin: 0;
}

.lecture-description {
  font-family: var(--font-kantumruy);
  font-size: 1rem;
  color: #003049;
  opacity: 0.9;
}

.lecture-lecturers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.lecturer {
  font-family: var(--font-kantumruy);
  font-size: 0.9rem;
  color: #003049;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

@media (max-width: 1024px) {
  .semester-container {
    padding: 1.5rem;
  }

  .lecture-card {
    flex: 1 1 calc(33.333% - 1.5rem);
  }
}

@media (max-width: 768px) {
  .semester-container {
    padding: 1rem;
  }

  .semester-header-card {
    padding: 1.5rem;
  }

  .card-content {
    gap: 1rem;
  }

  .number {
    font-size: 3rem;
  }

  .semester-title {
    font-size: 1.5rem;
  }

  .lecture-card {
    flex: 1 1 100%;
  }
}
</style>
