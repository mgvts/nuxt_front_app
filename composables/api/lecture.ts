import type { Lecture } from '~/types/lecture'

export const lecture = {
  /** Получить данные лекции по slug */
  async getLecture(slug: string): Promise<Lecture> {
    return await $fetch<Lecture>(`/api/lectures/${slug}`)
  }
}
