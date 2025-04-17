import type { Semester } from '~/types/semester'

export const semester = {
  /** Получить список всех семестров */
  async getSemesters(): Promise<Semester[]> {
    return await $fetch<Semester[]>('https://ktcourse.ru/api/v1/semesters')
  },

  /** Получить данные одного семестра по ID */
  async getSemester(id: string): Promise<Semester> {
    return await $fetch<Semester>(`/api/semesters/${id}`)
  }
}
