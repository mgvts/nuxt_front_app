<script setup lang="ts">
import messages from './locale.json'
useHead({
  title: "Главная",
  meta: [
    {
      name: "description",
      content: 'Главная страница курса "Фронтенд 2024-2025, ИТМО"',
    },
  ],
});
const { t } = useI18n({ messages })
const semesterStore = useSemesterStore()
const profileStore = useProfileStore()
const { sortedSemesters, loading, error } = storeToRefs(semesterStore)


onMounted(async () => {
  try {
    await Promise.all([
      semesterStore.loadSemesters(),
      profileStore.loadProfiles()
    ])
  } catch (e) {
    console.error('Failed to load semesters:', e)
  }
})

</script>

<template>
  <div class="semesters-container">
    <div v-if="loading" class="loading">
      Загрузка семестров...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="semesters-grid">
      <div class="left-column">
        <div>
          <I18nSwitch />
          <div>
            <div class="border ma-1">
              Привет:
              <pre>{{ t('привет') }}</pre>
            </div>
            <div class="border ma-1">
              пока:
              <pre>{{ t('пока') }}</pre>
            </div>
          </div>
        </div>
        <UILink v-for="semester in sortedSemesters.slice(0, 2)" :key="semester.id" :to="`/semesters/${semester.id}`"
          class="semester-card">
          <div class="card-content">
            <span class="number">{{ semester.title }}</span>
            <div class="text-content">
              <div class="semester-title">semester</div>
              <div class="semester-subject">{{ semester.description }}</div>
            </div>
          </div>
        </UILink>
      </div>
      <div class="right-column">
        <UILink v-if="sortedSemesters[2]" :to="`/semesters/${sortedSemesters[2].id}`" class="semester-card">
          <div class="card-content">
            <span class="number">{{ sortedSemesters[2].title }}</span>
            <div class="text-content">
              <div class="semester-title">semester</div>
              <div class="semester-subject">{{ sortedSemesters[2].description }}</div>
            </div>
          </div>
        </UILink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.semesters-container {
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

.semesters-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  width: 100%;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.right-column {
  height: 100%;
}

.right-column .semester-card {
  height: 100%;
}

.semester-card {
  background: #A0D6FF8A;
  border: 2px solid #003049;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none !important;
  min-height: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.semester-card:hover {
  text-decoration: none !important;
  background: #A0D6FFAA;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

.semester-card * {
  text-decoration: none !important;
}

.semester-card:hover * {
  text-decoration: none !important;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  user-select: none;
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
  font-size: 1.75rem;
  color: #003049;
  line-height: 1;
}

.semester-subject {
  font-family: var(--font-kantumruy);
  font-size: 1.2rem;
  color: #003049;
}

@media (max-width: 1024px) {
  .semesters-container {
    padding: 1.5rem;
  }

  .semesters-grid {
    gap: 40px;
  }

  .left-column {
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .semesters-container {
    padding: 1rem;
  }

  .semesters-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .left-column {
    gap: 30px;
  }

  .semester-card {
    padding: 1.5rem;
    min-height: 150px;
  }

  .number {
    font-size: 3rem;
  }

  .semester-title {
    font-size: 1.5rem;
  }

  .semester-subject {
    font-size: 1rem;
  }
}
</style>
