import type { Profile } from '~/types/profile'

export const profile = {
  /** Получить список всех профилей */
  async getProfiles(): Promise<Profile[]> {
    return await $fetch<Profile[]>('/api/profiles')
  },

  /** Получить данные одного профиля по login */
  async getProfile(login: string): Promise<Profile> {
    return await $fetch<Profile>(`/api/profiles/${login}`)
  }
}
