<script setup lang="ts">
import { useSemesterStore } from '~/stores/semesterStore';

useHead({
  title: "Главная",
  meta: [
    {
      name: "description",
      content: 'Главная страница курса "Фронтенд 2024-2025, ИТМО"',
    },
  ],
});
const semesterStore = useSemesterStore();
const {
  semesters,
  sortedSemesters
} = storeToRefs(semesterStore)


onMounted(async () => {
  if (!semesters.value.length) {
    await semesterStore.loadSemesters()
  }
})
</script>

<template>
  <article class="d-flex flex-col">
    <section v-for="semester of sortedSemesters" :key="semester.id">
      <UICard style="width: fit-content">
        <div class="d-flex flex-row font" :style="{ width: 420, height: 300 }">
          <div class="text-indigo-darken-2">
            <span>{{ semester.id }}</span>
          </div>

          <div class="d-flex flex-column">
            <div class="text-indigo-darken-1 ">
              semester
            </div>
            <div class="text-indigo-darken-1 ">
              {{ semester.title }}
            </div>
          </div>
        </div>
        <div>
          <img :src="getPresentationUrl(semester.lectures[0].presentationId)">
        </div>
      </UICard>
    </section>
  </article>
</template>

<style scoped>
.font {
  font-family: var(--font-grover) !important;
  font-size: 5rem;
}</style>
