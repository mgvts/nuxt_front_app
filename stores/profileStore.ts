// stores/profileStore.ts
import { defineStore } from 'pinia'
import { api } from '~/composables/api'
import type { Profile } from '~/types/profile'

export const useProfileStore = defineStore('profile', () => {
  const profiles = ref<Profile[]>([])
  const currentProfile = ref<Profile | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function loadProfiles() {
    loading.value = true
    error.value = null
    try {
      profiles.value = await api.profile.getProfiles()
    } catch (e: any) {
      error.value = e.message || 'Ошибка при загрузке профилей'
    } finally {
      loading.value = false
    }
  }

  async function loadProfile(login: string) {
    loading.value = true
    error.value = null
    try {
      currentProfile.value = await api.profile.getProfile(login)
    } catch (e: any) {
      error.value = e.message || `Ошибка при загрузке профиля ${login}`
    } finally {
      loading.value = false
    }
  }

  return {
    profiles,
    currentProfile,
    loading,
    error,
    loadProfiles,
    loadProfile,
  }
})
