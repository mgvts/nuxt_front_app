import { wrapGet, wrapPost } from './base'

const post = wrapPost('/likes')
const get = wrapGet('/likes')

export const likes = {
  async getLikes(lectureId: number): Promise<number> {
    return await get<number>(`/${lectureId}`)
  },

  async getIsLiked(lectureId: number): Promise<boolean> {
    return await get<boolean>(`/${lectureId}/isLiked`)
  },

  async like(lectureId: number) {
    return await post(`/${lectureId}/like`, {
      method: 'POST',
    })
  },

  async unlike(lectureId: number) {
    return await post(`/${lectureId}/unlike`, {
      method: 'POST',
    })
  },
}
