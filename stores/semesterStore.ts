import { defineStore } from 'pinia'
import { api } from '~/composables/api'
import type { Semester } from '~/types/semester'

export const useSemesterStore = defineStore('semester', () => {
  const semesters = ref<Semester[]>([])
  const currentSemester = ref<Semester | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function loadSemesters() {
    loading.value = true
    error.value = null
    try {
      semesters.value = await api.semester.getSemesters()
    } catch (e: any) {
      error.value = e.message || 'Ошибка при загрузке семестров'
    } finally {
      loading.value = false
    }
  }

  async function loadSemester(id: string) {
    loading.value = true
    error.value = null
    try {
      currentSemester.value = await api.semester.getSemester(id)
    } catch (e: any) {
      error.value = e.message || `Ошибка при загрузке семестра ${id}`
    } finally {
      loading.value = false
    }
  }

  return {
    semesters,
    currentSemester,
    loading,
    error,
    loadSemesters,
    loadSemester,
  }
})
