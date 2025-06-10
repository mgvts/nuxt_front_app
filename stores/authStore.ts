// stores/authStore.ts
import { defineStore } from 'pinia'
import { api } from '~/composables/api'
import type { AuthResponse, LoginPayload, RegisterPayload  } from '~/types/auth'


export const useAuthStore = defineStore('auth', () => {
  const {setJWT, setLogin, login:loginCookie, jwt} = useI18nCookie()
  const loginRef = ref<AuthResponse['login'] | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)


  onMounted(() => {
    if (loginCookie.value) {
      loginRef.value = loginCookie.value
    }
  })

  async function register(payload: RegisterPayload) {
    loading.value = true;
    error.value = null;
    try {
      const account = await api.auth.register(payload);
      setJWT(account.jwtToken);
      loginRef.value = account.login;
      setLogin(account.login);
      return account;
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : "Ошибка при регистрации";
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function login(payload: LoginPayload) {
    loading.value = true;
    error.value = null;
    try {
      const account = await api.auth.login(payload);
      setJWT(account.jwtToken);
      loginRef.value = account.login;
      setLogin(account.login);
      return account;
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : "Ошибка при входе";
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    console.log('logout')
    setJWT(undefined)
    setLogin(undefined)
  }

  const isLogin = computed(() => {
    return loginCookie.value && jwt.value && loginRef.value
  })


  return {
    loginRef,
    loading,
    error,
    register,
    login,
    logout,
    isLogin,
  }
})
