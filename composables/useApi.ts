import { useI18nCookie } from '@/composables/useI18nCookie'
import { useNuxtApp } from '#app'

export function useApi() {
  const { jwt } = useI18nCookie()
  const { $fetch } = useNuxtApp()
  const BASE_URL = 'https://ktcourse.ru/api/v1'

  function get<T>(path: string, opts = {}) {
    return $fetch<T>(`${BASE_URL}${path}`, {
      method: 'GET',
      ...opts,
      headers: {
        ...(opts.headers as object || {}),
        ...(jwt.value ? { Authorization: `Bearer ${jwt.value}` } : {})
      }
    })
  }

  function post<T>(path: string, opts = {}) {
    return $fetch<T>(`${BASE_URL}${path}`, {
      method: 'POST',
      ...opts,
      headers: {
        ...(opts.headers as object || {}),
        ...(jwt.value ? { Authorization: `Bearer ${jwt.value}` } : {})
      }
    })
  }

  return { get, post }
}
