// stores/lectureStore.ts
import { defineStore } from 'pinia'
import { api } from '~/composables/api'
import type { Lecture } from '~/types/lecture'

export const useLectureStore = defineStore('lecture', () => {
  const lecture = ref<Lecture | null>(null)
  const lectures = ref<Lecture[] | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function loadLectures() {
    loading.value = true
    error.value = null
    try {
      lectures.value = await api.lecture.getLectures()
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
        error.value = e?.message || `Ошибка при загрузке лекций`
      }
      throw e
    } finally {
      loading.value = false
    }
  }

  async function loadLecture(slug: string) {
    loading.value = true
    error.value = null
    try {
      lecture.value = await api.lecture.getLecture(slug)
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
        error.value = e?.message || `Ошибка при загрузке лекции ${slug}`
      }
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    lecture,
    lectures,
    loading,
    error,
    
    loadLecture,
    loadLectures,
  }
})
