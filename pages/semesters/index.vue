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
  semesters
} = storeToRefs(semesterStore)


onMounted(async () => {
  if (!semesters?.lenght) {
    await semesterStore.loadSemesters()
  }
})
</script>

<template>
  <article>
    <section v-for="semester of semesters" :key="semester.id">
      <UICard>
        <div class="text-indigo-darken-2 text-h3">
          #{{ semester.position }} {{  semester.title }}
        </div>
        <div class="text-indigo-darken-1 text-h4">
          {{ semester.description }}
        </div>
        <div v-for="lec of semester.lectures" :key="lec.slug">
          {{ lec.slug }}
            <img :src="lec.imageUrl">
            <div>
              <UILink :to="`./${lec.slug}`">to lecture</UILink>
            </div>
        </div>
        <UILink :to="`./semesters/${semester.id}`">open sem</UILink>
      </UICard>
    </section>
  </article>
</template>

<style scoped>

</style>
