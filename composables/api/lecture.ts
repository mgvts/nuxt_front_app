import type { Lecture } from '~/types/lecture'
import { wrapGet } from './base'

const get = wrapGet('/lectures')


export const lecture = {
    /** Получить данные лекции по slug */
  async getLectures(): Promise<Lecture[]> {
    return await get<Lecture[]>()
  },

  /** Получить данные лекции по slug */
  async getLecture(slug: string): Promise<Lecture> {
    return await get<Lecture>(`/${slug}`)
  }
}
