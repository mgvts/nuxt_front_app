import type { Lecture } from '~/types/lecture'
import { wrapGet, wrapPost } from './base'
import type { Profile } from '~/types/profile'
import type { FavoritePayload } from '~/types/favorite'

const post = wrapPost('/favorites')
const get = wrapGet('/favorites')

export const favorites = {
  async remove(payload: FavoritePayload): Promise<object> {
    return await post<object>('/remove', {
      method: 'POST',
      body: payload
    })
  },

  async add(payload: FavoritePayload): Promise<object> {
    return await post<object>('/add', {
      method: 'POST',
      body: payload
    })
  },

  async getAll(login: Profile['login']): Promise<Lecture[]> {
    return await get<Lecture[]>(`/${login}`, {
      method: 'GET',
    })
  }
}
