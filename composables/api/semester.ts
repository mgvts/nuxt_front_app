import { wrapGet } from './base'
import type { Semester } from '~/types/semester'

const get = wrapGet('/semesters')

export const semester = {
  async getSemesters(): Promise<Semester[]> {
    return await get<Semester[]>()
  },

  async getSemester(id: string): Promise<Semester> {
    return await get<Semester>(`/${id}`)
  },
}
