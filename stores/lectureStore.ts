// stores/lectureStore.ts
import { defineStore } from 'pinia'
import { api } from '~/composables/api'
import type { Lecture } from '~/types/lecture'

export const useLectureStore = defineStore('lecture', () => {
  const lecture = ref<Lecture | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function loadLecture(slug: string) {
    loading.value = true
    error.value = null
    try {
      lecture.value = await api.lecture.getLecture(slug)
    } catch (e: any) {
      error.value = e.message || `Ошибка при загрузке лекции ${slug}`
    } finally {
      loading.value = false
    }
  }

  return {
    lecture,
    loading,
    error,
    loadLecture,
  }
})
