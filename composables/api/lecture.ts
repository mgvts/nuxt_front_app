import { wrapGet } from './base'
import type { Lecture } from '~/types/lecture'

const get = wrapGet('/lectures')

export const lecture = {
  async getLectures(): Promise<Lecture[]> {
    return await get<Lecture[]>()
  },

  async getLecture(slug: string): Promise<Lecture> {
    return await get<Lecture>(`/${slug}`)
  },
}
