// stores/authStore.ts
import { defineStore } from 'pinia'
import { api } from '~/composables/api'
import type { AuthResponse } from '~/types/auth'
import type { LoginPayload, RegisterPayload } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const {setJWT} = useI18nCookie()
  const loginRef = ref<AuthResponse['login'] | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function register(payload: RegisterPayload) {
    loading.value = true
    error.value = null
    try {
      const account = await api.auth.register(payload)
      setJWT(account.jwtToken)
      loginRef.value = account.login
      return account
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
      const account = await api.auth.login(payload)
      setJWT(account.jwtToken)
      loginRef.value = account.login
      return account
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
