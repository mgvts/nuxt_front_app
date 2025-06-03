// ~/plugins/api-fetch.ts
import { defineNuxtPlugin, useRequestHeaders, useCookie } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { public: { apiBase } } = useRuntimeConfig()
  
  async function apiFetch<T = unknown>(path: string, opts = {}): Promise<T> {
    const jwt = useCookie('jwt').value
    const lang = useCookie('lang').value
    const headers = {
      ...(opts.headers || {}),
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
    }

    let langQuery = ''

    if (opts.method === 'GET') {
      langQuery = `?lang=${lang}`
    }

    let url = import.meta.client
        ? path
        : apiBase + path
    url += langQuery

    return await $fetch<T>(url, {
      ...opts,
      headers
    })
  }

  return {
    provide: {
      apiFetch
    }
  }
})
