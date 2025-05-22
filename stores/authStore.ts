// stores/authStore.ts
import { defineStore } from 'pinia'
import { api } from '~/composables/api'
import type { AuthResponse } from '~/types/auth'
import type { LoginPayload, RegisterPayload } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const {jwt, getJWT, setJWT} = useI18nCookie()
  const loginRef = ref<AuthResponse['login'] | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function register(payload: RegisterPayload) {
    loading.value = true
    error.value = null
    try {
      const res = await api.auth.register(payload)
      setJWT(res.jwtToken)
      loginRef.value = res.login
    } catch (e: unknown) {
      error.value = e?.message || 'Ошибка при регистрации'
    } finally { 
      loading.value = false
    }
  }

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null
    try {
      const res = await api.auth.login(payload)
      setJWT(res.jwtToken)
      loginRef.value = res.login
    } catch (e: unknown) {
      error.value = e.message || 'Ошибка при входе'
    } finally {
      loading.value = false
    }
  }


  return {
    loginRef,
    loading,
    error,
    register,
    login,
  }
})
