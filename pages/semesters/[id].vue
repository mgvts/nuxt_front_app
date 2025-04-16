<script setup lang="ts">
import { useSemesterStore } from '~/stores/semesterStore'
import { storeToRefs } from 'pinia'
import { useRoute, useHead } from '#app'

const route = useRoute()
const id = route.params.id as string

useHead({ title: `Семестр ${id}` })

const semesterStore = useSemesterStore()
const { currentSemester: semester, loading, error } = storeToRefs(semesterStore)

onMounted(() => {
    semesterStore.loadSemester(id)
})
</script>

<template>
  <article>
    <UICard v-if="semester">
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
                <UILink :to="`/lectures/${lec.slug}`">to lecture</UILink>
            </div>
        </div>
    </UICard>
  </article>
</template>
