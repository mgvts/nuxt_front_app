import { defineNuxtPlugin, useCookie } from '#app'

interface baseFetchOptions {
  headers?: object
  method?: Uppercase<'get' | 'post'>
}

export default defineNuxtPlugin(() => {
  const { public: { apiBase } } = useRuntimeConfig()

  async function apiFetch<T = unknown>(path: string, opts: baseFetchOptions = {}): Promise<T> {
    const jwt = useCookie('jwt').value
    const lang = useCookie('lang').value
    const headers = {
      ...(opts.headers || {}),
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
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
      headers,
    })
  }

  return {
    provide: {
      apiFetch,
    },
  }
})
