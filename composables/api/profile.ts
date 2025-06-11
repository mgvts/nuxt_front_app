import { wrapGet } from './base'
import type { Profile } from '~/types/profile'

const get = wrapGet('/profiles')

export const profile = {
  async getProfiles(): Promise<Profile[]> {
    return await get<Profile[]>()
  },

  async getProfile(login: string): Promise<Profile> {
    return await get<Profile>(`/${login}`)
  },
}
