// ~/plugins/api-fetch.ts
import { defineNuxtPlugin, useRequestHeaders, useCookie } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { public: { apiBase } } = useRuntimeConfig()
  
  async function apiFetch<T = unknown>(path: string, opts = {}): Promise<T> {
    const jwt = useCookie('jwt').value
    const headers = {
      ...(opts.headers || {}),
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
    }
    const url = import.meta.client
        ? path
        : apiBase + path

    return await $fetch<T>(url, {
      ...opts,
      headers
    })
  }

  // возвращаем в provide, чтобы Nuxt «подхватил» на клиенте и на сервере
  return {
    provide: {
      apiFetch
    }
  }
})
