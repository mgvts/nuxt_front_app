<script setup lang="ts">
import { useHead, useRoute } from "#app";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import messages from "../semesters/locale.json";

const route = useRoute();
const semesterId = route.params.id as string;
const { t } = useI18n({ messages });

const semesterStore = useSemesterStore();
const {
  currentSemester,
  loading: storeLoading,
  error,
} = storeToRefs(semesterStore);

// Add local loading state
const isLoading = ref(true);

// Add selected tags state
const selectedTags = ref<string[]>([]);

// Compute all unique tags from lectures
const allTags = computed(() => {
  if (!currentSemester.value?.lectures) return [];
  const tags = new Set<string>();
  currentSemester.value.lectures.forEach((lecture) => {
    lecture.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
});

// Compute filtered lectures based on selected tags
const filteredLectures = computed(() => {
  if (!currentSemester.value?.lectures) return [];
  if (selectedTags.value.length === 0) return currentSemester.value.lectures;

  return currentSemester.value.lectures.filter((lecture) =>
    selectedTags.value.every((tag) => lecture.tags?.includes(tag))
  );
});

// Toggle tag selection
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

onMounted(async () => {
  try {
    await semesterStore.loadSemester(semesterId);
  } catch (e) {
    console.error("Failed to load semester:", e);
  } finally {
    isLoading.value = false;
  }
});

useHead(() => ({
  title: currentSemester.value?.title + " " + t("semester") || t("semester"),
  meta: [
    {
      name: "description",
      content: currentSemester.value?.description || t("semester"),
    },
  ],
}));

const formatDate = (date: string) => {
  const d = new Date(date);
  const month = d.toLocaleString("en-US", { month: "long" }).toLowerCase();
  return `${d.getDate()} ${t(`months.${month}`)}`;
};
</script>

<template>
  <div class="semester-container">
    <!-- Vuetify loader -->
    <div v-if="isLoading || storeLoading" class="loading-container">
      <v-progress-linear indeterminate color="primary" height="4" width="300" />
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <!-- Actual content -->
    <div v-else-if="currentSemester">
      <div class="semester-header-card">
        <div v-if="currentSemester.imageUrl" class="header-image">
          <img :src="currentSemester.imageUrl" :alt="currentSemester.title" />
        </div>
        <div class="card-content">
          <div class="text-content">
            <div class="semester-title">{{ currentSemester.title }}</div>
            <div class="semester-description">
              {{ currentSemester.description }}
            </div>
            <div
              v-if="currentSemester.percentOfView != null"
              class="semester-progress"
            >
              <template v-if="!isNaN(currentSemester.percentOfView)">
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{
                      width: `${Math.trunc(
                        currentSemester.percentOfView * 100
                      )}%`,
                    }"
                  />
                </div>
                <div class="progress-text">
                  {{ Math.trunc(currentSemester.percentOfView * 100) }}%
                </div>
              </template>
              <div v-else class="progress-pending">
                {{ t("lecturesPending") }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add tag filter UI -->
      <div v-if="allTags.length > 0" class="tag-filter">
        <div class="tag-filter-label">{{ t("filterByTags") }}:</div>
        <div class="tag-filter-tags">
          <button
            v-for="tag in allTags"
            :key="tag"
            class="tag-filter-button"
            :class="{ active: selectedTags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <div class="lectures-grid">
        <UILink
          v-for="lecture in filteredLectures"
          :key="lecture.id"
          :to="`/lectures/${lecture.id}`"
          class="lecture-card"
        >
          <div class="lecture-content">
            <div class="lecture-header">
              <div class="lecture-date">
                {{ formatDate(lecture.date) }}
              </div>
              <div v-if="lecture.tags?.length" class="lecture-tags">
                <span
                  v-for="tag in lecture.tags"
                  :key="tag"
                  class="lecture-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <h3 class="lecture-title">{{ lecture.title }}</h3>
            <div class="lecture-description">{{ lecture.description }}</div>
            <div class="lecture-lecturers">
              <div
                v-for="profile in lecture.profiles"
                :key="profile.login"
                class="lecturer"
              >
                <img
                  v-if="profile.avatarUrl"
                  :src="profile.avatarUrl"
                  :alt="profile.name"
                  class="lecturer-avatar"
                />
                <span class="lecturer-name">{{ profile.name }}</span>
              </div>
            </div>
          </div>
        </UILink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add global transition for all color properties */
.semester-container * {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, opacity 0.3s ease;
}

.semester-container {
  padding: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  font-family: var(--font-lato);
}

.semester-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.loading-container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4.8rem;
}

.loading-container :deep(.v-progress-linear) {
  width: 300px;
  opacity: 0.8;
}

.error {
  text-align: center;
  padding: 2rem;
  font-size: var(--text-lg);
  color: rgb(var(--v-theme-on-background));
}

.semester-header-card {
  background: rgb(var(--v-theme-primary-2));
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  box-shadow: 0 4px 24px rgba(142, 111, 248, 0.08);
  position: relative;
  overflow: hidden;
}

.header-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.semester-title {
  font-size: var(--text-5xl);
  color: rgb(var(--v-theme-on-primary-2));
  line-height: var(--leading-tight);
  font-weight: var(--font-bold);
  margin: 0;
}

.semester-description {
  font-size: var(--text-lg);
  color: rgb(var(--v-theme-on-primary-2));
  opacity: 0.8;
  max-width: 800px;
  margin: 0;
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
  background: rgb(var(--v-theme-primary-2));
  border-radius: 16px;
  padding: 1.5rem;
  text-decoration: none !important;
  box-shadow: 0 4px 24px rgba(142, 111, 248, 0.08);
  transition: all 0.3s ease;
}

.lecture-card:hover {
  background: rgb(var(--v-theme-primary-2));
  opacity: 0.9;
  transform: translateY(-2px);
  text-decoration: none !important;
}

.lecture-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lecture-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
}

.lecture-date {
  font-size: var(--text-base);
  color: rgb(var(--v-theme-on-primary-2));
  opacity: 0.8;
  white-space: nowrap;
}

.lecture-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.lecture-tag {
  font-size: var(--text-sm);
  color: rgb(var(--v-theme-on-primary-2));
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.lecture-title {
  font-size: var(--text-2xl);
  color: rgb(var(--v-theme-on-primary-2));
  margin: 0;
  font-weight: var(--font-bold);
}

.lecture-description {
  font-size: var(--text-base);
  color: rgb(var(--v-theme-on-primary-2));
  opacity: 0.8;
}

.lecture-lecturers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.lecturer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.lecturer-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.lecturer-name {
  font-size: var(--text-sm);
  color: rgb(var(--v-theme-on-primary-2));
}

.semester-progress {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: rgb(var(--v-theme-on-primary-2));
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: var(--text-sm);
  color: rgb(var(--v-theme-on-primary-2));
  font-weight: var(--font-medium);
  min-width: 48px;
  text-align: right;
}

.progress-pending {
  font-size: var(--text-base);
  color: rgb(var(--v-theme-on-primary-2));
  opacity: 0.8;
  font-style: italic;
}

.tag-filter {
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgb(var(--v-theme-primary-2));
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(142, 111, 248, 0.08);
}

.tag-filter-label {
  font-size: var(--text-lg);
  color: rgb(var(--v-theme-on-primary-2));
  margin-bottom: 0.75rem;
  font-weight: var(--font-medium);
}

.tag-filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-filter-button {
  padding: 0.5rem 1rem;
  border: 2px solid rgb(var(--v-theme-on-primary-2));
  border-radius: 1rem;
  background: transparent;
  color: rgb(var(--v-theme-on-primary-2));
  font-size: var(--text-base);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-filter-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.tag-filter-button.active {
  background: rgb(var(--v-theme-on-primary-2));
  color: rgb(var(--v-theme-primary-2));
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
    font-size: var(--text-5xl);
  }

  .semester-title {
    font-size: var(--text-3xl);
  }

  .lecture-card {
    flex: 1 1 100%;
  }

  .lecture-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .tag-filter {
    padding: 0.75rem;
  }

  .tag-filter-label {
    font-size: var(--text-base);
  }

  .tag-filter-button {
    padding: 0.375rem 0.75rem;
    font-size: var(--text-sm);
  }

  .semester-title-skeleton {
    height: 2rem;
    width: 80%;
  }

  .semester-description-skeleton {
    width: 90%;
  }

  .tag-skeleton {
    width: 80px;
  }

  .lecture-title-skeleton {
    width: 90%;
  }

  .lecture-description-skeleton {
    width: 100%;
  }
}
</style>
