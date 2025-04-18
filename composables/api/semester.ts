import type { Semester } from '~/types/semester'
import { wrapGet } from './base'

const get = wrapGet('/semesters')

export const semester = {
  /** Получить список всех семестров */
  async getSemesters(): Promise<Semester[]> {
    return await get<Semester[]>()
  },

  /** Получить данные одного семестра по ID */
  async getSemester(id: string): Promise<Semester> {
    return await get<Semester>(`/${id}`)
  }
}
