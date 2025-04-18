// stores/authStore.ts
import { defineStore } from 'pinia'
import { api } from '~/composables/api'
import type { LoginPayload, RegisterPayload, AuthResponse } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<AuthResponse['user'] | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function register(payload: RegisterPayload) {
    loading.value = true
    error.value = null
    try {
      const res = await api.auth.register(payload)
      token.value = res.token
      user.value = res.user
    } catch (e: any) {
      error.value = e.message || 'Ошибка при регистрации'
    } finally {
      loading.value = false
    }
  }

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null
    try {
      const res = await api.auth.login(payload)
      token.value = res.token
      user.value = res.user
    } catch (e: any) {
      error.value = e.message || 'Ошибка при входе'
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    user.value = null
  }

  return {
    token,
    user,
    loading,
    error,
    register,
    login,
    logout,
  }
})
