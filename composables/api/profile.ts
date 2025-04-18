import type { Profile } from '~/types/profile'
import { wrapGet } from './base'

const get = wrapGet('/profiles')

export const profile = {
  /** Получить список всех профилей */
  async getProfiles(): Promise<Profile[]> {
    return await get<Profile[]>()
  },

  /** Получить данные одного профиля по login */
  async getProfile(login: string): Promise<Profile> {
    return await get<Profile>(`/${login}`)
  }
}
