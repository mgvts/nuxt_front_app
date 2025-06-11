import type { Lecture } from './lecture'
import type { base64str } from '.'

export interface Semester {
  id: number
  title: string
  description: string
  position: number
  imageUrl?: base64str
  lectures: Lecture[]
  percentOfView: number
}
